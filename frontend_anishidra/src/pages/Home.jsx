import "../styles/main/home.css";
import { useState, useEffect } from "react";
import API_URL from "../api";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
    const [homeData, setHomeData] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/home/homestatics/`)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    setHomeData(data[0]);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    return (
        <>
            <section id="home">
                <div className="hero-content">
                    <h1 className="gradient-text">Anis Hidra</h1>
                    <p className="hero-eyebrow">
                        <TypeAnimation
                            sequence={["Full Stuck Web Developer", 2000, ""]}
                            speed={50}
                            repeat={Infinity}
                        />
                    </p>
                    <div className="sidebar-socials">
                        <a
                            href="https://github.com/anishidra76"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                        >
                            <i className="fa-brands fa-github"></i>
                        </a>
                        <a
                            href="https://linkedin.com/in/anishidra76"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                        >
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                        <a
                            href="https://discord.com/users/1522648106154463356"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Discord"
                        >
                            <i className="fa-brands fa-discord"></i>
                        </a>
                        <a
                            href="https://x.com/anishidra76"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="X (Twitter)"
                        >
                            <i className="fa-brands fa-x-twitter"></i>
                        </a>
                    </div>
                    <div className="hero-cta">
                        <a href="#projects" className="btn-gradient">
                            View Projects
                        </a>
                        <a href="#contact" className="btn-outline">
                            Contact Me
                        </a>
                    </div>
                </div>

                {/* STATS */}

                <section className="stats" id="stats">
                    <div className="stats-inner reveal gradient-text">
                        <div className="stat">
                            <span className="stat-num">
                                {homeData ? homeData.yearsExperience : 0}+
                            </span>
                            <span className="stat-label">
                                Years of Experience
                            </span>
                        </div>
                        <div className="stat">
                            <span className="stat-num">
                                {homeData ? homeData.projectsCompleted : 0}+
                            </span>
                            <span className="stat-label">
                                Projects Completed
                            </span>
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
}
