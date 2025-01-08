import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router-dom';
import email_verification from "../emails.png";
import instance from '../utils/axios';

function CheckOtp(props) {
    const [otp, setOtp] = useState('');
    const location = useLocation();
    const navigate= useNavigate();
    const email = location.state?.email;
    const username = location.state?.username;


    console.log("email and username :", email, username);

    const handleVerifyOTP = async () => {
        try {
            const body = {
                'otp': otp,
                'username': username,
                'email': email
            }
            const response = await instance.post('/api/verify', body);
            navigate('/login'); 
            console.log("Successful response from API:", response);
            return response.data;
        } catch (error) {
            console.error("Error in API request:", error.response?.data || error.message);
            // return rejectWithValue(error.response.data.message || 'Registration failed');
        }
    }
    return (

        <div style={{ ...styles.registerPage }}>
            <div style={styles.registerFormContainer} >
                <div style={styles.title} >
                    <img src={email_verification} alt="email"
                        style={{ width: '70px', height: "70px" }}
                    />
                </div>
                <div style={styles.subTitle}>OTP Verification</div>
                <div style={styles.description}>One Time Password (OTP) has been sent via Email to <div style={{ fontWeight: "500", marginTop: "10px" }}>{email}</div></div>
                <div style={{ ...styles.description, padding: "15px" }}> Enter the OTP below to verify it. </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "22px", marginBottom: "22px" }}>
                    <OtpInput
                        value={otp}
                        inputStyle={{ padding: "12px", borderRadius: "12px", fontSize: "20px" }}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span> ⚪  </span>}
                        renderInput={(props) => <input {...props} />}
                    />
                    <div style={{ padding: "10px", fontSize: "14px" }}>Resend OTP</div>
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "20px", paddingTop: "25px", paddingBottom: "25px" }}>
                    <button onClick={() => handleVerifyOTP()} style={styles.submitButton} type="submit" >
                        {'Verify'}
                    </button>
                </div>
            </div>
        </div>



    )
}

export default CheckOtp

const styles = {
    inputStyle: {
        border: "1px solid lightgrey",
        padding: "10px",
        borderRadius: "12px",
        fontSize: "18px",
        width: "90%"
    },
    title: {
        textAlign: "center",
        padding: "6px 12px"
    },
    subTitle: {
        fontSize: "22px",
        fontWeight: "600",
        color: "black",
        textAlign: "center",
        padding: "20px",
        paddingTop: "0px"
    },
    description: {
        fontSize: "18px",
        fontWeight: "400",
        color: "black",
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