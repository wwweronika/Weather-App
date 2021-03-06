const Chart = require('chart.js');

async function drawCharts(parsedData, tempFormat, tempName) {
    let data = {
        labels: parsedData.date,
        datasets: [{
                label: `Temperature ${tempName}`,
                borderColor: 'rgba(236, 115, 87, 0.7)',
                pointBorderColor: 'rgba(236, 115, 87, 0.7)',
                borderWidth: 2,
                fill: false,
                backgroundColor: 'rgba(236, 115, 87, 0.1)',
                pointRadius: 4,
                pointBorderWidth: 1,
                pointBackgroundColor: 'rgba(255, 255, 255, 1)',
                pointHoverRadius: 4,
                pointHoverBorderWidth: 3,
                pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
                pointHoverBorderColor: 'rgba(236, 115, 87, 1)',
                data: tempFormat,
                yAxisID: "yTemperature",
                type: 'line'
            },
            {
                label: "Humidity",
                borderColor: 'rgba(62, 108, 230, 0.9)',
                pointBorderColor: 'rgba(62, 108, 230, 0.7)',
                borderWidth: 2,
                fill: false,
                backgroundColor: 'rgba(236, 115, 87, 0.1)',
                pointRadius: 4,
                pointBorderWidth: 1,
                pointBackgroundColor: 'rgba(255, 255, 255, 1)',
                pointHoverRadius: 4,
                pointHoverBorderWidth: 3,
                pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
                pointHoverBorderColor: 'rgba(62, 108, 230, 1)',
                data: parsedData.humidity,
                yAxisID: "yPercent",
                type: 'line'
            },
            {
                label: "Pressure",
                borderColor: 'rgba(75,192,192, 0.7)',
                pointBorderColor: 'rgba(75,192,192, 0.7)',
                borderWidth: 2,
                fill: false,
                backgroundColor: 'rgba(236, 115, 87, 0.1)',
                pointRadius: 4,
                pointBorderWidth: 1,
                pointBackgroundColor: 'rgba(255, 255, 255, 1)',
                pointHoverRadius: 4,
                pointHoverBorderWidth: 3,
                pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
                pointHoverBorderColor: 'rgba(75,192,192, 1)',
                data: parsedData.pressure,
                type: 'line',
                yAxisID: 'yPressure'
            },
            {
                label: "Wind",
                borderColor: 'rgba(188, 136, 66, 0.7)',
                pointBorderColor: 'rgba(188, 136, 66, 0.7)',
                borderWidth: 2,
                fill: false,
                backgroundColor: 'rgba(236, 115, 87, 0.1)',
                pointRadius: 4,
                pointBorderWidth: 1,
                pointBackgroundColor: 'rgba(255, 255, 255, 1)',
                pointHoverRadius: 4,
                pointHoverBorderWidth: 3,
                pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
                pointHoverBorderColor: 'rgba(188, 136, 66, 1)',
                data: parsedData.wind,
                type: 'line',
                yAxisID: 'yWind'
            },
            {
                label: "Clouds",
                borderColor: 'rgba(170,170,170,0.7)',
                pointBorderColor: 'rgba(170,170,170,0.5)',
                borderWidth: 2,
                fill: true,
                backgroundColor: 'rgba(170,170,170,0.3)',
                pointRadius: 4,
                pointBorderWidth: 1,
                pointBackgroundColor: 'rgba(255, 255, 255, 1)',
                pointHoverRadius: 4,
                pointHoverBorderWidth: 3,
                pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
                pointHoverBorderColor: 'rgba(170,170,170,0.5)',
                data: parsedData.clouds,
                yAxisID: 'yPercent'
            },
            {
                label: "Rain",
                borderColor: 'rgba(92, 139, 188, 0.7)',
                pointBorderColor: 'rgba(92, 139, 188, 0.5)',
                borderWidth: 2,
                fill: true,
                backgroundColor: 'rgba(92, 139, 188, 0.3)',
                pointRadius: 4,
                pointBorderWidth: 1,
                pointBackgroundColor: 'rgba(255, 255, 255, 1)',
                pointHoverRadius: 4,
                pointHoverBorderWidth: 3,
                pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
                pointHoverBorderColor: 'rgba(92, 139, 188, 0.5)',
                data: parsedData.rain,
                yAxisID: 'yRain'
            }
        ]
    };
    let options = {
        animation: {
            easing: "easeOutCubic",
            duration: 700
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            position: 'bottom',
            display: true
        },
        tooltips: {
            enabled: true
        },
        scales: {
            xAxes: [{
                gridLines: {
                    zeroLineWidth: 1,
                    zeroLineColor: 'rgba (0, 0, 0, 0.3)',
                    color: 'rgba(0, 0, 0, 0.05)',
                    lineWidth: 1,
                    drawOnChartArea: true
                },
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Time',
                    fontSize: 16,
                    fontColor: 'black',
                    fontStyle: 'bold',
                    fontFamily: "Encode Sans Expanded"
                },
                ticks: { 
                    fontSize: 10
                },
                labelFormatter: (e) => {
                    return "x: " + e.value;
                }
            }],
            yAxes: [{
                    gridLines: {
                       drawOnChartArea: false
                    },
                    display: true,
                    position: 'left',
                    scaleLabel: {
                        display: true,
                        labelString: 'degrees',
                        fontSize: 16,
                        fontColor: 'black',
                        fonstyle: 'bold',
                        fontFamily: "Encode Sans Expanded"
                    },
                    ticks: {
                        fontSize: 10,
                        min: Math.floor(Math.min.apply(this, tempFormat) - 3),
                        max: Math.ceil(Math.max.apply(this, tempFormat) + 3),
                    },
                    id: 'yTemperature'
                }, {
                    gridLines: {
                        drawOnChartArea: false
                    },
                    display: true,
                    position: 'left',
                    scaleLabel: {
                        display: true,
                        labelString: 'percents',
                        fontSize: 16,
                        fontColor: 'black',
                        fonstyle: 'bold',
                        fontFamily: "Encode Sans Expanded"
                    },
                    ticks: {
                        fontSize: 10,
                        min: 0,
                        max: 100
                    },
                    id: 'yPercent'
                },
                {
                    gridLines: {
                        drawOnChartArea: false
                    },
                    display: true,
                    position: 'right',
                    scaleLabel: {
                        display: true,
                        labelString: 'hPa',
                        fontSize: 16,
                        fontColor: 'black',
                        fonstyle: 'bold',
                        fontFamily: "Encode Sans Expanded"
                    },
                    ticks: {
                        fontSize: 10,
                        min: Math.floor(Math.min.apply(this, parsedData.pressure) - 3),
                        max: Math.ceil(Math.max.apply(this, parsedData.pressure) + 3),
                    },
                    id: 'yPressure'
                },
                {
                    gridLines: {
                        drawOnChartArea: false
                    },
                    display: true,
                    position: 'right',
                    scaleLabel: {
                        display: true,
                        labelString: 'm/s',
                        fontSize: 16,
                        fontColor: 'black',
                        fonstyle: 'bold',
                        fontFamily: "Encode Sans Expanded"
                    },
                    ticks: {
                        fontSize: 10,
                        min: Math.floor(Math.min.apply(this, parsedData.wind) - 3),
                        max: Math.ceil(Math.max.apply(this, parsedData.wind) + 3),
                    },
                    id: 'yWind'
                },
                {
                    gridLines: {
                        drawOnChartArea: false
                    },
                    display: true,
                    position: 'left',
                    scaleLabel: {
                        display: true,
                        labelString: 'mm',
                        fontSize: 16,
                        fontColor: 'black',
                        fonstyle: 'bold',
                        fontFamily: "Encode Sans Expanded"
                    },
                    ticks: {
                        fontSize: 10,
                        min: 0,
                        max: Math.ceil(Math.max.apply(this, parsedData.rain) + 1),
                    },
                    id: 'yRain'
                }
            ]
        },
        title: {
            display: true,
            text: "Weather for next 5 days",
            fontSize: 24,
            fontFamily: "Encode Sans Expanded",
            fontColor: 'black',
        }

    };
    
  
    if (typeof myLineChart != 'undefined') {
        console.log(myLineChart);
        myLineChart.destroy();
        myLineChart = null;
        console.log('destroyed');
        console.log(myLineChart);
    } 
    
    const ctx = document.getElementById("chart-box").getContext("2d");
    myLineChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });

    return myLineChart;
}

module.exports.drawCharts = drawCharts;