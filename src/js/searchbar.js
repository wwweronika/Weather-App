// currentWeather = require('./currentweather.js');
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

async function showWeather() {
    const visibleOrNot = document.getElementById("visible-or-not");
    const cityName = document.getElementById("my-city").value;
    visibleOrNot.style.display = "flex"; 
    // const today = await currentWeather.httpRequestAsync(apiLinkCity, apiResponse);
    const threeDays = await weatherForecast.weatherForecast(cityName);
    const chart = await charts.chart(cityName);
    visibleOrNot.scrollIntoView({behavior: "smooth"})
    return threeDays, chart
    
} 
