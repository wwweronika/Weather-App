const search = require('./search');
const fetch = require('node-fetch');

const city = search.getCity();

async function fetchData() {
    console.log('test start');
    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=c933a83cb569298458c0ad0176ec7f99`);
    const data = await response.json();
    console.log('test finished');
    return data;
}

async function separateData(data) {

    let parsedData = {
        date: [],
        tempKelvin: [],
        Fahrenheit: [],
        Celsius: [],
        pressure: [],
        humidity: [],
        wind: [],
        clouds: [],
        rain: []
    }

    data.list.map(el => {
        parsedData.date.push(el.dt);
        parsedData.tempKelvin.push(el.main.temp);
        parsedData.pressure.push(el.main.pressure);
        parsedData.humidity.push(el.main.humidity);
        parsedData.wind.push(el.wind.speed);
        parsedData.clouds.push(el.clouds.all);

        if (!el.rain) {
            parsedData.rain.push(0);
        } else {
            if (!(el.rain['3h'])) {
                parsedData.rain.push(0);
            } else {
                parsedData.rain.push(el.rain['3h']);
            }
        }
    });
    await converseDate(data, parsedData);
    convertTemp(parsedData);
    //console.log(parsedData.Celsius);
    //console.log(parsedData.Fahrenheit);
    return parsedData;
}

async function converseDate(data, parsedData) {
    const latitude = data.city.coord.lat;
    const longitude = data.city.coord.lon;
    const timeOffset = await getTimeZone(latitude, longitude);
    //console.log(timeOffset);
    const formatter = new Intl.DateTimeFormat('pl', {
        timeZone: 'UTC',
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    parsedData.date = parsedData.date.map(el => {
        return el = formatter.format((el + timeOffset) * 1000);
    })
    //console.log(`latitude: ${latitude}, longitude: ${longitude}`);
    //console.log(parsedData.date);
}
async function getTimeZone(latitude, longitude) {
    //console.log(`http://api.timezonedb.com/v2.1/get-time-zone?key=W97YYIYLLH1U&format=json&by=position&lat=${latitude}&lng=${longitude}`);
    let response = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=W97YYIYLLH1U&format=json&by=position&lat=${latitude}&lng=${longitude}`);

    let jsondata = await response.json();
    const timeOffset = jsondata.gmtOffset;
    return timeOffset;
}
function convertTemp(parsedData) {
    parsedData.Celsius = parsedData.tempKelvin.map(el => {
        return (el - 273.15).toFixed(2);
    });
    parsedData.Fahrenheit = parsedData.tempKelvin.map(el => {
        return ((el * 9 / 5) - 459.67).toFixed(2);
    });
}

async function getData() {
    const data =  await fetchData();
    const parsedData = await separateData(data);
    return parsedData;
}
module.exports.getData = getData;