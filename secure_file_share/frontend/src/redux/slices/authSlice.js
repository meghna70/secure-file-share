import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      console.log("res first");
      const response = await axiosInstance.post('/api/register', userData);
      console.log("Successful response from API:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in API request:", error.response?.data || error.message);
      return rejectWithValue(error.response.data.message || 'Registration failed');
    }
  }
);

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Ensure this matches your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});


export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/login', loginData);
      console.log("Login successful:", response.data);
      return response.data; // Assuming the response contains user info or a success message
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data.message || 'Login failed');
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token:localStorage.getItem('authToken') || null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        console.log("registerUser.pending triggered");
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("registerUser.fulfilled triggered with payload:", action.payload);
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log("registerUser.rejected triggered with error:", action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        console.log("loginUser.pending triggered");
        state.loading = true;
        state.error = null;
      })
      // Handle login fulfilled
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("loginUser.fulfilled triggered with payload:", action.payload);
        state.loading = false;
        state.user = action.payload; // Store user data in the state
        state.token = action.payload.access;
        localStorage.setItem('authToken', action.payload.access);
        localStorage.setItem('user', JSON.stringify(action.payload));
        setAuthToken(action.payload.access);
      })
      // Handle login rejected (error handling)
      .addCase(loginUser.rejected, (state, action) => {
        console.log("loginUser.rejected triggered with error:", action.payload);
        state.loading = false;
        state.error = action.payload; // Capture error message
      });
  },
});

export default authSlice.reducer;
