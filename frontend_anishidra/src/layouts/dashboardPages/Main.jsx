import React, { useEffect, useState, useSyncExternalStore } from "react";
import styles from "../dashboardStyles/main.module.css";
import API_URL from '/src/api.js';



const Main = () => {

  /* =========================
     HOME
  ========================= */

  const [yearsExperience, setYearsExperience] = useState(null);
  const [projectsCompleted, setProjectsCompleted] = useState(null);

  const [homeID, setHomeID] = useState(null);
  useEffect(() => {
    fetch(`${API_URL}/api/home/homestatics/`)
      .then((response) => {
        if(!response.ok) {
          throw new Error("Failed to fetch Home data");
        }
        return response.json();
      })
      .then((data) => {
        if(data.length > 0) {
          const home = data[0];
          setHomeID(home.id);
          setYearsExperience(home.yearsExperience);
          setProjectsCompleted(home.projectsCompleted);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
  }, []);

  const saveHome = () => {
    if(!homeID) {
      alert("Home data not found.");
      return <p>Loading...</p>;
    }
    const data = {
      yearsExperience: yearsExperience,
      projectsCompleted: projectsCompleted,
    };

    fetch(`${API_URL}/api/home/homestatics/${homeID}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if(!response.ok) {
          throw new Error("Field to save Home data");
        }
        return response.json();
      })
      .then(() => {
        console.log("SAVED DATA:", data);
        alert("Home information saved successfully!");
      })
      .catch((error) => {
        console.error("Error", error);
        alert("Error saving Home information.");
      });
  }

    



  /* =========================
     ABOUT
  ========================= */

  
  const [about, setAbout] = useState([]);

  useEffect(() => {
    console.log("useEffect started");
    fetch(`${API_URL}/api/about/aboutcontents/`)
      .then((response) => {
        if(!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json()
      })
      .then((data) => {
        console.log("About data:", data);
        setAbout(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const saveAbout = async() => {
    const formData = new FormData();
    formData.append('description', about[0].description);
    if(about[0].image instanceof File) {
      formData.append('image', about[0].image);
    }
    try {
      const response = await fetch(
        `${API_URL}/api/about/aboutcontents/${about[0].id}/`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      const data = await response.json();
      console.log("Updated", data);
      setAbout([data]);
      alert("About information saved successfully!");
      console.log("About Image", about[0].image);

    } catch(error) {
      console.error("Error", error);
    }
  };

  if(!about) {
    return <p>Loading...</p>
  }


// ================= SKILLS =================

const [skillFields, setSkillFields] = useState([]);

useEffect(() => {
  loadSkills();
}, []);

const loadSkills = async () => {
  try {
    const response = await fetch(`${API_URL}/api/skills/domains/`);

    if (!response.ok) {
      throw new Error("Failed to fetch domains");
    }

    const data = await response.json();

    setSkillFields(data);
  } catch (error) {
    console.error("Error loading skills:", error);
  }
};


// ================= ADD DOMAIN =================

const addSkillField = () => {
  setSkillFields((prev) => [
    ...prev,
    {
      id: `new-domain-${Date.now()}`,
      name: "",
      sectors: [],
      isNew: true,
    },
  ]);
};


// ================= UPDATE DOMAIN =================

const updateSkillField = (domainId, value) => {
  setSkillFields((prev) =>
    prev.map((domain) =>
      domain.id === domainId
        ? { ...domain, name: value }
        : domain
    )
  );
};


// ================= DELETE DOMAIN =================

const deleteSkillField = async (domainId) => {
  const domain = skillFields.find(
    (item) => item.id === domainId
  );

  if (!domain) return;

  // New domain → remove only from React
  if (domain.isNew) {
    setSkillFields((prev) =>
      prev.filter((item) => item.id !== domainId)
    );
    return;
  }

  try {
    const response = await fetch(
      `${API_URL}/api/skills/domains/${domainId}/`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete domain");
    }

    setSkillFields((prev) =>
      prev.filter((item) => item.id !== domainId)
    );
  } catch (error) {
    console.error("Error deleting domain:", error);
  }
};


// ================= ADD SECTOR =================

const addSpecialization = async (domainId) => {
  const domain = skillFields.find(
    (item) => item.id === domainId
  );

  if (!domain) return;

  // If domain is new, keep everything locally
  if (domain.isNew) {
    setSkillFields((prev) =>
      prev.map((item) =>
        item.id === domainId
          ? {
              ...item,
              sectors: [
                ...item.sectors,
                {
                  id: `new-sector-${Date.now()}`,
                  name: "",
                  sections: [],
                  isNew: true,
                },
              ],
            }
          : item
      )
    );

    return;
  }

  try {
    const response = await fetch(
      `${API_URL}/api/skills/sectors/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domain: domainId,
          name: "",
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create sector");
    }

    const data = await response.json();

    setSkillFields((prev) =>
      prev.map((item) =>
        item.id === domainId
          ? {
              ...item,
              sectors: [
                ...item.sectors,
                {
                  ...data,
                  sections: [],
                },
              ],
            }
          : item
      )
    );
  } catch (error) {
    console.error("Error adding sector:", error);
  }
};


// ================= UPDATE SECTOR =================

const updateSpecialization = (
  domainId,
  sectorId,
  value
) => {
  setSkillFields((prev) =>
    prev.map((domain) =>
      domain.id === domainId
        ? {
            ...domain,
            sectors: domain.sectors.map((sector) =>
              sector.id === sectorId
                ? {
                    ...sector,
                    name: value,
                  }
                : sector
            ),
          }
        : domain
    )
  );
};


// ================= DELETE SECTOR =================

const deleteSpecialization = async (
  domainId,
  sectorId
) => {
  const domain = skillFields.find(
    (item) => item.id === domainId
  );

  const sector = domain?.sectors.find(
    (item) => item.id === sectorId
  );

  if (!sector) return;

  if (sector.isNew) {
    setSkillFields((prev) =>
      prev.map((domain) =>
        domain.id === domainId
          ? {
              ...domain,
              sectors: domain.sectors.filter(
                (sector) => sector.id !== sectorId
              ),
            }
          : domain
      )
    );

    return;
  }

  try {
    const response = await fetch(
      `${API_URL}/api/skills/sectors/${sectorId}/`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete sector");
    }

    setSkillFields((prev) =>
      prev.map((domain) =>
        domain.id === domainId
          ? {
              ...domain,
              sectors: domain.sectors.filter(
                (sector) => sector.id !== sectorId
              ),
            }
          : domain
      )
    );
  } catch (error) {
    console.error("Error deleting sector:", error);
  }
};


// ================= ADD SECTION =================

const addCategory = async (
  domainId,
  sectorId
) => {
  const domain = skillFields.find(
    (item) => item.id === domainId
  );

  const sector = domain?.sectors.find(
    (item) => item.id === sectorId
  );

  if (!sector) return;

  if (sector.isNew) {
    setSkillFields((prev) =>
      prev.map((domain) =>
        domain.id === domainId
          ? {
              ...domain,
              sectors: domain.sectors.map((sector) =>
                sector.id === sectorId
                  ? {
                      ...sector,
                      sections: [
                        ...sector.sections,
                        {
                          id: `new-section-${Date.now()}`,
                          name: "",
                          skills: [],
                          isNew: true,
                        },
                      ],
                    }
                  : sector
              ),
            }
          : domain
      )
    );

    return;
  }

  try {
    const response = await fetch(
      `${API_URL}/api/skills/sections/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sector: sectorId,
          name: "",
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create section");
    }

    const data = await response.json();

    setSkillFields((prev) =>
      prev.map((domain) =>
        domain.id === domainId
          ? {
              ...domain,
              sectors: domain.sectors.map((sector) =>
                sector.id === sectorId
                  ? {
                      ...sector,
                      sections: [
                        ...sector.sections,
                        {
                          ...data,
                          skills: [],
                        },
                      ],
                    }
                  : sector
              ),
            }
          : domain
      )
    );
  } catch (error) {
    console.error("Error adding section:", error);
  }
};


// ================= UPDATE SECTION =================

const updateCategory = (
  domainId,
  sectorId,
  sectionId,
  value
) => {
  setSkillFields((prev) =>
    prev.map((domain) =>
      domain.id === domainId
        ? {
            ...domain,
            sectors: domain.sectors.map((sector) =>
              sector.id === sectorId
                ? {
                    ...sector,
                    sections: sector.sections.map(
                      (section) =>
                        section.id === sectionId
                          ? {
                              ...section,
                              name: value,
                            }
                          : section
                    ),
                  }
                : sector
            ),
          }
        : domain
    )
  );
};


// ================= DELETE SECTION =================

const deleteCategory = async (
  domainId,
  sectorId,
  sectionId
) => {
  const domain = skillFields.find(
    (item) => item.id === domainId
  );

  const sector = domain?.sectors.find(
    (item) => item.id === sectorId
  );

  const section = sector?.sections.find(
    (item) => item.id === sectionId
  );

  if (!section) return;

  if (section.isNew) {
    setSkillFields((prev) =>
      prev.map((domain) =>
        domain.id === domainId
          ? {
              ...domain,
              sectors: domain.sectors.map((sector) =>
                sector.id === sectorId
                  ? {
                      ...sector,
                      sections: sector.sections.filter(
                        (section) =>
                          section.id !== sectionId
                      ),
                    }
                  : sector
              ),
            }
          : domain
      )
    );

    return;
  }

  try {
    const response = await fetch(
      `${API_URL}/api/skills/sections/${sectionId}/`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete section");
    }

    setSkillFields((prev) =>
      prev.map((domain) =>
        domain.id === domainId
          ? {
              ...domain,
              sectors: domain.sectors.map((sector) =>
                sector.id === sectorId
                  ? {
                      ...sector,
                      sections: sector.sections.filter(
                        (section) =>
                          section.id !== sectionId
                      ),
                    }
                  : sector
              ),
            }
          : domain
      )
    );
  } catch (error) {
    console.error("Error deleting section:", error);
  }
};


// ================= ADD SKILL =================

const addSkill = async (
  domainId,
  sectorId,
  sectionId,
) => {
  const domain = skillFields.find(
    (item) => item.id === domainId
  );

  const sector = domain?.sectors.find(
    (item) => item.id === sectorId
  );

  const section = sector?.sections.find(
    (item) => item.id === sectionId
  );

  if (!section) return;

  if (section.isNew) {
    setSkillFields((prev) =>
      prev.map((domain) =>
        domain.id === domainId
          ? {
              ...domain,
              sectors: domain.sectors.map((sector) =>
                sector.id === sectorId
                  ? {
                      ...sector,
                      sections: sector.sections.map(
                        (section) =>
                          section.id === sectionId
                            ? {
                                ...section,
                                skills: [
                                  ...section.skills,
                                  {
                                    id: `new-skill-${Date.now()}`,
                                    name: "",
                                    lv: 0,
                                    isNew: true,
                                  },
                                ],
                              }
                            : section
                      ),
                    }
                  : sector
              ),
            }
          : domain
      )
    );

    return;
  }

  try {
    const response = await fetch(
      `${API_URL}/api/skills/skills/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          section: sectionId,
          name: "",
          lv: 0,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create skill");
    }

    const data = await response.json();

    setSkillFields((prev) =>
      prev.map((domain) =>
        domain.id === domainId
          ? {
              ...domain,
              sectors: domain.sectors.map((sector) =>
                sector.id === sectorId
                  ? {
                      ...sector,
                      sections: sector.sections.map(
                        (section) =>
                          section.id === sectionId
                            ? {
                                ...section,
                                skills: [
                                  ...section.skills,
                                  data,
                                ],
                              }
                            : section
                      ),
                    }
                  : sector
              ),
            }
          : domain
      )
    );
  } catch (error) {
    console.error("Error adding skill:", error);
  }
};


// ================= UPDATE SKILL =================

const updateSkill = (
  domainId,
  sectorId,
  sectionId,
  skillId,
  field,
  value
) => {
  setSkillFields((prev) =>
    prev.map((domain) =>
      domain.id === domainId
        ? {
            ...domain,
            sectors: domain.sectors.map((sector) =>
              sector.id === sectorId
                ? {
                    ...sector,
                    sections: sector.sections.map((section) =>
                      section.id === sectionId
                        ? {
                            ...section,
                            skills: section.skills.map((skill) =>
                              skill.id === skillId
                                ? {
                                    ...skill,
                                    [field]:
                                      field === "lv"
                                        ? Number(value)
                                        : value,
                                  }
                                : skill
                            ),
                          }
                        : section
                    ),
                  }
                : sector
            ),
          }
        : domain
    )
  );
};


// ================= DELETE SKILL =================

const deleteSkill = async (
  domainId,
  sectorId,
  sectionId,
  skillId
) => {
  const domain = skillFields.find(
    (item) => item.id === domainId
  );

  const sector = domain?.sectors.find(
    (item) => item.id === sectorId
  );

  const section = sector?.sections.find(
    (item) => item.id === sectionId
  );

  const skill = section?.skills.find(
    (item) => item.id === skillId
  );

  if (!skill) return;

  if (skill.isNew) {
    setSkillFields((prev) =>
      prev.map((domain) =>
        domain.id === domainId
          ? {
              ...domain,
              sectors: domain.sectors.map((sector) =>
                sector.id === sectorId
                  ? {
                      ...sector,
                      sections: sector.sections.map(
                        (section) =>
                          section.id === sectionId
                            ? {
                                ...section,
                                skills: section.skills.filter(
                                  (skill) =>
                                    skill.id !== skillId
                                ),
                              }
                            : section
                      ),
                    }
                  : sector
              ),
            }
          : domain
      )
    );

    return;
  }

  try {
    const response = await fetch(
      `${API_URL}/api/skills/skills/${skillId}/`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete skill");
    }

    setSkillFields((prev) =>
      prev.map((domain) =>
        domain.id === domainId
          ? {
              ...domain,
              sectors: domain.sectors.map((sector) =>
                sector.id === sectorId
                  ? {
                      ...sector,
                      sections: sector.sections.map(
                        (section) =>
                          section.id === sectionId
                            ? {
                                ...section,
                                skills: section.skills.filter(
                                  (skill) =>
                                    skill.id !== skillId
                                ),
                              }
                            : section
                      ),
                    }
                  : sector
              ),
            }
          : domain
      )
    );
  } catch (error) {
    console.error("Error deleting skill:", error);
  }
};


// ================= SAVE =================

const saveSkills = async () => {
  try {
    for (const domain of skillFields) {

      // CREATE DOMAIN
      if (domain.isNew) {
        const domainResponse = await fetch(
          `${API_URL}/api/skills/domains/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: domain.name,
            }),
          }
        );

        if (!domainResponse.ok) {
          throw new Error("Failed to create domain");
        }

        const createdDomain =
          await domainResponse.json();

        // CREATE ITS SECTORS
        for (const sector of domain.sectors) {
          const sectorResponse = await fetch(
            `${API_URL}/api/skills/sectors/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                domain: createdDomain.id,
                name: sector.name,
              }),
            }
          );

          if (!sectorResponse.ok) {
            throw new Error("Failed to create sector");
          }

          const createdSector =
            await sectorResponse.json();

          // CREATE ITS SECTIONS
          for (const section of sector.sections) {
            const sectionResponse = await fetch(
              `${API_URL}/api/skills/sections/`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  sector: createdSector.id,
                  name: section.name,
                }),
              }
            );

            if (!sectionResponse.ok) {
              throw new Error(
                "Failed to create section"
              );
            }

            const createdSection =
              await sectionResponse.json();

            // CREATE ITS SKILLS
            for (const skill of section.skills) {
              const skillResponse = await fetch(
                `${API_URL}/api/skills/skills/`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    section: createdSection.id,
                    name: skill.name,
                    lv: skill.lv,
                  }),
                }
              );

              if (!skillResponse.ok) {
                throw new Error(
                  "Failed to create skill"
                );
              }
            }
          }
        }
      }

      // UPDATE EXISTING DOMAIN
      else {
        await fetch(
          `${API_URL}/api/skills/domains/${domain.id}/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: domain.name,
            }),
          }
        );

        // UPDATE EXISTING SECTORS
        for (const sector of domain.sectors) {
          if (!sector.isNew) {
            await fetch(
              `${API_URL}/api/skills/sectors/${sector.id}/`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: sector.name,
                }),
              }
            );
          }
        }

        // UPDATE EXISTING SECTIONS
        for (const sector of domain.sectors) {
          for (const section of sector.sections) {
            if (!section.isNew) {
              await fetch(
                `${API_URL}/api/skills/sections/${section.id}/`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name: section.name,
                  }),
                }
              );
            }
          }
        }

        // UPDATE EXISTING SKILLS
        for (const sector of domain.sectors) {
          for (const section of sector.sections) {
            for (const skill of section.skills) {
              if (!skill.isNew) {
                await fetch(
                  `${API_URL}/api/skills/skills/${skill.id}/`,
                  {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      name: skill.name,
                      lv: skill.lv,
                    }),
                  }
                );
              }
            }
          }
        }
      }
    }

    await loadSkills();

    alert("Skills saved successfully!");
  } catch (error) {
    console.error("Error saving skills:", error);
    alert("Failed to save skills.");
  }
};



  /* =========================
     QUALIFICATIONS
  ========================= */


  const [education, setEducation] = useState([]);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchQualifications = async () => {
      try {
        const [educationResponse, certificateResponse] =
          await Promise.all([
            fetch(`${API_URL}/api/qualifications/educationcards/`),
            fetch(`${API_URL}/api/qualifications/certificatecards/`),
          ]);

        if (!educationResponse.ok || !certificateResponse.ok) {
          throw new Error("Failed to fetch qualifications");
        }

        const educationData = await educationResponse.json();
        const certificateData = await certificateResponse.json();

        setEducation(educationData);
        setCertificates(certificateData);
      } catch (error) {
        console.error("Error fetching qualifications:", error);
      }
    };

    fetchQualifications();
  }, []);


  // ================= EDUCATION =================

  const updateEducation = (id, field, value) => {
    setEducation((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const addEducation = () => {
    setEducation((prev) => [
      ...prev,
      {
        id: Date.now(),
        specialization: "",
        field: "",
        entity: "",
        date: "",
        degree: "",
        isNew: true,
      },
    ]);
  };

  const deleteEducation = async (id) => {
    const item = education.find((item) => item.id === id);

    if (!item) return;

    if (item.isNew) {
      setEducation((prev) =>
        prev.filter((item) => item.id !== id)
      );
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/qualifications/educationcards/${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete education");
      }

      setEducation((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };


  // ================= CERTIFICATES =================

  const updateCertificate = (id, field, value) => {
    setCertificates((prev) =>
      prev.map((certificate) =>
        certificate.id === id
          ? { ...certificate, [field]: value }
          : certificate
      )
    );
  };

  const addCertificate = () => {
    setCertificates((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        link: "",
        image: "",
        imageFile: null,
        isNew: true,
      },
    ]);
  };

  const deleteCertificate = async (id) => {
    const certificate = certificates.find(
      (item) => item.id === id
    );

    if (!certificate) return;

    if (certificate.isNew) {
      setCertificates((prev) =>
        prev.filter((item) => item.id !== id)
      );
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/qualifications/certificatecards/${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete certificate");
      }

      setCertificates((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };


  // ================= SAVE =================

  const saveQualifications = async () => {
    try {

      // ---------- EDUCATION ----------

      const savedEducation = [];

      for (const item of education) {
        const payload = {
          specialization: item.specialization,
          field: item.field,
          entity: item.entity,
          date: item.date,
          degree: item.degree,
        };

        let response;

        if (item.isNew) {
          response = await fetch(`${API_URL}/api/qualifications/educationcards/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
        } else {
          response = await fetch(
            `${API_URL}/api/qualifications/educationcards/${item.id}/`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            }
          );
        }

        if (!response.ok) {
          throw new Error("Failed to save education");
        }

        const savedItem = await response.json();

        savedEducation.push(savedItem);
      }


      // ---------- CERTIFICATES ----------

      const savedCertificates = [];

      for (const certificate of certificates) {
        const formData = new FormData();

        formData.append("name", certificate.name);
        formData.append("link", certificate.link);

        if (certificate.imageFile) {
          formData.append("image", certificate.imageFile);
        }

        let response;

        if (certificate.isNew) {
          response = await fetch(`${API_URL}/api/qualifications/certificatecards/`, {
            method: "POST",
            body: formData,
          });
        } else {
          response = await fetch(
            `${API_URL}/api/qualifications/certificatecards/${certificate.id}/`,
            {
              method: "PATCH",
              body: formData,
            }
          );
        }

        if (!response.ok) {
          throw new Error("Failed to save certificate");
        }

        const savedCertificate = await response.json();

        savedCertificates.push(savedCertificate);
      }


      setEducation(savedEducation);
      setCertificates(savedCertificates);
      alert("Qualifications information saved successfully!");

    } catch (error) {
      console.error(
        "Error saving qualifications:",
        error
      );
    }
  };




  /* =========================
     ACHIEVEMENTS
  ========================= */


  const [achievements, setAchievements] = useState([]);

  // جلب البيانات
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch(`${API_URL}/api/achievements/achievementcards/`);

        if (!response.ok) {
          throw new Error("Failed to fetch achievements");
        }

        const data = await response.json();

        setAchievements(
          data.map((achievement) => ({
            ...achievement,
            stats: [
              {
                value: achievement.value1 || "",
                label: achievement.label1 || "",
              },
              {
                value: achievement.value2 || "",
                label: achievement.label2 || "",
              },
              {
                value: achievement.value3 || "",
                label: achievement.label3 || "",
              },
            ],
          }))
        );
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    };

    fetchAchievements();
  }, []);

  // تعديل Achievement
  const updateAchievement = (id, field, value) => {
    setAchievements((prev) =>
      prev.map((achievement) =>
        achievement.id === id
          ? { ...achievement, [field]: value }
          : achievement
      )
    );
  };

  // تعديل Stat
  const updateAchievementStat = (id, index, field, value) => {
    setAchievements((prev) =>
      prev.map((achievement) => {
        if (achievement.id !== id) return achievement;

        const updatedStats = [...achievement.stats];

        updatedStats[index] = {
          ...updatedStats[index],
          [field]: value,
        };

        return {
          ...achievement,
          stats: updatedStats,
        };
      })
    );
  };

  // إضافة Achievement جديد
  const addAchievement = () => {
    setAchievements((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: "",
        icon: "",
        link: "",
        description: "",
        stats: [
          { value: "", label: "" },
          { value: "", label: "" },
          { value: "", label: "" },
        ],
        isNew: true,
      },
    ]);
  };

  // حذف Achievement
  const deleteAchievement = async (id) => {
    const achievement = achievements.find((item) => item.id === id);

    if (!achievement) return;

    // إذا كان جديدًا ولم يُحفظ بعد
    if (achievement.isNew) {
      setAchievements((prev) =>
        prev.filter((item) => item.id !== id)
      );
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/achievements/achievementcards/${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete achievement");
      }

      setAchievements((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Error deleting achievement:", error);
    }
  };

  // حفظ جميع Achievements
  const saveAchievements = async () => {
    try {
      const updatedAchievements = [];

      for (const achievement of achievements) {
        const payload = {
          title: achievement.title,
          description: achievement.description,
          icon: achievement.icon,
          link: achievement.link,

          value1: achievement.stats[0]?.value || "",
          label1: achievement.stats[0]?.label || "",

          value2: achievement.stats[1]?.value || "",
          label2: achievement.stats[1]?.label || "",

          value3: achievement.stats[2]?.value || "",
          label3: achievement.stats[2]?.label || "",
        };

        let response;

        if (achievement.isNew) {
          response = await fetch(`${API_URL}/api/achievements/achievementcards/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
        } else {
          response = await fetch(`${API_URL}/api/achievements/achievementcards/${achievement.id}/`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
        }

        if (!response.ok) {
          throw new Error("Failed to save achievement");
        }

        const savedAchievement = await response.json();

        updatedAchievements.push({
          ...savedAchievement,
          name: savedAchievement.title,
          stats: [
            {
              value: savedAchievement.value1 || "",
              label: savedAchievement.label1 || "",
            },
            {
              value: savedAchievement.value2 || "",
              label: savedAchievement.label2 || "",
            },
            {
              value: savedAchievement.value3 || "",
              label: savedAchievement.label3 || "",
            },
          ],
        });
      }

      setAchievements(updatedAchievements);
      alert("Achievements information saved successfully!");
    } catch (error) {
      console.error("Error saving achievements:", error);
    }
  };




  /* =========================
     PROJECTS
  ========================= */



const [projects, setProjects] = useState([]);

useEffect(() => {
  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/api/projects/projectcards/`);

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();

      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  fetchProjects();
}, []);

const updateProject = (id, field, value) => {
  setProjects((prev) =>
    prev.map((project) =>
      project.id === id
        ? { ...project, [field]: value }
        : project
    )
  );
};

const addProject = () => {
  setProjects((prev) => [
    ...prev,
    {
      id: Date.now(),
      type: "",
      name: "",
      description: "",
      sourcecodelink: "",
      projectlink: "",
      morelink: "",
      image: "",
      isNew: true,
    },
  ]);
};

const deleteProject = async (id) => {
  const project = projects.find((item) => item.id === id);

  if (!project) return;

  if (project.isNew) {
    setProjects((prev) =>
      prev.filter((item) => item.id !== id)
    );
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/projects/projectcards/${id}/`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete project");
    }

    setProjects((prev) =>
      prev.filter((item) => item.id !== id)
    );
  } catch (error) {
    console.error("Error deleting project:", error);
  }
};

const saveProjects = async () => {
  try {
    const updatedProjects = [];

    for (const project of projects) {
      const formData = new FormData();

      formData.append("type", project.type);
      formData.append("name", project.name);
      formData.append("description", project.description);
      formData.append("sourcecodelink", project.sourcecodelink);
      formData.append("projectlink", project.projectlink);
      formData.append("morelink", project.morelink);

      // إذا كانت هناك صورة جديدة
      if (project.imageFile) {
        formData.append("image", project.imageFile);
      }

      let response;

      if (project.isNew) {
        response = await fetch(`${API_URL}/api/projects/projectcards/`, {
          method: "POST",
          body: formData,
        });
      } else {
        response = await fetch(`${API_URL}/api/projects/projectcards/${project.id}/`, {
          method: "PATCH",
          body: formData,
        });
      }

      if (!response.ok) {
        throw new Error("Failed to save project");
      }

      const savedProject = await response.json();

      updatedProjects.push(savedProject);
    }

    setProjects(updatedProjects);
    alert("Projects information saved successfully!");
  } catch (error) {
    console.error("Error saving projects:", error);
  }
};






  /* =========================
     SERVICES
  ========================= */

  const [services, setServices] = useState([]);

  //  GET
  useEffect(() => {
    fetch(`${API_URL}/api/services/servicecards/`)
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
      })
      .catch((error) => console.error(error));
  }, []);

  //  ADD | UPDATE
  const servicesSave = async() => {
    try {
      const updatedServices = [];
      for(const service of services) {
        console.log("SAVING SERVICES:", service);
        
        const data = {
          domain: service.domain,
          title: service.title,
          description: service.description,
        };
        let response;

        //New service
        if(service.isNew) {
          response = await fetch(
            `${API_URL}/api/services/servicecards/`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json", },
              body: JSON.stringify(data),
            }
          );
        } else {
          response = await fetch(
            `${API_URL}/api/services/servicecards/${service.id}/`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json", },
              body: JSON.stringify(data),
            }
          );
        }

        const result = await response.json();
        if (!response.ok) {
          console.error("SAVE ERROR", result);
          return;
        }
        updatedServices.push(result);
      }
      setServices(updatedServices);
      console.log("ALL SERVICES SAVED");
      alert("Services information saved successfully!");

    } catch(error) {
      console.error("SAVE ERROR:", error);
    }
  };


  //  DELETE
  const deleteServices = async(service) => {
    
    // if the service is new and not saved yet
    if(service.isNew) {
      setServices(
        services.filter((item) => item.id !== service.id)
      );
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/services/servicecards/${service.id}/`,
        {
          method: "DELETE",
        }
      );
      if(!response.ok) {
        console.error("Failed to delete");
        return;
      }
      setServices(
        services.filter((item) => item.id !== service.id)
      );
    } catch(error) {
      console.error(error);
    }
  }


  


   /* =========================
     HELPERS
  ========================= */

  const increase = (setter) => {
    setter((prev) => prev + 1);
  };
  const decrease = (setter) => {
    setter((prev) => Math.max(0, prev - 1));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;
  
  const imageUrl = URL.createObjectURL(file);
    setAbout((prev) => ({
      ...prev,
      image: imageUrl,
    }));
  };


  






  
  return (
    <main className={styles.main}>

      {/* ================= HOME ================= */}

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Home</h2>
                  </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statEditor}>
            <div className={styles.statIcon}>
              <i className="fa-solid fa-calendar-days"></i>
            </div>

            <div className={styles.statInfo}>
              <span>Years of Experience</span>
              <strong>{yearsExperience}</strong>
            </div>

            <div className={styles.counter}>
              <button onClick={() => decrease(setYearsExperience)}>
                <i className="fa-solid fa-minus"></i>
              </button>

              <button onClick={() => increase(setYearsExperience)}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>

          <div className={styles.statEditor}>
            <div className={styles.statIcon}>
              <i className="fa-solid fa-folder-open"></i>
            </div>

            <div className={styles.statInfo}>
              <span>Completed Projects</span>
              <strong>{projectsCompleted}</strong>
            </div>

            <div className={styles.counter}>
              <button onClick={() => decrease(setProjectsCompleted)}>
                <i className="fa-solid fa-minus"></i>
              </button>

              <button onClick={() => increase(setProjectsCompleted)}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
     
        <div className={styles.sectionActions}>
          <button type="button" className={styles.saveButton} onClick={saveHome}>
            <i className="fa-solid fa-floppy-disk"></i>
            Save Changes
          </button>
        </div>
        
      </section>

      {/* ================= ABOUT ================= */}

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>About</h2>
          
          </div>
        </div>

        <div className={styles.aboutEditor}>
          <div className={styles.imageEditor}>
            <div className={styles.imagePreview}>
              {about[0]?.image ? (
                <img src={
                  about[0].image instanceof File
                    ? URL.createObjectURL(about[0].image)
                    : about[0].image.startsWith('http')
                    ? about[0].image
                    : `${CLOUDINARY_URL}${about[0].image}`
                }
                alt="About Picture" />
              ) : (
                <i className="fa-solid fa-image"></i>
              )}
            </div>

            <label className={styles.uploadButton}>
              <i className="fa-solid fa-upload"></i>
              Change Image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setAbout([
                      {
                        ...about[0],
                        image: e.target.files[0]
                      }
                    ])
                  }
                }}
              />
            </label>
          </div>

          <div className={styles.formGroupta}>
            <label>Description</label>

            <textarea
              value={about[0]?.description || ""}
              onChange={(e) => setAbout([
                {
                  ...about[0],
                  description: e.target.value
                }
              ])}
            />

          </div>
        </div>

        <div className={styles.sectionActions}>
          <button className={styles.saveButton} onClick={saveAbout}>
            <i className="fa-solid fa-floppy-disk"></i>
            Save Changes
          </button>
        </div>
      </section>

      {/* ================= SKILLS ================= */}
<section className={styles.section}>
  <div className={styles.sectionHeader}>
    <div>
      <h2>Skills</h2>
    </div>

    <button
      className={styles.addButton}
      onClick={addSkillField}
    >
      <i className="fa-solid fa-plus"></i>
      Add Domain
    </button>
  </div>

  <div className={styles.skillsStructure}>
    {skillFields.map((domain) => (
      <div
        className={styles.skillField}
        key={domain.id}
      >
        {/* DOMAIN */}

        <div className={styles.fieldTitle}>
          <div className={styles.titleEditor}>
            <span>DOMAIN</span>

            <input
              value={domain.name}
              onChange={(e) =>
                updateSkillField(
                  domain.id,
                  e.target.value
                )
              }
            />
          </div>

          <button
            className={styles.deleteButton}
            onClick={() =>
              deleteSkillField(domain.id)
            }
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>

        {/* SECTORS */}

        <div className={styles.specializations}>
          {domain.sectors.map((sector) => (
            <div
              className={styles.specialization}
              key={sector.id}
            >
              <div className={styles.specializationHeader}>
                <div className={styles.titleEditor}>
                  <span>SECTOR</span>

                  <input
                    value={sector.name}
                    onChange={(e) =>
                      updateSpecialization(
                        domain.id,
                        sector.id,
                        e.target.value
                      )
                    }
                  />
                </div>

                <button
                  className={styles.deleteButton}
                  onClick={() =>
                    deleteSpecialization(
                      domain.id,
                      sector.id
                    )
                  }
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>

              {/* SECTIONS */}

              <div className={styles.skillCategories}>
                {sector.sections.map((section) => (
                  <div
                    className={styles.skillCategory}
                    key={section.id}
                  >
                    <div className={styles.categoryHeader}>
                      <div className={styles.titleEditor}>
                        <span>SECTION</span>

                        <input
                          value={section.name}
                          onChange={(e) =>
                            updateCategory(
                              domain.id,
                              sector.id,
                              section.id,
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <button
                        className={styles.deleteButton}
                        onClick={() =>
                          deleteCategory(
                            domain.id,
                            sector.id,
                            section.id
                          )
                        }
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>

                    {/* SKILLS */}

                    <div className={styles.skillList}>
                      {section.skills.map((skill) => (
                        <div
                          className={styles.skillRow}
                          key={skill.id}
                        >
                          <div
                            className={
                              styles.skillName
                            }
                          >
                            <input
                              value={skill.name}
                              onChange={(e) =>
                                updateSkill(
                                  domain.id,
                                  sector.id,
                                  section.id,
                                  skill.id,
                                  "name",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div
                            className={
                              styles.levelControl
                            }
                          >
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={skill.lv}
                              onChange={(e) =>
                                updateSkill(
                                  domain.id,
                                  sector.id,
                                  section.id,
                                  skill.id,
                                  "lv",
                                  e.target.value
                                )
                              }
                            />

                            <span>%</span>
                          </div>

                          <button
                            className={
                              styles.deleteButton
                            }
                            onClick={() =>
                              deleteSkill(
                                domain.id,
                                sector.id,
                                section.id,
                                skill.id
                              )
                            }
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      className={
                        styles.addNestedButton
                      }
                      onClick={() =>
                        addSkill(
                          domain.id,
                          sector.id,
                          section.id,
                        )
                      }
                    >
                      <i className="fa-solid fa-plus"></i>
                      Add Skill
                    </button>
                  </div>
                ))}
              </div>

              <button
                className={styles.addNestedButton}
                onClick={() =>
                  addCategory(
                    domain.id,
                    sector.id
                  )
                }
              >
                <i className="fa-solid fa-plus"></i>
                Add Section
              </button>
            </div>
          ))}
        </div>

        <button
          className={styles.addNestedButton}
          onClick={() =>
            addSpecialization(domain.id)
          }
        >
          <i className="fa-solid fa-plus"></i>
          Add Sector
        </button>
      </div>
    ))}
  </div>

  <div className={styles.sectionActions}>
    <button
      className={styles.saveButton}
      onClick={saveSkills}
    >
      <i className="fa-solid fa-floppy-disk"></i>
      Save Changes
    </button>
  </div>
</section>



      {/* ================= QUALIFICATIONS ================= */}

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Qualifications</h2>
          </div>
        </div>

        <div className={styles.subSection}>
          <div className={styles.subSectionHeader}>
            <div>
              <i className="fa-solid fa-graduation-cap"></i>
              <div>
                <h3>Education</h3>
                <span>Academic qualifications</span>
              </div>
            </div>

            <button className={styles.addButton} onClick={addEducation}>
              <i className="fa-solid fa-plus"></i>
              Add Education
            </button>
          </div>

          <div className={styles.cardsList}>
            {education.map((item) => (
              <div className={styles.editorCard} key={item.id}>
                <div className={styles.cardTop}>
                  <span>EDUCATION</span>

                  <button
                    className={styles.deleteButton}
                    onClick={() => deleteEducation(item.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Specialization</label>
                    <input
                      value={item.specialization}
                      onChange={(e) =>
                        updateEducation(
                          item.id,
                          "specialization",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Field</label>
                    <input
                      value={item.field}
                      onChange={(e) =>
                        updateEducation(item.id, "field", e.target.value)
                      }
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Entity</label>
                    <input
                      value={item.entity}
                      onChange={(e) =>
                        updateEducation(item.id, "entity", e.target.value)
                      }
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Date</label>
                    <input
                      value={item.date}
                      placeholder="2024 - 2026"
                      onChange={(e) =>
                        updateEducation(item.id, "date", e.target.value)
                      }
                    />
                  </div>

                  <div className={styles.formGroupFull}>
                    <label>Degree / Status</label>
                    <input
                      value={item.degree}
                      placeholder="Degree Certified"
                      onChange={(e) =>
                        updateEducation(item.id, "degree", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.subSection}>
          <div className={styles.subSectionHeader}>
            <div>
              <i className="fa-solid fa-certificate"></i>
              <div>
                <h3>Certificates</h3>
                <span>Professional certificates and verification links</span>
              </div>
            </div>

            <button className={styles.addButton} onClick={addCertificate}>
              <i className="fa-solid fa-plus"></i>
              Add Certificate
            </button>
          </div>

          <div className={styles.cardsList}>
            {certificates.map((certificate) => (
              <div className={styles.editorCard} key={certificate.id}>
                <div className={styles.cardTop}>
                  <span>CERTIFICATE</span>

                  <button
                    className={styles.deleteButton}
                    onClick={() => deleteCertificate(certificate.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.certificateImage}>
                    {certificate.image ? (
                      <img src={certificate.image} alt="Certificate" />
                    ) : (
                      <i className="fa-solid fa-image"></i>
                    )}

                    <label className={styles.uploadButton}>
                      Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];

                          if (!file) return;

                          updateCertificate(
                            certificate.id,
                            "image",
                            URL.createObjectURL(file)
                          );
                          updateCertificate(
                            certificate.id,
                            "imageFile",
                            file
                          );
                        }}
                      />
                    </label>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Certificate Name</label>
                    <input
                      value={certificate.name}
                      onChange={(e) =>
                        updateCertificate(
                          certificate.id,
                          "name",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Verification Link</label>
                    <input
                      value={certificate.link}
                      onChange={(e) =>
                        updateCertificate(
                          certificate.id,
                          "link",
                          e.target.value
                        )
                      }
                    />
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sectionActions}>
          <button className={styles.saveButton} onClick={saveQualifications}>
            <i className="fa-solid fa-floppy-disk"></i>
            Save Changes
          </button>
        </div>
      </section>

      {/* ================= ACHIEVEMENTS ================= */}

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Achievements</h2>
          </div>

          <button className={styles.addButton} onClick={addAchievement}>
            <i className="fa-solid fa-plus"></i>
            Add Achievement
          </button>
        </div>

        <div className={styles.cardsList}>
          {achievements.map((achievement) => (
            <div className={styles.editorCard} key={achievement.id}>
              <div className={styles.cardTop}>
                <span>ACHIEVEMENT</span>

                <button
                  className={styles.deleteButton}
                  onClick={() => deleteAchievement(achievement.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Title</label>
                  <input
                    value={achievement.title}
                    onChange={(e) =>
                      updateAchievement(
                        achievement.id,
                        "title",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Icon</label>
                  <input
                    value={achievement.icon}
                    placeholder="fa-solid fa-trophy"
                    onChange={(e) =>
                      updateAchievement(
                        achievement.id,
                        "icon",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className={styles.formGroupFull}>
                  <label>Link</label>
                  <input
                    value={achievement.link}
                    onChange={(e) =>
                      updateAchievement(
                        achievement.id,
                        "link",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className={styles.formGroupFull}>
                  <label>Short Description</label>
                  <textarea
                    rows="4"
                    value={achievement.description}
                    onChange={(e) =>
                      updateAchievement(
                        achievement.id,
                        "description",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className={styles.statsEditor}>
                <div className={styles.statsHeader}>
                  <h4>Statistics</h4>
                  <span>3 values + 3 labels</span>
                </div>

                <div className={styles.statsInputs}>
                  {achievement.stats.map((stat, index) => (
                    <div className={styles.singleStat} key={index}>
                      <span>STAT {index + 1}</span>

                      <input
                        placeholder="Value"
                        value={stat.value}
                        onChange={(e) =>
                          updateAchievementStat(
                            achievement.id,
                            index,
                            "value",
                            e.target.value
                          )
                        }
                      />

                      <input
                        placeholder="Label"
                        value={stat.label}
                        onChange={(e) =>
                          updateAchievementStat(
                            achievement.id,
                            index,
                            "label",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.sectionActions}>
          <button className={styles.saveButton} onClick={saveAchievements}>
            <i className="fa-solid fa-floppy-disk"></i>
            Save Changes
          </button>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Projects</h2>
          </div>

          <button className={styles.addButton} onClick={addProject}>
            <i className="fa-solid fa-plus"></i>
            Add Project
          </button>
        </div>

        <div className={styles.cardsList}>
          {projects.map((project) => (
            <div className={styles.editorCard} key={project.id}>
              <div className={styles.cardTop}>
                <span>PROJECT</span>

                <button
                  className={styles.deleteButton}
                  onClick={() => deleteProject(project.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>

              <div className={styles.projectEditor}>
                <div className={styles.projectImage}>
                  {project.image ? (
                    <img src={project.image} alt={project.name} />
                  ) : (
                    <i className="fa-solid fa-image"></i>
                  )}

                  <label className={styles.uploadButton}>
                    <i className="fa-solid fa-upload"></i>
                    Upload Image

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];

                        if (!file) return;

                        updateProject(
                          project.id,
                          "image",
                          URL.createObjectURL(file)
                        );
                        updateProject(
                          project.id,
                          "imageFile",
                          file
                        );
                      }}
                    />
                  </label>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Project Type</label>
                    <input
                      value={project.type}
                      placeholder="E-commerce Website"
                      onChange={(e) =>
                        updateProject(
                          project.id,
                          "type",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Project Name</label>
                    <input
                      value={project.name}
                      onChange={(e) =>
                        updateProject(
                          project.id,
                          "name",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className={styles.formGroupFull}>
                    <label>Short Description</label>
                    <textarea
                      rows="4"
                      value={project.description}
                      onChange={(e) =>
                        updateProject(
                          project.id,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>
                      <i className="fa-brands fa-github"></i> Source Code
                    </label>
                    <input
                      value={project.sourcecodelink}
                      onChange={(e) =>
                        updateProject(
                          project.id,
                          "sourcecodelink",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>{" "}
                      Project
                    </label>
                    <input
                      value={project.projectlink}
                      onChange={(e) =>
                        updateProject(
                          project.id,
                          "projectlink",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className={styles.formGroupFull}>
                    <label>
                      <i className="fa-solid fa-circle-info"></i> More
                    </label>
                    <input
                      value={project.morelink}
                      onChange={(e) =>
                        updateProject(
                          project.id,
                          "morelink",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.sectionActions}>
          <button className={styles.saveButton} onClick={saveProjects}>
            <i className="fa-solid fa-floppy-disk"></i>
            Save Changes
          </button>
        </div>
      </section>

      {/* ================= SERVICES ================= */}

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Services</h2>
          </div>

          <button className={styles.addButton} onClick={() =>
            setServices([...services, 
              {
              id: Date.now(),
              domain:"",
              title:"",
              description:"",
              isNew: true
              }
            ])
          }>
            <i className="fa-solid fa-plus"></i>
            Add Service
          </button>
        </div>

        <div className={styles.serviceGrid}>
          {services.map((service) => (
            <div className={styles.serviceEditor} key={service.id}>
              <div className={styles.serviceTop}>
                <span>
                  <i className="fa-solid fa-briefcase"></i>
                </span>

                <button
                  className={styles.deleteButton}
                  onClick={() => deleteServices(service)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>

              <div className={styles.formGroup}>
                <label>Domain</label>
                <input
                  type="text"
                  value={service.domain}
                  onChange={(e) => {
                    setServices(
                      services.map((item) => item.id === service.id ? {
                        ...item,
                        domain: e.target.value
                      } : item )
                    );
                  }}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Title</label>
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => {
                    setServices(
                      services.map((item) => item.id === service.id ? {
                        ...item,
                        title: e.target.value
                      } : item )
                    );
                  }}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  rows="5"
                  value={service.description}
                  onChange={(e) => {
                    setServices(
                      services.map((item) => item.id === service.id ? {
                        ...item,
                        description: e.target.value
                      } : item )
                    );
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.sectionActions}>
          <button type="button" className={styles.saveButton} onClick={servicesSave}>
            <i className="fa-solid fa-floppy-disk"></i>
            Save Changes
          </button>
        </div>
      </section>
    </main>
  );
};

export default Main;
