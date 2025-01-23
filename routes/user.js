const express = require("express");
const userMiddleware = require("../middlewares/user");
const { User, Property } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("/Dreamscape reality/config");
const sendEmail = require('../services/mailer');
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const bcrypt = require('bcrypt');
const getSignupMessage = (username) => {
    return `Dear ${username},

Thank you for signing up to Dreamscape Realty. We're thrilled to have you with us! 
Start exploring a wide variety of properties and find your dream home today.

If you have any questions, feel free to reach out to our support team at support@dreamscaperealty.com.

Best regards,
The Dreamscape Team`;
};

const getPurchaseMessage = (username, PropertyId) => {
    return `Dear ${username},

Thank you for purchasing a property on Dreamscape Realty. Your property purchase (ID: ${PropertyId}) has been confirmed. 
We wish you the best of luck with your new property, and we're here to assist you with anything you need.

You can view your purchased properties in your dashboard.

Best regards,
The Dreamscape Team`;
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, 
  message: "Too many requests, please try again later.",
});

// Middleware
router.use(helmet());
router.use(morgan("dev"));
router.use(cors()); 
router.use(limiter); 
router.use(helmet()); // Secure HTTP headers
router.use(morgan("dev")); // Log HTTP requests
router.use(cors()); // Enable cross-origin resource sharing
router.use(limiter); // Apply rate limiting to the user routes

// User Routes
router.get('/user/dashboard', userMiddleware, (req, res) => {
    res.json({ success: true, msg: "Welcome User!", username: req.username });
});

router.post('/signup', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!email || !email.includes('@')) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ message: "Email or Username is already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const subject = "Welcome to Dreamscape Realty!";
        const message = getSignupMessage(username);

        if (email) {
            await sendEmail(email, subject, message);
        }

        res.status(201).json({ message: "User signup successful. Welcome email sent!" });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "An internal server error occurred", error: error.message });
    }
});



router.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log("Received signin request:", { username, password }); // Debug log

        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            console.log("User not found"); // Debug log
            return res.status(401).json({ msg: "Incorrect username or password" });
        }

        console.log("User found:", user); // Debug log

        // Compare the hashed password with the plain-text password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log("Invalid password"); // Debug log

            // OPTIONAL: Debugging step to manually hash `password` and log the result
            const hashedTestPassword = await bcrypt.hash(password, 10);
            console.log("Provided password hashed for comparison:", hashedTestPassword);

            return res.status(401).json({ msg: "Incorrect username or password" });
        }

        // Generate a JWT token
        const token = jwt.sign({ username }, "SHUBHAM_SERVER", { expiresIn: '1h' });
        console.log("Token generated:", token); // Debug log

        res.json({ token });
    } catch (error) {
        console.error("Error during signin:", error);
        res.status(500).json({ msg: "An internal server error occurred", error: error.message });
    }
});


router.get('/property', userMiddleware, async (req, res) => {
    try {
        const properties = await Property.find({});
        res.json({ properties });
    } catch (error) {
        res.status(500).json({ msg: "Error fetching properties", error: error.message });
    }
});

/*router.get("/property", userMiddleware, async (req, res) => {
    try {
      const jsonPath = path.join(__dirname, "..", "residency.json")
      const jsonData = await fs.readFile(jsonPath, "utf8")
      const properties = JSON.parse(jsonData)
      res.json({ properties })
    } catch (error) {
      console.error("Error reading residency.json:", error)
      res.status(500).json({ msg: "Error fetching properties", error: error.message })
    }
  })*/
  
router.post('/property/:PropertyId', userMiddleware, async (req, res) => {
    const PropertyId = req.params.PropertyId;
    const username = req.headers.username;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (user.purchasedProperties.includes(PropertyId)) {
            return res.status(400).json({ msg: "Property already purchased" });
        }

        await User.updateOne(
            { username },
            { "$push": { purchasedProperties: PropertyId } }
        );

        const subject = "Property Purchase Confirmation";
        const message = getPurchaseMessage(username, PropertyId);
        await sendEmail(username, subject, message);  

        res.json({ message: "Purchase complete! Confirmation email sent." });
    } catch (error) {
        res.status(500).json({ msg: "Error during property purchase", error: error.message });
    }
});

router.get('/purchased-property', userMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.headers.username });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const properties = await Property.find({
            _id: { $in: user.purchasedProperties }
        });

        res.json({ properties });
    } catch (error) {
        res.status(500).json({ msg: "Error fetching purchased properties", error: error.message });
    }
});

module.exports = router;
