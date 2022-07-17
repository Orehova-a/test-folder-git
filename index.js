function showCurrentWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureNumber = document.querySelector(".temperature-number");
  temperatureNumber.innerHTML = temperature;

  let cityName = response.data.name;
  let cityNameCurrent = document.querySelector(".city");
  cityNameCurrent.innerHTML = cityName;

  let description = response.data.weather[0].main;
  let descriptionSky = document.querySelector(".description");
  descriptionSky.innerHTML = description;

  let wind = response.data.wind.speed;
  let windSpeed = document.querySelector(".wind");
  windSpeed.innerHTML = `Wind: ${wind} m/s`;

  let humidity = response.data.main.humidity;
  let humidityCurrent = document.querySelector(".humidity");
  humidityCurrent.innerHTML = `Humidity: ${humidity}%`;

  let icon = response.data.weather[0].icon;
  let iconCurrent = document.querySelector(".icon-temperature");
  iconCurrent.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconCurrent.setAttribute("alt", description);

  celsiusTemperature = response.data.main.temp;
}

function showWeatherCity(event) {
  event.preventDefault();
  let cityValue = document.querySelector(".city");
  let inputCityValue = document.querySelector("#city-search");
  cityValue.innerHTML = inputCityValue.value;

  let units = "metric";
  let apiKey = "28cda8ce420e8c865f44239b3154e0ce";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${inputCityValue.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentWeather);

  let forecastApiEndPoint = "https://api.openweathermap.org/data/2.5/forecast";
  let forecastApiUrl = `${forecastApiEndPoint}?q=${inputCityValue.value}&appid=${apiKey}&units=${units}`;
  axios.get(forecastApiUrl).then(showCurrentWeather);
}

let cityChange = document.querySelector(".search-form");
cityChange.addEventListener("submit", showWeatherCity);

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let units = "metric";
  let apiKey = "28cda8ce420e8c865f44239b3154e0ce";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentWeather);

  let forecastApiEndPoint = "https://api.openweathermap.org/data/2.5/forecast";
  let forecastApiUrl = `${forecastApiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(forecastApiUrl).then(showCurrentWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let buttonCurrent = document.querySelector(".button-current");
buttonCurrent.addEventListener("click", getCurrentPosition);

let today = new Date();

let date = document.querySelector(".time");

let hours = String(today.getHours()).padStart(2, "0");
let minutes = String(today.getMinutes()).padStart(2, "0");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[today.getDay()];

date.innerHTML = `${day} ${hours}:${minutes}`;

function fahrenheitClick(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");

  let temperatureChange = document.querySelector(".temperature-number");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureChange.innerHTML = Math.round(fahrenheiTemperature);
}

function celsiusClick(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");

  let temperatureChange = document.querySelector(".temperature-number");
  temperatureChange.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheit = document.querySelector(".fahrenheit-link");
fahrenheit.addEventListener("click", fahrenheitClick);

let celsius = document.querySelector(".celsius-link");
celsius.addEventListener("click", celsiusClick);
