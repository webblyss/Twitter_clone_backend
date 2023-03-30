const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    imageUrl: {
      type: String,
      required: true, unique: true  
    },
  });

  const User = mongoose.model('Users', userSchema);


  module.exports = {
    User,};

