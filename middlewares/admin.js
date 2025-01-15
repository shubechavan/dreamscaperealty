const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

// Ensure JWT_SECRET is defined
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the config file");
}

function adminMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ success: false, msg: "No token provided" });
    }

    // Check for Bearer token
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, msg: "Invalid token format" });
    }

    const token = authHeader.split(' ')[1]; // Extract token

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.admin = decoded; // Attach decoded token data to request
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(403).json({ success: false, msg: "Invalid or expired token" });
    }
}

module.exports = adminMiddleware;
