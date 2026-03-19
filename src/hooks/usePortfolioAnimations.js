import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const COLORS = {
  beige: "#fffdf0",
  brown: "#b6825b",
  lightgrey: "#e1e1e1",
  pink: "#e5516e",
  lightblue: "#a1b2ff",
  orange: "#f9a01b",
  darkblue: "#5271ff",
  darkbrown: "#966e50",
};

function isMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}

function isTablet() {
  return window.matchMedia("(min-width: 769px) and (max-width: 1080px) and (min-height: 550px)").matches;
}

function wrapEachChar(selector, spanClass) {
  document.querySelectorAll(selector).forEach((block) => {
    const lines = block.querySelectorAll(".line");
    lines.forEach((line) => {
      if (line.dataset.wrapped === "true") {
        return;
      }
      const text = line.textContent ?? "";
      line.textContent = "";
      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.classList.add(spanClass);
        line.appendChild(span);
      });
      line.dataset.wrapped = "true";
    });
  });
}

function wrapChar(selector, spanClass) {
  const element = document.querySelector(selector);
  if (!element || element.dataset.wrapped === "true") {
    return;
  }

  const text = element.textContent ?? "";
  element.textContent = "";
  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.classList.add(spanClass);
    element.appendChild(span);
  });
  element.dataset.wrapped = "true";
}

export function usePortfolioAnimations(rootRef, { isDarkMode, activeProject }) {
  const currentSectionIdRef = useRef("#herosection");
  const activeProjectRef = useRef(activeProject);
  const darkModeRef = useRef(isDarkMode);

  useEffect(() => {
    activeProjectRef.current = activeProject;
  }, [activeProject]);

  useEffect(() => {
    darkModeRef.current = isDarkMode;
  }, [isDarkMode]);

  const scrollToSectionEnd = useCallback((event, href) => {
    event.preventDefault();

    const target = document.querySelector(href);
    if (!target) {
      return;
    }

    const rect = target.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const sectionBottom = rect.top + scrollTop + target.offsetHeight;
    const scrollToY = Math.max(0, sectionBottom - window.innerHeight);

    const from = currentSectionIdRef.current;
    const to = href;
    let duration = 1.5;

    if (from === "#herosection" && to === "#skillsection") duration = 1;
    else if (from === "#herosection" && to === "#projectsection") duration = 2;
    else if (from === "#herosection" && to === "#contactsection") duration = 3;
    else if (from === "#contactsection" && to === "#herosection") duration = 3;
    else if (from === "#projectsection" && to === "#herosection") duration = 2;
    else if (from === "#skillsection" && to === "#herosection") duration = 1;

    gsap.to(window, {
      scrollTo: scrollToY,
      duration,
      ease: "power2.out",
    });

    currentSectionIdRef.current = href;
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return undefined;
    }

    const listeners = [];
    let observer;
    let lenis;
    let rafId = 0;
    let entrancePlayed = false;

    const addListener = (element, eventName, handler) => {
      if (!element) {
        return;
      }
      element.addEventListener(eventName, handler);
      listeners.push(() => element.removeEventListener(eventName, handler));
    };

    const showCursorLabel = (text, width = "fit-content") => {
      gsap.to("#cursor h4", { textContent: text });
      gsap.to("#cursor", {
        borderRadius: "20px",
        height: "fit-content",
        width,
        padding: "0vh 1.8vh",
        duration: 0.5,
        ease: "back.out",
      });
    };

    const resetCursorLabel = () => {
      gsap.to("#cursor h4", { textContent: "" });
      gsap.to("#cursor", {
        borderRadius: "50%",
        height: "30px",
        width: "30px",
        padding: 0,
        duration: 0.5,
        ease: "back.out",
      });
    };

    const bindTooltip = (selector, text, width = "fit-content") => {
      document.querySelectorAll(selector).forEach((element) => {
        addListener(element, "mouseenter", () => showCursorLabel(text, width));
        addListener(element, "mouseleave", resetCursorLabel);
      });
    };

    const bindHoverScale = (selector, enterProps, leaveProps) => {
      document.querySelectorAll(selector).forEach((element) => {
        addListener(element, "mouseenter", () => gsap.to(element, enterProps));
        addListener(element, "mouseleave", () => gsap.to(element, leaveProps));
      });
    };

    const setupBoxToggle = (boxClass) => {
      const box = document.querySelector(`.${boxClass}`);
      if (!box) {
        return;
      }

      let isTapped = false;

      const handleInsideClick = (event) => {
        event.stopPropagation();

        const timeline = gsap.timeline({
          onComplete: () => {
            isTapped = !isTapped;
          },
        });

        if (!isTapped) {
          timeline.to(`.${boxClass} h4`, { opacity: 0, duration: 0.5 });
          timeline.set(`.${boxClass} h4`, { display: "none" });
          timeline.set(`.${boxClass} h3`, { display: "block" });
          timeline.to(`.${boxClass} h3`, { opacity: 1, duration: 0.5 });
        } else {
          timeline.to(`.${boxClass} h3`, { opacity: 0, duration: 0.5 });
          timeline.set(`.${boxClass} h3`, { display: "none" });
          timeline.set(`.${boxClass} h4`, { display: "block" });
          timeline.to(`.${boxClass} h4`, { opacity: 1, duration: 0.5 });
        }
      };

      const handleOutsideClick = (event) => {
        if (!box.contains(event.target) && isTapped) {
          const timeline = gsap.timeline({
            onComplete: () => {
              isTapped = false;
            },
          });
          timeline.to(`.${boxClass} h3`, { opacity: 0, duration: 0.5 });
          timeline.set(`.${boxClass} h3`, { display: "none" });
          timeline.set(`.${boxClass} h4`, { display: "block" });
          timeline.to(`.${boxClass} h4`, { opacity: 1, duration: 0.5 });
        }
      };

      addListener(box, "click", handleInsideClick);
      addListener(document, "click", handleOutsideClick);
    };

    const setupProjectPreviewExpand = () => {
      const expandButton = document.querySelector("#expandicon");
      addListener(expandButton, "click", () => {
        const link = activeProjectRef.current.preview || activeProjectRef.current.github;
        if (link) {
          window.open(link, "_blank", "noopener,noreferrer");
        }
      });
    };

    const setupObserver = () => {
      const sections = document.querySelectorAll("section");
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              currentSectionIdRef.current = `#${entry.target.id}`;
            }
          });
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.8,
        }
      );
      sections.forEach((section) => observer.observe(section));
    };

    const setupSmoothScroll = () => {
      lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    const setupMenu = () => {
      const menuButton = document.getElementById("sidemenuopenicon");
      const menuCloseButton = document.getElementById("sidemenucloseicon");
      const menuBlur = document.getElementById("menublur");

      addListener(menuButton, "click", () => {
        const tl = gsap.timeline();
        gsap.set(menuCloseButton, { opacity: 0, display: "inline-block" });
        gsap.set(menuButton, { display: "none" });
        gsap.set(menuBlur, { display: "flex", x: "-100vw", opacity: 0 });
        gsap.set(".link", { x: "-80vw", opacity: 0, display: "block" });

        gsap.to(menuBlur, {
          x: 0,
          opacity: 0.97,
          duration: 0.7,
          delay: 0.2,
        });

        tl.to(".link", {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
        });
        tl.to(menuCloseButton, {
          opacity: 1,
          duration: 0.5,
        });
      });

      addListener(menuCloseButton, "click", () => {
        const tl = gsap.timeline();
        tl.to(menuCloseButton, {
          opacity: 0,
          rotate: "-90deg",
          duration: 0.5,
        });
        tl.to(".link", {
          x: "-80vw",
          duration: 1,
          stagger: -0.1,
          onComplete: () => {
            gsap.set(".link", { display: "none" });
          },
        });
        gsap.to(menuBlur, {
          x: "-80vw",
          opacity: 0.6,
          duration: 0.4,
          delay: 1,
          ease: "power.in",
          onComplete: () => {
            gsap.set(menuBlur, { display: "none" });
            gsap.fromTo(
              menuButton,
              { rotate: -45 },
              { display: "inline-block", rotate: 0, opacity: 1, duration: 0.2 }
            );
          },
        });
      });
    };

    const setupDesktopCursor = () => {
      if (isMobile()) {
        return;
      }

      const bindDataCursor = (selector, width = "20vw") => {
        document.querySelectorAll(selector).forEach((element) => {
          const label = element.getAttribute("data-cursor");
          if (!label) {
            return;
          }
          addListener(element, "mouseenter", () => showCursorLabel(label, width));
          addListener(element, "mouseleave", resetCursorLabel);
        });
      };

      addListener(window, "mousemove", (event) => {
        gsap.to("#cursor", {
          opacity: 1,
          x: event.clientX,
          y: event.clientY,
        });
      });

      bindTooltip("#homeicon, #homeicon2, #homeicon3", "Go to Homepage");
      bindTooltip(".githubnav", "GitHub");
      bindTooltip(".linkedinnav", "LinkedIn");
      bindTooltip(".link", "Go To Section");
      bindTooltip("#darkmode", "Dark Mode");
      bindTooltip("#lightmode", "Light Mode");
      bindTooltip("#expandingbutton", "Open in New Tab", "10vw");
      bindTooltip(".previewwebsite", "Preview Website", "10vw");
      bindTooltip(".gotogithub", "Go to Github Source", "15vw");
      bindTooltip("#mountain", "This is just a mountain....", "20vw");
      bindTooltip(".contact-copy a", "Write an email", "10vw");
      bindTooltip(".badge", "Strong React, Node.js, databases, and product-building focus.", "20vw");
      bindTooltip("#patterndiv", "Primary skills are highlighted in this feature card.", "20vw");
      bindDataCursor(".stat-card");
      bindDataCursor(".info-panel");
      bindDataCursor(".listcontent");
      bindDataCursor(".contact-card");

      const heroText = document.getElementById("herotext");
      const heroImage = document.getElementById("myimage");
      const resume = document.getElementById("resume");
      const post = document.getElementById("post");

      addListener(heroText, "mouseenter", () => {
        gsap.to("#cursor", { scale: 1.5 });
      });
      addListener(heroText, "mouseleave", () => {
        gsap.to("#cursor", { scale: 1 });
      });

      addListener(heroImage, "mouseenter", () => showCursorLabel("Sakshi Kumari"));
      addListener(heroImage, "mouseleave", resetCursorLabel);

      addListener(resume, "mouseenter", () => {
        gsap.to(resume, {
          scale: 1.1,
          backgroundColor: COLORS.orange,
          duration: 0.4,
        });
        gsap.to(".resume-sm", {
          y: "2vw",
          duration: 0.2,
          stagger: 0.05,
          onStart: () => {
            gsap.fromTo(
              ".resume-sm",
              { y: "-4vw", delay: 0.2 },
              { y: "0vw", duration: 0.2, delay: 0.2, stagger: 0.05 }
            );
          },
        });
      });
      addListener(resume, "mouseleave", () => {
        gsap.to(resume, {
          scale: 1,
          backgroundColor: COLORS.pink,
          duration: 0.4,
        });
      });

      addListener(post, "mouseenter", () => {
        gsap.to(post, {
          scale: 1.1,
          backgroundColor: COLORS.darkblue,
          zIndex: 9,
          duration: 0.2,
        });
        gsap.to("#post h2", { color: COLORS.beige, duration: 0.2 });
      });
      addListener(post, "mouseleave", () => {
        gsap.to(post, {
          scale: 1,
          backgroundColor: darkModeRef.current ? COLORS.beige : COLORS.darkbrown,
          zIndex: 2,
          duration: 0.2,
        });
      });

      document.querySelectorAll(".listcontent").forEach((box) => {
        addListener(box, "mouseenter", () => {
          gsap.to(box, {
            backgroundColor: "rgba(255,255,255,0.7)",
            duration: 0.25,
            ease: "power2.out",
          });
        });
        addListener(box, "mouseleave", () => {
          gsap.to(box, {
            backgroundColor: "rgba(255,255,255,0.36)",
            duration: 0.25,
            ease: "power2.out",
          });
        });
      });

      document.querySelectorAll(".contact-card").forEach((box) => {
        addListener(box, "mouseenter", () => {
          gsap.to(box, {
            backgroundColor: "rgba(255,255,255,0.56)",
            duration: 0.25,
            ease: "power2.out",
          });
        });
        addListener(box, "mouseleave", () => {
          gsap.to(box, {
            backgroundColor: "rgba(255,255,255,0.42)",
            duration: 0.25,
            ease: "power2.out",
          });
        });
      });

      bindHoverScale(".badge", { scale: 1.08, duration: 0.25 }, { scale: 1, duration: 0.25 });
    };

    const setupTextTransforms = () => {
      if (isMobile()) {
        wrapEachChar(".herotext", "char");
        wrapEachChar(".herotextsm", "char");
      } else {
        wrapEachChar("#herotext", "char-sm");
        wrapEachChar("#herotextsm1", "char-sm");
        wrapChar("#resume h2", "resume-sm");
      }
    };

    const playEntrance = () => {
      if (entrancePlayed) {
        return;
      }
      entrancePlayed = true;

      setupTextTransforms();

      gsap.to("#preloader", {
        opacity: 0,
        display: "none",
        duration: 1,
      });
      document.body.classList.remove("lock-scroll");

      if (isMobile()) {
        const tl = gsap.timeline();
        gsap.from(".cloud", { opacity: 0, duration: 0.7 });
        gsap.to(".cloud", {
          x: 5,
          y: -5,
          repeat: -1,
          yoyo: true,
          duration: 1,
          stagger: 0.5,
          ease: "power1.out",
        });

        tl.from("#sidemenuopenicon", { y: 50, duration: 0.6, ease: "back.out" });
        tl.from("#navline", { width: "0%", duration: 0.5, ease: "back.out" });
        tl.from(["#navicon", ".uimode"], { y: 50, duration: 0.5, stagger: -0.1, ease: "back.out" });
        tl.from(".char", {
          y: "-20vw",
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out",
          onComplete: () => {
            gsap.from(".char", {
              y: "3vw",
              duration: 0.3,
              stagger: 0.1,
              ease: "back.out",
              repeat: -1,
              yoyo: true,
            });
          },
        });
        tl.fromTo(
          "#myimagesm",
          { y: 200, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 2,
            ease: "back.out",
            onComplete: () => {
              gsap.to("#post2", {
                height: "10vw",
                duration: 0.7,
                stagger: 0.2,
                ease: "back.out(3)",
                onComplete: () => {
                  gsap.to("#resume", {
                    height: "10vw",
                    duration: 0.7,
                    ease: "back.out(3)",
                  });
                },
              });
            },
          }
        );
      } else {
        const tl = gsap.timeline();
        gsap.to(".cloud2", {
          x: "-2vw",
          y: "-1vw",
          duration: 2,
          yoyo: true,
          stagger: 0.6,
          ease: "power1.inOut",
          repeat: -1,
        });

        tl.from("#herosectionbg", { x: "-50vw", scale: 0, opacity: 0, duration: 1 });
        tl.from(".link", {
          y: "-8vw",
          duration: 1,
          stagger: 0.1,
          ease: "back.out",
          onComplete: () => {
            gsap.fromTo(
              "#myimage",
              { opacity: 0, y: "30vw" },
              { opacity: 1, y: 0, duration: 2, delay: 1, ease: "back.out(2)" }
            );
          },
        });
        tl.from("#navline", {
          width: "0%",
          duration: 0.5,
          onComplete: () => {
            gsap.to(".char-sm", {
              opacity: 1,
              y: "0vw",
              duration: 2,
              stagger: 0.2,
              ease: "back.out",
            });
          },
        });
        tl.from(["#navicon", ".uimode"], { y: "8vw", duration: 1, stagger: -0.2, ease: "back.out" });
        tl.from(".bottomlink", { y: "5vw", opacity: 0, duration: 1, ease: "back.out", stagger: 0.2 });
        tl.from(".cloud2", { opacity: 0, y: "-2vw", duration: 1 });
      }

      ScrollTrigger.refresh();
    };

    const setupScrollScenes = () => {
      const reveal = (selector, animationVars = {}, trigger = selector, options = {}) => {
        const elements = gsap.utils.toArray(selector);
        if (!elements.length) {
          return;
        }

        gsap.from(elements, {
          y: 70,
          opacity: 0,
          scale: 0.98,
          duration: 0.95,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger,
            start: options.start ?? "top 82%",
            once: options.once ?? true,
          },
          ...animationVars,
        });
      };

      const parallax = (selector, amount, trigger) => {
        const element = document.querySelector(selector);
        if (!element) {
          return;
        }

        gsap.to(element, {
          yPercent: amount,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      };

      reveal("#skilltitle", { y: 50, scale: 1, duration: 0.9 }, "#skillsection");
      reveal("#navline2", { width: 0, transformOrigin: "left center", duration: 0.8 }, "#skillsection");
      reveal("#bentogrid .stat-card", { y: 85, stagger: 0.1 }, "#bentogrid");
      reveal(".profile-showcase", { y: 40, duration: 0.85 }, ".profile-showcase");
      reveal(".profile-panels .info-panel", { y: 70, stagger: 0.1 }, ".profile-panels");

      reveal("#projecttitle", { x: isMobile() ? 0 : -50, y: 35, scale: 1, duration: 0.9 }, "#projectsection");
      reveal("#navline3", { width: 0, transformOrigin: "left center", duration: 0.8 }, "#projectsection");
      reveal(".listcontent", { x: isMobile() ? 0 : -36, y: 60, stagger: 0.12 }, "#list");
      if (!isMobile()) {
        reveal("#previewpane", { x: 45, y: 0, duration: 1 }, "#projectlistcontainer");
        gsap.set("#previewpane", { pointerEvents: "auto" });
      }

      reveal("#contacttitle", { x: isMobile() ? 0 : 50, y: 35, scale: 1, duration: 0.9 }, "#contactsection");
      reveal("#navline4", { width: 0, transformOrigin: "left center", duration: 0.8 }, "#contactsection");
      reveal(".contact-card", { y: 65, stagger: 0.12 }, "#listgrid");
      reveal(".contact-copy", { y: 45, duration: 0.85 }, ".contact-copy");
      if (!isMobile()) {
        reveal("#mountain", { x: 40, y: 0, duration: 1 }, "#contactsection");
      }

      gsap.to(".badge", {
        rotate: 360,
        duration: 18,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".cgpa-meter", {
        scale: 1.03,
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      [["#cloud4", -5], ["#projectsectioncloud", -4], ["#projectsectioncloud2", 3], ["#contactsectioncloud", -4], ["#contactsectioncloud2", -3]].forEach(
        ([selector, x]) => {
          const element = document.querySelector(selector);
          if (!element) {
            return;
          }
          gsap.to(selector, {
            x: `${x}vw`,
            y: "-0.8vw",
            duration: 8 + Math.abs(x),
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
        }
      );

      parallax("#skillsectionbg", 8, "#skillsection");
      parallax("#projectsectionbg", 10, "#projectsection");
      parallax("#contactsectionbg", 8, "#contactsection");
    };

    const setupMobileProjectInfo = () => {
      if (isMobile()) {
        ["box1", "box2", "box3"].forEach(setupBoxToggle);
      }
    };

    const ctx = gsap.context(() => {
      document.body.classList.add("lock-scroll");
      gsap.set("#preloader", { display: "flex", opacity: 1 });

      setupSmoothScroll();
      setupObserver();
      setupMenu();
      setupDesktopCursor();
      setupProjectPreviewExpand();
      setupMobileProjectInfo();
      setupScrollScenes();
    }, root);

    const onLoad = () => {
      playEntrance();
    };

    if (document.readyState === "complete") {
      playEntrance();
    } else {
      window.addEventListener("load", onLoad, { once: true });
      listeners.push(() => window.removeEventListener("load", onLoad));
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (lenis) {
        lenis.destroy();
      }
      if (observer) {
        observer.disconnect();
      }
      listeners.forEach((cleanup) => cleanup());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ctx.revert();
    };
    }, [rootRef]);

  useEffect(() => {
    document.body.classList.toggle("theme-dark", isDarkMode);

    if (isDarkMode) {
      gsap.to(document.body, { backgroundColor: COLORS.brown, duration: 1 });
      gsap.to(["#post h2", "#post2 h2"], { color: COLORS.brown, duration: 1 });
      gsap.to(["#navline", "#post", "#post2"], { backgroundColor: COLORS.beige, duration: 1 });
      gsap.to(".link", { color: COLORS.beige, duration: 1 });
      gsap.to("#menublur", { backgroundColor: COLORS.brown, duration: 1 });
      gsap.to("#darkmode", {
        opacity: 0,
        display: "none",
        duration: 0.5,
        onComplete: () => {
          gsap.to("#lightmodecontainer", { display: "flex", opacity: 1, duration: 0.5 });
          gsap.to("#lightmode", { opacity: 1, display: "inline-block", duration: 0.5 });
        },
      });
      gsap.to(["#navicon path", "#sidemenuopenicon", "#sidemenucloseicon"], { fill: COLORS.beige, duration: 1 });
      gsap.to(".brownbg", { backgroundColor: "#545454", duration: 1 });
      gsap.to(["#skilltitle h1", "#projecttitle h1", "#contacttitle h1"], { color: COLORS.beige, duration: 1 });
      gsap.to(["#navline3", "#navline4"], { backgroundColor: COLORS.beige, duration: 1 });
      gsap.to("#githubicon", { fill: COLORS.beige, duration: 1 });
      gsap.to(["#homeicon", "#homeicon2", "#homeicon3"], { fill: COLORS.beige, duration: 1 });
      gsap.to("#endcredits", { color: COLORS.beige, duration: 1 });
    } else {
      gsap.to(document.body, { backgroundColor: COLORS.beige, duration: 1 });
      gsap.to(["#post h2", "#post2 h2"], { color: COLORS.beige, duration: 1 });
      gsap.to(["#navline", "#post", "#post2"], { backgroundColor: COLORS.brown, duration: 1 });
      gsap.to(".link", { color: COLORS.brown, duration: 1 });
      gsap.to("#menublur", { backgroundColor: COLORS.beige, duration: 1 });
      gsap.to("#lightmodecontainer", {
        opacity: 0,
        display: "none",
        duration: 0.5,
        onComplete: () => {
          gsap.to("#darkmode", { opacity: 1, display: "inline-block", duration: 0.5 });
        },
      });
      gsap.to(["#navicon path", "#sidemenuopenicon", "#sidemenucloseicon"], { fill: COLORS.brown, duration: 1 });
      gsap.to(".brownbg", { backgroundColor: COLORS.brown, duration: 1 });
      gsap.to(["#skilltitle h1", "#projecttitle h1", "#contacttitle h1"], { color: COLORS.orange, duration: 1 });
      gsap.to(["#navline3", "#navline4"], { backgroundColor: COLORS.orange, duration: 1 });
      gsap.to("#githubicon", { fill: COLORS.orange, duration: 1 });
      gsap.to(["#homeicon", "#homeicon2", "#homeicon3"], { fill: COLORS.brown, duration: 1 });
      gsap.to("#endcredits", { color: COLORS.brown, duration: 1 });
    }
  }, [isDarkMode]);

  useEffect(() => {
    const iframe = document.getElementById("websiteframe");
    const noPreview = document.getElementById("nopreview");

    if (!iframe || !noPreview) {
      return;
    }

    const targetUrl = activeProject.preview || "about:blank";

    gsap.to(iframe, {
      duration: 0.35,
      opacity: 0,
      onStart: () => {
        if (activeProject.preview) {
          gsap.set(noPreview, { zIndex: -1, display: "none" });
        }
      },
      onComplete: () => {
        iframe.src = targetUrl;
        if (!activeProject.preview) {
          gsap.set(noPreview, { zIndex: 2, display: "block" });
          return;
        }
        window.setTimeout(() => {
          gsap.to(iframe, { duration: 0.45, opacity: 1 });
        }, 350);
      },
    });
  }, [activeProject]);

  return { scrollToSectionEnd };
}
