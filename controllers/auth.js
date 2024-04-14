const models = require('../sequelize/models');
const User = models.User;

exports.register = async (req, res, next) => {
    try {
        const newUser = req.body;
        console.log(newUser);
        const userId = await User.create(newUser);
        console.log(userId);
        res.status(200).send({ message: userId });
    } catch (err) {
        res.status(400).send({ message: err });
    }
};
