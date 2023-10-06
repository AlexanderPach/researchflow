const asyncHandler = require('express-async-handler');
const ResearchPaper = require('../schemas/ResearchPaper');

exports.createResearchPaper = async (req, res) => {
    const { title, style, keywords } = req.body;
    console.log(req.user);

    if (!req.user) {
        return res.status(401).json({ message: 'Authentication Required!' });
    }


    console.log('user id', req.user._id)

    const newResearch = await ResearchPaper.create({
        metadata: {
            title,
            style,
            keywords
        },
        authors: [req.user._id]
    })

    res.status(201).json({
        metadata: newResearch.metadata,
        authors: newResearch.authors,

    })

}

exports.deleteResearchPaper = async (req, res) => {
    
}