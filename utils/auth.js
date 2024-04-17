const nodemailer = require("nodemailer");
const randomToken = require("random-token");

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
      email: user.email,
    });
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
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
    "Activate Account",
    `Please activate your account in 24 hours using the link below:<br>
<a href="${process.env.BACKEND_URL}/api/v1/auth/activate/${activateAccountToken}">LINK</a>`
  );
};

const sendEmail = (email, subject, text) => {
  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: email,
    subject: subject,
    html: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw {
        message: error.message,
      };
    }
  });
};

module.exports = { sendTokenResponse, sendActivateAccountToken };
