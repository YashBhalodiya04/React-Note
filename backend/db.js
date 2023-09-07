const mongoose = require('mongoose');

const mongoURL = "mongodb+srv://yashbhalodia2002:Yashkb9898@yash.gmqv3wv.mongodb.net/notebook"
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