const colors = require('colors');
const { connect, default: mongoose } = require('mongoose');
const uri = "mongodb+srv://aipache1:MZGFF-mMi3_-Uv9@researchflow.lw3megi.mongodb.net/?retryWrites=true&w=majority";
const debug = require('debug')('app:database');
  
async function run() {
  try {
    const connect = await mongoose.connect(uri);
    console.log(`Connected to database: ${connect.connection.host} `);
  } catch (error) {
    console.log(`Could not connect to Database:  ${error}`);
    process.exit(1);
  }

  }
 
module.exports = {run};
