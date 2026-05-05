(function () {
  'use strict';

  const triggers = Array.from(document.querySelectorAll('.accordion__trigger'));

  function openPanel(trigger) {
    const panelId = trigger.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);

    trigger.setAttribute('aria-expanded', 'true');
    panel.removeAttribute('hidden');
  }

  function closePanel(trigger) {
    const panelId = trigger.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);

    trigger.setAttribute('aria-expanded', 'false');
    panel.setAttribute('hidden', '');
  }

  function togglePanel(trigger) {
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closePanel(trigger);
    } else {
      openPanel(trigger);
    }
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      togglePanel(trigger);
    });
  });
})();
