import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:8000"; // Replace with your Django server URL

export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup/`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Signup failed" };
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Login failed" };
  }
};
