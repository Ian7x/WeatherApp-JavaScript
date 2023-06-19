const apiKey = "f519f62a570a5e372f35e6f0f52fedf3";
const locationInput = document.getElementById("location-input");
const searchButton = document.getElementById("search-btn");
const locationElement = document.querySelector(".location");
const countryElement = document.querySelector(".country");
const temperatureElement = document.querySelector(".temperature");
const conditionsElement = document.querySelector(".conditions");
const background = document.querySelector(".background");

// Set default location
const defaultLocation = "Sofia";

// Call handleSearch() on page load for default location
handleSearch(defaultLocation);

searchButton.addEventListener("click", () => {
  const location = locationInput.value;
  handleSearch(location);
});

locationInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    const location = locationInput.value;
    handleSearch(location);
  }
});
function handleSearch(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unable to fetch weather data");
      }
      return response.json();
    })
    .then((data) => {
      locationElement.textContent = data.name;

      // Fetch the full country name
      fetch(`https://restcountries.com/v2/alpha/${data.sys.country}`)
        .then((response) => response.json())
        .then((countryData) => {
          // Set the full country name in the element
          countryElement.textContent = countryData.name;
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle the error if fetching country data fails
        });

      temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
      conditionsElement.textContent = data.weather[0].description;

      // updating the background image based on weather conditions
      const weatherType = data.weather[0].description.toLowerCase();
      setBackground(weatherType);
    })
    .catch((error) => {
      console.error("Error:", error);
      // Display an error message to the user
    });
}

function setBackground(weatherCode) {
  let backgroundImage = "";

  switch (weatherCode) {
    case "clear sky":
    case "clear-day":
      backgroundImage = "url('./images/clear-sky1.jpg')";
      break;
    case "few clouds":
      backgroundImage = "url('./images/few-cloud.jpg')";
      break;
    case "scattered clouds":
      backgroundImage = "url('./images/scattered-cloud.jpg')";
      break;
    case "broken clouds":
      backgroundImage = "url('./images/broken-clouds.jpg')";
      break;
    case "overcast clouds":
      backgroundImage = "url('./images/overcast-clouds.jpg')";
      break;
    case "light rain":
    case "light intensity shower rain":
    case "showers":
      backgroundImage = "url('./images/light-rain.jpg')";
      break;
    case "moderate rain":
    case "moderate intensity rain":
      backgroundImage = "url('./images/moderate-rain.jpg')";
      break;
    case "heavy rain":
    case "heavy intensity rain":
    case "very heavy rain":
      backgroundImage = "url('./images/heavy-rain.jpg')";
      break;
    case "thunderstorm":
    case "thunderstorm with light rain":
    case "thunderstorm with heavy rain":
      backgroundImage = "url('./images/thunderstorm.jpg')";
      break;
    case "snow":
    case "light snow":
    case "light shower snow":
      backgroundImage = "url('./images/snow.jpg')";
      break;
    case "heavy snow":
    case "heavy shower snow":
      backgroundImage = "url('./images/heavy-snow.jpg')";
      break;
    case "mist":
    case "fog":
    case "haze":
      backgroundImage = "url('./images/mist.jpg')";
      break;
    default:
      backgroundImage = "url('./images/default.jpg')";
      break;
  }

  background.style.backgroundImage = backgroundImage;
}
