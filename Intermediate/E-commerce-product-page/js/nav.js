// =========================================================
// NAV — mobile hamburger menu
// =========================================================

const hamburger = document.getElementById('hamburger');
const navClose = document.getElementById('nav-close');
const nav = document.getElementById('nav');
const navOverlay = document.getElementById('nav-overlay');

function openNav() {
  nav.classList.add('is-open');
  navOverlay.classList.add('is-open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  navClose.focus();
}

function closeNav() {
  nav.classList.remove('is-open');
  navOverlay.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  hamburger.focus();
}

hamburger.addEventListener('click', openNav);
navClose.addEventListener('click', closeNav);
navOverlay.addEventListener('click', closeNav);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('is-open')) {
    closeNav();
  }
});
