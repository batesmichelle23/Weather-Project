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

  

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

}

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
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

function showCels(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#currentTemp");
  let celsTemp = (fahrTemp - 32) * (5 / 9);
  tempElement.innerHTML = Math.round(celsTemp);
  celsLink.classList.add("active");
  fahrLink.classList.remove("active");
}

function showFahr(event) {
  event.preventDefault();
  let fahrTemp = (23 * (9/5)) + 32;
  let tempElement = document.querySelector("#currentTemp");
  tempElement.innerHTML = Math.round(fahrTemp);
  celsLink.classList.remove("active");
  fahrLink.classList.add("active");
}

let fahrTemp = null;

let celsLink = document.querySelector("#cels");
celsLink.addEventListener("click", showCels);

let fahrLink = document.querySelector("#fahr");
fahrLink.addEventListener("click", showFahr);

searchCity("Green Bay");