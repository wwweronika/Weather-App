
//let inputCity = document.getElementById("my-city").value;
let inputCity = 'Wrocław';
// ---- API ---
const apiKey = '3f849387b6ee8d313e4a17c268ffeceb';
const apiLinkCity = `http://api.openweathermap.org/data/2.5/weather?q=${inputCity}&APPID=${apiKey}`;
//const apiLinkCoords = `http://api.openweathermap.org/data/2.5/weather?lat=${inputLocation.latitude}&lon=${inputLocation.longitude}&APPID=${apiKey}`;

// ---- INITIALIZE PROPERTIES VARIABLES ----
let cityName = document.getElementById('location');
let weatherIcon = document.getElementById('weather-icon');
let temperature = document.getElementById('temperature');
let tmin = document.getElementById('tmin');
let tmax = document.getElementById('tmax');
let tsens = document.getElementById('temperature-sensed');
let pressure = document.getElementById('pressure');
let wind = document.getElementById('wind');
let humidity = document.getElementById('humidity');
let clouds = document.getElementById('clouds');
let sunrise = document.getElementById('sunrise-time');
let sunset = document.getElementById('sunset-time');
let sunIcon = document.getElementById('sun-icon');

//////////////////////////////////////////////////////////

// ---- INITIALIZE ICON ARRAY  ----
const weatherType = ['clear sky', 'few clouds', 'scattered clouds', 'broken clouds', 'shower rain', 'rain', 'thunderstorm', 'snow', 'mist'];

// ---- RETURNS TYPE OF WEATHER ----
const setIcon = (jsonObject) => {
    let temp;
    weatherType.forEach( el => {
        if (jsonObject.weather.main === el) temp = el.split(' ').join('');
        if (jsonObject.weather.main === el[0] || jsonObject.weather.main === el[1]) {
            if(isNight(jsonObject)) temp += 'night';
        }
    })
    return temp;
}
/// --------------------------------------------------///

// ---- FUNCTIONS ----
const isNight = (jsonObject) => {
    
    let sunriseMilliseconds = jsonObject.sys.sunrise * 1000;
    let sunsetMilliseconds = jsonObject.sys.sunset * 1000;
    let now = Date.now();
    let night = (now>sunriseMilliseconds || now<sunsetMilliseconds) ? false:true;
    return night;
    
}

const msToDate = () => {
    let now = Date.now();
    now += 1000 * 60 * 60;
    let date = new Date(now);
    return date;
}

const temperatureConverter = (value, conversionUnit) => {
    switch (conversionUnit.toUpperCase()) {
        case 'C':
        return Math.round(value -= 273) + '℃';
        break;

        case 'F':
        return Math.round(value -= 457.87) + '℉';
        break;
    }
}


const windSpeedConverter = (speed) => {
    let temp = speed * 3.6;
    return temp.toFixed(2);
}

const calculateSensedTemperature = (temp, wind, unit) => {
    if (unit === 'C') temp -= 273;
    if (unit === 'F') temp -= 457.87;
    let result = 13.12 + (0.6215 * temp) - (11.37 * Math.pow(wind, 0.16)) + (0.3965 * temp * Math.pow(wind, 0.16));
    if (result>temp) result = temp;
    // it is possible that the sensed temperature is higher than real temperature when wind speed is slow because of air layer sourrounding
    // our body but because of people can treat it like an error function will return real temp in this case
    if (unit === 'C') return Math.round(result) + '℃';
    return Math.round(result) + '℉';
}

// ---- SUN/MOON POSITION ----
const calcX = (jsonObject, isNight, r = 200) => {
    let sunriseTime = jsonObject.sys.sunrise * 1000;
    let sunsetTime = jsonObject.sys.sunset * 1000;
    let positionX;
    let now = Date.now();
    if (!isNight) {
        positionX = Math.abs(((sunsetTime - sunriseTime) - (now - sunriseTime)) / (sunsetTime - sunriseTime) * 2 * r);
    } else {
        positionX = Math.abs(((sunriseTime - sunsetTime) - (now - sunsetTime)) / (sunriseTime - sunsetTime) * 2 * r);
    }
    return Math.round(positionX);
}

const calcY = (x, r = 200) => {
    let y = Math.sqrt(r ** 2 - x ** 2);
    return Math.round(y);
}

const millToTime = (mill) => {
    let date = new Date(mill)
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return hours + ':' + minutes;
}

// ---- INJECT VALUES INTO HTML DOC ----
const apiResponse = (res) => {
    let apiJsonObject = JSON.parse(res);
    cityName.innerText = apiJsonObject.name;
    weatherIcon.src = "http://openweathermap.org/img/w/" + apiJsonObject.weather[0].icon + ".png";
    temperature.innerHTML = temperatureConverter(apiJsonObject.main.temp, 'C');
    tmin.innerText = temperatureConverter(apiJsonObject.main.temp_min, 'C');
    tmax.innerText = temperatureConverter(apiJsonObject.main.temp_max, 'C');
    tsens.innerText = calculateSensedTemperature(apiJsonObject.main.temp, apiJsonObject.wind.speed, 'C');
    pressure.innerText = apiJsonObject.main.pressure + ' hPa';
    wind.innerText = apiJsonObject.wind.speed + ' m/s';
    humidity.innerText = apiJsonObject.main.humidity + '%';
    clouds.innerText = apiJsonObject.clouds.all + '%';
    console.log(calcX(apiJsonObject, isNight(apiJsonObject)) + 'px');
    document.querySelector('#sun-icon').style.left = calcX(apiJsonObject, isNight(apiJsonObject)) + 'px';
    console.log(document.querySelector('#sun-icon').style.left);
    document.querySelector('#sun-icon').style.top = calcY(calcX(apiJsonObject, isNight(apiJsonObject))) + 'px';
    console.log(document.querySelector('#sun-icon').style.top);
    
    if (!isNight) {
        sunrise.innerText = millToTime(apiJsonObject.sys.sunrise * 1000);
        sunset.innerText = millToTime(apiJsonObject.sys.sunset*1000);
    } else {
        sunset.innerText = millToTime(apiJsonObject.sys.sunrise * 1000);
        sunrise.innerText = millToTime(apiJsonObject.sys.sunset * 1000);
    }
}

// ---- HTTP REQUEST FUNCTION AND ITS CALL ----
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