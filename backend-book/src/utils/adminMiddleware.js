// src/utils/adminMiddleware.js
const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next(); // Allow access if user is admin
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { adminMiddleware };
