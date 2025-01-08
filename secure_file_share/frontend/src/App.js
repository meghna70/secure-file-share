import './App.css';
import RegisterPage from './pages/RegisterPage';
import { Route, Routes } from 'react-router-dom';
import CheckOtp from './pages/CheckOtp';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import { setAuthToken } from './redux/slices/authSlice';
import AllUsers from './pages/AllUsers';
import MyFiles from './pages/MyFiles';
import SharedFiles from './pages/SharedFiles';
import Summary from './pages/Summary';
import SharedFile from './pages/SharedFile';

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
      <Route path="/doc" element={<Summary/>}/>
      <Route path="/my-files" element={<MyFiles/>}/>
      <Route path="/shared-files" element={<SharedFiles/>}/>
      <Route path="/shared-files/:username" element={<SharedFile/>}/>
      {/* Add other routes as needed */}
    </Routes>


  );
}

export default App;
