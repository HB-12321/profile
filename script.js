// Theme toggle
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
});

// Smooth scroll for nav links & CTA
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.section, .project-item').forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});

// Typing effect on Hero
const highlight = document.querySelector('.highlight');
const texts = ["Houtman Bachar", "Front-End Developer", "Business Strategist"];
let index = 0, charIndex = 0, direction = 1;
function type() {
  const fullText = texts[index];
  highlight.textContent = fullText.slice(0, charIndex);
  charIndex += direction;
  if (charIndex > fullText.length || charIndex < 0) {
    direction *= -1;
    if (direction === 1) index = (index + 1) % texts.length;
  }
  setTimeout(type, 150);
}
type();
