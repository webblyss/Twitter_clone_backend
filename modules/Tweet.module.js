const mongoose = require('mongoose');

// Define schema for tweet object
const tweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  likes: {
    type: Number,
    default: 0
  }
});

// Define Tweet model
const Tweet = mongoose.model('Tweet', tweetSchema);


module.exports = {
  Tweet,};
