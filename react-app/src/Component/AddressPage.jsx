import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddressPage.css'; // Import CSS

const AddressPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const amountToPay = location.state?.amountToPay;

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    pinCode: '',
    address: '',
    locality: '',
    city: '',
    state: '',
    addressType: 'Home',
    isDefault: false,
  });

  const handleProceed = () => {
    const { name, mobile, pinCode, address, locality, city, state } = formData;

    if (!name || !mobile || !pinCode || !address || !locality || !city || !state) {
      toast.error('Please fill out all the required fields before proceeding.', {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    navigate('/payment', { state: { amountToPay } });
  };

  const handleLocationFetch = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await response.json();
          const address = data.address;

          setFormData((prev) => ({
            ...prev,
            pinCode: address.postcode || '',
            city: address.city || address.town || address.village || '',
            state: address.state || '',
            locality: address.suburb || address.neighbourhood || '',
            address: `${address.house_number || ''} ${address.road || ''}`.trim(),
          }));
        } catch (error) {
          console.error('Error fetching address:', error);
          alert('Could not fetch address. Please try again.');
        }
      }, (error) => {
        console.error(error);
        alert('Permission denied or error getting location.');
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="address-container">
      <ToastContainer />

      {/* Steps Indicator */}
      <div className="step">
        <div className="active">1. Address</div>
        <div>2. Payment</div>
        <div>3. Thank You</div>
      </div>

      {/* Address Form */}
      <input type="text" name="name" placeholder="Name*" value={formData.name} onChange={handleChange} />
      <input type="text" name="mobile" placeholder="Mobile*" value={formData.mobile} onChange={handleChange} />
      <input type="text" name="pinCode" placeholder="Pin Code*" value={formData.pinCode} onChange={handleChange} />
      <input type="text" name="address" placeholder="Address (House No., Street, etc.)*" value={formData.address} onChange={handleChange} />
      <input type="text" name="locality" placeholder="Locality*" value={formData.locality} onChange={handleChange} />
      <input type="text" name="city" placeholder="City*" value={formData.city} onChange={handleChange} />
      <input type="text" name="state" placeholder="State*" value={formData.state} onChange={handleChange} />

      {/* Address Type */}
      <select name="addressType" value={formData.addressType} onChange={handleChange}>
        <option value="Home">Home</option>
        <option value="Work">Work</option>
      </select>

      {/* Default Address Checkbox */}
      <div className="checkbox-container">
        <input
          type="checkbox"
          name="isDefault"
          checked={formData.isDefault}
          onChange={handleChange}
        />
        <label>Make this my default address</label>
      </div>

      {/* Buttons */}
      <div className="address-buttons">
        <button type="button" onClick={handleLocationFetch}>
          📍 Auto-Fill using Current Location
        </button>
        <button type="button" onClick={handleProceed}>
          Proceed to Payment (₹{amountToPay})
        </button>
      </div>
    </div>
  );
};

export default AddressPage;
