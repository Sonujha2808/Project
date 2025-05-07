

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const PaymentPage = () => {
//   const navigate = useNavigate();
//   const [selectedMethod, setSelectedMethod] = useState('card');
//   const [cardName, setCardName] = useState('');
//   const [cardNumber, setCardNumber] = useState('');
//   const [expiry, setExpiry] = useState('');
//   const [cvv, setCvv] = useState('');
//   const [upiId, setUpiId] = useState('');

//   const amountToPay = 1499; // Dynamic amount

//   const handlePayment = () => {
//     if (selectedMethod === 'card') {
//       if (!cardName.trim() || !cardNumber.trim() || !expiry.trim() || !cvv.trim()) {
//         toast.error('Please fill all card details');
//         return;
//       }
//     }
//     if (selectedMethod === 'upi') {
//       if (!upiId.trim()) {
//         toast.error('Please enter your UPI ID');
//         return;
//       }
//     }
//     navigate('/thankyou');
//   };

//   return (
//     <div style={styles.pageContainer}>
//       <ToastContainer position="top-right" />
//       <style>
//         {`
//           .step {
//             display: flex;
//             justify-content: space-between;
//             margin-bottom: 2rem;
//             font-size: 0.9rem;
//             font-weight: 500;
//             color: #6b7280;
//           }
//           .step .active {
//             color: #2563eb;
//           }
//           .payment-container {
//             display: flex;
//             gap: 2rem;
//           }
//           .payment-methods {
//             width: 30%;
//             border: 1px solid #e5e7eb;
//             border-radius: 0.5rem;
//             padding: 1rem;
//             background-color: #f9fafb;
//           }
//           .payment-methods button {
//             width: 100%;
//             background: none;
//             border: none;
//             padding: 0.8rem;
//             text-align: left;
//             border-bottom: 1px solid #e5e7eb;
//             cursor: pointer;
//             font-weight: 500;
//             transition: background 0.3s;
//             display: flex;
//             align-items: center;
//             gap: 10px;
//           }
//           .payment-methods button:hover, .payment-methods .active {
//             background-color: #e0e7ff;
//           }
//           .payment-form {
//             flex-grow: 1;
//             border: 1px solid #e5e7eb;
//             border-radius: 0.5rem;
//             padding: 1.5rem;
//           }
//           .amount-summary {
//             width: 25%;
//             border: 1px solid #e5e7eb;
//             border-radius: 0.5rem;
//             padding: 1.5rem;
//             height: fit-content;
//             background-color: #f9fafb;
//           }
//           input {
//             width: 100%;
//             padding: 0.75rem 1rem;
//             border: 1px solid #ccc;
//             border-radius: 0.375rem;
//             outline: none;
//             margin-bottom: 1rem;
//           }
//           input:focus {
//             border-color: #2563eb;
//             box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.4);
//           }
//           .flex {
//             display: flex;
//             gap: 1rem;
//           }
//           .half {
//             width: 50%;
//           }
//           .pay-button {
//             width: 100%;
//             background-color: #2563eb;
//             color: white;
//             padding: 0.75rem;
//             border: none;
//             border-radius: 0.375rem;
//             font-weight: 600;
//             font-size: 1rem;
//             margin-top: 1rem;
//             cursor: pointer;
//             transition: background-color 0.3s;
//           }
//           .pay-button:hover {
//             background-color: #1d4ed8;
//           }
//           .payment-logo {
//             height: 20px;
//           }
//         `}
//       </style>

//       {/* Steps Indicator */}
//       <div className="step">
//         <div>1. Address</div>
//         <div className="active">2. Payment</div>
//         <div>3. Thank You</div>
//       </div>

//       {/* Main Payment Container */}
//       <div className="payment-container">

//         {/* Left Payment Methods */}
//         <div className="payment-methods">
//           <button 
//             className={selectedMethod === 'card' ? 'active' : ''}
//             onClick={() => setSelectedMethod('card')}
//           >
//             <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="payment-logo" />
//             <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="MasterCard" className="payment-logo" />
//             Credit / Debit Card
//           </button>

//           <button 
//             className={selectedMethod === 'upi' ? 'active' : ''}
//             onClick={() => setSelectedMethod('upi')}
//           >
//             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/PhonePe-Logo.png/1200px-PhonePe-Logo.png" alt="PhonePe" className="payment-logo" />
//             <img src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Google_Pay_Logo.svg" alt="GPay" className="payment-logo" />
//             UPI Apps
//           </button>

//           <button 
//             className={selectedMethod === 'cod' ? 'active' : ''}
//             onClick={() => setSelectedMethod('cod')}
//           >
//             💵 Cash on Delivery
//           </button>
//         </div>

//         {/* Center Payment Form */}
//         <div className="payment-form">
//           {selectedMethod === 'card' && (
//             <>
//               <h3>Enter Card Details</h3>
//               <input 
//                 type="text" 
//                 placeholder="Cardholder Name"
//                 value={cardName}
//                 onChange={(e) => setCardName(e.target.value)}
//               />
//               <input 
//                 type="text" 
//                 placeholder="Card Number"
//                 value={cardNumber}
//                 onChange={(e) => setCardNumber(e.target.value)}
//               />
//               <div className="flex">
//                 <input 
//                   type="text" 
//                   placeholder="MM/YY" 
//                   className="half"
//                   value={expiry}
//                   onChange={(e) => setExpiry(e.target.value)}
//                 />
//                 <input 
//                   type="text" 
//                   placeholder="CVV" 
//                   className="half"
//                   value={cvv}
//                   onChange={(e) => setCvv(e.target.value)}
//                 />
//               </div>
//             </>
//           )}

//           {selectedMethod === 'upi' && (
//             <>
//               <h3>Enter UPI ID</h3>
//               <input 
//                 type="text" 
//                 placeholder="example@upi" 
//                 value={upiId}
//                 onChange={(e) => setUpiId(e.target.value)}
//               />
//             </>
//           )}

//           {selectedMethod === 'cod' && (
//             <>
//               <h3>Cash on Delivery</h3>
//               <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
//                 Pay with cash once your order is delivered.
//               </p>
//             </>
//           )}

//           <button type="button" className="pay-button" onClick={handlePayment}>
//             {selectedMethod === 'cod' ? 'Place Order' : 'Make Payment'}
//           </button>
//         </div>

//         {/* Right Amount Summary */}
//         <div className="amount-summary">
//           <h3>Amount to Pay</h3>
//           <hr style={{ margin: '10px 0' }} />
//           <p style={{ fontWeight: '600', fontSize: '1.2rem' }}>₹ {amountToPay}</p>
//           <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Including all taxes</p>
//         </div>

//       </div>

//     </div>
//   );
// };

// const styles = {
//   pageContainer: {
//     maxWidth: '1200px',
//     margin: '0 auto',
//     padding: '2rem 1rem',
//   },
// };

// export default PaymentPage;


import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const amountToPay = location.state?.amountToPay || 0; // dynamic amount received from Cart

  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');

  const handlePayment = () => {
    if (selectedMethod === 'card') {
      if (!cardName.trim() || !cardNumber.trim() || !expiry.trim() || !cvv.trim()) {
        toast.error('Please fill all card details');
        return;
      }
    }
    if (selectedMethod === 'upi') {
      if (!upiId.trim()) {
        toast.error('Please enter your UPI ID');
        return;
      }
    }
    toast.success('Payment Successful!');
    setTimeout(() => {
      navigate('/thankyou');
    }, 2000);
  };

  return (
    <div style={styles.pageContainer}>
      <ToastContainer position="top-right" />
      
      <style>
        {`
          .step {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2rem;
            font-size: 0.9rem;
            font-weight: 500;
            color: #6b7280;
          }
          .step .active {
            color: #2563eb;
          }
          .payment-container {
            display: flex;
            gap: 2rem;
          }
          .payment-methods {
            width: 30%;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            padding: 1rem;
            background-color: #f9fafb;
          }
          .payment-methods button {
            width: 100%;
            background: none;
            border: none;
            padding: 0.8rem;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
            cursor: pointer;
            font-weight: 500;
            transition: background 0.3s;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .payment-methods button:hover, .payment-methods .active {
            background-color: #e0e7ff;
          }
          .payment-form {
            flex-grow: 1;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            padding: 1.5rem;
          }
          .amount-summary {
            width: 25%;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            padding: 1.5rem;
            height: fit-content;
            background-color: #f9fafb;
          }
          input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid #ccc;
            border-radius: 0.375rem;
            outline: none;
            margin-bottom: 1rem;
          }
          input:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.4);
          }
          .flex {
            display: flex;
            gap: 1rem;
          }
          .half {
            width: 50%;
          }
          .pay-button {
            width: 100%;
            background-color: #2563eb;
            color: white;
            padding: 0.75rem;
            border: none;
            border-radius: 0.375rem;
            font-weight: 600;
            font-size: 1rem;
            margin-top: 1rem;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          .pay-button:hover {
            background-color: #1d4ed8;
          }
          .payment-logo {
            height: 20px;
          }
        `}
      </style>

      {/* Steps Indicator */}
      <div className="step">
        <div>1. Address</div>
        <div className="active">2. Payment</div>
        <div>3. Thank You</div>
      </div>

      <div className="payment-container">

        {/* Payment Methods */}
        <div className="payment-methods">
          <button
            className={selectedMethod === 'card' ? 'active' : ''}
            onClick={() => setSelectedMethod('card')}
          >
            💳 Card Payment
          </button>
          <button
            className={selectedMethod === 'upi' ? 'active' : ''}
            onClick={() => setSelectedMethod('upi')}
          >
            📱 UPI
          </button>
          <button
            className={selectedMethod === 'cod' ? 'active' : ''}
            onClick={() => setSelectedMethod('cod')}
          >
            💵 Cash on Delivery
          </button>
        </div>

        {/* Payment Form */}
        <div className="payment-form">
          {selectedMethod === 'card' && (
            <>
              <input
                type="text"
                placeholder="Name on Card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <div className="flex">
                <input
                  type="text"
                  placeholder="Expiry Date (MM/YY)"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="half"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="half"
                />
              </div>
            </>
          )}

          {selectedMethod === 'upi' && (
            <>
              <input
                type="text"
                placeholder="Enter your UPI ID"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </>
          )}

          {selectedMethod === 'cod' && (
            <p style={{ marginBottom: "1rem", fontWeight: "500" }}>
              Pay in cash when your order is delivered.
            </p>
          )}

          <button className="pay-button" onClick={handlePayment}>
            Pay ₹{amountToPay}
          </button>
        </div>

        {/* Amount Summary */}
        <div className="amount-summary">
          <h2>Summary</h2>
          <p>Product Amount: ₹{amountToPay}</p>
          <p style={{ fontWeight: "bold" }}>Final Payable: ₹{amountToPay}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "auto",
  },
};

export default PaymentPage;
