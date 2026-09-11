import { useState, useEffect } from 'react';
import '../styles/main/achievements.css';
import API_URL from '../api';



function Achievements() {

    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
      const fetchAchievements = async() => {
        try {
          const response = await fetch(`${API_URL}/api/achievements/achievementcards/`);
          if(!response.ok) {
            throw new Error("Failed to fetch achievements");
          }
          const data = await response.json();
          setAchievements(data);
        } catch(error) {
          console.error("Error fetching achievements:", error);
        }
      };
      fetchAchievements();
    }, []);


    return (
      <>
        <section className="competitive-section" id="achievements">
          <h2 className="section-title gradient-text">
            Competitive Profiles
          </h2>

          <p className="competitive-subtitle">
            Explore my competitive programming and data science presence across platforms.
          </p>

          <div className="competitive-grid">
            {achievements.map((achievement) => (
              <div className="competitive-card" key={achievement.id}>
              
                <div className="profile-header">
                  <div className="profile-icon">
                    <i className={achievement.icon}></i>
                  </div>
            
                  <div className="profile-info">
                    <h3>{achievement.title}</h3>
                    <a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {achievement.link.replace("https://", "")}
                    </a>
                  </div>
            
                  <i className="fa-solid fa-arrow-up-right-from-square external-icon"></i>
                </div>
            
                <div className="profile-divider"></div>
            
                <p className="profile-description">
                  {achievement.description}
                </p>
            
                <div className="profile-stats">
                    <div className="profile-stat">
                      <strong>{achievement.value1}</strong>
                      <span>{achievement.label1}</span>
                    </div>
                    <div className="profile-stat">
                      <strong>{achievement.value2}</strong>
                      <span>{achievement.label2}</span>
                    </div>
                    <div className="profile-stat">
                      <strong>{achievement.value3}</strong>
                      <span>{achievement.label3}</span>
                    </div>
                </div>
                
                <a
                  href={achievement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="profile-button"
                >
                  View Profile
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
                
              </div>
            ))}
          </div>
        </section>
      </>
  );
};

export default Achievements;