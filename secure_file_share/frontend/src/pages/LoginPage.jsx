import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import "../App.css"
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import first from "../1.jpg"
import second from "../2.jpg"
import third from "../3.jpg"
import fourth from "../4.jpg"
import fifth from "../5.jpg"

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    // State for form fields
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
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

        // Dispatch the login action
        dispatch(loginUser(formData))
            .then((result) => {
                if (result.meta.requestStatus === 'fulfilled') {
                    // Redirect to a dashboard or another page upon successful login
                    navigate('/home');
                }
            });
    };

    return (
        <div style={styles.login_page}>

            <Typography
                variant="h6"
                noWrap
                sx={{
                    mr: 2,
                    display: 'flex',
                    // fontFamily: 'monospace',
                    fontWeight: 700,
                    fontSize: "20px",
                    padding: "20px 37px",

                    fontFamily: "Lexend, serif",
                    color: '#f5f5f5',
                    textDecoration: 'none',
                    cursor: "pointer",
                }}
            >
                FortiFile
            </Typography>

            <div style={styles.registerFormContainer} >
                <form style={{
                    padding: "20px",
                    width: "48%",
                    maxWidth: "500px",
                    marginLeft: "20px",
                }} onSubmit={handleSubmit}>
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

                        {/* <label>:</label> */}
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
                            type="password"
                            name="password"
                            style={styles.inputStyle}
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "20px", paddingTop: "25px", paddingBottom: "25px" }}>
                        <button style={styles.submitButton} type="submit" disabled={loading}>
                            {loading ? 'Loading...' : 'Log In'}
                        </button>
                    </div>
                    {error && <p className="error">{error}</p>}
                </form>

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
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ paddingTop: "20px", fontSize: "20px", fontWeight: 600, fontFamily: "poppins" }}>
                                        Get your right space for storage and collaboration. Register now.
                                    </div>
                                </div>
                                <div style={{ display: "flex", padding: "20px 20px 20px 0px", flexDirection: "row", justifyContent: "space-between" }}>
                                    <div style={{ width: "60%", fontSize: "16px", fontFamily: "poppins", color: "grey" }}>
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

export default LoginPage;

const styles = {
    login_page: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "radial-gradient(circle, rgba(99,156,72,1) 10%, rgba(9,9,9,1) 50%)",
    },

    mainPage: {
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
        fontSize: "22px",
        fontWeight: "400",
        color: "#6CB4EE",
        textAlign: "center",
        padding: "20px",
        paddingTop: "0px"
    },

    registerFormContainer: {
        padding: "20px",
        height: "80vh",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        marginLeft: "20px",

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
        width: "50%"
    },

    infoContainer: {
        backgroundColor: "rgb(130, 201, 97)",
        width: "34%",
        height: "90vh",
        borderRadius: "30px",
        mask:
            " calc(40px + 25px) bottom 30px, \
              bottom calc(40px + 25px) left 0 30px, \
              radial-gradient(40px at 0 100%,#0000 99%,#000 calc(100% + 1px)) \
               25px calc(-25px) no-repeat, \
              conic-gradient(from 180deg at calc(40px + 50px) calc(100% - 40px - 50px), \
               #0000 25%,#000 0);"

    }
};