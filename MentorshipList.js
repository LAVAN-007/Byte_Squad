//MentorshipList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MentorshipList = () => {
  const [mentorships, setMentorships] = useState([]);

  useEffect(() => {
    axios.get('/api/mentorship')
      .then(response => {
        setMentorships(response.data);
      })
      .catch(error => {
        console.error('Error fetching mentorships:', error);
      });
  }, []);

  return (
    <div>
      <h2>Mentorships</h2>
      <ul>
        {mentorships.map(mentorship => (
          <li key={mentorship._id}>
            {mentorship.mentor} - {mentorship.mentee}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MentorshipList;
