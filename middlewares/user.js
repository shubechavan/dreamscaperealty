const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the config file");
}

function userMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ success: false, msg: "No token provided" });
    }

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, msg: "Invalid token format" });
    }

    const token = authHeader.split(' ')[1]; // Extract token

    try {
        const decodedValue = jwt.verify(token, JWT_SECRET);

        if (decodedValue.username) {
            req.username = decodedValue.username;
            next();
        } else {
            res.status(403).json({ success: false, msg: "Unauthorized: username not found" });
        }
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(403).json({ success: false, msg: "Invalid or expired token" });
    }
}

module.exports = userMiddleware;
