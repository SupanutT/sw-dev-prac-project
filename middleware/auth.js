const jwt = require('jsonwebtoken');
const models = require('../sequelize/models');
const User = models.User;

// Protect routes
exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Make sure token exists
    if (!token) {
        return res.status(401).json({ sucess: false, message: 'Not authorize to access this route' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        req.user = user.dataValues;
        // console.log(req.user);

        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Not authorize to access this route' });
    }
};

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ sucess: false, message: `User role ${req.user.role} is not authorized to access this route` });
        }
        next();
    };
};
