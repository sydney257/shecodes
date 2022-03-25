let now = new Date();
let time = document.querySelector("#currently");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

time.innerHTML = `${day} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  let city = `${searchInput.value}`;

  let apiKey = "00939d96c9ed68ecdd1c51c91405f4e5";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let windSpeed = Math.round(response.data.wind.speed);
    let wind = document.querySelector("#wind");
    wind.innerHTML = `Wind: ${windSpeed} km/h`;
    let humidity = response.data.main.humidity;
    let humidResult = document.querySelector("#humidity");
    humidResult.innerHTML = `Humidity: ${humidity}%`;
    let h2 = document.querySelector("#temperature");
    h2.innerHTML = temperature;
  }
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
let submit = document.querySelector("#search-form");
submit.addEventListener("submit", search);

// Bonus
function showCurrentLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let units = "metric";
  let apiKey = "00939d96c9ed68ecdd1c51c91405f4e5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showCurrentTemp);
}

function getCoords() {
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let currentButton = document.querySelector("#location");
currentButton.addEventListener("click", getCoords);

function showCurrentTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${windSpeed} km/h`;
  let humidity = response.data.main.humidity;
  let humidResult = document.querySelector("#humidity");
  humidResult.innerHTML = `Humidity: ${humidity}%`;
  let city = response.data.name;
  let h1 = document.querySelector("#city");
  h1.innerHTML = city;
  let h2 = document.querySelector("#temperature");
  h2.innerHTML = temperature;
}
