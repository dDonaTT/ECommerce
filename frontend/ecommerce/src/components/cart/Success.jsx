import React from 'react';
import { Link } from 'react-router-dom';

function Success() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Payment Successful!</h1>
      <p style={styles.message}>
        Thank you for your purchase. Your transaction has been completed successfully.
      </p>
      <div style={styles.buttonContainer}>
        <Link to="/" style={styles.button}>
          Back to Home
        </Link>
        <Link to="/orderlist" style={styles.button}>
          View Order Details
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#4CAF50',
  },
  message: {
    fontSize: '18px',
    marginBottom: '30px',
    color: '#555',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: 'white',
    backgroundColor: '#4CAF50',
    textDecoration: 'none',
    borderRadius: '5px',
  },
};

export default Success;
