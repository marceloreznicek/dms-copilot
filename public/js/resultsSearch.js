function searchResults() {
  const searchBox = document.querySelector("#campaignSearch")
  window.location.href = "/campaigns/search?search_term=" + searchBox.value
}

const searchButton = document.querySelector(".search-button")
searchButton.addEventListener("click", searchResults)