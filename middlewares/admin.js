const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function adminMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ msg: "No token provided" });
    }

    const token = authHeader.split(' ')[1]; // Bearer <Token>

    if (!token) {
        return res.status(401).json({ msg: "Invalid token format" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.admin = decoded; // Attach decoded token data to request
        next();
    } catch (error) {
        res.status(403).json({ msg: "Invalid or expired token" });
    }
}

module.exports = adminMiddleware;
