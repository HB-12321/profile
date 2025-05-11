// Theme toggle
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  toggleBtn.textContent = next === 'dark' ? '☀️' : '🌙';
});

// Smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// Intersection Observer for reveal & skill bars
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add('visible');
    // animate skill bar
    if (el.classList.contains('skill-bar')) {
      const lvl = el.getAttribute('data-level');
      // inject rule to set pseudo-element width
      const rule = `.skills .skill-bar[data-skill="${el.dataset.skill}"]::after { width: ${lvl}; }`;
      const style = document.createElement('style');
      style.textContent = rule;
      document.head.appendChild(style);
    }
    observer.unobserve(el);
  });
}, { threshold: 0.3 });

// Observe sections, projects and skill bars
document.querySelectorAll('.section, .project-item, .skill-bar').forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});
