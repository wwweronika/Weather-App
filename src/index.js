import './style.css';

const API_KEY = '0a07712c459a768a3181478df78c4608';
const BASE_QUERY = 'https://api.openweathermap.org/data/2.5/forecast';

class Day
{
    constructor (date, time, temperature = 293.15, humidity = 50, 
                 wind = 0, pressure = 1013, weather = "Clear")
    {
        this.date = date;
        this.time = time;
        this.temperature = temperature;
        this.humidity = humidity;
        this.wind = wind;
        this.pressure = pressure;
        // Thunderstorm, Drizzle, Rain, Snow, Clear, Clouds
        this.weather = weather;
    }

    displayInfo()
    {
        console.log(this);
        var dayBox = document.createElement('div');
        dayBox.classList.add("day-box");
        document.body.appendChild(dayBox);
        dayBox.appendChild(document.createTextNode(this.date));
        dayBox.innerHTML += '<br>';
        dayBox.appendChild(document.createTextNode(this.time));
        dayBox.innerHTML += '<br>';
        dayBox.appendChild(document.createTextNode('TEMPERATURE: ' + this.temperature + 'K'));
        dayBox.innerHTML += '<br>';
        dayBox.appendChild(document.createTextNode('HUMIDITY: ' + this.humidity + '%'));
        dayBox.innerHTML += '<br>';
        dayBox.appendChild(document.createTextNode('WIND SPEED: ' + this.wind + 'km/h'));
        dayBox.innerHTML += '<br>';
        dayBox.appendChild(document.createTextNode('PRESSURE: ' + this.pressure + 'hPa'));
    }
}

var days = [];

const city = "London";
fetch(BASE_QUERY + "?q=" + city + "&APPID=" + API_KEY + "&mode=json")
    .then (resp => resp.json())
    .then (weatherData => {
        let date, time, temperature, humidity, wind, pressure, weather;
        for (let i=1; i<=3; i++) {
            date = weatherData.list[8*i].dt_txt.substr(0,10);
            time = weatherData.list[8*i].dt_txt.substr(11, 5);
            temperature = weatherData.list[8*i].main.temp;
            humidity = weatherData.list[8*i].main.humidity;
            wind = weatherData.list[8*i].wind.speed;
            pressure = weatherData.list[8*i].main.pressure;
            weather = weatherData.list[8*i].weather[0].main;
            days.push(new Day(date, time, temperature, humidity, wind, pressure, weather));
        }   
        days[0].displayInfo();
        days[1].displayInfo();
        days[2].displayInfo();
    });