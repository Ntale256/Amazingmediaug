/* gallery.js — Photo Gallery Lightbox for Amazing Media Uganda */

(function () {
  'use strict';

  function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length === 0) return;

    let lightbox = document.querySelector('.lightbox-modal');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.className = 'lightbox-modal';
      lightbox.innerHTML = 
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
        </div>;
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
      const item = itemsArray[currentIndex];
      const img = item.querySelector('.gallery-image');
      const caption = item.querySelector('.gallery-caption');
      lightboxImg.src = img ? img.src : '';
      lightboxImg.alt = img ? img.alt : '';
      lightboxCaption.textContent = caption ? caption.textContent : '';
    }

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        showImage(index);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => { lightbox.classList.remove('active'); document.body.style.overflow = ''; };
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    prevBtn.addEventListener('click', e => { e.stopPropagation(); showImage(currentIndex - 1); });
    nextBtn.addEventListener('click', e => { e.stopPropagation(); showImage(currentIndex + 1); });
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
      if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });
  }

  document.addEventListener('DOMContentLoaded', initGallery);
})();
