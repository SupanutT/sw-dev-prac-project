const models = require("../sequelize/models");
const User = models.User;
const {
  sendActivateAccountToken,
  sendTokenResponse,
} = require("../utils/auth");

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
        message: "Please provide an email and password",
      });
    }

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong Email or Password!" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res
        .status(400)
        .json({ success: false, message: "Please activate the account" });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc     Get current Logged in user
//@route    POST /api/v1/auth/me
//@access   Private
exports.getMe = async (req, res, next) => {
  const user = await User.findByPk(req.user.id);
  res.status(200).json({ success: true, data: user.dataValues });
};

//@desc     Log user out / clear cookie
//@route    GET /api/v1/auth/logout
//@access   Private
exports.logout = async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
};

//@desc     Activate the user
//@route    GET /api/v1/auth/activate/:id
//@access   Private
exports.activate = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        activateAccountToken: req.params.id,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "The user is not found" });
    }

    if (user.isActive) {
      return res
        .status(400)
        .json({ success: false, message: "The user is already active" });
    }

    if (new Date(user.activateAccountExpire) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "The user activation code is expired",
      });
    }

    user.isActive = true;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "The user is successfully activated" });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
