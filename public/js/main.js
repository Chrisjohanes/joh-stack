(() => {
  "use strict";
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
})();