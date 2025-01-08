import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

import { MenuItem, Select } from '@mui/material';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    // State for form fields
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    });

    // Handle form input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        dispatch(registerUser({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            role: formData.role
        })).then((result) => {
            console.log("result of /register:", result);
            if (result.meta.requestStatus === 'fulfilled') {
                navigate('/check_otp',
                    {
                        state: {
                            email: formData.email,
                            username: formData.username
                        }
                    }); // Redirect to login page on success with email and username 
            }
        });
    };

    return (
        <div style={{ ...styles.registerPage }}>
            <div style={styles.registerFormContainer} >
                <div style={styles.registerTiltle} >Welcome!</div>
                <div style={styles.registerSubTiltle}>Sign up to make an account</div>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formInput}>
                        {/* <label>Username:</label> */}
                        <input
                            type="text"
                            name="username"
                            style={styles.inputStyle}
                            placeholder='Username'
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={styles.formInput}>

                        {/* <label>Email:</label> */}
                        <input
                            type="email"
                            name="email"
                            placeholder='Email'
                            style={styles.inputStyle}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={styles.formInput}>
                        {/* <label>Password:</label> */}
                        <input
                            placeholder='Password'
                            type="password"
                            name="password"
                            style={styles.inputStyle}
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={styles.formInput}>
                        {/* <label></label> */}
                        <input
                            type="password"
                            placeholder='Confirm Password'
                            name="confirmPassword"
                            style={styles.inputStyle}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* <InputLabel id="demo-simple-select-label">Role</InputLabel> */}
                    <div style={styles.formInput} >
                        <Select
                            style={{ width: "50%" }}
                            id="role"
                            value={formData.role}
                            name='role'
                            label="role"
                            labelId="role-label"
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value={"Regular"}>Regular user</MenuItem>
                            <MenuItem value={"Admin"}>Admin</MenuItem>
                        </Select></div>
                    <div style={{ color: "#72A0C1" }}>Already have an account?
                        <span onClick={() => navigate('/login')} style={{ color: "#7CB9E8" }}>Click here</span>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "20px", paddingTop: "25px", paddingBottom: "25px" }}>
                        <button style={styles.submitButton} type="submit" disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;

const styles = {
    inputStyle: {
        border: "1px solid lightgrey",
        padding: "10px",
        borderRadius: "12px",
        fontSize: "18px",
        width: "90%"
    },
    registerTiltle: {
        fontSize: "26px",
        fontWeight: "400",
        color: "#007FFF",
        textAlign: "center",
        padding: "20px"
    },
    registerSubTiltle: {
        fontSize: "22px",
        fontWeight: "400",
        color: "#6CB4EE",
        textAlign: "center",
        padding: "20px",
        paddingTop: "0px"
    },
    registerPage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        background: "linear-gradient(to right, #314755, #26a0da)",
        padding: '20px',
        height: '100vh',
    },
    registerFormContainer: {
        backgroundColor: "white",
        padding: "20px",
        width: "40%",
        borderRadius: "20px",
        boxShadow: "2px 2px 10px 1px rgba(0,0,0,0.26)"
    },
    formInput: {
        padding: "12px",
        paddingBottom: "6px"

    },
    submitButton: {
        padding: "14px 20px",
        borderRadius: "30px",
        backgroundColor: "#6CB4EE",
        border: "none",
        color: "white",
        fontSize: "18px",
        width: "50%"
    }

};