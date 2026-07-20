# Amazing Media Uganda - Website v1.0

A premium, responsive Christian media website built to spread the Gospel of Jesus Christ across Uganda and East Africa. 

This website features clean design aesthetics, dynamic media players, a photo gallery, event listings with interactive RSVP registration, and direct contact options.

## Features

- **Responsive Design**: Mobile-friendly layout designed custom for phones, tablets, and desktops.
- **Interactive Video Modal**: Plays YouTube sermon and worship videos in a high-performance modal lightbox rather than overloading page load.
- **Photo Gallery Lightbox**: Simple vanilla JS modal lightbox to browse photos of church events.
- **Weekly Livestream Integration**: Details and schedule for weekly online services.
- **Event Scheduling & RSVP**: Custom list of upcoming gatherings with an interactive form that scrolls and selects events.
- **Contact Forms**: Ready to connect with services like Formspree.

## File Structure

```
Amazing Media Website/
│
├── index.html          # Homepage
├── about.html          # Mission, statement of faith, leadership
├── videos.html         # Media grid with category filters
├── livestream.html     # Live broadcasts and online fellowship links
├── events.html         # Upcoming events and registration form
├── contact.html        # Contacts panel, office hours, live map
│
├── css/
│   ├── variables.css   # Color palette and theme variables
│   ├── style.css       # Core typography, sections, components
│   └── responsive.css  # Mobile layout media queries
│
├── js/
│   ├── menu.js         # Mobile drawer menu navigation triggers
│   └── main.js         # Media lightbox, gallery lightbox, RSVP triggers, and form validators
│
└── images/             # Generated website assets and photography
```

## Setup & Running Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/Ntale256/Amazingmediaug.git
   ```
2. Open `index.html` directly in any web browser, or serve it using a local static file server.
