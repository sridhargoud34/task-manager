import axios from 'axios';
const apiClient = axios.create({
 
  baseURL: process.env.REACT_APP_API_BASE_URL, 
  headers:{
    Authorization:`Bearer ${localStorage.getItem("token")}`
  }
});
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
