const mongoose = require('mongoose');

const mongoURL = "mongodb://127.0.0.1:27017/notebook"
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const connectMongos = () => {
    mongoose.connect(mongoURL, options)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
}

module.exports = connectMongos;