# 🚀 Joh's Stack - Crafting Code, Bringing Ideas to Life

Professional portfolio & landing page for freelance web development services. Built with modern dark/light theme, interactive features, and comprehensive sections.

**🌐 Live Demo**: [https://chrisjohanes.github.io/joh-stack/](https://chrisjohanes.github.io/joh-stack/)

## ✨ Features

### 🎨 Modern Design
- **Dark/Light Theme Toggle** — Switch between themes with localStorage persistence
- **Fully Responsive** — Mobile-friendly with smooth hamburger navigation
- **Interactive Animations** — Particle background, typing effect, scroll reveals, skill bars
- **Custom CSS** — No framework dependency, lightweight and fast
- **Google Fonts** — Inter typeface for modern typography
- **Font Awesome** — Icon integration throughout
- **Animated Gradient Borders** — Hover effects on cards

### 🛠️ Tech Stack Showcase
- **JavaScript** — React, Vue.js, Vanilla JS, Node.js
- **Backend** — Laravel, PHP, MySQL, REST API
- **Front-End** — HTML5, CSS3, Bootstrap, Tailwind
- **Tools** — Git, VS Code

### 📱 Sections Included
1. **Hero** — Typing animation with particle background & live stats
2. **Services** — 4 service cards with tech tags
3. **Portfolio** — Project showcases with hover overlays & GitHub links
4. **Tech Stack** — Interactive technology badges
5. **About Me** — Profile photo, bio, animated skill bars (JS 85%, Laravel 80%, React 75%, CSS 90%)
6. **Testimonials** — Client reviews carousel with auto-play
7. **Achievements** — Certifications & milestones showcase
8. **Pricing** — 3-tier pricing plans (Starter, Professional, Premium)
9. **Blog Preview** — Latest articles & tutorials
10. **Service Configurator** — Interactive 3-step quote calculator
11. **CTA** — Call-to-action for project discussions
12. **Contact** — Form with real-time validation & WhatsApp integration
13. **Newsletter** — Email subscription section
14. **Footer** — Social links, quick navigation, contact info

### ⚡ Advanced Features
- **Page Loader** — Smooth loading animation
- **Scroll Progress Bar** — Visual indicator at top
- **Service Configurator** — Multi-step quote calculator (Service → Features → Timeline → WhatsApp)
- **Real-time Form Validation** — Instant green/red feedback on contact form
- **WhatsApp Float Button** — Direct chat integration with pre-filled message
- **SEO Optimized** — Meta tags, Open Graph, Twitter Cards, Schema.org JSON-LD
- **Accessibility** — Skip-to-content link, ARIA labels, keyboard navigation
- **Performance** — Font preload, lazy loading images, optimized animations

## 📦 Usage

### Option 1: Open Directly
Just double-click `index.html` — no server required.

### Option 2: Run with Node.js Server
```bash
npm install
npm start
```
Then open `http://localhost:3000`

## 📁 Project Structure

```
joh-creatives/
├── index.html                # Main portfolio landing page (all-in-one)
├── contact.html              # Contact page (legacy)
├── services.html             # Services page (legacy)
├── portofolio.html           # Portfolio page (legacy)
├── style.css                 # Custom CSS styles (legacy)
├── server.js                 # Express server
├── package.json              # Dependencies
├── .gitignore                # Git ignore rules
├── README.md                 # This file
├── Joh's Stack.jpg           # Favicon
├── foto_profil/
│   └── Christian Johanes.jpg # Profile photo
└── public/
    ├── images/
    │   └── project1.jpg
    └── js/
        ├── main.js
        └── portofolio.js
```

## 🎯 Key Sections Breakdown

### Hero Section
- **Typing Animation** — Cycles through: "Crafting Code", "Bringing Ideas to Life", "Innovating Digital Experiences", "Building Modern Web Apps"
- **Particle Background** — Interactive animated particles with connections
- **Availability Badge** — "Available for Freelance Projects"
- **CTA Buttons** — "Diskusikan Proyek" and "Lihat Portofolio"
- **Live Stats** — Projects (10+), Clients (8+), Experience (1+ year)

### Services Section
- **JavaScript Development** — React, Vue.js, Vanilla JS, Node.js
- **Laravel / PHP Development** — Laravel, PHP, MySQL, REST API
- **Static Website & Front-End** — HTML5, CSS3, Bootstrap, Tailwind
- **Custom Front-End Solutions** — UI kits, dashboards, responsive design

### Portfolio Section
- **Helpdesk Ticketing System** — Laravel 12 + PHP 8.2 (GitHub link)
- **Task Manager** — Laravel 12 + Bootstrap 5 (GitHub link)

### About Me Section
- Profile photo with floating experience badge
- Core values: Open Communication, Unlimited Revisions, On-Time Delivery, Collaboration
- **Animated Skill Bars**:
  - JavaScript: 85%
  - Laravel: 80%
  - React: 75%
  - CSS/Tailwind: 90%

### Testimonials Section
- 3 client reviews with carousel navigation
- Auto-play every 6 seconds
- Star ratings & author info

### Achievements Section
- Laravel Certified
- JavaScript Mastery
- 10+ Projects Delivered
- 5-Star Client Rating
- Open Source Contributor
- Continuous Learner

### Pricing Section
- **Starter** — Rp 500K (Static website, 3 pages, 2 revisions)
- **Professional** — Rp 1.5JT (Dynamic web app, CMS, 5 revisions) ⭐ Popular
- **Premium** — Rp 3JT (Full-stack, e-commerce, unlimited revisions, 30-day support)

### Service Configurator
**3-Step Quote Calculator:**
1. **Service Type** — Static Website (Rp 500K), Dynamic Web App (Rp 1.5M), E-Commerce (Rp 3M)
2. **Features** — Responsive Design, Admin Dashboard, SEO Optimization, WhatsApp Integration
3. **Timeline** — Urgent (1.5x), Normal (1x), Flexible (0.9x)
4. **Result** — Sends configured project details to WhatsApp

### Contact Section
- Contact info: email, WhatsApp, location, response time
- **Real-time Validation** — Green/red borders with inline error/success messages
- Form fields: name, email, subject, message
- Submission sends via WhatsApp integration

### Newsletter Section
- Email subscription form
- Gradient background with pattern overlay

## 🎨 Customization

### Colors & Themes
Edit CSS variables in `index.html`:
```css
:root {
  /* Dark Mode (Default) */
  --bg-primary: #0a0a0f;
  --accent-primary: #f59e0b;
  --accent-gradient: linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ef4444 100%);
}

/* Light mode is automatically applied via [data-theme="light"] */
```

### Content
- Update text content directly in `index.html`
- Replace profile photo in `foto_profil/` directory
- Modify portfolio project images and descriptions
- Adjust stats counter values via `data-target` attributes
- Update skill bar percentages in `.skill-progress` data-width attributes

### Typing Animation
Edit the taglines in the JavaScript section:
```javascript
const typingTexts = [
  'Crafting Code',
  'Bringing Ideas to Life',
  'Innovating Digital Experiences',
  'Building Modern Web Apps'
];
```

### Contact Form
The form currently validates in real-time and shows toast notifications. To integrate real email:
1. Use services like EmailJS, Formspree, or Netlify Forms
2. Or connect to `/api/contact` endpoint in `server.js`

## 🌐 API Endpoints (if using server)

- `POST /api/contact` — Submit contact form
- `GET /api/health` — Health check

## 📱 Responsive Breakpoints

- Mobile: < 480px
- Mobile+: < 768px
- Tablet: 768px - 1024px
- Desktop: ≥ 1024px

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## ✅ Implemented Features

- ✅ Particle background animation
- ✅ Dark/Light theme toggle with localStorage
- ✅ Typing animation for hero tagline
- ✅ Animated skill progress bars
- ✅ Client testimonials carousel
- ✅ Achievements showcase
- ✅ Blog preview section
- ✅ Service configurator/quote calculator
- ✅ Newsletter subscription
- ✅ Page load progress indicator
- ✅ Real-time form validation
- ✅ SEO meta tags, OG tags, Schema markup
- ✅ Accessibility improvements (ARIA, skip link)
- ✅ Performance optimization (preload, lazy loading)
- ✅ WhatsApp float button with pre-filled message

## 📞 Contact

- **Email**: chrisjohanes21@gmail.com
- **WhatsApp**: +62 821 1191 5723
- **Location**: Jakarta, Indonesia
- **GitHub**: [github.com/Chrisjohanes](https://github.com/Chrisjohanes)
- **LinkedIn**: [linkedin.com/in/christianjohanes](https://linkedin.com/in/christianjohanes)
- **Instagram**: [@johstack](https://instagram.com/johstack)

---

**Built with ❤️ by Christian Johanes — Joh's Stack**

*Crafting Code, Bringing Ideas to Life*
