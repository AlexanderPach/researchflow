const router = require('express').Router();
const { createResearchPaper } = require('../controller/researchPaperController');
const verifyToken = require('../middleware/auth');


router.post('/create', verifyToken ,createResearchPaper);


module.exports = router;