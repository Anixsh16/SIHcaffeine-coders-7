// src/components/MotivationalVideos.js
import React, { useState } from 'react';
import './MotivationalVideos.css';

const categories = [
  { id: 'all', label: 'All Videos' },
  { id: 'mental', label: 'Mental Health & Depression' },
  { id: 'academic', label: 'Academic Excellence' },
  { id: 'purpose', label: 'Finding Purpose' },
  { id: 'stress', label: 'Stress Management' },
  { id: 'financial', label: 'Financial Management' },
  { id: 'time', label: 'Time & Productivity' },
  { id: 'confidence', label: 'Self Confidence' },
  { id: 'career', label: 'Career Growth' }
];

const videoData = [
    // Mental Health & Depression
    { id: 1, category: ['all', 'mental'], url: "https://www.youtube.com/embed/gAOmud-IoxQ?si=PUP4aMwQ3NsrLqnn", description: "Understanding and Overcoming Depression - A Comprehensive Guide" },
    { id: 2, category: ['all', 'mental'], url: "https://www.youtube.com/embed/2NZDp0E-HFc?si=edp7f_GtmGNfQXRw", description: "Practical Steps to Improve Your Mental Health" },
    { id: 3, category: ['all', 'mental'], url: "https://www.youtube.com/embed/d1sVO6x9p5U?si=au8KbGPqr4ZcRAw_", description: "Breaking Free from Anxiety and Depression" },
    { id: 4, category: ['all', 'mental'], url: "https://www.youtube.com/embed/I7eAd8WKLpA?si=p9uvVjXVFx3nSjfC", description: "Building Mental Resilience in College Life" },
    { id: 5, category: ['all', 'mental'], url: "https://www.youtube.com/embed/1I9ADpXbD6c?si=3W7DF3e9M8rKNUPY", description: "Transform Your Mindset - Mental Health Guide" },

    // Academic Excellence
    { id: 6, category: ['all', 'academic'], url: "https://www.youtube.com/embed/6dyO9dpLaok?si=f_yjCBkpzyZpzqFL", description: "Proven Strategies for Academic Success" },
    { id: 7, category: ['all', 'academic'], url: "https://www.youtube.com/embed/d9gwmyPMByM?si=w9AHyKSUjVCq1AbL", description: "Study Techniques That Actually Work" },
    { id: 8, category: ['all', 'academic'], url: "https://www.youtube.com/embed/g6BtbIiJ_rc?si=fvES2AEDwXzy5HnM", description: "Overcoming Academic Challenges" },
    { id: 9, category: ['all', 'academic'], url: "https://www.youtube.com/embed/8otBBSy-AGU?si=GS5MldzswPvxllTS", description: "Memory Techniques for Better Learning" },
    { id: 10, category: ['all', 'academic'], url: "https://www.youtube.com/embed/R7iN71uJcG0?si=Mfnp54c5fLygCd2w", description: "Excel in Your Studies - Complete Guide" },

    // Finding Purpose
    { id: 11, category: ['all', 'purpose'], url: "https://www.youtube.com/embed/vVsXO9brK7M?si=nYGK1eBzC7z5msSU", description: "Discovering Your Life's Purpose" },
    { id: 12, category: ['all', 'purpose'], url: "https://www.youtube.com/embed/0wAAH_Ieq78?si=oSySrPZ2uXO4Ln0H", description: "Finding Your True Passion in Life" },
    { id: 13, category: ['all', 'purpose'], url: "https://www.youtube.com/embed/1FdjQ2XzpNA?si=rZLYn3cHFQ7Vkf9o", description: "Stop Feeling Lost - Find Your Direction" },
    { id: 14, category: ['all', 'purpose'], url: "https://www.youtube.com/embed/tndcxA7sT2E?si=LSbWvOK-SosmsWJ8", description: "Creating a Meaningful Life Path" },
    { id: 15, category: ['all', 'purpose'], url: "https://www.youtube.com/embed/ZE-YCwsnc6A?si=UEFM8zlFahYlxMhE", description: "Purpose-Driven Success Stories" },

    // Stress Management 
    { id: 16, category: ['all', 'stress'], url: "https://www.youtube.com/embed/JEtNxNW0bRU?si=89OVOFX-5A-VG-of", description: "Effective Stress Management Techniques" },
    { id: 17, category: ['all', 'stress'], url: "https://www.youtube.com/embed/_2BFj-k__s0?si=pVDHtnmAoQleadxc", description: "Dealing with Academic Pressure" },
    { id: 18, category: ['all', 'stress'], url: "https://www.youtube.com/embed/15GaKTP0gFE?si=y2c5fBuwsxRMR1xf", description: "Stress Relief for Students" },
    { id: 19, category: ['all', 'stress'], url: "https://www.youtube.com/embed/Bk2-dKH2Ta4?si=7cq6pLeME8bXMQmj", description: "Balance Study and Life - Stress Free" },
    { id: 20, category: ['all', 'stress'], url: "https://www.youtube.com/embed/vpO_3ZegQL4?si=XDUFyqpj0xaqJbAv", description: "Mindfulness for Stress Reduction" },

    // Financial Management
    { id: 21, category: ['all', 'financial'], url: "https://www.youtube.com/embed/ZcAZC2RvK5M?si=ZB5BWlBX0ozWuu9u", description: "Smart Money Management for Students" },
    { id: 22, category: ['all', 'financial'], url: "https://www.youtube.com/embed/ngz4IoqcT38?si=TjPHGdHhBixIm8z4", description: "Financial Planning on Student Budget" },
    { id: 23, category: ['all', 'financial'], url: "https://www.youtube.com/embed/-ICCmkj4xko?si=_Z9oyR3t9ibXt-d8", description: "Save Money While Studying" },
    { id: 24, category: ['all', 'financial'], url: "https://www.youtube.com/embed/-CN8oSAMhec?si=ESTi4FvSWQjsPpJP", description: "Student's Guide to Financial Freedom" },
    { id: 25, category: ['all', 'financial'], url: "https://www.youtube.com/embed/TZZFBkbC2lA", description: "Building Financial Habits Early" }
];

const MotivationalVideos = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Add the filtering logic here
  const filteredVideos = selectedCategory === 'all' 
    ? videoData 
    : videoData.filter(video => video.category.includes(selectedCategory));

  return (
    <div className="videos-container">
      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
      {/* Rest of your JSX using filteredVideos instead of videoData */}

      <div 
        className="videos-list"
        style={{
          width: '100%',
          maxWidth: '1800px', // Constrain overall page width
          margin: '0 auto',
          padding: '40px 20px', // Add breathing room
          display: 'flex',
          flexDirection: 'column',
          gap: '30px' // Space between videos
        }}
      >
        {filteredVideos.map(video => (
          <div 
            key={video.id} 
            className="video-item"
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              padding: '15px 30px', // Reduced vertical padding from 30px to 15px
              backgroundColor: '#f7f7f7',
              borderRadius: '20px',
              margin: '5px auto', // Reduced margin
              boxSizing: 'border-box'
            }}
          >
            <div 
              className="video-content"
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '1000px' // Constrain content width
              }}
            >
              <iframe
                src={video.url}
                title="Motivational Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  width: '700px',
                  height: '400px', 
                  borderRadius: '12px',
                  marginBottom: '20px'
                }}
              />
              <p 
                className="video-description"
                style={{
                  backgroundColor: 'rgba(16, 18, 16, 0.95)',
                  color: '#ffffff',
                  padding: '20px',
                  borderRadius: '12px',
                  width: '700px',
                  fontSize: '1rem',
                  lineHeight: '1.6'
                }}
              >
                {video.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MotivationalVideos;
