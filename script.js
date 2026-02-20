/* ======= Intersection Observer - fade in sections ======= */
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);
sections.forEach((s) => observer.observe(s));

/* ======= Lightbox with Zoom ======= */
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-img');
const lightboxScroll = lightbox.querySelector('.lightbox-scroll');
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');
let currentZoom = 1;
const ZOOM_STEP = 0.3;
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 5;

function setZoom(level) {
  currentZoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, level));
  lightboxImg.style.transform = `scale(${currentZoom})`;
  if (currentZoom > 1) {
    lightboxImg.classList.add('zoomed');
  } else {
    lightboxImg.classList.remove('zoomed');
  }
}

document.querySelectorAll(
  '.finding-card img, .persona-card img, .gallery-item img, .full-width-figure img, .image-row img'
).forEach((img) => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    currentZoom = 1;
    lightboxImg.style.transform = 'scale(1)';
    lightboxImg.classList.remove('zoomed');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
  setTimeout(() => { lightboxImg.src = ''; }, 300);
  document.body.style.overflow = '';
  currentZoom = 1;
}

// Close on backdrop or close button click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target === lightboxScroll || e.target.classList.contains('lightbox-close')) {
    closeLightbox();
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// Zoom buttons
zoomInBtn.addEventListener('click', (e) => { e.stopPropagation(); setZoom(currentZoom + ZOOM_STEP); });
zoomOutBtn.addEventListener('click', (e) => { e.stopPropagation(); setZoom(currentZoom - ZOOM_STEP); });

// Mouse wheel zoom
lightbox.addEventListener('wheel', (e) => {
  if (!lightbox.classList.contains('active')) return;
  e.preventDefault();
  const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
  setZoom(currentZoom + delta);
}, { passive: false });

// Double-click to toggle zoom
lightboxImg.addEventListener('dblclick', (e) => {
  e.stopPropagation();
  if (currentZoom > 1) {
    setZoom(1);
  } else {
    setZoom(2.5);
  }
});

/* ======= Smooth anchor scroll ======= */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
