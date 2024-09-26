import axios from 'axios';

// Create an Axios instance
console.log('Base URL:', process.env.REACT_APP_API_BASE_URL)
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Use the environment variablne here
});
// Add a request interceptor
// apiClient.interceptors.request.use((config) => {
 
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Add a response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
