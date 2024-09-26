import apiClient from "./ApiClient";
import { apiEndPoints } from "../utils/ApiEndPoints";
import axios from "axios";
const header = {
    headers:{
Authorization : "Bearer " + localStorage.getItem("Token")
    }
} 
export const postLogin = async (data) => {
    try {
      console.log(data,"data");
      const response = await apiClient.post(apiEndPoints.postLogin,data);
      return response.data;
    } catch (error) {
      // Log the error for debugging
      console.error("Login failed:", error);
  
      // Throw a single error message
      throw new Error("An error occurred during login. Please try again.");
    }
  };
  export const postregister = async (data) => {
    try {
      console.log(data,"data");
      const response = await apiClient.post(apiEndPoints.postregister,data);
      return response.data;
    } catch (error) {
      // Log the error for debugging
      console.error("Login failed:", error);
  
      // Throw a single error message
      throw new Error("An error occurred during login. Please try again.");
    }
  };
  export const getTaskData = async (data) => {
    try {
      const response = await apiClient.get(apiEndPoints.getTaskData);
      return response.data;
    } catch (error) {
      // Log the error for debugging
      console.error("Login failed:", error);
  
      // Throw a single error message
      throw new Error("An error occurred during login. Please try again.");
    }
  };
  