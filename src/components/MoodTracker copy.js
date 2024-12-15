// src/components/MoodTracker.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MoodTracker.css';

const MoodTracker = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);

  const handleSaveMood = () => {
    navigate('/save-mood', { state: { note, selectedMood } });
  };

  return (
    <div className="mood-page">
      <div className="header-section">
        <h1>Hello There!!</h1>
        <h2>How are you today?</h2>
      </div>
      
      <div className="emoji-grid">
        <button
          onClick={() => setSelectedMood('happy')}
          className={`emoji-button ${selectedMood === 'happy' ? 'selected happy' : ''}`}
        >
          <span className="emoji">😊</span>
          <span className="label">Happy</span>
        </button>
        <button
          onClick={() => setSelectedMood('love')}
          className={`emoji-button ${selectedMood === 'love' ? 'selected love' : ''}`}
        >
          <span className="emoji">🥰</span>
          <span className="label">In Love</span>
        </button>
        <button
          onClick={() => setSelectedMood('sad')}
          className={`emoji-button ${selectedMood === 'sad' ? 'selected sad' : ''}`}
        >
          <span className="emoji">😔</span>
          <span className="label">Sad</span>
        </button>
        <button
          onClick={() => setSelectedMood('anxious')}
          className={`emoji-button ${selectedMood === 'anxious' ? 'selected anxious' : ''}`}
        >
          <span className="emoji">😢</span>
          <span className="label">Anxious</span>
        </button>
        <button
          onClick={() => setSelectedMood('angry')}
          className={`emoji-button ${selectedMood === 'angry' ? 'selected angry' : ''}`}
        >
          <span className="emoji">😡</span>
          <span className="label">Angry</span>
        </button>
        <button
          onClick={() => setSelectedMood('sleepy')}
          className={`emoji-button ${selectedMood === 'sleepy' ? 'selected sleepy' : ''}`}
        >
          <span className="emoji">😴</span>
          <span className="label">Sleepy</span>
        </button>
        <button
          onClick={() => setSelectedMood('confused')}
          className={`emoji-button ${selectedMood === 'confused' ? 'selected confused' : ''}`}
        >
          <span className="emoji">🤔</span>
          <span className="label">Confused</span>
        </button>
        <button
          onClick={() => setSelectedMood('pleased')}
          className={`emoji-button ${selectedMood === 'pleased' ? 'selected pleased' : ''}`}
        >
          <span className="emoji">😎</span>
          <span className="label">Pleased</span>
        </button>
      </div>

      <div className="thoughts-section">
        <h3>Have some thoughts?</h3>
        <textarea
          placeholder="It was an awesome day!"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="button-container">
          <button className="skip-btn" onClick={handleSaveMood}>Skip for now</button>
          <button className="save-btn" onClick={handleSaveMood}>
            Save Mood
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;