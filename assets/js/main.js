(() => {
  "use strict";

  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
  const linkBySection = new Map();
  navLinks.forEach((link) => {
    const hash = link.getAttribute("href").split("#")[1];
    if (!hash) return;
    const section = document.getElementById(hash);
    if (section) linkBySection.set(section, link);
  });

  if ("IntersectionObserver" in window && linkBySection.size) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const activeLink = linkBySection.get(entry.target);
          if (!activeLink) return;
          navLinks.forEach((link) => link.classList.remove("is-active"));
          activeLink.classList.add("is-active");
        });
      },
      { threshold: 0.5 }
    );
    linkBySection.forEach((_link, section) => navObserver.observe(section));
  }
})();
