const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
