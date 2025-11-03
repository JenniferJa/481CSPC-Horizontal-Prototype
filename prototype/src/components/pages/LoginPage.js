import React, { useState } from 'react';
import { getStyles } from '../../styles/styles';

function LoginPage({ onLogin, textSize }) {
  const styles = getStyles(textSize);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const localStyles = {
    loginContainer: {
      maxWidth: '400px',
      margin: '50px auto',
      padding: '30px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    },
    title: {
      textAlign: 'center',
      color: '#333',
      fontSize: '24px',
      marginBottom: '25px',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '500',
      color: '#374151',
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      fontSize: '16px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      boxSizing: 'border-box', 
    },
    button: {
      ...styles.button(textSize),
      width: '100%',
    },
    error: {
      color: '#dc2626',
      textAlign: 'center',
      marginTop: '15px',
    },
    demoInfo: {
      textAlign: 'center',
      fontSize: '14px',
      color: '#666',
      marginTop: '20px',
      lineHeight: '1.5'
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginSuccess = onLogin(email, password);
    if (!loginSuccess) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={localStyles.loginContainer}>
        <h2 style={localStyles.title}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={localStyles.formGroup}>
            <label style={localStyles.label} htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              style={localStyles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={localStyles.formGroup}>
            <label style={localStyles.label} htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              style={localStyles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={localStyles.button}>
            Login
          </button>
          {error && <p style={localStyles.error}>{error}</p>}
        </form>
        <div style={localStyles.demoInfo}>
          <strong>Demo Login:</strong><br/>
          Email: `matias@test.com`<br/>
          Pass: `123`
        </div>
      </div>
    </div>
  );
}

export default LoginPage;