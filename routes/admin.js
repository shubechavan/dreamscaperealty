const express = require("express");
const adminMiddleware = require('../middlewares/admin');
const { Admin, Property } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

// Admin Routes
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        await Admin.create({ username, password });
        res.json({ msg: "Admin signup successful" });
    } catch (error) {
        res.status(500).json({ msg: "Error occurred during signup", error: error.message });
    }
});

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });
    
    if (admin) {
        const token = jwt.sign({ username }, JWT_SECRET);
        res.json({ token });
    } else {
        res.status(401).json({ msg: "Incorrect username or password" });
    }
});

// Property Routes
router.post('/property', adminMiddleware, async (req, res) => {
    const { title, description, price, imagelink } = req.body;
    try {
        const property = await Property.create({ title, description, price, imagelink }); // Corrected the variable name here
        res.json({ msg: "Property created successfully", propertyId: property._id });
    } catch (error) {
        res.status(500).json({ msg: "Error creating property", error: error.message });
    }
});

router.get('/property', adminMiddleware, async (req, res) => {
    try {
        const properties = await Property.find({});
        res.json({ properties }); // Corrected the response key to plural 'properties'
    } catch (error) {
        res.status(500).json({ msg: "Error fetching properties", error: error.message });
    }
});

module.exports = router;
