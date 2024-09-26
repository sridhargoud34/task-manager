const { getTaskDataService,postLoginService,postRegisterService} = require("../service/service");
const { handleErrorResponse } = require("../utils/responseUtils");
const getTaskData = async (req, res) => {
  try {
    const result = await getTaskDataService(req, res);
    console.log(result);
    if (result) {
      res.status(200).json({
        error: false,
        statusCode: 200,
        result: result,
      });
    }
  } catch (error) {
    console.log(error,error);
    return handleErrorResponse(res, error);
  }
};
const postLogin = async (req, res) => {
  try {
    const result = await postLoginService(req, res);
    console.log(result);
    if (result) {
      res.status(200).json({
        error: false,
        statusCode: 200,
        result: result,
      });
    }
  } catch (error) {
    console.log(error,error);
    return handleErrorResponse(res, error);
  }
};
const postRegister = async (req, res) => {
  try {
    const result = await postRegisterService(req, res);
    console.log(result);
    if (result) {
      res.status(200).json({
        error: false,
        statusCode: 200,
        result: result,
      });
    }
  } catch (error) {
    console.log(error,error);
    return handleErrorResponse(res, error);
  }
};
module.exports = {
  getTaskData,
  postRegister,
  postLogin
};
