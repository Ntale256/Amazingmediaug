/* Main interactive scripts for Amazing Media Uganda v1.0 */

document.addEventListener('DOMContentLoaded', () => {
  setupImageLightbox();
  setupVideoLightbox();
  setupContactForm();
  setupVideoFiltering();
  setupRSVPForm();
  highlightActiveNavLink();
});

/**
 * Image Lightbox Gallery Interaction
 */
function setupImageLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length === 0) return;
  
  // Create lightbox modal elements dynamically if not already in HTML,
  // but to keep it simple we will look for existing HTML or create it.
  let lightbox = document.querySelector('.lightbox-modal');
  
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox-modal';
    lightbox.innerHTML = `
      <div class="lightbox-content-wrapper">
        <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
        <button class="lightbox-nav lightbox-prev" aria-label="Previous image">
          <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>
        <button class="lightbox-nav lightbox-next" aria-label="Next image">
          <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </button>
        <img class="lightbox-img" src="" alt="">
        <div class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(lightbox);
  }

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  
  let currentIndex = 0;
  const itemsArray = Array.from(galleryItems);

  function showImage(index) {
    if (index < 0) index = itemsArray.length - 1;
    if (index >= itemsArray.length) index = 0;
    
    currentIndex = index;
    const currentItem = itemsArray[currentIndex];
    const img = currentItem.querySelector('.gallery-image');
    const captionText = currentItem.querySelector('.gallery-caption')?.textContent || '';
    
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || 'Gallery image';
    lightboxCaption.textContent = captionText;
  }

  // Open lightbox
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      showImage(index);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Stop background scrolling
    });
  });

  // Close lightbox
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
      closeLightbox();
    }
  });

  // Navigations
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentIndex - 1);
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentIndex + 1);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });
}

/**
 * YouTube Video Lightbox Interaction
 */
function setupVideoLightbox() {
  const videoCards = document.querySelectorAll('.video-thumbnail-wrapper');
  if (videoCards.length === 0) return;

  let videoModal = document.querySelector('.video-modal');

  if (!videoModal) {
    videoModal = document.createElement('div');
    videoModal.className = 'video-modal';
    videoModal.innerHTML = `
      <div class="video-modal-content">
        <button class="video-modal-close" aria-label="Close video player">&times;</button>
        <iframe class="video-modal-iframe" src="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    `;
    document.body.appendChild(videoModal);
  }

  const iframe = videoModal.querySelector('.video-modal-iframe');
  const closeBtn = videoModal.querySelector('.video-modal-close');

  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      const youtubeId = card.getAttribute('data-youtube-id');
      if (youtubeId) {
        iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeVideo = () => {
    videoModal.classList.remove('active');
    iframe.src = ''; // Stops playback
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeVideo);
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      closeVideo();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!videoModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeVideo();
  });
}

/**
 * Contact Form Client-side Validation and UI Alerts
 */
function setupContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    // If Formspree action is set, we will let it submit after validation.
    // If there is no action endpoint yet, we simulate the submission beautifully.
    const action = contactForm.getAttribute('action');
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      e.preventDefault();
      showFormAlert('Please fill in all required fields.', 'error');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      e.preventDefault();
      showFormAlert('Please enter a valid email address.', 'error');
      return;
    }

    // If using simulated mode (placeholder action)
    if (!action || action === '#' || action.includes('formspree.io/your-id')) {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      // Simulate network request
      setTimeout(() => {
        showFormAlert('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1200);
    }
  });

  function showFormAlert(message, type) {
    // Check if alert already exists
    let alertBox = document.querySelector('.form-alert');
    if (alertBox) alertBox.remove();

    alertBox = document.createElement('div');
    alertBox.className = `form-alert form-alert-${type}`;
    alertBox.textContent = message;
    
    // Style injection dynamically for the alert box
    alertBox.style.padding = '14px 20px';
    alertBox.style.borderRadius = '8px';
    alertBox.style.marginBottom = '20px';
    alertBox.style.fontSize = '0.95rem';
    alertBox.style.fontWeight = '500';
    alertBox.style.transition = 'all 0.3s ease';
    
    if (type === 'success') {
      alertBox.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
      alertBox.style.color = '#34d399';
      alertBox.style.border = '1px solid rgba(16, 185, 129, 0.2)';
    } else {
      alertBox.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
      alertBox.style.color = '#f87171';
      alertBox.style.border = '1px solid rgba(239, 68, 68, 0.2)';
    }

    contactForm.insertBefore(alertBox, contactForm.firstChild);
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Auto remove success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        alertBox.style.opacity = '0';
        setTimeout(() => alertBox.remove(), 300);
      }, 5000);
    }
  }
}

/**
 * Detect current page file and set active nav class
 */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname;
  const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
  
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === pageName || (pageName === 'index.html' && href === './') || (href === 'index.html' && pageName === '')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Filter videos in media grid by category and URL query params
 */
function setupVideoFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const videoCards = document.querySelectorAll('#mediaLibraryGrid .video-card');
  if (filterBtns.length === 0 || videoCards.length === 0) return;

  const filterCategory = (filterValue) => {
    filterBtns.forEach(btn => {
      if (btn.getAttribute('data-filter') === filterValue) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    videoCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filterValue === 'all' || category === filterValue) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  };

  // Check URL search parameters (e.g., ?cat=sermon or ?cat=sermons)
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('cat');
  if (catParam) {
    let targetFilter = catParam.toLowerCase();
    if (targetFilter === 'sermons') targetFilter = 'sermon';
    if (targetFilter === 'bible-studies') targetFilter = 'sermon';
    filterCategory(targetFilter);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');
      filterCategory(filterValue);
    });
  });
}

/**
 * Event Registration (RSVP) Auto-selection & Submission simulation
 */
function setupRSVPForm() {
  const rsvpForm = document.getElementById('rsvpForm');
  const triggers = document.querySelectorAll('.rsvp-trigger');
  
  if (triggers.length > 0 && rsvpForm) {
    const eventSelect = document.getElementById('rsvpEvent');
    
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const eventName = trigger.getAttribute('data-event-name');
        if (eventName && eventSelect) {
          eventSelect.value = eventName;
        }
      });
    });
  }

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('rsvpName').value.trim();
      const email = document.getElementById('rsvpEmail').value.trim();
      const eventVal = document.getElementById('rsvpEvent').value;
      
      if (!name || !email || !eventVal) {
        showRSVPAlert('Please fill in all required fields.', 'error');
        return;
      }

      const submitBtn = rsvpForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Submitting...';

      setTimeout(() => {
        showRSVPAlert(`RSVP Confirmed! Thank you, ${name}. We look forward to seeing you at the "${eventVal}"!`, 'success');
        rsvpForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1200);
    });
  }

  function showRSVPAlert(message, type) {
    let alertBox = document.querySelector('.rsvp-alert');
    if (alertBox) alertBox.remove();

    alertBox = document.createElement('div');
    alertBox.className = `rsvp-alert rsvp-alert-${type}`;
    alertBox.textContent = message;
    
    alertBox.style.padding = '14px 20px';
    alertBox.style.borderRadius = '8px';
    alertBox.style.marginBottom = '20px';
    alertBox.style.fontSize = '0.95rem';
    alertBox.style.fontWeight = '500';
    
    if (type === 'success') {
      alertBox.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
      alertBox.style.color = '#34d399';
      alertBox.style.border = '1px solid rgba(16, 185, 129, 0.2)';
    } else {
      alertBox.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
      alertBox.style.color = '#f87171';
      alertBox.style.border = '1px solid rgba(239, 68, 68, 0.2)';
    }

    rsvpForm.insertBefore(alertBox, rsvpForm.firstChild);
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    if (type === 'success') {
      setTimeout(() => {
        alertBox.style.opacity = '0';
        alertBox.style.transition = 'opacity 0.3s ease';
        setTimeout(() => alertBox.remove(), 300);
      }, 6000);
    }
  }
}
