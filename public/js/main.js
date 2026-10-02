/* =========================================================
   JOH'S STACK
   Main JavaScript
   Christian Johanes
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =======================================================
     ELEMENTS
     ======================================================= */

  const body = document.body;

  const navbar = document.getElementById("navbar");

  const navLinks = document.getElementById("navLinks");

  const navToggle = document.getElementById("navToggle");

  const navIcon = document.getElementById("navIcon");

  const navOverlay = document.getElementById("navOverlay");

  const themeToggle = document.getElementById("themeToggle");

  const themeIcon = document.getElementById("themeIcon");

  const progressBar = document.getElementById("progressBar");

  const scrollTop = document.getElementById("scrollTop");

  const contactForm = document.getElementById("contactForm");

  const notionFrame = document.getElementById("notionFrame");

  const notionLoading = document.getElementById("notionLoading");

  const particleCanvas = document.getElementById("particleCanvas");

  /* =======================================================
     PAGE LOADER
     ======================================================= */

  const hidePageLoader = () => {
    const loader = document.getElementById("pageLoader");

    if (!loader) {
      return;
    }

    setTimeout(() => {
      loader.classList.add("fade-out");
    }, 350);
  };

  if (document.readyState === "complete") {
    hidePageLoader();
  } else {
    window.addEventListener("load", hidePageLoader, { once: true });
  }

  /* =======================================================
     NAVBAR SCROLL EFFECT
     ======================================================= */

  const updateNavbar = () => {
    if (!navbar) {
      return;
    }

    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  updateNavbar();

  window.addEventListener("scroll", updateNavbar, { passive: true });

  /* =======================================================
     SCROLL PROGRESS
     ======================================================= */

  const updateScrollProgress = () => {
    if (!progressBar) {
      return;
    }

    const scrollTopValue = window.scrollY || document.documentElement.scrollTop;

    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    if (scrollHeight <= 0) {
      progressBar.style.width = "0%";

      return;
    }

    const percentage = (scrollTopValue / scrollHeight) * 100;

    progressBar.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
  };

  updateScrollProgress();

  window.addEventListener("scroll", updateScrollProgress, { passive: true });

  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  const closeNavigation = () => {
    if (!navLinks) {
      return;
    }

    navLinks.classList.remove("open");

    if (navOverlay) {
      navOverlay.classList.remove("active");
    }

    body.classList.remove("nav-open");

    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
    }

    if (navIcon) {
      navIcon.className = "fas fa-bars";
    }
  };

  const openNavigation = () => {
    if (!navLinks) {
      return;
    }

    navLinks.classList.add("open");

    if (navOverlay) {
      navOverlay.classList.add("active");
    }

    body.classList.add("nav-open");

    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "true");
    }

    if (navIcon) {
      navIcon.className = "fas fa-times";
    }
  };

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks?.classList.contains("open");

      if (isOpen) {
        closeNavigation();
      } else {
        openNavigation();
      }
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener("click", closeNavigation);
  }

  if (navLinks) {
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNavigation);
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks?.classList.contains("open")) {
      closeNavigation();
    }
  });

  /* =======================================================
     THEME
     ======================================================= */

  const THEME_KEY = "joh-stack-theme";

  const getPreferredTheme = () => {
    const saved = localStorage.getItem(THEME_KEY);

    if (saved === "dark" || saved === "light") {
      return saved;
    }

    return "dark";
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);

    if (themeIcon) {
      themeIcon.className = theme === "dark" ? "fas fa-moon" : "fas fa-sun";
    }
  };

  let currentTheme = getPreferredTheme();

  applyTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      currentTheme = currentTheme === "dark" ? "light" : "dark";

      localStorage.setItem(THEME_KEY, currentTheme);

      applyTheme(currentTheme);
    });
  }

  /* =======================================================
     TYPING EFFECT
     ======================================================= */

  const typingElement = document.getElementById("typingText");

  const typingWords = [
    "Web Solutions",

    "Business Systems",

    "Modern Interfaces",

    "Useful Experiences",
  ];

  if (typingElement) {
    let wordIndex = 0;

    let characterIndex = 0;

    let deleting = false;

    const type = () => {
      const currentWord = typingWords[wordIndex];

      if (deleting) {
        characterIndex--;
      } else {
        characterIndex++;
      }

      typingElement.textContent = currentWord.substring(0, characterIndex);

      let speed = deleting ? 55 : 95;

      if (!deleting && characterIndex === currentWord.length) {
        speed = 1800;

        deleting = true;
      }

      if (deleting && characterIndex === 0) {
        deleting = false;

        wordIndex = (wordIndex + 1) % typingWords.length;

        speed = 450;
      }

      window.setTimeout(type, speed);
    };

    type();
  }

  /* =======================================================
     REVEAL ON SCROLL
     ======================================================= */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("active");
    });
  }

  /* =======================================================
     COUNTERS
     ======================================================= */

  const counters = document.querySelectorAll(".counter");

  const animateCounter = (element) => {
    const target = Number(element.dataset.target || 0);

    if (!Number.isFinite(target)) {
      return;
    }

    const duration = 900;

    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);

      element.textContent = String(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = String(target);
      }
    };

    requestAnimationFrame(update);
  };

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.6,
      },
    );

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  } else {
    counters.forEach(animateCounter);
  }

  /* =======================================================
     ACTIVE NAVIGATION
     ======================================================= */

  const navigationLinks = Array.from(document.querySelectorAll(".nav-links a"));

  const navigationSections = navigationLinks
    .map((link) => {
      const selector = link.getAttribute("href");

      if (!selector || !selector.startsWith("#")) {
        return null;
      }

      const section = document.querySelector(selector);

      if (!section) {
        return null;
      }

      return {
        link,
        section,
      };
    })
    .filter(Boolean);

  const updateActiveNavigation = () => {
    const scrollPosition = window.scrollY + 130;

    let currentSection = navigationSections[0];

    navigationSections.forEach((item) => {
      if (item.section.offsetTop <= scrollPosition) {
        currentSection = item;
      }
    });

    navigationLinks.forEach((link) => {
      link.classList.remove("active");
    });

    if (currentSection) {
      currentSection.link.classList.add("active");
    }
  };

  updateActiveNavigation();

  window.addEventListener("scroll", updateActiveNavigation, { passive: true });

  /* =======================================================
     SMOOTH ANCHOR SCROLLING
     ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const navbarHeight = navbar ? navbar.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - navbarHeight + 5;

      window.scrollTo({
        top: Math.max(0, targetPosition),

        behavior: "smooth",
      });
    });
  });

  /* =======================================================
     SCROLL TO TOP
     ======================================================= */

  const updateScrollTop = () => {
    if (!scrollTop) {
      return;
    }

    if (window.scrollY > 500) {
      scrollTop.classList.add("show");
    } else {
      scrollTop.classList.remove("show");
    }
  };

  updateScrollTop();

  window.addEventListener("scroll", updateScrollTop, { passive: true });

  if (scrollTop) {
    scrollTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,

        behavior: "smooth",
      });
    });
  }

  /* =======================================================
     NOTION IFRAME
     ======================================================= */

  if (notionFrame && notionLoading) {
    const markNotionLoaded = () => {
      notionLoading.classList.add("loaded");
    };

    notionFrame.addEventListener("load", markNotionLoaded);

    /*
     * Fallback:
     * If Notion takes too long or the
     * browser does not expose the iframe
     * load event normally, remove the
     * loading layer after a few seconds.
     */

    window.setTimeout(markNotionLoaded, 5000);
  }

  /* =======================================================
     CONTACT FORM → WHATSAPP
     ======================================================= */

  const sanitizeText = (value) => {
    return String(value || "")
      .trim()
      .replace(/\s+/g, " ");
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const showNotification = (message, type = "success") => {
    const existing = document.querySelector(".site-notification");

    if (existing) {
      existing.remove();
    }

    const notification = document.createElement("div");

    notification.className = `site-notification ${type}`;

    notification.innerHTML = `

      <div class="notification-icon">

        <i class="${
          type === "success"
            ? "fas fa-check-circle"
            : "fas fa-exclamation-circle"
        }"></i>

      </div>

      <span>
        ${message}
      </span>

    `;

    const notificationStyle = document.createElement("style");

    notificationStyle.textContent = `

      .site-notification {

        position: fixed;

        right: 20px;

        bottom: 85px;

        z-index: 99999;

        display: flex;

        align-items: center;

        gap: 10px;

        max-width: 360px;

        padding: 14px 17px;

        border-radius: 12px;

        border: 1px solid var(--border-color);

        background: var(--bg-card);

        color: var(--text-primary);

        box-shadow: var(--shadow-md);

        font-size: 0.82rem;

        animation:
          notificationIn
          0.3s ease both;

      }


      .site-notification.success
      .notification-icon {

        color: #22c55e;

      }


      .site-notification.error
      .notification-icon {

        color: #ef4444;

      }


      @keyframes notificationIn {

        from {

          opacity: 0;

          transform:
            translateY(10px)
            translateX(10px);

        }

        to {

          opacity: 1;

          transform:
            translateY(0)
            translateX(0);

        }

      }

    `;

    document.head.appendChild(notificationStyle);

    document.body.appendChild(notification);

    window.setTimeout(() => {
      notification.style.opacity = "0";

      notification.style.transform = "translateY(10px)";

      notification.style.transition = "all 0.3s ease";

      window.setTimeout(() => {
        notification.remove();
      }, 300);
    }, 4000);
  };

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = sanitizeText(document.getElementById("name")?.value);

      const email = sanitizeText(document.getElementById("email")?.value);

      const subject = sanitizeText(document.getElementById("subject")?.value);

      const message = sanitizeText(document.getElementById("message")?.value);

      if (name.length < 2) {
        showNotification("Please enter your name.", "error");

        return;
      }

      if (!validateEmail(email)) {
        showNotification("Please enter a valid email address.", "error");

        return;
      }

      if (message.length < 10) {
        showNotification("Please enter a longer message.", "error");

        return;
      }

      const whatsappMessage =
        `Halo Christian,%0A%0A` +
        `Nama: ${name}%0A` +
        `Email: ${email}%0A` +
        `Subject: ${subject || "Project / Opportunity"}%0A%0A` +
        `Message:%0A${message}`;

      const whatsappUrl = `https://wa.me/6282111915723?text=${whatsappMessage}`;

      showNotification("Opening WhatsApp...", "success");

      window.setTimeout(() => {
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      }, 500);
    });
  }

  /* =======================================================
     REAL-TIME FORM VALIDATION
     ======================================================= */

  const formInputs = document.querySelectorAll(
    "#contactForm input, #contactForm textarea",
  );

  const removeFeedback = (field) => {
    const feedback = field.parentElement?.querySelector(
      ".form-error, .form-success",
    );

    if (feedback) {
      feedback.remove();
    }
  };

  const validateField = (field) => {
    if (!field) {
      return true;
    }

    const value = sanitizeText(field.value);

    field.classList.remove("is-valid", "is-invalid");

    removeFeedback(field);

    if (!value) {
      return !field.required;
    }

    let valid = true;

    let errorMessage = "";

    if (field.name === "name" && value.length < 2) {
      valid = false;

      errorMessage = "Name must be at least 2 characters.";
    }

    if (field.name === "email" && !validateEmail(value)) {
      valid = false;

      errorMessage = "Please enter a valid email address.";
    }

    if (field.name === "message" && value.length < 10) {
      valid = false;

      errorMessage = "Message must be at least 10 characters.";
    }

    if (valid) {
      field.classList.add("is-valid");

      if (field.required) {
        const success = document.createElement("span");

        success.className = "form-success";

        success.innerHTML = '<i class="fas fa-check-circle"></i> Looks good!';

        field.parentElement.appendChild(success);
      }
    } else {
      field.classList.add("is-invalid");

      const error = document.createElement("span");

      error.className = "form-error";

      error.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${errorMessage}`;

      field.parentElement.appendChild(error);
    }

    return valid;
  };

  formInputs.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));

    field.addEventListener("input", () => {
      if (field.classList.contains("is-invalid")) {
        validateField(field);
      }
    });
  });

  /* =======================================================
     BUTTON MICRO INTERACTION
     ======================================================= */

  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("mousedown", () => {
      button.style.transform = "translateY(0) scale(0.98)";
    });

    button.addEventListener("mouseup", () => {
      button.style.transform = "";
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });

  /* =======================================================
     LAZY IMAGE FALLBACK
     ======================================================= */

  document.querySelectorAll("img[loading='lazy']").forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("image-error");
    });
  });

  /* =======================================================
     PARTICLE CANVAS
     ======================================================= */

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (particleCanvas && !reducedMotion) {
    const ctx = particleCanvas.getContext("2d");

    if (ctx) {
      let particles = [];

      let animationFrame;

      const resizeCanvas = () => {
        const rect = particleCanvas.parentElement?.getBoundingClientRect();

        if (!rect) {
          return;
        }

        const ratio = Math.min(window.devicePixelRatio || 1, 2);

        particleCanvas.width = rect.width * ratio;

        particleCanvas.height = rect.height * ratio;

        particleCanvas.style.width = `${rect.width}px`;

        particleCanvas.style.height = `${rect.height}px`;

        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

        createParticles(rect.width, rect.height);
      };

      const createParticles = (width, height) => {
        const density = window.innerWidth < 700 ? 22 : 45;

        particles = Array.from(
          {
            length: density,
          },
          () => ({
            x: Math.random() * width,

            y: Math.random() * height,

            radius: Math.random() * 1.4 + 0.4,

            speed: Math.random() * 0.18 + 0.04,

            alpha: Math.random() * 0.28 + 0.05,
          }),
        );
      };

      const drawParticles = () => {
        const rect = particleCanvas.parentElement?.getBoundingClientRect();

        if (!rect) {
          return;
        }

        ctx.clearRect(0, 0, rect.width, rect.height);

        particles.forEach((particle) => {
          particle.y -= particle.speed;

          if (particle.y < -10) {
            particle.y = rect.height + 10;

            particle.x = Math.random() * rect.width;
          }

          ctx.beginPath();

          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);

          ctx.fillStyle = `rgba(245, 158, 11, ${particle.alpha})`;

          ctx.fill();
        });

        animationFrame = requestAnimationFrame(drawParticles);
      };

      resizeCanvas();

      drawParticles();

      window.addEventListener("resize", resizeCanvas);

      window.addEventListener("beforeunload", () => {
        cancelAnimationFrame(animationFrame);
      });
    }
  }

  /* =======================================================
     GLOBAL UTILITY
     ======================================================= */

  window.JohStack = {
    version: "2.0.0",

    utils: {
      scrollTo: (selector) => {
        const target = document.querySelector(selector);

        if (!target) {
          return;
        }

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      },

      showNotification,
    },
  };
});
