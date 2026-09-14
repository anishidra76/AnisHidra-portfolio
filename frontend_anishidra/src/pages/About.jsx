import '../styles/main/about.css'
import { useEffect, useState } from 'react';
import API_URL from '../api';





function About() {


    const [about, setAbout] = useState([])
    useEffect(() => {
        fetch(`${API_URL}/api/about/aboutcontents/`)
            .then((response) => response.json())
            .then((data) => {
                setAbout(data);
            })
            .catch((error) => {
                console.log("Error", error);
            });
    }, []);

    
    return (
        <>
            <section id="about">
                <h2 className="section-title gradient-text">About Me</h2>
                    <div className="glow-card about-container">
                        <img src={
                                  about[0].image instanceof File
                                    ? URL.createObjectURL(about[0].image)
                                    : about[0].image.startsWith('http')
                                    ? about[0].image
                                    : `https://res.cloudinary.com/m6jjifei/${about[0].image}`
                                }
                        alt="Portrait of Anis Hidra"
                        className="about-photo" loading="lazy"
                        />
                        <p className="about-text">{about[0]?.description}</p>
                    </div>
                    
            </section>
        </>
    );
}

export default About