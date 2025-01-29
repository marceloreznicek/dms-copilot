
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  
  form.addEventListener('submit', (event) => {
    // Check form validity
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    
    // If form is valid, show loading screen and let the form submit naturally
    enableLoadingScreen();
  });
});

function enableLoadingScreen() {
  const loadingContainer = document.getElementById("loadingContainer");
  loadingContainer.classList.add("loading-active");
}
