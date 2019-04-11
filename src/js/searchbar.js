const currentWeather = require('./currentWeather.js');
const weatherForecast = require('./weather-forecast.js')
const charts = require('./charts.js');

window.onload = function(){
    const searchButton = document.getElementById("search-btn");
    const citySearch = document.getElementById("my-city");
    searchButton.addEventListener("click", showWeather);
    citySearch.addEventListener("keyup", enterPressed);
   }
   
function enterPressed(event) {
    if (event.key === "Enter") {
        showWeather();
    }
}

async function fetchstatus(cityInput) {
    const city = cityInput;
    console.log('fetch started');
    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=c933a83cb569298458c0ad0176ec7f99`);
    const data = await response.json();
    return data.cod
 }

 async function showWeather() {
    const visibleOrNot = document.getElementById("visible-or-not");
    const cityName = document.getElementById("my-city").value;
    const status = await fetchstatus(cityName);
    if (status != 200) {alert('Check if you correctly entered the name of the city.')}
    else
    {visibleOrNot.style.display = "flex"; 
    visibleOrNot.scrollIntoView({behavior: "smooth"})
    const today = await currentWeather.currentWeather(cityName);
    const threeDays = await weatherForecast.weatherForecast(cityName);
    const chart = await charts.chart(cityName);

    return today,threeDays, chart}  
} 
