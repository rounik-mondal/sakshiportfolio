import {
  DarkModeIcon,
  GithubIcon,
  LightModeIcon,
  LinkedInIcon,
  MenuCloseIcon,
  MenuOpenIcon,
} from "./Icons";

export default function HeroSection({
  personal,
  heroImage,
  cloudImage,
  resumePdf,
  onNavigate,
  onOpenHire,
  onToggleTheme,
}) {
  return (
    <section id="herosection">
      <nav>
        <MenuOpenIcon id="sidemenuopenicon" />
        <MenuCloseIcon id="sidemenucloseicon" />
        <div id="navlinks">
          <a className="link" href="#herosection" onClick={(event) => onNavigate(event, "#herosection")}>
            Home
          </a>
          <a className="link" href="#skillsection" onClick={(event) => onNavigate(event, "#skillsection")}>
            Skills
          </a>
          <a className="link" href="#projectsection" onClick={(event) => onNavigate(event, "#projectsection")}>
            Projects
          </a>
          <a className="link" href="#contactsection" onClick={(event) => onNavigate(event, "#contactsection")}>
            Contact
          </a>
          <button className="link link-button" id="hirelink" type="button" onClick={onOpenHire}>
            Hire
          </button>
        </div>
        <div id="socialnav">
          <DarkModeIcon
            className="uimode"
            id="darkmode"
            onClick={() => onToggleTheme(true)}
            role="button"
            tabIndex={0}
          />
          <div id="lightmodecontainer">
            <LightModeIcon
              className="uimode"
              id="lightmode"
              onClick={() => onToggleTheme(false)}
              role="button"
              tabIndex={0}
            />
          </div>
          <a
            id="navicon"
            className="githubnav"
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
          >
            <GithubIcon id="navicon" />
          </a>
          <a
            id="navicon"
            className="linkedinnav"
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
          >
            <LinkedInIcon id="navicon" />
          </a>
        </div>
      </nav>
      <div id="navline"></div>
      <div id="menublur"></div>
      <div id="herotextcontainer">
        <h1 id="herotext" className="herotext" aria-label={personal.fullName}>
          <div className="line" id="line1">
            {personal.firstName.toUpperCase()}
          </div>
          <div className="line" id="line2">
            {personal.lastName.toUpperCase()}
          </div>
        </h1>
        <h1 id="herotextsm1" className="herotextsm" aria-hidden="true">
          <div className="line" id="line1">
            {personal.firstName.toUpperCase()}
          </div>
          <div className="line" id="line2">
            {personal.lastName.toUpperCase()}
          </div>
        </h1>
        <h1 id="herotextsm2" className="herotextsm" aria-hidden="true">
          <div className="line" id="line1">
            {personal.firstName.toUpperCase()}
          </div>
          <div className="line" id="line2">
            {personal.lastName.toUpperCase()}
          </div>
        </h1>
        <img src={heroImage} id="myimagesm" alt={personal.fullName} />
      </div>
      <div id="bottomlink">
        <div className="bottomlink" id="post">
          <h2>{personal.title}</h2>
        </div>
        {personal.mobileTitles.map((title) => (
          <div id="post2" key={title}>
            <h2>{title}</h2>
          </div>
        ))}
        <a className="bottomlink" id="resume" href={resumePdf} download="CV_Sakshi_final.pdf">
          <h2>Download Resume</h2>
        </a>
      </div>
      <img src={heroImage} id="myimage" alt={personal.fullName} />
      <img
        id="herosectionbg"
        src="https://media-public.canva.com/BVg_Y/MAE9xWBVg_Y/1/s2.png"
        alt=""
      />
      <img className="cloud2" id="cloud1" src={cloudImage} alt="" />
      <img className="cloud2" id="cloud2" src={cloudImage} alt="" />
      <img className="cloud2" id="cloud3" src={cloudImage} alt="" />
    </section>
  );
}
