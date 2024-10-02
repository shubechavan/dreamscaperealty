const jwt = require('jsonwebtoken');
const secret=require('../app');
const { JWT_SECRET } = require('../config');
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedvalue = jwt.verify(jwtToken,  JWT_SECRET);
    if(decodedvalue.username){
        req.username = decodedvalue.username;
        next();
    }else{
        res.status(403).send('Unauthorized');
    }

}

module.exports = userMiddleware;