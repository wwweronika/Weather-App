/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 128);
/******/ })
/************************************************************************/
/******/ ({

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_css__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_css__);


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

/***/ }),

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(132);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(134)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../node_modules/css-loader/dist/cjs.js!./style.css", function() {
		var newContent = require("!!../node_modules/css-loader/dist/cjs.js!./style.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(133)(false);
// Module
exports.push([module.i, ".day-box {\n    border: 1px solid black;\n    width: 500px;\n    margin: 10px auto;\n    text-align: center;\n    padding: 10px;\n}", ""]);



/***/ }),

/***/ 133:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/kamil_nawrot/Documents/weather-forecast/node_modules/css-loader/dist/runtime/api.js'");

/***/ }),

/***/ 134:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/kamil_nawrot/Documents/weather-forecast/node_modules/style-loader/lib/addStyles.js'");

/***/ })

/******/ });