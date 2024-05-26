const mongoose = require('mongoose');

exports.connectDB = () => {
 try {
    mongoose.connect(process.env.mongoURI);
    console.log(`Database connected: ${process.env.mongoURI}`);
 } catch (error) {
    console.log( 'Error',error);
 }
};
