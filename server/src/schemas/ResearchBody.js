const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResearchBody = new Schema({
    docId: {
        ref: 'Research Paper',
        type: mongoose.Schema.ObjectId
    },
    bodyState: Object,
});

module.exports = mongoose.model('Research Body', ResearchBody);