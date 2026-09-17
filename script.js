const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (themeToggle) {
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'dark') document.body.classList.add('dark');

  const updateThemeButton = () => {
    const darkMode = document.body.classList.contains('dark');
    themeToggle.textContent = darkMode ? '☀️' : '🌙';
    themeToggle.setAttribute(
      'aria-label',
      darkMode ? 'Switch to light mode' : 'Switch to dark mode'
    );
    themeToggle.setAttribute('aria-pressed', String(darkMode));
  };

  updateThemeButton();

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const darkMode = document.body.classList.contains('dark');
    localStorage.setItem('portfolio-theme', darkMode ? 'dark' : 'light');
    updateThemeButton();
  });
}

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.setAttribute('aria-pressed', String(button.classList.contains('active')));

  button.addEventListener('click', () => {
    filterButtons.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-pressed', 'false');
    });

    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');

    const filter = button.dataset.filter;
    projectCards.forEach((card) => {
      card.classList.toggle(
        'hidden',
        filter !== 'all' && card.dataset.category !== filter
      );
    });
  });
});

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}
