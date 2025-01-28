const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")

function adminMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, msg: "No token provided or invalid format" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    if (!decoded.adminId) {
      throw new Error("Not an admin token")
    }
    req.admin = decoded
    next()
  } catch (error) {
    console.error("Admin authentication error:", error.message)
    res.status(403).json({ success: false, msg: "Invalid or expired token" })
  }
}

module.exports = adminMiddleware

