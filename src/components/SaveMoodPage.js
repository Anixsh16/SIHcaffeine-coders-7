// src/components/SaveMoodPage.js
// npm install recharts
// npm install react-calendar
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './SaveMoodPage.css';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const SaveMoodPage = () => {
  const location = useLocation();
  const { note, selectedMood } = location.state || {};

  // Get current date
  const currentDate = new Date();
  const todayString = currentDate.toISOString().split('T')[0];

  // Define mood colors matching the emojis
  const moodColors = {
    happy: '#FFEC8B',      // Light Goldenrod
    love: '#FFB6C1',       // Light Pink
    sad: '#87CEFA',        // Light Sky Blue
    anxious: '#D8BFD8',    // Thistle
    angry: '#FFA07A',      // Light Salmon
    sleepy: '#ADD8E6',     // Light Blue
    confused: '#FFDAB9',   // Peach Puff
    pleased: '#98FB98',    // Pale Green
  };

  const currentMoodColor = moodColors[selectedMood] || '#00f2fe'; // Fallback color

  // State to hold mood data for dates
  const [dateMoodMap, setDateMoodMap] = useState({});

  useEffect(() => {
    // Function to generate random mood data for the past 30 days
    const generateRandomMoodData = () => {
      const moods = Object.keys(moodColors);
      const map = {};
      const today = new Date();

      for (let i = 1; i <= 30; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        const randomMood = moods[Math.floor(Math.random() * moods.length)];
        map[dateString] = randomMood;
      }

      return map;
    };

    // Check if mood data exists in localStorage
    const storedMoodMap = localStorage.getItem('dateMoodMap');
    if (storedMoodMap) {
      const parsedMap = JSON.parse(storedMoodMap);

      // Add today's mood if selected
      if (selectedMood) {
        parsedMap[todayString] = selectedMood;
        localStorage.setItem('dateMoodMap', JSON.stringify(parsedMap));
      }

      setDateMoodMap(parsedMap);
    } else {
      const newMoodMap = generateRandomMoodData();

      // Add today's mood if selected
      if (selectedMood) {
        newMoodMap[todayString] = selectedMood;
      }

      setDateMoodMap(newMoodMap);
      localStorage.setItem('dateMoodMap', JSON.stringify(newMoodMap));
    }
  }, [moodColors, selectedMood, todayString]);

  useEffect(() => {
    // Update today's mood color
    document.documentElement.style.setProperty('--mood-color', currentMoodColor);
  }, [currentMoodColor]);

  // Prepare data for Pie Chart
  const preparePieData = () => {
    const moodCounts = {};
    Object.values(dateMoodMap).forEach(mood => {
      moodCounts[mood] = (moodCounts[mood] || 0) + 1;
    });

    return Object.keys(moodCounts).map(mood => ({
      name: mood.charAt(0).toUpperCase() + mood.slice(1),
      value: moodCounts[mood]
    }));
  };

  const pieData = preparePieData();

  // Custom label to show percentage inside the pie slices
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }) => {
    const RADIAN = Math.PI / 180;
    // Calculate label position
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="14px"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="save-mood-page">
      <div className="left-section">
        <div className="top-left-box">
          <div className="date-container">
            <div className="date-box">
              <div className="date">{currentDate.getDate()}</div>
              <div className="month">{currentDate.toLocaleString('default', { month: 'long' })}</div>
            </div>
          </div>
          <div className="note-container">
            <div className="note-heading">
              Your Today's Note:
            </div>
            <div className="note-box">
              {note}
            </div>
          </div>
        </div>
        <div className="calendar-container">
          <Calendar
            value={currentDate}
            tileClassName={({ date, view }) => {
              if (view === 'month') {
                const dateString = date.toISOString().split('T')[0];
                if (
                  date.getDate() === currentDate.getDate() &&
                  date.getMonth() === currentDate.getMonth() &&
                  date.getFullYear() === currentDate.getFullYear()
                ) {
                  return 'current-date';
                }
                if (dateMoodMap[dateString]) {
                  return `mood-${dateMoodMap[dateString]}`;
                }
              }
              return null;
            }}
            // You can add other props like onClickDay if needed
          />
        </div>
      </div>
      <div className="right-section">
        <h3>Mood Distribution</h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={moodColors[entry.name.toLowerCase()]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SaveMoodPage;