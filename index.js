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

  getForecast(response.data.coord);
}

function search(city) {
  let units = "metric";
  let apiKey = "28cda8ce420e8c865f44239b3154e0ce";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function showWeatherCity(event) {
  event.preventDefault();
  let inputCityValue = document.querySelector("#city-search");
  search(inputCityValue.value);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  // console.log(response.data.daily);
  let forecastElement = document.querySelector(".forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-3">
        <p class="day">${formatDay(forecastDay.dt)}</p>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt="Clear"
          class="icon-temperature"
          width = "75";
        />
        <p class="temperature_forecast"><strong>${Math.round(
          forecastDay.temp.max
        )}°C</strong> ${Math.round(forecastDay.temp.min)}°C</p>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coords) {
  let apiKey = "28cda8ce420e8c865f44239b3154e0ce";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/onecall";
  let apiUrl = `${apiEndPoint}?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

search("Kyiv");
