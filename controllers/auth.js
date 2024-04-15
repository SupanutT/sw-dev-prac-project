const models = require('../sequelize/models');
const User = models.User;
const nodemailer = require('nodemailer');
const randomToken = require('random-token');

//@desc     Register user
//@route    POST /api/v1/auth/register
//@access   Public
exports.register = async (req, res, next) => {
    try {
        const newUser = req.body;
        const user = await User.create(newUser);
        await sendActivateAccountToken(user);
        sendTokenResponse(user, 201, res);
    } catch (err) {
        res.status(400).json({ success: false });
        console.log(err.stack);
    }
};

//@desc     Login user
//@route    POST /api/v1/auth/login
//@access   Public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an email and password'
            });
        }

        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Wrong Email or Password!' });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        id: user.dataValues.id,
        firstName: user.dataValues.firstName,
        lastName: user.dataValues.lastName,
        email: user.email
    });
};

//@desc     Get current Logged in user
//@route    POST /api/v1/auth/me
//@access   Private
exports.getMe = async (req, res, next) => {
    const user = await User.findByPk(req.user.id);
    res.status(200).json({ success: true, data: user.dataValues });
};

exports.activate = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                activateAccountToken: req.params.id
            }
        });

        if (!user) {
            return res.status(404).json({ success: false, message: 'The user is not found' });
        }

        if (user.isActive) {
            return res.status(400).json({ success: false, message: 'The user is already active' });
        }

        if (new Date(user.activateAccountExpire) < new Date()) {
            return res.status(400).json({ success: false, message: 'The user activation code is expired' });
        }

        user.isActive = true;
        await user.save();
        res.status(200).json({ success: true, message: 'The user is successfully activated' });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'swdevpraccoworkingspace@gmail.com',
        pass: 'ugnu trjq urup irum'
    }
});

const sendActivateAccountToken = async (user) => {
    const email = user.email;
    const activateAccountToken = randomToken(16);
    user.activateAccountToken = activateAccountToken;
    const today = new Date();
    const activateAccountExpire = new Date(today.setDate(today.getDate() + 1));
    // const activateAccountExpire = today;
    user.activateAccountExpire = activateAccountExpire;
    await user.save();
    sendEmail(
        user.email,
        'Activate Account',
        `Please activate your account in 24 hours using the link below:<br>
<a href="${process.env.BACKEND_URL}/api/v1/auth/activate/${activateAccountToken}">LINK</a>`
    );
};

const sendEmail = (email, subject, text) => {
    const mailOptions = {
        from: process.env.GMAIL_EMAIL,
        to: email,
        subject: subject,
        html: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            throw {
                message: error.message
            };
        }
    });
};
