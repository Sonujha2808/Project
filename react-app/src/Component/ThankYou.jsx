import React from 'react';

const ThankYou = () => {
  return (
    <div style={styles.container}>
      <style>
        {`
          .thank-you h2 {
            font-size: 2rem;
            font-weight: bold;
            color: #16a34a;
            margin-bottom: 1rem;
          }
          .thank-you p {
            font-size: 1rem;
            color: #374151;
            margin-bottom: 0.5rem;
          }
          .thank-you p:last-child {
            color: #6b7280;
          }
        `}
      </style>

      <div className="thank-you" style={styles.textCenter}>
        <h2>Thank You!</h2>
        <p>Your order has been placed successfully.</p>
        <p>A confirmation email will be sent to you shortly.</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
  },
  textCenter: {
    textAlign: 'center',
  },
};

export default ThankYou;
