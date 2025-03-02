import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { MenuItem, Select, Typography } from '@mui/material';
import "../App.css"
import first from "../1.jpg"
import second from "../2.jpg"
import third from "../3.jpg"
import fourth from "../4.jpg"
import fifth from "../5.jpg"

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
        <div style={styles.mainPage}>
            <div style={{ alignSelf: "flex-start", color: "white", padding: "20px", paddingLeft: "40px" }}>
                <Typography
                    variant="h6"
                    noWrap
                    sx={{
                        mr: 2,
                        display: 'flex',
                        // fontFamily: 'monospace',
                        fontWeight: 700,
                        fontSize: "20px",

                        fontFamily: "Lexend, serif",
                        color: '#f5f5f5',
                        textDecoration: 'none',
                        cursor: "pointer",
                    }}
                >
                    FortiFile
                </Typography>
            </div>
            <div style={{ ...styles.registerPage }} className='registerPage'>
                <div style={styles.registerFormContainer} >
                    {/* <div style={styles.registerTiltle} >Welcome!</div> */}
                    <div style={styles.registerSubTiltle}>Please Enter your Account details</div>
                    <form onSubmit={handleSubmit}>
                        <div style={styles.formInput}>
                            {/* <label>Username:</label> */}
                            <label style={styles.labelStyle}>Username</label>

                            <input
                                type="text"
                                name="username"
                                style={styles.inputStyle}
                                // placeholder='Username'
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div style={styles.formInput}>

                            <label style={styles.labelStyle}>Email</label>
                            <input
                                type="email"
                                name="email"
                                // placeholder='Email'
                                style={styles.inputStyle}
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div style={styles.formInput}>
                            {/* <label>Password:</label> */}
                            <label style={styles.labelStyle}>Password</label>

                            <input
                                // placeholder='Password'
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
                            <label style={styles.labelStyle}>Confirm Password</label>

                            <input
                                type="password"
                                // placeholder='Confirm Password'
                                name="confirmPassword"
                                style={styles.inputStyle}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* <InputLabel id="demo-simple-select-label">Role</InputLabel> */}
                        {/* <div style={styles.formInput} >
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
                        </Select></div> */}
                        <div style={{ fontFamily: "Montserrat", padding: "14px", color: "#f5f5f5" }}>Already have an account?
                            <span onClick={() => navigate('/login')} style={{ textDecoration: "underline", cursor: "pointer" }}>Click here</span>
                        </div>
                        {error && <p className="error">{error}</p>}
                        <div style={{ fontFamily: "Montserrat", width: "100%", display: "flex", padding: "16px 12px", paddingTop: "10px", }}>
                            <button style={styles.submitButton} type="submit" disabled={loading}>
                                {loading ? 'Registering...' : 'Register'}
                            </button>
                        </div>
                    </form>
                </div>
                <div style={{ ...styles.infoContainer, position: "relative", bottom: 0 }}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <div style={{ padding: "40px", width: "60%", fontWeight: 500, fontSize: "2rem", color: "white" }}>Need a secure and seamless way to share files?</div>
                        <div style={{ height: "90px", width: "150px", borderRadius: "0px 20px", backgroundColor: "#090909" }}></div>
                    </div>
                    <div style={{ width: "100%" }}>
                        <div style={{ padding: "35px", width: "90%", fontWeight: 400, fontSize: "20px", color: "#f5f5f5" }}>" FortiFile – Secure, Seamless, and Smart File Sharing for Teams! " </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "50px" }}>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <div style={{ width: "85%", padding: "30px 0px 30px 30px", borderRadius: "22px", backgroundColor: "#f5f5f5" }}>
                                <div style={{ display:"flex", justifyContent:"space-between"}}>
                                    <div style={{ paddingTop: "20px",fontSize: "20px", fontWeight: 600, fontFamily: "poppins" }}>
                                        Get your right space for storage and collaboration. Register now.
                                    </div>
                                    {/* <div style={{ backgroundColor: "rgb(130, 201, 97)", height: "50px", width: "5rem", borderBottomLeftRadius:"12px" }}></div> */}
                                </div>
                                <div style={{ display: "flex", padding:"20px 20px 20px 0px", flexDirection: "row", justifyContent: "space-between" }}>
                                    <div style={{ width: "60%", fontSize: "16px",fontFamily: "poppins", color: "grey" }}>
                                        Be among the first founders to experience the easiest way to start run a business.
                                    </div>
                                    <div>
                                        <AvatarGroup max={4}>
                                            <Avatar alt="Remy Sharp" src={first} />
                                            <Avatar alt="Travis Howard" src={second} />
                                            <Avatar alt="Cindy Baker" src={third} />
                                            <Avatar alt="Agnes Walker" src={fourth} />
                                            <Avatar alt="Trevor Henderson" src={fifth} />
                                        </AvatarGroup>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

const styles = {
    mainPage: {
        background: "radial-gradient(circle, rgba(99,156,72,1) 10%, rgba(9,9,9,1) 50%)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
    },
    labelStyle: {
        color: "white",
        padding: "12px",
        fontSize: "14px",
        fontFamily: "Montserrat",
    },
    inputStyle: {
        border: "1px solid lightgrey",
        padding: "10px",
        outline: "none",
        marginTop: "12px",
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
        fontSize: "16px",
        fontWeight: "400",
        color: "#fff",
        // textAlign: "center",
        padding: "20px",
        paddingTop: "0px",
        paddingBottom: "20px",
        fontFamily: "Montserrat"
    },
    registerFormContainer: {
        // backgroundColor: "white",
        padding: "20px",
        width: "48%",
        maxWidth: "500px",
        marginLeft: "20px",
        // borderRadius: "20px",
        // boxShadow: "2px 2px 10px 1px rgba(0,0,0,0.26)"
    },
    formInput: {
        padding: "12px",
        paddingBottom: "6px"

    },
    submitButton: {
        padding: "14px 20px",
        borderRadius: "15px",
        backgroundColor: "rgba(99,156,72,1)",
        border: "none",
        color: "white",
        fontSize: "18px",
        width: "90%",
        fontFamily: "Montserrat"
    },
    infoContainer: {
        backgroundColor: "rgb(37, 212, 130)",
        backgroundColor: "rgb(71, 197, 138)",
        backgroundColor: "rgb(130, 201, 97)",
        // backgroundColor: "rgb(99,156,72)",
        width: "40%",
        height: "90vh",
        borderRadius: "30px",
        // background: "radial-gradient(circle, rgba(99,156,72,1) 0%, rgba(7,105,14,1) 100%)",

    }

};