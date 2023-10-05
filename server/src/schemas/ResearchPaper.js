const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResearchPaper = new Schema({
    metadata: {
        title: String,
        style: { type: String, enum: ['APA', 'MLA', 'Chicago', 'IEEE', 'CSE'] },
        keywords: [String],
    },
    authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    
})

module.exports = mongoose.model('Research Paper', ResearchPaper);