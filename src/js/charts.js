const fetcher = require('./fetchdata.js');
const chartCreator = require('./chartcreator.js');



async function main() {
    const fetchedData = await fetcher.getData();
    console.log(fetchedData);
    //const chart = await chartCreator.drawCharts();
    //return chart;
    
}



main();