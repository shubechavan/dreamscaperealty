const express = require("express");
const adminMiddleware = require("../middlewares/admin");
const { Admin, Property } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcrypt");
const sendEmail = require("../services/mailer");

const router = express.Router();
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const getAdminSignupMessage = (username) => `
Dear ${username},

We are delighted to welcome you to the Dreamscape Realty platform as an administrator. As part of your new role, you now have access to manage property listings, oversee transactions, and maintain the platform’s integrity.

Best regards,  
The Dreamscape Realty Team  
www.dreamscaperealty.com  
support@dreamscaperealty.com`;

const getPropertyCreatedMessage = (username, propertyTitle) => `
Dear ${username},

The property "${propertyTitle}" has been successfully added to Dreamscape Realty.

Best regards,  
The Dreamscape Team`;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests, please try again later.",
});

router.use(helmet()); 
router.use(morgan("dev"));
router.use(cors());
router.use(limiter); 

router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await Admin.create({ username, password: hashedPassword });

        const subject = "Welcome to Dreamscape Realty (Admin)";
        const message = getAdminSignupMessage(username);
        await sendEmail(username, subject, message);

        res.json({ success: true, msg: "Admin signup successful. Welcome email sent!" });
    } catch (error) {
        console.error("Signup Error:", error.message);
        res.status(500).json({ success: false, msg: "Error during signup" });
    }
});


router.post("/signin", async (req, res) => {
    const { email, password } = req.body
  
    try {
      console.log("Received signin request:", { email, password }) // Debug log
  
      
      const admin = await Admin.findOne({ email })
  
      
      if (!admin) {
        console.log("Admin not found for email:", email)
        return res.status(401).json({ success: false, msg: "Incorrect email or password" })
      }
  
      console.log("Admin found:", admin)
  
      
      const isMatch = await bcrypt.compare(password, admin.password)
      if (!isMatch) {
        console.log("Password does not match")
        return res.status(401).json({ success: false, msg: "Incorrect email or password" })
      }
  
      
      const token = jwt.sign({ email: admin.email, adminId: admin._id }, JWT_SECRET, {
        expiresIn: "1h", // Token expiration time
      })
  
      console.log("Login successful, token generated:", token)
  
      // Send success response with the token
      res.json({ success: true, token })
    } catch (error) {
      console.error("Signin Error:", error.message)
      res.status(500).json({ success: false, msg: "Error during signin" })
    }
  })
  
  

router.post("/property", adminMiddleware, async (req, res) => {
    const { title, description, price, imagelink } = req.body;
    try {
        const property = await Property.create({ title, description, price, imagelink });

        const username = req.admin.username; // From decoded token
        const subject = "Property Created Successfully";
        const message = getPropertyCreatedMessage(username, title);
        await sendEmail(username, subject, message);

        res.json({ success: true, msg: "Property created successfully", propertyId: property._id });
    } catch (error) {
        console.error("Property Creation Error:", error.message);
        res.status(500).json({ success: false, msg: "Error creating property" });
    }
});

router.get("/property", adminMiddleware, async (req, res) => {
    try {
        const properties = await Property.find({});
        res.json({ success: true, properties });
    } catch (error) {
        console.error("Fetch Properties Error:", error.message);
        res.status(500).json({ success: false, msg: "Error fetching properties" });
    }
});

module.exports = router;
