import { useState, useEffect } from "react";
import "../styles/main/qualifications.css";
import API_URL from "../api";

export default function Qualifications({ openModal }) {
    const [education, setEducation] = useState([]);
    const [certificate, setCertificate] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/api/qualifications/educationcards/`)
            .then((response) => response.json())
            .then((data) => {
                setEducation(data);
            })
            .catch((error) => {
                console.error("Error fetching education:", error);
            });
        fetch(`${API_URL}/api/qualifications/certificatecards/`)
            .then((response) => response.json())
            .then((data) => {
                setCertificate(data);
            })
            .catch((error) => {
                console.error("Error fetching certification:", error);
            });
    }, []);

    return (
        <>
            <section id="qualifications">
                <h2 className="section-title gradient-text">Qualifications</h2>

                {/* EDUCATION BLOCK */}

                <div className="qual-block">
                    <h3>Education Tracks</h3>
                    {education.map((educations) => (
                        <div className="edu-list" key={educations.id}>
                            <div className="glow-card edu-item">
                                <div className="educdev">
                                    <h4>
                                        {educations.specialization}{" "}
                                        <span>|</span> {educations.field}
                                    </h4>
                                    <p className="edu-meta">
                                        {educations.entity}{" "}
                                        <span>&middot;</span> {educations.date}
                                    </p>
                                </div>
                                <span className="edu-badge">
                                    {educations.degree}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CERTIFICATIONS BLOCK */}

                <div className="qual-block">
                    <h3>Certifications</h3>
                    <div className="cert-grid">
                        {certificate.map((certificate) => (
                            <div
                                className="glow-card cert-card shimmer-box"
                                key={certificate.id}
                            >
                                <img
                                    src={
                                        !certificate?.image
                                            ? ""
                                            : certificate.image.startsWith(
                                                    "http",
                                                )
                                              ? certificate.image
                                              : `https://res.cloudinary.com/m6jjifei/${certificate.image}`
                                    }
                                    alt={certificate.name}
                                    loading="lazy"
                                />
                                <h4>{certificate.name}</h4>
                                <div className="cert-actions">
                                    <button
                                        type="button"
                                        className="btn-gradient btn-sm"
                                        onClick={(e) =>
                                            openModal(
                                                certificate.image.startsWith(
                                                    "http",
                                                )
                                                    ? certificate.image
                                                    : `https://res.cloudinary.com/m6jjifei/${certificate.image}`,
                                            )
                                        }
                                    >
                                        View
                                    </button>
                                    <a
                                        href={certificate.link}
                                        className="btn-gradient btn-sm"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Verify Link
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
