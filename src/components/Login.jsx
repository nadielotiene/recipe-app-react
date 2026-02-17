import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setUser }) {
  const navigate = useNavigate();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function clearForm() {
    setUsername("");
    setEmail("");
    setPassword("");
  }

  function handleCancel() {
    navigate("/");
  }

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login Successful!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        navigate("/"); 
      } else {
        setError(data.error || 'Failed to login');
        clearForm();
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Connection error. Make sure API is running!');
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Signup Successful!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        navigate("/"); 
      } else {
        setError(data.error || 'Failed to signup');
        clearForm();
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Connection error. Make sure API is running!');
    }
  }

  // function cancelButton() {
  //   clearForm();
  // }

  return (
    <>
    <div>
      <h1>{isLoginMode ? "Login" : "Sign Up"}</h1>
      {error && <p style={{color: "red"}}>{error}</p>}

      {isLoginMode ? (
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="loginEmail">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="loginPassword">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="button" className='cancel-btn'
            onClick={handleCancel}        
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>

      ) : (

        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="signupUsername">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="loginEmail">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="loginPassword">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="button" className='cancel-btn'
            onClick={handleCancel}        
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>

      )}

      <p>
        {isLoginMode ? "Don't have an account? " : "Already have an account? "}
        <button 
          className="btn btn-primary"
          onClick={() => setIsLoginMode(!isLoginMode)}>
          {isLoginMode ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
    </>
  )
}