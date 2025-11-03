// Get references to DOM elements
const searchForm = document.getElementById('search-form');
const movieSearchInput = document.getElementById('movie-search');
const movieResults = document.getElementById('movie-results');

// Your OMDb API key (replace 'YOUR_API_KEY' with your actual key)
const apiKey = 'fd6e7cff';

// Listen for form submit
searchForm.addEventListener('submit', async function(event) {
  // Prevent the page from reloading
  event.preventDefault();

  // Get the search term from the input
  const searchTerm = movieSearchInput.value.trim();

  // If the search term is empty, do nothing
  if (!searchTerm) {
    movieResults.innerHTML = '';
    return;
  }

  // Build the OMDb API URL
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`;

  // Fetch data from OMDb API
  const response = await fetch(apiUrl);
  const data = await response.json();

  // Check if movies were found
  if (data.Response === 'True') {
    // Show the movies in the results grid
    displayMovies(data.Search);
  } else {
    // Show a message if no movies found
    movieResults.innerHTML = `<div class="no-results">No movies found. Try another search!</div>`;
  }
});

// Function to display movies in the results grid
function displayMovies(movies) {
  // Create HTML for each movie
  const html = movies.map(movie => {
    // Use a placeholder image if poster is not available
    const poster = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/250x350?text=No+Image';

    return `
      <div class="movie-card">
        <img class="movie-poster" src="${poster}" alt="Poster of ${movie.Title}">
        <div class="movie-info">
          <div class="movie-title">${movie.Title}</div>
          <div class="movie-year">${movie.Year}</div>
        </div>
      </div>
    `;
  }).join('');

  // Insert the movies into the results grid
  movieResults.innerHTML = html;
}
