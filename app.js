const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');

// Initializing Express
const app = express();
const http = require('http').createServer(app);

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/admin", adminRouter);
app.use("/user", userRouter);


http.listen(3000, () => {
    console.log('Server is running on port 3000');
});


