// Theme Toggle
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  const t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', t);
  toggle.textContent = t === 'dark' ? '☀️' : '🌙';
});

// Reveal & animate skill bars on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      if (e.target.classList.contains('skill-bar')) {
        const lvl = e.target.getAttribute('data-level');
        e.target.querySelector('::after');
        e.target.style.setProperty('--fill', lvl);
        e.target.querySelector(':after');
        e.target.style.setProperty('--fill', lvl);
        // fallback: modify pseudo via a small hack
        const style = document.createElement('style');
        style.innerHTML = `.skills .skill-bar[data-skill="${e.target.dataset.skill}"]::after { width: ${lvl}; }`;
        document.head.appendChild(style);
      }
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.section, .project-item, .skill-bar').forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href')).scrollIntoView({ behavior:'smooth' });
  });
});
