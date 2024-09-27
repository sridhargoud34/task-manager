const { getTaskDataService,postLoginService,postRegisterService,postTaskDataService,putTaskDataService,deleteTaskDataService} = require("../service/service");
const { handleErrorResponse } = require("../utils/responseUtils");
const getTaskData = async (req, res) => {
  try {
    const result = await getTaskDataService(req, res);
    if (result) {
      res.status(200).json({
        error: false,
        statusCode: 200,
        result: result,
      });
    }
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};
const postLogin = async (req, res) => {
  try {
    const result = await postLoginService(req, res);
    if (result) {
      res.status(200).json({
        error: false,
        statusCode: 200,
        result: result,
      });
    }
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};
const postRegister = async (req, res) => {
  try {
    const result = await postRegisterService(req, res);
    if (result) {
      res.status(200).json({
        error: false,
        statusCode: 200,
        result: result,
      });
    }
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};
const postTaskData = async (req, res) => {
  try {
    const result = await postTaskDataService(req, res);
    if (result) {
      res.status(200).json({
        error: false,
        statusCode: 200,
        result: result,
      });
    }
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};
const putTaskData = async (req, res) => {
  try {
    const result = await putTaskDataService(req, res);
    if (result) {
      res.status(200).json({
        error: false,
        statusCode: 200,
        result: result,
      });
    }
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};
const deleteTaskData = async (req, res) => {
  try {
    const result = await deleteTaskDataService(req, res);
    if (result) {
      res.status(200).json({
        error: false,
        statusCode: 200,
        result: result,
      });
    }
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};
module.exports = {
  getTaskData,
  postTaskData,
  postRegister,
  postLogin,
  putTaskData,
  deleteTaskData
};
