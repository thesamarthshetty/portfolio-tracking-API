const mongoose = require('mongoose');
require('dotenv').config();

const { MONGO_URI, MONGO_AUTH_URI } = process.env;

const mainConnection = mongoose.createConnection(MONGO_URI);

const authConnection = mongoose.createConnection(MONGO_AUTH_URI);

mainConnection.on('connected', () => {
    console.log('Connected to main MongoDB');
});

mainConnection.on('error', (err) => {
    console.log('Error connecting to main MongoDB:', err);
});

authConnection.on('connected', () => {
    console.log('Connected to auth MongoDB');
});

authConnection.on('error', (err) => {
    console.log('Error connecting to auth MongoDB:', err);
});

module.exports = {
    mainConnection,
    authConnection
};
