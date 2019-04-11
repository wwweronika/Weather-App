const fetcher = require('./fetchdata.js');
const chartCreator = require('./chartcreator.js');

async function chart(cityInput = 'Wroclaw') {
    const city = cityInput;
    const fetchedData = await fetcher.getData(city);
    const chart = await chartCreator.drawCharts(fetchedData, fetchedData.Celsius, '(C)');
}

module.exports.chart = chart;



