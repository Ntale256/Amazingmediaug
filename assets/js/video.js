/* video.js — YouTube Video Modal & Category Filter for Amazing Media Uganda */

(function () {
  'use strict';

  function initVideoModal() {
    const videoCards = document.querySelectorAll('.video-thumbnail-wrapper');
    if (videoCards.length === 0) return;

    let videoModal = document.querySelector('.video-modal');
    if (!videoModal) {
      videoModal = document.createElement('div');
      videoModal.className = 'video-modal';
      videoModal.innerHTML = 
        <div class="video-modal-content">
          <button class="video-modal-close" aria-label="Close video player">&times;</button>
          <iframe class="video-modal-iframe" src="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>;
      document.body.appendChild(videoModal);
    }

    const iframe = videoModal.querySelector('.video-modal-iframe');
    const closeBtn = videoModal.querySelector('.video-modal-close');

    videoCards.forEach(card => {
      card.addEventListener('click', () => {
        const youtubeId = card.getAttribute('data-youtube-id');
        if (youtubeId) {
          iframe.src = https://www.youtube.com/embed/?autoplay=1;
          videoModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeVideo = () => { videoModal.classList.remove('active'); iframe.src = ''; document.body.style.overflow = ''; };
    closeBtn.addEventListener('click', closeVideo);
    videoModal.addEventListener('click', e => { if (e.target === videoModal) closeVideo(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && videoModal.classList.contains('active')) closeVideo(); });
  }

  function initVideoFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const videoCards = document.querySelectorAll('#mediaLibraryGrid .video-card');
    if (filterBtns.length === 0 || videoCards.length === 0) return;

    const filterCategory = value => {
      filterBtns.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-filter') === value));
      videoCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        card.style.display = (value === 'all' || cat === value) ? 'flex' : 'none';
      });
    };

    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    if (catParam) {
      let target = catParam.toLowerCase();
      if (target === 'sermons') target = 'sermon';
      if (target === 'bible-studies') target = 'bible-study';
      filterCategory(target);
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => filterCategory(btn.getAttribute('data-filter')));
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initVideoModal();
    initVideoFiltering();
  });
})();
