import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import '../styles/auth.css';
import AnimatedPage from '../components/animatedPage';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        'token',
        response.data.token
      );

      localStorage.setItem(
        'role',
        response.data.user.role
      );

      localStorage.setItem(
        'name',
        response.data.user.name
      );

      navigate('/events');

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }
  };

  return (
    <AnimatedPage>
      <div className='auth-container'>
        <div className='auth-card'>
          <h1>Login</h1>

          <form
            className='auth-form'
            onSubmit={handleLogin}
          >
            <input
              className='auth-input'
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className='auth-input'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              className='auth-button'
              type='submit'
            >
              Login
            </button>
          </form>
          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default Login;