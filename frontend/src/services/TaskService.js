import apiClient from "./ApiClient";
import { apiEndPoints } from "../utils/ApiEndPoints";
import { toast } from "react-toastify";
export const postTask = async (data) => {
    try {
      console.log(data,"data");
      const response = await apiClient.post(apiEndPoints.postTask,data);
      return response.data;
    } catch (error) {
      // Log the error for debugging
      console.error("Login failed:", error);
      toast.error(error)
      // Throw a single error message
      throw new Error("An error occurred during postTask. Please try again.");
    }
  };
  export const deleteTask = async (data) => {
    try {
      const response = await apiClient.delete(apiEndPoints.deleteTask, {
        params: { userId: data?.userId,
          taskId:data?.taskId
         }, // Correctly structure the params object
      });
      return response.data;
    } catch (error) {
      // Log the error for debugging
      console.error("Login failed:", error);
      toast.error(error)
      // Throw a single error message
      throw new Error("An error occurred during deleteTask. Please try again.");
    }
  };
  export const updateTask = async (data) => {
    try {
      const response = await apiClient.post(apiEndPoints.updateTask,data);
      return response.data;
    } catch (error) {
      // Log the error for debugging
      console.error("Login failed:", error);
  toast.error(error)
      // Throw a single error message
      throw new Error("An error occurred during updateTask. Please try again.");
    }
  };