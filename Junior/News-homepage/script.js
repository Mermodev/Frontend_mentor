const toggle = document.getElementById('nav-toggle');
const close  = document.getElementById('nav-close');
const menu   = document.getElementById('nav-menu');
const overlay = document.getElementById('overlay');

const open = () => {
  menu.classList.add('open');
  overlay.style.display = 'block';
  toggle.setAttribute('aria-expanded', 'true');
  close.focus();
};

const shut = () => {
  menu.classList.remove('open');
  overlay.style.display = 'none';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.focus();
};

toggle.addEventListener('click', open);
close.addEventListener('click', shut);
overlay.addEventListener('click', shut);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menu.classList.contains('open')) shut();
});
