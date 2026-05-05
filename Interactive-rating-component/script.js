const buttons = document.querySelectorAll('.rating-btn');
const submitBtn = document.querySelector('.submit-btn');
const ratingCard = document.getElementById('rating-card');
const thankCard = document.getElementById('thank-card');
const selectedText = document.getElementById('selected-text');

let selectedValue = null;

// select rating
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedValue = btn.textContent;
  });
});

// submit
submitBtn.addEventListener('click', () => {
  if (!selectedValue) return;

  selectedText.textContent = `You selected ${selectedValue} out of 5`;
  ratingCard.classList.add('hidden');
  thankCard.classList.remove('hidden');
});
