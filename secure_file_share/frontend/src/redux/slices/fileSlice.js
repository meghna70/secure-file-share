import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to upload file
export const uploadFile = createAsyncThunk(
    'file/uploadFile',
    async ({ formData, user, token }, { rejectWithValue }) => {
        try {
            // Create Axios instance dynamically for each request
            const axiosInstance = axios.create({
                baseURL: 'http://127.0.0.1:8000', // Ensure this matches your backend URL
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log("Sending upload request to API...", formData);
            const response = await axiosInstance.post(`/api/upload`, formData);
            console.log("Successful upload response from API:", response.data);
            return { user, token }; // Pass user and token to the next action
        } catch (error) {
            console.error("Error in upload API request:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Upload Failed');
        }
    }
);

// Thunk to fetch files
export const fetchFiles = createAsyncThunk(
    'file/fetchFiles',
    async ({ user, token }, { rejectWithValue }) => {
        try {
            // Create Axios instance dynamically for each request
            const axiosInstance = axios.create({
                baseURL: 'http://127.0.0.1:8000', // Ensure this matches your backend URL
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log(`Fetching files for user: ${user.username}`);
            const response = await axiosInstance.get(`/api/files/${user.username}/`);
            console.log("Files fetched successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error in fetch files API request:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Fetch Failed');
        }
    }
);

export const deleteFile = createAsyncThunk(
    'file/deleteFile',
    async ({ fileId, token }, { rejectWithValue }) => {
        try {
            const axiosInstance = axios.create({
                baseURL: 'http://127.0.0.1:8000', // Your backend URL
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const body = {
                "file_id": fileId
            }
            await axiosInstance.post(`/api/filesDelete`, body );
            return fileId; // Return the deleted fileId
        } catch (error) {
            console.error("Error deleting file:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Deletion Failed');
        }
    }
);

// Initial state
const initialState = {
    files: [], // List of files
    loading: false,
    error: null,
};

// Slice definition
const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadFile.pending, (state) => {
                console.log("uploadFile.pending triggered");
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                console.log("uploadFile.fulfilled triggered, now fetching files");
                state.loading = true; // Keep loading while fetching files
                state.error = null;
            })
            .addCase(uploadFile.rejected, (state, action) => {
                console.log("uploadFile.rejected triggered with error:", action.payload);
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchFiles.pending, (state) => {
                console.log("fetchFiles.pending triggered");
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFiles.fulfilled, (state, action) => {
                console.log("fetchFiles.fulfilled triggered with payload:", action.payload);
                state.loading = false;
                state.files = action.payload; // Update files state
            })
            .addCase(fetchFiles.rejected, (state, action) => {
                console.log("fetchFiles.rejected triggered with error:", action.payload);
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteFile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFile.fulfilled, (state, action) => {
                state.loading = false;
                state.files = state.files.filter((file) => file.id !== action.payload);
            })
            .addCase(deleteFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default fileSlice.reducer;
