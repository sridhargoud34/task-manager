import apiClient from "./ApiClient";
import { apiEndPoints } from "../utils/ApiEndPoints";
import { toast } from "react-toastify";
export const postLogin = async (data) => {
    try {
      const response = await apiClient.post(apiEndPoints.postLogin,data);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  };
  export const postregister = async (data) => {
    try {
      const response = await apiClient.post(apiEndPoints.postregister,data);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  };
  export const getTaskData = async (userId) => {
    try {
      const response = await apiClient.get(apiEndPoints.getTaskData, {
        params: { userId: userId },
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  };
  
  