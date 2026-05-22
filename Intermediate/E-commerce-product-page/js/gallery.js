// =========================================================
// GALLERY — main image, thumbnail nav, lightbox (desktop)
// =========================================================

let currentIndex = 0;

// Elements
const mainImg = document.getElementById('gallery-main-img');
const galleryThumbs = document.getElementById('gallery-thumbs');
const galleryPrev = document.getElementById('gallery-prev');
const galleryNext = document.getElementById('gallery-next');

const lightbox = document.getElementById('lightbox');
const lightboxMainImg = document.getElementById('lightbox-main-img');
const lightboxThumbs = document.getElementById('lightbox-thumbs');
const lightboxClose = document.getElementById('lightbox-close');
const lbPrev = document.getElementById('lb-prev');
const lbNext = document.getElementById('lb-next');

// -------------------------
// Build thumbnails
// -------------------------
function buildThumbs(container, clickHandler) {
  container.innerHTML = '';
  IMAGES.forEach((img, i) => {
    const btn = document.createElement('button');
    btn.classList.add('thumb-item');
    btn.setAttribute('aria-label', `View image ${i + 1}`);
    if (i === currentIndex) btn.classList.add('is-active');

    const image = document.createElement('img');
    image.src = img.thumb;
    image.alt = '';
    image.setAttribute('aria-hidden', 'true');

    btn.appendChild(image);
    btn.addEventListener('click', () => clickHandler(i));
    container.appendChild(btn);
  });
}

function updateActiveThumbs(container, index) {
  const thumbs = container.querySelectorAll('.thumb-item');
  thumbs.forEach((t, i) => t.classList.toggle('is-active', i === index));
}

// -------------------------
// Gallery (main page)
// -------------------------
function setGalleryImage(index) {
  currentIndex = index;
  mainImg.src = IMAGES[index].full;
  mainImg.alt = IMAGES[index].alt;
  updateActiveThumbs(galleryThumbs, index);
  updateActiveThumbs(lightboxThumbs, index);
}

function goGalleryPrev() {
  const prev = (currentIndex - 1 + IMAGES.length) % IMAGES.length;
  setGalleryImage(prev);
}

function goGalleryNext() {
  const next = (currentIndex + 1) % IMAGES.length;
  setGalleryImage(next);
}

galleryPrev.addEventListener('click', goGalleryPrev);
galleryNext.addEventListener('click', goGalleryNext);

buildThumbs(galleryThumbs, (i) => setGalleryImage(i));

// Desktop: click main image to open lightbox
mainImg.addEventListener('click', () => {
  if (window.innerWidth >= 1024) {
    openLightbox(currentIndex);
  }
});

// -------------------------
// Lightbox
// -------------------------
function openLightbox(index) {
  lightbox.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  setLightboxImage(index);
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.setAttribute('hidden', '');
  document.body.style.overflow = '';
}

function setLightboxImage(index) {
  currentIndex = index;
  lightboxMainImg.src = IMAGES[index].full;
  lightboxMainImg.alt = IMAGES[index].alt;
  updateActiveThumbs(lightboxThumbs, index);
  updateActiveThumbs(galleryThumbs, index);
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

lbPrev.addEventListener('click', () => {
  const prev = (currentIndex - 1 + IMAGES.length) % IMAGES.length;
  setLightboxImage(prev);
});

lbNext.addEventListener('click', () => {
  const next = (currentIndex + 1) % IMAGES.length;
  setLightboxImage(next);
});

buildThumbs(lightboxThumbs, (i) => setLightboxImage(i));

// Keyboard: Escape closes lightbox
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !lightbox.hasAttribute('hidden')) {
    closeLightbox();
  }
});
