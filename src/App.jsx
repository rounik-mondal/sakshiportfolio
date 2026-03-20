import { useEffect, useMemo, useRef, useState } from "react";
import HeroSection from "./components/HeroSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import HireModal from "./components/HireModal";
// import StatusToast from "./components/StatusToast";
import { portfolioData } from "./data/portfolioData";
import { usePortfolioAnimations } from "./hooks/usePortfolioAnimations";

import heroImage from "../assets/section1/myimg.webp";
import skillSectionBackground from "../assets/section2/skillsectionbg.png";
import patternImage from "../assets/section2/t.png";
import projectSectionBackground from "../assets/section3/projectsectionbg.png";
import timelineDecoration from "../assets/section3/tl.webp";
import contactBackground from "../assets/section4/s2.webp";
import mountainImage from "../assets/section4/mountain.png";
import cloudImage from "../cloud.png";
import resumePdf from "../assets/CV_Sakshi_final.pdf";

function Preloader({ firstName, lastName }) {
  return (
    <div id="preloader">
      <h1 id="preloadertext">
        <div>{firstName.toUpperCase()}</div>
        <div>{lastName.toUpperCase()}</div>
      </h1>
    </div>
  );
}

function Cursor() {
  return (
    <div id="cursor">
      <h4></h4>
    </div>
  );
}

export default function App() {
  const rootRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHireOpen, setIsHireOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(true);
  const [activeProjectId, setActiveProjectId] = useState(portfolioData.projects[0].id);

  const activeProject = useMemo(
    () =>
      portfolioData.projects.find((project) => project.id === activeProjectId) ??
      portfolioData.projects[0],
    [activeProjectId]
  );

  const { scrollToSectionEnd } = usePortfolioAnimations(rootRef, {
    isDarkMode,
    activeProject,
  });

  useEffect(() => {
    // const media = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(false);
  }, []);

  const handleHireContinue = () => {
    window.open(`mailto:${portfolioData.personal.email}`, "_parent");
    setIsHireOpen(false);
  };

  return (
    <div ref={rootRef}>
      <HireModal
        isOpen={isHireOpen}
        message={portfolioData.messaging.hire}
        onContinue={handleHireContinue}
        onClose={() => setIsHireOpen(false)}
      />
      <Preloader
        firstName={portfolioData.personal.firstName}
        lastName={portfolioData.personal.lastName}
      />
      {/* <StatusToast
        message={portfolioData.messaging.status}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      /> */}
      <Cursor />

      <HeroSection
        personal={portfolioData.personal}
        heroImage={heroImage}
        cloudImage={cloudImage}
        resumePdf={resumePdf}
        onNavigate={scrollToSectionEnd}
        onOpenHire={() => setIsHireOpen(true)}
        onToggleTheme={setIsDarkMode}
      />

      <img className="cloud" id="cloud1" src={cloudImage} alt="" />
      <img className="cloud" id="cloud2" src={cloudImage} alt="" />
      <img className="cloud" id="cloud3" src={cloudImage} alt="" />

      <SkillsSection
        data={portfolioData}
        onNavigate={scrollToSectionEnd}
        sectionBackground={skillSectionBackground}
        cloudImage={cloudImage}
        patternImage={patternImage}
      />
      <br />
      <br />

      <ProjectsSection
        projects={portfolioData.projects}
        activeProject={activeProject}
        onNavigate={scrollToSectionEnd}
        onSelectProject={(project) => setActiveProjectId(project.id)}
        projectSectionBackground={projectSectionBackground}
        cloudImage={cloudImage}
        timelineDecoration={timelineDecoration}
      />

      <ContactSection
        personal={portfolioData.personal}
        onNavigate={scrollToSectionEnd}
        contactBackground={contactBackground}
        mountainImage={mountainImage}
        cloudImage={cloudImage}
      />

      <div id="endcredits">Built for Sakshi Kumari with React + GSAP</div>
    </div>
  );
}
