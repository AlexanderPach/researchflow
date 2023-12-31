const mongoose = require('mongoose');
const ResearchPaper = require('./ResearchPaper');
const { Schema } = mongoose;

const User = new Schema({

    username: {
        type: String,
        required: [true, 'Please Enter Username']
    },
    name: {
        type: String,
        required: [true, 'Please Add Your Name']
    },
    email: {
        type: String,
        required: [true, 'I Think You Forgot Your Email']
    }, 
    password: {
        type: String,
        required: [true, 'What Security Would you Have Without a Password!']
    },
    dateCreated: Date,
    lastLogin: Date,
    documents: [
        {
            type: mongoose.Schema.ObjectId,
            ref: ResearchPaper
        }
    ]

})

module.exports = mongoose.model('User' , User)
