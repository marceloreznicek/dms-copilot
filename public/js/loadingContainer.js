
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  
  form.addEventListener('submit', (event) => {
    // Check form validity

  });
});

function enableLoadingScreen() {
  const loadingContainer = document.getElementById("loadingContainer");
  loadingContainer.classList.add("loading-active");
}
