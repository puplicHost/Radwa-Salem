// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections and cards
const elementsToAnimate = document.querySelectorAll(
  'section, .skill-card, .portfolio-card'
);

elementsToAnimate.forEach(el => {
  observer.observe(el);
});

// Add parallax effect to hero on scroll
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrolled = window.scrollY;
    const parallaxSpeed = 0.5;
    hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    hero.style.opacity = 1 - (scrolled / 600);
  }
  lastScrollY = scrollY;
});

// Add hover effect enhancement for portfolio cards
document.querySelectorAll('.portfolio-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});

// Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// Add active state to social icons
document.querySelectorAll('.social-icon, .footer-icon').forEach(icon => {
  icon.addEventListener('click', function(e) {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = '';
    }, 150);
  });
});

// Smooth reveal on page load
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// Certifications image modal
const certificationThumb = document.querySelector('[data-modal-target="certification-modal"]');
const certificationModal = document.getElementById('certification-modal');

if (certificationThumb && certificationModal) {
  const modalImage = certificationModal.querySelector('img');
  const closeElements = certificationModal.querySelectorAll('[data-modal-close]');

  const toggleModal = (open) => {
    certificationModal.classList.toggle('open', open);
    certificationModal.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
  };

  certificationThumb.addEventListener('click', () => {
    if (modalImage) {
      modalImage.src = certificationThumb.src;
      modalImage.alt = certificationThumb.alt;
    }
    toggleModal(true);
  });

  closeElements.forEach(el => {
    el.addEventListener('click', () => toggleModal(false));
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && certificationModal.classList.contains('open')) {
      toggleModal(false);
    }
  });
}
