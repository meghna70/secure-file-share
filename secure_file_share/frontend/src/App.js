import logo from './logo.svg';
import './App.css';
import RegisterPage from './pages/RegisterPage';
import { Route, Router, Routes } from 'react-router-dom';
import CheckOtp from './pages/CheckOtp';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import { setAuthToken } from './redux/slices/authSlice';
import AllUsers from './pages/AllUsers';

function App() {
  const token = localStorage.getItem('authToken');
  if (token) {
    setAuthToken(token);
  }
  return (

    <Routes>
      <Route path="/" element={<RegisterPage />} />
      <Route path="/check_otp" element={<CheckOtp />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/allUsers" element={<AllUsers/>}/>
      {/* Add other routes as needed */}
    </Routes>


  );
}

export default App;
