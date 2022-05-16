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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var columnsWrapper = document.getElementById('color-scheme-app--colors');
var colorPicker = document.getElementById('color-picker');
var colorSubmit = document.getElementById('color-submit');
var copiedColorMessage = document.getElementById('copied-color-message');
var baseUrl = 'https://www.thecolorapi.com/scheme';
var numberColors = '&count=5';
var colorModeSelector = document.getElementById('color-mode-selector');

var colorValue = colorPicker.value.replace('#', '?hex=');
var mode = '&mode=monochrome';
var mainUrl = '' + baseUrl + colorValue + mode + numberColors;
console.log(mainUrl + ' ' + colorValue + ' ' + colorPicker.value);

function updateVariables() {
    colorValue = colorPicker.value.replace('#', '?hex=');
    mode = '&mode=' + colorModeSelector.value;
    mainUrl = '' + baseUrl + colorValue + mode + numberColors;
}

getScheme();

colorPicker.addEventListener('input', function () {
    updateVariables();
});

colorModeSelector.addEventListener('input', function () {
    updateVariables();
});

colorSubmit.addEventListener('click', function () {
    getScheme();
});

columnsWrapper.addEventListener('click', function (e) {
    console.log(e.target.innerText);
    navigator.clipboard.writeText(e.target.innerText);
    copiedColorMessage.classList.add('show');
    copiedColorMessage.textContent = '\n        ' + e.target.innerText + ' copied to clipboard\n    ';
    removeClipboardMessage();
});

function removeClipboardMessage() {
    setTimeout(function () {
        copiedColorMessage.classList.remove('show');
    }, 1500);
}

function getScheme() {
    fetch(mainUrl).then(function (res) {
        return res.json();
    }).then(function (data) {
        var getColumnHtml = '';
        for (var i = 0; i < data.colors.length; i++) {
            var colorColumnHtml = '\n                    <div class="color-scheme-app--colors--column">\n                        <div class="color-scheme-app--colors--color" style="background-color: ' + data.colors[i].hex.value + '">\n                            <span class="sr-only">' + data.colors[i].hex.value + '</span>\n                        </div>\n                        <div class="color-scheme-app--colors--color--footer">\n                            <p>' + data.colors[i].hex.value + '</p>\n                        </div>\n                    </div>\n                ';
            getColumnHtml += colorColumnHtml;
        }
        columnsWrapper.innerHTML = getColumnHtml;
    });
}

/***/ })
/******/ ]);