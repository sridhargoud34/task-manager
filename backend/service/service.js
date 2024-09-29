const mySqlConnection = require("../config/mySqlConnection");
const {authenticateJWT,generateToken} = require('../middleware/auth')
const { postLogin, postRegister } = require("../controller/controller");
const bcrypt = require('bcryptjs');
const getTaskDataService = async (req, res) => {
  return new Promise((resolve, reject) => {
  
   const {userId} = req?.query
   if(!userId){
reject({
  message:"userID is Mandatory"
})
   }
   else{
     const query = "select * from user_tasks where user_id = ? order by id";
     mySqlConnection.query(query,[userId], (err, rows) => {
       if (err) {
         reject({
           error: true,
           message: "failed to query",
         });
       }
       resolve(rows)
     });
   }
  });
};
const postTaskDataService = async (req, res) => {
  return new Promise((resolve, reject) => {
    const data = req.body
    const { title, description, status, userId } = req.body;
    if (!userId) {
      return reject({
        error: true,
        message: "userId is required",
      });
    }
    const query = "INSERT INTO user_tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)";
    mySqlConnection.query(query, [title, description, status, userId], (err, rows) => {
      if (err) {

        return reject({
          error: true,
          message: "Failed to insert task",
        });
      }
 data.id = rows.insertId
 data.user_id = data.userId
      resolve({
        error:false,
        message:"Task added successfully",
        task:data
      }); 
    });
  });
};
const putTaskDataService = async (req, res) => {
  return new Promise((resolve, reject) => {
    const { title, description, status, userId, taskId } = req.body;
    if (!userId) {
      return reject({
        error: true,
        message: "userId is required",
      });
    }
    if (!taskId) {
      return reject({
        error: true,
        message: "taskId is required",
      });
    }

    const query = "UPDATE user_tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?";
    mySqlConnection.query(query, [title, description, status, taskId, userId], (err, result) => {
      if (err) {
        return reject({
          error: true,
          message: "Failed to update task",
        });
      }
      if (result.affectedRows === 0) {
        return reject({
          error: true,
          message: "No task found with the specified taskId for this user",
        });
      }

      resolve({
        error: false,
        message: "Task updated successfully",
      });
    });
  });
};


const deleteTaskDataService = async (req, res) => {
  return new Promise((resolve, reject) => {
    const { taskId, userId } = req.query;
    if (!userId) {
      return reject({
        error: true,
        message: "userId is required",
      });
    }
    if (!taskId) {
      return reject({
        error: true,
        message: "taskId is required",
      });
    }
    const query = "DELETE FROM user_tasks WHERE id = ? AND user_id = ?";
    mySqlConnection.query(query, [taskId, userId], (err, result) => {
      if (err) {
        return reject({
          error: true,
          message: "Failed to delete task",
        });
      }

      if (result.affectedRows === 0) {
        return reject({
          error: true,
          message: "No task found with the specified taskId",
        });
      }

      resolve({
        error: false,
        message: "Task deleted successfully",
      });
    });
  });
};
 
const postRegisterService = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return reject({
        error: true,
        message: "Passwords do not match",
      });
    }
else{
  const checkEmailQuery = "SELECT 1 FROM main_users WHERE email_address = ?";
  mySqlConnection.query(checkEmailQuery, [email], async (err, results) => {
    if (err) {
      return reject({
        error: true,
        message: "Failed to query",
      });
    }
  
    if (results.length > 0) {
      return reject({
        error: true,
        message: "Email already exists",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertQuery = "INSERT INTO main_users (email_address, password) VALUES (?, ?)";
      mySqlConnection.query(insertQuery, [email, hashedPassword], (insertErr, insertResults) => {
        if (insertErr) {
          return reject({
            error: true,
            message: "Failed to insert user",
          });
        }
        
        const token = generateToken(req, res); 
      });
    }
  });
}
   
  });
};

module.exports = {
  postRegisterService,
  getTaskDataService,
  postTaskDataService,
  putTaskDataService,
  deleteTaskDataService
};
