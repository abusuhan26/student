(() => {
  const $ = (selector) => document.querySelector(selector);
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('medora-theme');
  if (savedTheme) root.dataset.theme = savedTheme;

  const toast = $('#toast'); let toastTimer;
  const showToast = (message) => {
    toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  };
  $('#themeButton').addEventListener('click', () => {
    const next = root.dataset.theme === 'oled' ? 'light' : root.dataset.theme === 'light' ? 'dark' : 'oled';
    root.dataset.theme = next; localStorage.setItem('medora-theme', next);
    showToast(`${next === 'oled' ? 'OLED dark' : next[0].toUpperCase() + next.slice(1)} theme selected`);
  });
  const togglePanel = (button, panel) => {
    const open = panel.classList.toggle('open'); button.setAttribute('aria-expanded', String(open));
  };
  $('#noticeButton').addEventListener('click', () => togglePanel($('#noticeButton'), $('#noticePanel')));
  $('#closeNotice').addEventListener('click', () => { $('#noticePanel').classList.remove('open'); $('#noticeButton').setAttribute('aria-expanded', 'false'); });
  $('#menuButton').addEventListener('click', () => togglePanel($('#menuButton'), $('#mobileDrawer')));
  $('#moreButton').addEventListener('click', () => togglePanel($('#menuButton'), $('#mobileDrawer')));
  document.querySelectorAll('[data-toast]').forEach((element) => element.addEventListener('click', (event) => { event.preventDefault(); showToast(element.dataset.toast); }));
  $('#searchLink').addEventListener('click', (event) => { event.preventDefault(); showToast('Search will be available as content is added.'); });
  $('#year').textContent = new Date().getFullYear();
  window.addEventListener('load', () => setTimeout(() => $('#loader').classList.add('done'), 350));
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } }), { threshold: 0.14 });
    document.querySelectorAll('.section, .research-band').forEach((element) => observer.observe(element));
  } else document.querySelectorAll('.section, .research-band').forEach((element) => element.classList.add('in-view'));
})();
