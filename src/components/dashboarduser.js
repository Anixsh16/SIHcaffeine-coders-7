import React, { useState, useContext  } from 'react';
import './dashboarduser.css';
import { FaHome, FaRobot, FaUsers, FaLightbulb, FaHeartbeat, FaSmile, FaEnvelope, FaGraduationCap, FaSignOutAlt } from 'react-icons/fa';
import 'chart.js/auto';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { FaComments } from 'react-icons/fa';

const Dashboard = () => {
    const navigate = useNavigate();
    const toggleChat = () => {
        navigate('/chatbot');
    };
    const handleLogout = async () => {
        try {
          await signOut(auth);
          navigate('/');
        } catch (error) {
          console.error('Error logging out:', error);
        }
    };

    return (
        <div className='dashside'>
            <div className="sidebar1">
                <div className="sidebarpadding1">
                    <h2><div className="sidelogo1"></div></h2>
                    <ul className="sidebar-list">
                        <li className="sidebar-item"><a href="/dashboard" className="sidebar-link" data-tooltip="Dashboard"><FaHome className="icon1" /></a></li>
                        <li className="sidebar-item"><a href="/chatbot" className="sidebar-link" data-tooltip="Chatbot"><FaRobot className="icon1" /></a></li>
                       <li className="sidebar-item"><a href="/community" className="sidebar-link" data-tooltip="Community"><FaUsers className="icon1" /></a></li>
                        <li className="sidebar-item"><a href="/motivation" className="sidebar-link" data-tooltip="Motivation"><FaLightbulb className="icon1" /></a></li>
                        <li className="sidebar-item"><a href="/courses-recommendation" className="sidebar-link" data-tooltip="Courses"><FaHeartbeat className="icon1" /></a></li>
                        <li className="sidebar-item"><a href="/mood-tracker" className="sidebar-link" data-tooltip="Mood Tracker"><FaSmile className="icon1" /></a></li>
                        <li className="sidebar-item"><a href="/contact" className="sidebar-link" data-tooltip="Contact"><FaEnvelope className="icon1" /></a></li>
                        <li className="sidebar-item"><a href="/scholarship" className="sidebar-link" data-tooltip="Scholarship"><FaGraduationCap className="icon1" /></a></li>
                        <li className="sidebar-item"><a href="/logout" className="sidebar-link" data-tooltip="Logout"><FaSignOutAlt className="icon1" /></a></li>
                    </ul>
                </div>
            </div>
                <div className='dashheader1'>
                    <div className='mainhead1'>
                    <h1>Welcome back dear Warrior!</h1>
                    <div className='head31'>“Success is not final; failure is not fatal: It is the courage to continue that counts.” —Winston Churchill</div>
                    </div>
                </div>
            <button
          className="chat-button"
          onClick={toggleChat}
          aria-label="Open Chat"
        >
            <FaComments size={24} color="#fff" />
        </button>

        </div>
    );
};

export default Dashboard;
