// Optional: Clean up function if the page is unloaded
window.addEventListener('unload', function () {
  const loadingContainer = document.getElementById('loadingContainer');
  if (loadingContainer && loadingContainer.dataset.progressInterval) {
    clearInterval(parseInt(loadingContainer.dataset.progressInterval));
  }
});

