import { useEffect, useState } from "react";
import '../styles/header.css';





const NAV_ITEMS = [
    { id: "home", icon: "fa-house", label: "Home" },
    { id: "about", icon: "fa-user", label: "About" },
    { id: "skills", icon: "fa-laptop-code", label: "Skills" },
    { id: "qualifications", icon: "fa-star", label: "Qualifications" },
    { id: "achievements", icon: "fa-award", label: "Achievements" },
    { id: "projects", icon: "fa-diagram-project", label: "Projects" },
    { id: "services", icon: "fa-list-check", label: "Services" },
    { id: "contact", icon: "fa-envelope", label: "Contact" },
];



export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    
    /* Close the mobile menu automatically on wider viewports */
    useEffect(() => {
        function handleResize() {
          if (window.innerWidth > 768) setMenuOpen(false);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    /* Scrollspy — highlight the nav link for the section currently in view */
    useEffect(() => {
        const sections = document.querySelectorAll("main section[id]");
        const spyObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                      setActiveSection(entry.target.getAttribute("id"));
                    }
                });
            },
            { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
        );
        sections.forEach((section) => spyObserver.observe(section));
        return () => spyObserver.disconnect();
    }, []);


    return (
        <>
            <header className="sidebar">

                <div className="brand">
                    <a href="#home" aria-label="Anis Hidra, back to top">
                        <h2 className="gradient-text">&lt;Anis.Dev/&gt;</h2>
                    </a>
                </div>

                <button className="menu-toggle" id="menuToggle" aria-expanded={menuOpen} aria-controls="navLinks" aria-label="Toggle navigation menu" onClick={() => setMenuOpen(o => !o)}>
                    <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`} id="menuIcon"></i>
                </button>

                <nav aria-label="Primary">
                    <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
                        {NAV_ITEMS.map(item => (
                            <li key={item.id}>
                                <a
                                  href={`#${item.id}`}
                                  className={activeSection === item.id ? 'active' : undefined}
                                  aria-current={activeSection === item.id ? 'page' : undefined}
                                  onClick={() => setMenuOpen(false)}
                                >
                                    <i className={`fa-solid ${item.icon}`}></i> <span>{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                  
                <div className="tech-dots">
                    <i className="fa-brands fa-python" title="Python"></i>
                    <i className="fa-brands fa-react" title="React"></i>
                    <i className="fa-solid fa-brain" title="AI Engineering"></i>
                    <i className="fa-brands fa-node-js" title="Node.js"></i>
                </div>

            </header>
        </>
    );
}
