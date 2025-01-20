import gsap from "gsap";

export function initialFX() {
  document.body.style.overflowY = "auto";
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  const splitText = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      const chars = element.textContent?.split("").map(char => `<span class="split-char">${char}</span>`).join("");
      element.innerHTML = chars || "";
    }
  };

  splitText(".landing-info h3");
  splitText(".landing-intro h2");
  splitText(".landing-intro h1");
  splitText(".landing-h2-info");
  splitText(".landing-h2-info-1");
  splitText(".landing-h2-1");
  splitText(".landing-h2-2");

  const animateText = (selector: string, delay: number = 0.3) => {
    gsap.fromTo(
      `${selector} .split-char`,
      { opacity: 0, y: 80, filter: "blur(5px)" },
      {
        opacity: 1,
        duration: 1.2,
        filter: "blur(0px)",
        ease: "power3.inOut",
        y: 0,
        stagger: 0.025,
        delay: delay,
      }
    );
  };

  animateText(".landing-info h3");
  animateText(".landing-intro h2");
  animateText(".landing-intro h1");
  animateText(".landing-h2-info");

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  const loopText = (selector1: string, selector2: string) => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    const delay = 4;
    const delay2 = delay * 2 + 1;

    tl.fromTo(
      `${selector2} .split-char`,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay,
      },
      0
    )
      .fromTo(
        `${selector1} .split-char`,
        { y: 80 },
        {
          duration: 1.2,
          ease: "power3.inOut",
          y: 0,
          stagger: 0.1,
          delay: delay2,
        },
        1
      )
      .fromTo(
        `${selector1} .split-char`,
        { y: 0 },
        {
          y: -80,
          duration: 1.2,
          ease: "power3.inOut",
          stagger: 0.1,
          delay: delay,
        },
        0
      )
      .to(
        `${selector2} .split-char`,
        {
          y: -80,
          duration: 1.2,
          ease: "power3.inOut",
          stagger: 0.1,
          delay: delay2,
        },
        1
      );
  };

  loopText(".landing-h2-info", ".landing-h2-info-1");
  loopText(".landing-h2-1", ".landing-h2-2");
}
