import React from 'react';

function TestApp() {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>🚀 Taleverse is Loading!</h1>
      <p style={{ color: '#666', textAlign: 'center', maxWidth: '500px' }}>
        Welcome to Taleverse - Your Web3-powered storytelling platform. 
        If you're seeing this, React is working correctly!
      </p>
      <div style={{ 
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#4f46e5',
        color: 'white',
        borderRadius: '8px'
      }}>
        ✅ React App Successfully Loaded
      </div>
    </div>
  );
}

export default TestApp;