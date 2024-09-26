const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mySqlConnection = require("../config/mySqlConnection");
require("dotenv").config();
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.sendStatus(403); // Forbidden
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user;
        next();
    });
};
const generateToken = (req, res) => {
    console.log(req?.body,"req?.body");
    const{email,password} = req?.body
    if (!email || !password ) {
        return res
          .status(400)
          .json({ error: "email and password,  are required." });
      }
      else{

          const query = "SELECT * FROM main_users WHERE email_address = ?"; 
          mySqlConnection.query(query, [email], async (error, results) => {
            if (error) {
              console.error("Error fetching user:", error);
              return res.status(500).json({ error: "Failed to fetch user." });
            }
        
            console.log(results, "results");
        
            // Check if user exists
            if (results.length === 0) {
              return res.status(401).json({ error: "Username or password is incorrect." });
            }
        
            const user = results[0];
            // const hashedPassword = await bcrypt.hash(password, 10)
            // console.log(hashedPassword,"hasg");
            // Verify the password using bcrypt
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log(isPasswordValid, "isPasswordValid");
            if (!isPasswordValid) {
              return res.status(401).json({ error: "Username or password is incorrect." });
            }
        
            try {
              // Generate JWT token
              const token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: '1h' } // you can set an expiration time here
              );
              console.log(token, "token");
              
              // Send the token to the client
              res.json({ token });
            } catch (error) {
              console.error("Error handling login process:", error);
              res.status(500).json({ error: "Login failed. Please try again later." });
            }
          });
      }
  };
module.exports = {
    generateToken,
    authenticateJWT
  };