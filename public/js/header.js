function toggleMenu() {
  const dropdown = document.querySelector('.mobile-dropdown');
  dropdown.classList.toggle('active');
  
  // Toggle hamburger animation
  const hamburger = document.querySelector('.hamburger-menu');
  const spans = hamburger.querySelectorAll('span');
  
  if (dropdown.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
  } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  const dropdown = document.querySelector('.mobile-dropdown');
  const hamburger = document.querySelector('.hamburger-menu');
  
  if (!hamburger.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
  }
});