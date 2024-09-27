import apiClient from "./ApiClient";
import { apiEndPoints } from "../utils/ApiEndPoints";
import { toast } from "react-toastify";
export const postTask = async (data) => {
    try {
      const response = await apiClient.post(apiEndPoints.postTask,data);
      return response.data;
    } catch (error) {
      toast.error(error)
    }
  };
  export const deleteTask = async (data) => {
    try {
      const response = await apiClient.delete(apiEndPoints.deleteTask, {
        params: { userId: data?.userId,
          taskId:data?.taskId
         }, 
      });
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error)
      throw new Error("An error occurred during deleteTask. Please try again.");
    }
  };
  export const updateTask = async (data) => {
    try {
      const response = await apiClient.post(apiEndPoints.updateTask,data);
      return response.data;
    } catch (error) {
  toast.error(error)
    }
  };