const fetcher = require('./fetchdata.js');
const chartCreator = require('./chartcreator.js');


//let tempCelsiusFlag = true;


async function main(cityInput = 'Wroclaw') {
    const city = cityInput;
    const fetchedData = await fetcher.getData(city);
    //console.log(fetchedData);
    const chart = await chartCreator.drawCharts(fetchedData, fetchedData.Celsius, '(C)');
    return fetchedData; 
}


const chartData = main('London');

/* document.getElementById("btn-temperature").addEventListener("click", () => {
    if (tempCelsiusFlag === true) {
        tempCelsiusFlag = false;
        console.log(`Flag: ${tempCelsiusFlag}`);
        
        //myLineChart.destroy();
        chartCreator.drawCharts(fetchedData, fetchedData.Fahnrenheit, '(F)');
    } else {
        tempCelsiusFlag = true;
        console.log(`Flag: ${tempCelsiusFlag}`);
        //myLineChart.destroy();
        chartCreator.drawCharts(fetchedData, fetchedData.Celsius, '(C)');
    }
}); */

