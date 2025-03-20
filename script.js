const apiKey = '1y8mVhotfqTZmuaYQlrDEWnUOolNiDCxo95oEbiH'; // NASA API key
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=5`; // Fetch 5 random APOD images

const imageElement = document.getElementById('apod-image');
const titleElement = document.getElementById('apod-title');
const descriptionElement = document.getElementById('apod-explanation');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');

let currentIndex = 0;
let apodData = [];

// Fetch data from NASA API
async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    apodData = data;
    showSlide(currentIndex);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Display slide based on index
function showSlide(index) {
  if (apodData.length > 0) {
    const slide = apodData[index];
    imageElement.src = slide.url;
    titleElement.textContent = slide.title;
    descriptionElement.textContent = slide.explanation;
  }
}

// Event listeners for navigation
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + apodData.length) % apodData.length;
  showSlide(currentIndex);
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % apodData.length;
  showSlide(currentIndex);
});

// Initialize slideshow
fetchData();