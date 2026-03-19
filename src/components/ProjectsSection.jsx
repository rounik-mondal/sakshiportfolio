import { ActionIcon, ExpandIcon, GithubMark, HomeIcon, PreviewIcon } from "./Icons";

export default function ProjectsSection({
  projects,
  activeProject,
  onNavigate,
  onSelectProject,
  projectSectionBackground,
  cloudImage,
  timelineDecoration,
}) {
  return (
    <section id="projectsection">
      <div className="projectsectioncontainer">
        <div id="projecttitlecontainer">
          <div className="homeiconcontainer">
            <a href="#herosection" onClick={(event) => onNavigate(event, "#herosection")} aria-label="Back to top">
              <HomeIcon id="homeicon2" />
            </a>
          </div>
          <div id="projecttitle">
            <h1>PROJECTS</h1>
            <GithubMark id="githubicon" />
          </div>
        </div>
        <div id="navline3"></div>
        <div id="projectlistcontainer">
          <div id="list">
            {projects.map((project, index) => (
              <div key={project.id}>
                <div className="listseperator" id={`seperator${index + 1}`}></div>
                <div
                  className={`listcontent ${project.colorClass} box${index + 1} ${
                    activeProject.id === project.id ? "is-active" : ""
                  }`}
                  data-cursor={project.description}
                >
                  <div className="project-heading">
                    <h2>{project.title}</h2>
                    <span className="project-period">{project.period}</span>
                  </div>
                  <div className="projectinfo smvisible">
                    <h4>Tap to know more</h4>
                    <h3>{project.description}</h3>
                    <img src={timelineDecoration} className="carddecor" alt="" />
                  </div>
                  <p className="project-stack">{project.techStack}</p>
                  <div id="listiconscontainer">
                    <button
                      type="button"
                      className="icon-button"
                      aria-label={`Preview ${project.title}`}
                      onClick={() => onSelectProject(project)}
                    >
                      <PreviewIcon className={`listicon ${project.colorClass} previewwebsite`} />
                    </button>
                    <a href={project.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} GitHub source`}>
                      <ActionIcon className={`listicon ${project.colorClass} gotogithub`} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
            <div className="listseperator" id={`seperator${projects.length + 1}`}></div>
          </div>
          <div id="previewpanecontainer">
            <div id="previewpane">
              <iframe id="websiteframe" title={`${activeProject.title} preview`} frameBorder="0" />
              <div id="nopreview">
                <h2>
                  Live preview is unavailable for this project. Use the GitHub source link to review the implementation.
                </h2>
              </div>
              <button id="expandingbutton" type="button" aria-label="Open preview in new tab">
                <ExpandIcon id="expandicon" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <img id="projectsectioncloud" src={cloudImage} alt="" />
      <img id="projectsectioncloud2" src={cloudImage} alt="" />
      <img id="projectsectionbg" src={projectSectionBackground} alt="" />
    </section>
  );
}
