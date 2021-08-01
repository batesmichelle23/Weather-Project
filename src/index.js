let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];

let now = new Date();
let today = document.querySelector("#currentDate");
let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

if (hour > 12) {
  hour = hour - 12;
}

today.innerHTML = `${day} ${month} ${date}, ${year} ${hour}:${minute}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];

  
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      
   
    forecastHTML = forecastHTML + `
    <div class="col-2">
      <div class="forecastDay">${formatDay(forecastDay.dt)}</div>
      <img src= "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
      alt="" />
      <div class="forecastTemp">
        <span class="forecastTempMax">${Math.round(forecastDay.temp.max)}\u00B0</span>
        <span class="forecastTempMin">${Math.round(forecastDay.temp.min)}\u00B0</span>
      </div>
    </div>`;
  
    }
  });
  
  forecastHTML = forecastHTML + `</div>`;
 
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "f22a2305cf036552c9a2c6bdd1b30e53";
  units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}

function searchCity(city) {
  let apiKey = "f22a2305cf036552c9a2c6bdd1b30e53";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;  
  axios.get(apiUrl).then(showTemp);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#enterCity").value;
  searchCity(city);
}

function showTemp(response) {
  fahrTemp = response.data.main.temp;
  let temperature = Math.round(fahrTemp);
  let city = response.data.name;
  let currentCity = document.querySelector("#currentCity");
  currentCity.innerHTML = `${city}`;
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = `${temperature}`;
  let windElement = document.querySelector("#windSpeed");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  let weatherDescription = document.querySelector("#weatherDescription");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);

}

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial";
  let apiKey = "f22a2305cf036552c9a2c6bdd1b30e53";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentData = document.querySelector("#currentLocation");
currentData.addEventListener("click", getPosition);

let form = document.querySelector("#searchForm");
form.addEventListener("submit", submit);

searchCity("Green Bay");
