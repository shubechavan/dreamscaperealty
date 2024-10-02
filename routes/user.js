const express = require("express");
const userMiddleware = require("../middlewares/user");
const { User, Property } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

// User Routes
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        await User.create({ username, password });
        res.json({ msg: "User signup successful" });
    } catch (error) {
        res.status(500).json({ msg: "Error occurred during signup", error: error.message });
    }
});

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (user) {
        const token = jwt.sign({ username }, JWT_SECRET);
        res.json({ token });
    } else {
        res.status(401).json({ msg: "Incorrect username or password" });
    }
});

// Fetch all properties
router.get('/property', userMiddleware, async (req, res) => {
    try {
        const properties = await Property.find({});
        res.json({ properties });
    } catch (error) {
        res.status(500).json({ msg: "Error fetching properties", error: error.message });
    }
});

// Purchase a property
router.post('/property/:PropertyId', userMiddleware, async (req, res) => {
    const PropertyId = req.params.PropertyId;
    const username = req.headers.username;

    try {
        console.log("Username received:", username);

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Check if user already purchased the property
        if (user.purchasedProperties.includes(PropertyId)) {
            return res.status(400).json({ msg: "Property already purchased" });
        }

        // Add the property to the user's purchasedProperties array
        await User.updateOne(
            { username },
            { "$push": { purchasedProperties: PropertyId } }
        );

        res.json({ message: "Purchase complete!" });
    } catch (error) {
        res.status(500).json({ msg: "Error purchasing property", error: error.message });
    }
});

// Fetch purchased properties
router.get('/purchased-property', userMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.headers.username });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Fetch the properties using the purchasedProperties array
        const properties = await Property.find({
            _id: { $in: user.purchasedProperties }
        });

        res.json({ properties });
    } catch (error) {
        res.status(500).json({ msg: "Error fetching purchased properties", error: error.message });
    }
});

module.exports = router;
