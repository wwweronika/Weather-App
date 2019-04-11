module.exports.currentWeather = function(city) {
// ---- API ---
const apiKey = '3f849387b6ee8d313e4a17c268ffeceb';
const apiLinkCity = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`;

// ---- INITIALIZE PROPERTIES VARIABLES ----
let cityName = document.getElementById('location');
let weatherIcon = document.getElementById('weather-icon');
let temperature = document.getElementById('temp');
let pressure = document.getElementById('pressure');
let wind = document.getElementById('wind');
let humidity = document.getElementById('humidity');
let clouds = document.getElementById('clouds');


const temperatureConverter = (value, conversionUnit) => {
    switch (conversionUnit.toUpperCase()) {
        case 'C':
            return Math.round(value -= 273) ;
            break;

        case 'F':
            return Math.round(value -= 457.87);
            break;
    }
}

const apiResponse = (res) => {
    let apiJsonObject = JSON.parse(res);
    cityName.innerText = apiJsonObject.name;
    weatherIcon.src = "http://openweathermap.org/img/w/" + apiJsonObject.weather[0].icon + ".png";
    temperature.innerHTML = temperatureConverter(apiJsonObject.main.temp, 'C');
    pressure.innerText = apiJsonObject.main.pressure;
    wind.innerText = apiJsonObject.wind.speed;
    humidity.innerText = apiJsonObject.main.humidity;
    clouds.innerText = apiJsonObject.clouds.all;
}

const httpRequestAsync = (url, callback) => {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true);
    httpRequest.send();
}
httpRequestAsync(apiLinkCity, apiResponse);

}
