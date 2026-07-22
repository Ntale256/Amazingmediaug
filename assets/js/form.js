/* form.js — Contact, RSVP, Newsletter & Donation Form Handlers for Amazing Media Uganda */

(function () {
  'use strict';

  // --- Shared alert helper ---
  function showAlert(container, message, type, insertBefore) {
    let box = container.querySelector('.form-alert');
    if (box) box.remove();
    box = document.createElement('div');
    box.className = orm-alert form-alert-;
    box.textContent = message;
    container.insertBefore(box, insertBefore || container.firstChild);
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (type === 'success') {
      setTimeout(() => { box.style.opacity = '0'; box.style.transition = 'opacity 0.3s'; setTimeout(() => box.remove(), 300); }, 5000);
    }
  }

  // --- Contact Form ---
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', e => {
      const name = form.querySelector('#name')?.value.trim();
      const email = form.querySelector('#email')?.value.trim();
      const message = form.querySelector('#message')?.value.trim();
      if (!name || !email || !message) { e.preventDefault(); showAlert(form, 'Please fill in all required fields.', 'error'); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { e.preventDefault(); showAlert(form, 'Please enter a valid email address.', 'error'); return; }
      const action = form.getAttribute('action');
      if (!action || action === '#') {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const orig = btn.innerHTML;
        btn.disabled = true; btn.innerHTML = 'Sending...';
        setTimeout(() => { showAlert(form, 'Thank you! Your message has been sent.', 'success'); form.reset(); btn.disabled = false; btn.innerHTML = orig; }, 1200);
      }
    });
  }

  // --- RSVP Form ---
  function initRSVPForm() {
    const form = document.getElementById('rsvpForm');
    const triggers = document.querySelectorAll('.rsvp-trigger');
    const eventSelect = document.getElementById('rsvpEvent');
    triggers.forEach(t => t.addEventListener('click', () => { if (eventSelect) eventSelect.value = t.getAttribute('data-event-name') || ''; }));
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.querySelector('#rsvpName')?.value.trim();
      const email = form.querySelector('#rsvpEmail')?.value.trim();
      const event = form.querySelector('#rsvpEvent')?.value;
      if (!name || !email || !event) { showAlert(form, 'Please fill in all required fields.', 'error'); return; }
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.disabled = true; btn.innerHTML = 'Submitting...';
      setTimeout(() => { showAlert(form, RSVP confirmed! Thank you, . We look forward to seeing you., 'success'); form.reset(); btn.disabled = false; btn.innerHTML = orig; }, 1200);
    });
  }

  // --- Newsletter Form ---
  function initNewsletterForm() {
    const forms = document.querySelectorAll('.newsletter-form');
    forms.forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (!input || !input.value.trim()) { showAlert(form, 'Please enter your email address.', 'error'); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) { showAlert(form, 'Please enter a valid email address.', 'error'); return; }
        const btn = form.querySelector('button[type="submit"]');
        const orig = btn.innerHTML;
        btn.disabled = true; btn.innerHTML = 'Subscribing...';
        setTimeout(() => { showAlert(form, 'Thank you for subscribing! God bless you.', 'success'); form.reset(); btn.disabled = false; btn.innerHTML = orig; }, 1000);
      });
    });
  }

  // --- Donation Form ---
  function initDonateForm() {
    const form = document.getElementById('donateForm');
    if (!form) return;

    // Preset tier buttons
    const tierBtns = document.querySelectorAll('.donate-tier .btn');
    const amountInput = document.getElementById('donateAmount');
    tierBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const amount = btn.closest('.donate-tier')?.querySelector('.amount')?.textContent?.replace(/[^0-9]/g, '');
        if (amountInput && amount) amountInput.value = amount;
        form.scrollIntoView({ behavior: 'smooth' });
      });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.querySelector('#donateName')?.value.trim();
      const email = form.querySelector('#donateEmail')?.value.trim();
      const amount = form.querySelector('#donateAmount')?.value.trim();
      if (!name || !email || !amount) { showAlert(form, 'Please fill in all required fields.', 'error'); return; }
      if (isNaN(amount) || Number(amount) <= 0) { showAlert(form, 'Please enter a valid donation amount.', 'error'); return; }
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.disabled = true; btn.innerHTML = 'Processing...';
      setTimeout(() => {
        showAlert(form, Thank you, ! Your gift of UGX  is a blessing. God bless you., 'success');
        form.reset(); btn.disabled = false; btn.innerHTML = orig;
      }, 1400);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    initRSVPForm();
    initNewsletterForm();
    initDonateForm();
  });
})();
