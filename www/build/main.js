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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_reset_css__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_reset_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__styles_reset_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_main_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_main_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__styles_main_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Translator__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Modal__ = __webpack_require__(17);






var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        window.modal = new __WEBPACK_IMPORTED_MODULE_3__components_Modal__["a" /* default */]();

        var translator = new __WEBPACK_IMPORTED_MODULE_2__components_Translator__["a" /* default */]({
            parentNode: '.translator',
            iconNode: '.translator--icon',
            btnNode: '.translator--btn',
            loaderNode: '.translator--loader',

            classes: {
                activeIcon: 'translator--icon-active',
                text: 'answer--text',
                error: 'answer--error',
                buttonWrapper: 'answer--btn',
                button: 'btn',
                answer: 'answer',
            },
        });
        translator.init();
    },
};

app.initialize();


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Translator;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_speechRecognition__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_detectionOS__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_speak__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_css__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__style_css__);







var isIOS = Object(__WEBPACK_IMPORTED_MODULE_2__utils_detectionOS__["a" /* default */])() === 'iOS';

/**
 * [Translator create a translator, when you can click by a button and give English translate.
 * also you can pronounce english translate.]
 * @param {Object} ops { parentNode, iconNode, btnNode, loaderNode, classes }
 */
function Translator(ops) {
    this.parentNode = document.querySelector(ops.parentNode);
    this.iconNode = this.parentNode.querySelector(ops.iconNode);
    this.btnNode = this.parentNode.querySelector(ops.btnNode);
    this.loaderNode = this.parentNode.querySelector(ops.loaderNode)

    this.classes = ops.classes;
}

Translator.prototype = Object.assign(Translator.prototype, {
    /**
     * [init Translator]
     */
    init: function () {
        if (this.parentNode.dataset.initedTranslator) return;
        this.parentNode.dataset.initedTranslator = true;

        this.stop = this.stop.bind(this);
        this.start = this.start.bind(this);
        this.speak = this.speak.bind(this);
        this.startIOS = this.startIOS.bind(this);
        this.showAnswerInModal = this.showAnswerInModal.bind(this);
        this.showErrorInModal = this.showErrorInModal.bind(this);

        this.isSpeechStarted = false;
        this.events();
    },

    /**
     * [events init all eventh]
     */
    events: function () {
        __WEBPACK_IMPORTED_MODULE_0__utils_speechRecognition__["a" /* default */].requestPermission();

        var start = isIOS ? this.startIOS : this.start;
        this.btnNode.addEventListener('click', start);
    },

    /**
     * [startIOS for ios start have some difference]
     * @return {[type]} [description]
     */
    startIOS: function () {
        if (this.isSpeechStarted) {
            __WEBPACK_IMPORTED_MODULE_0__utils_speechRecognition__["a" /* default */].stopListening();
            this.isSpeechStarted = false;
        } else {
            this.isSpeechStarted = true;
            this.btnNode.innerHTML = 'Остановить';
            this.start();
        }
    },

    /**
     * [start common start]
     */
    start: function () {
        if (!isIOS) this.btnNode.disabled = true;
        this.iconNode.classList.add(this.classes.activeIcon);

        __WEBPACK_IMPORTED_MODULE_0__utils_speechRecognition__["a" /* default */].hasPermission()
            .then(__WEBPACK_IMPORTED_MODULE_0__utils_speechRecognition__["a" /* default */].startListening)
            .then(this.stop)
            .catch(this.showErrorInModal.bind(this, 'Фраза не распознана.'));
    },

    /**
     * [stop stop speaking and catch errors]
     * @param  {Array} data [Array of translated. The first element is more relevant.]
     */
    stop: function (data) {
        this.clearStyles();
        this.loaderNode.style.display = 'block';

        Object(__WEBPACK_IMPORTED_MODULE_1__utils_api__["a" /* default */])({
            method: 'POST',
            url: 'https://translate.yandex.net/api/v1.5/tr.json/translate?' +
                 'key='+ encodeURIComponent('trnsl.1.1.20170723T140206Z.abdacee94ec6046d.4da303836a8864d67d556ed472a2a1328ffc486e') + '&' +
                 'lang=ru-en&' +
                 'text=' + encodeURIComponent(data[0]),
        })
        .then(this.showAnswerInModal)
        .catch(this.showErrorInModal);
    },

    /**
     * [speak speak text in data]
     * @param  {String} data
     */
    speak: function (data) {
        var btnNode = this.btnSpeakNode;
        btnNode.disabled = true;

        __WEBPACK_IMPORTED_MODULE_3__utils_speak__["a" /* default */].start(data).then(function () {
            btnNode.disabled = false;
        }).catch(function () {
            btnNode.disabled = false;
        });
    },

    /**
     * [showAnswerInModal description]
     * @param  {[type]} response [description]
     * @return {[type]}          [description]
     */
    showAnswerInModal: function (response) {
        this.loaderNode.style.display = 'none';
        var text = response.text[0];

        modal.open(this.createAnswerHtml(text));
    },

    /**
     * [showErrorInModal show catched errors]
     */
    showErrorInModal: function (error) {
        this.clearStyles();
        this.loaderNode.style.display = 'none';
        var message = error instanceof Object && error.message
            ? error.message
            : error;

        modal.open(this.createErrorHtml(message));
    },

    /**
     * [clearStyles remove added styles when start speaking]
     */
    clearStyles: function () {
        if (isIOS) this.btnNode.innerHTML = 'Начать';
        else this.btnNode.disabled = false;

        this.iconNode.classList.remove(this.classes.activeIcon);
    },

    /**
     * [createAnswerHtml]
     * @param  {Object}  data
     * @return {HTML}
     */
    createAnswerHtml: function (data) {
        var classes = this.classes;
        var answer = document.createElement('div');

        // container
        answer.className = classes.answer;
        answer.innerHTML = (
            '<p class="' + classes.text + '">' + data + '</p>' +
            '<div class="' + classes.buttonWrapper + '">' +
                '<button class="' + classes.button + '">Воспроизвести</button>' +
            '</div>'
        );

        this.btnSpeakNode = answer.querySelector('.btn');
        this.btnSpeakNode.addEventListener('click', this.speak.bind(this, data));

        return answer;
    },

    /**
     * [createErrorHtml create modal with error]
     * @param  {String} data [text of error]
     */
    createErrorHtml: function (data) {
        var classes = this.classes;
        var answer = document.createElement('p');

        answer.className = classes.text + ' ' + classes.error;
        answer.innerHTML = data;

        return answer;
    }
});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var speechRecognition = {
    /**
     * [requestPermission wrapper by requestPermission]
     * @return {Promise}
     */
    requestPermission: function () {
        return new Promise(function (resolve, reject) {
            window.plugins.speechRecognition.requestPermission(resolve, reject);
        });
    },

    /**
     * [hasPermission wrapper by hasPermission]
     * @return {Promise}
     */
    hasPermission: function () {
        return new Promise(function (resolve, reject) {
            window.plugins.speechRecognition.hasPermission(resolve, reject);
        });
    },

    /**
     * [startListening wrapper by startListening]
     * @return {Promise}
     */
    startListening: function (ops) {
        var mergedOps = Object.assign({
            language: 'ru-RU',
            matches: 5,
            showPopup: false,
        }, ops || {});

        return new Promise(function (resolve, reject) {
            window.plugins.speechRecognition.startListening(resolve, reject, mergedOps);
        });
    },

    /**
     * [stopListening wrapper by stopListening]
     * @return {Promise}
     */
    stopListening: function () {
        return new Promise(function (resolve, reject) {
            window.plugins.speechRecognition.stopListening(resolve, reject);
        });
    }
};

/* harmony default export */ __webpack_exports__["a"] = (speechRecognition);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = API;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_xhr__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_xhr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_xhr__);


/**
 * [API you can send request]
 * @param {Any} ops [what are you want to send]
 */
function API(ops) {
  const sendObj = {
    body: ops.data ? JSON.stringify(ops.data) : '',
    method: ops.method || 'GET',
    url: ops.url,
    headers: {
      'Content-Type': ops.contentType || 'application/json',
    }
  };

  return new Promise(function (resolve, reject) {
    __WEBPACK_IMPORTED_MODULE_0_xhr___default()(sendObj, function (error, resp, body) {
      const answer = JSON.parse(body);
      if (error || (resp.statusCode !== 200 && resp.statusCode !== 201)) {
        return reject('Ошибка запроса.');
      }

      return resolve(answer);
    });
  });
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var window = __webpack_require__(8)
var isFunction = __webpack_require__(0)
var parseHeaders = __webpack_require__(10)
var xtend = __webpack_require__(13)

module.exports = createXHR
createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest

forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
        options = initParams(uri, options, callback)
        options.method = method.toUpperCase()
        return _createXHR(options)
    }
})

function forEachArray(array, iterator) {
    for (var i = 0; i < array.length; i++) {
        iterator(array[i])
    }
}

function isEmpty(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)) return false
    }
    return true
}

function initParams(uri, options, callback) {
    var params = uri

    if (isFunction(options)) {
        callback = options
        if (typeof uri === "string") {
            params = {uri:uri}
        }
    } else {
        params = xtend(options, {uri: uri})
    }

    params.callback = callback
    return params
}

function createXHR(uri, options, callback) {
    options = initParams(uri, options, callback)
    return _createXHR(options)
}

function _createXHR(options) {
    if(typeof options.callback === "undefined"){
        throw new Error("callback argument missing")
    }

    var called = false
    var callback = function cbOnce(err, response, body){
        if(!called){
            called = true
            options.callback(err, response, body)
        }
    }

    function readystatechange() {
        if (xhr.readyState === 4) {
            setTimeout(loadFunc, 0)
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = undefined

        if (xhr.response) {
            body = xhr.response
        } else {
            body = xhr.responseText || getXml(xhr)
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }

    function errorFunc(evt) {
        clearTimeout(timeoutTimer)
        if(!(evt instanceof Error)){
            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") )
        }
        evt.statusCode = 0
        return callback(evt, failureResponse)
    }

    // will load the data & process the response in a special response object
    function loadFunc() {
        if (aborted) return
        var status
        clearTimeout(timeoutTimer)
        if(options.useXDR && xhr.status===undefined) {
            //IE8 CORS GET successful response doesn't have a status field, but body is fine
            status = 200
        } else {
            status = (xhr.status === 1223 ? 204 : xhr.status)
        }
        var response = failureResponse
        var err = null

        if (status !== 0){
            response = {
                body: getBody(),
                statusCode: status,
                method: method,
                headers: {},
                url: uri,
                rawRequest: xhr
            }
            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
                response.headers = parseHeaders(xhr.getAllResponseHeaders())
            }
        } else {
            err = new Error("Internal XMLHttpRequest Error")
        }
        return callback(err, response, response.body)
    }

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new createXHR.XDomainRequest()
        }else{
            xhr = new createXHR.XMLHttpRequest()
        }
    }

    var key
    var aborted
    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var timeoutTimer
    var failureResponse = {
        body: undefined,
        headers: {},
        statusCode: 0,
        method: method,
        url: uri,
        rawRequest: xhr
    }

    if ("json" in options && options.json !== false) {
        isJson = true
        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
        if (method !== "GET" && method !== "HEAD") {
            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
            body = JSON.stringify(options.json === true ? body : options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = loadFunc
    xhr.onerror = errorFunc
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    xhr.onabort = function(){
        aborted = true;
    }
    xhr.ontimeout = errorFunc
    xhr.open(method, uri, !sync, options.username, options.password)
    //has to be after open
    if(!sync) {
        xhr.withCredentials = !!options.withCredentials
    }
    // Cannot set timeout with sync request
    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
    if (!sync && options.timeout > 0 ) {
        timeoutTimer = setTimeout(function(){
            if (aborted) return
            aborted = true//IE9 may still call readystatechange
            xhr.abort("timeout")
            var e = new Error("XMLHttpRequest timeout")
            e.code = "ETIMEDOUT"
            errorFunc(e)
        }, options.timeout )
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers && !isEmpty(options.headers)) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }

    if ("beforeSend" in options &&
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    // Microsoft Edge browser sends "undefined" when send is called with undefined value.
    // XMLHttpRequest spec says to pass null as body to indicate no body
    // See https://github.com/naugtur/xhr/issues/100.
    xhr.send(body || null)

    return xhr


}

function getXml(xhr) {
    if (xhr.responseType === "document") {
        return xhr.responseXML
    }
    var firefoxBugTakenEffect = xhr.responseXML && xhr.responseXML.documentElement.nodeName === "parsererror"
    if (xhr.responseType === "" && !firefoxBugTakenEffect) {
        return xhr.responseXML
    }

    return null
}

function noop() {}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var trim = __webpack_require__(11)
  , forEach = __webpack_require__(12)
  , isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }

module.exports = function (headers) {
  if (!headers)
    return {}

  var result = {}

  forEach(
      trim(headers).split('\n')
    , function (row) {
        var index = row.indexOf(':')
          , key = trim(row.slice(0, index)).toLowerCase()
          , value = trim(row.slice(index + 1))

        if (typeof(result[key]) === 'undefined') {
          result[key] = value
        } else if (isArray(result[key])) {
          result[key].push(value)
        } else {
          result[key] = [ result[key], value ]
        }
      }
  )

  return result
}

/***/ }),
/* 11 */
/***/ (function(module, exports) {


exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(0)

module.exports = forEach

var toString = Object.prototype.toString
var hasOwnProperty = Object.prototype.hasOwnProperty

function forEach(list, iterator, context) {
    if (!isFunction(iterator)) {
        throw new TypeError('iterator must be a function')
    }

    if (arguments.length < 3) {
        context = this
    }
    
    if (toString.call(list) === '[object Array]')
        forEachArray(list, iterator, context)
    else if (typeof list === 'string')
        forEachString(list, iterator, context)
    else
        forEachObject(list, iterator, context)
}

function forEachArray(array, iterator, context) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            iterator.call(context, array[i], i, array)
        }
    }
}

function forEachString(string, iterator, context) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        iterator.call(context, string.charAt(i), i, string)
    }
}

function forEachObject(object, iterator, context) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            iterator.call(context, object[k], k, object)
        }
    }
}


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getMobileOperatingSystem;
/**
 * [getMobileOperatingSystem detected Android or IOS]
 * @return {String} [type device]
 */
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * [speak object has methods for works with TTS plugin]
 */
var speak = {
    start: function (text) {
        return new Promise(function (resolve, reject) {
            TTS.speak(text, resolve, reject);
        });
    },
};

/* harmony default export */ __webpack_exports__["a"] = (speak);


/***/ }),
/* 16 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Modal;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_css__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_css__);


/**
 * [Modal show any content in Modal. Put in html at once for init and then use the html.]
 */
function Modal() {
    var modalNode = document.querySelector('.modal');
    if (modalNode) return;

    this.addModalToHTML();
    this.initVarsModal();
    this.events();
}

Modal.prototype = Object.assign(Modal.prototype, {
    /**
     * [addModalToHTML create html]
     */
    addModalToHTML: function () {
        var modalNode = document.querySelector('.modal');
        if (modalNode) return;

        var modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = (
          '<div class="modal--wrapper">' +
            '<div class="modal--close"></div>' +
            '<div class="modal--container"></div>' +
          '</div>'
        );
        document.body.appendChild(modal);
    },

    /**
     * [initVarsModal]
     */
    initVarsModal: function () {
      this.modalNode = document.querySelector('.modal');
      this.modalContentNode = document.querySelector('.modal--container');
      this.modalCloseNode = document.querySelector('.modal--close');

      this.close = this.close.bind(this);
    },

    /**
     * [events init all need events]
     */
    events: function () {
      this.modalCloseNode.addEventListener('click', this.close);
    },

    /**
     * [open modal]
     * @param  {Element html} html [description]
     */
    open: function (html) {
      this.modalNode.style.display = 'block';
      this.modalContentNode.append(html);
    },

    /**
     * [close modal]
     */
    close: function () {
      this.modalContentNode.innerHTML = '';
      this.modalNode.style.display = 'none';
    },
});


/***/ }),
/* 18 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);