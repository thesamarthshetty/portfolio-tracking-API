const bcrypt = require('bcryptjs');

// Encryption of the string password
const encryptPassword = async (password) => {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword; // Return the hashed password
    } catch (error) {
        console.error('Error encrypting password:', error);
        throw new Error('Cannot encrypt password');
    }
};


module.exports = encryptPassword;
