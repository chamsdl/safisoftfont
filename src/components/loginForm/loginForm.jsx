import React, { useState, useEffect } from "react";
import './loginForm.css';
import { FaUserTie, FaLock } from "react-icons/fa";
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // State for the remember me checkbox
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the handleLogin function to perform authentication
    handleLogin(username, password);
  };

  // Function to handle login
  const handleLogin = async (username, password) => {
    try {
      // Make a POST request to the admin login endpoint
      const adminResponse = await axios.post('http://localhost:3000/loginadmin', {
        username: username,
        password: password
      });

      // Assuming the admin response contains a JSON token
      const adminToken = adminResponse.data.token;

      // Store the token in localStorage
      localStorage.setItem('token', adminToken);
      localStorage.setItem('usertype', "admin");
      // Optionally, you can redirect the user to another page or perform any other action
      console.log('Admin login successful! Token stored:', adminToken);
      navigate("/Utilisateur");
    } catch (adminError) {
      // Handle admin login errors
      console.error('Admin login error:', adminError);

      try {
        // Make a POST request to the vendeur login endpoint
        const vendeurResponse = await axios.post('http://localhost:3000/loginvendeur', {
          username: username,
          password: password
        });
        console.log(vendeurResponse);
        // Assuming the vendeur response contains a JSON token
        const vendeurToken = vendeurResponse.data.token;
        const id=vendeurResponse.data.id;
        const nom =vendeurResponse.data.nom;
        // Store the token in localStorage
        localStorage.setItem('token', vendeurToken);
        localStorage.setItem('usertype', "vendeur");
        localStorage.setItem('nom', nom);
        localStorage.setItem('id', id);
        // Optionally, you can redirect the user to another page or perform any other action
        console.log('Vendeur login successful! Token stored:', vendeurToken);
        navigate("/Article");
      } catch (vendeurError) {
        window.alert("please verify the data you enter");
        // Handle vendeur login errors
        console.error('Vendeur login error:', vendeurError);
      }
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle the state change of the remember me checkbox
  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };




  return (
    <div>
    <h1 className="titre1">SAFISoft</h1>
    <div className='wrapper'>
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="input-box">
          <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <FaUserTie className="icon" />
        </div>
        <div className="input-box">
          <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <VisibilityIcon className="icon" onClick={togglePasswordVisibility} />
        </div>
        <div className="remember-forgot">
          {/* Vous pouvez ajouter du contenu ici si nécessaire */}
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  </div>
  
  );
}

export default LoginForm;
