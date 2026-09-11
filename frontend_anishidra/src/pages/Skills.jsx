import { useState, useEffect } from "react";
import '../styles/main/skills.css'
import API_URL from '../api';


 
function getLevelLabelAndColor(percentage) {
    if (percentage < 60) {
        return {
            label: "Low",
            color: "var(--level-low)"
        };
    }

    if (percentage < 80) {
        return {
            label: "Medium",
            color: "var(--level-med)"
        };
    }

    return {
        label: "Advanced",
        color: "var(--level-high)"
    };
}
 




function Skills() {



    const [domains, setDomains] = useState([]);

    // ================= FETCH SKILLS =================

    useEffect(() => {
        fetch(`${API_URL}/api/skills/domains/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch skills");
                }

                return response.json();
            })
            .then((data) => {
                setDomains(data);
            })
            .catch((error) => {
                console.error("Error fetching skills:", error);
            });
    }, []);


    // ================= SKILLS LEVEL CALCULATOR =================

    useEffect(() => {

        if (domains.length === 0) return;

        const categories = document.querySelectorAll(".skill-cat");

        categories.forEach((cat) => {

            let catTotal = 0;
            let catCount = 0;

            const groups = cat.querySelectorAll(".skill-group");

            groups.forEach((group) => {

                let grpTotal = 0;

                const items = group.querySelectorAll(".skill-item");

                items.forEach((item) => {

                    const fill = item.querySelector(".progress-fill");

                    const level = parseInt(
                        fill.getAttribute("data-level"),
                        10
                    );

                    const status =
                        getLevelLabelAndColor(level);

                    fill.style.width = level + "%";
                    fill.style.backgroundColor =
                        status.color;

                    grpTotal += level;
                });

                if (items.length === 0) return;

                const grpAvg =
                    grpTotal / items.length;

                const grpStatus =
                    getLevelLabelAndColor(grpAvg);

                const grpLvlEl =
                    group.querySelector(".grp-lvl");

                if (grpLvlEl) {
                    grpLvlEl.textContent =
                        grpStatus.label;

                    grpLvlEl.style.color =
                        grpStatus.color;
                }

                catTotal += grpAvg;
                catCount++;
            });

            if (catCount === 0) return;

            const catAvg =
                catTotal / catCount;

            const catStatus =
                getLevelLabelAndColor(catAvg);

            const badge =
                cat.querySelector(".overall-badge");

            if (badge) {

                badge.textContent =
                    `Overall: ${catStatus.label} (${Math.round(catAvg)}%)`;

                badge.style.border =
                    `1px solid ${catStatus.color}`;

                badge.style.color =
                    catStatus.color;
            }
        });

    }, [domains]);
 
    return (
        <>
            <section id="skills">
                <h2 className="section-title gradient-text">Skills</h2>
        
                {domains.map((domain) => (
                    <div className="qual-block-skill" key={domain.id}>
                        <h3>{domain.name}</h3>
                        <div className="skills-columns">
                            {domain.sectors.map((sector) => (
                                <div className="glow-card skill-cat" id="cat-web" key={sector.id}>
                                    <div className="skill-cat-title">{sector.name}</div>
                                    <span className="overall-badge" id="badge-web">Calculating&hellip;</span>
                                        {sector.sections.map((section) => (
                                            <div className="skill-group" key={section.id}>
                                                <div className="group-title"><span>{section.name}</span><span className="grp-lvl"></span></div>
                                                {section.skills.map((skill) => (
                                                    <div className="skill-item" key={skill.id}>
                                                        <div className="item-info"><span>{skill.name}</span><span>{skill.lv}%</span></div>
                                                        <div className="progress-bar"><div className="progress-fill" data-level={skill.lv}></div></div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                    
            </section>
        </>
  )
}

export default Skills