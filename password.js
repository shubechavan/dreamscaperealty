const bcrypt = require('bcrypt');

const plainTextPassword = "password456"; // Replace with the login password you are testing
const hashedPassword = "$2b$10$ApqqxRI9R9MeGIegyXzP5.D.zJJbgHFVygMcEUhq7dRTONA4h8LWq"; // Replace with the stored password

bcrypt.compare(plainTextPassword, hashedPassword, (err, result) => {
    if (err) {
        console.error("Bcrypt Error:", err);
    } else {
        console.log("Password matches:", result); // Should print true or false
    }
});
