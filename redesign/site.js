// Progressive enhancement: content is open and usable until this script runs.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.practice-list, .faq-list').forEach(group => {
  const items = [...group.querySelectorAll('.t-acc')];
  const setOpen = (item, open) => {
    item.dataset.open = String(open);
    item.querySelector('.t-acc-head').setAttribute('aria-expanded', String(open));
    item.querySelector('.t-acc-panel').inert = !open;
  };
  items.forEach((item, index) => {
    const button = item.querySelector('.t-acc-head');
    button.disabled = false;
    setOpen(item, group.classList.contains('practice-list') && index === 0);
    button.addEventListener('click', () => {
      const next = item.dataset.open !== 'true';
      items.forEach(other => { if (other !== item) setOpen(other, false); });
      setOpen(item, next);
    });
  });
});

const mobileMenu = document.querySelector('.mobile-menu');
if (mobileMenu) {
  const summary = mobileMenu.querySelector('summary');
  mobileMenu.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobileMenu.open) {
      mobileMenu.open = false;
      summary.focus();
    }
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => { mobileMenu.open = false; });
  });
  document.addEventListener('click', event => {
    if (mobileMenu.open && !mobileMenu.contains(event.target)) mobileMenu.open = false;
  });
  window.matchMedia('(min-width: 761px)').addEventListener('change', event => {
    if (event.matches) mobileMenu.open = false;
  });
}

const topic = document.querySelector('#contact-topic');
const whatsapp = document.querySelector('#whatsapp-link');
const preview = document.querySelector('#message-preview');
if (topic && whatsapp && preview) {
  const messages = {
    geral: 'Olá! Gostaria de informações sobre o atendimento da Sahium Advogados.',
    cliente: 'Olá! Já sou cliente e gostaria de falar com a equipe sobre meu atendimento.',
    debito: 'Olá! Gostaria de informações sobre como tratar de um débito condominial.',
    outro: 'Olá! Gostaria de informações sobre o atendimento da Sahium Advogados.',
  };
  const update = () => {
    const label = topic.options[topic.selectedIndex].textContent;
    const message = messages[topic.value] || `Olá! Gostaria de informações sobre atendimento em ${label}.`;
    const url = new URL('https://wa.me/5562993355808');
    url.searchParams.set('text', message);
    whatsapp.href = url.href;
    preview.textContent = message;
  };
  const loadTopic = () => {
    const wanted = new URLSearchParams(location.search).get('assunto');
    if (wanted && [...topic.options].some(option => option.value === wanted)) topic.value = wanted;
    update();
  };
  topic.addEventListener('change', update);
  window.addEventListener('pageshow', loadTopic);
  loadTopic();
}
// A shareable URL carries only the public subject, no client information.
document.querySelectorAll('[data-contact-topic]').forEach(link => {
  const url = new URL(link.href);
  url.searchParams.set('assunto', link.dataset.contactTopic);
  link.href = url.href;
});

// Avoid focus being obscured by the sticky header when using in-page navigation.
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    const target = document.getElementById(link.hash.slice(1));
    if (target && link.classList.contains('skip-link')) {
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    }
  });
});
