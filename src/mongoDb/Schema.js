const getEncryptPassword = require('../lib/Bcrypt');
const { authConnection } = require('../mongoDb/dbConnections');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    customerId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//this function is used the encript the user password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
      this.password = await getEncryptPassword(this.password);
      next();
    } catch (error) {
      next(error);
    }
  });
  
//this function is used the decript and check the password which user as enterd.
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      throw new Error(error);
    }
  };

const User = authConnection.model('users', userSchema);

const counterSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    value: { type: Number, required: true, default: 0 }
});



const counter = authConnection.model('counters',counterSchema);

module.exports = { User, counter };