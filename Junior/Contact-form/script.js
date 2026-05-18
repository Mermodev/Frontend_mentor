const form = document.querySelector('form');
const toast = document.getElementById('toast');

const rules = {
  fname:   [() => !!val('fname'),          'This field is required'],
  lname:   [() => !!val('lname'),          'This field is required'],
  email:   [() => !!val('email') && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val('email')),
                                           v => !val('email') ? 'This field is required' : 'Please enter a valid email address'],
  msg:     [() => !!val('msg'),            'This field is required'],
};

function val(id) { return document.getElementById(id)?.value.trim(); }
function el(id)  { return document.getElementById(id); }

function setErr(inputId, errId, msg) {
  const inp = el(inputId);
  if (inp) { inp.classList.add('err'); inp.setAttribute('aria-invalid', 'true'); }
  const e = el(errId);
  if (e) e.textContent = typeof msg === 'function' ? msg() : msg;
}

function clrErr(inputId, errId) {
  const inp = el(inputId);
  if (inp) { inp.classList.remove('err'); inp.removeAttribute('aria-invalid'); }
  const e = el(errId);
  if (e) e.textContent = '';
}

function chkField(id) {
  const r = rules[id];
  if (!r[0]()) { setErr(id, 'e-' + id, r[1]); return false; }
  clrErr(id, 'e-' + id);
  return true;
}

function chkQtype() {
  const ok = !!document.querySelector('input[name="qtype"]:checked');
  const fs = document.querySelector('fieldset');
  const e = el('e-qtype');
  fs.classList.toggle('err', !ok);
  if (e) e.textContent = ok ? '' : 'Please select a query type';
  return ok;
}

function chkConsent() {
  const ok = el('consent').checked;
  const p = el('consent').closest('p');
  p.classList.toggle('err', !ok);
  el('consent').toggleAttribute('aria-invalid', !ok);
  const e = el('e-consent');
  if (e) e.textContent = ok ? '' : 'To submit this form, please consent to being contacted';
  return ok;
}

['fname','lname','email','msg'].forEach(id => {
  el(id)?.addEventListener('blur', () => chkField(id));
});

document.querySelectorAll('input[name="qtype"]').forEach(r => r.addEventListener('change', chkQtype));
el('consent')?.addEventListener('change', chkConsent);

form.addEventListener('submit', e => {
  e.preventDefault();
  const ok = ['fname','lname','email','msg'].map(chkField)
    .concat([chkQtype(), chkConsent()])
    .every(Boolean);
  if (!ok) { form.querySelector('[aria-invalid="true"]')?.focus(); return; }
  toast.removeAttribute('hidden');
  toast.focus();
  setTimeout(() => toast.setAttribute('hidden', ''), 5000);
  form.reset();
  form.querySelectorAll('.err').forEach(el => el.classList.remove('err'));
});
