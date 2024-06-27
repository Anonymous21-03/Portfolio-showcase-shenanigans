//ScrollAnimations.js

export const handleScroll = () => {
  const position = window.pageYOffset;

  // Navbar animation
  const navbar = document.querySelector('.navbar');
  const menuItems = document.querySelectorAll('.menu-item');

  if (navbar) {
    if (position > 50) {
      navbar.classList.add('hidden');
      menuItems.forEach((item, index) => {
        if (item) {
          setTimeout(() => {
            item.classList.add('hidden');
          }, index * 100);
        }
      });
    } else {
      navbar.classList.remove('hidden');
      menuItems.forEach(item => {
        if (item) {
          item.classList.remove('hidden');
        }
      });
    }
  }

  // Home page animation
  const homeContainer = document.querySelector('.home-container');
  const introSpans = document.querySelectorAll('.intro span');
  const cardsContainer = document.querySelector('.cards-container');

  if (homeContainer) {
    if (position > 300) {
      homeContainer.classList.add('fade-out');
      introSpans.forEach(span => {
        if (span) span.classList.add('fade-out');
      });
      if (cardsContainer) cardsContainer.classList.add('fade-out');
    } else {
      homeContainer.classList.remove('fade-out');
      introSpans.forEach(span => {
        if (span) span.classList.remove('fade-out');
      });
      if (cardsContainer) cardsContainer.classList.remove('fade-out');
    }
  }
}
