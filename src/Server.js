const mongoose = require('mongoose');
const { mainConnection, authConnection } = require('./mongoDb/dbConnections');

require('dotenv').config()


const { PORT } = process.env


const Server = async App => {
    try {

        await Promise.all([
            mainConnection,
            authConnection,
        ]);

        await App.listen(PORT)
        console.log(`[Info] Server Started Successfully! Listening on Port: ${PORT}`)
    } catch (error) {
        process.exit(1)
    }
}


module.exports = Server;