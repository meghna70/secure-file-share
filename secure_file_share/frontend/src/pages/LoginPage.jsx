import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';


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
        <div style={{ ...styles.registerPage }}>
            <div style={styles.registerFormContainer} >
                <div style={styles.registerTiltle} >Welcome!</div>
                <div style={styles.registerSubTiltle}>Sign in to your account</div>
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


                    <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "20px", paddingTop: "25px", paddingBottom: "25px" }}>
                        <button style={styles.submitButton} type="submit" disabled={loading}>
                            {loading ? 'Loading...' : 'Log In'}
                        </button>
                    </div>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

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
        background: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
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