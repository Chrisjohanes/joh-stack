(() => {
  "use strict";
  document.documentElement.classList.add("js-enabled");
  const toggle = document.getElementById("menuToggle");
  const links = document.getElementById("navLinks");
  const icon = toggle?.querySelector("i");

  const closeMenu = () => {
    links?.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.setAttribute("aria-label", "Open navigation");
    if (icon) icon.className = "fa-solid fa-bars";
  };

  toggle?.addEventListener("click", () => {
    const open = links?.classList.toggle("open") ?? false;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    if (icon) icon.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
  });

  links?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Reveal content gently as it enters the viewport.
  const revealItems = document.querySelectorAll(
    ".section-heading, .about-copy, .timeline-item, .project-card, .skill-group, .contact-layout > div, .hero-copy, .hero-visual, .hero-bottom"
  );
  revealItems.forEach((item, index) => {
    item.classList.add("motion-reveal");
    if (item.matches(".project-card, .skill-group, .timeline-item")) {
      item.style.setProperty("--reveal-delay", `${(index % 4) * 90}ms`);
    }
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Reading progress indicator and floating back-to-top control.
  const progress = document.getElementById("scrollProgress");
  const backTop = document.querySelector(".floating-top");
  let ticking = false;
  const updateScrollUI = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progress) progress.style.width = `${percent}%`;
    backTop?.classList.toggle("visible", window.scrollY > 500);
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollUI);
      ticking = true;
    }
  }, { passive: true });
  updateScrollUI();
})();