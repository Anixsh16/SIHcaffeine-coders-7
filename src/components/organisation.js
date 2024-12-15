// Organization.js
import React, { useState, useEffect } from 'react';
import './organisation.css';
import backgroundImage from '../components/orgBg.jpg';
import Papa from 'papaparse';

const Organization = () => {
  const [studentData, setStudentData] = useState([]);
  const [showDropouts, setShowDropouts] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('studentData');
    if (savedData) {
      setStudentData(JSON.parse(savedData));
    }
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data.map(item => ({
            name: item.name,
            grades: parseFloat(item.grades),
            attendance: parseFloat(item.attendance),
            isDropout: item.dropoutStudentNames.trim().toLowerCase() === 'true'
          }));
          setStudentData(data);
          localStorage.setItem('studentData', JSON.stringify(data));
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          alert('Failed to parse CSV file.');
        }
      });
    }
  };

  const dropoutStudents = studentData.filter(student => student.isDropout);

  return (
    <div className="organization-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="upload-section">
        <h2>Upload Student Data</h2>
        <input 
          type="file" 
          accept=".csv"
          onChange={handleFileUpload}
          className="file-input"
        />
        <p className="file-format">
          Please upload a CSV file with columns: name, grades, attendance, dropoutStudentNames
        </p>
      </div>

      <button 
        className="show-dropouts-btn"
        onClick={() => setShowDropouts(!showDropouts)}
      >
        {showDropouts ? 'Hide' : 'Show'} Dropout Students
      </button>

      {showDropouts && (
        <div className="dropouts-list">
          <h3>Students at Risk of Dropout</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Grades</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {dropoutStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.grades}</td>
                  <td>{student.attendance}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Organization;