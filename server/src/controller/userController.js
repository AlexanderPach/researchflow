const asyncHandler = require('express-async-handler')
const User = require('../schemas/User')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

//TOOD: Put in config or .env
const ACCESS_TOKEN_SECRET = '547df10fc66f17db9eb07226b0f8cc3279be0b3247427faa097c8c64b4ba5b8fa82751ac6e00b60d939b76360c0edb30e2ee53f91e6ed317bee86edd3ad40429';


const buildToken = (user) => {
    return {
        userId: user._id,
    }
}

//Used to pull authors for frontend based on researchPaper 'authors' property
exports.getUserById = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
        res.status(400).json({
            success: false,
            message: 'User Not Found'
        });
    } else {
        res.status(200).json({
            user,
            success: true,
            message: 'User has been found'
        })
    }
})


exports.getUserByUsername = asyncHandler(async (req, res) => {
    const username = req.params.username;

    const user = await User.findOne({ username }).select("-password");

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const data = {
        user
    }

    return res.status(200).json(data);
    
})

exports.createUsers = asyncHandler(async (req, res) => {
    const { name, username, password, email } = req.body;

    if (!name || !username || !password || !email) {
        res.status(400);
        throw new Error('Missing User Fields');
    }


    const checkIfUser = await User.findOne({ email });


    if (checkIfUser) {
        res.status(400);
        throw new Error('Account Already Exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const newUser = await User.create({
        name,
        username,
        email,
        password: hashedPassword,
    });

    res.status(201).json({
        _id: newUser._id,
        name: newUser.name, 
        email: newUser.email,
        username: newUser.email,
        password: newUser.password,

        })
    
})

exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
    const token = jwt.sign(buildToken(user), ACCESS_TOKEN_SECRET, { expiresIn: '30d' });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401);
        throw new Error('Invalid login credentials');
    } else {
        
        res.status(200).json({

            _id: user._id,
            name: user.name,
            email: user.email,
            token: token,

        })
    }
});