import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import './Login.css';
import bg from '../assets/bg.png';
import invertedCommas from '../assets/inverted_commas.png';
import showIcon from '../assets/show.png';
import hideIcon from '../assets/hide.png';

function Login() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formError, setFormError] = useState('');
  const [isPageHidden, setIsPageHidden] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student', 'parent');
  const [isLoading, setIsLoading] = useState(false);
  
  const quotes = [
    "It's not whether you get knocked down, it's whether you get back up.",
    "The only limit to our realization of tomorrow will be our doubts of today.",
    "It does not matter how slowly you go, as long as you do not stop.",
    "You don't have to be great to start, but you have to start to be great.",
    "Tell me and I forget, teach me and I may remember, involve me and I learn.",
  ];
  
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prevQuote) => (prevQuote + 1) % quotes.length);
    }, 10000);
    return () => clearInterval(quoteInterval);
  }, [quotes.length]);

  const validateForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setFormError('');

    try {
        // Simple authentication without organization check
        await signInWithEmailAndPassword(auth, email, password);

        // Navigate to the appropriate dashboard based on userType
        if (userType === 'student') {
            navigate('/Dashboard1'); // Dashboard for students
        } else if (userType === 'parent') {
            navigate('/Dashboard2'); // Dashboard for parents
        } else if (userType === 'organization') {
            navigate('/organization'); // Dashboard for organizations
        }
    } 

    catch (error) {
        console.error('Login error:', error);
        setFormError('Authentication failed. Please check your credentials.');
    } finally {
        setIsLoading(false);
    } 
};
const navigateToSignup = () => {
  setIsPageHidden(true);
  setTimeout(() => {
    navigate('/signup');
  }, 500);
};


  return (
    <div className={`login-container ${isPageHidden ? 'hidden' : ''}`} 
         style={{ backgroundImage: `url(${bg})` }}>
      <div className="login-box">
        <div className="login-left">
          <div className="quotes-container">
            <div className="quotes">
              <img src={invertedCommas} alt="Quote Icon" className="quote-icon" />
              <p id="quote">{quotes[currentQuote]}</p>
            </div>
            <div className="signup-link">
              <p>Don't have an account? <button onClick={navigateToSignup}>Sign up here</button></p>
            </div>
          </div>
        </div>
        
        <div className="login-right">
          <h2>Login to Your Account</h2>
          
          <div className="user-type-toggle">
            <button 
              className={`toggle-btn ${userType === 'student' ? 'active' : ''}`}
              onClick={() => setUserType('student')}
              disabled={isLoading}
            >
              Student
            </button>
            <button 
              className={`toggle-btn ${userType === 'parent' ? 'active' : ''}`}
              onClick={() => setUserType('parent')}
              disabled={isLoading}
            >
              Parent
            </button>
            <button 
              className={`toggle-btn ${userType === 'organization' ? 'active' : ''}`}
              onClick={() => setUserType('organization')}
              disabled={isLoading}
            >
              Organization
            </button>
          </div>

          <div className="form-box">
            <form onSubmit={validateForm}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  disabled={isLoading}
                />
              </div>
              <div className="form-group password-container">
                <label htmlFor="password">Password</label>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <img
                  src={passwordVisible ? hideIcon : showIcon}
                  alt="Toggle Password Visibility"
                  onClick={() => !isLoading && setPasswordVisible(!passwordVisible)}
                  style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
                />
              </div>
              {formError && <div className="error-message">{formError}</div>}
              <button 
                type="submit" 
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;