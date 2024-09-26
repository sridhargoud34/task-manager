const mySqlConnection = require("../config/mySqlConnection");
const {authenticateJWT,generateToken} = require('../middleware/auth')
const { postLogin, postRegister } = require("../controller/controller");
const bcrypt = require('bcryptjs');
const getTaskDataService = async (req, res) => {
  console.log("getTaskDataService");
  return new Promise((resolve, reject) => {
    const query = "select * from main_users";
    mySqlConnection.query(query, (err, rows) => {
      if (err) {
        reject({
          error: true,
          message: "failed to query",
        });
      }
      resolve(rows);
      generateToken(req,res)
    });
  });
};
const postLoginService = async (req, res) => {
  console.log("getTaskDataService");
  return new Promise((resolve, reject) => {
    const query = "select * from main_users";
    mySqlConnection.query(query, (err, rows) => {
      if (err) {
        reject({
          error: true,
          message: "failed to query",
        });
      }
      resolve(rows);
    });
  });
};
const postRegisterService = async (req, res) => {

  console.log("getTaskDataService");
  return new Promise(async (resolve, reject) => {
    const {email,password} = req?.body
    const hashedPassword =  await bcrypt.hash(password, 10)
    console.log(hashedPassword,"hashedPassword");
    // req.body.password = hashedPassword
    const query = "INSERT INTO main_users (email_address, password) VALUES (?, ?)";
    mySqlConnection.query(query, [email, hashedPassword], (err, rows) => {
      if (err) {
        console.error(err, "Error inserting user");
        reject({
          error: true,
          message: "Failed to query",
        });
      } else {
console.log("came");
       generateToken(req,res);
      }
    });
  });
};
module.exports = {
  postLoginService,
  postRegisterService,
  getTaskDataService,

};
