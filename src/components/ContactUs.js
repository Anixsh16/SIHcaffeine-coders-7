import React, { useState } from 'react';
import './ContactUs.css';
import backgroundImage from './contactus.jpg';

const ContactUs = () => {
  const [activeForm, setActiveForm] = useState('student');

  const handleFormToggle = (form) => {
    setActiveForm(form);
  };

  return (
    <div
      className="container"
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="overlay"></div>
      <div className="form-container">
        <div className="button-group">
          {/* <button
            className= 'student'
          >
            Student
          </button> */}
        </div>
        <StudentForm />
        <button className="submit-button">Submit</button>
      </div>
    </div>
  );
};

const StudentForm = () => {
  return (
    <form className="form">
      <div className="form-grid">
        <div>
          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" />
        </div>
        <div>
          <label>Phone Number</label>
          <input type="text" pattern="\d{10}" title="Please enter exactly 10 digits" placeholder="Enter your phone number" />
        </div>
        <div>
          <label>Email ID</label>
          <input type="email" placeholder="Enter your email ID" />
        </div>
        <div>
          <label>What kind of support do you feel would help you the most?</label>
          <input type="text" placeholder="Enter the kind of support" />
        </div>
      </div>
    </form>
  );
};

export default ContactUs;