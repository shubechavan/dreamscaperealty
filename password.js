const bcrypt = require('bcrypt');
const { User } = require('./db/index'); // Adjust the path to your User model

async function updatePassword(username, newPassword) {
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        console.log("New hashed password:", hashedPassword);

        const user = await User.findOneAndUpdate(
            { username },
            { password: hashedPassword },
            { new: true }
        );

        if (user) {
            console.log("Password updated successfully for:", username);
        } else {
            console.log("User not found.");
        }
    } catch (error) {
        console.error("Error updating password:", error);
    }
}

// Call this function with the correct username and new password
updatePassword('jane22doe', 'password456');
