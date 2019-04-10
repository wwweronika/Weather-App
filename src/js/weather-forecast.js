function weatherForecast(city) {
    const API_KEY = '0a07712c459a768a3181478df78c4608';
    const BASE_QUERY = 'https://api.openweathermap.org/data/2.5/forecast';

    class Day {
        constructor(date, time, temperature = 293.15, humidity = 50,
            wind = 0, pressure = 1013, weather = "Clear", clouds = 50) {
            this.date = date;
            this.time = time;
            this.temperature = temperature;
            this.humidity = humidity;
            this.wind = wind;
            this.pressure = pressure;
            this.weather = weather;
            this.clouds = clouds;
        }


        convertDateToCurrentDay(date) {
            const day = new Date(Date.parse(date));
            return this.matchDayByNumber(day.getDay());
        }

        matchDayByNumber(number) {
            switch (number) {
                case 1:
                    return 'Monday';
                case 2:
                    return 'Tuesday';
                case 3:
                    return 'Wednesday';
                case 4:
                    return 'Thursday';
                case 5:
                    return 'Friday';
                case 6:
                    return 'Saturday';
                case 0:
                    return 'Sunday';
            }

        }

        matchWeatherInfoToIcon(weatherInfo) {

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

        createBasicDayInfoHTML() { //todo: think about moving out inline styling to css class
            return `                    
            <h2>${this.convertDateToCurrentDay(this.date)}</h2>
            <span>
                <i class="fas fa-${this.matchWeatherInfoToIcon(this.weather)}" style="font-size: 4.5em;"></i> 
            </span>
            <h3>
                <strong><span>${Math.round(this.temperature) - 273}</span>&#176C <i class="fa fa-thermometer-full"
                        aria-hidden="true"></i></strong>
            </h3>
       `
        }

        createAdvancedDayInfoHTML() {
            return `   
        <h4>pressure: <span>${this.pressure}</span> [hPa]</h4>
        <h4>humidity: <span>${this.humidity}</span> [%]</p>
        <h4>wind: <span>${this.wind}</span> [m/s]</h4>
        <h4>clouds: <span>${this.clouds}</span> [%]</h4>
        `
        }

        displayInfo() {
            const dayBox = document.querySelector('.three-days');
            const day = document.createElement('div');
            day.classList.add('next-day');

            const basicInfo = document.createElement('div');
            basicInfo.classList.add('next-day-basic-info');
            basicInfo.innerHTML = this.createBasicDayInfoHTML();

            const advancedInfo = document.createElement('div');
            advancedInfo.classList.add('next-day-advanced-info');
            advancedInfo.innerHTML = this.createAdvancedDayInfoHTML();

            day.appendChild(basicInfo);
            day.appendChild(advancedInfo);
            dayBox.appendChild(day);
        }
    }

    var days = [];
    fetch(BASE_QUERY + "?q=" + city + "&APPID=" + API_KEY + "&mode=json")
        .then(resp => resp.json())
        .then(weatherData => {
            let date, time, temperature, humidity, wind, pressure, weather;
            for (let i = 1; i <= 3; i++) {
                date = weatherData.list[8 * i].dt_txt.substr(0, 10);
                time = weatherData.list[8 * i].dt_txt.substr(11, 5);
                temperature = weatherData.list[8 * i].main.temp;
                humidity = weatherData.list[8 * i].main.humidity;
                wind = weatherData.list[8 * i].wind.speed;
                pressure = weatherData.list[8 * i].main.pressure;
                weather = weatherData.list[8 * i].weather[0].main;
                clouds = weatherData.list[8 * i].clouds.all;
                days.push(new Day(date, time, temperature, humidity, wind, pressure, weather, clouds));
            }
        
            const dayBox = document.querySelector('.three-days');
            while (dayBox.firstChild) dayBox.removeChild(dayBox.firstChild);
            days.forEach((e) => {
                e.displayInfo();
            })

        });
}

module.exports.weatherForecast = weatherForecast;
