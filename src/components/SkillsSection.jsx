import { HomeIcon } from "./Icons";

export default function SkillsSection({ data, onNavigate, sectionBackground, cloudImage, patternImage }) {
  const { stats, skillHighlights, experience, education, certificates, achievements } = data;
  const leadExperience = experience[0];

  return (
    <section id="skillsection">
      <div className="sectioncontainer">
        <div id="skillcontainer">
          <div id="skilltitle">
            <h1>
              SKILLS
              <br className="smvisible" />
              AND
              <br className="smvisible" />
              NUMBERS
            </h1>
          </div>
          <div id="navline2"></div>
          <div id="bentogrid">
            <div className="bentorow">
              <div className="bentocol">
                <div
                  className="bentodatadiv graybg stat-card"
                  data-cursor="Three shipped projects with React, Node.js, and full-stack ownership."
                >
                  <div className="cgpadata">
                    <h2 id="projectnumber">{stats.projects}</h2>
                  </div>
                  <div className="cgpadata">
                    <h2 id="projecttext">PROJECTS</h2>
                  </div>
                </div>
              </div>
              <div className="bentocol">
                <div className="bentodatadiv">
                  <div
                    className="aimldiv aimlcont whitebg squishy stat-card"
                    data-cursor="React.js is central to Sakshi's frontend work and reusable component systems."
                  >
                    <div className="cgpadata textcenter">
                      <h2 id="aimltext">REACT</h2>
                    </div>
                  </div>
                  <div
                    className="aimldiv bluebg readycont squishy stat-card"
                    data-cursor="Open to frontend and full-stack opportunities."
                  >
                    <div className="cgpadata textcenter">
                      <h2 id="readytext">OPEN</h2>
                    </div>
                  </div>
                </div>
                <div className="bentodatadiv">
                  <div className="cgpadiv relative stat-card">
                    <div className="badge"></div>
                    <div className="cgpadata textcenter">
                      <h2 id="circletext">
                        full
                        <br />
                        stack
                        <br />
                        ready
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bentorow">
              <div className="bentocol">
                <div
                  className="bentodatadiv orangebg stat-card cgpa-card-block"
                  data-cursor="Current Bachelor of Technology CGPA: 7.22."
                >
                  <div className="cgpadata">
                    <h2 id="skillnumber">{stats.cgpa}</h2>
                  </div>
                  <div className="cgpadata">
                    <h2 id="skilltext">CGPA</h2>
                  </div>
                  <div className="cgpadata">
                    <h2 id="skillname">Bachelor of Technology</h2>
                  </div>
                  <div className="cgpadata">
                    <h2 id="skillname">Computer Science & Engineering</h2>
                  </div>
                </div>
                <div
                  className="bentodatadiv brownbg stat-card"
                  data-cursor="Tooling spans Git, GitHub, MongoDB, MySQL, Figma, Framer, and VS Code."
                >
                  <div className="cgpadata textcenter">
                    <h2 id="tooltext">TOOLS</h2>
                  </div>
                  {skillHighlights.tools.reduce((rows, tool, index) => {
                    const rowIndex = Math.floor(index / 3);
                    rows[rowIndex] ||= [];
                    rows[rowIndex].push(tool);
                    return rows;
                  }, []).map((row) => (
                    <div className="cgpadata heightfitcontent textcenter" key={row.join("-")}>
                      <h2 id="toolname">{row.join(", ")}</h2>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bentocol">
                <div
                  className="bentodatadiv whitebg stat-card"
                  id="cgpablock"
                  data-cursor="Primary skills now use the larger feature block for better spacing and emphasis."
                >
                  <div className="cgpadiv primary-skill-panel">
                    <div className="primary-skill-header">
                      <span className="primary-skill-kicker">Primary Skills</span>
                      <span className="primary-skill-total">{stats.skills}</span>
                    </div>
                    <div className="skills-primary-grid">
                      {skillHighlights.primary.map((skill) => (
                        <span className="primary-skill-pill" key={skill}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="cgpadiv" id="patterndiv">
                    <img src={patternImage} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-panels">
            <article className="info-panel info-panel-orange">
              <div className="info-panel-header">
                <div>
                  <span className="panel-kicker">Experience</span>
                  <h3>{leadExperience.role}</h3>
                </div>
                <span>{leadExperience.period}</span>
              </div>
              <p className="panel-subtitle">{leadExperience.company}</p>
              <ul className="info-list">
                {leadExperience.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="chip-row">
                {leadExperience.technologies.map((tech) => (
                  <span className="skill-chip" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
            </article>

            <article className="info-panel info-panel-blue">
              <div className="info-panel-header">
                <div>
                  <span className="panel-kicker">Education</span>
                  <h3>Academic Journey</h3>
                </div>
                <span>{education[0].period}</span>
              </div>
              <ul className="timeline-list">
                {education.map((item) => (
                  <li key={`${item.school}-${item.period}`}>
                    <strong>{item.school}</strong>
                    <span>{item.location}</span>
                    <p>{item.degree}</p>
                    <small>{item.metric}</small>
                  </li>
                ))}
              </ul>
            </article>

            <article className="info-panel info-panel-pink">
              <div className="info-panel-header">
                <div>
                  <span className="panel-kicker">Certificates</span>
                  <h3>Continuous Learning</h3>
                </div>
                <span>{certificates.length} total</span>
              </div>
              <ul className="timeline-list compact-list">
                {certificates.map((item) => (
                  <li key={`${item.title}-${item.period}`}>
                    <strong>{item.title}</strong>
                    <span>{item.issuer}</span>
                    <small>{item.period}</small>
                  </li>
                ))}
              </ul>
            </article>

            <article className="info-panel info-panel-gray">
              <div className="info-panel-header">
                <div>
                  <span className="panel-kicker">Achievements</span>
                  <h3>Competitive Coding</h3>
                </div>
                <span>Core strengths</span>
              </div>
              <ul className="timeline-list compact-list">
                {achievements.map((item) => (
                  <li key={`${item.title}-${item.period}`}>
                    <strong>{item.title}</strong>
                    <small>{item.period}</small>
                  </li>
                ))}
              </ul>
              <div className="chip-row">
                {skillHighlights.fundamentals.concat(skillHighlights.softSkills).map((item) => (
                  <span className="skill-chip neutral" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>

        <div id="homebuttonsec">
          <a href="#herosection" onClick={(event) => onNavigate(event, "#herosection")} aria-label="Back to top">
            <HomeIcon id="homeicon" />
          </a>
        </div>
      </div>
      <img id="skillsectionbg" src={sectionBackground} alt="" />
      <img id="cloud4" src={cloudImage} alt="" />
    </section>
  );
}
