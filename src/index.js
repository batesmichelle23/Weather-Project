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

console.log(today);

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
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let currentCity = document.querySelector("#currentCity");
  currentCity.innerHTML = `${city}`;
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = `${temperature}`;

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

searchCity("Green Bay");