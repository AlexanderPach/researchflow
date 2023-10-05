const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler")
const User = require("../schemas/User");


const ACCESS_TOKEN_SECRET = '547df10fc66f17db9eb07226b0f8cc3279be0b3247427faa097c8c64b4ba5b8fa82751ac6e00b60d939b76360c0edb30e2ee53f91e6ed317bee86edd3ad40429';
const REFRESH_TOKEN_SECRET = '2c8de5e18ce73c0cbd2c2d7a19b4f37b992c52017eb71e381960aa58a11038d80040b9f5a8a048e05298b5dedadf468555ee191d2f1bf4ad7564098164d2e1a2';

const verifyToken = asyncHandler(async (req, res, next) => {
    let userToken;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) try {

        userToken = req.headers.authorization.split(' ')[1];

        const verifyUserToken = jwt.verify(userToken, ACCESS_TOKEN_SECRET);

        req.user = await User.findById(verifyUserToken.userId).select('-password');


        next();

    } catch (e) {
        console.error(e);
        res.status(401);
        throw new Error('Not Authorized to access');
    }
    
    if (!userToken) {
        res.status(401);
        throw new Error('Not Authorized to access');
    }

});

module.exports = verifyToken;