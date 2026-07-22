/* Responsive menu navigation for Amazing Media Uganda v1.0 */

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    // Toggle Mobile Menu
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      
      // Accessibility attributes
      const isExpanded = menuToggle.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Handle Dropdowns on Mobile / Touch
    const dropdowns = navLinks.querySelectorAll('.nav-item-dropdown');
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      if (toggle) {
        toggle.addEventListener('click', (e) => {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.toggle('open');
          }
        });
      }
    });

    // Close Menu when clicking a nav link (excluding dropdown toggles on mobile)
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.classList.contains('dropdown-toggle') && window.innerWidth <= 768) {
          return; // Let dropdown toggle handle opening submenu
        }
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close Menu when clicking outside of navbar
    document.addEventListener('click', (event) => {
      const isClickInsideMenu = navLinks.contains(event.target);
      const isClickInsideToggle = menuToggle.contains(event.target);

      if (!isClickInsideMenu && !isClickInsideToggle && navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Keyboard ESC key closes mobile menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
      }
    });
  }
});
