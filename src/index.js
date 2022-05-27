function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = `<div class="card-group" id="forecast">
                <div class="card-mon" style="width: 9.5rem; height: 7.3rem">
                  <div class="card-body-mon">
                    <h5 class="card-title-mon">MON</h5>
                    <img
                      src="http://openweathermap.org/img/wn/50d@2x.png"
                      alt=""
                      width="36"
                    />
                    <p class="card-text-mon-degree">17°C</p>
                  </div>
                </div>
                <div class="card-tue" style="width: 9.5rem; height: 7.3rem">
                  <div class="card-body-tue">
                    <h5 class="card-title-tue">TUE</h5>
                    <p class="card-text-tue">🌧️</p>
                    <p class="card-text-tue-degree">10°C</p>
                  </div>
                </div>
                <div class="card-wed" style="width: 9.5rem; height: 7.3rem">
                  <div class="card-body-wed">
                    <h5 class="card-title-wed">WED</h5>
                    <p class="card-text-wed">🌧️</p>
                    <p class="card-text-wed-degree">11°C</p>
                  </div>
                </div>
                <div class="card-thu" style="width: 9.5rem; height: 7.3rem">
                  <div class="card-body-thu">
                    <h5 class="card-title-thu">THU</h5>
                    <p class="card-text-thu">🌧️</p>
                    <p class="card-text-thu-degree">7°C</p>
                  </div>
                </div>
                <div class="card-fri" style="width: 9.5rem; height: 7.3rem">
                  <div class="card-body-fri">
                    <h5 class="card-title-fri">FRI</h5>
                    <p class="card-text-fri">🌤️</p>
                    <p class="card-text-fri-degree">9°C</p>
                  </div>
                </div>
              </div>`;
}

function displayWeatherCondition(response) {
  console.log(response.data);
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let iconElement = document.querySelector("#icon");
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemp = response.data.main.temp;
}

function search(event) {
  event.preventDefault();
  let apiKey = "6ac9a1cc92ffe9350e80d02a2878b056";
  let city = document.querySelector("#city-input").value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);

  //let cityElement = document.querySelector("#city");
  //let cityInput = document.querySelector("#city-input");
  //cityElement.innerHTML = cityInput.value;
  //make an API call to OpenWeather API
  //Once I get the HTTP response, we display the city name and the temperature
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let convertToFahrenheit = Math.round((celsiusTemp * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(convertToFahrenheit);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

// Feature #1
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// Feature #2
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// Bonus Feature

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let celsiusTemp = null;

displayForecast();
