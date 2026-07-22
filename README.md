# Amazing Media Uganda — Official Website

Official website for **Amazing Media Uganda**, a Christian digital media and broadcasting platform dedicated to sharing the Gospel of Jesus Christ across Uganda, Africa, and beyond.

---

## 📁 Scalable Directory Architecture

```text
Amazing-Media-Website/
│
├── index.html              # Homepage (12 full sections)
├── about.html              # Mission, Vision, Motto, Faith, Leadership
├── videos.html             # Media library with category filters
├── livestream.html         # Live TV, broadcast schedule, fellowship
├── articles.html           # Devotionals, health, news & teaching
├── events.html             # Upcoming events & RSVP registration
├── gallery.html            # Photo & media gallery with lightbox
├── contact.html            # Contact info, prayer request form, map
├── donate.html             # Giving tiers, Mobile Money & bank transfers
├── 404.html                # Custom 404 error page with search
│
├── assets/
│   ├── css/
│   │   ├── variables.css   # Theme design tokens, colors & typography
│   │   ├── style.css       # Core reset & base layout styles
│   │   ├── components.css  # Cards, modals, slider, gallery, forms
│   │   └── responsive.css  # Mobile drawer & breakpoint rules
│   │
│   ├── js/
│   │   ├── main.js         # Core page initializations
│   │   ├── menu.js         # Mobile drawer menu navigation
│   │   ├── slider.js       # Hero banner slideshow component
│   │   ├── gallery.js      # Image gallery lightbox component
│   │   ├── video.js        # YouTube modal & filtering component
│   │   └── form.js         # Contact, RSVP, newsletter & donation validators
│   │
│   └── images/
│       ├── logo/           # Brand logos and vector assets
│       ├── banners/        # Hero slides and feature headers
│       ├── team/           # Ministry leadership photos
│       ├── events/         # Event posters and banners
│       ├── gallery/        # Gallery photos
│       ├── icons/          # SVG icons
│       └── backgrounds/    # Section backgrounds
│
├── data/
│   ├── events.json         # Events dataset
│   ├── videos.json         # Media library dataset
│   ├── articles.json       # Devotionals dataset
│   └── team.json           # Leadership dataset
│
├── sitemap.xml             # Search engine sitemap
├── robots.txt              # Web crawler instructions
└── README.md               # Project documentation
```

---

## 🎨 Features & Technologies

- **Frontend Core:** Pure HTML5, Vanilla CSS3 (Custom Properties / Variables), Modular JavaScript (ES6+).
- **Responsive & Modern Design:** Dark theme, glassmorphism card accents, gold & warm accent palettes.
- **Interactive Components:**
  - Hero slider with auto-play & swipe touch support
  - YouTube video modal player & category filtering
  - Full-screen image gallery lightbox with keyboard & arrow navigation
  - Form validation with feedback alerts for Contact, RSVP, Newsletter & Donations
  - Mobile drawer menu accordion navigation

---

## 🚀 Deployment

The site is fully static and ready to host on GitHub Pages, Vercel, Netlify, or traditional web servers.

```bash
git add .
git commit -m "Scalable Phase 1 site rebuild complete"
git push origin main
```
