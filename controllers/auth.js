const models = require("../sequelize/models");
const User = models.User;

exports.register = async (req, res, next) => {
  try {
    const newUser = req.body;
    const user = await User.create(newUser);
    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({ success: false });
    console.log(err.stack);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide an email and password",
        });
    }

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    console.log(user);

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

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({ success: false });
    console.log(err.stack);
  }
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      id: user.dataValues.id,
      firstName: user.dataValues.firstName,
      lastName: user.dataValues.lastName,
      emaiL: user.email,
    });
};

exports.getMe = async (req, res, next) => {
  const user = await User.findByPk(req.user.id);
  res.status(200).json({ success: true, data: user.dataValues });
};
