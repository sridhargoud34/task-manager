import apiClient from "./ApiClient";
import { apiEndPoints } from "../utils/ApiEndPoints";
import { toast } from "react-toastify";
export const postLogin = async (data) => {
    try {
      console.log(data,"data");
      const response = await apiClient.post(apiEndPoints.postLogin,data);
      console.log("response",response)
      return response.data;
    } catch (error) {
      // Log the error for debugging

      toast.error(error?.response?.data?.error)
      // Throw a single error message
      // throw new Error("An error occurred during login. Please try again.");
    }
  };
  export const postregister = async (data) => {
    try {
      console.log(data,"data");
      const response = await apiClient.post(apiEndPoints.postregister,data);
      return response.data;
    } catch (error) {
      // Log the error for debugging
      console.log("errorOne",error)
      toast.error(error?.response?.data?.message)
  
      // Throw a single error message
      throw new Error("An error occurred during login. Please try again.");
    }
  };
  export const getTaskData = async (userId) => {
    try {
      console.log(userId, "userId");
      const response = await apiClient.get(apiEndPoints.getTaskData, {
        params: { userId: userId }, // Correctly structure the params object
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error)
      console.error("Error fetching task data:", error);
      throw new Error("An error occurred while fetching task data. Please try again.");
    }
  };
  
  