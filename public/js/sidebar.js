document.addEventListener('DOMContentLoaded', () => {
  const sidebarToggle = document.getElementById('sidebarToggle');
  const mainLayout = document.querySelector('.main-layout');
  
  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  mainLayout.appendChild(overlay);

  function toggleSidebar() {
    sidebarToggle.classList.toggle('active');
    mainLayout.classList.toggle('sidebar-active');
    overlay.classList.toggle('active');
  }

  // Toggle sidebar when button is clicked
  sidebarToggle.addEventListener('click', toggleSidebar);

  // Close sidebar when overlay is clicked
  overlay.addEventListener('click', toggleSidebar);

  // Close sidebar when ESC key is pressed
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainLayout.classList.contains('sidebar-active')) {
      toggleSidebar();
    }
  });

  // Close sidebar when window is resized to desktop size
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mainLayout.classList.contains('sidebar-active')) {
      toggleSidebar();
    }
  });
});