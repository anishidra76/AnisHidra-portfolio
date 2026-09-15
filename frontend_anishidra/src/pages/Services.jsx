import "../styles/main/services.css";
import { useState, useEffect } from "react";
import API_URL from "../api";

export default function Services() {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch(`${API_URL}/api/services/servicecards/`)
            .then((response) => response.json())
            .then((data) => {
                setServices(data);
            })
            .catch((error) => {
                console.error("Error fetching services:", error);
            });
    }, []);

    return (
        <>
            <section id="services">
                <h2 className="section-title gradient-text">
                    Services Offered
                </h2>
                <p className="section-subtitle">
                    Comprehensive and advanced technology services tailored for
                    scale and modern security standards.
                </p>

                <div className="services-grid" id="services-container">
                    {services.map((service, i) => (
                        <div
                            className="glow-card service-card"
                            key={service.id}
                        >
                            <h3>{service.domain}</h3>
                            <h5>
                                {i + 1}. {service.title}
                            </h5>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
