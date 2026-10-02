(function () {
  "use strict";

  /* ========================================================
   * GLOBAL CONFIGURATION
   * ======================================================== */

  const CONFIG = {
    themeStorageKey: "joh-stack-theme",

    whatsappNumber: "6282111915723",

    typingWords: [
      "Web Solutions",
      "Business Systems",
      "Modern Interfaces",
      "Useful Experiences",
    ],

    typingTypeSpeed: 80,
    typingDeleteSpeed: 45,
    typingPause: 1800,

    counterDuration: 1800,

    particleCount: 45,
    particleConnectionDistance: 120,
  };

  /* ========================================================
   * DOM READY
   * ======================================================== */

  document.addEventListener("DOMContentLoaded", function () {
    initPageLoader();
    initNavbar();
    initScrollProgress();
    initMobileNavigation();
    initActiveNavigation();
    initThemeToggle();
    initTypingEffect();
    initCounters();
    initRevealAnimations();
    initSkillBars();
    initSmoothScrolling();
    initScrollToTop();
    initContactForm();
    initButtonInteractions();
    initLazyImages();
    initBootstrapComponents();
    initParticles();
  });

  /* ========================================================
   * PAGE LOADER
   * ======================================================== */

  function initPageLoader() {
    const loader = document.getElementById("pageLoader");

    if (!loader) {
      return;
    }

    window.addEventListener("load", function () {
      setTimeout(function () {
        loader.classList.add("loaded");

        setTimeout(function () {
          loader.style.display = "none";
        }, 600);
      }, 300);
    });
  }

  /* ========================================================
   * NAVBAR
   * ======================================================== */

  function initNavbar() {
    const navbar = document.getElementById("navbar");

    if (!navbar) {
      return;
    }

    function updateNavbar() {
      if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    updateNavbar();

    window.addEventListener("scroll", updateNavbar, { passive: true });
  }

  /* ========================================================
   * SCROLL PROGRESS
   * ======================================================== */

  function initScrollProgress() {
    const progressBar = document.getElementById("progressBar");

    if (!progressBar) {
      return;
    }

    function updateProgress() {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (documentHeight <= 0) {
        progressBar.style.width = "0%";
        return;
      }

      const progress = (scrollTop / documentHeight) * 100;

      progressBar.style.width = Math.min(progress, 100) + "%";
    }

    updateProgress();

    window.addEventListener("scroll", updateProgress, { passive: true });
  }

  /* ========================================================
   * MOBILE NAVIGATION
   * ======================================================== */

  function initMobileNavigation() {
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");
    const navOverlay = document.getElementById("navOverlay");
    const navIcon = document.getElementById("navIcon");

    if (!navToggle || !navLinks) {
      return;
    }

    function openMenu() {
      navLinks.classList.add("active");

      if (navOverlay) {
        navOverlay.classList.add("active");
      }

      navToggle.classList.add("active");

      document.body.classList.add("menu-open");

      if (navIcon) {
        navIcon.classList.remove("fa-bars");
        navIcon.classList.add("fa-times");
      }

      navToggle.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
      navLinks.classList.remove("active");

      if (navOverlay) {
        navOverlay.classList.remove("active");
      }

      navToggle.classList.remove("active");

      document.body.classList.remove("menu-open");

      if (navIcon) {
        navIcon.classList.remove("fa-times");
        navIcon.classList.add("fa-bars");
      }

      navToggle.setAttribute("aria-expanded", "false");
    }

    function toggleMenu() {
      if (navLinks.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    navToggle.addEventListener("click", toggleMenu);

    if (navOverlay) {
      navOverlay.addEventListener("click", closeMenu);
    }

    const links = navLinks.querySelectorAll("a");

    links.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 992) {
        closeMenu();
      }
    });
  }

  /* ========================================================
   * ACTIVE NAVIGATION
   * ======================================================== */

  function initActiveNavigation() {
    const navLinks = document.querySelectorAll('#navLinks a[href^="#"]');

    if (!navLinks.length) {
      return;
    }

    const sections = [];

    navLinks.forEach(function (link) {
      const href = link.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      const section = document.querySelector(href);

      if (section) {
        sections.push({
          section: section,
          link: link,
        });
      }
    });

    function updateActiveLink() {
      const scrollPosition = window.scrollY + 150;

      let currentSection = null;

      sections.forEach(function (item) {
        const sectionTop = item.section.offsetTop;

        const sectionHeight = item.section.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          currentSection = item;
        }
      });

      navLinks.forEach(function (link) {
        link.classList.remove("active");
      });

      if (currentSection) {
        currentSection.link.classList.add("active");
      }
    }

    updateActiveLink();

    window.addEventListener("scroll", updateActiveLink, { passive: true });
  }

  /* ========================================================
   * THEME TOGGLE
   * ======================================================== */

  function initThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");

    const themeIcon = document.getElementById("themeIcon");

    if (!themeToggle) {
      return;
    }

    function applyTheme(theme) {
      if (theme === "light") {
        document.documentElement.setAttribute("data-theme", "light");

        if (themeIcon) {
          themeIcon.classList.remove("fa-sun");

          themeIcon.classList.add("fa-moon");
        }
      } else {
        document.documentElement.setAttribute("data-theme", "dark");

        if (themeIcon) {
          themeIcon.classList.remove("fa-moon");

          themeIcon.classList.add("fa-sun");
        }
      }
    }

    let savedTheme = null;

    try {
      savedTheme = localStorage.getItem(CONFIG.themeStorageKey);
    } catch (error) {
      savedTheme = null;
    }

    if (!savedTheme) {
      const prefersLight =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches;

      savedTheme = prefersLight ? "light" : "dark";
    }

    applyTheme(savedTheme);

    themeToggle.addEventListener("click", function () {
      const currentTheme =
        document.documentElement.getAttribute("data-theme") || "dark";

      const nextTheme = currentTheme === "dark" ? "light" : "dark";

      applyTheme(nextTheme);

      try {
        localStorage.setItem(CONFIG.themeStorageKey, nextTheme);
      } catch (error) {
        // Ignore storage errors.
      }
    });
  }

  /* ========================================================
   * TYPING EFFECT
   * ======================================================== */

  function initTypingEffect() {
    const typingElement = document.getElementById("typingText");

    if (!typingElement) {
      return;
    }

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      typingElement.textContent = CONFIG.typingWords[0];

      return;
    }

    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function type() {
      const currentWord = CONFIG.typingWords[wordIndex];

      if (!deleting) {
        characterIndex++;

        typingElement.textContent = currentWord.substring(0, characterIndex);

        if (characterIndex >= currentWord.length) {
          deleting = true;

          setTimeout(type, CONFIG.typingPause);

          return;
        }

        setTimeout(type, CONFIG.typingTypeSpeed);
      } else {
        characterIndex--;

        typingElement.textContent = currentWord.substring(0, characterIndex);

        if (characterIndex <= 0) {
          deleting = false;

          wordIndex = (wordIndex + 1) % CONFIG.typingWords.length;

          setTimeout(type, 300);

          return;
        }

        setTimeout(type, CONFIG.typingDeleteSpeed);
      }
    }

    type();
  }

  /* ========================================================
   * COUNTERS
   * ======================================================== */

  function initCounters() {
    const counters = document.querySelectorAll(".counter");

    if (!counters.length) {
      return;
    }

    function animateCounter(element) {
      if (element.dataset.animated === "true") {
        return;
      }

      element.dataset.animated = "true";

      const target = parseFloat(element.dataset.target || "0");

      const suffix = element.dataset.suffix || "";

      if (isNaN(target)) {
        return;
      }

      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;

        const progress = Math.min(elapsed / CONFIG.counterDuration, 1);

        const easedProgress = 1 - Math.pow(1 - progress, 3);

        const currentValue = target * easedProgress;

        if (Number.isInteger(target)) {
          element.textContent = Math.floor(currentValue) + suffix;
        } else {
          element.textContent = currentValue.toFixed(1) + suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target + suffix;
        }
      }

      requestAnimationFrame(updateCounter);
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounter(entry.target);

              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.5,
        },
      );

      counters.forEach(function (counter) {
        observer.observe(counter);
      });
    } else {
      counters.forEach(function (counter) {
        animateCounter(counter);
      });
    }
  }

  /* ========================================================
   * REVEAL ANIMATIONS
   * ======================================================== */

  function initRevealAnimations() {
    const elements = document.querySelectorAll(".reveal");

    if (!elements.length) {
      return;
    }

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      elements.forEach(function (element) {
        element.classList.add("revealed");
      });

      return;
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");

              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -50px 0px",
        },
      );

      elements.forEach(function (element) {
        observer.observe(element);
      });
    } else {
      elements.forEach(function (element) {
        element.classList.add("revealed");
      });
    }
  }

  /* ========================================================
   * SKILL BARS
   * ======================================================== */

  function initSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress");

    if (!skillBars.length) {
      return;
    }

    function animateSkillBar(element) {
      if (element.dataset.animated === "true") {
        return;
      }

      element.dataset.animated = "true";

      const width = element.dataset.width || "0";

      requestAnimationFrame(function () {
        element.style.width = Math.min(parseFloat(width) || 0, 100) + "%";
      });
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateSkillBar(entry.target);

              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.4,
        },
      );

      skillBars.forEach(function (bar) {
        observer.observe(bar);
      });
    } else {
      skillBars.forEach(function (bar) {
        animateSkillBar(bar);
      });
    }
  }

  /* ========================================================
   * SMOOTH SCROLLING
   * ======================================================== */

  function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    if (!links.length) {
      return;
    }

    links.forEach(function (link) {
      link.addEventListener("click", function (event) {
        const href = link.getAttribute("href");

        if (!href || href === "#" || href.length <= 1) {
          return;
        }

        const target = document.querySelector(href);

        if (!target) {
          return;
        }

        event.preventDefault();

        const navbar = document.getElementById("navbar");

        const navbarHeight = navbar ? navbar.offsetHeight : 0;

        const targetPosition =
          target.getBoundingClientRect().top + window.scrollY - navbarHeight;

        window.scrollTo({
          top: Math.max(targetPosition, 0),
          behavior: "smooth",
        });

        /*
         * Update URL without
         * triggering browser jump.
         */

        try {
          history.replaceState(null, "", href);
        } catch (error) {
          // Ignore history errors.
        }
      });
    });
  }

  /* ========================================================
   * SCROLL TO TOP
   * ======================================================== */

  function initScrollToTop() {
    const scrollTop = document.getElementById("scrollTop");

    if (!scrollTop) {
      return;
    }

    function updateVisibility() {
      if (window.scrollY > 500) {
        scrollTop.classList.add("show");
      } else {
        scrollTop.classList.remove("show");
      }
    }

    updateVisibility();

    window.addEventListener("scroll", updateVisibility, { passive: true });

    scrollTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* ========================================================
   * CONTACT FORM
   * ======================================================== */

  function initContactForm() {
    const form = document.getElementById("contactForm");

    if (!form) {
      return;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const nameInput = form.querySelector('[name="name"]');

      const emailInput = form.querySelector('[name="email"]');

      const subjectInput = form.querySelector('[name="subject"]');

      const messageInput = form.querySelector('[name="message"]');

      const name = nameInput ? nameInput.value.trim() : "";

      const email = emailInput ? emailInput.value.trim() : "";

      const subject = subjectInput ? subjectInput.value.trim() : "";

      const message = messageInput ? messageInput.value.trim() : "";

      if (!name) {
        showFormMessage(form, "Please enter your name.", "error");

        if (nameInput) {
          nameInput.focus();
        }

        return;
      }

      if (!email || !isValidEmail(email)) {
        showFormMessage(form, "Please enter a valid email address.", "error");

        if (emailInput) {
          emailInput.focus();
        }

        return;
      }

      if (!message) {
        showFormMessage(form, "Please enter your message.", "error");

        if (messageInput) {
          messageInput.focus();
        }

        return;
      }

      const whatsappText = [
        "Hello Christian,",
        "",
        "I would like to discuss a project.",
        "",
        "Name: " + name,
        "Email: " + email,
        "Subject: " + (subject || "-"),
        "",
        "Message:",
        message,
      ].join("\n");

      const whatsappUrl =
        "https://wa.me/" +
        CONFIG.whatsappNumber +
        "?text=" +
        encodeURIComponent(whatsappText);

      showFormMessage(form, "Opening WhatsApp...", "success");

      setTimeout(function () {
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      }, 350);
    });

    /*
     * Live validation
     */

    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach(function (input) {
      input.addEventListener("input", function () {
        clearFieldError(input);
      });
    });
  }

  /* ========================================================
   * EMAIL VALIDATION
   * ======================================================== */

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ========================================================
   * FORM MESSAGE
   * ======================================================== */

  function showFormMessage(form, message, type) {
    let messageElement = form.querySelector(".form-message");

    if (!messageElement) {
      messageElement = document.createElement("div");

      messageElement.className = "form-message";

      form.appendChild(messageElement);
    }

    messageElement.textContent = message;

    messageElement.classList.remove("error", "success");

    messageElement.classList.add(type);

    clearTimeout(messageElement._timeout);

    messageElement._timeout = setTimeout(function () {
      messageElement.classList.remove("error", "success");

      messageElement.textContent = "";
    }, 5000);
  }

  /* ========================================================
   * CLEAR FIELD ERROR
   * ======================================================== */

  function clearFieldError(input) {
    input.classList.remove("error");

    input.removeAttribute("aria-invalid");
  }

  /* ========================================================
   * BUTTON INTERACTIONS
   * ======================================================== */

  function initButtonInteractions() {
    const buttons = document.querySelectorAll("button, .btn");

    if (!buttons.length) {
      return;
    }

    buttons.forEach(function (button) {
      button.addEventListener("mouseenter", function () {
        const icon = button.querySelector("i");

        if (icon) {
          icon.style.transform = "translateX(2px)";
        }
      });

      button.addEventListener("mouseleave", function () {
        const icon = button.querySelector("i");

        if (icon) {
          icon.style.transform = "";
        }
      });
    });
  }

  /* ========================================================
   * LAZY IMAGE LOADING
   * ======================================================== */

  function initLazyImages() {
    const images = document.querySelectorAll("img[data-src]");

    if (!images.length) {
      return;
    }

    function loadImage(image) {
      const source = image.dataset.src;

      if (!source) {
        return;
      }

      image.src = source;

      image.removeAttribute("data-src");

      image.addEventListener(
        "error",
        function () {
          image.classList.add("image-error");
        },
        {
          once: true,
        },
      );
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              loadImage(entry.target);

              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: "100px 0px",
        },
      );

      images.forEach(function (image) {
        observer.observe(image);
      });
    } else {
      images.forEach(function (image) {
        loadImage(image);
      });
    }
  }

  /* ========================================================
   * BOOTSTRAP COMPONENTS
   * ======================================================== */

  function initBootstrapComponents() {
    /*
     * Bootstrap is optional.
     * Only initialize these components
     * if Bootstrap is available.
     */

    if (typeof window.bootstrap === "undefined") {
      return;
    }

    /*
     * Tooltip
     */

    const tooltipElements = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]',
    );

    tooltipElements.forEach(function (element) {
      new bootstrap.Tooltip(element);
    });

    /*
     * Popover
     */

    const popoverElements = document.querySelectorAll(
      '[data-bs-toggle="popover"]',
    );

    popoverElements.forEach(function (element) {
      new bootstrap.Popover(element);
    });
  }

  /* ========================================================
   * PARTICLE BACKGROUND
   * ======================================================== */

  function initParticles() {
    const canvas = document.getElementById("particleCanvas");

    if (!canvas) {
      return;
    }

    /*
     * Respect user's reduced motion preference.
     */

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      canvas.style.display = "none";

      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    let width = 0;
    let height = 0;

    let particles = [];

    let animationFrame = null;

    function resizeCanvas() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      width = canvas.offsetWidth;

      height = canvas.offsetHeight;

      if (!width || !height) {
        return;
      }

      canvas.width = width * ratio;

      canvas.height = height * ratio;

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      createParticles();
    }

    function createParticles() {
      particles = [];

      const count = Math.min(
        CONFIG.particleCount,
        Math.max(20, Math.floor((width * height) / 18000)),
      );

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,

          y: Math.random() * height,

          vx: (Math.random() - 0.5) * 0.35,

          vy: (Math.random() - 0.5) * 0.35,

          size: Math.random() * 1.6 + 0.6,
        });
      }
    }

    function getAccentColor() {
      const styles = getComputedStyle(document.documentElement);

      return styles.getPropertyValue("--accent-primary").trim() || "#ff7a18";
    }

    function drawParticles() {
      ctx.clearRect(0, 0, width, height);

      const accentColor = getAccentColor();

      /*
       * Draw particles
       */

      particles.forEach(function (particle) {
        particle.x += particle.vx;

        particle.y += particle.vy;

        /*
         * Wrap around screen
         */

        if (particle.x < -10) {
          particle.x = width + 10;
        }

        if (particle.x > width + 10) {
          particle.x = -10;
        }

        if (particle.y < -10) {
          particle.y = height + 10;
        }

        if (particle.y > height + 10) {
          particle.y = -10;
        }

        ctx.beginPath();

        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

        ctx.fillStyle = accentColor;

        ctx.globalAlpha = 0.35;

        ctx.fill();
      });

      /*
       * Draw connections
       */

      ctx.globalAlpha = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];

          const b = particles[j];

          const dx = a.x - b.x;

          const dy = a.y - b.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONFIG.particleConnectionDistance) {
            const opacity =
              (1 - distance / CONFIG.particleConnectionDistance) * 0.12;

            ctx.beginPath();

            ctx.moveTo(a.x, a.y);

            ctx.lineTo(b.x, b.y);

            ctx.strokeStyle = accentColor;

            ctx.globalAlpha = opacity;

            ctx.lineWidth = 0.7;

            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;

      animationFrame = requestAnimationFrame(drawParticles);
    }

    resizeCanvas();

    drawParticles();

    let resizeTimeout = null;

    window.addEventListener("resize", function () {
      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(resizeCanvas, 200);
    });

    /*
     * Pause animation when the tab
     * is not visible.
     */

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);

          animationFrame = null;
        }
      } else {
        if (!animationFrame) {
          animationFrame = requestAnimationFrame(drawParticles);
        }
      }
    });
  }

  /* ========================================================
   * EXPOSE SMALL PUBLIC UTILITIES
   * ======================================================== */

  window.JohStack = {
    utils: {
      isValidEmail: isValidEmail,

      scrollTo: function (selector) {
        const element = document.querySelector(selector);

        if (!element) {
          return;
        }

        const navbar = document.getElementById("navbar");

        const navbarHeight = navbar ? navbar.offsetHeight : 0;

        const position =
          element.getBoundingClientRect().top + window.scrollY - navbarHeight;

        window.scrollTo({
          top: Math.max(position, 0),

          behavior: "smooth",
        });
      },
    },
  };
})();
