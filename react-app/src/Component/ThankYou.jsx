import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const amountPaid = location.state?.amountPaid || 0; // Get the amount from payment page

  useEffect(() => {
    // Clear cart and wishlist from localStorage after successful payment
    localStorage.removeItem('cartItems');
    localStorage.removeItem('wishlistItems');

    // Redirect to home after 10 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleDownloadInvoice = () => {
    const invoiceData = `
      Invoice
      ----------------------------
      Order ID: #${Math.floor(Math.random() * 1000000)}
      Date: ${new Date().toLocaleDateString()}
      Amount Paid: ₹ ${amountPaid}
      
      Thank you for shopping with us!
    `;

    const blob = new Blob([invoiceData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Invoice_${Date.now()}.txt`;
    link.click();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Thank You for Your Purchase! 🎉</h1>
      <p style={styles.subtitle}>Your order of ₹{amountPaid} has been placed successfully.</p>
      <p style={styles.redirectText}>You will be redirected to the Home page shortly...</p>

      <button style={styles.button} onClick={handleDownloadInvoice}>
        Download Invoice 📄
      </button>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '2.5rem',
    color: '#4CAF50',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  redirectText: {
    marginTop: '20px',
    fontSize: '1rem',
    color: '#777',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ThankYou;
