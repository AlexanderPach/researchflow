const express = require('express');
const path = require('path');
const cors = require('cors');


const morgan = require('morgan');
const debug = require('debug')('app:server');
debug.log = console.info.bind(console);
const dotenv = require('dotenv');
const db = require('./src/db');
const User = require('./src/schemas/User')
const userRoutes = require('./src/routes/userRoutes')
const researchPaperRoutes = require('./src/routes/researchPaperRoutes');

const app = express();
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/user', userRoutes);
app.use('/research', researchPaperRoutes);

db.run().catch(console.dir).then(() => {
    app.listen(3000, console.log(`Server started on port 3000`.rainbow.underline.bold));
});





