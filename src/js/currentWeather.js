function currentWeather(city) {
    // ---- API ---
    const key = '3f849387b6ee8d313e4a17c268ffeceb';
    const query = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`;

    // ---- INITIALIZE PROPERTIES VARIABLES ----
    const basicWeather = document.getElementById('basic-weather');
    const pressure = document.getElementById('pressure');
    const wind = document.getElementById('wind');
    const humidity = document.getElementById('humidity');
    const clouds = document.getElementById('clouds');

    function matchWeatherInfoToIcon(weatherInfo) {

        switch (weatherInfo) {
            case 'Clear':
                return 'sun'
            case 'Clouds':
                return 'cloud'
            case 'Thunderstorm':
                return 'bolt'
            case 'Rain':
                return 'cloud-rain'
            case 'Drizzle':
                return 'cloud-rain'
            case 'Snow':
                return 'snowflake'
            default:
                return 'meteor'
        }
    }

    function createBasicDayInfoHTML(object) {
        return `                    
            <h2>${object.name}</h2>
            <span>
                <i class="fas fa-${matchWeatherInfoToIcon(object.weather.main)}" style="font-size: 4.5em;"></i> 
            </span>
            <h3>
                <strong><span>${Math.round(object.main.temp) - 273}</span>&#176C <i class="fa fa-thermometer-full"
                        aria-hidden="true"></i></strong>
            </h3>
       `
    }

    const response = (res) => {
        let object = JSON.parse(res);
        console.log(object);
        basicWeather.innerHTML = createBasicDayInfoHTML(object);
        pressure.innerText = object.main.pressure;
        wind.innerText = object.wind.speed;
        humidity.innerText = object.main.humidity;
        clouds.innerText = object.clouds.all;
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
    httpRequestAsync(query, response);

};

module.exports.currentWeather = currentWeather;
