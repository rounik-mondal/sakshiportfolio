import { ActionIcon, HomeIcon } from "./Icons";

export default function ContactSection({
  personal,
  onNavigate,
  contactBackground,
  mountainImage,
  cloudImage,
}) {
  const contactItems = [
    {
      label: "MAIL",
      href: `mailto:${personal.email}`,
      id: "contactmail",
      description: "Start a conversation for roles, collaborations, or freelance work.",
    },
    {
      label: "LINKEDIN",
      href: personal.linkedin,
      id: "contactlinkedin",
      description: "Connect professionally and explore Sakshi's current profile.",
    },
    {
      label: "GITHUB",
      href: personal.github,
      id: "contactgithub",
      description: "Browse shipped projects, source code, and technical experiments.",
    },
  ];

  return (
    <section id="contactsection">
      <div id="contactsectioncontainer">
        <div id="contacttitle">
          <h1>CONTACT</h1>
          <a href="#herosection" onClick={(event) => onNavigate(event, "#herosection")} aria-label="Back to top">
            <HomeIcon id="homeicon3" />
          </a>
        </div>
        <div id="navline4"></div>
        <div id="listgrid">
          {contactItems.map((item, index) => (
            <article
              className={`list2content contact-card ${
                index === 0 ? "orangelist2" : index === 1 ? "bluelist2" : "graylist2"
              }`}
              key={item.label}
              data-cursor={item.description}
            >
              <div className="contact-card-copy">
                <span className="contact-card-kicker">{item.label}</span>
                <h2>{item.label}</h2>
                <p>{item.description}</p>
              </div>
              <a href={item.href} target="_blank" rel="noreferrer" aria-label={`Open ${item.label}`}>
                <div className="contacticon" id={item.id}>
                  <ActionIcon className="list2icon" />
                </div>
              </a>
            </article>
          ))}
        </div>
        <div className="contact-copy">
          <p>{personal.intro}</p>
          <a href={`mailto:${personal.email}`}>{personal.email}</a>
        </div>
        <div className="spacefill"></div>
      </div>
      <img id="contactsectionbg" src={contactBackground} alt="" />
      <img id="contactsectioncloud" src={cloudImage} alt="" />
      <img id="contactsectioncloud2" src={cloudImage} alt="" />
      <img id="mountain" src={mountainImage} alt="" />
    </section>
  );
}
