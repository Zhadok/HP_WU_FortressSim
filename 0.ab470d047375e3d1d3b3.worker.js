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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/@ngtools/webpack/src/index.js!./src/app/app.worker.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/brackets2dots/index.js":
/*!**********************************************!*\
  !*** ../node_modules/brackets2dots/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
 * exports.
 */

module.exports = brackets2dots;

/*!
 * regexp patterns.
 */

var REPLACE_BRACKETS = /\[([^\[\]]+)\]/g;
var LFT_RT_TRIM_DOTS = /^[.]*|[.]*$/g;

/**
 * Convert string with bracket notation to dot property notation.
 *
 * ### Examples:
 *
 *      brackets2dots('group[0].section.a.seat[3]')
 *      //=> 'group.0.section.a.seat.3'
 *
 *      brackets2dots('[0].section.a.seat[3]')
 *      //=> '0.section.a.seat.3'
 *
 *      brackets2dots('people[*].age')
 *      //=> 'people.*.age'
 *
 * @param  {String} string
 * original string
 *
 * @return {String}
 * dot/bracket-notation string
 */

function brackets2dots(string) {
  return ({}).toString.call(string) == '[object String]'
       ? string.replace(REPLACE_BRACKETS, '.$1').replace(LFT_RT_TRIM_DOTS, '')
       : ''
}


/***/ }),

/***/ "../node_modules/clone/clone.js":
/*!**************************************!*\
  !*** ../node_modules/clone/clone.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var clone = (function() {
'use strict';

function _instanceof(obj, type) {
  return type != null && obj instanceof type;
}

var nativeMap;
try {
  nativeMap = Map;
} catch(_) {
  // maybe a reference error because no `Map`. Give it a dummy value that no
  // value will ever be an instanceof.
  nativeMap = function() {};
}

var nativeSet;
try {
  nativeSet = Set;
} catch(_) {
  nativeSet = function() {};
}

var nativePromise;
try {
  nativePromise = Promise;
} catch(_) {
  nativePromise = function() {};
}

/**
 * Clones (copies) an Object using deep copying.
 *
 * This function supports circular references by default, but if you are certain
 * there are no circular references in your object, you can save some CPU time
 * by calling clone(obj, false).
 *
 * Caution: if `circular` is false and `parent` contains circular references,
 * your program may enter an infinite loop and crash.
 *
 * @param `parent` - the object to be cloned
 * @param `circular` - set to true if the object to be cloned may contain
 *    circular references. (optional - true by default)
 * @param `depth` - set to a number if the object is only to be cloned to
 *    a particular depth. (optional - defaults to Infinity)
 * @param `prototype` - sets the prototype to be used when cloning an object.
 *    (optional - defaults to parent prototype).
 * @param `includeNonEnumerable` - set to true if the non-enumerable properties
 *    should be cloned as well. Non-enumerable properties on the prototype
 *    chain will be ignored. (optional - false by default)
*/
function clone(parent, circular, depth, prototype, includeNonEnumerable) {
  if (typeof circular === 'object') {
    depth = circular.depth;
    prototype = circular.prototype;
    includeNonEnumerable = circular.includeNonEnumerable;
    circular = circular.circular;
  }
  // maintain two arrays for circular references, where corresponding parents
  // and children have the same index
  var allParents = [];
  var allChildren = [];

  var useBuffer = typeof Buffer != 'undefined';

  if (typeof circular == 'undefined')
    circular = true;

  if (typeof depth == 'undefined')
    depth = Infinity;

  // recurse this function so we don't reset allParents and allChildren
  function _clone(parent, depth) {
    // cloning null always returns null
    if (parent === null)
      return null;

    if (depth === 0)
      return parent;

    var child;
    var proto;
    if (typeof parent != 'object') {
      return parent;
    }

    if (_instanceof(parent, nativeMap)) {
      child = new nativeMap();
    } else if (_instanceof(parent, nativeSet)) {
      child = new nativeSet();
    } else if (_instanceof(parent, nativePromise)) {
      child = new nativePromise(function (resolve, reject) {
        parent.then(function(value) {
          resolve(_clone(value, depth - 1));
        }, function(err) {
          reject(_clone(err, depth - 1));
        });
      });
    } else if (clone.__isArray(parent)) {
      child = [];
    } else if (clone.__isRegExp(parent)) {
      child = new RegExp(parent.source, __getRegExpFlags(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (clone.__isDate(parent)) {
      child = new Date(parent.getTime());
    } else if (useBuffer && Buffer.isBuffer(parent)) {
      if (Buffer.allocUnsafe) {
        // Node.js >= 4.5.0
        child = Buffer.allocUnsafe(parent.length);
      } else {
        // Older Node.js versions
        child = new Buffer(parent.length);
      }
      parent.copy(child);
      return child;
    } else if (_instanceof(parent, Error)) {
      child = Object.create(parent);
    } else {
      if (typeof prototype == 'undefined') {
        proto = Object.getPrototypeOf(parent);
        child = Object.create(proto);
      }
      else {
        child = Object.create(prototype);
        proto = prototype;
      }
    }

    if (circular) {
      var index = allParents.indexOf(parent);

      if (index != -1) {
        return allChildren[index];
      }
      allParents.push(parent);
      allChildren.push(child);
    }

    if (_instanceof(parent, nativeMap)) {
      parent.forEach(function(value, key) {
        var keyChild = _clone(key, depth - 1);
        var valueChild = _clone(value, depth - 1);
        child.set(keyChild, valueChild);
      });
    }
    if (_instanceof(parent, nativeSet)) {
      parent.forEach(function(value) {
        var entryChild = _clone(value, depth - 1);
        child.add(entryChild);
      });
    }

    for (var i in parent) {
      var attrs;
      if (proto) {
        attrs = Object.getOwnPropertyDescriptor(proto, i);
      }

      if (attrs && attrs.set == null) {
        continue;
      }
      child[i] = _clone(parent[i], depth - 1);
    }

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(parent);
      for (var i = 0; i < symbols.length; i++) {
        // Don't need to worry about cloning a symbol because it is a primitive,
        // like a number or string.
        var symbol = symbols[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
        if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
          continue;
        }
        child[symbol] = _clone(parent[symbol], depth - 1);
        if (!descriptor.enumerable) {
          Object.defineProperty(child, symbol, {
            enumerable: false
          });
        }
      }
    }

    if (includeNonEnumerable) {
      var allPropertyNames = Object.getOwnPropertyNames(parent);
      for (var i = 0; i < allPropertyNames.length; i++) {
        var propertyName = allPropertyNames[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
        if (descriptor && descriptor.enumerable) {
          continue;
        }
        child[propertyName] = _clone(parent[propertyName], depth - 1);
        Object.defineProperty(child, propertyName, {
          enumerable: false
        });
      }
    }

    return child;
  }

  return _clone(parent, depth);
}

/**
 * Simple flat clone using prototype, accepts only objects, usefull for property
 * override on FLAT configuration object (no nested props).
 *
 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
 * works.
 */
clone.clonePrototype = function clonePrototype(parent) {
  if (parent === null)
    return null;

  var c = function () {};
  c.prototype = parent;
  return new c();
};

// private utility functions

function __objToStr(o) {
  return Object.prototype.toString.call(o);
}
clone.__objToStr = __objToStr;

function __isDate(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Date]';
}
clone.__isDate = __isDate;

function __isArray(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Array]';
}
clone.__isArray = __isArray;

function __isRegExp(o) {
  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
}
clone.__isRegExp = __isRegExp;

function __getRegExpFlags(re) {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
}
clone.__getRegExpFlags = __getRegExpFlags;

return clone;
})();

if ( true && module.exports) {
  module.exports = clone;
}


/***/ }),

/***/ "../node_modules/curry2/index.js":
/*!***************************************!*\
  !*** ../node_modules/curry2/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
 * imports.
 */

var bind = Function.prototype.bind || __webpack_require__(/*! fast-bind */ "../node_modules/fast-bind/bind-loop.js")

/*!
 * exports.
 */

module.exports = curry2

/**
 * Curry a binary function.
 *
 * @param {Function} fn
 * Binary function to curry.
 *
 * @param {Object} [self]
 * Function `this` context.
 *
 * @return {Function|*}
 * If partially applied, return unary function, otherwise, return result of full application.
 */

function curry2 (fn, self) {
  var out = function () {
    if (arguments.length === 0) return out

    return arguments.length > 1
      ? fn.apply(self, arguments)
      : bind.call(fn, self, arguments[0])
  }

  out.uncurry = function uncurry () {
    return fn
  }

  return out
}


/***/ }),

/***/ "../node_modules/debug/node_modules/ms/index.js":
/*!******************************************************!*\
  !*** ../node_modules/debug/node_modules/ms/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ "../node_modules/debug/src/browser.js":
/*!********************************************!*\
  !*** ../node_modules/debug/src/browser.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */
// eslint-disable-next-line complexity

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
    return true;
  } // Internet Explorer and Edge do not support colors.


  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  } // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

  if (!this.useColors) {
    return;
  }

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into

  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if (match === '%%') {
      return;
    }

    index++;

    if (match === '%c') {
      // We only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}
/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */


function log() {
  var _console;

  // This hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  try {
    if (namespaces) {
      exports.storage.setItem('debug', namespaces);
    } else {
      exports.storage.removeItem('debug');
    }
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  var r;

  try {
    r = exports.storage.getItem('debug');
  } catch (error) {} // Swallow
  // XXX (@Qix-) should we be logging these?
  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */


function localstorage() {
  try {
    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
    // The Browser also has localStorage in the global context.
    return localStorage;
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}

module.exports = __webpack_require__(/*! ./common */ "../node_modules/debug/src/common.js")(exports);
var formatters = module.exports.formatters;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (error) {
    return '[UnexpectedJSONParseError]: ' + error.message;
  }
};



/***/ }),

/***/ "../node_modules/debug/src/common.js":
/*!*******************************************!*\
  !*** ../node_modules/debug/src/common.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */
function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = __webpack_require__(/*! ms */ "../node_modules/debug/node_modules/ms/index.js");
  Object.keys(env).forEach(function (key) {
    createDebug[key] = env[key];
  });
  /**
  * Active `debug` instances.
  */

  createDebug.instances = [];
  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];
  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */

  createDebug.formatters = {};
  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */

  function selectColor(namespace) {
    var hash = 0;

    for (var i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }

  createDebug.selectColor = selectColor;
  /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */

  function createDebug(namespace) {
    var prevTime;

    function debug() {
      // Disabled?
      if (!debug.enabled) {
        return;
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var self = debug; // Set `diff` timestamp

      var curr = Number(new Date());
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      } // Apply any `formatters` transformations


      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return match;
        }

        index++;
        var formatter = createDebug.formatters[format];

        if (typeof formatter === 'function') {
          var val = args[index];
          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args);
      var logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = createDebug.enabled(namespace);
    debug.useColors = createDebug.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;
    debug.extend = extend; // Debug.formatArgs = formatArgs;
    // debug.rawLog = rawLog;
    // env-specific initialization logic for debug instances

    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }

    createDebug.instances.push(debug);
    return debug;
  }

  function destroy() {
    var index = createDebug.instances.indexOf(this);

    if (index !== -1) {
      createDebug.instances.splice(index, 1);
      return true;
    }

    return false;
  }

  function extend(namespace, delimiter) {
    return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
  }
  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */


  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.names = [];
    createDebug.skips = [];
    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }

      namespaces = split[i].replace(/\*/g, '.*?');

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < createDebug.instances.length; i++) {
      var instance = createDebug.instances[i];
      instance.enabled = createDebug.enabled(instance.namespace);
    }
  }
  /**
  * Disable debug output.
  *
  * @api public
  */


  function disable() {
    createDebug.enable('');
  }
  /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */


  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }

    var i;
    var len;

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }

    return false;
  }
  /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */


  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }

    return val;
  }

  createDebug.enable(createDebug.load());
  return createDebug;
}

module.exports = setup;



/***/ }),

/***/ "../node_modules/dotsplit.js/index.js":
/*!********************************************!*\
  !*** ../node_modules/dotsplit.js/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = Object.prototype.toString

/**
 * Transform dot-delimited strings to array of strings.
 *
 * @param  {String} string
 * Dot-delimited string.
 *
 * @return {Array}
 * Array of strings.
 */

function dotsplit (string) {
  var idx = -1
  var str = compact(normalize(string).split('.'))
  var end = str.length
  var out = []

  while (++idx < end) {
    out.push(todots(str[idx]))
  }

  return out
}

/**
 * Replace escapes with a placeholder.
 *
 * @param  {String} string
 * Dot-delimited string.
 *
 * @return {String}
 * Dot-delimited string with placeholders in place of escapes.
 */

function normalize (string) {
  return (toString.call(string) === '[object String]' ? string : '').replace(/\\\./g, '\uffff')
}

/**
 * Drop empty values from array.
 *
 * @param  {Array} array
 * Array of strings.
 *
 * @return {Array}
 * Array of strings (empty values dropped).
 */

function compact (arr) {
  var idx = -1
  var end = arr.length
  var out = []

  while (++idx < end) {
    if (arr[idx]) out.push(arr[idx])
  }

  return out
}

/**
 * Change placeholder to dots.
 *
 * @param  {String} string
 * Dot-delimited string with placeholders.
 *
 * @return {String}
 * Dot-delimited string without placeholders.
 */

function todots (string) {
  return string.replace(/\uffff/g, '.')
}

/*!
 * exports.
 */

module.exports = dotsplit


/***/ }),

/***/ "../node_modules/events/events.js":
/*!****************************************!*\
  !*** ../node_modules/events/events.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = $getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  var args = [];
  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ "../node_modules/fast-bind/bind-loop.js":
/*!**********************************************!*\
  !*** ../node_modules/fast-bind/bind-loop.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function(boundThis) {
  var f = this
    , ret

  if (arguments.length < 2)
    ret = function() {
      if (this instanceof ret) {
        var ret_ = f.apply(this, arguments)
        return Object(ret_) === ret_
          ? ret_
          : this
      }
      else
        return f.apply(boundThis, arguments)
    }
  else {
    var boundArgs = new Array(arguments.length - 1)
    for (var i = 1; i < arguments.length; i++)
      boundArgs[i - 1] = arguments[i]

    ret = function() {
      var boundLen = boundArgs.length
        , args = new Array(boundLen + arguments.length)
        , i
      for (i = 0; i < boundLen; i++)
        args[i] = boundArgs[i]
      for (i = 0; i < arguments.length; i++)
        args[boundLen + i] = arguments[i]

      if (this instanceof ret) {
        var ret_ = f.apply(this, args)
        return Object(ret_) === ret_
          ? ret_
          : this
      }
      else
        return f.apply(boundThis, args)
    }
  }

  ret.prototype = f.prototype
  return ret
}


/***/ }),

/***/ "../node_modules/lodash.isobjectlike/index.js":
/*!****************************************************!*\
  !*** ../node_modules/lodash.isobjectlike/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * lodash 4.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "../node_modules/ms/index.js":
/*!***********************************!*\
  !*** ../node_modules/ms/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),

/***/ "../node_modules/object-hash/dist/object_hash.js":
/*!*******************************************************!*\
  !*** ../node_modules/object-hash/dist/object_hash.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;!function(e){if(true)module.exports=e();else { var t; }}(function(){return function e(t,n,r){function o(u,a){if(!n[u]){if(!t[u]){var f="function"==typeof require&&require;if(!a&&f)return require(u,!0);if(i)return i(u,!0);throw new Error("Cannot find module '"+u+"'")}var s=n[u]={exports:{}};t[u][0].call(s.exports,function(e){var n=t[u][1][e];return o(n?n:e)},s,s.exports,e,t,n,r)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(e,t,n){(function(r,o,i,u,a,f,s,c,l){"use strict";function d(e,t){return t=h(e,t),g(e,t)}function h(e,t){if(t=t||{},t.algorithm=t.algorithm||"sha1",t.encoding=t.encoding||"hex",t.excludeValues=!!t.excludeValues,t.algorithm=t.algorithm.toLowerCase(),t.encoding=t.encoding.toLowerCase(),t.ignoreUnknown=t.ignoreUnknown===!0,t.respectType=t.respectType!==!1,t.respectFunctionNames=t.respectFunctionNames!==!1,t.respectFunctionProperties=t.respectFunctionProperties!==!1,t.unorderedArrays=t.unorderedArrays===!0,t.unorderedSets=t.unorderedSets!==!1,t.unorderedObjects=t.unorderedObjects!==!1,t.replacer=t.replacer||void 0,t.excludeKeys=t.excludeKeys||void 0,"undefined"==typeof e)throw new Error("Object argument required.");for(var n=0;n<v.length;++n)v[n].toLowerCase()===t.algorithm.toLowerCase()&&(t.algorithm=v[n]);if(v.indexOf(t.algorithm)===-1)throw new Error('Algorithm "'+t.algorithm+'"  not supported. supported values: '+v.join(", "));if(m.indexOf(t.encoding)===-1&&"passthrough"!==t.algorithm)throw new Error('Encoding "'+t.encoding+'"  not supported. supported values: '+m.join(", "));return t}function p(e){if("function"!=typeof e)return!1;var t=/^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i;return null!=t.exec(Function.prototype.toString.call(e))}function g(e,t){var n;n="passthrough"!==t.algorithm?b.createHash(t.algorithm):new w,"undefined"==typeof n.write&&(n.write=n.update,n.end=n.update);var r=y(t,n);if(r.dispatch(e),n.update||n.end(""),n.digest)return n.digest("buffer"===t.encoding?void 0:t.encoding);var o=n.read();return"buffer"===t.encoding?o:o.toString(t.encoding)}function y(e,t,n){n=n||[];var r=function(e){return t.update?t.update(e,"utf8"):t.write(e,"utf8")};return{dispatch:function(t){e.replacer&&(t=e.replacer(t));var n=typeof t;return null===t&&(n="null"),this["_"+n](t)},_object:function(t){var o=/\[object (.*)\]/i,u=Object.prototype.toString.call(t),a=o.exec(u);a=a?a[1]:"unknown:["+u+"]",a=a.toLowerCase();var f=null;if((f=n.indexOf(t))>=0)return this.dispatch("[CIRCULAR:"+f+"]");if(n.push(t),"undefined"!=typeof i&&i.isBuffer&&i.isBuffer(t))return r("buffer:"),r(t);if("object"===a||"function"===a){var s=Object.keys(t);e.unorderedObjects&&(s=s.sort()),e.respectType===!1||p(t)||s.splice(0,0,"prototype","__proto__","constructor"),e.excludeKeys&&(s=s.filter(function(t){return!e.excludeKeys(t)})),r("object:"+s.length+":");var c=this;return s.forEach(function(n){c.dispatch(n),r(":"),e.excludeValues||c.dispatch(t[n]),r(",")})}if(!this["_"+a]){if(e.ignoreUnknown)return r("["+a+"]");throw new Error('Unknown object type "'+a+'"')}this["_"+a](t)},_array:function(t,o){o="undefined"!=typeof o?o:e.unorderedArrays!==!1;var i=this;if(r("array:"+t.length+":"),!o||t.length<=1)return t.forEach(function(e){return i.dispatch(e)});var u=[],a=t.map(function(t){var r=new w,o=n.slice(),i=y(e,r,o);return i.dispatch(t),u=u.concat(o.slice(n.length)),r.read().toString()});return n=n.concat(u),a.sort(),this._array(a,!1)},_date:function(e){return r("date:"+e.toJSON())},_symbol:function(e){return r("symbol:"+e.toString())},_error:function(e){return r("error:"+e.toString())},_boolean:function(e){return r("bool:"+e.toString())},_string:function(e){r("string:"+e.length+":"),r(e.toString())},_function:function(t){r("fn:"),p(t)?this.dispatch("[native]"):this.dispatch(t.toString()),e.respectFunctionNames!==!1&&this.dispatch("function-name:"+String(t.name)),e.respectFunctionProperties&&this._object(t)},_number:function(e){return r("number:"+e.toString())},_xml:function(e){return r("xml:"+e.toString())},_null:function(){return r("Null")},_undefined:function(){return r("Undefined")},_regexp:function(e){return r("regex:"+e.toString())},_uint8array:function(e){return r("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint8clampedarray:function(e){return r("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(e))},_int8array:function(e){return r("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint16array:function(e){return r("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_int16array:function(e){return r("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_uint32array:function(e){return r("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_int32array:function(e){return r("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_float32array:function(e){return r("float32array:"),this.dispatch(Array.prototype.slice.call(e))},_float64array:function(e){return r("float64array:"),this.dispatch(Array.prototype.slice.call(e))},_arraybuffer:function(e){return r("arraybuffer:"),this.dispatch(new Uint8Array(e))},_url:function(e){return r("url:"+e.toString(),"utf8")},_map:function(t){r("map:");var n=Array.from(t);return this._array(n,e.unorderedSets!==!1)},_set:function(t){r("set:");var n=Array.from(t);return this._array(n,e.unorderedSets!==!1)},_blob:function(){if(e.ignoreUnknown)return r("[blob]");throw Error('Hashing Blob objects is currently not supported\n(see https://github.com/puleos/object-hash/issues/26)\nUse "options.replacer" or "options.ignoreUnknown"\n')},_domwindow:function(){return r("domwindow")},_process:function(){return r("process")},_timer:function(){return r("timer")},_pipe:function(){return r("pipe")},_tcp:function(){return r("tcp")},_udp:function(){return r("udp")},_tty:function(){return r("tty")},_statwatcher:function(){return r("statwatcher")},_securecontext:function(){return r("securecontext")},_connection:function(){return r("connection")},_zlib:function(){return r("zlib")},_context:function(){return r("context")},_nodescript:function(){return r("nodescript")},_httpparser:function(){return r("httpparser")},_dataview:function(){return r("dataview")},_signal:function(){return r("signal")},_fsevent:function(){return r("fsevent")},_tlswrap:function(){return r("tlswrap")}}}function w(){return{buf:"",write:function(e){this.buf+=e},end:function(e){this.buf+=e},read:function(){return this.buf}}}var b=e("crypto");n=t.exports=d,n.sha1=function(e){return d(e)},n.keys=function(e){return d(e,{excludeValues:!0,algorithm:"sha1",encoding:"hex"})},n.MD5=function(e){return d(e,{algorithm:"md5",encoding:"hex"})},n.keysMD5=function(e){return d(e,{algorithm:"md5",encoding:"hex",excludeValues:!0})};var v=b.getHashes?b.getHashes().slice():["sha1","md5"];v.push("passthrough");var m=["buffer","hex","binary","base64"];n.writeToStream=function(e,t,n){return"undefined"==typeof n&&(n=t,t={}),t=h(e,t),y(t,n).dispatch(e)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_e8180ef5.js","/")},{buffer:3,crypto:5,lYpoI2:10}],2:[function(e,t,n){(function(e,t,r,o,i,u,a,f,s){var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";!function(e){"use strict";function t(e){var t=e.charCodeAt(0);return t===i||t===l?62:t===u||t===d?63:t<a?-1:t<a+10?t-a+26+26:t<s+26?t-s:t<f+26?t-f+26:void 0}function n(e){function n(e){s[l++]=e}var r,i,u,a,f,s;if(e.length%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var c=e.length;f="="===e.charAt(c-2)?2:"="===e.charAt(c-1)?1:0,s=new o(3*e.length/4-f),u=f>0?e.length-4:e.length;var l=0;for(r=0,i=0;r<u;r+=4,i+=3)a=t(e.charAt(r))<<18|t(e.charAt(r+1))<<12|t(e.charAt(r+2))<<6|t(e.charAt(r+3)),n((16711680&a)>>16),n((65280&a)>>8),n(255&a);return 2===f?(a=t(e.charAt(r))<<2|t(e.charAt(r+1))>>4,n(255&a)):1===f&&(a=t(e.charAt(r))<<10|t(e.charAt(r+1))<<4|t(e.charAt(r+2))>>2,n(a>>8&255),n(255&a)),s}function r(e){function t(e){return c.charAt(e)}function n(e){return t(e>>18&63)+t(e>>12&63)+t(e>>6&63)+t(63&e)}var r,o,i,u=e.length%3,a="";for(r=0,i=e.length-u;r<i;r+=3)o=(e[r]<<16)+(e[r+1]<<8)+e[r+2],a+=n(o);switch(u){case 1:o=e[e.length-1],a+=t(o>>2),a+=t(o<<4&63),a+="==";break;case 2:o=(e[e.length-2]<<8)+e[e.length-1],a+=t(o>>10),a+=t(o>>4&63),a+=t(o<<2&63),a+="="}return a}var o="undefined"!=typeof Uint8Array?Uint8Array:Array,i="+".charCodeAt(0),u="/".charCodeAt(0),a="0".charCodeAt(0),f="a".charCodeAt(0),s="A".charCodeAt(0),l="-".charCodeAt(0),d="_".charCodeAt(0);e.toByteArray=n,e.fromByteArray=r}("undefined"==typeof n?this.base64js={}:n)}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js","/node_modules/gulp-browserify/node_modules/base64-js/lib")},{buffer:3,lYpoI2:10}],3:[function(e,t,n){(function(t,r,o,i,u,a,f,s,c){function o(e,t,n){if(!(this instanceof o))return new o(e,t,n);var r=typeof e;if("base64"===t&&"string"===r)for(e=N(e);e.length%4!==0;)e+="=";var i;if("number"===r)i=F(e);else if("string"===r)i=o.byteLength(e,t);else{if("object"!==r)throw new Error("First argument needs to be a number, array or string.");i=F(e.length)}var u;o._useTypedArrays?u=o._augment(new Uint8Array(i)):(u=this,u.length=i,u._isBuffer=!0);var a;if(o._useTypedArrays&&"number"==typeof e.byteLength)u._set(e);else if(O(e))for(a=0;a<i;a++)o.isBuffer(e)?u[a]=e.readUInt8(a):u[a]=e[a];else if("string"===r)u.write(e,0,t);else if("number"===r&&!o._useTypedArrays&&!n)for(a=0;a<i;a++)u[a]=0;return u}function l(e,t,n,r){n=Number(n)||0;var i=e.length-n;r?(r=Number(r),r>i&&(r=i)):r=i;var u=t.length;$(u%2===0,"Invalid hex string"),r>u/2&&(r=u/2);for(var a=0;a<r;a++){var f=parseInt(t.substr(2*a,2),16);$(!isNaN(f),"Invalid hex string"),e[n+a]=f}return o._charsWritten=2*a,a}function d(e,t,n,r){var i=o._charsWritten=W(V(t),e,n,r);return i}function h(e,t,n,r){var i=o._charsWritten=W(q(t),e,n,r);return i}function p(e,t,n,r){return h(e,t,n,r)}function g(e,t,n,r){var i=o._charsWritten=W(R(t),e,n,r);return i}function y(e,t,n,r){var i=o._charsWritten=W(P(t),e,n,r);return i}function w(e,t,n){return 0===t&&n===e.length?G.fromByteArray(e):G.fromByteArray(e.slice(t,n))}function b(e,t,n){var r="",o="";n=Math.min(e.length,n);for(var i=t;i<n;i++)e[i]<=127?(r+=J(o)+String.fromCharCode(e[i]),o=""):o+="%"+e[i].toString(16);return r+J(o)}function v(e,t,n){var r="";n=Math.min(e.length,n);for(var o=t;o<n;o++)r+=String.fromCharCode(e[o]);return r}function m(e,t,n){return v(e,t,n)}function _(e,t,n){var r=e.length;(!t||t<0)&&(t=0),(!n||n<0||n>r)&&(n=r);for(var o="",i=t;i<n;i++)o+=H(e[i]);return o}function E(e,t,n){for(var r=e.slice(t,n),o="",i=0;i<r.length;i+=2)o+=String.fromCharCode(r[i]+256*r[i+1]);return o}function I(e,t,n,r){r||($("boolean"==typeof n,"missing or invalid endian"),$(void 0!==t&&null!==t,"missing offset"),$(t+1<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i;return n?(i=e[t],t+1<o&&(i|=e[t+1]<<8)):(i=e[t]<<8,t+1<o&&(i|=e[t+1])),i}}function A(e,t,n,r){r||($("boolean"==typeof n,"missing or invalid endian"),$(void 0!==t&&null!==t,"missing offset"),$(t+3<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i;return n?(t+2<o&&(i=e[t+2]<<16),t+1<o&&(i|=e[t+1]<<8),i|=e[t],t+3<o&&(i+=e[t+3]<<24>>>0)):(t+1<o&&(i=e[t+1]<<16),t+2<o&&(i|=e[t+2]<<8),t+3<o&&(i|=e[t+3]),i+=e[t]<<24>>>0),i}}function B(e,t,n,r){r||($("boolean"==typeof n,"missing or invalid endian"),$(void 0!==t&&null!==t,"missing offset"),$(t+1<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i=I(e,t,n,!0),u=32768&i;return u?(65535-i+1)*-1:i}}function L(e,t,n,r){r||($("boolean"==typeof n,"missing or invalid endian"),$(void 0!==t&&null!==t,"missing offset"),$(t+3<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i=A(e,t,n,!0),u=2147483648&i;return u?(4294967295-i+1)*-1:i}}function U(e,t,n,r){return r||($("boolean"==typeof n,"missing or invalid endian"),$(t+3<e.length,"Trying to read beyond buffer length")),Q.read(e,t,n,23,4)}function x(e,t,n,r){return r||($("boolean"==typeof n,"missing or invalid endian"),$(t+7<e.length,"Trying to read beyond buffer length")),Q.read(e,t,n,52,8)}function S(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+1<e.length,"trying to write beyond buffer length"),K(t,65535));var i=e.length;if(!(n>=i))for(var u=0,a=Math.min(i-n,2);u<a;u++)e[n+u]=(t&255<<8*(r?u:1-u))>>>8*(r?u:1-u)}function j(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+3<e.length,"trying to write beyond buffer length"),K(t,4294967295));var i=e.length;if(!(n>=i))for(var u=0,a=Math.min(i-n,4);u<a;u++)e[n+u]=t>>>8*(r?u:3-u)&255}function C(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+1<e.length,"Trying to write beyond buffer length"),z(t,32767,-32768));var i=e.length;n>=i||(t>=0?S(e,t,n,r,o):S(e,65535+t+1,n,r,o))}function k(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+3<e.length,"Trying to write beyond buffer length"),z(t,2147483647,-2147483648));var i=e.length;n>=i||(t>=0?j(e,t,n,r,o):j(e,4294967295+t+1,n,r,o))}function T(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+3<e.length,"Trying to write beyond buffer length"),X(t,3.4028234663852886e38,-3.4028234663852886e38));var i=e.length;n>=i||Q.write(e,t,n,r,23,4)}function M(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+7<e.length,"Trying to write beyond buffer length"),X(t,1.7976931348623157e308,-1.7976931348623157e308));var i=e.length;n>=i||Q.write(e,t,n,r,52,8)}function N(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function Y(e,t,n){return"number"!=typeof e?n:(e=~~e,e>=t?t:e>=0?e:(e+=t,e>=0?e:0))}function F(e){return e=~~Math.ceil(+e),e<0?0:e}function D(e){return(Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)})(e)}function O(e){return D(e)||o.isBuffer(e)||e&&"object"==typeof e&&"number"==typeof e.length}function H(e){return e<16?"0"+e.toString(16):e.toString(16)}function V(e){for(var t=[],n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<=127)t.push(e.charCodeAt(n));else{var o=n;r>=55296&&r<=57343&&n++;for(var i=encodeURIComponent(e.slice(o,n+1)).substr(1).split("%"),u=0;u<i.length;u++)t.push(parseInt(i[u],16))}}return t}function q(e){for(var t=[],n=0;n<e.length;n++)t.push(255&e.charCodeAt(n));return t}function P(e){for(var t,n,r,o=[],i=0;i<e.length;i++)t=e.charCodeAt(i),n=t>>8,r=t%256,o.push(r),o.push(n);return o}function R(e){return G.toByteArray(e)}function W(e,t,n,r){for(var o=0;o<r&&!(o+n>=t.length||o>=e.length);o++)t[o+n]=e[o];return o}function J(e){try{return decodeURIComponent(e)}catch(t){return String.fromCharCode(65533)}}function K(e,t){$("number"==typeof e,"cannot write a non-number as a number"),$(e>=0,"specified a negative value for writing an unsigned value"),$(e<=t,"value is larger than maximum value for type"),$(Math.floor(e)===e,"value has a fractional component")}function z(e,t,n){$("number"==typeof e,"cannot write a non-number as a number"),$(e<=t,"value larger than maximum allowed value"),$(e>=n,"value smaller than minimum allowed value"),$(Math.floor(e)===e,"value has a fractional component")}function X(e,t,n){$("number"==typeof e,"cannot write a non-number as a number"),$(e<=t,"value larger than maximum allowed value"),$(e>=n,"value smaller than minimum allowed value")}function $(e,t){if(!e)throw new Error(t||"Failed assertion")}var G=e("base64-js"),Q=e("ieee754");n.Buffer=o,n.SlowBuffer=o,n.INSPECT_MAX_BYTES=50,o.poolSize=8192,o._useTypedArrays=function(){try{var e=new ArrayBuffer(0),t=new Uint8Array(e);return t.foo=function(){return 42},42===t.foo()&&"function"==typeof t.subarray}catch(n){return!1}}(),o.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.isBuffer=function(e){return!(null===e||void 0===e||!e._isBuffer)},o.byteLength=function(e,t){var n;switch(e+="",t||"utf8"){case"hex":n=e.length/2;break;case"utf8":case"utf-8":n=V(e).length;break;case"ascii":case"binary":case"raw":n=e.length;break;case"base64":n=R(e).length;break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":n=2*e.length;break;default:throw new Error("Unknown encoding")}return n},o.concat=function(e,t){if($(D(e),"Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."),0===e.length)return new o(0);if(1===e.length)return e[0];var n;if("number"!=typeof t)for(t=0,n=0;n<e.length;n++)t+=e[n].length;var r=new o(t),i=0;for(n=0;n<e.length;n++){var u=e[n];u.copy(r,i),i+=u.length}return r},o.prototype.write=function(e,t,n,r){if(isFinite(t))isFinite(n)||(r=n,n=void 0);else{var o=r;r=t,t=n,n=o}t=Number(t)||0;var i=this.length-t;n?(n=Number(n),n>i&&(n=i)):n=i,r=String(r||"utf8").toLowerCase();var u;switch(r){case"hex":u=l(this,e,t,n);break;case"utf8":case"utf-8":u=d(this,e,t,n);break;case"ascii":u=h(this,e,t,n);break;case"binary":u=p(this,e,t,n);break;case"base64":u=g(this,e,t,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":u=y(this,e,t,n);break;default:throw new Error("Unknown encoding")}return u},o.prototype.toString=function(e,t,n){var r=this;if(e=String(e||"utf8").toLowerCase(),t=Number(t)||0,n=void 0!==n?Number(n):n=r.length,n===t)return"";var o;switch(e){case"hex":o=_(r,t,n);break;case"utf8":case"utf-8":o=b(r,t,n);break;case"ascii":o=v(r,t,n);break;case"binary":o=m(r,t,n);break;case"base64":o=w(r,t,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":o=E(r,t,n);break;default:throw new Error("Unknown encoding")}return o},o.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},o.prototype.copy=function(e,t,n,r){var i=this;if(n||(n=0),r||0===r||(r=this.length),t||(t=0),r!==n&&0!==e.length&&0!==i.length){$(r>=n,"sourceEnd < sourceStart"),$(t>=0&&t<e.length,"targetStart out of bounds"),$(n>=0&&n<i.length,"sourceStart out of bounds"),$(r>=0&&r<=i.length,"sourceEnd out of bounds"),r>this.length&&(r=this.length),e.length-t<r-n&&(r=e.length-t+n);var u=r-n;if(u<100||!o._useTypedArrays)for(var a=0;a<u;a++)e[a+t]=this[a+n];else e._set(this.subarray(n,n+u),t)}},o.prototype.slice=function(e,t){var n=this.length;if(e=Y(e,n,0),t=Y(t,n,n),o._useTypedArrays)return o._augment(this.subarray(e,t));for(var r=t-e,i=new o(r,(void 0),(!0)),u=0;u<r;u++)i[u]=this[u+e];return i},o.prototype.get=function(e){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(e)},o.prototype.set=function(e,t){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(e,t)},o.prototype.readUInt8=function(e,t){if(t||($(void 0!==e&&null!==e,"missing offset"),$(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length))return this[e]},o.prototype.readUInt16LE=function(e,t){return I(this,e,!0,t)},o.prototype.readUInt16BE=function(e,t){return I(this,e,!1,t)},o.prototype.readUInt32LE=function(e,t){return A(this,e,!0,t)},o.prototype.readUInt32BE=function(e,t){return A(this,e,!1,t)},o.prototype.readInt8=function(e,t){if(t||($(void 0!==e&&null!==e,"missing offset"),$(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length)){var n=128&this[e];return n?(255-this[e]+1)*-1:this[e]}},o.prototype.readInt16LE=function(e,t){return B(this,e,!0,t)},o.prototype.readInt16BE=function(e,t){return B(this,e,!1,t)},o.prototype.readInt32LE=function(e,t){return L(this,e,!0,t)},o.prototype.readInt32BE=function(e,t){return L(this,e,!1,t)},o.prototype.readFloatLE=function(e,t){return U(this,e,!0,t)},o.prototype.readFloatBE=function(e,t){return U(this,e,!1,t)},o.prototype.readDoubleLE=function(e,t){return x(this,e,!0,t)},o.prototype.readDoubleBE=function(e,t){return x(this,e,!1,t)},o.prototype.writeUInt8=function(e,t,n){n||($(void 0!==e&&null!==e,"missing value"),$(void 0!==t&&null!==t,"missing offset"),$(t<this.length,"trying to write beyond buffer length"),K(e,255)),t>=this.length||(this[t]=e)},o.prototype.writeUInt16LE=function(e,t,n){S(this,e,t,!0,n)},o.prototype.writeUInt16BE=function(e,t,n){S(this,e,t,!1,n)},o.prototype.writeUInt32LE=function(e,t,n){j(this,e,t,!0,n)},o.prototype.writeUInt32BE=function(e,t,n){j(this,e,t,!1,n)},o.prototype.writeInt8=function(e,t,n){n||($(void 0!==e&&null!==e,"missing value"),$(void 0!==t&&null!==t,"missing offset"),$(t<this.length,"Trying to write beyond buffer length"),z(e,127,-128)),t>=this.length||(e>=0?this.writeUInt8(e,t,n):this.writeUInt8(255+e+1,t,n))},o.prototype.writeInt16LE=function(e,t,n){C(this,e,t,!0,n)},o.prototype.writeInt16BE=function(e,t,n){C(this,e,t,!1,n)},o.prototype.writeInt32LE=function(e,t,n){k(this,e,t,!0,n)},o.prototype.writeInt32BE=function(e,t,n){k(this,e,t,!1,n)},o.prototype.writeFloatLE=function(e,t,n){T(this,e,t,!0,n)},o.prototype.writeFloatBE=function(e,t,n){T(this,e,t,!1,n)},o.prototype.writeDoubleLE=function(e,t,n){M(this,e,t,!0,n)},o.prototype.writeDoubleBE=function(e,t,n){M(this,e,t,!1,n)},o.prototype.fill=function(e,t,n){if(e||(e=0),t||(t=0),n||(n=this.length),"string"==typeof e&&(e=e.charCodeAt(0)),$("number"==typeof e&&!isNaN(e),"value is not a number"),$(n>=t,"end < start"),n!==t&&0!==this.length){$(t>=0&&t<this.length,"start out of bounds"),$(n>=0&&n<=this.length,"end out of bounds");for(var r=t;r<n;r++)this[r]=e}},o.prototype.inspect=function(){for(var e=[],t=this.length,r=0;r<t;r++)if(e[r]=H(this[r]),r===n.INSPECT_MAX_BYTES){e[r+1]="...";break}return"<Buffer "+e.join(" ")+">"},o.prototype.toArrayBuffer=function(){if("undefined"!=typeof Uint8Array){if(o._useTypedArrays)return new o(this).buffer;for(var e=new Uint8Array(this.length),t=0,n=e.length;t<n;t+=1)e[t]=this[t];return e.buffer}throw new Error("Buffer.toArrayBuffer not supported in this browser")};var Z=o.prototype;o._augment=function(e){return e._isBuffer=!0,e._get=e.get,e._set=e.set,e.get=Z.get,e.set=Z.set,e.write=Z.write,e.toString=Z.toString,e.toLocaleString=Z.toString,e.toJSON=Z.toJSON,e.copy=Z.copy,e.slice=Z.slice,e.readUInt8=Z.readUInt8,e.readUInt16LE=Z.readUInt16LE,e.readUInt16BE=Z.readUInt16BE,e.readUInt32LE=Z.readUInt32LE,e.readUInt32BE=Z.readUInt32BE,e.readInt8=Z.readInt8,e.readInt16LE=Z.readInt16LE,e.readInt16BE=Z.readInt16BE,e.readInt32LE=Z.readInt32LE,e.readInt32BE=Z.readInt32BE,e.readFloatLE=Z.readFloatLE,e.readFloatBE=Z.readFloatBE,e.readDoubleLE=Z.readDoubleLE,e.readDoubleBE=Z.readDoubleBE,e.writeUInt8=Z.writeUInt8,e.writeUInt16LE=Z.writeUInt16LE,e.writeUInt16BE=Z.writeUInt16BE,e.writeUInt32LE=Z.writeUInt32LE,e.writeUInt32BE=Z.writeUInt32BE,e.writeInt8=Z.writeInt8,e.writeInt16LE=Z.writeInt16LE,e.writeInt16BE=Z.writeInt16BE,e.writeInt32LE=Z.writeInt32LE,e.writeInt32BE=Z.writeInt32BE,e.writeFloatLE=Z.writeFloatLE,e.writeFloatBE=Z.writeFloatBE,e.writeDoubleLE=Z.writeDoubleLE,e.writeDoubleBE=Z.writeDoubleBE,e.fill=Z.fill,e.inspect=Z.inspect,e.toArrayBuffer=Z.toArrayBuffer,e}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/buffer/index.js","/node_modules/gulp-browserify/node_modules/buffer")},{"base64-js":2,buffer:3,ieee754:11,lYpoI2:10}],4:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){function l(e,t){if(e.length%p!==0){var n=e.length+(p-e.length%p);e=o.concat([e,g],n)}for(var r=[],i=t?e.readInt32BE:e.readInt32LE,u=0;u<e.length;u+=p)r.push(i.call(e,u));return r}function d(e,t,n){for(var r=new o(t),i=n?r.writeInt32BE:r.writeInt32LE,u=0;u<e.length;u++)i.call(r,e[u],4*u,!0);return r}function h(e,t,n,r){o.isBuffer(e)||(e=new o(e));var i=t(l(e,r),e.length*y);return d(i,n,r)}var o=e("buffer").Buffer,p=4,g=new o(p);g.fill(0);var y=8;t.exports={hash:h}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{buffer:3,lYpoI2:10}],5:[function(e,t,n){(function(t,r,o,i,u,a,f,s,c){function l(e,t,n){o.isBuffer(t)||(t=new o(t)),o.isBuffer(n)||(n=new o(n)),t.length>m?t=e(t):t.length<m&&(t=o.concat([t,_],m));for(var r=new o(m),i=new o(m),u=0;u<m;u++)r[u]=54^t[u],i[u]=92^t[u];var a=e(o.concat([r,n]));return e(o.concat([i,a]))}function d(e,t){e=e||"sha1";var n=v[e],r=[],i=0;return n||h("algorithm:",e,"is not yet supported"),{update:function(e){return o.isBuffer(e)||(e=new o(e)),r.push(e),i+=e.length,this},digest:function(e){var i=o.concat(r),u=t?l(n,t,i):n(i);return r=null,e?u.toString(e):u}}}function h(){var e=[].slice.call(arguments).join(" ");throw new Error([e,"we accept pull requests","http://github.com/dominictarr/crypto-browserify"].join("\n"))}function p(e,t){for(var n in e)t(e[n],n)}var o=e("buffer").Buffer,g=e("./sha"),y=e("./sha256"),w=e("./rng"),b=e("./md5"),v={sha1:g,sha256:y,md5:b},m=64,_=new o(m);_.fill(0),n.createHash=function(e){return d(e)},n.createHmac=function(e,t){return d(e,t)},n.randomBytes=function(e,t){if(!t||!t.call)return new o(w(e));try{t.call(this,void 0,new o(w(e)))}catch(n){t(n)}},p(["createCredentials","createCipher","createCipheriv","createDecipher","createDecipheriv","createSign","createVerify","createDiffieHellman","pbkdf2"],function(e){n[e]=function(){h("sorry,",e,"is not implemented yet")}})}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./md5":6,"./rng":7,"./sha":8,"./sha256":9,buffer:3,lYpoI2:10}],6:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){function l(e,t){e[t>>5]|=128<<t%32,e[(t+64>>>9<<4)+14]=t;for(var n=1732584193,r=-271733879,o=-1732584194,i=271733878,u=0;u<e.length;u+=16){var a=n,f=r,s=o,c=i;n=h(n,r,o,i,e[u+0],7,-680876936),i=h(i,n,r,o,e[u+1],12,-389564586),o=h(o,i,n,r,e[u+2],17,606105819),r=h(r,o,i,n,e[u+3],22,-1044525330),n=h(n,r,o,i,e[u+4],7,-176418897),i=h(i,n,r,o,e[u+5],12,1200080426),o=h(o,i,n,r,e[u+6],17,-1473231341),r=h(r,o,i,n,e[u+7],22,-45705983),n=h(n,r,o,i,e[u+8],7,1770035416),i=h(i,n,r,o,e[u+9],12,-1958414417),o=h(o,i,n,r,e[u+10],17,-42063),r=h(r,o,i,n,e[u+11],22,-1990404162),n=h(n,r,o,i,e[u+12],7,1804603682),i=h(i,n,r,o,e[u+13],12,-40341101),o=h(o,i,n,r,e[u+14],17,-1502002290),r=h(r,o,i,n,e[u+15],22,1236535329),n=p(n,r,o,i,e[u+1],5,-165796510),i=p(i,n,r,o,e[u+6],9,-1069501632),o=p(o,i,n,r,e[u+11],14,643717713),r=p(r,o,i,n,e[u+0],20,-373897302),n=p(n,r,o,i,e[u+5],5,-701558691),i=p(i,n,r,o,e[u+10],9,38016083),o=p(o,i,n,r,e[u+15],14,-660478335),r=p(r,o,i,n,e[u+4],20,-405537848),n=p(n,r,o,i,e[u+9],5,568446438),i=p(i,n,r,o,e[u+14],9,-1019803690),o=p(o,i,n,r,e[u+3],14,-187363961),r=p(r,o,i,n,e[u+8],20,1163531501),n=p(n,r,o,i,e[u+13],5,-1444681467),i=p(i,n,r,o,e[u+2],9,-51403784),o=p(o,i,n,r,e[u+7],14,1735328473),r=p(r,o,i,n,e[u+12],20,-1926607734),n=g(n,r,o,i,e[u+5],4,-378558),i=g(i,n,r,o,e[u+8],11,-2022574463),o=g(o,i,n,r,e[u+11],16,1839030562),r=g(r,o,i,n,e[u+14],23,-35309556),n=g(n,r,o,i,e[u+1],4,-1530992060),i=g(i,n,r,o,e[u+4],11,1272893353),o=g(o,i,n,r,e[u+7],16,-155497632),r=g(r,o,i,n,e[u+10],23,-1094730640),n=g(n,r,o,i,e[u+13],4,681279174),i=g(i,n,r,o,e[u+0],11,-358537222),o=g(o,i,n,r,e[u+3],16,-722521979),r=g(r,o,i,n,e[u+6],23,76029189),n=g(n,r,o,i,e[u+9],4,-640364487),i=g(i,n,r,o,e[u+12],11,-421815835),o=g(o,i,n,r,e[u+15],16,530742520),r=g(r,o,i,n,e[u+2],23,-995338651),n=y(n,r,o,i,e[u+0],6,-198630844),i=y(i,n,r,o,e[u+7],10,1126891415),o=y(o,i,n,r,e[u+14],15,-1416354905),r=y(r,o,i,n,e[u+5],21,-57434055),n=y(n,r,o,i,e[u+12],6,1700485571),i=y(i,n,r,o,e[u+3],10,-1894986606),o=y(o,i,n,r,e[u+10],15,-1051523),r=y(r,o,i,n,e[u+1],21,-2054922799),n=y(n,r,o,i,e[u+8],6,1873313359),i=y(i,n,r,o,e[u+15],10,-30611744),o=y(o,i,n,r,e[u+6],15,-1560198380),r=y(r,o,i,n,e[u+13],21,1309151649),n=y(n,r,o,i,e[u+4],6,-145523070),i=y(i,n,r,o,e[u+11],10,-1120210379),o=y(o,i,n,r,e[u+2],15,718787259),r=y(r,o,i,n,e[u+9],21,-343485551),n=w(n,a),r=w(r,f),o=w(o,s),i=w(i,c)}return Array(n,r,o,i)}function d(e,t,n,r,o,i){return w(b(w(w(t,e),w(r,i)),o),n)}function h(e,t,n,r,o,i,u){return d(t&n|~t&r,e,t,o,i,u)}function p(e,t,n,r,o,i,u){return d(t&r|n&~r,e,t,o,i,u)}function g(e,t,n,r,o,i,u){return d(t^n^r,e,t,o,i,u)}function y(e,t,n,r,o,i,u){return d(n^(t|~r),e,t,o,i,u)}function w(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n}function b(e,t){return e<<t|e>>>32-t}var v=e("./helpers");t.exports=function(e){return v.hash(e,l,16)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],7:[function(e,t,n){(function(e,n,r,o,i,u,a,f,s){!function(){var e,n,r=this;e=function(e){for(var t,t,n=new Array(e),r=0;r<e;r++)0==(3&r)&&(t=4294967296*Math.random()),n[r]=t>>>((3&r)<<3)&255;return n},r.crypto&&crypto.getRandomValues&&(n=function(e){var t=new Uint8Array(e);return crypto.getRandomValues(t),t}),t.exports=n||e}()}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{buffer:3,lYpoI2:10}],8:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){function l(e,t){e[t>>5]|=128<<24-t%32,e[(t+64>>9<<4)+15]=t;for(var n=Array(80),r=1732584193,o=-271733879,i=-1732584194,u=271733878,a=-1009589776,f=0;f<e.length;f+=16){for(var s=r,c=o,l=i,y=u,w=a,b=0;b<80;b++){b<16?n[b]=e[f+b]:n[b]=g(n[b-3]^n[b-8]^n[b-14]^n[b-16],1);var v=p(p(g(r,5),d(b,o,i,u)),p(p(a,n[b]),h(b)));a=u,u=i,i=g(o,30),o=r,r=v}r=p(r,s),o=p(o,c),i=p(i,l),u=p(u,y),a=p(a,w)}return Array(r,o,i,u,a)}function d(e,t,n,r){return e<20?t&n|~t&r:e<40?t^n^r:e<60?t&n|t&r|n&r:t^n^r}function h(e){return e<20?1518500249:e<40?1859775393:e<60?-1894007588:-899497514}function p(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n}function g(e,t){return e<<t|e>>>32-t}var y=e("./helpers");t.exports=function(e){return y.hash(e,l,20,!0)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],9:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){var l=e("./helpers"),d=function(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n},h=function(e,t){return e>>>t|e<<32-t},p=function(e,t){return e>>>t},g=function(e,t,n){return e&t^~e&n},y=function(e,t,n){return e&t^e&n^t&n},w=function(e){return h(e,2)^h(e,13)^h(e,22);
},b=function(e){return h(e,6)^h(e,11)^h(e,25)},v=function(e){return h(e,7)^h(e,18)^p(e,3)},m=function(e){return h(e,17)^h(e,19)^p(e,10)},_=function(e,t){var n,r,o,i,u,a,f,s,c,l,h,p,_=new Array(1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298),E=new Array(1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225),I=new Array(64);e[t>>5]|=128<<24-t%32,e[(t+64>>9<<4)+15]=t;for(var c=0;c<e.length;c+=16){n=E[0],r=E[1],o=E[2],i=E[3],u=E[4],a=E[5],f=E[6],s=E[7];for(var l=0;l<64;l++)l<16?I[l]=e[l+c]:I[l]=d(d(d(m(I[l-2]),I[l-7]),v(I[l-15])),I[l-16]),h=d(d(d(d(s,b(u)),g(u,a,f)),_[l]),I[l]),p=d(w(n),y(n,r,o)),s=f,f=a,a=u,u=d(i,h),i=o,o=r,r=n,n=d(h,p);E[0]=d(n,E[0]),E[1]=d(r,E[1]),E[2]=d(o,E[2]),E[3]=d(i,E[3]),E[4]=d(u,E[4]),E[5]=d(a,E[5]),E[6]=d(f,E[6]),E[7]=d(s,E[7])}return E};t.exports=function(e){return l.hash(e,_,32,!0)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],10:[function(e,t,n){(function(e,n,r,o,i,u,a,f,s){function c(){}var e=t.exports={};e.nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(e)return function(e){return window.setImmediate(e)};if(t){var n=[];return window.addEventListener("message",function(e){var t=e.source;if((t===window||null===t)&&"process-tick"===e.data&&(e.stopPropagation(),n.length>0)){var r=n.shift();r()}},!0),function(e){n.push(e),window.postMessage("process-tick","*")}}return function(e){setTimeout(e,0)}}(),e.title="browser",e.browser=!0,e.env={},e.argv=[],e.on=c,e.addListener=c,e.once=c,e.off=c,e.removeListener=c,e.removeAllListeners=c,e.emit=c,e.binding=function(e){throw new Error("process.binding is not supported")},e.cwd=function(){return"/"},e.chdir=function(e){throw new Error("process.chdir is not supported")}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/process/browser.js","/node_modules/gulp-browserify/node_modules/process")},{buffer:3,lYpoI2:10}],11:[function(e,t,n){(function(e,t,r,o,i,u,a,f,s){n.read=function(e,t,n,r,o){var i,u,a=8*o-r-1,f=(1<<a)-1,s=f>>1,c=-7,l=n?o-1:0,d=n?-1:1,h=e[t+l];for(l+=d,i=h&(1<<-c)-1,h>>=-c,c+=a;c>0;i=256*i+e[t+l],l+=d,c-=8);for(u=i&(1<<-c)-1,i>>=-c,c+=r;c>0;u=256*u+e[t+l],l+=d,c-=8);if(0===i)i=1-s;else{if(i===f)return u?NaN:(h?-1:1)*(1/0);u+=Math.pow(2,r),i-=s}return(h?-1:1)*u*Math.pow(2,i-r)},n.write=function(e,t,n,r,o,i){var u,a,f,s=8*i-o-1,c=(1<<s)-1,l=c>>1,d=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,h=r?0:i-1,p=r?1:-1,g=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(a=isNaN(t)?1:0,u=c):(u=Math.floor(Math.log(t)/Math.LN2),t*(f=Math.pow(2,-u))<1&&(u--,f*=2),t+=u+l>=1?d/f:d*Math.pow(2,1-l),t*f>=2&&(u++,f/=2),u+l>=c?(a=0,u=c):u+l>=1?(a=(t*f-1)*Math.pow(2,o),u+=l):(a=t*Math.pow(2,l-1)*Math.pow(2,o),u=0));o>=8;e[n+h]=255&a,h+=p,a/=256,o-=8);for(u=u<<o|a,s+=o;s>0;e[n+h]=255&u,h+=p,u/=256,s-=8);e[n+h-p]|=128*g}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/ieee754/index.js","/node_modules/ieee754")},{buffer:3,lYpoI2:10}]},{},[1])(1)});

/***/ }),

/***/ "../node_modules/prando/dist/Prando.es.js":
/*!************************************************!*\
  !*** ../node_modules/prando/dist/Prando.es.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Prando = /** @class */ (function () {
    // ================================================================================================================
    // CONSTRUCTOR ----------------------------------------------------------------------------------------------------
    /**
     * Generate a new Prando pseudo-random number generator.
     *
     * @param seed - A number or string seed that determines which pseudo-random number sequence will be created. Defaults to current time.
     */
    function Prando(seed) {
        this._value = NaN;
        if (typeof (seed) === "string") {
            // String seed
            this._seed = this.hashCode(seed);
        }
        else if (typeof (seed) === "number") {
            // Numeric seed
            this._seed = this.getSafeSeed(seed);
        }
        else {
            // Pseudo-random seed
            this._seed = this.getSafeSeed(Prando.MIN + Math.floor((Prando.MAX - Prando.MIN) * Math.random()));
        }
        this.reset();
    }
    // ================================================================================================================
    // PUBLIC INTERFACE -----------------------------------------------------------------------------------------------
    /**
     * Generates a pseudo-random number between a lower (inclusive) and a higher (exclusive) bounds.
     *
     * @param min - The minimum number that can be randomly generated.
     * @param pseudoMax - The maximum number that can be randomly generated (exclusive).
     * @return The generated pseudo-random number.
     */
    Prando.prototype.next = function (min, pseudoMax) {
        if (min === void 0) { min = 0; }
        if (pseudoMax === void 0) { pseudoMax = 1; }
        this.recalculate();
        return this.map(this._value, Prando.MIN, Prando.MAX, min, pseudoMax);
    };
    /**
     * Generates a pseudo-random integer number in a range (inclusive).
     *
     * @param min - The minimum number that can be randomly generated.
     * @param max - The maximum number that can be randomly generated.
     * @return The generated pseudo-random number.
     */
    Prando.prototype.nextInt = function (min, max) {
        if (min === void 0) { min = 10; }
        if (max === void 0) { max = 100; }
        this.recalculate();
        return Math.floor(this.map(this._value, Prando.MIN, Prando.MAX, min, max + 1));
    };
    /**
     * Generates a pseudo-random string sequence of a particular length from a specific character range.
     *
     * Note: keep in mind that creating a random string sequence does not guarantee uniqueness; there is always a
     * 1 in (char_length^string_length) chance of collision. For real unique string ids, always check for
     * pre-existing ids, or employ a robust GUID/UUID generator.
     *
     * @param length - Length of the strting to be generated.
     * @param chars - Characters that are used when creating the random string. Defaults to all alphanumeric chars (A-Z, a-z, 0-9).
     * @return The generated string sequence.
     */
    Prando.prototype.nextString = function (length, chars) {
        if (length === void 0) { length = 16; }
        if (chars === void 0) { chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; }
        var str = "";
        while (str.length < length) {
            str += this.nextChar(chars);
        }
        return str;
    };
    /**
     * Generates a pseudo-random string of 1 character specific character range.
     *
     * @param chars - Characters that are used when creating the random string. Defaults to all alphanumeric chars (A-Z, a-z, 0-9).
     * @return The generated character.
     */
    Prando.prototype.nextChar = function (chars) {
        if (chars === void 0) { chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; }
        this.recalculate();
        return chars.substr(this.nextInt(0, chars.length - 1), 1);
    };
    /**
     * Picks a pseudo-random item from an array. The array is left unmodified.
     *
     * Note: keep in mind that while the returned item will be random enough, picking one item from the array at a time
     * does not guarantee nor imply that a sequence of random non-repeating items will be picked. If you want to
     * *pick items in a random order* from an array, instead of *pick one random item from an array*, it's best to
     * apply a *shuffle* transformation to the array instead, then read it linearly.
     *
     * @param array - Array of any type containing one or more candidates for random picking.
     * @return An item from the array.
     */
    Prando.prototype.nextArrayItem = function (array) {
        this.recalculate();
        return array[this.nextInt(0, array.length - 1)];
    };
    /**
     * Generates a pseudo-random boolean.
     *
     * @return A value of true or false.
     */
    Prando.prototype.nextBoolean = function () {
        this.recalculate();
        return this._value > 0.5;
    };
    /**
     * Skips ahead in the sequence of numbers that are being generated. This is equivalent to
     * calling next() a specified number of times, but faster since it doesn't need to map the
     * new random numbers to a range and return it.
     *
     * @param iterations - The number of items to skip ahead.
     */
    Prando.prototype.skip = function (iterations) {
        if (iterations === void 0) { iterations = 1; }
        while (iterations-- > 0) {
            this.recalculate();
        }
    };
    /**
     * Reset the pseudo-random number sequence back to its starting seed. Further calls to next()
     * will then produce the same sequence of numbers it had produced before. This is equivalent to
     * creating a new Prando instance with the same seed as another Prando instance.
     *
     * Example:
     * let rng = new Prando(12345678);
     * console.log(rng.next()); // 0.6177754114889017
     * console.log(rng.next()); // 0.5784605181725837
     * rng.reset();
     * console.log(rng.next()); // 0.6177754114889017 again
     * console.log(rng.next()); // 0.5784605181725837 again
     */
    Prando.prototype.reset = function () {
        this._value = this._seed;
    };
    // ================================================================================================================
    // PRIVATE INTERFACE ----------------------------------------------------------------------------------------------
    Prando.prototype.recalculate = function () {
        this._value = this.xorshift(this._value);
    };
    Prando.prototype.xorshift = function (value) {
        // Xorshift*32
        // Based on George Marsaglia's work: http://www.jstatsoft.org/v08/i14/paper
        value ^= value << 13;
        value ^= value >> 17;
        value ^= value << 5;
        return value;
    };
    Prando.prototype.map = function (val, minFrom, maxFrom, minTo, maxTo) {
        return ((val - minFrom) / (maxFrom - minFrom)) * (maxTo - minTo) + minTo;
    };
    Prando.prototype.hashCode = function (str) {
        var hash = 0;
        if (str) {
            var l = str.length;
            for (var i = 0; i < l; i++) {
                hash = ((hash << 5) - hash) + str.charCodeAt(i);
                hash |= 0;
                hash = this.xorshift(hash);
            }
        }
        return this.getSafeSeed(hash);
    };
    Prando.prototype.getSafeSeed = function (seed) {
        if (seed === 0)
            return 1;
        return seed;
    };
    Prando.MIN = -2147483648; // Int32 min
    Prando.MAX = 2147483647; // Int32 max
    return Prando;
}());

/* harmony default export */ __webpack_exports__["default"] = (Prando);


/***/ }),

/***/ "../node_modules/selectn/index.js":
/*!****************************************!*\
  !*** ../node_modules/selectn/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var curry2 = __webpack_require__(/*! curry2 */ "../node_modules/curry2/index.js")
var debug = __webpack_require__(/*! debug */ "../node_modules/selectn/node_modules/debug/src/browser.js")('selectn')
var dotted = __webpack_require__(/*! brackets2dots */ "../node_modules/brackets2dots/index.js")
var splits = __webpack_require__(/*! dotsplit.js */ "../node_modules/dotsplit.js/index.js")
var string = Object.prototype.toString

module.exports = curry2(selectn)

/**
 * Curried property accessor function that resolves deeply-nested object properties via dot/bracket-notation
 * string path while mitigating `TypeErrors` via friendly and composable API.
 *
 * @param {String|Array} path
 * Dot/bracket-notation string path or array.
 *
 * @param {Object} object
 * Object to access.
 *
 * @return {Function|*|undefined}
 * (1) returns `selectn/1` when partially applied.
 * (2) returns value at path if path exists.
 * (3) returns undefined if path does not exist.
 */
function selectn (path, object) {
  debug('arguments:', {
    path: path,
    object: object
  })

  var idx = -1
  var seg = string.call(path) === '[object Array]' ? path : splits(dotted(path))
  var end = seg.length
  var ref = end ? object : void 0

  while (++idx < end) {
    if (Object(ref) !== ref) return void 0
    ref = ref[seg[idx]]
  }

  debug('ref:', ref)
  return typeof ref === 'function' ? ref() : ref
}


/***/ }),

/***/ "../node_modules/selectn/node_modules/debug/src/browser.js":
/*!*****************************************************************!*\
  !*** ../node_modules/selectn/node_modules/debug/src/browser.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "../node_modules/selectn/node_modules/debug/src/debug.js");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}


/***/ }),

/***/ "../node_modules/selectn/node_modules/debug/src/debug.js":
/*!***************************************************************!*\
  !*** ../node_modules/selectn/node_modules/debug/src/debug.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(/*! ms */ "../node_modules/ms/index.js");

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),

/***/ "../node_modules/thenby/thenBy.module.js":
/*!***********************************************!*\
  !*** ../node_modules/thenby/thenBy.module.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/***
   Copyright 2013 Teun Duynstee

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
module.exports = (function() {

    function identity(v){return v;}

    function ignoreCase(v){return typeof(v)==="string" ? v.toLowerCase() : v;}

    function makeCompareFunction(f, opt){
        opt = typeof(opt)==="number" ? {direction:opt} : opt||{};
        if(typeof(f)!="function"){
            var prop = f;
            // make unary function
            f = function(v1){return !!v1[prop] ? v1[prop] : "";}
        }
        if(f.length === 1) {
            // f is a unary function mapping a single item to its sort score
            var uf = f;
            var preprocess = opt.ignoreCase?ignoreCase:identity;
            var cmp = opt.cmp || function(v1,v2) {return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;}
            f = function(v1,v2) {return cmp(preprocess(uf(v1)), preprocess(uf(v2)));}
        }
        if(opt.direction === -1) return function(v1,v2){return -f(v1,v2)};
        return f;
    }

    /* adds a secondary compare function to the target function (`this` context)
       which is applied in case the first one returns 0 (equal)
       returns a new compare function, which has a `thenBy` method as well */
    function tb(func, opt) {
        /* should get value false for the first call. This can be done by calling the 
        exported function, or the firstBy property on it (for es6 module compatibility)
        */
        var x = (typeof(this) == "function" && !this.firstBy) ? this : false;
        var y = makeCompareFunction(func, opt);
        var f = x ? function(a, b) {
                        return x(a,b) || y(a,b);
                    }
                  : y;
        f.thenBy = tb;
        return f;
    }
    tb.firstBy = tb;
    return tb;
})();


/***/ }),

/***/ "../node_modules/truegin/dist/lib/almanac.js":
/*!***************************************************!*\
  !*** ../node_modules/truegin/dist/lib/almanac.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fact_1 = __webpack_require__(/*! ./fact */ "../node_modules/truegin/dist/lib/fact.js");
var errors_1 = __webpack_require__(/*! ./errors */ "../node_modules/truegin/dist/lib/errors.js");
var selectn = __webpack_require__(/*! selectn */ "../node_modules/selectn/index.js");
var debug0 = __webpack_require__(/*! debug */ "../node_modules/debug/src/browser.js");
var debug = debug0('json-rules-engine');
var verbose = debug0('json-rules-engine-verbose');
var isObjectLike = __webpack_require__(/*! lodash.isobjectlike */ "../node_modules/lodash.isobjectlike/index.js");
var warn = debug0('json-rules-engine:warn');
/**
 * Fact results lookup
 * Triggers fact computations and saves the results
 * A new almanac is used for every engine run()
 */
var Almanac = /** @class */ (function () {
    function Almanac(factMap, runtimeFacts) {
        if (runtimeFacts === void 0) { runtimeFacts = {}; }
        this.factMap = new Map(factMap);
        this.factResultsCache = new Map(); // { cacheKey:  Promise<factValu> }
        for (var factId in runtimeFacts) {
            var fact = void 0;
            if (runtimeFacts[factId] instanceof fact_1.Fact) {
                fact = runtimeFacts[factId];
            }
            else {
                fact = new fact_1.Fact(factId, runtimeFacts[factId]);
            }
            this._addConstantFact(fact);
            debug("almanac::constructor initialized runtime fact:" + fact.id + " with " + fact.value + "<" + typeof fact.value + ">");
        }
    }
    /**
     * Adds a constant fact during runtime.  Can be used mid-run() to add additional information
     * @param {String} fact - fact identifier
     * @param {Mixed} value - constant value of the fact
     */
    Almanac.prototype.addRuntimeFact = function (factId, value) {
        var fact = new fact_1.Fact(factId, value);
        return this._addConstantFact(fact);
    };
    /**
     * Returns the value of a fact, based on the given parameters.  Utilizes the 'almanac' maintained
     * by the engine, which cache's fact computations based on parameters provided
     * @param  {string} factId - fact identifier
     * @param  {Object} params - parameters to feed into the fact.  By default, these will also be used to compute the cache key
     * @param  {String} path - object
     * @return {Promise} a promise which will resolve with the fact computation.
     */
    Almanac.prototype.factValue = function (factId, params, path) {
        if (params === void 0) { params = {}; }
        if (path === void 0) { path = ''; }
        var factValuePromise;
        var fact = this.getFact(factId);
        if (fact === undefined) {
            return Promise.reject(new errors_1.UndefinedFactError("Undefined fact: " + factId));
        }
        if (fact.isConstant()) {
            factValuePromise = Promise.resolve(fact.calculate(params, this));
        }
        else {
            var cacheKey = fact.getCacheKey(params);
            var cacheVal = cacheKey && this.factResultsCache.get(cacheKey);
            if (cacheVal) {
                factValuePromise = Promise.resolve(cacheVal);
                debug("almanac::factValue cache hit for fact:" + factId);
            }
            else {
                verbose("almanac::factValue cache miss for fact:" + factId + "; calculating");
                factValuePromise = this._setFactValue(fact, params, fact.calculate(params, this));
            }
        }
        if (path) {
            return factValuePromise.then(function (factValue) {
                if (factValue && isObjectLike(factValue)) {
                    var pathValue = selectn(path)(factValue);
                    debug("condition::evaluate extracting object property " + path + ", received: " + pathValue);
                    return pathValue;
                }
                else {
                    warn("condition::evaluate could not compute object path(" + path + ") of non-object: " + factValue + " <" + typeof factValue + ">; continuing with " + factValue);
                    return factValue;
                }
            });
        }
        return factValuePromise;
    };
    /**
     * Sets the computed value of a fact
     * @param {Fact} fact
     * @param {Object} params - values for differentiating this fact value from others, used for cache key
     * @param {Mixed} value - computed value
     * TODO-Tom: Make private; currently tested however
     */
    Almanac.prototype._setFactValue = function (fact, params, value) {
        var cacheKey = fact.getCacheKey(params);
        var factValue = Promise.resolve(value);
        if (cacheKey) {
            this.factResultsCache.set(cacheKey, factValue);
        }
        return factValue;
    };
    /**
     * Registers fact with the almanac
     * @param {[type]} fact [description]
     * TODO-Tom: Make private; currently tested however
     */
    Almanac.prototype._addConstantFact = function (fact) {
        this.factMap.set(fact.id, fact);
        return this._setFactValue(fact, {}, fact.value);
    };
    /**
     * Retrieve fact by id, raising an exception if it DNE
     * @param  {String} factId
     * @return {Fact}
     */
    Almanac.prototype.getFact = function (factId) {
        return this.factMap.get(factId);
    };
    return Almanac;
}());
exports.Almanac = Almanac;
//# sourceMappingURL=almanac.js.map

/***/ }),

/***/ "../node_modules/truegin/dist/lib/condition.js":
/*!*****************************************************!*\
  !*** ../node_modules/truegin/dist/lib/condition.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var debug0 = __webpack_require__(/*! debug */ "../node_modules/debug/src/browser.js");
var debug = debug0('json-rules-engine');
var isObjectLike = __webpack_require__(/*! lodash.isobjectlike */ "../node_modules/lodash.isobjectlike/index.js");
var Condition = /** @class */ (function () {
    function Condition(properties) {
        if (!properties) {
            throw new Error('Condition: constructor options required');
        }
        var booleanOperator = Condition.booleanOperator(properties);
        Object.assign(this, properties);
        if (Condition.booleanOperatorIsAllOrAny(booleanOperator)) {
            var subConditions = properties[booleanOperator];
            if (!(subConditions instanceof Array)) {
                throw new Error("\"" + booleanOperator + "\" must be an array");
            }
            this.operator = booleanOperator;
            // boolean conditions always have a priority; default 1
            this.priority = parseInt(properties.priority, 10) || 1;
            this[booleanOperator] = subConditions.map(function (c) {
                return new Condition(c);
            });
        }
        else {
            if (!properties.hasOwnProperty('fact'))
                throw new Error('Condition: constructor "fact" property required');
            if (!properties.hasOwnProperty('operator'))
                throw new Error('Condition: constructor "operator" property required');
            if (!properties.hasOwnProperty('value'))
                throw new Error('Condition: constructor "value" property required');
            // a non-boolean condition does not have a priority by default. this allows
            // priority to be dictated by the fact definition
            if (properties.hasOwnProperty('priority')) {
                properties.priority = parseInt(properties.priority, 10);
            }
        }
    }
    /**
     * Returns the boolean operator for the condition
     * If the condition is not a boolean condition, the result will be 'undefined'
     * @return {'all' | 'any'}
     */
    Condition.booleanOperator = function (condition) {
        if (condition.hasOwnProperty('any')) {
            return 'any';
        }
        else if (condition.hasOwnProperty('all')) {
            return 'all';
        }
    };
    Condition.booleanOperatorIsAllOrAny = function (booleanOperator) {
        return booleanOperator === 'all' || booleanOperator === 'any';
    };
    /**
     * Converts the condition into a json-friendly structure
     * @param   {Boolean} stringify - whether to return as a json string
     * @returns {string,object} json string or json-friendly object
     */
    Condition.prototype.toJSON = function (stringify) {
        if (stringify === void 0) { stringify = true; }
        var props = {};
        if (this.priority) {
            props.priority = this.priority;
        }
        var oper = Condition.booleanOperator(this);
        if (oper) {
            props[oper] = this[oper].map(function (c) { return c.toJSON(stringify); });
        }
        else {
            props.operator = this.operator;
            props.value = this.value;
            props.fact = this.fact;
            if (this.factResult !== undefined) {
                props.factResult = this.factResult;
            }
            if (this.result !== undefined) {
                props.result = this.result;
            }
            if (this.params) {
                props.params = this.params;
            }
            if (this.path) {
                props.path = this.path;
            }
        }
        if (stringify) {
            return JSON.stringify(props);
        }
        return props;
    };
    /**
     * Takes the fact result and compares it to the condition 'value', using the operator
     *   LHS                      OPER       RHS
     * <fact + params + path>  <operator>  <value>
     *
     * @param   {Almanac} almanac
     * @param   {Map} operatorMap - map of available operators, keyed by operator name
     * @returns {Boolean} - evaluation result
     */
    Condition.prototype.evaluate = function (almanac, operatorMap) {
        var _this = this;
        if (!almanac)
            return Promise.reject(new Error('almanac required'));
        if (!operatorMap)
            return Promise.reject(new Error('operatorMap required'));
        if (this.isBooleanOperator())
            return Promise.reject(new Error('Cannot evaluate() a boolean condition'));
        var op = this.operator ? operatorMap.get(this.operator) : null;
        if (!op) {
            return Promise.reject(new Error("Unknown operator: " + this.operator));
        }
        return Promise.all([this.getValue(almanac), almanac.factValue(this.fact, this.params, this.path)])
            .then(function (_a) {
            var rightHandSideValue = _a[0], leftHandSideValue = _a[1];
            var result = op.evaluate(leftHandSideValue, rightHandSideValue);
            debug("condition::evaluate <" + leftHandSideValue + " " + _this.operator + " " + rightHandSideValue + "?> (" + result + ")");
            return { result: result, leftHandSideValue: leftHandSideValue, rightHandSideValue: rightHandSideValue, operator: _this.operator };
        });
    };
    /**
     * Returns the condition's boolean operator
     * Instance version of Condition.isBooleanOperator
     * @returns {string,undefined} - 'any', 'all', or undefined (if not a boolean condition)
     */
    Condition.prototype.booleanOperator = function () {
        return Condition.booleanOperator(this);
    };
    /**
     * Whether the operator is boolean ('all', 'any')
     * @returns {Boolean}
     */
    Condition.prototype.isBooleanOperator = function () {
        return Condition.booleanOperator(this) !== undefined;
    };
    /**
     * Interprets .value as either a primitive, or if a fact, retrieves the fact value
     */
    Condition.prototype.getValue = function (almanac) {
        var value = this.value;
        if (isObjectLike(value) && value.hasOwnProperty('fact')) {
            return almanac.factValue(value.fact, value.params, value.path);
        }
        return Promise.resolve(value);
    };
    return Condition;
}());
exports.Condition = Condition;
//# sourceMappingURL=condition.js.map

/***/ }),

/***/ "../node_modules/truegin/dist/lib/engine-default-operators.js":
/*!********************************************************************!*\
  !*** ../node_modules/truegin/dist/lib/engine-default-operators.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operator_1 = __webpack_require__(/*! ./operator */ "../node_modules/truegin/dist/lib/operator.js");
exports.defaultOperators = [];
exports.defaultOperators.push(new operator_1.Operator('equal', function (a, b) { return a === b; }));
exports.defaultOperators.push(new operator_1.Operator('notEqual', function (a, b) { return a !== b; }));
exports.defaultOperators.push(new operator_1.Operator('in', function (a, b) { return b.indexOf(a) > -1; }));
exports.defaultOperators.push(new operator_1.Operator('notIn', function (a, b) { return b.indexOf(a) === -1; }));
exports.defaultOperators.push(new operator_1.Operator('contains', function (a, b) { return a.indexOf(b) > -1; }, Array.isArray));
exports.defaultOperators.push(new operator_1.Operator('doesNotContain', function (a, b) { return a.indexOf(b) === -1; }, Array.isArray));
function numberValidator(factValue) {
    return Number.parseFloat(factValue).toString() !== 'NaN';
}
exports.defaultOperators.push(new operator_1.Operator('lessThan', function (a, b) { return a < b; }, numberValidator));
exports.defaultOperators.push(new operator_1.Operator('lessThanInclusive', function (a, b) { return a <= b; }, numberValidator));
exports.defaultOperators.push(new operator_1.Operator('greaterThan', function (a, b) { return a > b; }, numberValidator));
exports.defaultOperators.push(new operator_1.Operator('greaterThanInclusive', function (a, b) { return a >= b; }, numberValidator));
//# sourceMappingURL=engine-default-operators.js.map

/***/ }),

/***/ "../node_modules/truegin/dist/lib/engine-facts.js":
/*!********************************************************!*\
  !*** ../node_modules/truegin/dist/lib/engine-facts.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SuccessEventFact = function () {
    var successTriggers = [];
    return function (params) {
        if (params === void 0) { params = {}; }
        if (params.event) {
            successTriggers.push(params.event);
        }
        return successTriggers;
    };
};
exports.SuccessEventFact = SuccessEventFact;
//# sourceMappingURL=engine-facts.js.map

/***/ }),

/***/ "../node_modules/truegin/dist/lib/engine.js":
/*!**************************************************!*\
  !*** ../node_modules/truegin/dist/lib/engine.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var fact_1 = __webpack_require__(/*! ./fact */ "../node_modules/truegin/dist/lib/fact.js");
var rule_1 = __webpack_require__(/*! ./rule */ "../node_modules/truegin/dist/lib/rule.js");
var operator_1 = __webpack_require__(/*! ./operator */ "../node_modules/truegin/dist/lib/operator.js");
var almanac_1 = __webpack_require__(/*! ./almanac */ "../node_modules/truegin/dist/lib/almanac.js");
var events_1 = __webpack_require__(/*! events */ "../node_modules/events/events.js");
var engine_facts_1 = __webpack_require__(/*! ./engine-facts */ "../node_modules/truegin/dist/lib/engine-facts.js");
var engine_default_operators_1 = __webpack_require__(/*! ./engine-default-operators */ "../node_modules/truegin/dist/lib/engine-default-operators.js");
var debug = __webpack_require__(/*! debug */ "../node_modules/debug/src/browser.js")('json-rules-engine');
var EngineStatus;
(function (EngineStatus) {
    EngineStatus["READY"] = "READY";
    EngineStatus["RUNNING"] = "RUNNING";
    EngineStatus["FINISHED"] = "FINISHED";
})(EngineStatus = exports.EngineStatus || (exports.EngineStatus = {}));
var Engine = /** @class */ (function (_super) {
    __extends(Engine, _super);
    /**
     * Returns a new Engine instance
     * @param  {Rule[]} rules - array of rules to initialize with
     * @param {EnginedOptions} options
     */
    function Engine(rules, options) {
        if (rules === void 0) { rules = []; }
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.prioritizedRules = null;
        _this.rules = [];
        _this.allowUndefinedFacts = options.allowUndefinedFacts || false;
        _this.operators = new Map();
        _this.facts = new Map();
        _this.status = EngineStatus.READY;
        rules.map(function (r) { return _this.addRule(r); });
        engine_default_operators_1.defaultOperators.map(function (o) { return _this.addOperator(o); });
        return _this;
    }
    /**
     * Add a rule definition to the engine
     * @param {object|Rule} properties - rule definition.  can be JSON representation, or instance of Rule
     * @param {integer} properties.priority (>1) - higher runs sooner.
     * @param {Object} properties.event - event to fire when rule evaluates as successful
     * @param {string} properties.event.type - name of event to emit
     * @param {string} properties.event.params - parameters to pass to the event listener
     * @param {Object} properties.conditions - conditions to evaluate when processing this rule
     */
    Engine.prototype.addRule = function (properties) {
        if (!properties)
            throw new Error('Engine: addRule() requires options');
        if (!properties.hasOwnProperty('conditions'))
            throw new Error('Engine: addRule() argument requires "conditions" property');
        if (!properties.hasOwnProperty('event'))
            throw new Error('Engine: addRule() argument requires "event" property');
        var rule;
        if (properties instanceof rule_1.Rule) {
            rule = properties;
        }
        else {
            rule = new rule_1.Rule(properties);
        }
        rule.setEngine(this);
        this.rules.push(rule);
        this.prioritizedRules = null;
        return this;
    };
    /**
     * Remove a rule from the engine
     * @param {object|Rule} rule - rule definition. Must be a instance of Rule
     */
    Engine.prototype.removeRule = function (rule) {
        if ((rule instanceof rule_1.Rule) === false) {
            throw new Error('Engine: removeRule() rule must be a instance of Rule');
        }
        var index = this.rules.indexOf(rule);
        if (index === -1) {
            return false;
        }
        return Boolean(this.rules.splice(index, 1).length);
    };
    /**
     * Add a custom operator definition
     * @param {string}   operatorOrName - operator identifier within the condition; i.e. instead of 'equals', 'greaterThan', etc
     * @param {function(factValue, jsonValue)} cb - the method to execute when the operator is encountered.
     */
    Engine.prototype.addOperator = function (operatorOrName, cb) {
        var operator;
        if (operatorOrName instanceof operator_1.Operator) {
            operator = operatorOrName;
        }
        else {
            if (!cb) {
                throw new Error('Engine: addOperator() if you provide an operatorName to this function' +
                    'you must also provide a callback');
            }
            operator = new operator_1.Operator(operatorOrName, cb);
        }
        debug("engine::addOperator name:" + operator.name);
        this.operators.set(operator.name, operator);
    };
    /**
     * Remove a custom operator definition
     * @param {string}   operatorOrName - operator identifier within the condition; i.e. instead of 'equals', 'greaterThan', etc
     * @param {function(factValue, jsonValue)} callback - the method to execute when the operator is encountered.
     */
    Engine.prototype.removeOperator = function (operatorOrName) {
        var operatorName;
        if (operatorOrName instanceof operator_1.Operator) {
            operatorName = operatorOrName.name;
        }
        else {
            operatorName = operatorOrName;
        }
        return this.operators.delete(operatorName);
    };
    /**
     * Add a fact definition to the engine.  Facts are called by rules as they are evaluated.
     * @param {object|Fact} id - fact identifier or instance of Fact
     * @param {function} valueOrMethod - function to be called when computing the fact value for a given rule
     * @param {Object} options - options to initialize the fact with. used when "id" is not a Fact instance
     */
    Engine.prototype.addFact = function (id, valueOrMethod, options) {
        var factId;
        var fact;
        if (id instanceof fact_1.Fact) {
            factId = id.id;
            fact = id;
        }
        else {
            factId = id;
            fact = new fact_1.Fact(id, valueOrMethod, options);
        }
        debug("engine::addFact id:" + factId);
        this.facts.set(factId, fact);
        return this;
    };
    /**
     * Add a fact definition to the engine.  Facts are called by rules as they are evaluated.
     * @param {Fact | string} factOrId
     */
    Engine.prototype.removeFact = function (factOrId) {
        var factId;
        if (!(factOrId instanceof fact_1.Fact)) {
            factId = factOrId;
        }
        else {
            factId = factOrId.id;
        }
        return this.facts.delete(factId);
    };
    /**
     * Iterates over the engine rules, organizing them by highest -> lowest priority
     * @return {Rule[][]} two dimensional array of Rules.
     *    Each outer array element represents a single priority(integer).  Inner array is
     *    all rules with that priority.
     */
    Engine.prototype.prioritizeRules = function () {
        if (!this.prioritizedRules) {
            var ruleSets_1 = this.rules.reduce(function (sets, rule) {
                var priority = rule.priority;
                if (priority) {
                    if (!sets[priority]) {
                        sets[priority] = [];
                    }
                    sets[priority].push(rule);
                }
                return sets;
            }, {});
            this.prioritizedRules = Object.keys(ruleSets_1).sort(function (a, b) {
                return Number(a) > Number(b) ? -1 : 1; // order highest priority -> lowest
            }).map(function (priority) { return ruleSets_1[priority]; });
        }
        return this.prioritizedRules;
    };
    /**
     * Stops the rules engine from running the next priority set of Rules.  All remaining rules will be resolved as undefined,
     * and no further events emitted.  Since rules of the same priority are evaluated in parallel(not series), other rules of
     * the same priority may still emit events, even though the engine is in a "finished" state.
     * @return {Engine}
     */
    Engine.prototype.stop = function () {
        this.status = EngineStatus.FINISHED;
        return this;
    };
    /**
     * Returns a fact by fact-id
     * @param  {string} factId - fact identifier
     * @return {Fact} fact instance, or undefined if no such fact exists
     */
    Engine.prototype.getFact = function (factId) {
        return this.facts.get(factId);
    };
    /**
     * Runs an array of rules
     * @param ruleArray
     * @param almanac
     * @return {Promise} resolves when all rules in the array have been evaluated
     */
    Engine.prototype.evaluateRules = function (ruleArray, almanac) {
        var _this = this;
        return Promise.all(ruleArray.map(function (rule) {
            if (_this.status !== EngineStatus.RUNNING) {
                debug("engine::run status:" + _this.status + "; skipping remaining rules");
                return;
            }
            return rule.evaluate(almanac).then(function (ruleResult) {
                debug("engine::run ruleResult:" + ruleResult.result);
                if (ruleResult.result) {
                    _this.emit('success', rule.event, almanac, ruleResult);
                    // TODO-Tom: Come back to this once I have typescripted rule.ts
                    if (rule.event) {
                        _this.emit(rule.event.type, rule.event.params, almanac, ruleResult);
                    }
                    almanac.factValue('success-events', { event: rule.event });
                }
                else {
                    _this.emit('failure', rule.event, almanac, ruleResult);
                }
            });
        }));
    };
    /**
     * Runs the rules engine
     * @param  {Object} runtimeFacts - fact values known at runtime
     * @param  {Object} runOptions - run options
     * @return {Promise} resolves when the engine has completed running
     */
    Engine.prototype.run = function (runtimeFacts) {
        var _this = this;
        if (runtimeFacts === void 0) { runtimeFacts = {}; }
        debug("engine::run started");
        debug("engine::run runtimeFacts:", runtimeFacts);
        runtimeFacts['success-events'] = new fact_1.Fact('success-events', engine_facts_1.SuccessEventFact(), { cache: false });
        this.status = EngineStatus.RUNNING;
        var almanac = new almanac_1.Almanac(this.facts, runtimeFacts);
        var orderedSets = this.prioritizeRules();
        var cursor = Promise.resolve();
        // for each rule set, evaluate in parallel,
        // before proceeding to the next priority set.
        return new Promise(function (resolve, reject) {
            orderedSets.map(function (set) {
                cursor = cursor.then(function () {
                    return _this.evaluateRules(set, almanac);
                }).catch(reject);
                return cursor;
            });
            cursor.then(function () {
                _this.status = EngineStatus.FINISHED;
                debug("engine::run completed");
                resolve(almanac.factValue('success-events'));
            }).catch(reject);
        });
    };
    return Engine;
}(events_1.EventEmitter));
exports.Engine = Engine;
//# sourceMappingURL=engine.js.map

/***/ }),

/***/ "../node_modules/truegin/dist/lib/errors.js":
/*!**************************************************!*\
  !*** ../node_modules/truegin/dist/lib/errors.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var UndefinedFactError = /** @class */ (function (_super) {
    __extends(UndefinedFactError, _super);
    function UndefinedFactError() {
        var props = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            props[_i] = arguments[_i];
        }
        var _this = _super.apply(this, props) || this;
        _this.code = 'UNDEFINED_FACT';
        return _this;
    }
    return UndefinedFactError;
}(Error));
exports.UndefinedFactError = UndefinedFactError;
//# sourceMappingURL=errors.js.map

/***/ }),

/***/ "../node_modules/truegin/dist/lib/fact.js":
/*!************************************************!*\
  !*** ../node_modules/truegin/dist/lib/fact.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hash = __webpack_require__(/*! object-hash */ "../node_modules/object-hash/dist/object_hash.js");
var debug = __webpack_require__(/*! debug */ "../node_modules/debug/src/browser.js");
var deepClone = __webpack_require__(/*! clone */ "../node_modules/clone/clone.js");
var verbose = debug('json-rules-engine-verbose');
var Fact = /** @class */ (function () {
    /**
     * Returns a new fact instance
     * @param  {string} id - fact unique identifer
     * @param  {object} options
     * @param  {boolean} options.cache - whether to cache the fact's value for future rules
     * @param  {primitive|function} valueOrMethod - constant primitive, or method to call when computing the fact's value
     * @return {Fact}
     */
    function Fact(id, valueOrMethod, options) {
        this.id = id;
        var defaultOptions = { cache: true };
        var optionsScoped = deepClone(options) || {};
        if (typeof options === 'undefined') {
            optionsScoped = defaultOptions;
        }
        if (typeof valueOrMethod !== 'function') {
            this.value = valueOrMethod;
            this.type = Fact.CONSTANT;
        }
        else {
            this.calculationMethod = valueOrMethod;
            this.type = Fact.DYNAMIC;
        }
        if (!this.id) {
            throw new Error('factId required');
        }
        if (typeof this.value === 'undefined' &&
            typeof this.calculationMethod === 'undefined') {
            throw new Error('facts must have a value or method');
        }
        this.priority = parseInt(String(optionsScoped.priority) || String(1), 10);
        this.options = Object.assign({}, defaultOptions, optionsScoped);
        this.cacheKeyMethod = Fact.defaultCacheKeys;
        return this;
    }
    /**
     * Return a cache key (MD5 string) based on parameters
     * @param  {object} obj - properties to generate a hash key from
     * @return {string} MD5 string based on the hash'd object
     */
    Fact.hashFromObject = function (obj) {
        verbose("fact::hashFromObject generating cache key from:", obj);
        return hash(obj);
    };
    /**
     * Default properties to use when caching a fact
     * Assumes every fact is a pure function, whose computed value will only
     * change when input params are modified
     * @param  {string} id - fact unique identifer
     * @param  {object} params - parameters passed to fact calcution method
     * @return {object} id + params
     */
    Fact.defaultCacheKeys = function (id, params) {
        return { params: params, id: id };
    };
    Fact.prototype.isConstant = function () {
        return this.type === Fact.CONSTANT;
    };
    Fact.prototype.isDynamic = function () {
        return this.type === Fact.DYNAMIC;
    };
    /**
     * Return the fact value, based on provided parameters
     * @param  {object} params
     * @param  {Almanac} almanac
     * @return {any} calculation method results
     */
    Fact.prototype.calculate = function (params, almanac) {
        // if constant fact w/set value, return immediately
        if (this.hasOwnProperty('value')) {
            return this.value;
        }
        if (this.calculationMethod) {
            return this.calculationMethod(params, almanac);
        }
    };
    /**
     * Generates the fact's cache key(MD5 string)
     * Returns nothing if the fact's caching has been disabled
     * @param  {object} params - parameters that would be passed to the computation method
     * @return {string} cache key
     */
    Fact.prototype.getCacheKey = function (params) {
        if (this.options.cache === true) {
            var cacheProperties = this.cacheKeyMethod(this.id, params);
            return Fact.hashFromObject(cacheProperties);
        }
    };
    Fact.CONSTANT = 'CONSTANT';
    Fact.DYNAMIC = 'DYNAMIC';
    return Fact;
}());
exports.Fact = Fact;
//# sourceMappingURL=fact.js.map

/***/ }),

/***/ "../node_modules/truegin/dist/lib/operator.js":
/*!****************************************************!*\
  !*** ../node_modules/truegin/dist/lib/operator.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Operator = /** @class */ (function () {
    /**
     * Constructor
     * @param {string}   name - operator identifier
     * @param {function(factValue, jsonValue)} cb - operator evaluation method
     * @param {function}  [factValueValidator] - optional validator for asserting the data type of the fact
     * @returns {Operator} - instance
     */
    function Operator(name, cb, factValueValidator) {
        this.name = String(name);
        if (!name)
            throw new Error('Missing operator name');
        if (typeof cb !== 'function')
            throw new Error('Missing operator callback');
        this.cb = cb;
        if (!factValueValidator) {
            this.factValueValidator = function () { return true; };
        }
        else {
            this.factValueValidator = factValueValidator;
        }
    }
    /**
     * Takes the fact result and compares it to the condition 'value', using the callback
     * @param   {mixed} factValue - fact result
     * @param   {mixed} jsonValue - "value" property of the condition
     * @returns {Boolean} - whether the values pass the operator test
     */
    Operator.prototype.evaluate = function (factValue, jsonValue) {
        return this.factValueValidator(factValue) && this.cb(factValue, jsonValue);
    };
    return Operator;
}());
exports.Operator = Operator;
//# sourceMappingURL=operator.js.map

/***/ }),

/***/ "../node_modules/truegin/dist/lib/rule-result.js":
/*!*******************************************************!*\
  !*** ../node_modules/truegin/dist/lib/rule-result.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var deepClone = __webpack_require__(/*! clone */ "../node_modules/clone/clone.js");
var RuleResult = /** @class */ (function () {
    function RuleResult(conditions, event, priority) {
        this.conditions = deepClone(conditions);
        this.event = deepClone(event);
        this.priority = deepClone(priority);
        this.result = null;
    }
    RuleResult.prototype.setResult = function (result) {
        this.result = result;
    };
    RuleResult.prototype.toJSON = function (stringify) {
        if (stringify === void 0) { stringify = true; }
        var props = {
            conditions: this.conditions.toJSON(false),
            event: this.event,
            priority: this.priority,
            result: this.result,
        };
        if (stringify) {
            return JSON.stringify(props);
        }
        return props;
    };
    return RuleResult;
}());
exports.RuleResult = RuleResult;
//# sourceMappingURL=rule-result.js.map

/***/ }),

/***/ "../node_modules/truegin/dist/lib/rule.js":
/*!************************************************!*\
  !*** ../node_modules/truegin/dist/lib/rule.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var condition_1 = __webpack_require__(/*! ./condition */ "../node_modules/truegin/dist/lib/condition.js");
var rule_result_1 = __webpack_require__(/*! ./rule-result */ "../node_modules/truegin/dist/lib/rule-result.js");
var events_1 = __webpack_require__(/*! events */ "../node_modules/events/events.js");
var debug = __webpack_require__(/*! debug */ "../node_modules/debug/src/browser.js")('json-rules-engine');
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    /**
     * returns a new Rule instance
     * @param {object,string} options, or json string that can be parsed into options
     * @param {integer} options.priority (>1) - higher runs sooner.
     * @param {Object} options.event - event to fire when rule evaluates as successful
     * @param {string} options.event.type - name of event to emit
     * @param {string} options.event.params - parameters to pass to the event listener
     * @param {Object} options.conditions - conditions to evaluate when processing this rule
     * @return {Rule} instance
     */
    function Rule(options) {
        var _this = this;
        var scopedOptions;
        _this = _super.call(this) || this;
        if (typeof options === 'string') {
            scopedOptions = JSON.parse(options);
        }
        else {
            scopedOptions = options;
        }
        if (scopedOptions && scopedOptions.conditions) {
            _this.setConditions(scopedOptions.conditions);
        }
        if (scopedOptions && scopedOptions.onSuccess) {
            _this.on('success', scopedOptions.onSuccess);
        }
        if (scopedOptions && scopedOptions.onFailure) {
            _this.on('failure', scopedOptions.onFailure);
        }
        var priority = (scopedOptions && scopedOptions.priority) || 1;
        _this.setPriority(priority);
        var event = (scopedOptions && scopedOptions.event) || { type: 'unknown' };
        _this.setEvent(event);
        return _this;
    }
    /**
     * Sets the priority of the rule
     * @param {integer} priority (>=1) - increasing the priority causes the rule to be run prior to other rules
     */
    Rule.prototype.setPriority = function (priority) {
        priority = parseInt(priority, 10);
        if (priority <= 0) {
            throw new Error('Priority must be greater than zero');
        }
        this.priority = priority;
        return this;
    };
    /**
     * Sets the conditions to run when evaluating the rule.
     * @param {object} conditions - conditions, root element must be a boolean operator
     */
    Rule.prototype.setConditions = function (conditions) {
        if (!conditions.hasOwnProperty('all') && !conditions.hasOwnProperty('any')) {
            throw new Error('"conditions" root must contain a single instance of "all" or "any"');
        }
        this.conditions = new condition_1.Condition(conditions);
        return this;
    };
    /**
     * Sets the event to emit when the conditions evaluate truthy
     * @param {object} event - event to emit
     * @param {string} event.type - event name to emit on
     * @param {string} event.params - parameters to emit as the argument of the event emission
     */
    Rule.prototype.setEvent = function (event) {
        if (!event)
            throw new Error('Rule: setEvent() requires event object');
        if (!event.hasOwnProperty('type'))
            throw new Error('Rule: setEvent() requires event object with "type" property');
        this.event = {
            type: event.type,
        };
        if (event.params)
            this.event.params = event.params;
        return this;
    };
    /**
     * Sets the engine to run the rules under
     * @param {object} engine
     * @returns {Rule}
     */
    Rule.prototype.setEngine = function (engine) {
        this.engine = engine;
        return this;
    };
    Rule.prototype.toJSON = function (stringify) {
        if (stringify === void 0) { stringify = true; }
        var props = {
            conditions: this.conditions ? this.conditions.toJSON(false) : null,
            priority: this.priority,
            event: this.event,
        };
        if (stringify) {
            return JSON.stringify(props);
        }
        return props;
    };
    /**
     * Priorizes an array of conditions based on "priority"
     *   When no explicit priority is provided on the condition itself, the condition's priority is determine by its fact
     * @param  {Condition[]} conditions
     * @return {Condition[][]} prioritized two-dimensional array of conditions
     *    Each outer array element represents a single priority(integer).  Inner array is
     *    all conditions with that priority.
     */
    Rule.prototype.prioritizeConditions = function (conditions) {
        var _this = this;
        var factSets = conditions.reduce(function (sets, condition) {
            // if a priority has been set on this specific condition, honor that first
            // otherwise, use the fact's priority
            var priority = condition.priority;
            if (!priority) {
                var fact = _this.engine ? _this.engine.getFact(condition.fact) : null;
                priority = (fact && fact.priority) || 1;
            }
            if (!sets[priority]) {
                sets[priority] = [];
            }
            sets[priority].push(condition);
            return sets;
        }, {});
        return Object.keys(factSets).sort(function (a, b) {
            return Number(a) > Number(b) ? -1 : 1; // order highest priority -> lowest
        }).map(function (priority) { return factSets[priority]; });
    };
    /**
     * Evaluates the rule, starting with the root boolean operator and recursing down
     * All evaluation is done within the context of an almanac
     * @return {Promise(RuleResult)} rule evaluation result
     */
    Rule.prototype.evaluate = function (almanac) {
        var _this = this;
        if (!this.conditions) {
            throw new Error('Rule: evaluate () requires the rule to have a conditions property');
        }
        var ruleResult = new rule_result_1.RuleResult(this.conditions, this.event, this.priority);
        /**
         * Evaluates the rule conditions
         * @param  {Condition} condition - condition to evaluate
         * @return {Promise(true|false)} - resolves with the result of the condition evaluation
         */
        var evaluateCondition = function (condition) {
            if (condition.isBooleanOperator()) {
                var subConditions = condition.operator ? condition[condition.operator] : null;
                var comparisonPromise = void 0;
                if (condition.operator === 'all') {
                    comparisonPromise = allOperation(subConditions);
                }
                else {
                    comparisonPromise = anyOperation(subConditions);
                }
                // for booleans, rule passing is determined by the all/any result
                return comparisonPromise.then(function (comparisonValue) {
                    var passes = comparisonValue === true;
                    condition.result = passes;
                    return passes;
                });
            }
            else {
                return condition.evaluate(almanac, _this.engine.operators)
                    .then(function (evaluationResult) {
                    var passes = evaluationResult.result;
                    condition.factResult = evaluationResult.leftHandSideValue;
                    condition.result = passes;
                    return passes;
                })
                    .catch(function (err) {
                    // any condition raising an undefined fact error is considered falsey when allowUndefinedFacts is enabled
                    if (_this.engine.allowUndefinedFacts && err.code === 'UNDEFINED_FACT')
                        return false;
                    throw err;
                });
            }
        };
        /**
         * Evalutes an array of conditions, using an 'every' or 'some' array operation
         * @param  {Condition[]} conditions
         * @param arrConditionMethod
         * @return {Promise(boolean)} whether conditions evaluated truthy or falsey based on condition evaluation + method
         */
        var evaluateConditions = function (conditions, arrConditionMethod) {
            if (!(Array.isArray(conditions))) {
                conditions = [conditions];
            }
            return Promise.all(conditions.map(function (condition) { return evaluateCondition(condition); }))
                .then(function (conditionResults) {
                debug("rule::evaluateConditions results", conditionResults);
                return arrConditionMethod.call(conditionResults, function (result) { return result === true; });
            });
        };
        /**
         * Evaluates a set of conditions based on an 'all' or 'any' operator.
         *   First, orders the top level conditions based on priority
         *   Iterates over each priority set, evaluating each condition
         *   If any condition results in the rule to be guaranteed truthy or falsey,
         *   it will short-circuit and not bother evaluating any additional rules
         * @param  {Condition[]} conditions - conditions to be evaluated
         * @param  {string('all'|'any')} operator
         * @return {Promise(boolean)} rule evaluation result
         */
        var prioritizeAndRun = function (conditions, operator) {
            if (conditions.length === 0) {
                return Promise.resolve(true);
            }
            var method = Array.prototype.some;
            if (operator === 'all') {
                method = Array.prototype.every;
            }
            var orderedSets = _this.prioritizeConditions(conditions);
            var cursor = Promise.resolve(null);
            orderedSets.forEach(function (set) {
                var stop = false;
                cursor = cursor.then(function (setResult) {
                    // after the first set succeeds, don't fire off the remaining promises
                    if ((operator === 'any' && setResult === true) || stop) {
                        debug("prioritizeAndRun::detected truthy result; skipping remaining conditions");
                        stop = true;
                        return true;
                    }
                    // after the first set fails, don't fire off the remaining promises
                    if ((operator === 'all' && setResult === false) || stop) {
                        debug("prioritizeAndRun::detected falsey result; skipping remaining conditions");
                        stop = true;
                        return false;
                    }
                    // all conditions passed; proceed with running next set in parallel
                    return evaluateConditions(set, method);
                });
            });
            return cursor;
        };
        /**
         * Runs an 'any' boolean operator on an array of conditions
         * @param  {Condition[]} conditions to be evaluated
         * @return {Promise(boolean)} condition evaluation result
         */
        var anyOperation = function (conditions) {
            return prioritizeAndRun(conditions, 'any');
        };
        /**
         * Runs an 'all' boolean operator on an array of conditions
         * @param  {Condition[]} conditions to be evaluated
         * @return {Promise(boolean)} condition evaluation result
         */
        var allOperation = function (conditions) {
            return prioritizeAndRun(conditions, 'all');
        };
        /**
         * Emits based on rule evaluation result, and decorates ruleResult with 'result' property
         * @param {Boolean} result
         */
        var processResult = function (result) {
            ruleResult.setResult(result);
            if (result)
                _this.emit('success', ruleResult.event, almanac, ruleResult);
            else
                _this.emit('failure', ruleResult.event, almanac, ruleResult);
            return ruleResult;
        };
        if (ruleResult.conditions.any) {
            return anyOperation(ruleResult.conditions.any)
                .then(function (result) { return processResult(result); });
        }
        else {
            return allOperation(ruleResult.conditions.all)
                .then(function (result) { return processResult(result); });
        }
    };
    return Rule;
}(events_1.EventEmitter));
exports.Rule = Rule;
//# sourceMappingURL=rule.js.map

/***/ }),

/***/ "../node_modules/truegin/dist/lib/truegin.js":
/*!***************************************************!*\
  !*** ../node_modules/truegin/dist/lib/truegin.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var engine_1 = __webpack_require__(/*! ./engine */ "../node_modules/truegin/dist/lib/engine.js");
exports.Engine = engine_1.Engine;
var fact_1 = __webpack_require__(/*! ./fact */ "../node_modules/truegin/dist/lib/fact.js");
exports.Fact = fact_1.Fact;
var rule_1 = __webpack_require__(/*! ./rule */ "../node_modules/truegin/dist/lib/rule.js");
exports.Rule = rule_1.Rule;
var operator_1 = __webpack_require__(/*! ./operator */ "../node_modules/truegin/dist/lib/operator.js");
exports.Operator = operator_1.Operator;
function engineFactory(rules, options) {
    return new engine_1.Engine(rules, options);
}
exports.engineFactory = engineFactory;
//# sourceMappingURL=truegin.js.map

/***/ }),

/***/ "../node_modules/tslib/tslib.es6.js":
/*!******************************************!*\
  !*** ../node_modules/tslib/tslib.es6.js ***!
  \******************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "../src/data/enemies.json":
/*!********************************!*\
  !*** ../src/data/enemies.json ***!
  \********************************/
/*! exports provided: acromantula, darkWizard, deathEater, erkling, pixie, werewolf, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"acromantula\":{\"name\":\"Acromantula\",\"stats\":[{\"difficulty\":1,\"normal\":{\"stamina\":72,\"power\":8,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.05,\"deficiencyDefence\":0},\"elite\":{\"stamina\":135,\"power\":16,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.1,\"deficiencyDefence\":0}},{\"difficulty\":2,\"normal\":{\"stamina\":91,\"power\":10,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.1,\"deficiencyDefence\":0},\"elite\":{\"stamina\":170,\"power\":19,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.2,\"deficiencyDefence\":0}},{\"difficulty\":3,\"normal\":{\"stamina\":109,\"power\":13,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.15,\"deficiencyDefence\":0.05},\"elite\":{\"stamina\":203,\"power\":24,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.3,\"deficiencyDefence\":0.1}},{\"difficulty\":4,\"normal\":{\"stamina\":136,\"power\":17,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.2,\"deficiencyDefence\":0.07},\"elite\":{\"stamina\":254,\"power\":32,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.4,\"deficiencyDefence\":0.15}},{\"difficulty\":5,\"normal\":{\"stamina\":166,\"power\":22,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.25,\"deficiencyDefence\":0.12},\"elite\":{\"stamina\":310,\"power\":41,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.5,\"deficiencyDefence\":0.25}}]},\"darkWizard\":{\"name\":\"Dark Wizard\",\"stats\":[{\"difficulty\":1,\"normal\":{\"stamina\":62,\"power\":7,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.05,\"deficiencyDefence\":0},\"elite\":{\"stamina\":115,\"power\":14,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.1,\"deficiencyDefence\":0}},{\"difficulty\":2,\"normal\":{\"stamina\":76,\"power\":9,\"defence\":0.05,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.1,\"deficiencyDefence\":0},\"elite\":{\"stamina\":141,\"power\":18,\"defence\":0.05,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.2,\"deficiencyDefence\":0}},{\"difficulty\":3,\"normal\":{\"stamina\":88,\"power\":11,\"defence\":0.15,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.15,\"deficiencyDefence\":0.05},\"elite\":{\"stamina\":163,\"power\":20,\"defence\":0.15,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.3,\"deficiencyDefence\":0.1}},{\"difficulty\":4,\"normal\":{\"stamina\":101,\"power\":12,\"defence\":0.3,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.2,\"deficiencyDefence\":0.07},\"elite\":{\"stamina\":189,\"power\":24,\"defence\":0.3,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.4,\"deficiencyDefence\":0.15}},{\"difficulty\":5,\"normal\":{\"stamina\":113,\"power\":14,\"defence\":0.5,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.25,\"deficiencyDefence\":0.12},\"elite\":{\"stamina\":211,\"power\":26,\"defence\":0.5,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.5,\"deficiencyDefence\":0.25}}]},\"deathEater\":{\"name\":\"Death Eater\",\"stats\":[{\"difficulty\":1,\"normal\":{\"stamina\":83,\"power\":6,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.05,\"deficiencyDefence\":0},\"elite\":{\"stamina\":154,\"power\":12,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.1,\"deficiencyDefence\":0}},{\"difficulty\":2,\"normal\":{\"stamina\":101,\"power\":7,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.1,\"deficiencyDefence\":0},\"elite\":{\"stamina\":189,\"power\":14,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.2,\"deficiencyDefence\":0}},{\"difficulty\":3,\"normal\":{\"stamina\":122,\"power\":9,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.15,\"deficiencyDefence\":0.05},\"elite\":{\"stamina\":227,\"power\":17,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.3,\"deficiencyDefence\":0.1}},{\"difficulty\":4,\"normal\":{\"stamina\":147,\"power\":10,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.2,\"deficiencyDefence\":0.07},\"elite\":{\"stamina\":273,\"power\":19,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.4,\"deficiencyDefence\":0.15}},{\"difficulty\":5,\"normal\":{\"stamina\":177,\"power\":11,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.25,\"deficiencyDefence\":0.12},\"elite\":{\"stamina\":328,\"power\":22,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.5,\"deficiencyDefence\":0.25}}]},\"erkling\":{\"name\":\"Erkling\",\"stats\":[{\"difficulty\":1,\"normal\":{\"stamina\":76,\"power\":7,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.05,\"deficiencyDefence\":0},\"elite\":{\"stamina\":141,\"power\":13,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.1,\"deficiencyDefence\":0}},{\"difficulty\":2,\"normal\":{\"stamina\":93,\"power\":8,\"defence\":0,\"defenceBreach\":0,\"dodge\":0.05,\"proficiencyPower\":0.1,\"deficiencyDefence\":0},\"elite\":{\"stamina\":176,\"power\":16,\"defence\":0,\"defenceBreach\":0,\"dodge\":0.05,\"proficiencyPower\":0.2,\"deficiencyDefence\":0}},{\"difficulty\":3,\"normal\":{\"stamina\":107,\"power\":10,\"defence\":0,\"defenceBreach\":0,\"dodge\":0.25,\"proficiencyPower\":0.15,\"deficiencyDefence\":0.05},\"elite\":{\"stamina\":200,\"power\":18,\"defence\":0,\"defenceBreach\":0,\"dodge\":0.25,\"proficiencyPower\":0.3,\"deficiencyDefence\":0.1}},{\"difficulty\":4,\"normal\":{\"stamina\":124,\"power\":11,\"defence\":0,\"defenceBreach\":0,\"dodge\":0.4,\"proficiencyPower\":0.2,\"deficiencyDefence\":0.07},\"elite\":{\"stamina\":231,\"power\":21,\"defence\":0,\"defenceBreach\":0,\"dodge\":0.4,\"proficiencyPower\":0.4,\"deficiencyDefence\":0.15}},{\"difficulty\":5,\"normal\":{\"stamina\":139,\"power\":13,\"defence\":0,\"defenceBreach\":0,\"dodge\":0.6,\"proficiencyPower\":0.25,\"deficiencyDefence\":0.12},\"elite\":{\"stamina\":258,\"power\":24,\"defence\":0,\"defenceBreach\":0,\"dodge\":0.6,\"proficiencyPower\":0.5,\"deficiencyDefence\":0.25}}]},\"pixie\":{\"name\":\"Pixie\",\"stats\":[{\"difficulty\":1,\"normal\":{\"stamina\":41,\"power\":7,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.05,\"deficiencyDefence\":0},\"elite\":{\"stamina\":77,\"power\":13,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.1,\"deficiencyDefence\":0}},{\"difficulty\":2,\"normal\":{\"stamina\":50,\"power\":9,\"defence\":0,\"defenceBreach\":0,\"dodge\":0.05,\"proficiencyPower\":0.1,\"deficiencyDefence\":0},\"elite\":{\"stamina\":94,\"power\":17,\"defence\":0,\"defenceBreach\":0,\"dodge\":0.05,\"proficiencyPower\":0.2,\"deficiencyDefence\":0}},{\"difficulty\":3,\"normal\":{\"stamina\":58,\"power\":11,\"defence\":0,\"defenceBreach\":0,\"dodge\":0.25,\"proficiencyPower\":0.15,\"deficiencyDefence\":0.05},\"elite\":{\"stamina\":109,\"power\":21,\"defence\":0,\"defenceBreach\":0,\"dodge\":0.25,\"proficiencyPower\":0.3,\"deficiencyDefence\":0.1}},{\"difficulty\":4,\"normal\":{\"stamina\":67,\"power\":14,\"defence\":0,\"defenceBreach\":0,\"dodge\":0.4,\"proficiencyPower\":0.2,\"deficiencyDefence\":0.07},\"elite\":{\"stamina\":126,\"power\":27,\"defence\":0,\"defenceBreach\":0,\"dodge\":0.4,\"proficiencyPower\":0.4,\"deficiencyDefence\":0.15}},{\"difficulty\":5,\"normal\":{\"stamina\":75,\"power\":18,\"defence\":0,\"defenceBreach\":0,\"dodge\":0.6,\"proficiencyPower\":0.25,\"deficiencyDefence\":0.12},\"elite\":{\"stamina\":140,\"power\":34,\"defence\":0,\"defenceBreach\":0,\"dodge\":0.6,\"proficiencyPower\":0.5,\"deficiencyDefence\":0.25}}]},\"werewolf\":{\"name\":\"Werewolf\",\"stats\":[{\"difficulty\":1,\"normal\":{\"stamina\":70,\"power\":7,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.05,\"deficiencyDefence\":0},\"elite\":{\"stamina\":131,\"power\":13,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.1,\"deficiencyDefence\":0}},{\"difficulty\":2,\"normal\":{\"stamina\":88,\"power\":9,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.1,\"deficiencyDefence\":0},\"elite\":{\"stamina\":163,\"power\":17,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.2,\"deficiencyDefence\":0}},{\"difficulty\":3,\"normal\":{\"stamina\":109,\"power\":11,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.15,\"deficiencyDefence\":0.05},\"elite\":{\"stamina\":203,\"power\":21,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.3,\"deficiencyDefence\":0.1}},{\"difficulty\":4,\"normal\":{\"stamina\":133,\"power\":13,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.2,\"deficiencyDefence\":0.07},\"elite\":{\"stamina\":247,\"power\":25,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.4,\"deficiencyDefence\":0.15}},{\"difficulty\":5,\"normal\":{\"stamina\":159,\"power\":16,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.25,\"deficiencyDefence\":0.12},\"elite\":{\"stamina\":296,\"power\":30,\"defence\":0,\"defenceBreach\":0,\"dodge\":0,\"proficiencyPower\":0.5,\"deficiencyDefence\":0.25}}]}}");

/***/ }),

/***/ "../src/data/enemyStatsConfig.json":
/*!*****************************************!*\
  !*** ../src/data/enemyStatsConfig.json ***!
  \*****************************************/
/*! exports provided: growthAdjustStaminaPerLevel, growthAdjustPowerPerLevel, growthAdjustProficiencyPowerPerLevel, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"growthAdjustStaminaPerLevel\":0.0816,\"growthAdjustPowerPerLevel\":0.0816,\"growthAdjustProficiencyPowerPerLevel\":0.01}");

/***/ }),

/***/ "../src/data/events.json":
/*!*******************************!*\
  !*** ../src/data/events.json ***!
  \*******************************/
/*! exports provided: initialEnemySpawnAnimation, enemySpawn, secondEnemySpawnTime, thirdEnemySpawnTime, wizardSpawnAfterReviveCharm, strategicSpellDragAndCastAnimation, potionMenuAndSelectAndDrink, enterCombat, exitCombat, combatBeginAnimation_acromantula, combatBeginAnimation_darkWizard, combatBeginAnimation_deathEater, combatBeginAnimation_erkling, combatBeginAnimation_pixie, combatBeginAnimation_werewolf, spellCircle_acromantula, spellCircle_darkWizard, spellCircle_deathEater, spellCircle_erkling, spellCircle_pixie, spellCircle_werewolf, spellTrace, spellCast_wizard, spellCast_enemy, spellCast_enemy_after_no_wizard_action, enemyDeathAnimation, rewardsAnimation, dynamicDuration, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"initialEnemySpawnAnimation\":1720,\"enemySpawn\":0,\"secondEnemySpawnTime\":18000,\"thirdEnemySpawnTime\":34000,\"wizardSpawnAfterReviveCharm\":0,\"strategicSpellDragAndCastAnimation\":1060,\"potionMenuAndSelectAndDrink\":2606,\"enterCombat\":1826,\"exitCombat\":1000,\"combatBeginAnimation_acromantula\":2800,\"combatBeginAnimation_darkWizard\":4493,\"combatBeginAnimation_deathEater\":4140,\"combatBeginAnimation_erkling\":3560,\"combatBeginAnimation_pixie\":3720,\"combatBeginAnimation_werewolf\":3920,\"spellCircle_acromantula\":920,\"spellCircle_darkWizard\":1560,\"spellCircle_deathEater\":1048,\"spellCircle_erkling\":1200,\"spellCircle_pixie\":2620,\"spellCircle_werewolf\":1220,\"spellTrace\":807,\"spellCast_wizard\":1885,\"spellCast_enemy\":4740,\"spellCast_enemy_after_no_wizard_action\":5000,\"enemyDeathAnimation\":500,\"rewardsAnimation\":500,\"dynamicDuration\":-1}");

/***/ }),

/***/ "../src/data/focusCosts.json":
/*!***********************************!*\
  !*** ../src/data/focusCosts.json ***!
  \***********************************/
/*! exports provided: weakeningHex, confusionHex, focusCharm, batBogeyHex, staminaCharm, reviveCharm, braveryCharm, defenceCharm, deteriorationHex, proficiencyPowerCharm, mendingCharm, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"weakeningHex\":1,\"confusionHex\":1,\"focusCharm\":1,\"batBogeyHex\":0,\"staminaCharm\":2,\"reviveCharm\":1,\"braveryCharm\":7,\"defenceCharm\":3,\"deteriorationHex\":3,\"proficiencyPowerCharm\":7,\"mendingCharm\":0}");

/***/ }),

/***/ "../src/data/fortressDifficulties.json":
/*!*********************************************!*\
  !*** ../src/data/fortressDifficulties.json ***!
  \*********************************************/
/*! exports provided: dataSource, playerCountMultipliers, runestoneDifficulties, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"dataSource\":\"https://docs.google.com/spreadsheets/d/1jtBjdncxspRt51K048islZdEPTZ06yBKuZX7_MBzprI/edit#gid=0\",\"playerCountMultipliers\":[[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1.09,1,1,1,1],[1.16,1,1,1,1],[1.23,1,1,1,1],[1.3,1,1,1,1],[1.37,1,1,1,1],[1.44,1.1,1,1,1],[1.51,1.15,1,1,1],[1.58,1.2,1,1,1],[1.65,1.25,1,1,1],[1.72,1.3,1.33,1,1],[1.79,1.35,1.35,1,1],[1.86,1.4,1.37,1,1],[1.93,1.45,1.44,1.15,1],[2,1.5,1.5,1.25,1]],\"runestoneDifficulties\":[[39,42,45,47,50,53,56,59,62,66],[71,78,85,93,101,109,118,127,137,146],[158,169,180,191,203,215,227,240,253,266],[283,297,311,326,341,357,373,389,406,423],[445,463,481,500,519,538,557,577,598,618],[647,669,691,713,736,759,782,806,830,854],[890,916,942,968,994,1021,1049,1076,1104,1133],[1174,1203,1233,1263,1293,1324,1356,1387,1419,1451],[1504,1537,1571,1605,1640,1675,1710,1746,1782,1818],[1878,1915,1953,1992,2031,2070,2109,2149,2189,2230],[2311,2353,2396,2439,2482,2525,2569,2614,2659,2704],[2800,2847,2894,2942,2990,3038,3087,3136,3185,3235],[3338,3390,3442,3494,3547,3600,3653,3707,3761,3816],[3940,3996,4053,4110,4168,4226,4284,4343,4402,4433],[4578,4639,4701,4763,4825,4888,4952,5015,5080,5144],[5297,5364,5431,5498,5566,5634,5702,5771,5841,5876],[6046,6118,6190,6262,6335,6408,6482,6556,6631,6706],[6894,6971,7049,7127,7205,7284,7363,7443,7523,7564],[7768,7850,7933,8017,8100,8185,8269,8354,8440,8484],[8722,8810,8898,8988,9077,9167,9257,9348,9439,9531]]}");

/***/ }),

/***/ "../src/data/fortressRewards.json":
/*!****************************************!*\
  !*** ../src/data/fortressRewards.json ***!
  \****************************************/
/*! exports provided: dataSource, data, sponsoredFortressRewardsChallengeXPIncrease, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"dataSource\":\"https://i.redd.it/wz2vwfh5u4k31.jpg\",\"data\":{\"friendsBonus\":[0,0.1,0.2,0.3,0.4],\"groupBonus\":[0,0.25,0.5,0.75,1],\"baseXP\":[10,14,17,21,26,30,35,41,45,52,59,65,75,84,93,104,116,128,143,156]},\"sponsoredFortressRewardsChallengeXPIncrease\":0.25}");

/***/ }),

/***/ "../src/data/potions.json":
/*!********************************!*\
  !*** ../src/data/potions.json ***!
  \********************************/
/*! exports provided: healthPotion, weakInvigorationPotionFocus, strongInvigorationPotionFocus, exstimuloPotionDamageBuff, exstimuloPotionUses, strongExstimuloPotionDamageBuff, strongExstimuloPotionUses, potentExstimuloPotionDamageBuff, potentExstimuloPotionUses, witSharpeningPotionDamageBuff, witSharpeningPotionUses, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"healthPotion\":0.35,\"weakInvigorationPotionFocus\":1,\"strongInvigorationPotionFocus\":3,\"exstimuloPotionDamageBuff\":0.5,\"exstimuloPotionUses\":3,\"strongExstimuloPotionDamageBuff\":1.25,\"strongExstimuloPotionUses\":4,\"potentExstimuloPotionDamageBuff\":2.25,\"potentExstimuloPotionUses\":5,\"witSharpeningPotionDamageBuff\":0.5,\"witSharpeningPotionUses\":3}");

/***/ }),

/***/ "../src/data/potionsBrewTime.json":
/*!****************************************!*\
  !*** ../src/data/potionsBrewTime.json ***!
  \****************************************/
/*! exports provided: healthPotion, weakInvigorationPotion, strongInvigorationPotion, exstimuloPotion, strongExstimuloPotion, potentExstimuloPotion, witSharpeningPotion, masterNotesDecrease, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"healthPotion\":2,\"weakInvigorationPotion\":4,\"strongInvigorationPotion\":6,\"exstimuloPotion\":2,\"strongExstimuloPotion\":4,\"potentExstimuloPotion\":8,\"witSharpeningPotion\":6,\"masterNotesDecrease\":0.85}");

/***/ }),

/***/ "../src/data/skillTreeAuror.json":
/*!***************************************!*\
  !*** ../src/data/skillTreeAuror.json ***!
  \***************************************/
/*! exports provided: data, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"data\":[{\"rowIndex\":0,\"columnIndex\":2,\"name\":\"The Auror Advantage\",\"triggerName\":\"aurorAdvantage\",\"statChangeDescription\":\"Power vs foes with less than 50% stamina\",\"levels\":[{\"statChange\":10,\"costScrolls\":2}],\"dependencies\":[]},{\"rowIndex\":1,\"columnIndex\":1,\"name\":\"Protego Practice\",\"statChangeDescription\":\"Protego Power\",\"statChanged\":\"protegoPower\",\"levels\":[{\"statChange\":0.01,\"costScrolls\":2},{\"statChange\":0.02,\"costScrolls\":2}],\"dependencies\":[\"0/2\"]},{\"rowIndex\":1,\"columnIndex\":3,\"name\":\"The Flitwick Method\",\"statChangeDescription\":\"POwer\",\"statChanged\":\"power\",\"levels\":[{\"statChange\":2,\"costScrolls\":2},{\"statChange\":2,\"costScrolls\":2}],\"dependencies\":[\"0/2\"]},{\"rowIndex\":2,\"columnIndex\":1,\"name\":\"Third Position\",\"statChangeDescription\":\"Power\",\"statChanged\":\"power\",\"levels\":[{\"statChange\":2,\"costScrolls\":4},{\"statChange\":2,\"costScrolls\":4},{\"statChange\":2,\"costScrolls\":4,\"costRedBooks\":1},{\"statChange\":2,\"costScrolls\":4,\"costRedBooks\":1}],\"dependencies\":[\"2/2\"]},{\"rowIndex\":2,\"columnIndex\":2,\"name\":\"The Weakening Hex\",\"triggerName\":\"weakeningHex\",\"statChangeDescription\":\"\",\"statChanged\":\"weakeningHexValue\",\"levels\":[{\"statChange\":0.25,\"costScrolls\":4}],\"dependencies\":[\"1/1\",\"1/3\"]},{\"rowIndex\":2,\"columnIndex\":4,\"name\":\"Field Training\",\"statChangeDescription\":\"Precision\",\"statChanged\":\"critChance\",\"levels\":[{\"statChange\":0.01,\"costScrolls\":4},{\"statChange\":0.01,\"costScrolls\":4},{\"statChange\":0.02,\"costScrolls\":4,\"costRedBooks\":1}],\"dependencies\":[\"2/2\"]},{\"rowIndex\":3,\"columnIndex\":0,\"name\":\"Resilience Training\",\"statChangeDescription\":\"Stamina\",\"statChanged\":\"stamina\",\"levels\":[{\"statChange\":6,\"costScrolls\":5},{\"statChange\":7,\"costScrolls\":5},{\"statChange\":8,\"costScrolls\":5,\"costRedBooks\":1}],\"dependencies\":[\"3/1\"]},{\"rowIndex\":3,\"columnIndex\":1,\"name\":\"Auror's Handbook\",\"statChangeDescription\":\"Stamina\",\"statChanged\":\"stamina\",\"levels\":[{\"statChange\":7,\"costScrolls\":5},{\"statChange\":8,\"costScrolls\":5}],\"dependencies\":[\"2/1\"]},{\"rowIndex\":3,\"columnIndex\":2,\"name\":\"The Bat Bogey Hex\",\"triggerName\":\"batBogeyHex\",\"statChangeDescription\":\"\",\"statChanged\":\"batBogeyHexDamage\",\"levels\":[{\"statChange\":1,\"costScrolls\":5}],\"dependencies\":[\"2/2\"]},{\"rowIndex\":3,\"columnIndex\":3,\"name\":\"Steel Conviction\",\"statChangeDescription\":\"Maximum Focus\",\"statChanged\":\"maxFocus\",\"levels\":[{\"statChange\":1,\"costScrolls\":5},{\"statChange\":1,\"costScrolls\":5}],\"dependencies\":[\"2/4\"]},{\"rowIndex\":4,\"columnIndex\":0,\"name\":\"Method in the Mad-Eye\",\"statChangeDescription\":\"Stamina\",\"statChanged\":\"stamina\",\"levels\":[{\"statChange\":7,\"costScrolls\":6},{\"statChange\":8,\"costScrolls\":6},{\"statChange\":10,\"costScrolls\":6,\"costRedBooks\":2}],\"dependencies\":[\"3/0\"]},{\"rowIndex\":4,\"columnIndex\":3,\"name\":\"Playing Dirty\",\"triggerName\":\"playingDirty\",\"statChangeDescription\":\"Defence vs foes with less than 50% stamina\",\"levels\":[{\"statChange\":0.1,\"costScrolls\":6,\"costRSB\":15}],\"dependencies\":[\"3/3\"]},{\"rowIndex\":4,\"columnIndex\":4,\"name\":\"Mind the Gaps\",\"statChangeDescription\":\"Precision\",\"statChanged\":\"critChance\",\"levels\":[{\"statChange\":0.01,\"costScrolls\":6},{\"statChange\":0.01,\"costScrolls\":6},{\"statChange\":0.02,\"costScrolls\":6,\"costRedBooks\":2},{\"statChange\":0.02,\"costScrolls\":6,\"costRedBooks\":4},{\"statChange\":0.03,\"costScrolls\":6,\"costRedBooks\":4}],\"dependencies\":[\"2/4\"]},{\"rowIndex\":5,\"columnIndex\":1,\"name\":\"Gawaining Experience\",\"statChangeDescription\":\"Stamina\",\"statChanged\":\"stamina\",\"levels\":[{\"statChange\":9,\"costScrolls\":7},{\"statChange\":10,\"costScrolls\":7}],\"dependencies\":[\"4/0\"]},{\"rowIndex\":5,\"columnIndex\":2,\"name\":\"Ferocious Bat Bogey Hex\",\"statChangeDescription\":\"Reduce for stamina\",\"statChanged\":\"batBogeyHexDamage\",\"levels\":[{\"statChange\":1,\"costScrolls\":7,\"costRSB\":4}],\"dependencies\":[\"3/2\"]},{\"rowIndex\":5,\"columnIndex\":3,\"name\":\"Self Reflection\",\"statChangeDescription\":\"Critical Power\",\"statChanged\":\"criticalPower\",\"levels\":[{\"statChange\":0.04,\"costScrolls\":7},{\"statChange\":0.05,\"costScrolls\":7},{\"statChange\":0.06,\"costScrolls\":7,\"costRedBooks\":2},{\"statChange\":0.07,\"costScrolls\":7,\"costRedBooks\":4}],\"dependencies\":[\"4/4\"]},{\"rowIndex\":6,\"columnIndex\":0,\"name\":\"Improved Weakness Hex\",\"statChangeDescription\":\"\",\"statChanged\":\"weakeningHexValue\",\"levels\":[{\"statChange\":0.05,\"costScrolls\":8,\"costRSB\":4},{\"statChange\":0.05,\"costScrolls\":8,\"costRSB\":4}],\"dependencies\":[\"5/1\"]},{\"rowIndex\":6,\"columnIndex\":2,\"name\":\"The Focus Charm\",\"triggerName\":\"focusCharm\",\"statChangeDescription\":\"Transfer focus to a teammate\",\"statChanged\":\"focusCharmValue\",\"levels\":[{\"statChange\":1,\"costScrolls\":8}],\"dependencies\":[\"5/1\",\"5/3\"]},{\"rowIndex\":6,\"columnIndex\":3,\"name\":\"The Duelists\",\"statChangeDescription\":\"Power\",\"statChanged\":\"power\",\"levels\":[{\"statChange\":2,\"costScrolls\":8},{\"statChange\":2,\"costScrolls\":8},{\"statChange\":2,\"costScrolls\":8,\"costRedBooks\":2},{\"statChange\":3,\"costScrolls\":8,\"costRedBooks\":5}],\"dependencies\":[\"5/3\"]},{\"rowIndex\":7,\"columnIndex\":0,\"name\":\"Duelling in the Dark\",\"statChangeDescription\":\"Initial Focus\",\"statChanged\":\"initialFocus\",\"levels\":[{\"statChange\":1,\"costScrolls\":10}],\"dependencies\":[\"6/0\"]},{\"rowIndex\":7,\"columnIndex\":1,\"name\":\"Somatic Casting\",\"statChangeDescription\":\"Power\",\"statChanged\":\"power\",\"levels\":[{\"statChange\":2,\"costScrolls\":10},{\"statChange\":2,\"costScrolls\":10},{\"statChange\":3,\"costScrolls\":10,\"costRedBooks\":3}],\"dependencies\":[\"6/1\"]},{\"rowIndex\":7,\"columnIndex\":3,\"name\":\"Full Body Fitness\",\"statChangeDescription\":\"Stamina\",\"statChanged\":\"stamina\",\"levels\":[{\"statChange\":9,\"costScrolls\":10},{\"statChange\":10,\"costScrolls\":10},{\"statChange\":12,\"costScrolls\":10,\"costRedBooks\":3}],\"dependencies\":[\"6/2\"]},{\"rowIndex\":7,\"columnIndex\":4,\"name\":\"Punishment Principle\",\"statChangeDescription\":\"Power\",\"statChanged\":\"power\",\"levels\":[{\"statChange\":2,\"costScrolls\":10},{\"statChange\":2,\"costScrolls\":10},{\"statChange\":3,\"costScrolls\":10,\"costRedBooks\":3},{\"statChange\":3,\"costScrolls\":10,\"costRedBooks\":7}],\"dependencies\":[\"6/3\"]},{\"rowIndex\":8,\"columnIndex\":2,\"name\":\"Duelling Dummy\",\"statChangeDescription\":\"Power\",\"statChanged\":\"power\",\"levels\":[{\"statChange\":3,\"costScrolls\":12},{\"statChange\":3,\"costScrolls\":12}],\"dependencies\":[\"6/2\"]},{\"rowIndex\":8,\"columnIndex\":3,\"name\":\"An Unforgivable\",\"statChangeDescription\":\"Stamina\",\"statChanged\":\"stamina\",\"levels\":[{\"statChange\":9,\"costScrolls\":12},{\"statChange\":10,\"costScrolls\":12},{\"statChange\":12,\"costScrolls\":12,\"costRedBooks\":4},{\"statChange\":15,\"costScrolls\":12,\"costRedBooks\":8}],\"dependencies\":[\"7/3\"]},{\"rowIndex\":8,\"columnIndex\":4,\"name\":\"Walden Macnair\",\"statChangeDescription\":\"Power\",\"statChanged\":\"power\",\"levels\":[{\"statChange\":3,\"costScrolls\":12},{\"statChange\":3,\"costScrolls\":12},{\"statChange\":3,\"costScrolls\":12,\"costRedBooks\":4}],\"dependencies\":[\"7/4\"]},{\"rowIndex\":9,\"columnIndex\":0,\"name\":\"Constant Vigilance\",\"statChangeDescription\":\"Maximum Focus\",\"statChanged\":\"maxFocus\",\"levels\":[{\"statChange\":1,\"costScrolls\":15},{\"statChange\":1,\"costScrolls\":15},{\"statChange\":1,\"costScrolls\":15,\"costRedBooks\":5}],\"dependencies\":[\"7/0\"]},{\"rowIndex\":9,\"columnIndex\":1,\"name\":\"To Protect and Serve\",\"statChangeDescription\":\"Proficiency Power\",\"statChanged\":\"proficiencyPower\",\"levels\":[{\"statChange\":0.05,\"costScrolls\":15},{\"statChange\":0.06,\"costScrolls\":15},{\"statChange\":0.08,\"costScrolls\":15,\"costRedBooks\":5},{\"statChange\":0.1,\"costScrolls\":15,\"costRedBooks\":10}],\"dependencies\":[\"7/1\"]},{\"rowIndex\":9,\"columnIndex\":2,\"name\":\"Dancing With Dummies\",\"triggerName\":\"dancingWithDummies\",\"statChangeDescription\":\"Precision vs foes with 100% stamina\",\"levels\":[{\"statChange\":0.35,\"costScrolls\":15,\"costRSB\":15}],\"dependencies\":[\"8/2\"]},{\"rowIndex\":9,\"columnIndex\":3,\"name\":\"Hidden Gem\",\"statChangeDescription\":\"Defence\",\"statChanged\":\"defence\",\"levels\":[{\"statChange\":0.06,\"costScrolls\":15},{\"statChange\":0.09,\"costScrolls\":15}],\"dependencies\":[\"8/3\"]},{\"rowIndex\":10,\"columnIndex\":0,\"name\":\"Practice Range\",\"statChangeDescription\":\"Accuracy\",\"statChanged\":\"accuracy\",\"levels\":[{\"statChange\":0.03,\"costScrolls\":18},{\"statChange\":0.05,\"costScrolls\":18},{\"statChange\":0.07,\"costScrolls\":18,\"costRedBooks\":6}],\"dependencies\":[\"9/0\"]},{\"rowIndex\":10,\"columnIndex\":1,\"name\":\"Weakness Hex Maxima\",\"statChangeDescription\":\"Impair Foe Power\",\"statChanged\":\"weakeningHexValue\",\"levels\":[{\"statChange\":0.05,\"costScrolls\":18,\"costRSB\":4},{\"statChange\":0.05,\"costScrolls\":18,\"costRSB\":4},{\"statChange\":0.05,\"costScrolls\":18,\"costRSB\":4}],\"dependencies\":[\"10/2\"]},{\"rowIndex\":10,\"columnIndex\":2,\"name\":\"The Confusion Hex\",\"triggerName\":\"confusionHex\",\"statChangeDescription\":\"\",\"statChanged\":\"confusionHexValue\",\"levels\":[{\"statChange\":0.2,\"costScrolls\":18}],\"dependencies\":[\"9/1\",\"9/3\"]},{\"rowIndex\":10,\"columnIndex\":4,\"name\":\"Diggles' Discriminating Discourse\",\"statChangeDescription\":\"Defence Breach\",\"statChanged\":\"defenceBreach\",\"levels\":[{\"statChange\":0.03,\"costScrolls\":18},{\"statChange\":0.04,\"costScrolls\":18},{\"statChange\":0.05,\"costScrolls\":18,\"costRedBooks\":6},{\"statChange\":0.08,\"costScrolls\":18,\"costRedBooks\":12},{\"statChange\":0.12,\"costScrolls\":18,\"costRedBooks\":12}],\"dependencies\":[\"8/4\"]},{\"rowIndex\":11,\"columnIndex\":0,\"name\":\"Confusion Hex Repetitions\",\"statChangeDescription\":\"\",\"statChanged\":\"confusionHexValue\",\"levels\":[{\"statChange\":0.1,\"costScrolls\":22,\"costRSB\":4},{\"statChange\":0.1,\"costScrolls\":22,\"costRSB\":4}],\"dependencies\":[\"10/1\"]},{\"rowIndex\":11,\"columnIndex\":1,\"name\":\"The Criminal Mind\",\"statChangeDescription\":\"Proficiency Power\",\"statChanged\":\"proficiencyPower\",\"levels\":[{\"statChange\":0.07,\"costScrolls\":22},{\"statChange\":0.08,\"costScrolls\":22},{\"statChange\":0.1,\"costScrolls\":22,\"costRedBooks\":14},{\"statChange\":0.13,\"costScrolls\":22,\"costRedBooks\":14}],\"dependencies\":[\"10/2\"]},{\"rowIndex\":11,\"columnIndex\":3,\"name\":\"Battle Instinct\",\"statChangeDescription\":\"Precision\",\"statChanged\":\"critChance\",\"levels\":[{\"statChange\":0.02,\"costScrolls\":22},{\"statChange\":0.02,\"costScrolls\":22},{\"statChange\":0.03,\"costScrolls\":22,\"costRedBooks\":14}],\"dependencies\":[\"10/2\"]},{\"rowIndex\":11,\"columnIndex\":4,\"name\":\"Creatures Elective\",\"statChangeDescription\":\"Deficiency Defence\",\"statChanged\":\"deficiencyDefence\",\"levels\":[{\"statChange\":0.06,\"costScrolls\":22},{\"statChange\":0.08,\"costScrolls\":22},{\"statChange\":0.11,\"costScrolls\":22,\"costRedBooks\":14}],\"dependencies\":[\"11/3\"]},{\"rowIndex\":12,\"columnIndex\":0,\"name\":\"Advanced Guard\",\"statChangeDescription\":\"Protego Power\",\"statChanged\":\"protegoPower\",\"levels\":[{\"statChange\":0.02,\"costScrolls\":26},{\"statChange\":0.02,\"costScrolls\":26},{\"statChange\":0.03,\"costScrolls\":26,\"costRedBooks\":17}],\"dependencies\":[\"12/1\"]},{\"rowIndex\":12,\"columnIndex\":1,\"name\":\"History of the Dark Arts\",\"statChangeDescription\":\"Proficiency Power\",\"statChanged\":\"proficiencyPower\",\"levels\":[{\"statChange\":0.08,\"costScrolls\":26},{\"statChange\":0.09,\"costScrolls\":26},{\"statChange\":0.11,\"costScrolls\":26,\"costRedBooks\":17},{\"statChange\":0.14,\"costScrolls\":26,\"costRedBooks\":17},{\"statChange\":0.19,\"costScrolls\":35,\"costRedBooks\":17}],\"dependencies\":[\"11/1\",\"12/2\"]},{\"rowIndex\":12,\"columnIndex\":2,\"name\":\"Thieves' Survival Guide\",\"statChangeDescription\":\"Precision\",\"statChanged\":\"critChance\",\"levels\":[{\"statChange\":0.02,\"costScrolls\":26},{\"statChange\":0.02,\"costScrolls\":26},{\"statChange\":0.03,\"costScrolls\":26,\"costRedBooks\":17},{\"statChange\":0.03,\"costScrolls\":26,\"costRedBooks\":17}],\"dependencies\":[\"11/3\",\"12/1\"]},{\"rowIndex\":12,\"columnIndex\":4,\"name\":\"Knowledge and Understanding\",\"statChangeDescription\":\"Deficiency Defence\",\"statChanged\":\"deficiencyDefence\",\"levels\":[{\"statChange\":0.11,\"costScrolls\":26},{\"statChange\":0.14,\"costScrolls\":26}],\"dependencies\":[\"11/4\"]},{\"rowIndex\":13,\"columnIndex\":0,\"name\":\"Into the Fire\",\"statChangeDescription\":\"Stamina\",\"statChanged\":\"stamina\",\"levels\":[{\"statChange\":11,\"costScrolls\":32},{\"statChange\":13,\"costScrolls\":32},{\"statChange\":15,\"costScrolls\":32,\"costRedBooks\":21}],\"dependencies\":[\"12/0\"]},{\"rowIndex\":13,\"columnIndex\":1,\"name\":\"Best Laid Plans\",\"statChangeDescription\":\"Initial Focus\",\"statChanged\":\"initialFocus\",\"levels\":[{\"statChange\":1,\"costScrolls\":32}],\"dependencies\":[\"12/1\"]},{\"rowIndex\":13,\"columnIndex\":2,\"name\":\"Accelerating Blast\",\"statChangeDescription\":\"Critical Power\",\"statChanged\":\"criticalPower\",\"levels\":[{\"statChange\":0.06,\"costScrolls\":32},{\"statChange\":0.07,\"costScrolls\":32},{\"statChange\":0.09,\"costScrolls\":32,\"costRedBooks\":21}],\"dependencies\":[\"12/2\",\"13/2\"]},{\"rowIndex\":13,\"columnIndex\":3,\"name\":\"Light and Shadow Room\",\"statChangeDescription\":\"Critical Power\",\"statChanged\":\"criticalPower\",\"levels\":[{\"statChange\":0.07,\"costScrolls\":32},{\"statChange\":0.09,\"costScrolls\":32},{\"statChange\":0.1,\"costScrolls\":32,\"costRedBooks\":21}],\"dependencies\":[\"13/2\",\"12/4\"]},{\"rowIndex\":13,\"columnIndex\":4,\"name\":\"Expanding Repertoire\",\"statChangeDescription\":\"Power\",\"statChanged\":\"power\",\"levels\":[{\"statChange\":3,\"costScrolls\":32},{\"statChange\":3,\"costScrolls\":32},{\"statChange\":3,\"costScrolls\":32,\"costRedBooks\":21},{\"statChange\":4,\"costScrolls\":32,\"costRedBooks\":21}],\"dependencies\":[\"12/4\"]},{\"rowIndex\":14,\"columnIndex\":0,\"name\":\"Fashion Forward\",\"statChangeDescription\":\"Defence\",\"statChanged\":\"defence\",\"levels\":[{\"statChange\":0.1,\"costScrolls\":38},{\"statChange\":0.14,\"costScrolls\":38}],\"dependencies\":[\"13/0\"]},{\"rowIndex\":14,\"columnIndex\":1,\"name\":\"Confusion Hex Mastery\",\"statChangeDescription\":\"\",\"statChanged\":\"confusionHexValue\",\"levels\":[{\"statChange\":0.1,\"costScrolls\":38,\"costRSB\":4},{\"statChange\":0.1,\"costScrolls\":38,\"costRSB\":4}],\"dependencies\":[\"13/0\"]},{\"rowIndex\":14,\"columnIndex\":4,\"name\":\"Perfect Form\",\"statChangeDescription\":\"Power\",\"statChanged\":\"power\",\"levels\":[{\"statChange\":3,\"costScrolls\":38},{\"statChange\":3,\"costScrolls\":38},{\"statChange\":4,\"costScrolls\":38,\"costRedBooks\":25},{\"statChange\":4,\"costScrolls\":38,\"costRedBooks\":25}],\"dependencies\":[\"13/4\"]},{\"rowIndex\":15,\"columnIndex\":0,\"name\":\"The Trick with Death Eaters\",\"statChangeDescription\":\"Precision vs Death Eaters\",\"triggerName\":\"trickWithDeathEaters\",\"levels\":[{\"statChange\":0.25,\"costScrolls\":46,\"costRSB\":15}],\"dependencies\":[\"14/0\"]},{\"rowIndex\":15,\"columnIndex\":2,\"name\":\"First Strike\",\"statChangeDescription\":\"Critical Power vs Foes with 100% Stamina\",\"triggerName\":\"firstStrike\",\"levels\":[{\"statChange\":0.5,\"costScrolls\":46,\"costRSB\":15}],\"dependencies\":[\"13/2\"]},{\"rowIndex\":15,\"columnIndex\":4,\"name\":\"Mundungus Among Us\",\"statChangeDescription\":\"Protego Power vs Dark Wizards\",\"triggerName\":\"mundungusAmongUs\",\"levels\":[{\"statChange\":0.2,\"costScrolls\":46,\"costRSB\":15}],\"dependencies\":[\"14/4\"]}]}");

/***/ }),

/***/ "../src/data/skillTreeMagizoologist.json":
/*!***********************************************!*\
  !*** ../src/data/skillTreeMagizoologist.json ***!
  \***********************************************/
/*! exports provided: data, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"data\":[{\"rowIndex\":0,\"columnIndex\":0,\"name\":\"A Noble Cause\",\"statChangeDescription\":\"Stamina\",\"statChanged\":\"stamina\",\"levels\":[{\"statChange\":6,\"costScrolls\":2},{\"statChange\":7,\"costScrolls\":2},{\"statChange\":8,\"costScrolls\":2},{\"statChange\":10,\"costScrolls\":2}],\"dependencies\":[\"2/0\"]},{\"rowIndex\":0,\"columnIndex\":2,\"name\":\"Ministry Magizoology Orientation\",\"triggerName\":\"ministryMagizoologyOrientation\",\"statChangeDescription\":\"Power when you have 50% or greater stamina\",\"levels\":[{\"statChange\":10,\"costScrolls\":2}],\"dependencies\":[]},{\"rowIndex\":1,\"columnIndex\":1,\"name\":\"Safety Orientation\",\"statChanged\":\"protegoPower\",\"statChangeDescription\":\"Protego Power\",\"levels\":[{\"statChange\":0.03,\"costScrolls\":2},{\"statChange\":0.04,\"costScrolls\":2}],\"dependencies\":[\"0/2\"]},{\"rowIndex\":1,\"columnIndex\":3,\"name\":\"Billywig Stings\",\"statChanged\":\"critChance\",\"statChangeDescription\":\"Precision\",\"levels\":[{\"statChange\":0.01,\"costScrolls\":2},{\"statChange\":0.02,\"costScrolls\":2}],\"dependencies\":[\"0/2\"]},{\"rowIndex\":2,\"columnIndex\":0,\"name\":\"Camp Firenze\",\"statChanged\":\"stamina\",\"statChangeDescription\":\"Stamina\",\"levels\":[{\"statChange\":7,\"costScrolls\":4},{\"statChange\":8,\"costScrolls\":4},{\"statChange\":9,\"costScrolls\":4,\"costRedBooks\":1},{\"statChange\":11,\"costScrolls\":4,\"costRedBooks\":1}],\"dependencies\":[\"2/2\"]},{\"rowIndex\":2,\"columnIndex\":2,\"name\":\"The Stamina Charm\",\"triggerName\":\"staminaCharm\",\"statChangeDescription\":\"Restore the Stamina of a Teammate\",\"statChanged\":\"staminaCharmValue\",\"levels\":[{\"statChange\":0.15,\"costScrolls\":4}],\"dependencies\":[\"1/1\",\"1/3\"]},{\"rowIndex\":2,\"columnIndex\":3,\"name\":\"Be the Erumpent\",\"statChangeDescription\":\"Power\",\"statChanged\":\"power\",\"levels\":[{\"statChange\":1,\"costScrolls\":4},{\"statChange\":1,\"costScrolls\":4}],\"dependencies\":[\"2/2\"]},{\"rowIndex\":3,\"columnIndex\":0,\"name\":\"Fire Crabs!\",\"statChangeDescription\":\"Stamina\",\"statChanged\":\"stamina\",\"levels\":[{\"statChange\":8,\"costScrolls\":5},{\"statChange\":9,\"costScrolls\":5},{\"statChange\":10,\"costScrolls\":5,\"costRedBooks\":1}],\"dependencies\":[\"2/0\"]},{\"rowIndex\":3,\"columnIndex\":2,\"name\":\"The Mending Charm\",\"triggerName\":\"mendingCharm\",\"statChangeDescription\":\"Restore a Teammate's Stamina by a small amount\",\"statChanged\":\"mendingCharmStaminaRestore\",\"levels\":[{\"statChange\":2,\"costScrolls\":5}],\"dependencies\":[\"2/2\"]},{\"rowIndex\":3,\"columnIndex\":3,\"name\":\"The Slightest Movement\",\"statChangeDescription\":\"Maximum Focus\",\"statChanged\":\"maxFocus\",\"levels\":[{\"statChange\":1,\"costScrolls\":5},{\"statChange\":1,\"costScrolls\":5}],\"dependencies\":[\"2/3\"]},{\"rowIndex\":3,\"columnIndex\":4,\"name\":\"Occamy in a Tea Pot\",\"statChangeDescription\":\"ProficiencyPower\",\"statChanged\":\"proficiencyPower\",\"levels\":[{\"statChange\":0.05,\"costScrolls\":5},{\"statChange\":0.06,\"costScrolls\":5},{\"statChange\":0.08,\"costScrolls\":5,\"costRedBooks\":1},{\"statChange\":0.1,\"costScrolls\":5,\"costRedBooks\":1}],\"dependencies\":[\"2/3\"]},{\"rowIndex\":4,\"columnIndex\":0,\"name\":\"Natural Defences\",\"statChangeDescription\":\"Defence\",\"statChanged\":\"defence\",\"levels\":[{\"statChange\":0.04,\"costScrolls\":6},{\"statChange\":0.05,\"costScrolls\":6}],\"dependencies\":[\"3/0\"]},{\"rowIndex\":4,\"columnIndex\":3,\"name\":\"Forum Quorum\",\"triggerName\":\"forumQuorum\",\"statChangeDescription\":\"Defence when you have 50% or greater stamina\",\"levels\":[{\"statChange\":0.04,\"costScrolls\":6,\"costRSB\":15}],\"dependencies\":[\"3/3\"]},{\"rowIndex\":4,\"columnIndex\":4,\"name\":\"Romanian Sojourn\",\"statChangeDescription\":\"Power\",\"statChanged\":\"power\",\"levels\":[{\"statChange\":1,\"costScrolls\":6},{\"statChange\":1,\"costScrolls\":6},{\"statChange\":2,\"costScrolls\":6,\"costRedBooks\":2},{\"statChange\":2,\"costScrolls\":6,\"costRedBooks\":4}],\"dependencies\":[\"3/4\"]},{\"rowIndex\":5,\"columnIndex\":1,\"name\":\"Live Chimaera Handling\",\"statChangeDescription\":\"Stamina\",\"statChanged\":\"stamina\",\"levels\":[{\"statChange\":8,\"costScrolls\":7},{\"statChange\":9,\"costScrolls\":7},{\"statChange\":10,\"costScrolls\":7,\"costRedBooks\":2},{\"statChange\":13,\"costScrolls\":7,\"costRedBooks\":4}],\"dependencies\":[\"4/0\"]},{\"rowIndex\":5,\"columnIndex\":2,\"name\":\"Mending Charm Maxima\",\"statChangeDescription\":\"Stamina restored to teammate\",\"statChanged\":\"mendingCharmStaminaRestore\",\"levels\":[{\"statChange\":2,\"costScrolls\":7,\"costRSB\":4}],\"dependencies\":[\"3/2\"]},{\"rowIndex\":5,\"columnIndex\":3,\"name\":\"Nowhere to Hide\",\"statChangeDescription\":\"Critical Power\",\"statChanged\":\"criticalPower\",\"levels\":[{\"statChange\":0.03,\"costScrolls\":7},{\"statChange\":0.03,\"costScrolls\":7},{\"statChange\":0.04,\"costScrolls\":7,\"costRedBooks\":2},{\"statChange\":0.05,\"costScrolls\":7,\"costRedBooks\":4}],\"dependencies\":[\"4/4\"]},{\"rowIndex\":6,\"columnIndex\":0,\"name\":\"Pain to Train\",\"statChangeDescription\":\"Stamina\",\"statChanged\":\"stamina\",\"levels\":[{\"statChange\":9,\"costScrolls\":8},{\"statChange\":10,\"costScrolls\":8},{\"statChange\":12,\"costScrolls\":8,\"costRedBooks\":2}],\"dependencies\":[\"5/1\"]},{\"rowIndex\":6,\"columnIndex\":2,\"name\":\"The Revive Charm\",\"triggerName\":\"reviveCharm\",\"statChangeDescription\":\"Revive a knocked-out Teammate and restore a portion of their Stamina\",\"statChanged\":\"reviveCharmValue\",\"levels\":[{\"statChange\":0.7,\"costScrolls\":8}],\"dependencies\":[\"5/1\",\"5/3\"]},{\"rowIndex\":7,\"columnIndex\":0,\"name\":\"Sky, Sea, Sky, Seafloor\",\"statChangeDescription\":\"Stamina\",\"statChanged\":\"stamina\",\"levels\":[{\"statChange\":9,\"costScrolls\":10},{\"statChange\":10,\"costScrolls\":10},{\"statChange\":12,\"costScrolls\":10,\"costRedBooks\":3},{\"statChange\":14,\"costScrolls\":10,\"costRedBooks\":7}],\"dependencies\":[\"6/0\"]},{\"rowIndex\":7,\"columnIndex\":1,\"name\":\"Alberta Toothill\",\"statChangeDescription\":\"Power\",\"statChanged\":\"power\",\"levels\":[{\"statChange\":2,\"costScrolls\":10},{\"statChange\":2,\"costScrolls\":10},{\"statChange\":2,\"costScrolls\":10,\"costRedBooks\":3}],\"dependencies\":[\"6/2\"]},{\"rowIndex\":7,\"columnIndex\":3,\"name\":\"Luna's Stamina Charm\",\"statChangeDescription\":\"Restore Teammate Stamina\",\"statChanged\":\"staminaCharmValue\",\"levels\":[{\"statChange\":0.05,\"costScrolls\":10,\"costRSB\":4}],\"dependencies\":[\"6/2\"]},{\"rowIndex\":7,\"columnIndex\":4,\"name\":\"How to Stun a Giant\",\"statChangeDescription\":\"Precision\",\"statChanged\":\"critChance\",\"levels\":[{\"statChange\":0.01,\"costScrolls\":10},{\"statChange\":0.02,\"costScrolls\":10},{\"statChange\":0.02,\"costScrolls\":10,\"costRedBooks\":3},{\"statChange\":0.03,\"costScrolls\":10,\"costRedBooks\":7},{\"statChange\":0.04,\"costScrolls\":10,\"costRedBooks\":7}],\"dependencies\":[\"5/3\"]},{\"rowIndex\":8,\"columnIndex\":2,\"name\":\"Celebrity Jeopardy\",\"statChangeDescription\":\"Maximum Focus\",\"statChanged\":\"maxFocus\",\"levels\":[{\"statChange\":1,\"costScrolls\":12},{\"statChange\":2,\"costScrolls\":12},{\"statChange\":2,\"costScrolls\":12,\"costRedBooks\":4}],\"dependencies\":[\"8/3\"]},{\"rowIndex\":8,\"columnIndex\":3,\"name\":\"Confound and Bewilder\",\"statChangeDescription\":\"Initial Focus\",\"statChanged\":\"initialFocus\",\"levels\":[{\"statChange\":1,\"costScrolls\":12},{\"statChange\":1,\"costScrolls\":12}],\"dependencies\":[\"7/3\"]},{\"rowIndex\":8,\"columnIndex\":4,\"name\":\"Mordecai's Method\",\"statChangeDescription\":\"Power\",\"statChanged\":\"power\",\"levels\":[{\"statChange\":2,\"costScrolls\":12},{\"statChange\":2,\"costScrolls\":12},{\"statChange\":2,\"costScrolls\":12,\"costRedBooks\":4}],\"dependencies\":[\"7/4\"]},{\"rowIndex\":9,\"columnIndex\":0,\"name\":\"Re'em\",\"statChangeDescription\":\"Stamina\",\"statChanged\":\"stamina\",\"levels\":[{\"statChange\":11,\"costScrolls\":15},{\"statChange\":12,\"costScrolls\":15},{\"statChange\":14,\"costScrolls\":15,\"costRedBooks\":5}],\"dependencies\":[\"7/0\"]},{\"rowIndex\":9,\"columnIndex\":1,\"name\":\"Wilderness Wear\",\"statChangeDescription\":\"Stamina\",\"statChanged\":\"stamina\",\"levels\":[{\"statChange\":12,\"costScrolls\":15},{\"statChange\":13,\"costScrolls\":15}],\"dependencies\":[\"7/1\"]},{\"rowIndex\":9,\"columnIndex\":2,\"name\":\"Become the Beast\",\"triggerName\":\"becomeTheBeast\",\"statChangeDescription\":\"Power when you have 5 or greater focus\",\"levels\":[{\"statChange\":40,\"costScrolls\":15,\"costRSB\":15}],\"dependencies\":[\"8/2\"]},{\"rowIndex\":10,\"columnIndex\":0,\"name\":\"Shield Charmer\",\"statChanged\":\"protegoPower\",\"statChangeDescription\":\"Protego Power\",\"levels\":[{\"statChange\":0.04,\"costScrolls\":18},{\"statChange\":0.06,\"costScrolls\":18},{\"statChange\":0.07,\"costScrolls\":18,\"costRedBooks\":6}],\"dependencies\":[\"9/0\"]},{\"rowIndex\":10,\"columnIndex\":2,\"name\":\"The Bravery Charm\",\"triggerName\":\"braveryCharm\",\"statChanged\":\"braveryCharmValue\",\"statChangeDescription\":\"Enhance your entire team by raising their Power against Elite Foes\",\"levels\":[{\"statChange\":0.6,\"costScrolls\":18}],\"dependencies\":[\"9/1\"]},{\"rowIndex\":10,\"columnIndex\":3,\"name\":\"Wilderness Wards\",\"statChanged\":\"defence\",\"statChangeDescription\":\"Defence\",\"levels\":[{\"statChange\":0.04,\"costScrolls\":18},{\"statChange\":0.05,\"costScrolls\":18},{\"statChange\":0.07,\"costScrolls\":18,\"costRedBooks\":6},{\"statChange\":0.09,\"costScrolls\":18,\"costRedBooks\":12}],\"dependencies\":[\"8/3\"]},{\"rowIndex\":10,\"columnIndex\":4,\"name\":\"Doxycide\",\"statChanged\":\"accuracy\",\"statChangeDescription\":\"Accuracy\",\"levels\":[{\"statChange\":0.04,\"costScrolls\":18},{\"statChange\":0.06,\"costScrolls\":18},{\"statChange\":0.1,\"costScrolls\":18,\"costRedBooks\":6}],\"dependencies\":[\"8/4\"]},{\"rowIndex\":11,\"columnIndex\":0,\"name\":\"Binns' Revenge\",\"statChanged\":\"defenceBreach\",\"statChangeDescription\":\"Defence Breach\",\"levels\":[{\"statChange\":0.02,\"costScrolls\":22},{\"statChange\":0.03,\"costScrolls\":22},{\"statChange\":0.04,\"costScrolls\":22,\"costRedBooks\":14},{\"statChange\":0.05,\"costScrolls\":22,\"costRedBooks\":14},{\"statChange\":0.08,\"costScrolls\":29,\"costRedBooks\":14}],\"dependencies\":[\"10/0\"]},{\"rowIndex\":11,\"columnIndex\":1,\"name\":\"Howling Wolves\",\"statChanged\":\"power\",\"statChangeDescription\":\"Power\",\"levels\":[{\"statChange\":2,\"costScrolls\":22},{\"statChange\":2,\"costScrolls\":22},{\"statChange\":2,\"costScrolls\":22,\"costRedBooks\":14},{\"statChange\":3,\"costScrolls\":22,\"costRedBooks\":14}],\"dependencies\":[\"10/2\"]},{\"rowIndex\":11,\"columnIndex\":2,\"name\":\"Pet Manticore\",\"statChanged\":\"stamina\",\"statChangeDescription\":\"Stamina\",\"levels\":[{\"statChange\":11,\"costScrolls\":22},{\"statChange\":12,\"costScrolls\":22},{\"statChange\":14,\"costScrolls\":22,\"costRedBooks\":14},{\"statChange\":17,\"costScrolls\":22,\"costRedBooks\":14}],\"dependencies\":[\"11/3\"]},{\"rowIndex\":11,\"columnIndex\":3,\"name\":\"Survival Training\",\"statChanged\":\"stamina\",\"statChangeDescription\":\"Stamina\",\"levels\":[{\"statChange\":11,\"costScrolls\":22},{\"statChange\":13,\"costScrolls\":22},{\"statChange\":14,\"costScrolls\":22,\"costRedBooks\":14},{\"statChange\":18,\"costScrolls\":22,\"costRedBooks\":14}],\"dependencies\":[\"10/2\"]},{\"rowIndex\":11,\"columnIndex\":4,\"name\":\"Guest Lecturer\",\"statChanged\":\"deficiencyDefence\",\"statChangeDescription\":\"Deficiency Defence\",\"levels\":[{\"statChange\":0.07,\"costScrolls\":22},{\"statChange\":0.1,\"costScrolls\":22},{\"statChange\":0.13,\"costScrolls\":22,\"costRedBooks\":14}],\"dependencies\":[\"11/3\"]},{\"rowIndex\":12,\"columnIndex\":1,\"name\":\"Necessary Force\",\"statChanged\":\"power\",\"statChangeDescription\":\"Power\",\"levels\":[{\"statChange\":2,\"costScrolls\":26},{\"statChange\":2,\"costScrolls\":26},{\"statChange\":3,\"costScrolls\":26,\"costRedBooks\":17},{\"statChange\":3,\"costScrolls\":26,\"costRedBooks\":17}],\"dependencies\":[\"11/1\"]},{\"rowIndex\":12,\"columnIndex\":2,\"name\":\"Acromantula Handling\",\"statChanged\":\"stamina\",\"statChangeDescription\":\"Stamina\",\"levels\":[{\"statChange\":13,\"costScrolls\":26},{\"statChange\":14,\"costScrolls\":26},{\"statChange\":17,\"costScrolls\":26,\"costRedBooks\":17}],\"dependencies\":[\"11/2\"]},{\"rowIndex\":12,\"columnIndex\":4,\"name\":\"Curiosities Killed a Cat\",\"statChanged\":\"deficiencyDefence\",\"statChangeDescription\":\"Deficiency Defence\",\"levels\":[{\"statChange\":0.13,\"costScrolls\":26},{\"statChange\":0.17,\"costScrolls\":26}],\"dependencies\":[\"11/4\"]},{\"rowIndex\":13,\"columnIndex\":0,\"name\":\"Improved Revive Charm\",\"statChanged\":\"reviveCharmValue\",\"statChangeDescription\":\"Teammate stamina on revive\",\"levels\":[{\"statChange\":0.1,\"costScrolls\":32,\"costRSB\":4},{\"statChange\":0.1,\"costScrolls\":32,\"costRSB\":4},{\"statChange\":0.1,\"costScrolls\":32,\"costRSB\":4}],\"dependencies\":[\"12/1\"]},{\"rowIndex\":13,\"columnIndex\":1,\"name\":\"Stamina Charm Maxima\",\"statChanged\":\"staminaCharmValue\",\"statChangeDescription\":\"Restore teammate stamina\",\"levels\":[{\"statChange\":0.05,\"costScrolls\":32,\"costRSB\":4},{\"statChange\":0.05,\"costScrolls\":32,\"costRSB\":4}],\"dependencies\":[\"12/1\"]},{\"rowIndex\":13,\"columnIndex\":3,\"name\":\"Breath of Dragons\",\"statChanged\":\"criticalPower\",\"statChangeDescription\":\"Critical Power\",\"levels\":[{\"statChange\":0.04,\"costScrolls\":32},{\"statChange\":0.05,\"costScrolls\":32},{\"statChange\":0.06,\"costScrolls\":32,\"costRedBooks\":21}],\"dependencies\":[\"12/4\"]},{\"rowIndex\":13,\"columnIndex\":4,\"name\":\"Two Creatures, Great and Small\",\"statChanged\":\"proficiencyPower\",\"statChangeDescription\":\"Proficiency Power\",\"levels\":[{\"statChange\":0.07,\"costScrolls\":32},{\"statChange\":0.08,\"costScrolls\":32},{\"statChange\":0.1,\"costScrolls\":32,\"costRedBooks\":21},{\"statChange\":0.13,\"costScrolls\":32,\"costRedBooks\":21}],\"dependencies\":[\"12/4\"]},{\"rowIndex\":14,\"columnIndex\":0,\"name\":\"Dragon Lady\",\"statChanged\":\"defence\",\"statChangeDescription\":\"Defence\",\"levels\":[{\"statChange\":0.07,\"costScrolls\":38},{\"statChange\":0.09,\"costScrolls\":38}],\"dependencies\":[\"13/0\"]},{\"rowIndex\":14,\"columnIndex\":1,\"name\":\"Trouble with 'truckles\",\"statChanged\":\"initialFocus\",\"statChangeDescription\":\"Initial Focus\",\"levels\":[{\"statChange\":1,\"costScrolls\":38}],\"dependencies\":[\"13/1\",\"14/2\"]},{\"rowIndex\":14,\"columnIndex\":2,\"name\":\"Lethifold\",\"statChanged\":\"criticalPower\",\"statChangeDescription\":\"Critical Power\",\"levels\":[{\"statChange\":0.05,\"costScrolls\":38},{\"statChange\":0.06,\"costScrolls\":38},{\"statChange\":0.07,\"costScrolls\":38,\"costRedBooks\":25}],\"dependencies\":[\"14/1\",\"13/3\"]},{\"rowIndex\":14,\"columnIndex\":3,\"name\":\"Amplified Bravery Charm\",\"statChanged\":\"braveryCharmValue\",\"statChangeDescription\":\"Enhance teammate power vs elites\",\"levels\":[{\"statChange\":0.3,\"costScrolls\":38,\"costRSB\":4},{\"statChange\":0.3,\"costScrolls\":38,\"costRSB\":4},{\"statChange\":0.3,\"costScrolls\":38,\"costRSB\":4}],\"dependencies\":[\"13/3\"]},{\"rowIndex\":14,\"columnIndex\":4,\"name\":\"Rolf Scamander\",\"statChanged\":\"proficiencyPower\",\"statChangeDescription\":\"Proficiency Power\",\"levels\":[{\"statChange\":0.08,\"costScrolls\":38},{\"statChange\":0.09,\"costScrolls\":38},{\"statChange\":0.11,\"costScrolls\":38,\"costRedBooks\":25},{\"statChange\":0.14,\"costScrolls\":38,\"costRedBooks\":25},{\"statChange\":0.19,\"costScrolls\":51,\"costRedBooks\":38}],\"dependencies\":[\"13/3\"]},{\"rowIndex\":15,\"columnIndex\":0,\"name\":\"Spiders!\",\"triggerName\":\"spiders\",\"statChangeDescription\":\"Defence vs spiders\",\"levels\":[{\"statChange\":0.2,\"costScrolls\":46,\"costRSB\":15}],\"dependencies\":[\"14/0\"]},{\"rowIndex\":15,\"columnIndex\":2,\"name\":\"A Bird In Hand\",\"triggerName\":\"birdInHand\",\"statChangeDescription\":\"Defence when you have 5 or greater focus\",\"levels\":[{\"statChange\":0.15,\"costScrolls\":46,\"costRSB\":15}],\"dependencies\":[\"14/2\"]},{\"rowIndex\":15,\"columnIndex\":4,\"name\":\"Vile Creatures\",\"triggerName\":\"vileCreatures\",\"statChangeDescription\":\"Power vs erklings\",\"levels\":[{\"statChange\":25,\"costScrolls\":46,\"costRSB\":15}],\"dependencies\":[\"14/4\"]}]}");

/***/ }),

/***/ "../src/data/skillTreeProfessor.json":
/*!*******************************************!*\
  !*** ../src/data/skillTreeProfessor.json ***!
  \*******************************************/
/*! exports provided: data, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"data\":[{\"rowIndex\":0,\"columnIndex\":2,\"name\":\"Ideal Exchange\",\"triggerName\":\"idealExchange\",\"statChangeDescription\":\"Power vs foes with 1 or greater impairments\",\"levels\":[{\"statChange\":5,\"costScrolls\":2}],\"dependencies\":[]},{\"rowIndex\":1,\"columnIndex\":1,\"name\":\"N.E.W.T.S Preparation\",\"statChangeDescription\":\"Stamina\",\"statChanged\":\"stamina\",\"levels\":[{\"statChange\":7,\"costScrolls\":2},{\"statChange\":8,\"costScrolls\":2}],\"dependencies\":[\"0/2\"]},{\"rowIndex\":1,\"columnIndex\":3,\"name\":\"Situational Understanding\",\"statChangeDescription\":\"Power\",\"statChanged\":\"power\",\"levels\":[{\"statChange\":2,\"costScrolls\":2},{\"statChange\":2,\"costScrolls\":2}],\"dependencies\":[\"0/2\"]},{\"rowIndex\":2,\"columnIndex\":0,\"name\":\"From Seed to Tree\",\"statChangeDescription\":\"Stamina\",\"statChanged\":\"stamina\",\"levels\":[{\"statChange\":7,\"costScrolls\":4},{\"statChange\":9,\"costScrolls\":4},{\"statChange\":10,\"costScrolls\":4,\"costRedBooks\":1}],\"dependencies\":[\"2/1\"]},{\"rowIndex\":2,\"columnIndex\":1,\"name\":\"A New Perspective\",\"statChangeDescription\":\"Defence\",\"statChanged\":\"defence\",\"levels\":[{\"statChange\":0.07,\"costScrolls\":4},{\"statChange\":0.1,\"costScrolls\":4}],\"dependencies\":[\"2/2\"]},{\"rowIndex\":2,\"columnIndex\":2,\"name\":\"The Deterioration Hex\",\"triggerName\":\"deteriorationHex\",\"statChangeDescription\":\"\",\"statChanged\":\"deteriorationHexDamage\",\"levels\":[{\"statChange\":5,\"costScrolls\":4}],\"dependencies\":[\"1/1\",\"1/3\"]},{\"rowIndex\":2,\"columnIndex\":3,\"name\":\"Book Mates\",\"statChangeDescription\":\"Power\",\"statChanged\":\"power\",\"levels\":[{\"statChange\":2,\"costScrolls\":4},{\"statChange\":2,\"costScrolls\":4}],\"dependencies\":[\"2/2\"]},{\"rowIndex\":2,\"columnIndex\":4,\"name\":\"Room of Requirement\",\"statChangeDescription\":\"Power\",\"statChanged\":\"power\",\"levels\":[{\"statChange\":2,\"costScrolls\":4},{\"statChange\":3,\"costScrolls\":4}],\"dependencies\":[\"2/3\"]},{\"rowIndex\":3,\"columnIndex\":0,\"name\":\"Restricted Section\",\"triggerName\":\"restrictedSection\",\"statChangeDescription\":\"Defence vs foes with 1 or greater impairments\",\"levels\":[{\"statChange\":0.06,\"costScrolls\":5,\"costRSB\":15}],\"dependencies\":[\"2/0\"]},{\"rowIndex\":3,\"columnIndex\":1,\"name\":\"Improved Deterioration Hex\",\"statChangeDescription\":\"Impair Foe Stamina\",\"statChanged\":\"deteriorationHexDamage\",\"levels\":[{\"statChange\":5,\"costScrolls\":5,\"costRSB\":4},{\"statChange\":5,\"costScrolls\":5,\"costRSB\":4}],\"dependencies\":[\"2/1\"]},{\"rowIndex\":3,\"columnIndex\":2,\"name\":\"The Mending Charm\",\"triggerName\":\"mendingCharm\",\"statChangeDescription\":\"\",\"statChanged\":\"mendingCharmStaminaRestore\",\"levels\":[{\"statChange\":2,\"costScrolls\":5}],\"dependencies\":[\"2/2\"]},{\"rowIndex\":3,\"columnIndex\":4,\"name\":\"Strength in Numbers\",\"triggerName\":\"strengthInNumbers\",\"statChangeDescription\":\"Power when you have 1 or greater enhancements\",\"levels\":[{\"statChange\":5,\"costScrolls\":5,\"costRSB\":15}],\"dependencies\":[\"2/4\"]},{\"rowIndex\":4,\"columnIndex\":0,\"name\":\"Sparring Specifics\",\"triggerName\":\"sparringSpecifics\",\"statChangeDescription\":\"Defence vs foes with 2 or greater impairments\",\"levels\":[{\"statChange\":0.09,\"costScrolls\":6,\"costRSB\":15}],\"dependencies\":[\"3/0\"]},{\"rowIndex\":4,\"columnIndex\":3,\"name\":\"Binns Mode\",\"statChangeDescription\":\"Precision\",\"statChanged\":\"critChance\",\"levels\":[{\"statChange\":0.01,\"costScrolls\":6},{\"statChange\":0.02,\"costScrolls\":6}],\"dependencies\":[\"2/3\"]},{\"rowIndex\":5,\"columnIndex\":1,\"name\":\"Summer Reading\",\"statChangeDescription\":\"Proficiency Power\",\"statChanged\":\"proficiencyPower\",\"levels\":[{\"statChange\":0.09,\"costScrolls\":7},{\"statChange\":0.11,\"costScrolls\":7},{\"statChange\":0.14,\"costScrolls\":7,\"costRedBooks\":2},{\"statChange\":0.19,\"costScrolls\":7,\"costRedBooks\":4}],\"dependencies\":[\"3/1\"]},{\"rowIndex\":5,\"columnIndex\":2,\"name\":\"Mending Charm Maxima\",\"statChangeDescription\":\"Stamina restored to teammate\",\"statChanged\":\"mendingCharmStaminaRestore\",\"levels\":[{\"statChange\":2,\"costScrolls\":7,\"costRSB\":4}],\"dependencies\":[\"3/2\"]},{\"rowIndex\":5,\"columnIndex\":3,\"name\":\"Light Reading\",\"statChangeDescription\":\"Critical Power\",\"statChanged\":\"criticalPower\",\"levels\":[{\"statChange\":0.05,\"costScrolls\":7},{\"statChange\":0.06,\"costScrolls\":7}],\"dependencies\":[\"4/3\"]},{\"rowIndex\":5,\"columnIndex\":4,\"name\":\"Teamwork Makes the Dream Work\",\"statChangeDescription\":\"Power when you have 2 or greater enhancements\",\"triggerName\":\"teamworkMakesTheDreamWork\",\"levels\":[{\"statChange\":12,\"costScrolls\":7,\"costRSB\":15}],\"dependencies\":[\"3/4\"]},{\"rowIndex\":6,\"columnIndex\":0,\"name\":\"Confidence\",\"statChangeDescription\":\"Defence when you have 1 or greater enhancements\",\"triggerName\":\"confidence\",\"levels\":[{\"statChange\":0.06,\"costScrolls\":8,\"costRSB\":15}],\"dependencies\":[\"6/1\"]},{\"rowIndex\":6,\"columnIndex\":1,\"name\":\"The Art of the Stance\",\"statChangeDescription\":\"Stamina\",\"statChanged\":\"stamina\",\"levels\":[{\"statChange\":8,\"costScrolls\":8},{\"statChange\":10,\"costScrolls\":8},{\"statChange\":11,\"costScrolls\":8,\"costRedBooks\":2}],\"dependencies\":[\"6/2\"]},{\"rowIndex\":6,\"columnIndex\":2,\"name\":\"The Protection Charm\",\"triggerName\":\"defenceCharm\",\"statChangeDescription\":\"\",\"statChanged\":\"defenceCharmIncrease\",\"levels\":[{\"statChange\":0.16,\"costScrolls\":8}],\"dependencies\":[\"5/1\",\"5/3\"]},{\"rowIndex\":6,\"columnIndex\":3,\"name\":\"Wand Wizardry\",\"statChangeDescription\":\"Power\",\"statChanged\":\"power\",\"levels\":[{\"statChange\":2,\"costScrolls\":8},{\"statChange\":3,\"costScrolls\":8},{\"statChange\":3,\"costScrolls\":8,\"costRedBooks\":2}],\"dependencies\":[\"6/2\"]},{\"rowIndex\":6,\"columnIndex\":4,\"name\":\"Attention to Detail\",\"statChangeDescription\":\"Precision\",\"statChanged\":\"critChance\",\"levels\":[{\"statChange\":0.02,\"costScrolls\":8},{\"statChange\":0.02,\"costScrolls\":8},{\"statChange\":0.03,\"costScrolls\":8,\"costRedBooks\":2}],\"dependencies\":[\"6/3\"]},{\"rowIndex\":7,\"columnIndex\":0,\"name\":\"Divinating Details\",\"statChangeDescription\":\"Initial Focus\",\"statChanged\":\"initialFocus\",\"levels\":[{\"statChange\":1,\"costScrolls\":10},{\"statChange\":1,\"costScrolls\":10}],\"dependencies\":[\"6/0\"]},{\"rowIndex\":7,\"columnIndex\":1,\"name\":\"Poppy's Prescription\",\"statChangeDescription\":\"Stamina\",\"statChanged\":\"stamina\",\"levels\":[{\"statChange\":9,\"costScrolls\":10},{\"statChange\":10,\"costScrolls\":10},{\"statChange\":11,\"costScrolls\":10,\"costRedBooks\":3},{\"statChange\":14,\"costScrolls\":10,\"costRedBooks\":7}],\"dependencies\":[\"6/1\"]},{\"rowIndex\":7,\"columnIndex\":2,\"name\":\"Nearly Headless Nick\",\"statChangeDescription\":\"Stamina\",\"statChanged\":\"stamina\",\"levels\":[{\"statChange\":9,\"costScrolls\":10},{\"statChange\":10,\"costScrolls\":10},{\"statChange\":11,\"costScrolls\":10,\"costRedBooks\":3},{\"statChange\":14,\"costScrolls\":10,\"costRedBooks\":7},{\"statChange\":19,\"costScrolls\":10,\"costRedBooks\":7}],\"dependencies\":[\"7/1\"]},{\"rowIndex\":7,\"columnIndex\":3,\"name\":\"Deterioration Hex Maxima\",\"statChangeDescription\":\"Impair Foe Stamina\",\"statChanged\":\"deteriorationHexDamage\",\"levels\":[{\"statChange\":5,\"costScrolls\":10,\"costRSB\":4},{\"statChange\":5,\"costScrolls\":10,\"costRSB\":4},{\"statChange\":5,\"costScrolls\":10,\"costRSB\":4}],\"dependencies\":[\"6/3\"]},{\"rowIndex\":7,\"columnIndex\":4,\"name\":\"Subliminal Understanding\",\"statChangeDescription\":\"Precision\",\"statChanged\":\"critChance\",\"levels\":[{\"statChange\":0.02,\"costScrolls\":10},{\"statChange\":0.03,\"costScrolls\":10},{\"statChange\":0.03,\"costScrolls\":10,\"costRedBooks\":3}],\"dependencies\":[\"6/4\"]},{\"rowIndex\":8,\"columnIndex\":1,\"name\":\"Enhanced Protection Charm\",\"statChangeDescription\":\"Enhance Teammate Defence\",\"statChanged\":\"defenceCharmIncrease\",\"levels\":[{\"statChange\":0.02,\"costScrolls\":12,\"costRSB\":4},{\"statChange\":0.02,\"costScrolls\":12,\"costRSB\":4},{\"statChange\":0.02,\"costScrolls\":12,\"costRSB\":4}],\"dependencies\":[\"7/1\"]},{\"rowIndex\":8,\"columnIndex\":2,\"name\":\"Falling for Quidditch\",\"statChangeDescription\":\"Stamina\",\"statChanged\":\"stamina\",\"levels\":[{\"statChange\":11,\"costScrolls\":12},{\"statChange\":12,\"costScrolls\":12},{\"statChange\":15,\"costScrolls\":12,\"costRedBooks\":4},{\"statChange\":18,\"costScrolls\":12,\"costRedBooks\":8}],\"dependencies\":[\"7/2\"]},{\"rowIndex\":8,\"columnIndex\":4,\"name\":\"Pronunciation Proclamation\",\"statChangeDescription\":\"Power\",\"statChanged\":\"power\",\"levels\":[{\"statChange\":3,\"costScrolls\":12},{\"statChange\":3,\"costScrolls\":12},{\"statChange\":3,\"costScrolls\":12,\"costRedBooks\":4}],\"dependencies\":[\"7/4\"]},{\"rowIndex\":9,\"columnIndex\":1,\"name\":\"Problem Solving\",\"statChangeDescription\":\"Defence Breach\",\"statChanged\":\"defenceBreach\",\"levels\":[{\"statChange\":0.03,\"costScrolls\":15},{\"statChange\":0.05,\"costScrolls\":15},{\"statChange\":0.07,\"costScrolls\":15,\"costRedBooks\":5}],\"dependencies\":[\"8/1\"]},{\"rowIndex\":9,\"columnIndex\":2,\"name\":\"Master Mind\",\"statChangeDescription\":\"Maximum Focus\",\"statChanged\":\"maxFocus\",\"levels\":[{\"statChange\":1,\"costScrolls\":15},{\"statChange\":2,\"costScrolls\":15},{\"statChange\":2,\"costScrolls\":15,\"costRedBooks\":5}],\"dependencies\":[\"9/1\"]},{\"rowIndex\":9,\"columnIndex\":3,\"name\":\"Flight of Fancy\",\"statChangeDescription\":\"Accuracy\",\"statChanged\":\"accuracy\",\"levels\":[{\"statChange\":0.03,\"costScrolls\":15},{\"statChange\":0.04,\"costScrolls\":15},{\"statChange\":0.05,\"costScrolls\":15,\"costRedBooks\":5},{\"statChange\":0.08,\"costScrolls\":15,\"costRedBooks\":10},{\"statChange\":0.12,\"costScrolls\":15,\"costRedBooks\":10}],\"dependencies\":[\"7/3\"]},{\"rowIndex\":9,\"columnIndex\":4,\"name\":\"Legendary Lesson\",\"statChangeDescription\":\"Deficiency Defence\",\"statChanged\":\"deficiencyDefence\",\"levels\":[{\"statChange\":0.06,\"costScrolls\":15},{\"statChange\":0.08,\"costScrolls\":15},{\"statChange\":0.11,\"costScrolls\":15,\"costRedBooks\":5}],\"dependencies\":[\"8/4\"]},{\"rowIndex\":10,\"columnIndex\":0,\"name\":\"Team Teaching\",\"triggerName\":\"teamTeaching\",\"statChangeDescription\":\"Defence when you have 2 or greater enhancements\",\"levels\":[{\"statChange\":0.09,\"costScrolls\":18,\"costRSB\":15}],\"dependencies\":[\"7/0\"]},{\"rowIndex\":10,\"columnIndex\":2,\"name\":\"The Proficiency Charm\",\"triggerName\":\"proficiencyPowerCharm\",\"statChangeDescription\":\"\",\"statChanged\":\"proficiencyPowerCharmIncrease\",\"levels\":[{\"statChange\":0.16,\"costScrolls\":18}],\"dependencies\":[\"9/1\",\"10/3\"]},{\"rowIndex\":10,\"columnIndex\":3,\"name\":\"The Dark Forces\",\"statChangeDescription\":\"Deficiency Defence\",\"statChanged\":\"deficiencyDefence\",\"levels\":[{\"statChange\":0.11,\"costScrolls\":18},{\"statChange\":0.14,\"costScrolls\":18}],\"dependencies\":[\"9/3\",\"9/4\",\"10/2\"]},{\"rowIndex\":11,\"columnIndex\":0,\"name\":\"Fly on the Wall\",\"statChangeDescription\":\"Power\",\"statChanged\":\"power\",\"levels\":[{\"statChange\":3,\"costScrolls\":22},{\"statChange\":3,\"costScrolls\":22},{\"statChange\":4,\"costScrolls\":22,\"costRedBooks\":14},{\"statChange\":4,\"costScrolls\":22,\"costRedBooks\":14}],\"dependencies\":[\"11/1\"]},{\"rowIndex\":11,\"columnIndex\":1,\"name\":\"Star Power\",\"statChangeDescription\":\"Power\",\"statChanged\":\"power\",\"levels\":[{\"statChange\":3,\"costScrolls\":22},{\"statChange\":3,\"costScrolls\":22},{\"statChange\":4,\"costScrolls\":22,\"costRedBooks\":14},{\"statChange\":5,\"costScrolls\":22,\"costRedBooks\":14}],\"dependencies\":[\"10/2\"]},{\"rowIndex\":11,\"columnIndex\":3,\"name\":\"Protection Theory Analysis\",\"statChangeDescription\":\"Protego Power\",\"statChanged\":\"protegoPower\",\"levels\":[{\"statChange\":0.02,\"costScrolls\":22},{\"statChange\":0.03,\"costScrolls\":22}],\"dependencies\":[\"10/2\"]},{\"rowIndex\":12,\"columnIndex\":1,\"name\":\"The Lost Masterpiece\",\"statChangeDescription\":\"Critical Power\",\"statChanged\":\"criticalPower\",\"levels\":[{\"statChange\":0.06,\"costScrolls\":26},{\"statChange\":0.07,\"costScrolls\":26},{\"statChange\":0.09,\"costScrolls\":26,\"costRedBooks\":17}],\"dependencies\":[\"11/1\"]},{\"rowIndex\":12,\"columnIndex\":2,\"name\":\"The Open Mind\",\"statChangeDescription\":\"Maximum Focus\",\"statChanged\":\"maxFocus\",\"levels\":[{\"statChange\":2,\"costScrolls\":26},{\"statChange\":3,\"costScrolls\":26}],\"dependencies\":[\"10/2\"]},{\"rowIndex\":12,\"columnIndex\":4,\"name\":\"Perfected Proficiency Charm\",\"statChangeDescription\":\"Proficiency Power Charm\",\"statChanged\":\"proficiencyPowerCharmIncrease\",\"levels\":[{\"statChange\":0.04,\"costScrolls\":26,\"costRSB\":4},{\"statChange\":0.04,\"costScrolls\":26,\"costRSB\":4},{\"statChange\":0.04,\"costScrolls\":26,\"costRSB\":4}],\"dependencies\":[\"11/3\"]},{\"rowIndex\":13,\"columnIndex\":0,\"name\":\"Perfected Protection Charm\",\"statChangeDescription\":\"Enhance Teammate Defence\",\"statChanged\":\"defenceCharmIncrease\",\"levels\":[{\"statChange\":0.02,\"costScrolls\":32,\"costRSB\":4},{\"statChange\":0.02,\"costScrolls\":32,\"costRSB\":4},{\"statChange\":0.02,\"costScrolls\":32,\"costRSB\":4},{\"statChange\":0.02,\"costScrolls\":32,\"costRSB\":4}],\"dependencies\":[\"12/1\"]},{\"rowIndex\":13,\"columnIndex\":1,\"name\":\"American Ingenuity\",\"statChangeDescription\":\"Critical Power\",\"statChanged\":\"criticalPower\",\"levels\":[{\"statChange\":0.08,\"costScrolls\":32},{\"statChange\":0.09,\"costScrolls\":32},{\"statChange\":0.11,\"costScrolls\":32,\"costRedBooks\":21}],\"dependencies\":[\"12/1\"]},{\"rowIndex\":13,\"columnIndex\":2,\"name\":\"Deterioration Hex Mastery\",\"statChangeDescription\":\"Impair Foe Stamina\",\"statChanged\":\"deteriorationHexDamage\",\"levels\":[{\"statChange\":5,\"costScrolls\":32,\"costRSB\":4},{\"statChange\":5,\"costScrolls\":32,\"costRSB\":4}],\"dependencies\":[\"12/2\"]},{\"rowIndex\":13,\"columnIndex\":4,\"name\":\"Dementors\",\"statChangeDescription\":\"Proficiency Power\",\"statChanged\":\"proficiencyPower\",\"levels\":[{\"statChange\":0.14,\"costScrolls\":32},{\"statChange\":0.17,\"costScrolls\":32},{\"statChange\":0.2,\"costScrolls\":32,\"costRedBooks\":21},{\"statChange\":0.26,\"costScrolls\":32,\"costRedBooks\":21}],\"dependencies\":[\"12/4\"]},{\"rowIndex\":14,\"columnIndex\":1,\"name\":\"Confronting the Faceless\",\"statChangeDescription\":\"Protego Power\",\"statChanged\":\"protegoPower\",\"levels\":[{\"statChange\":0.04,\"costScrolls\":38},{\"statChange\":0.05,\"costScrolls\":38},{\"statChange\":0.06,\"costScrolls\":38,\"costRedBooks\":25}],\"dependencies\":[\"13/1\",\"14/3\"]},{\"rowIndex\":14,\"columnIndex\":3,\"name\":\"Advanced Proficiency Charm\",\"statChangeDescription\":\"Proficiency Power Charm\",\"statChanged\":\"proficiencyPowerCharmIncrease\",\"levels\":[{\"statChange\":0.04,\"costScrolls\":38,\"costRSB\":4},{\"statChange\":0.04,\"costScrolls\":38,\"costRSB\":4},{\"statChange\":0.04,\"costScrolls\":38,\"costRSB\":4},{\"statChange\":0.04,\"costScrolls\":38,\"costRSB\":4}],\"dependencies\":[\"14/1\",\"13/4\"]},{\"rowIndex\":14,\"columnIndex\":4,\"name\":\"On Sabbatical\",\"triggerName\":\"onSabbatical\",\"statChangeDescription\":\"Power vs foes with 3 or greater impairments\",\"levels\":[{\"statChange\":12,\"costScrolls\":38,\"costRSB\":15}],\"dependencies\":[\"14/3\"]},{\"rowIndex\":15,\"columnIndex\":0,\"name\":\"Pesky Pixies\",\"triggerName\":\"peskyPixies\",\"statChangeDescription\":\"Accuracy vs Pixies\",\"levels\":[{\"statChange\":0.3,\"costScrolls\":46,\"costRSB\":15}],\"dependencies\":[\"13/0\"]},{\"rowIndex\":15,\"columnIndex\":1,\"name\":\"The Living Textbook\",\"statChangeDescription\":\"Defence\",\"statChanged\":\"defence\",\"levels\":[{\"statChange\":0.12,\"costScrolls\":46},{\"statChange\":0.15,\"costScrolls\":46}],\"dependencies\":[\"14/1\"]},{\"rowIndex\":15,\"columnIndex\":3,\"name\":\"Student Teaching\",\"statChangeDescription\":\"Stamina\",\"statChanged\":\"stamina\",\"levels\":[{\"statChange\":12,\"costScrolls\":46},{\"statChange\":14,\"costScrolls\":46},{\"statChange\":17,\"costScrolls\":46,\"costRedBooks\":30},{\"statChange\":21,\"costScrolls\":46,\"costRedBooks\":30}],\"dependencies\":[\"15/1\"]},{\"rowIndex\":15,\"columnIndex\":4,\"name\":\"Full Moon Hunter\",\"triggerName\":\"fullMoonHunter\",\"statChangeDescription\":\"Defence Breach vs Werewolves\",\"levels\":[{\"statChange\":0.3,\"costScrolls\":46,\"costRSB\":15}],\"dependencies\":[\"15/3\"]}]}");

/***/ }),

/***/ "../src/data/spellCooldowns.json":
/*!***************************************!*\
  !*** ../src/data/spellCooldowns.json ***!
  \***************************************/
/*! exports provided: mendingCharm, batBogeyHex, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"mendingCharm\":6000,\"batBogeyHex\":6000}");

/***/ }),

/***/ "../src/data/wizardBaseStats.json":
/*!****************************************!*\
  !*** ../src/data/wizardBaseStats.json ***!
  \****************************************/
/*! exports provided: dataSource, data, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"dataSource\":\"https://wizardsunite.gamepress.gg/reference/professor-skill-tree\",\"data\":{\"stamina\":100,\"defence\":0,\"defenceBreach\":0,\"deficiencyDefence\":0,\"initialFocus\":2,\"maxFocus\":5,\"power\":20,\"proficiencyPower\":0.2,\"protegoPower\":0.25,\"critChance\":0.05,\"criticalPower\":0.5,\"accuracy\":0,\"weakeningHexValue\":0,\"focusCharmValue\":0,\"confusionHexValue\":0,\"batBogeyHexDamage\":0,\"braveryCharmValue\":0,\"staminaCharmValue\":0,\"reviveCharmValue\":0,\"deteriorationHexDamage\":0,\"mendingCharmStaminaRestore\":0,\"defenceCharmIncrease\":0,\"proficiencyPowerCharmIncrease\":0}}");

/***/ }),

/***/ "../src/model/Combatant.ts":
/*!*********************************!*\
  !*** ../src/model/Combatant.ts ***!
  \*********************************/
/*! exports provided: Combatant */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Combatant", function() { return Combatant; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");

var Combatant = /** @class */ (function () {
    function Combatant(maxStamina) {
        this.inCombat = false; // Is in combat? Enemies in combat cannot be entered into combat with by other players
        this.isDefeated = false; // Is dead? Enemies are permanently dead, players are revived after a while
        this.currentStamina = maxStamina;
        this.currentStaminaPercent = 1;
        this.maxStamina = maxStamina;
    }
    Combatant.prototype.setStamina = function (stamina) {
        this.currentStamina = stamina;
        this.currentStaminaPercent = this.getCurrentStaminaPercent(); // Used for rules, which cannot call functions but need a value
    };
    Combatant.prototype.addStamina = function (stamina) {
        this.setStamina(Math.min(this.maxStamina, this.currentStamina + stamina));
    };
    Combatant.prototype.addStaminaPercent = function (maxStaminaPercent) {
        // TODO: is ceiling here correct?
        var amount = Math.ceil(this.getMaxStamina() * maxStaminaPercent);
        this.addStamina(amount);
    };
    Combatant.prototype.removeStamina = function (stamina) {
        this.setStamina(this.currentStamina - stamina);
        if (this.currentStamina <= 0) {
            this.setDefeated();
        }
    };
    Combatant.prototype.getIsDefeated = function () {
        return this.isDefeated;
    };
    Combatant.prototype.setDefeated = function () {
        this.isDefeated = true;
        this.setStamina(0);
    };
    Combatant.prototype.getCurrentStamina = function () {
        return this.currentStamina;
    };
    Combatant.prototype.getMaxStamina = function () {
        return this.maxStamina;
    };
    Combatant.prototype.getCurrentStaminaPercent = function () {
        return this.getCurrentStamina() / this.getMaxStamina();
    };
    return Combatant;
}());



/***/ }),

/***/ "../src/model/CombatantStats.ts":
/*!**************************************!*\
  !*** ../src/model/CombatantStats.ts ***!
  \**************************************/
/*! exports provided: CombatantStats */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CombatantStats", function() { return CombatantStats; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");

var CombatantStats = /** @class */ (function () {
    function CombatantStats(stamina, defence, deficiencyDefence, power, proficiencyPower, defenceBreach) {
        this.stamina = stamina;
        this.defence = defence;
        this.deficiencyDefence = deficiencyDefence;
        this.power = power;
        this.proficiencyPower = proficiencyPower;
        this.defenceBreach = defenceBreach;
    }
    return CombatantStats;
}());



/***/ }),

/***/ "../src/model/env/FortressRoom.ts":
/*!****************************************!*\
  !*** ../src/model/env/FortressRoom.ts ***!
  \****************************************/
/*! exports provided: FortressRoom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FortressRoom", function() { return FortressRoom; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _data_fortressDifficulties_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/fortressDifficulties.json */ "../src/data/fortressDifficulties.json");
var _data_fortressDifficulties_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../data/fortressDifficulties.json */ "../src/data/fortressDifficulties.json", 1);
/* harmony import */ var _data_fortressRewards_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../data/fortressRewards.json */ "../src/data/fortressRewards.json");
var _data_fortressRewards_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../data/fortressRewards.json */ "../src/data/fortressRewards.json", 1);
/* harmony import */ var _enemies_EnemyGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./enemies/EnemyGenerator */ "../src/model/env/enemies/EnemyGenerator.ts");




var FortressRoom = /** @class */ (function () {
    function FortressRoom(params, rng) {
        this.enemiesActive = [];
        this.runestoneLevels = params.runestoneLevels;
        this.nameClasses = params.nameClasses;
        this.roomLevel = params.roomLevel;
        this.playerCount = params.runestoneLevels.length;
        this.overallDifficulty = this.computeOverallDifficulty();
        this.focusBudget = this.computeFocusBudget();
        this.maxtime = this.computeMaxtime();
        this.knockoutTime = this.computeKnockoutTime();
        this.enemiesAll = this.generateEnemies(rng);
    }
    ;
    FortressRoom.prototype.addEnemyToActive = function (enemy) {
        if (this.enemiesActive.indexOf(enemy) === -1) {
            this.enemiesActive.push(enemy);
        }
        else {
            throw new Error("Tried adding already active enemy to active enemy array!");
        }
    };
    FortressRoom.prototype.removeEnemyFromActive = function (enemyParam) {
        var indexToRemove = -1;
        for (var i = 0; i < this.enemiesActive.length; i++) {
            if (this.enemiesActive[i].enemyIndex === enemyParam.enemyIndex) {
                indexToRemove = i;
            }
        }
        if (indexToRemove === -1) {
            throw new Error("Attempted to remove active enemy which was not active! (enemy not found in active array)");
        }
        this.enemiesActive.splice(indexToRemove, 1);
    };
    // Which enemy will be the next to be active?
    FortressRoom.prototype.hasNextActiveEnemy = function () {
        var e_1, _a;
        try {
            for (var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](this.enemiesAll), _c = _b.next(); !_c.done; _c = _b.next()) {
                var enemy = _c.value;
                if (enemy.isActive == false && enemy.getIsDefeated() == false) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    FortressRoom.prototype.getNextActiveEnemy = function (skip) {
        if (skip === undefined) {
            skip = 0;
        }
        for (var i = skip; i < this.enemiesAll.length; i++) {
            var enemy = this.enemiesAll[i];
            if (enemy.isActive == false && enemy.getIsDefeated() == false) {
                return enemy;
            }
        }
        throw new Error("Tried getting active enemy but all enemies either already active or already defeated");
    };
    FortressRoom.prototype.areAllEnemiesDefeated = function () {
        var e_2, _a;
        try {
            for (var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](this.enemiesAll), _c = _b.next(); !_c.done; _c = _b.next()) {
                var enemy = _c.value;
                if (enemy.getIsDefeated() === false) {
                    return false;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return true;
    };
    FortressRoom.prototype.getRemainingEnemiesCount = function () {
        var e_3, _a;
        var result = 0;
        try {
            for (var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](this.enemiesAll), _c = _b.next(); !_c.done; _c = _b.next()) {
                var enemy = _c.value;
                if (enemy.getIsDefeated() === false) {
                    result++;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return result;
    };
    // More research needed: 3 for 1 player, 6 for 2 players, ...?
    FortressRoom.prototype.getMaxNumberOfActiveEnemies = function () {
        return this.runestoneLevels.length * 3;
    };
    FortressRoom.prototype.generateEnemies = function (rng) {
        return _enemies_EnemyGenerator__WEBPACK_IMPORTED_MODULE_3__["EnemyGenerator"]
            .buildEnemyGeneratorWithRng(rng)
            .generateEnemies(this.overallDifficulty, this.focusBudget, this.playerCount, this.roomLevel, this.runestoneLevels, this.nameClasses);
    };
    // How much focus can we divide among enemies?
    // Source: https://www.reddit.com/r/harrypotterwu/comments/ci9mux/each_fortress_floor_awards_a_different_amount_of/?st=k06fkamr&sh=1eba4c0f
    // This is HIGHLY LIKELY indepedent of team size
    FortressRoom.prototype.computeFocusBudget = function () {
        switch (this.roomLevel) {
            case 1: return 4;
            case 2: return 5;
            case 3: return 6;
            case 4: return 7;
            case 5: return 8;
            case 6: return 8;
            case 7: return 9;
            case 8: return 10;
            case 9: return 11;
            case 10: return 12;
            case 11: return 12;
            case 12: return 13;
            case 13: return 14;
            case 14: return 15;
            case 15: return 16;
            case 16: return 16;
            case 17: return 17;
            case 18: return 18;
            case 19: return 19;
            case 20: return 20;
        }
        return -1;
    };
    // Sources: 
    // https://www.reddit.com/r/WizardsUnite/comments/cluyg5/fortress_difficulty_visualized/?st=k06wsl42&sh=6415c2a4
    // https://docs.google.com/spreadsheets/d/1jtBjdncxspRt51K048islZdEPTZ06yBKuZX7_MBzprI/edit#gid=0
    // NOTE: Currently unknown how difficulty scales with different levels of runestones
    // so currently interface will ONLY use first runestone in array
    FortressRoom.computeOverallDifficultyStatic = function (roomLevel, runestoneLevel, playerCount) {
        // Strangely, difficulty is rounded (see data on videos) and notes in tests
        return Math.round(_data_fortressDifficulties_json__WEBPACK_IMPORTED_MODULE_1__.runestoneDifficulties[roomLevel - 1][runestoneLevel - 1] *
            _data_fortressDifficulties_json__WEBPACK_IMPORTED_MODULE_1__.playerCountMultipliers[roomLevel - 1][playerCount - 1] * playerCount);
    };
    FortressRoom.prototype.computeOverallDifficulty = function () {
        var playerCount = this.runestoneLevels.length;
        var runestoneLevel = this.runestoneLevels[0];
        return FortressRoom.computeOverallDifficultyStatic(this.roomLevel, runestoneLevel, playerCount);
    };
    FortressRoom.prototype.computeMaxtime = function () {
        return FortressRoom.computeMaxtimeStatic(this.roomLevel);
    };
    FortressRoom.computeMaxtimeStatic = function (roomLevel) {
        switch (roomLevel) {
            case 1: return 300;
            case 2: return 300;
            case 3: return 300;
            case 4: return 360;
            case 5: return 360;
            case 6: return 360;
            case 7: return 420;
            case 8: return 420;
            case 9: return 420;
            case 10: return 480;
            case 11: return 480;
            case 12: return 480;
            case 13: return 540;
            case 14: return 540;
            case 15: return 540;
            case 16: return 600;
            case 17: return 600;
            case 18: return 600;
            case 19: return 600;
            case 20: return 600;
        }
        return -1;
    };
    FortressRoom.prototype.computeKnockoutTime = function () {
        return FortressRoom.computeKnockoutTimeStatic(this.roomLevel);
    };
    FortressRoom.computeKnockoutTimeStatic = function (roomLevel) {
        return 1000 * (30 + (roomLevel - 1) * 2);
    };
    FortressRoom.prototype.computeChallengeXPRewards = function (isWin, isSponsoredFortress) {
        return FortressRoom.computeChallengeXPRewardsStatic(this.roomLevel, this.runestoneLevels, isWin, isSponsoredFortress);
    };
    // https://i.redd.it/wz2vwfh5u4k31.jpg
    FortressRoom.computeChallengeXPRewardsStatic = function (roomLevel, runestoneLevels, isWin, isSponsoredFortress) {
        var e_4, _a;
        var baseXP = _data_fortressRewards_json__WEBPACK_IMPORTED_MODULE_2__.data.baseXP[roomLevel - 1];
        var rewards = [];
        var nWizards = runestoneLevels.length;
        var friendBonus = _data_fortressRewards_json__WEBPACK_IMPORTED_MODULE_2__.data.friendsBonus[nWizards - 1];
        var groupBonus = _data_fortressRewards_json__WEBPACK_IMPORTED_MODULE_2__.data.groupBonus[nWizards - 1];
        try {
            // Assumes all wizards in group are friends
            for (var runestoneLevels_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](runestoneLevels), runestoneLevels_1_1 = runestoneLevels_1.next(); !runestoneLevels_1_1.done; runestoneLevels_1_1 = runestoneLevels_1.next()) {
                var runestoneLevel = runestoneLevels_1_1.value;
                var xp = (baseXP * runestoneLevel) + baseXP * (friendBonus + groupBonus);
                if (isWin === false) {
                    xp *= 0.1;
                }
                if (isSponsoredFortress === true) {
                    xp *= 1 + _data_fortressRewards_json__WEBPACK_IMPORTED_MODULE_2__.sponsoredFortressRewardsChallengeXPIncrease;
                }
                rewards.push(Math.round(xp));
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (runestoneLevels_1_1 && !runestoneLevels_1_1.done && (_a = runestoneLevels_1.return)) _a.call(runestoneLevels_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return rewards;
    };
    FortressRoom.prototype.getEnergyReward = function (isSponsoredFortress) {
        return FortressRoom.getEnergyRewardStatic(this.roomLevel, isSponsoredFortress);
    };
    FortressRoom.getEnergyRewardStatic = function (roomLevel, isSponsoredFortress) {
        if (isSponsoredFortress === false) {
            return 0;
        }
        else {
            return Math.ceil(roomLevel / 2);
        }
    };
    // Elites count as double 
    FortressRoom.prototype.getNEnemiesElitesCountDouble = function () {
        return this.enemiesAll.length + this.enemiesAll.filter(function (enemy) { return enemy.isElite; }).length;
    };
    FortressRoom.prototype.describeRoom = function () {
        console.log("Room level: " + this.roomLevel + ", runestoneLevels: " + this.runestoneLevels);
        _enemies_EnemyGenerator__WEBPACK_IMPORTED_MODULE_3__["EnemyGenerator"].describeEnemies(this.enemiesAll);
    };
    return FortressRoom;
}());



/***/ }),

/***/ "../src/model/env/enemies/Enemy.ts":
/*!*****************************************!*\
  !*** ../src/model/env/enemies/Enemy.ts ***!
  \*****************************************/
/*! exports provided: Enemy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Enemy", function() { return Enemy; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _data_enemyStatsConfig_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../data/enemyStatsConfig.json */ "../src/data/enemyStatsConfig.json");
var _data_enemyStatsConfig_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../../data/enemyStatsConfig.json */ "../src/data/enemyStatsConfig.json", 1);
/* harmony import */ var _data_enemies_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../data/enemies.json */ "../src/data/enemies.json");
var _data_enemies_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../../data/enemies.json */ "../src/data/enemies.json", 1);
/* harmony import */ var _Combatant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Combatant */ "../src/model/Combatant.ts");
/* harmony import */ var _EnemyStats__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EnemyStats */ "../src/model/env/enemies/EnemyStats.ts");
/* harmony import */ var _player_Magizoologist__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../player/Magizoologist */ "../src/model/player/Magizoologist.ts");
/* harmony import */ var _player_Auror__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../player/Auror */ "../src/model/player/Auror.ts");
/* harmony import */ var _player_Professor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../player/Professor */ "../src/model/player/Professor.ts");








var Enemy = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Enemy, _super);
    function Enemy(name, nameUserFriendly, enemyIndex, stats, difficulty, level, isElite, focusReward) {
        var _this = _super.call(this, stats.stamina) || this;
        _this.isActive = false; // Is it visible in room?
        _this.inCombatWith = null; // Who is it currently fighting?
        // Auror
        _this.hasConfusionHex = false;
        _this.confusionHexValue = 0; // e.g., defence - 10% if value here is 0.1
        _this.hasWeakeningHex = false;
        _this.weakeningHexValue = 0; // e.g., power -30% if value here is 0.3
        // Professor
        _this.hasDeteriorationHex = false;
        _this.deteriorationHexDamage = 0;
        // Potions are applied against an enemy, not of the wizard
        // Each player can use a potion against an enemy...
        // Exstimulo potion
        _this.exstimuloPotionUsesRemaining = [];
        _this.exstimuloPotionDamageBuff = [];
        // Wit sharpening potion
        _this.witSharpeningPotionUsesRemaining = [];
        _this.witSharpeningPotionDamageBuff = [];
        _this.name = name;
        _this.nameUserFriendly = nameUserFriendly;
        _this.enemyIndex = enemyIndex;
        _this.stats = stats;
        _this.difficulty = difficulty;
        _this.level = level;
        _this.isElite = isElite;
        _this.focusReward = focusReward;
        return _this;
    }
    Enemy.prototype.getNumberOfImpairments = function () {
        return (this.hasConfusionHex ? 1 : 0) +
            (this.hasWeakeningHex ? 1 : 0) +
            (this.hasDeteriorationHex ? 1 : 0);
    };
    Enemy.prototype.decreasePotionUsesRemaining = function (wizard) {
        // Exstimulo potion
        if (this.exstimuloPotionUsesRemaining[wizard.playerIndex] > 0) {
            this.exstimuloPotionUsesRemaining[wizard.playerIndex]--;
        }
        if (this.exstimuloPotionUsesRemaining[wizard.playerIndex] === 0) {
            // Potion used up
            this.exstimuloPotionDamageBuff[wizard.playerIndex] = 0;
        }
        // Wit sharpening potion
        if (this.witSharpeningPotionUsesRemaining[wizard.playerIndex] > 0) {
            this.witSharpeningPotionUsesRemaining[wizard.playerIndex]--;
        }
        if (this.witSharpeningPotionUsesRemaining[wizard.playerIndex] === 0) {
            // Potion used up
            this.witSharpeningPotionDamageBuff[wizard.playerIndex] = 0;
        }
        this.refreshWizardPotionBuffs(wizard);
    };
    Enemy.prototype.resetPotionUsesRemaining = function (wizard) {
        this.exstimuloPotionUsesRemaining[wizard.playerIndex] = 0;
        this.exstimuloPotionDamageBuff[wizard.playerIndex] = 0;
        this.witSharpeningPotionUsesRemaining[wizard.playerIndex] = 0;
        this.witSharpeningPotionDamageBuff[wizard.playerIndex] = 0;
        this.refreshWizardPotionBuffs(wizard);
    };
    Enemy.prototype.applyExstimuloPotion = function (wizard, potionUses, damageBuff) {
        this.exstimuloPotionUsesRemaining[wizard.playerIndex] = potionUses;
        this.exstimuloPotionDamageBuff[wizard.playerIndex] = damageBuff;
        this.refreshWizardPotionBuffs(wizard);
    };
    Enemy.prototype.applyWitSharpeningPotion = function (wizard, potionUses, damageBuff) {
        this.witSharpeningPotionUsesRemaining[wizard.playerIndex] = potionUses;
        this.witSharpeningPotionDamageBuff[wizard.playerIndex] = damageBuff;
        this.refreshWizardPotionBuffs(wizard);
    };
    Enemy.prototype.refreshWizardPotionBuffs = function (wizard) {
        wizard.exstimuloPotionDamageBuff = this.exstimuloPotionDamageBuff[wizard.playerIndex] || 0;
        wizard.witSharpeningPotionDamageBuff = this.witSharpeningPotionDamageBuff[wizard.playerIndex] || 0;
    };
    Enemy.prototype.getExstimuloDamageBuff = function (playerIndex) {
        if (this.exstimuloPotionDamageBuff[playerIndex] > 0) {
            return this.exstimuloPotionDamageBuff[playerIndex];
        }
        else {
            return 0;
        }
    };
    Enemy.prototype.getExstimuloUsesRemaining = function (playerIndex) {
        if (this.exstimuloPotionUsesRemaining[playerIndex] > 0) {
            return this.exstimuloPotionUsesRemaining[playerIndex];
        }
        else {
            return 0;
        }
    };
    Enemy.prototype.getWitSharpeningDamageBuff = function (playerIndex) {
        if (this.witSharpeningPotionDamageBuff[playerIndex] > 0) {
            return this.witSharpeningPotionDamageBuff[playerIndex];
        }
        else {
            return 0;
        }
    };
    Enemy.prototype.getWitSharpeningUsesRemaining = function (playerIndex) {
        if (this.witSharpeningPotionUsesRemaining[playerIndex] > 0) {
            return this.witSharpeningPotionUsesRemaining[playerIndex];
        }
        else {
            return 0;
        }
    };
    Enemy.prototype.getDefenceAfterModifications = function () {
        return Math.max(0, this.stats.defence - this.confusionHexValue);
    };
    Enemy.prototype.getDeficiencyDefenceAfterModifications = function () {
        return this.stats.deficiencyDefence;
    };
    Enemy.prototype.getPowerAfterModifications = function () {
        return this.stats.power * (1 - this.weakeningHexValue);
    };
    Enemy.prototype.getProficiencyPowerAfterModifications = function () {
        return this.stats.proficiencyPower;
    };
    Enemy.prototype.getDefenceBreachAfterModifications = function () {
        return Math.max(0, this.stats.defenceBreach - this.confusionHexValue);
    };
    Enemy.prototype.getDodgeAfterModifications = function (wizard) {
        return Math.max(0, this.stats.dodge - this.confusionHexValue);
    };
    Enemy.prototype.isProficientAgainst = function (wizard) {
        if (wizard instanceof _player_Auror__WEBPACK_IMPORTED_MODULE_6__["Auror"] && (this.name === "acromantula" || this.name == "erkling"))
            return true;
        if (wizard instanceof _player_Magizoologist__WEBPACK_IMPORTED_MODULE_5__["Magizoologist"] && (this.name === "pixie" || this.name === "werewolf"))
            return true;
        if (wizard instanceof _player_Professor__WEBPACK_IMPORTED_MODULE_7__["Professor"] && (this.name === "darkWizard" || this.name === "deathEater"))
            return true;
        return false;
    };
    // Base stats need to be transformed to take into account actual level
    // See base stats for enemies values: https://jibsentertainment.com/2019/07/24/a-complete-and-comprehensive-guide-to-fortresses-and-wizarding-challenges/
    // See formula: https://wizardsunite.gamepress.gg/guide/combat-damage-formula 
    // See values for dodge, defence, etc:  https://i.redd.it/gpwf5k6f4ea31.png
    // See values for growth adjust: https://www.reddit.com/r/harrypotterwu/comments/csgsdd/all_about_combat_damage_what_i_know_or_i_think_i/?st=k0gijz3i&sh=acd204fd
    // TODO: Do we use Math.ceil properly here? 
    Enemy.buildEnemy = function (name, enemyIndex, isElite, difficulty, level, focusReward) {
        if (difficulty < 1 || difficulty > 5 || !difficulty) {
            throw new Error("Invalid value for enemy difficulty (should be between 1 and 5): " + difficulty);
        }
        if (level < 1 || !level) {
            throw new Error("Invalid value for level (should be greater 0): " + level);
        }
        var base = _data_enemies_json__WEBPACK_IMPORTED_MODULE_2__[name].stats[difficulty - 1][(isElite) ? "elite" : "normal"];
        var computedStats = new _EnemyStats__WEBPACK_IMPORTED_MODULE_4__["EnemyStats"](Math.floor(base.stamina * (1 + _data_enemyStatsConfig_json__WEBPACK_IMPORTED_MODULE_1__.growthAdjustStaminaPerLevel * level)), // The Math.floor is confirmed by video data
        base.defence, base.deficiencyDefence, Math.floor(base.power * (1 + _data_enemyStatsConfig_json__WEBPACK_IMPORTED_MODULE_1__.growthAdjustPowerPerLevel * level)), base.proficiencyPower * (1 + _data_enemyStatsConfig_json__WEBPACK_IMPORTED_MODULE_1__.growthAdjustProficiencyPowerPerLevel * level), base.defenceBreach, base.dodge);
        //console.log("new enemy with base stamina=" + base.stamina + ",  stamina=" + computedStats.stamina + ", level=" + level);
        return new Enemy(name, _data_enemies_json__WEBPACK_IMPORTED_MODULE_2__[name].name, enemyIndex, computedStats, difficulty, level, isElite, focusReward);
    };
    Enemy.buildDemoEnemy = function () {
        return Enemy.buildEnemy("acromantula", 0, false, 3, 50, 3);
    };
    Enemy.prototype.toUserFriendlyDescription = function () {
        var eliteString = this.isElite ? "elite " : "";
        var starString = "";
        for (var i = 0; i < this.difficulty; i++)
            starString += "★";
        return this.nameUserFriendly + " (" + eliteString + this.level + " " +
            starString + ", id=" + this.enemyIndex + ")";
    };
    return Enemy;
}(_Combatant__WEBPACK_IMPORTED_MODULE_3__["Combatant"]));



/***/ }),

/***/ "../src/model/env/enemies/EnemyGenerator.ts":
/*!**************************************************!*\
  !*** ../src/model/env/enemies/EnemyGenerator.ts ***!
  \**************************************************/
/*! exports provided: EnemyGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnemyGenerator", function() { return EnemyGenerator; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Enemy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enemy */ "../src/model/env/enemies/Enemy.ts");
/* harmony import */ var prando__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prando */ "../node_modules/prando/dist/Prando.es.js");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../util/Logger */ "../src/util/Logger.ts");




var EnemyGenerator = /** @class */ (function () {
    function EnemyGenerator(rng) {
        this.eliteProbability = 0.10; // Each enemy has a 10% chance to be elite (and then counts for 2)
        this.proficiencyMap = {
            "auror": ["darkWizard", "deathEater"],
            "magizoologist": ["acromantula", "erkling"],
            "professor": ["pixie", "werewolf"]
        };
        this.inproficiencyMap = {
            "auror": ["acromantula", "erkling", "pixie", "werewolf"],
            "magizoologist": ["darkWizard", "deathEater", "pixie", "werewolf"],
            "professor": ["acromantula", "darkWizard", "deathEater", "erkling"]
        };
        this.rng = rng;
        this.rng.skip(100);
    }
    EnemyGenerator.buildEnemyGeneratorWithRng = function (rng) {
        return new EnemyGenerator(rng);
    };
    EnemyGenerator.buildEnemyGenerator = function () {
        return new EnemyGenerator(new prando__WEBPACK_IMPORTED_MODULE_2__["default"](0));
    };
    // returns value between -0.5 and 0.5
    EnemyGenerator.prototype.jitter = function () {
        return this.jitterByAmount(1);
    };
    EnemyGenerator.prototype.jitterByAmount = function (magnitude) {
        // Center should be 0
        return (this.rng.next() - 0.5) * magnitude;
    };
    EnemyGenerator.prototype.getNEnemies = function (overallDifficulty, roomLevel, playerCount) {
        var averageNEnemies = 1.72132702158096 + 0.0661370810873348 * Math.sqrt(overallDifficulty); // sqrt of overallDifficulty 
        //console.log("averageNEnemies for roomLevel=" + roomLevel + ": " + averageNEnemies);
        // Concrete nEnemies for this room (can vary by +-1)
        // Example: Tower V has been seen with 4, 5 and 6 enemies for 1 player
        // Average is 4.999, so jitter by 2 (==> +-1)
        var nEnemies = Math.round(averageNEnemies + this.jitterByAmount(2));
        if (roomLevel === 1) {
            nEnemies = 2 * playerCount; // Always use 2 enemies per player for ruins I
        }
        return nEnemies;
    };
    EnemyGenerator.prototype.getAverageEnemyLevel = function (roomLevel, averageRunestoneLevel) {
        //let averageEnemyLevel = -11.2882802691465 + 0.865920623399864 * averageRunestoneLevel + 9.85336218225852 * roomLevel;
        // Seems like this might be the simplest answer, except for ruins I
        // -3 because jitter later does +-3
        var averageEnemyLevel = -13 + averageRunestoneLevel + 10 * roomLevel;
        if (roomLevel === 1) {
            averageEnemyLevel = 3; // Ruins 1 has higher average so we push between 1 and 5 (later we jitter by +-2)
        }
        return averageEnemyLevel;
    };
    EnemyGenerator.prototype.getAverageProficiency = function (roomLevel) {
        var averageProficiency = 0.703789438124907 - 0.0196579934802149 * roomLevel;
        return averageProficiency;
    };
    EnemyGenerator.prototype.getEnemyType = function (averageProficiency, nameClass) {
        // You should be proficient roughly against averageProficiency percentage of enemies
        var shouldBeProficient = this.rng.next() >= (1 - averageProficiency);
        if (shouldBeProficient === true) {
            return this.proficiencyMap[nameClass][Math.floor(this.rng.next() * 2)]; // array.length = 2
        }
        else {
            return this.inproficiencyMap[nameClass][Math.floor(this.rng.next() * 4)]; //array.length = 4
        }
    };
    // Difficulty budget per enemy: This value has a multiplier
    // difficulty = multiplier * nEnemies * (level * enemyDifficulty * (1+isElite)))
    // difficultyBudgetPerEnemy = (level * enemyDifficulty * (1+isElite))
    // difficultyBudgetPerEnemy = difficulty / (multiplier * nEnemies)
    EnemyGenerator.prototype.getNormalizedDifficultyBudgetPerEnemy = function (overallDifficulty, roomLevel, nEnemiesRemaining) {
        var difficultyBudgetPerEnemyMultiplier = 2.20611936028795 + 10.1673379263563 * Math.exp(-roomLevel);
        var normalizedDifficultyBudgetPerEnemy = overallDifficulty / (difficultyBudgetPerEnemyMultiplier * nEnemiesRemaining);
        return normalizedDifficultyBudgetPerEnemy;
    };
    // Concrete enemy difficulty for one enemy (number of stars)
    EnemyGenerator.prototype.getEnemyDifficulty = function (normalizedDifficultyBudgetPerEnemy, enemyLevel, roomLevel) {
        if (roomLevel === 1) {
            return 1; // Hard code this since ruins I are only difficulty 1
        }
        var enemyDifficulty = Math.max(1, Math.round(normalizedDifficultyBudgetPerEnemy / enemyLevel + this.jitterByAmount(2)));
        return Math.min(enemyDifficulty, 5);
    };
    EnemyGenerator.prototype.generateEnemies = function (overallDifficulty, focusBudget, playerCount, roomLevel, runestoneLevels, nameClasses) {
        var result = [];
        var nEnemiesRemaining = this.getNEnemies(overallDifficulty, roomLevel, playerCount);
        var normalizedDifficultyBudgetPerEnemy = this.getNormalizedDifficultyBudgetPerEnemy(overallDifficulty, roomLevel, nEnemiesRemaining);
        // Unknown if average runestone level should be used here
        var averageRunestoneLevel = runestoneLevels.reduce(function (a, b) { return (a += b); }) / runestoneLevels.length;
        var averageEnemyLevel = this.getAverageEnemyLevel(roomLevel, averageRunestoneLevel);
        var averageProficiency = this.getAverageProficiency(roomLevel);
        _util_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].log(2, "Generating enemies for room with following parameters:");
        _util_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].log(2, "Room level: " + roomLevel +
            ", average runestone level: " + averageRunestoneLevel +
            ", number of enemies: " + nEnemiesRemaining +
            ", average enemy level: " + averageEnemyLevel +
            ", difficulty budget per enemy: " + normalizedDifficultyBudgetPerEnemy);
        var enemyIndex = 0;
        var enemyParams = [];
        while (nEnemiesRemaining > 0) {
            var isElite = (this.rng.next() >= (1 - this.eliteProbability) && nEnemiesRemaining >= 2 && roomLevel >= 4);
            if (isElite) {
                nEnemiesRemaining--; // Count elite as extra
            }
            // for example for ruins I seen level between 1 and 5 (so jitter by 4 or +-2), in tower V seen +-3
            var jitterAmount = (roomLevel === 1) ? 4 : 6;
            var enemyLevel = Math.round(averageEnemyLevel + this.jitterByAmount(jitterAmount));
            // difficultyBudget for this enemy is: level * enemyDifficulty
            var enemyDifficulty = this.getEnemyDifficulty(normalizedDifficultyBudgetPerEnemy, enemyLevel, roomLevel);
            // First approach for proficiency: Allow each player in turn to get a chance to get a proficient enemy or not
            var proficiencyPlayerIndex = 0;
            var type = this.getEnemyType(averageProficiency, nameClasses[proficiencyPlayerIndex % playerCount]);
            proficiencyPlayerIndex++;
            var enemyParam = {
                type: type,
                enemyIndex: enemyIndex,
                isElite: isElite,
                difficulty: enemyDifficulty,
                level: enemyLevel
            };
            _util_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].log(2, "Generating enemy: " + JSON.stringify(enemyParam));
            enemyParams.push(enemyParam);
            enemyIndex++;
            nEnemiesRemaining--;
        }
        var focusBudgets = this.getFocusRewards(enemyParams.length, focusBudget);
        for (var i = 0; i < enemyParams.length; i++) {
            //console.log(enemyParams[i]);
            var enemy = _Enemy__WEBPACK_IMPORTED_MODULE_1__["Enemy"].buildEnemy(enemyParams[i].type, enemyParams[i].enemyIndex, enemyParams[i].isElite, enemyParams[i].difficulty, enemyParams[i].level, focusBudgets[i]);
            result.push(enemy);
        }
        //result.push(Enemy.buildEnemy("acromantula", 0, false, 2, 150, 3));
        //result.push(Enemy.buildEnemy("pixie", 1, false, 2, 150, 3));
        return result;
    };
    EnemyGenerator.prototype.getFocusRewards = function (nEnemies, totalBudget) {
        // Split total focus budget into budget per enemy 
        // example: 10 -> 3, 3, 2, 2
        var result = [];
        var focusPerEnemy = totalBudget / nEnemies; // 2.5
        var remainingTotalBudget = totalBudget; // 10
        for (var i = 0; i < nEnemies; i++) {
            var ceilFocus = Math.ceil(focusPerEnemy);
            var floorFocus = Math.floor(focusPerEnemy);
            var chosenValue = void 0;
            if (remainingTotalBudget / floorFocus === nEnemies - i) {
                // If rest of focus budget can be filled by floor value then use that
                // Example: 
                // 10 / 2 = 4? NO
                //  7 / 2 = 3? NO
                //  4 / 2 = 2? YES
                //  2 / 2 = 1? YES
                chosenValue = floorFocus;
            }
            else {
                chosenValue = ceilFocus;
            }
            remainingTotalBudget -= chosenValue;
            result.push(chosenValue);
        }
        return result;
    };
    EnemyGenerator.describeEnemies = function (enemies) {
        console.log("Number of enemies: " + enemies.length + " (" + enemies.filter(function (enemy) { return enemy.isElite; }).length + " elites)");
        var minLevel = Math.min.apply(Math, tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"](enemies.map(function (enemy) { return enemy.level; })));
        var sumLevel = enemies.map(function (enemy) { return enemy.level; }).reduce(function (previous, current) { return current += previous; });
        var maxLevel = Math.max.apply(Math, tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"](enemies.map(function (enemy) { return enemy.level; })));
        var minDifficulty = Math.min.apply(Math, tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"](enemies.map(function (enemy) { return enemy.difficulty; })));
        var sumDifficulty = enemies.map(function (enemy) { return enemy.difficulty; }).reduce(function (previous, current) { return current += previous; });
        var maxDifficulty = Math.max.apply(Math, tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"](enemies.map(function (enemy) { return enemy.difficulty; })));
        console.log("Average enemy level: " + sumLevel / enemies.length + " (min: " + minLevel + ", max: " + maxLevel + ")");
        console.log("Average enemy difficulty: " + sumDifficulty / enemies.length + " (min: " + minDifficulty + ", max: " + maxDifficulty + ")");
    };
    return EnemyGenerator;
}());



/***/ }),

/***/ "../src/model/env/enemies/EnemyStats.ts":
/*!**********************************************!*\
  !*** ../src/model/env/enemies/EnemyStats.ts ***!
  \**********************************************/
/*! exports provided: EnemyStats */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnemyStats", function() { return EnemyStats; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _CombatantStats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../CombatantStats */ "../src/model/CombatantStats.ts");


var EnemyStats = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EnemyStats, _super);
    function EnemyStats(stamina, defence, deficiencyDefence, power, proficiencyPower, defenceBreach, dodge) {
        var _this = _super.call(this, stamina, defence, deficiencyDefence, power, proficiencyPower, defenceBreach) || this;
        _this.dodge = dodge;
        return _this;
    }
    return EnemyStats;
}(_CombatantStats__WEBPACK_IMPORTED_MODULE_1__["CombatantStats"]));



/***/ }),

/***/ "../src/model/player/Auror.ts":
/*!************************************!*\
  !*** ../src/model/player/Auror.ts ***!
  \************************************/
/*! exports provided: Auror */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Auror", function() { return Auror; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Wizard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Wizard */ "../src/model/player/Wizard.ts");


var Auror = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Auror, _super);
    function Auror(stats, playerIndex, knockoutTime) {
        return _super.call(this, stats, "auror", playerIndex, knockoutTime) || this;
    }
    Auror.prototype.isProficientAgainst = function (enemy) {
        switch (enemy.name) {
            case "darkWizard": return true;
            case "deathEater": return true;
            default: return false;
        }
    };
    Auror.prototype.hasStudiedWeakeningHex = function () {
        return this.getTriggers().weakeningHex !== null;
    };
    Auror.prototype.hasStudiedBatBogeyHex = function () {
        return this.getTriggers().batBogeyHex !== null;
    };
    Auror.prototype.hasStudiedConfusionHex = function () {
        return this.getTriggers().confusionHex !== null;
    };
    Auror.prototype.hasStudiedFocusCharm = function () {
        return this.getTriggers().focusCharm !== null;
    };
    Auror.prototype.getPowerAfterModifications = function (enemy) {
        var powerBuffs = 0;
        if (this.getTriggers().aurorAdvantage !== null && enemy.getCurrentStaminaPercent() < 0.5) {
            powerBuffs += this.getTriggers().aurorAdvantage;
        }
        return _super.prototype.getPowerAfterModifications.call(this, enemy) + powerBuffs;
    };
    Auror.prototype.getCritChanceAfterModifications = function (enemy) {
        var critChanceBuffs = 0;
        if (this.getTriggers().dancingWithDummies !== null && enemy.getCurrentStaminaPercent() === 1) {
            critChanceBuffs += this.getTriggers().dancingWithDummies;
        }
        if (this.getTriggers().trickWithDeathEaters !== null && enemy.name === "deathEater") {
            critChanceBuffs += this.getTriggers().trickWithDeathEaters;
        }
        return _super.prototype.getCritChanceAfterModifications.call(this, enemy) + critChanceBuffs;
    };
    Auror.prototype.getCriticalPowerAfterModifications = function (enemy) {
        var criticalPowerBuffs = 0;
        if (this.getTriggers().firstStrike !== null && enemy.getCurrentStaminaPercent() === 1) {
            criticalPowerBuffs += this.getTriggers().firstStrike;
        }
        return _super.prototype.getCriticalPowerAfterModifications.call(this, enemy) + criticalPowerBuffs;
    };
    Auror.prototype.getDefenceAfterModifications = function (enemy) {
        var defenceBuffs = 0;
        if (this.getTriggers().playingDirty !== null && enemy.getCurrentStaminaPercent() < 0.5) {
            defenceBuffs += this.getTriggers().playingDirty;
        }
        return _super.prototype.getDefenceAfterModifications.call(this, enemy) + defenceBuffs;
    };
    Auror.prototype.getProtegoPowerAfterModifications = function (enemy) {
        var buffs = 0;
        if (this.getTriggers().mundungusAmongUs !== null && enemy.name === "darkWizard") {
            buffs += this.getTriggers().mundungusAmongUs;
        }
        return _super.prototype.getProtegoPowerAfterModifications.call(this, enemy) + buffs;
    };
    Auror.isValidStatForClass = function (statName) {
        switch (statName) {
            // Magizoologist
            case "staminaCharmValue":
            case "reviveCharmValue":
            case "braveryCharmValue":
            // Professor
            case "deteriorationHexDamage":
            case "mendingCharmStaminaRestore":
            case "defenceCharmIncrease":
            case "proficiencyPowerCharmIncrease": return false;
        }
        return true;
    };
    return Auror;
}(_Wizard__WEBPACK_IMPORTED_MODULE_1__["Wizard"]));



/***/ }),

/***/ "../src/model/player/Magizoologist.ts":
/*!********************************************!*\
  !*** ../src/model/player/Magizoologist.ts ***!
  \********************************************/
/*! exports provided: Magizoologist */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Magizoologist", function() { return Magizoologist; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Wizard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Wizard */ "../src/model/player/Wizard.ts");


var Magizoologist = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Magizoologist, _super);
    function Magizoologist(stats, playerIndex, knockoutTime) {
        return _super.call(this, stats, "magizoologist", playerIndex, knockoutTime) || this;
    }
    Magizoologist.prototype.isProficientAgainst = function (enemy) {
        switch (enemy.name) {
            case "darkWizard": return true;
            case "deathEater": return true;
            default: return false;
        }
    };
    Magizoologist.prototype.hasStudiedMendingCharm = function () {
        return this.getTriggers().mendingCharm !== null;
    };
    Magizoologist.prototype.hasStudiedStaminaCharm = function () {
        return this.getTriggers().staminaCharm !== null;
    };
    Magizoologist.prototype.hasStudiedBraveryCharm = function () {
        return this.getTriggers().braveryCharm !== null;
    };
    Magizoologist.prototype.hasStudiedReviveCharm = function () {
        return this.getTriggers().reviveCharm !== null;
    };
    Magizoologist.prototype.getPowerAfterModifications = function (enemy) {
        var powerBuffs = 0;
        if (this.getTriggers().ministryMagizoologyOrientation !== null && this.getCurrentStaminaPercent() >= 0.5) {
            powerBuffs += this.getTriggers().ministryMagizoologyOrientation;
        }
        if (this.getTriggers().becomeTheBeast !== null && this.getFocus() >= 5) {
            powerBuffs += this.getTriggers().becomeTheBeast;
        }
        if (this.getTriggers().vileCreatures != null && enemy.name === "erkling") {
            powerBuffs += this.getTriggers().vileCreatures;
        }
        return _super.prototype.getPowerAfterModifications.call(this, enemy) + powerBuffs;
    };
    Magizoologist.prototype.getDefenceAfterModifications = function (enemy) {
        var defenceBuffs = 0;
        if (this.getTriggers().forumQuorum !== null && this.getCurrentStaminaPercent() >= 0.5) {
            defenceBuffs += this.getTriggers().forumQuorum;
        }
        if (this.getTriggers().spiders !== null && enemy.name === "acromantula") {
            defenceBuffs += this.getTriggers().spiders;
        }
        if (this.getTriggers().birdInHand !== null && this.getFocus() >= 5) {
            defenceBuffs += this.getTriggers().birdInHand;
        }
        return _super.prototype.getDefenceAfterModifications.call(this, enemy) + defenceBuffs;
    };
    Magizoologist.isValidStatForClass = function (statName) {
        switch (statName) {
            // Auror
            case "weakeningHexValue":
            case "confusionHexValue":
            case "batBogeyHexDamage":
            case "focusCharmValue":
            // Professor
            case "deteriorationHexDamage":
            case "defenceCharmIncrease":
            case "proficiencyPowerCharmIncrease": return false;
        }
        return true;
    };
    return Magizoologist;
}(_Wizard__WEBPACK_IMPORTED_MODULE_1__["Wizard"]));



/***/ }),

/***/ "../src/model/player/Professor.ts":
/*!****************************************!*\
  !*** ../src/model/player/Professor.ts ***!
  \****************************************/
/*! exports provided: Professor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Professor", function() { return Professor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Wizard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Wizard */ "../src/model/player/Wizard.ts");


var Professor = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Professor, _super);
    function Professor(stats, playerIndex, knockoutTime) {
        return _super.call(this, stats, "professor", playerIndex, knockoutTime) || this;
    }
    Professor.prototype.isProficientAgainst = function (enemy) {
        switch (enemy.name) {
            case "pixie": return true;
            case "werewolf": return true;
            default: return false;
        }
    };
    Professor.prototype.hasStudiedDeteriorationHex = function () {
        return this.getTriggers().deteriorationHex !== null;
    };
    Professor.prototype.hasStudiedMendingCharm = function () {
        return this.getTriggers().mendingCharm !== null;
    };
    Professor.prototype.hasStudiedProficiencyPowerCharm = function () {
        return this.getTriggers().proficiencyPowerCharm !== null;
    };
    Professor.prototype.hasStudiedDefenceCharm = function () {
        return this.getTriggers().defenceCharm !== null;
    };
    Professor.prototype.getPowerAfterModifications = function (enemy) {
        var powerBuffs = 0;
        if (this.getTriggers().idealExchange !== null && enemy.getNumberOfImpairments() >= 1) {
            powerBuffs += this.getTriggers().idealExchange;
        }
        if (this.getTriggers().strengthInNumbers !== null && this.getNumberOfEnhancements(enemy) >= 1) {
            powerBuffs += this.getTriggers().strengthInNumbers;
        }
        if (this.getTriggers().teamworkMakesTheDreamWork !== null && this.getNumberOfEnhancements(enemy) >= 2) {
            powerBuffs += this.getTriggers().teamworkMakesTheDreamWork;
        }
        if (this.getTriggers().onSabbatical !== null && enemy.getNumberOfImpairments() >= 3) {
            powerBuffs += this.getTriggers().onSabbatical;
        }
        return _super.prototype.getPowerAfterModifications.call(this, enemy) + powerBuffs;
    };
    Professor.prototype.getDefenceAfterModifications = function (enemy) {
        var defenceBuffs = 0;
        if (this.getTriggers().restrictedSection !== null && enemy.getNumberOfImpairments() >= 1) {
            defenceBuffs += this.getTriggers().restrictedSection;
        }
        if (this.getTriggers().sparringSpecifics !== null && enemy.getNumberOfImpairments() >= 2) {
            defenceBuffs += this.getTriggers().sparringSpecifics;
        }
        if (this.getTriggers().confidence !== null && this.getNumberOfEnhancements(enemy) >= 1) {
            defenceBuffs += this.getTriggers().confidence;
        }
        if (this.getTriggers().teamTeaching !== null && this.getNumberOfEnhancements(enemy) >= 2) {
            defenceBuffs += this.getTriggers().teamTeaching;
        }
        return _super.prototype.getDefenceAfterModifications.call(this, enemy) + defenceBuffs;
    };
    Professor.prototype.getDefenceBreachAfterModifications = function (enemy) {
        var defenceBreachBuffs = 0;
        if (this.getTriggers().fullMoonHunter !== null && enemy.name === "werewolf") {
            defenceBreachBuffs += this.getTriggers().fullMoonHunter;
        }
        return _super.prototype.getDefenceBreachAfterModifications.call(this, enemy) + defenceBreachBuffs;
    };
    Professor.prototype.getAccuracyAfterModifications = function (enemy) {
        var accuracyBuffs = 0;
        if (this.getTriggers().peskyPixies !== null && enemy.name === "pixie") {
            accuracyBuffs += this.getTriggers().peskyPixies;
        }
        return _super.prototype.getAccuracyAfterModifications.call(this, enemy) + accuracyBuffs;
    };
    Professor.isValidStatForClass = function (statName) {
        switch (statName) {
            // Magizoologist
            case "staminaCharmValue":
            case "reviveCharmValue":
            case "braveryCharmValue":
            // Auror
            case "weakeningHexValue":
            case "confusionHexValue":
            case "batBogeyHexDamage":
            case "focusCharmValue": return false;
        }
        return true;
    };
    return Professor;
}(_Wizard__WEBPACK_IMPORTED_MODULE_1__["Wizard"]));



/***/ }),

/***/ "../src/model/player/SkillTree/SkillTree.ts":
/*!**************************************************!*\
  !*** ../src/model/player/SkillTree/SkillTree.ts ***!
  \**************************************************/
/*! exports provided: SkillTree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillTree", function() { return SkillTree; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _WizardStats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../WizardStats */ "../src/model/player/WizardStats.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../util/Logger */ "../src/util/Logger.ts");
/* harmony import */ var _data_skillTreeProfessor_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../data/skillTreeProfessor.json */ "../src/data/skillTreeProfessor.json");
var _data_skillTreeProfessor_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../../data/skillTreeProfessor.json */ "../src/data/skillTreeProfessor.json", 1);
/* harmony import */ var _data_skillTreeAuror_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../data/skillTreeAuror.json */ "../src/data/skillTreeAuror.json");
var _data_skillTreeAuror_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../../data/skillTreeAuror.json */ "../src/data/skillTreeAuror.json", 1);
/* harmony import */ var _data_skillTreeMagizoologist_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../data/skillTreeMagizoologist.json */ "../src/data/skillTreeMagizoologist.json");
var _data_skillTreeMagizoologist_json__WEBPACK_IMPORTED_MODULE_5___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../../data/skillTreeMagizoologist.json */ "../src/data/skillTreeMagizoologist.json", 1);
/* harmony import */ var _data_focusCosts_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../data/focusCosts.json */ "../src/data/focusCosts.json");
var _data_focusCosts_json__WEBPACK_IMPORTED_MODULE_6___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../../data/focusCosts.json */ "../src/data/focusCosts.json", 1);







// One skill tree is a concrete instance of a skill tree for one wizard (which lessons has the wizard learned and at which level?)
var SkillTree = /** @class */ (function () {
    function SkillTree(nameClass) {
        var e_1, _a;
        this.nameClass = nameClass;
        this.nodesStudied = new Map();
        // Initialize with no lessons learned
        var data;
        switch (nameClass) {
            case "auror":
                data = _data_skillTreeAuror_json__WEBPACK_IMPORTED_MODULE_4__.data;
                break;
            case "professor":
                data = _data_skillTreeProfessor_json__WEBPACK_IMPORTED_MODULE_3__.data;
                break;
            case "magizoologist":
                data = _data_skillTreeMagizoologist_json__WEBPACK_IMPORTED_MODULE_5__.data;
                break;
        }
        try {
            for (var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](data), _c = _b.next(); !_c.done; _c = _b.next()) {
                var jsonNode = _c.value;
                var node = jsonNode;
                this.nodesStudied.set(node, 0);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        //console.log("init with " + this.nodesStudied.size + " nodes"); 
    }
    ;
    SkillTree.fromPersisted = function (persistedSkillTree) {
        var result = new SkillTree(persistedSkillTree.nameClass);
        result.setStudiedLevels(persistedSkillTree.nodesStudied);
        return result;
    };
    // Returns a string that is easy to put in URLs
    // nameClass
    // nodesStudied: [{
    //    rowIndex: 0,
    //    columnIndex: 0,
    //    levelStudied: 1 (will be greater 0)
    // }]
    //
    SkillTree.prototype.persist = function () {
        var nodesStudiedResult = [];
        this.nodesStudied.forEach(function (level, node) {
            if (level > 0) {
                nodesStudiedResult.push({
                    rowIndex: node.rowIndex,
                    columnIndex: node.columnIndex,
                    levelStudied: level
                });
            }
        });
        return {
            nameClass: this.nameClass,
            nodesStudied: nodesStudiedResult
        };
    };
    SkillTree.prototype.copy = function () {
        return SkillTree.fromPersisted(this.persist());
    };
    SkillTree.prototype.validateNodeLevel = function (node, levelToCheck) {
        if (levelToCheck > node.levels.length) {
            throw new Error("Tried to set invalid level=" + levelToCheck + " for node ID=" + node.rowIndex + "/" + node.columnIndex + ", max level=" + node.levels.length);
        }
    };
    SkillTree.prototype.setStudiedLevels = function (nodesPersisted) {
        var _this = this;
        nodesPersisted.forEach(function (nodePersisted) {
            var found = false;
            // Find correct node and set the level
            _this.nodesStudied.forEach(function (level, node) {
                if (node.rowIndex === nodePersisted.rowIndex && node.columnIndex === nodePersisted.columnIndex) {
                    _this.validateNodeLevel(node, nodePersisted.levelStudied);
                    _this.nodesStudied.set(node, nodePersisted.levelStudied);
                    found = true;
                }
            });
            if (found === false) {
                throw new Error("Tried to set invalid node with ID=" + nodePersisted.rowIndex + "/" + nodePersisted.columnIndex);
            }
        });
    };
    SkillTree.prototype.setNodeLevelByName = function (nodeName, newLevel) {
        var _this = this;
        var found = false;
        this.nodesStudied.forEach(function (level, node) {
            if (node.name === nodeName) {
                _this.validateNodeLevel(node, newLevel);
                _this.nodesStudied.set(node, newLevel);
                found = true;
            }
        });
        if (found === false) {
            throw new Error("Tried to set invalid node with name=" + nodeName);
        }
    };
    SkillTree.prototype.setNodeLevelByTriggerName = function (triggerName, newLevel) {
        var _this = this;
        var found = false;
        this.nodesStudied.forEach(function (level, node) {
            // console.log(node.triggerName);
            if (node.triggerName === triggerName) {
                _this.validateNodeLevel(node, newLevel);
                _this.nodesStudied.set(node, newLevel);
                found = true;
            }
        });
        if (found === false) {
            throw new Error("Tried to set invalid node with triggerName=" + triggerName);
        }
    };
    SkillTree.prototype.getNodeByName = function (nodeName) {
        var result = null;
        this.nodesStudied.forEach(function (level, node) {
            if (node.name == nodeName) {
                result = node;
            }
        });
        if (result === null) {
            throw new Error("Tried to get invalid node with name=" + nodeName);
        }
        return result;
    };
    SkillTree.prototype.applyTriggers = function (wizard) {
        this.nodesStudied.forEach(function (level, node) {
            if (level === 0 || node.triggerName === null) {
                return;
            }
            _util_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].log(3, "SkillTree.applyTriggers(): Setting triggerName=" + node.triggerName + ", value=" + node.levels[0].statChange);
            wizard.setTrigger(node.triggerName, node.levels[0].statChange);
        });
    };
    SkillTree.prototype.toStudiedTriggers = function (showStrategicSpells) {
        var result = [];
        this.nodesStudied.forEach(function (level, node) {
            if (level === 0 || node.triggerName === null || node.triggerName === undefined ||
                (Object.keys(_data_focusCosts_json__WEBPACK_IMPORTED_MODULE_6__).indexOf(node.triggerName) !== -1 && showStrategicSpells === false)) {
                return;
            }
            result.push(node);
        });
        return result;
    };
    // Returns only stats and strategic spell stats, no triggers or skills learnt
    SkillTree.prototype.toWizardStats = function () {
        var stats = _WizardStats__WEBPACK_IMPORTED_MODULE_1__["WizardStats"].buildBaseStats();
        // Ignore any without "statChanged" attributes
        this.nodesStudied.forEach(function (level, node) {
            if (node.statChanged === null || node.statChanged === undefined) {
                _util_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].log(3, "SkillTree.toWizardStats(): Skipping node with name=" + node.name);
                return;
            }
            if (level === 0) {
                _util_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].log(3, "SkillTree.toWizardStats(): Node was not studied with name=" + node.name);
                return;
            }
            // How much was the stat changed by?
            var statChange = 0;
            for (var i = 0; i < level; i++) {
                // Example: level=2, so level data with indices 0 and 1 are needed
                statChange += node.levels[i].statChange;
            }
            // Is the stat that was changed one of the normal wizard stats?
            if (node.statChanged in stats) {
                stats[node.statChanged] += statChange;
            }
            else {
                throw new Error("Error: bad value with node.statChanged='" + node.statChanged + "'. Object is: " + JSON.stringify(node));
            }
        });
        return stats;
    };
    SkillTree.prototype.learnAllLessonsWithScrolls = function () {
        var _this = this;
        this.nodesStudied.forEach(function (level, node) {
            var newLevel = 0;
            for (var i = 0; i < node.levels.length; i++) {
                if (node.levels[i].costRedBooks > 0 || node.levels[i].costRSB > 0) {
                    break;
                }
                newLevel = i + 1;
            }
            _this.nodesStudied.set(node, newLevel);
        });
    };
    SkillTree.prototype.learnAllLessons = function () {
        var _this = this;
        this.nodesStudied.forEach(function (level, node) {
            _this.nodesStudied.set(node, node.levels.length);
        });
    };
    SkillTree.prototype.resetSkillTree = function () {
        var _this = this;
        this.nodesStudied.forEach(function (level, node) {
            _this.nodesStudied.set(node, 0);
        });
    };
    // What lessons can still be learnt? 
    // (where is node not max level)
    SkillTree.prototype.getNextPossibleLessons = function (lessonFilter) {
        var nextPossibleLessons = new Map();
        this.nodesStudied.forEach(function (level, node) {
            if (level < node.levels.length) { // Not last level yet
                var nextLevel = node.levels[level]; // Cost to study this lesson
                if (nextPossibleLessons.get(node) === undefined) {
                    if (nextLevel.costRSB > 0 && (lessonFilter === "onlyScrolls" || lessonFilter === "onlyScrollsAndRed")) {
                        return; // Don't add if we want only scrolls or only red book lessons
                    }
                    if (nextLevel.costRedBooks > 0 && (lessonFilter === "onlyScrolls" || lessonFilter === "onlyScrollsAndRSB")) {
                        return; // Don't add if we want only scrolls or RSB lessons
                    }
                    if (lessonFilter === "onlyScrollsAndRed" && !(nextLevel.costRedBooks > 0)) {
                        return; // If we filter by red books, we want red book costs to be at least 1
                    }
                    if (lessonFilter === "onlyScrollsAndRSB" && !(nextLevel.costRSB > 0)) {
                        return; // If we filter by red books, we want red book costs to be at least 1
                    }
                    nextPossibleLessons.set(node, level + 1);
                }
            }
        });
        return nextPossibleLessons;
    };
    SkillTree.prototype.getCosts = function () {
        var totalScrolls = 0;
        var totalRedBooks = 0;
        var totalRSB = 0;
        this.nodesStudied.forEach(function (level, node) {
            for (var i = 0; i < level; i++) {
                totalScrolls += node.levels[i].costScrolls;
                if (node.levels[i].costRedBooks) {
                    totalRedBooks += node.levels[i].costRedBooks;
                }
                if (node.levels[i].costRSB) {
                    totalRSB += node.levels[i].costRSB;
                }
            }
        });
        return {
            costScrolls: totalScrolls,
            costRedBooks: totalRedBooks,
            costRSB: totalRSB
        };
    };
    SkillTree.prototype.getCostsString = function () {
        var costs = this.getCosts();
        return costs.costScrolls + " scrolls, " + costs.costRedBooks + " red books, " + costs.costRSB + " restricted section books";
    };
    SkillTree.prototype.getNumberOfLessons = function () {
        var result = 0;
        this.nodesStudied.forEach(function (level, node) {
            result += node.levels.length;
        });
        return result;
    };
    SkillTree.skillTreeFilterLessonsMap = {
        all: "All",
        onlyScrolls: "Lessons with only scrolls",
        onlyScrollsAndRSB: "Lessons with green books",
        onlyScrollsAndRed: "Lessons with red books"
    };
    return SkillTree;
}());



/***/ }),

/***/ "../src/model/player/Wizard.ts":
/*!*************************************!*\
  !*** ../src/model/player/Wizard.ts ***!
  \*************************************/
/*! exports provided: Wizard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wizard", function() { return Wizard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Combatant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Combatant */ "../src/model/Combatant.ts");
/* harmony import */ var _data_focusCosts_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../data/focusCosts.json */ "../src/data/focusCosts.json");
var _data_focusCosts_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../data/focusCosts.json */ "../src/data/focusCosts.json", 1);
/* harmony import */ var _data_potions_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../data/potions.json */ "../src/data/potions.json");
var _data_potions_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../data/potions.json */ "../src/data/potions.json", 1);
/* harmony import */ var _src_data_potionsBrewTime_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../src/data/potionsBrewTime.json */ "../src/data/potionsBrewTime.json");
var _src_data_potionsBrewTime_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../../src/data/potionsBrewTime.json */ "../src/data/potionsBrewTime.json", 1);





var Wizard = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Wizard, _super);
    function Wizard(stats, nameClass, playerIndex, knockoutTime) {
        var _this = _super.call(this, stats.stamina) || this;
        _this.focusCostData = _data_focusCosts_json__WEBPACK_IMPORTED_MODULE_2__;
        _this.potionData = _data_potions_json__WEBPACK_IMPORTED_MODULE_3__;
        _this.inCombatWith = null;
        // Used for rules to check whether exstimulo should be applied
        _this.exstimuloPotionDamageBuff = 0;
        _this.witSharpeningPotionDamageBuff = 0;
        // Used for calculating time spent defeated
        _this.timestampDefeated = -1; // When was combatant defeated?
        _this.timeSpentDefeated = 0;
        // Buffs
        // Auror
        _this.batBogeyHexOnCooldown = false;
        // Professor
        _this.hasDefenceCharm = false;
        _this.defenceCharmValue = 0;
        _this.hasProficiencyPowerCharm = false;
        _this.proficiencyPowerCharmValue = 0;
        _this.mendingCharmOnCooldown = false;
        // Magizoologist
        _this.hasBraveryCharm = false;
        _this.braveryCharmValue = 0;
        // Stats
        _this.totalDamage = 0;
        _this.numberAttackCasts = 0;
        _this.numberCriticalCasts = 0;
        _this.numberDodgedCasts = 0;
        _this.numberEnhancementsDuringAttacks = [0, 0, 0, 0, 0, 0, 0]; // up to 6
        _this.numberImpairmentsDuringAttacks = [0, 0, 0, 0]; // up to 3
        _this.totalDamageReceived = 0;
        _this.numberAttacksReceived = 0;
        _this.numberEnhancementsDuringAttacksReceived = [0, 0, 0, 0, 0, 0, 0]; // up to 6
        _this.numberImpairmentsDuringAttacksReceived = [0, 0, 0, 0]; // up to 3
        _this.stats = stats;
        _this.nameClass = nameClass;
        _this.nameClassUserFriendly = _this.getNameClassUserFriendly(nameClass);
        _this.playerIndex = playerIndex;
        _this.knockoutTime = knockoutTime;
        _this.focus = 0;
        _this.maximumFocusMinusCurrentFocus = _this.stats.maxFocus;
        _this.addFocus(_this.stats.initialFocus);
        _this.triggers = {
            // Auror
            aurorAdvantage: null,
            weakeningHex: null,
            batBogeyHex: null,
            playingDirty: null,
            focusCharm: null,
            dancingWithDummies: null,
            confusionHex: null,
            trickWithDeathEaters: null,
            firstStrike: null,
            mundungusAmongUs: null,
            // Magizoologist
            ministryMagizoologyOrientation: null,
            forumQuorum: null,
            becomeTheBeast: null,
            birdInHand: null,
            spiders: null,
            vileCreatures: null,
            staminaCharm: null,
            reviveCharm: null,
            braveryCharm: null,
            // Professor
            confidence: null,
            defenceCharm: null,
            deteriorationHex: null,
            fullMoonHunter: null,
            idealExchange: null,
            mendingCharm: null,
            onSabbatical: null,
            peskyPixies: null,
            proficiencyPowerCharm: null,
            restrictedSection: null,
            sparringSpecifics: null,
            strengthInNumbers: null,
            teamTeaching: null,
            teamworkMakesTheDreamWork: null
        };
        return _this;
    }
    /*setTriggers(triggers: Map<triggerNameType, number>): void {
        this.triggers = triggers;
    }*/
    Wizard.prototype.setTrigger = function (triggerName, value) {
        this.triggers[triggerName] = value;
    };
    Wizard.prototype.getTriggers = function () {
        return this.triggers;
    };
    Wizard.prototype.getNameClassUserFriendly = function (nameClass) {
        switch (nameClass) {
            case "auror": return "Auror";
            case "magizoologist": return "Magizoologist";
            case "professor": return "Professor";
        }
    };
    Wizard.prototype.addFocus = function (delta) {
        this.setFocus(this.focus + delta);
    };
    Wizard.prototype.removeFocus = function (delta) {
        this.setFocus(this.focus - delta);
    };
    Wizard.prototype.setFocus = function (focus) {
        this.focus = focus;
        this.maximumFocusMinusCurrentFocus = this.stats.maxFocus - this.focus;
        if (this.focus > this.stats.maxFocus) {
            this.focus = this.stats.maxFocus;
            this.maximumFocusMinusCurrentFocus = 0;
        }
        if (this.focus < 0) {
            throw new Error("Tried using too much focus, this.focus=" + this.focus + +", maxFocus=" + this.stats.maxFocus);
        }
    };
    Wizard.prototype.getFocus = function () {
        return this.focus;
    };
    Wizard.prototype.revive = function (timestampRevived) {
        this.isDefeated = false;
        this.addStamina(this.getMaxStamina());
        if (this.timestampDefeated > -1 && timestampRevived > -1 && timestampRevived > this.timestampDefeated) {
            this.timeSpentDefeated += timestampRevived - this.timestampDefeated;
        }
    };
    Wizard.prototype.getProficiencyPowerAfterModifications = function () {
        return this.stats.proficiencyPower + this.proficiencyPowerCharmValue;
    };
    Wizard.prototype.getDefenceAfterModifications = function (enemy) {
        return this.stats.defence + this.defenceCharmValue;
    };
    Wizard.prototype.getDefenceBreachAfterModifications = function (enemy) {
        return this.stats.defenceBreach;
    };
    Wizard.prototype.getDeficiencyDefenceAfterModifications = function () {
        return this.stats.deficiencyDefence;
    };
    Wizard.prototype.getPowerAfterModifications = function (enemy) {
        return this.stats.power;
    };
    Wizard.prototype.getCritChanceAfterModifications = function (enemy) {
        return this.stats.critChance; // + auror if 100% stamina
    };
    Wizard.prototype.getCriticalPowerAfterModifications = function (enemy) {
        return this.stats.criticalPower; // + auror if 100% stamina
    };
    Wizard.prototype.getProtegoPowerAfterModifications = function (enemy) {
        return this.stats.protegoPower;
    };
    Wizard.prototype.getAccuracyAfterModifications = function (enemy) {
        return this.stats.accuracy;
    };
    // Potions, magizoologist bravery charm:
    // Source: https://www.reddit.com/r/harrypotterwu/comments/csgsdd/all_about_combat_damage_what_i_know_or_i_think_i/?st=k0gijz3i&sh=acd204fd
    Wizard.prototype.getDamageBuffMultiplier = function (enemy) {
        return 1 +
            enemy.getExstimuloDamageBuff(this.playerIndex) +
            enemy.getWitSharpeningDamageBuff(this.playerIndex) +
            //this.exstimuloPotionDamageBuff + 
            //this.witSharpeningPotionDamageBuff + 
            (enemy.isElite ? this.braveryCharmValue : 0);
    };
    Wizard.prototype.performAttackCast = function (damage, isCritical, isDodge, enemy) {
        enemy.decreasePotionUsesRemaining(this);
        // Stats
        this.totalDamage += damage;
        this.numberAttackCasts++;
        if (isCritical)
            this.numberCriticalCasts++;
        if (isDodge)
            this.numberDodgedCasts++;
        this.incrementNumberEnhancementsDuringAttacks(this.getNumberOfEnhancements(enemy));
        this.incrementNumberImpairmentsDuringAttacks(enemy.getNumberOfImpairments());
    };
    Wizard.prototype.receiveAttack = function (damage, enemy) {
        this.totalDamageReceived += damage;
        this.numberAttacksReceived++;
        this.incrementNumberEnhancementsDuringAttacksReceived(this.getNumberOfEnhancements(enemy));
        this.incrementNumberImpairmentsDuringAttacksReceived(enemy.getNumberOfImpairments());
    };
    Wizard.prototype.incrementNumberEnhancementsDuringAttacks = function (nEnhancements) {
        this.numberEnhancementsDuringAttacks[nEnhancements]++;
    };
    Wizard.prototype.incrementNumberImpairmentsDuringAttacks = function (nImpairments) {
        this.numberImpairmentsDuringAttacks[nImpairments]++;
    };
    Wizard.prototype.incrementNumberEnhancementsDuringAttacksReceived = function (nEnhancements) {
        this.numberEnhancementsDuringAttacksReceived[nEnhancements]++;
    };
    Wizard.prototype.incrementNumberImpairmentsDuringAttacksReceived = function (nImpairments) {
        this.numberImpairmentsDuringAttacksReceived[nImpairments]++;
    };
    Wizard.prototype.hasEnoughFocusForStrategicSpell = function (strategicSpellName) {
        return this.getFocus() >= _data_focusCosts_json__WEBPACK_IMPORTED_MODULE_2__[strategicSpellName];
    };
    Wizard.prototype.processFocusCostStrategicSpell = function (strategicSpellName) {
        this.removeFocus(_data_focusCosts_json__WEBPACK_IMPORTED_MODULE_2__[strategicSpellName]);
    };
    // https://www.reddit.com/r/harrypotterwu/comments/d02hyh/potions_count_as_an_enhancement_for_professors/?st=k0p91lra&sh=4f6c4a34
    Wizard.prototype.getNumberOfEnhancements = function (enemy) {
        return (this.hasBraveryCharm ? 1 : 0) +
            (this.hasDefenceCharm ? 1 : 0) +
            (this.hasProficiencyPowerCharm ? 1 : 0) +
            // Potions count as enhancements. But only exstimulo OR wit sharpening, not both
            ((enemy.getExstimuloDamageBuff(this.playerIndex) > 0 || enemy.getWitSharpeningDamageBuff(this.playerIndex) > 0) ? 1 : 0) +
            // Potions from outside combat count too
            (this.hasBaruffiosBrainElixir() ? 1 : 0) +
            (this.hasTonicForTraceDetection() ? 1 : 0);
    };
    Wizard.prototype.removePotionBuffs = function () {
        this.exstimuloPotionDamageBuff = 0;
        this.witSharpeningPotionDamageBuff = 0;
    };
    Wizard.prototype.setPotions = function (potions) {
        this.potionsAtBeginning = JSON.parse(JSON.stringify(potions));
        this.potions = potions;
    };
    Wizard.prototype.getPotions = function () {
        return this.potions;
    };
    Wizard.prototype.getPotionsAtBeginning = function () {
        return this.potionsAtBeginning;
    };
    Wizard.prototype.getPotionsUsed = function () {
        // Diff between original potions and new potions
        return {
            nHealingPotionsAvailable: this.potionsAtBeginning.nHealingPotionsAvailable - this.getPotions().nHealingPotionsAvailable,
            nWeakInvigorationAvailable: this.potionsAtBeginning.nWeakInvigorationAvailable - this.getPotions().nWeakInvigorationAvailable,
            nStrongInvigorationAvailable: this.potionsAtBeginning.nStrongInvigorationAvailable - this.getPotions().nStrongInvigorationAvailable,
            nExstimuloAvailable: this.potionsAtBeginning.nExstimuloAvailable - this.getPotions().nExstimuloAvailable,
            nStrongExstimuloAvailable: this.potionsAtBeginning.nStrongExstimuloAvailable - this.getPotions().nStrongExstimuloAvailable,
            nPotentExstimuloAvailable: this.potionsAtBeginning.nPotentExstimuloAvailable - this.getPotions().nPotentExstimuloAvailable,
            nWitSharpeningAvailable: this.potionsAtBeginning.nWitSharpeningAvailable - this.getPotions().nWitSharpeningAvailable,
            // Buffs (outside combat)
            hasBaruffiosBrainElixir: this.potionsAtBeginning.hasBaruffiosBrainElixir,
            hasTonicForTraceDetection: this.potionsAtBeginning.hasTonicForTraceDetection
        };
    };
    Wizard.prototype.getPotionsUsedBrewTime = function (useMasterNotes) {
        return Wizard.getPotionsBrewTime(this.getPotionsUsed(), useMasterNotes);
    };
    Wizard.prototype.hasBaruffiosBrainElixir = function () {
        return this.potions.hasBaruffiosBrainElixir;
    };
    Wizard.prototype.hasTonicForTraceDetection = function () {
        return this.potions.hasTonicForTraceDetection;
    };
    Wizard.prototype.toUserFriendlyDescription = function () {
        return this.nameClassUserFriendly + " (id=" + this.playerIndex + ")";
    };
    Wizard.getPotionsBrewTime = function (potions, useMasterNotes) {
        var hours = potions.nExstimuloAvailable * _src_data_potionsBrewTime_json__WEBPACK_IMPORTED_MODULE_4__.exstimuloPotion +
            potions.nStrongExstimuloAvailable * _src_data_potionsBrewTime_json__WEBPACK_IMPORTED_MODULE_4__.strongExstimuloPotion +
            potions.nPotentExstimuloAvailable * _src_data_potionsBrewTime_json__WEBPACK_IMPORTED_MODULE_4__.potentExstimuloPotion +
            potions.nHealingPotionsAvailable * _src_data_potionsBrewTime_json__WEBPACK_IMPORTED_MODULE_4__.healthPotion +
            potions.nWeakInvigorationAvailable * _src_data_potionsBrewTime_json__WEBPACK_IMPORTED_MODULE_4__.weakInvigorationPotion +
            potions.nStrongInvigorationAvailable * _src_data_potionsBrewTime_json__WEBPACK_IMPORTED_MODULE_4__.strongInvigorationPotion +
            potions.nWitSharpeningAvailable * _src_data_potionsBrewTime_json__WEBPACK_IMPORTED_MODULE_4__.witSharpeningPotion;
        if (useMasterNotes === true) {
            hours *= _src_data_potionsBrewTime_json__WEBPACK_IMPORTED_MODULE_4__.masterNotesDecrease;
        }
        return hours;
    };
    return Wizard;
}(_Combatant__WEBPACK_IMPORTED_MODULE_1__["Combatant"]));



/***/ }),

/***/ "../src/model/player/WizardFactory.ts":
/*!********************************************!*\
  !*** ../src/model/player/WizardFactory.ts ***!
  \********************************************/
/*! exports provided: WizardFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizardFactory", function() { return WizardFactory; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Auror__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Auror */ "../src/model/player/Auror.ts");
/* harmony import */ var _Magizoologist__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Magizoologist */ "../src/model/player/Magizoologist.ts");
/* harmony import */ var _Professor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Professor */ "../src/model/player/Professor.ts");
/* harmony import */ var _SkillTree_SkillTree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SkillTree/SkillTree */ "../src/model/player/SkillTree/SkillTree.ts");
/* harmony import */ var _env_enemies_Enemy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../env/enemies/Enemy */ "../src/model/env/enemies/Enemy.ts");






var WizardFactory = /** @class */ (function () {
    function WizardFactory() {
    }
    /*static buildProfessor(stats: WizardStats, playerIndex: number, knockoutTime: number): Professor {
        return this.buildWizard(stats, "professor", playerIndex, knockoutTime) as Professor;
    }*/
    WizardFactory.buildWizard = function (stats, nameClass, playerIndex, knockoutTime) {
        switch (nameClass) {
            case "auror": return new _Auror__WEBPACK_IMPORTED_MODULE_1__["Auror"](stats, playerIndex, knockoutTime);
            case "magizoologist": return new _Magizoologist__WEBPACK_IMPORTED_MODULE_2__["Magizoologist"](stats, playerIndex, knockoutTime);
            case "professor": return new _Professor__WEBPACK_IMPORTED_MODULE_3__["Professor"](stats, playerIndex, knockoutTime);
        }
    };
    /*static buildWizardWithTriggers(stats: WizardStats, nameClass: nameClassType, playerIndex: number, knockoutTime: number, triggers: Map<triggerNameType,number>): Wizard {
        let result = this.buildWizard(stats, nameClass, playerIndex, knockoutTime);
        result.triggers = triggers;
        return result;
    }*/
    WizardFactory.buildWizardWithSkillTree = function (skillTree, playerIndex, knockoutTime, potions) {
        var wizard = this.buildWizard(skillTree.toWizardStats(), skillTree.nameClass, playerIndex, knockoutTime);
        wizard.setPotions(potions);
        skillTree.applyTriggers(wizard);
        return wizard;
    };
    WizardFactory.buildDemoWizard = function (nameClass) {
        var wizard = this.buildWizardWithSkillTree(_SkillTree_SkillTree__WEBPACK_IMPORTED_MODULE_4__["SkillTree"].fromPersisted({ nameClass: nameClass, nodesStudied: [] }), 0, 0, {
            nExstimuloAvailable: 0, nHealingPotionsAvailable: 0, nPotentExstimuloAvailable: 0, nStrongExstimuloAvailable: 0, nStrongInvigorationAvailable: 0,
            nWeakInvigorationAvailable: 0, nWitSharpeningAvailable: 0, hasBaruffiosBrainElixir: false, hasTonicForTraceDetection: false
        });
        var enemy = _env_enemies_Enemy__WEBPACK_IMPORTED_MODULE_5__["Enemy"].buildDemoEnemy();
        wizard.inCombat = true;
        wizard.inCombatWith = enemy;
        enemy.inCombat = true;
        enemy.inCombatWith = wizard;
        return wizard;
    };
    return WizardFactory;
}());



/***/ }),

/***/ "../src/model/player/WizardStats.ts":
/*!******************************************!*\
  !*** ../src/model/player/WizardStats.ts ***!
  \******************************************/
/*! exports provided: WizardStats */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizardStats", function() { return WizardStats; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _CombatantStats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CombatantStats */ "../src/model/CombatantStats.ts");
/* harmony import */ var _data_wizardBaseStats_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../data/wizardBaseStats.json */ "../src/data/wizardBaseStats.json");
var _data_wizardBaseStats_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../data/wizardBaseStats.json */ "../src/data/wizardBaseStats.json", 1);



var WizardStats = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](WizardStats, _super);
    function WizardStats(stamina, defence, deficiencyDefence, power, proficiencyPower, defenceBreach, protegoPower, initialFocus, maxFocus, critChance, criticalPower, accuracy) {
        var _this = _super.call(this, stamina, defence, deficiencyDefence, power, proficiencyPower, defenceBreach) || this;
        // Auror
        _this.weakeningHexValue = 0; // (positive value here, will be subtracted later)
        _this.confusionHexValue = 0;
        _this.batBogeyHexDamage = 0;
        _this.focusCharmValue = 0;
        // Magizoologist (mending charm is in professor)
        _this.staminaCharmValue = 0; // between 0 and 1
        _this.reviveCharmValue = 0;
        _this.braveryCharmValue = 0;
        // Professor
        _this.deteriorationHexDamage = 0;
        _this.mendingCharmStaminaRestore = 0;
        _this.defenceCharmIncrease = 0;
        _this.proficiencyPowerCharmIncrease = 0;
        _this.protegoPower = protegoPower;
        _this.initialFocus = initialFocus;
        _this.maxFocus = maxFocus;
        _this.critChance = critChance;
        _this.criticalPower = criticalPower;
        _this.accuracy = accuracy;
        return _this;
    }
    // https://wizardsunite.gamepress.gg/reference/professor-skill-tree
    WizardStats.buildBaseStats = function () {
        return Object.assign({}, _data_wizardBaseStats_json__WEBPACK_IMPORTED_MODULE_2__.data);
    };
    return WizardStats;
}(_CombatantStats__WEBPACK_IMPORTED_MODULE_1__["CombatantStats"]));



/***/ }),

/***/ "../src/rules/RulesEngine.ts":
/*!***********************************!*\
  !*** ../src/rules/RulesEngine.ts ***!
  \***********************************/
/*! exports provided: RulesEngine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RulesEngine", function() { return RulesEngine; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var truegin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! truegin */ "../node_modules/truegin/dist/lib/truegin.js");
/* harmony import */ var truegin__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(truegin__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_professorRules_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store/professorRules.json */ "../src/rules/store/professorRules.json");
var _store_professorRules_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./store/professorRules.json */ "../src/rules/store/professorRules.json", 1);
/* harmony import */ var _store_aurorRules_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store/aurorRules.json */ "../src/rules/store/aurorRules.json");
var _store_aurorRules_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./store/aurorRules.json */ "../src/rules/store/aurorRules.json", 1);
/* harmony import */ var _store_magizoologistRules_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store/magizoologistRules.json */ "../src/rules/store/magizoologistRules.json");
var _store_magizoologistRules_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./store/magizoologistRules.json */ "../src/rules/store/magizoologistRules.json", 1);
/* harmony import */ var _data_potions_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../data/potions.json */ "../src/data/potions.json");
var _data_potions_json__WEBPACK_IMPORTED_MODULE_5___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../data/potions.json */ "../src/data/potions.json", 1);
/* harmony import */ var _sim_events_wizard_room_spells_professor_DefenceCharmEvent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../sim/events/wizard/room/spells/professor/DefenceCharmEvent */ "../src/sim/events/wizard/room/spells/professor/DefenceCharmEvent.ts");
/* harmony import */ var _sim_events_wizard_combat_EnterCombatEvent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../sim/events/wizard/combat/EnterCombatEvent */ "../src/sim/events/wizard/combat/EnterCombatEvent.ts");
/* harmony import */ var _sim_events_wizard_room_spells_professor_ProficiencyPowerCharmEvent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../sim/events/wizard/room/spells/professor/ProficiencyPowerCharmEvent */ "../src/sim/events/wizard/room/spells/professor/ProficiencyPowerCharmEvent.ts");
/* harmony import */ var _sim_events_wizard_room_spells_professor_DeteriorationHexEvent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../sim/events/wizard/room/spells/professor/DeteriorationHexEvent */ "../src/sim/events/wizard/room/spells/professor/DeteriorationHexEvent.ts");
/* harmony import */ var _sim_events_wizard_combat_ExitCombatEvent__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../sim/events/wizard/combat/ExitCombatEvent */ "../src/sim/events/wizard/combat/ExitCombatEvent.ts");
/* harmony import */ var _sim_events_wizard_combat_CombatSpellCircleEvent__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../sim/events/wizard/combat/CombatSpellCircleEvent */ "../src/sim/events/wizard/combat/CombatSpellCircleEvent.ts");
/* harmony import */ var _sim_events_wizard_room_spells_professor_MendingCharmEvent__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../sim/events/wizard/room/spells/professor/MendingCharmEvent */ "../src/sim/events/wizard/room/spells/professor/MendingCharmEvent.ts");
/* harmony import */ var _sim_events_wizard_potions_InvigorationPotionEvent__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../sim/events/wizard/potions/InvigorationPotionEvent */ "../src/sim/events/wizard/potions/InvigorationPotionEvent.ts");
/* harmony import */ var _sim_events_wizard_potions_ExstimuloPotionEvent__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../sim/events/wizard/potions/ExstimuloPotionEvent */ "../src/sim/events/wizard/potions/ExstimuloPotionEvent.ts");
/* harmony import */ var _sim_events_wizard_potions_WitSharpeningPotionEvent__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../sim/events/wizard/potions/WitSharpeningPotionEvent */ "../src/sim/events/wizard/potions/WitSharpeningPotionEvent.ts");
/* harmony import */ var _sim_events_wizard_potions_HealthPotionEvent__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../sim/events/wizard/potions/HealthPotionEvent */ "../src/sim/events/wizard/potions/HealthPotionEvent.ts");
/* harmony import */ var _util_Utils__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../util/Utils */ "../src/util/Utils.ts");
/* harmony import */ var _model_player_WizardFactory__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../model/player/WizardFactory */ "../src/model/player/WizardFactory.ts");
/* harmony import */ var _sim_events_wizard_room_spells_auror_BatBogeyHexEvent__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../sim/events/wizard/room/spells/auror/BatBogeyHexEvent */ "../src/sim/events/wizard/room/spells/auror/BatBogeyHexEvent.ts");
/* harmony import */ var _sim_events_wizard_room_spells_auror_WeakeningHexEvent__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../sim/events/wizard/room/spells/auror/WeakeningHexEvent */ "../src/sim/events/wizard/room/spells/auror/WeakeningHexEvent.ts");
/* harmony import */ var _sim_events_wizard_room_spells_auror_ConfusionHexEvent__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../sim/events/wizard/room/spells/auror/ConfusionHexEvent */ "../src/sim/events/wizard/room/spells/auror/ConfusionHexEvent.ts");
/* harmony import */ var _sim_events_wizard_room_spells_magizoologist_BraveryCharmEvent__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../sim/events/wizard/room/spells/magizoologist/BraveryCharmEvent */ "../src/sim/events/wizard/room/spells/magizoologist/BraveryCharmEvent.ts");
/* harmony import */ var _sim_events_wizard_room_spells_magizoologist_StaminaCharmEvent__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../sim/events/wizard/room/spells/magizoologist/StaminaCharmEvent */ "../src/sim/events/wizard/room/spells/magizoologist/StaminaCharmEvent.ts");
/* harmony import */ var _sim_events_wizard_room_spells_magizoologist_ReviveCharmEvent__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../sim/events/wizard/room/spells/magizoologist/ReviveCharmEvent */ "../src/sim/events/wizard/room/spells/magizoologist/ReviveCharmEvent.ts");

























var RulesEngine = /** @class */ (function () {
    function RulesEngine(ruleContainer, rng) {
        var _this = this;
        this.engine = new truegin__WEBPACK_IMPORTED_MODULE_1__["Engine"]();
        this.rng = rng;
        var rules = ruleContainer.rules;
        rules.forEach(function (rule, index) {
            // First rule should have highest priority (10000 is most important)
            _this.engine.addRule(rule);
        });
    }
    RulesEngine.buildFromStandard = function (nameClass, rng) {
        var ruleContainer;
        switch (nameClass) {
            case "professor":
                ruleContainer = _store_professorRules_json__WEBPACK_IMPORTED_MODULE_2__;
                break;
            case "magizoologist":
                ruleContainer = _store_magizoologistRules_json__WEBPACK_IMPORTED_MODULE_4__;
                break;
            case "auror":
                ruleContainer = _store_aurorRules_json__WEBPACK_IMPORTED_MODULE_3__;
                break;
        }
        return new RulesEngine(ruleContainer, rng);
    };
    RulesEngine.getAllowedPaths = function (ruleFactName) {
        var tempWizard = _model_player_WizardFactory__WEBPACK_IMPORTED_MODULE_18__["WizardFactory"].buildDemoWizard("professor");
        var paths = [];
        switch (ruleFactName) {
            case "wizard":
                paths = _util_Utils__WEBPACK_IMPORTED_MODULE_17__["Utils"].getAllFieldNames(tempWizard, "", []);
                break;
            case "highestPriorityAvailableEnemy":
                paths = _util_Utils__WEBPACK_IMPORTED_MODULE_17__["Utils"].getAllFieldNames(tempWizard.inCombatWith, "", []);
                break;
            case "chamber":
                var tempChamber = {
                    currentTimeSeconds: 0,
                    remainingTimeSeconds: 600,
                    remainingEnemies: 10,
                    isAnyWizardDefeated: false,
                    numberOfWizards: 1
                };
                paths = _util_Utils__WEBPACK_IMPORTED_MODULE_17__["Utils"].getAllFieldNames(tempChamber, "", []);
                break;
            default:
                throw new Error("ruleFactName=" + ruleFactName + " is not implemented");
        }
        // Sort by 
        // number of periods "." in string
        // alphabetically
        paths.sort(function (v1, v2) {
            if (v1.split(".").length < v2.split(".").length) {
                return -1;
            }
            else if (v1.split(".").length > v2.split(".").length) {
                return 1;
            }
            // Equal number of dots
            if (v1 < v2) {
                return -1;
            }
            else if (v1 > v2) {
                return 1;
            }
            return 0;
        });
        var filteredExactPaths = [
            ".stats", ".potions", ".potionsAtBeginning", ".potionData", ".triggers",
        ]; // These must be matched exactly
        var filteredPaths = ["numberEnhancementsDuringAttacks", "numberImpairmentsDuringAttacks", "numberEnhancementsDuringAttacksReceived", "numberImpairmentsDuringAttacksReceived"]; // These must only be part of the string
        paths = paths.filter(function (path) {
            var e_1, _a;
            // also any ending with .0, .1, .2, .length
            if (filteredExactPaths.indexOf(path) > -1) {
                return false;
            }
            try {
                for (var filteredPaths_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](filteredPaths), filteredPaths_1_1 = filteredPaths_1.next(); !filteredPaths_1_1.done; filteredPaths_1_1 = filteredPaths_1.next()) {
                    var filteredPath = filteredPaths_1_1.value;
                    if (path.includes(filteredPath)) {
                        return false;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (filteredPaths_1_1 && !filteredPaths_1_1.done && (_a = filteredPaths_1.return)) _a.call(filteredPaths_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return true;
        });
        return paths;
    };
    RulesEngine.getAllowedTargetType = function (actionName) {
        switch (actionName) {
            case "batBogeyHex": return "targetEnemy";
            case "braveryCharm": return null;
            case "combatSpellCastWizard": return null;
            case "confusionHex": return "targetEnemy";
            case "defenceCharm": return "targetWizard";
            case "deteriorationHex": return "targetEnemy";
            case "enterCombatWithHighestPriorityAvailableEnemy": return null;
            case "exitCombat": return null;
            case "exstimuloPotion": return null;
            case "focusCharm": return "targetWizard";
            case "healthPotion": return null;
            case "mendingCharm": return "targetWizard";
            case "noAction": return null;
            case "potentExstimuloPotion": return null;
            case "proficiencyPowerCharm": return null;
            case "reviveCharm": return "targetWizard";
            case "staminaCharm": return "targetWizard";
            case "strongExstimuloPotion": return null;
            case "strongInvigorationPotion": return null;
            case "weakInvigorationPotion": return null;
            case "weakeningHex": return "targetEnemy";
            case "witSharpeningPotion": return null;
            default: throw new Error("actionName=" + actionName + " not implemented.");
        }
    };
    RulesEngine.prototype.getLowestHPCombatant = function (combatants) {
        var result = combatants.sort(function (v1, v2) {
            return v2.getCurrentStamina() - v1.getCurrentStamina();
        })[0];
        return result;
    };
    RulesEngine.prototype.getFirstDefeatedWizard = function (wizards) {
        var e_2, _a;
        try {
            for (var wizards_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](wizards), wizards_1_1 = wizards_1.next(); !wizards_1_1.done; wizards_1_1 = wizards_1.next()) {
                var wizard = wizards_1_1.value;
                if (wizard.getIsDefeated())
                    return wizard;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (wizards_1_1 && !wizards_1_1.done && (_a = wizards_1.return)) _a.call(wizards_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return null;
    };
    RulesEngine.prototype.getNextAction = function (timestampBegin, facts) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var results, event, highestPriorityAvailableEnemy, targetEnemy, wizard, targetWizard, otherWizards;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.engine.run(facts).catch(function (error) {
                            console.log("Error processing rules!");
                            throw error;
                        })];
                    case 1:
                        results = _a.sent();
                        if (results.length === 0) {
                            throw new Error("Could not find a next action for wizard id=" + facts.wizard.playerIndex +
                                ", class=" + facts.wizard.nameClassUserFriendly);
                        }
                        event = results[0];
                        // Priority 1 is "default" and not properly considered. I.e., no action with priority 0 is first in array even though mending charm with priority 1 is also in array
                        if (event.type === "noAction" && results.length >= 2) {
                            event = results[1];
                        }
                        highestPriorityAvailableEnemy = facts.highestPriorityAvailableEnemy;
                        targetEnemy = null;
                        wizard = facts.wizard;
                        targetWizard = null;
                        if (event.params !== undefined) {
                            if (event.params.targetWizardIndex !== undefined) {
                                targetWizard = facts.allWizards.filter(function (wizard) { return wizard.playerIndex === event.params.targetWizardIndex; })[0];
                            }
                            switch (event.params.targetWizard) {
                                case "lowestHP":
                                    targetWizard = this.getLowestHPCombatant(facts.allWizards);
                                    break;
                                case "self":
                                    targetWizard = wizard;
                                    break;
                                case "lowestHP_notSelf":
                                    if (facts.allWizards.length === 1) {
                                        throw new Error("Tried to target a different wizard from self but only one wizard in group (action=" + event.type + ")");
                                    }
                                    otherWizards = facts.allWizards.filter(function (wizardInAllWizards) {
                                        return wizardInAllWizards !== wizard;
                                    });
                                    targetWizard = this.getLowestHPCombatant(otherWizards);
                                    break;
                                case "defeatedWizard":
                                    otherWizards = facts.allWizards.filter(function (wizardInAllWizards) {
                                        return wizardInAllWizards !== wizard;
                                    });
                                    targetWizard = this.getFirstDefeatedWizard(otherWizards);
                                    if (targetWizard === null) {
                                        throw new Error("Tried to target a defeated wizard but there are none!");
                                    }
                                    break;
                                default:
                                    targetWizard = wizard;
                                    break;
                            }
                            switch (event.params.targetEnemy) {
                                case "highestPriorityAvailableEnemy":
                                    targetEnemy = highestPriorityAvailableEnemy;
                                    break;
                                case "lowestHP":
                                    targetEnemy = this.getLowestHPCombatant(facts.allActiveEnemies);
                                    break;
                                default:
                                    targetEnemy = highestPriorityAvailableEnemy;
                                    break;
                            }
                        }
                        else {
                            // Still set defaults if people forget them
                            targetWizard = wizard;
                            targetEnemy = highestPriorityAvailableEnemy;
                        }
                        switch (event.type) {
                            // Invigoration potion
                            case "strongInvigorationPotion":
                                return [2 /*return*/, new _sim_events_wizard_potions_InvigorationPotionEvent__WEBPACK_IMPORTED_MODULE_13__["InvigorationPotionEvent"](timestampBegin, wizard, wizard.getPotions(), _data_potions_json__WEBPACK_IMPORTED_MODULE_5__.strongInvigorationPotionFocus, "strong")];
                            case "weakInvigorationPotion":
                                return [2 /*return*/, new _sim_events_wizard_potions_InvigorationPotionEvent__WEBPACK_IMPORTED_MODULE_13__["InvigorationPotionEvent"](timestampBegin, wizard, wizard.getPotions(), _data_potions_json__WEBPACK_IMPORTED_MODULE_5__.weakInvigorationPotionFocus, "weak")];
                            // Auror
                            case "weakeningHex":
                                return [2 /*return*/, new _sim_events_wizard_room_spells_auror_WeakeningHexEvent__WEBPACK_IMPORTED_MODULE_20__["WeakeningHexEvent"](timestampBegin, wizard.stats.weakeningHexValue, targetEnemy, wizard)];
                            case "confusionHex":
                                return [2 /*return*/, new _sim_events_wizard_room_spells_auror_ConfusionHexEvent__WEBPACK_IMPORTED_MODULE_21__["ConfusionHexEvent"](timestampBegin, wizard.stats.confusionHexValue, targetEnemy, wizard)];
                            case "batBogeyHex":
                                return [2 /*return*/, new _sim_events_wizard_room_spells_auror_BatBogeyHexEvent__WEBPACK_IMPORTED_MODULE_19__["BatBogeyHexEvent"](timestampBegin, wizard.stats.batBogeyHexDamage, targetEnemy, wizard)];
                            // Magizoologist
                            case "braveryCharm":
                                return [2 /*return*/, new _sim_events_wizard_room_spells_magizoologist_BraveryCharmEvent__WEBPACK_IMPORTED_MODULE_22__["BraveryCharmEvent"](timestampBegin, wizard.stats.braveryCharmValue, facts.allWizards, wizard)];
                            case "staminaCharm":
                                return [2 /*return*/, new _sim_events_wizard_room_spells_magizoologist_StaminaCharmEvent__WEBPACK_IMPORTED_MODULE_23__["StaminaCharmEvent"](timestampBegin, wizard.stats.staminaCharmValue, targetWizard, wizard)];
                            case "reviveCharm":
                                return [2 /*return*/, new _sim_events_wizard_room_spells_magizoologist_ReviveCharmEvent__WEBPACK_IMPORTED_MODULE_24__["ReviveCharmEvent"](timestampBegin, wizard.stats.reviveCharmValue, targetWizard, wizard)];
                            // Professor    
                            case "defenceCharm":
                                //console.log(event);
                                return [2 /*return*/, new _sim_events_wizard_room_spells_professor_DefenceCharmEvent__WEBPACK_IMPORTED_MODULE_6__["DefenceCharmEvent"](timestampBegin, wizard.stats.defenceCharmIncrease, targetWizard, wizard)];
                            case "proficiencyPowerCharm":
                                return [2 /*return*/, new _sim_events_wizard_room_spells_professor_ProficiencyPowerCharmEvent__WEBPACK_IMPORTED_MODULE_8__["ProficiencyPowerCharmEvemt"](timestampBegin, wizard.stats.proficiencyPowerCharmIncrease, facts.allWizards, wizard)];
                            case "deteriorationHex":
                                return [2 /*return*/, new _sim_events_wizard_room_spells_professor_DeteriorationHexEvent__WEBPACK_IMPORTED_MODULE_9__["DeteriorationHexEvent"](timestampBegin, wizard.stats.deteriorationHexDamage, targetEnemy, wizard)];
                            case "mendingCharm":
                                return [2 /*return*/, new _sim_events_wizard_room_spells_professor_MendingCharmEvent__WEBPACK_IMPORTED_MODULE_12__["MendingCharmEvent"](timestampBegin, wizard.stats.mendingCharmStaminaRestore, targetWizard, wizard)];
                            // Combat
                            case "enterCombatWithHighestPriorityAvailableEnemy":
                                return [2 /*return*/, new _sim_events_wizard_combat_EnterCombatEvent__WEBPACK_IMPORTED_MODULE_7__["EnterCombatEvent"](timestampBegin, highestPriorityAvailableEnemy, wizard, this.rng)];
                            case "exitCombat":
                                return [2 /*return*/, new _sim_events_wizard_combat_ExitCombatEvent__WEBPACK_IMPORTED_MODULE_10__["ExitCombatEvent"](timestampBegin, wizard.inCombatWith, wizard, this.rng)];
                            case "potentExstimuloPotion":
                                return [2 /*return*/, new _sim_events_wizard_potions_ExstimuloPotionEvent__WEBPACK_IMPORTED_MODULE_14__["ExstimuloPotionEvent"](timestampBegin, wizard, wizard.inCombatWith, wizard.getPotions(), _data_potions_json__WEBPACK_IMPORTED_MODULE_5__.potentExstimuloPotionDamageBuff, _data_potions_json__WEBPACK_IMPORTED_MODULE_5__.potentExstimuloPotionUses, "potent")];
                            case "strongExstimuloPotion":
                                return [2 /*return*/, new _sim_events_wizard_potions_ExstimuloPotionEvent__WEBPACK_IMPORTED_MODULE_14__["ExstimuloPotionEvent"](timestampBegin, wizard, wizard.inCombatWith, wizard.getPotions(), _data_potions_json__WEBPACK_IMPORTED_MODULE_5__.strongExstimuloPotionDamageBuff, _data_potions_json__WEBPACK_IMPORTED_MODULE_5__.strongExstimuloPotionUses, "strong")];
                            case "exstimuloPotion":
                                return [2 /*return*/, new _sim_events_wizard_potions_ExstimuloPotionEvent__WEBPACK_IMPORTED_MODULE_14__["ExstimuloPotionEvent"](timestampBegin, wizard, wizard.inCombatWith, wizard.getPotions(), _data_potions_json__WEBPACK_IMPORTED_MODULE_5__.exstimuloPotionDamageBuff, _data_potions_json__WEBPACK_IMPORTED_MODULE_5__.exstimuloPotionUses, "normal")];
                            case "witSharpeningPotion":
                                return [2 /*return*/, new _sim_events_wizard_potions_WitSharpeningPotionEvent__WEBPACK_IMPORTED_MODULE_15__["WitSharpeningPotionEvent"](timestampBegin, wizard, wizard.inCombatWith, _data_potions_json__WEBPACK_IMPORTED_MODULE_5__.witSharpeningPotionDamageBuff, _data_potions_json__WEBPACK_IMPORTED_MODULE_5__.witSharpeningPotionUses, wizard.getPotions())];
                            case "healthPotion":
                                return [2 /*return*/, new _sim_events_wizard_potions_HealthPotionEvent__WEBPACK_IMPORTED_MODULE_16__["HealthPotionEvent"](timestampBegin, wizard, wizard.getPotions(), _data_potions_json__WEBPACK_IMPORTED_MODULE_5__.healthPotion)];
                            case "combatSpellCastWizard":
                                return [2 /*return*/, new _sim_events_wizard_combat_CombatSpellCircleEvent__WEBPACK_IMPORTED_MODULE_11__["CombatSpellCircleEvent"](timestampBegin, wizard.inCombatWith, wizard, this.rng)];
                            case "noAction":
                                return [2 /*return*/, null];
                        }
                        throw new Error("Could not find action for event type=" + results[0].type + "!");
                }
            });
        });
    };
    RulesEngine.actionNameMap = {
        "weakeningHex": "Weakening Hex",
        "confusionHex": "Confusion Hex",
        "focusCharm": "Focus Charm",
        "batBogeyHex": "Bat Bogey Hex",
        "staminaCharm": "Stamina Charm",
        "reviveCharm": "Revive Charm",
        "braveryCharm": "Bravery Charm",
        "defenceCharm": "Defence Charm",
        "deteriorationHex": "Deterioration Hex",
        "proficiencyPowerCharm": "Proficiency Power Charm",
        "mendingCharm": "Mending Charm",
        "strongInvigorationPotion": "Strong Invigoration Potion",
        "weakInvigorationPotion": "Weak Invigoration Potion",
        "potentExstimuloPotion": "Potent Exstimulo Potion",
        "strongExstimuloPotion": "Strong Exstimulo Potion",
        "exstimuloPotion": "Exstimulo Potion",
        "witSharpeningPotion": "Wit Sharpening Potion",
        "healthPotion": "Health Potion",
        "enterCombatWithHighestPriorityAvailableEnemy": "Enter combat with highest priority available enemy",
        "exitCombat": "Exit combat",
        "combatSpellCastWizard": "Attack",
        "noAction": "No action"
    };
    RulesEngine.allowedFactObjects = {
        "wizard": {
            "label": "Wizard",
            "allowedPaths": RulesEngine.getAllowedPaths("wizard")
        },
        "highestPriorityAvailableEnemy": {
            "label": "Highest priority available enemy",
            "allowedPaths": RulesEngine.getAllowedPaths("highestPriorityAvailableEnemy")
        },
        chamber: {
            "label": "Chamber",
            "allowedPaths": RulesEngine.getAllowedPaths("chamber")
        }
    };
    RulesEngine.eventTargetTypes = {
        targetWizard: {
            "label": "wizard",
            allowedTargets: [{
                    key: "self", label: "Self"
                },
                {
                    key: "lowestHP", label: "Lowest HP"
                },
                {
                    key: "lowestHP_notSelf", label: "Lowest HP (not self)"
                },
                {
                    key: "defeatedWizard", label: "Defeated wizard"
                }]
        },
        targetEnemy: {
            "label": "enemy",
            allowedTargets: [{
                    key: "highestPriorityAvailableEnemy", label: "Highest Priority Available Enemy"
                }, {
                    key: "lowestHP", label: "Lowest HP"
                }]
        }
    };
    RulesEngine.ruleOperatorMap = {
        "equal": "==",
        "notEqual": "!=",
        "lessThan": "<",
        "lessThanInclusive": "<=",
        "greaterThan": ">",
        "greaterThanInclusive": ">="
    };
    return RulesEngine;
}());



/***/ }),

/***/ "../src/rules/store/aurorRules.json":
/*!******************************************!*\
  !*** ../src/rules/store/aurorRules.json ***!
  \******************************************/
/*! exports provided: author, nameClass, rules, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"author\":\"Zhadok\",\"nameClass\":\"auror\",\"rules\":[{\"event\":{\"type\":\"weakeningHex\"},\"priority\":12,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".triggers.weakeningHex\",\"operator\":\"notEqual\",\"value\":null},{\"fact\":\"wizard\",\"path\":\".focus\",\"operator\":\"greaterThanInclusive\",\"value\":{\"fact\":\"wizard\",\"path\":\".focusCostData.weakeningHex\"}},{\"fact\":\"highestPriorityAvailableEnemy\",\"path\":\".hasWeakeningHex\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":false}]}},{\"event\":{\"type\":\"confusionHex\"},\"priority\":11,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".triggers.confusionHex\",\"operator\":\"notEqual\",\"value\":null},{\"fact\":\"wizard\",\"path\":\".focus\",\"operator\":\"greaterThanInclusive\",\"value\":{\"fact\":\"wizard\",\"path\":\".focusCostData.confusionHex\"}},{\"fact\":\"highestPriorityAvailableEnemy\",\"path\":\".hasConfusionHex\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":false}]}},{\"event\":{\"type\":\"strongInvigorationPotion\"},\"priority\":10,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"wizard\",\"path\":\".focus\",\"operator\":\"lessThan\",\"value\":{\"fact\":\"wizard\",\"path\":\".stats.maxFocus\"}},{\"fact\":\"wizard\",\"path\":\".potions.nStrongInvigorationAvailable\",\"operator\":\"greaterThan\",\"value\":0},{\"any\":[{\"fact\":\"highestPriorityAvailableEnemy\",\"path\":\".hasConfusionHex\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"highestPriorityAvailableEnemy\",\"path\":\".hasWeakeningHex\",\"operator\":\"equal\",\"value\":false}]}]}},{\"event\":{\"type\":\"weakInvigorationPotion\"},\"priority\":9,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"wizard\",\"path\":\".focus\",\"operator\":\"lessThan\",\"value\":{\"fact\":\"wizard\",\"path\":\".stats.maxFocus\"}},{\"fact\":\"wizard\",\"path\":\".potions.nWeakInvigorationAvailable\",\"operator\":\"greaterThan\",\"value\":0},{\"any\":[{\"fact\":\"highestPriorityAvailableEnemy\",\"path\":\".hasConfusionHex\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"highestPriorityAvailableEnemy\",\"path\":\".hasWeakeningHex\",\"operator\":\"equal\",\"value\":false}]}]}},{\"event\":{\"type\":\"enterCombatWithHighestPriorityAvailableEnemy\"},\"priority\":8,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"highestPriorityAvailableEnemy\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":false}]}},{\"event\":{\"type\":\"potentExstimuloPotion\"},\"priority\":7,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":true},{\"fact\":\"wizard\",\"path\":\".potions.nPotentExstimuloAvailable\",\"operator\":\"greaterThan\",\"value\":0},{\"fact\":\"wizard\",\"path\":\".exstimuloPotionDamageBuff\",\"operator\":\"lessThan\",\"value\":{\"fact\":\"wizard\",\"path\":\".potionData.potentExstimuloPotionDamageBuff\"}}]}},{\"event\":{\"type\":\"strongExstimuloPotion\"},\"priority\":6,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":true},{\"fact\":\"wizard\",\"path\":\".potions.nStrongExstimuloAvailable\",\"operator\":\"greaterThan\",\"value\":0},{\"fact\":\"wizard\",\"path\":\".exstimuloPotionDamageBuff\",\"operator\":\"lessThan\",\"value\":{\"fact\":\"wizard\",\"path\":\".potionData.strongExstimuloPotionDamageBuff\"}}]}},{\"event\":{\"type\":\"exstimuloPotion\"},\"priority\":5,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":true},{\"fact\":\"wizard\",\"path\":\".potions.nExstimuloAvailable\",\"operator\":\"greaterThan\",\"value\":0},{\"fact\":\"wizard\",\"path\":\".exstimuloPotionDamageBuff\",\"operator\":\"lessThan\",\"value\":{\"fact\":\"wizard\",\"path\":\".potionData.exstimuloPotionDamageBuff\"}}]}},{\"event\":{\"type\":\"witSharpeningPotion\"},\"priority\":4,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":true},{\"fact\":\"wizard\",\"path\":\".potions.nWitSharpeningAvailable\",\"operator\":\"greaterThan\",\"value\":0},{\"fact\":\"wizard\",\"path\":\".witSharpeningPotionDamageBuff\",\"operator\":\"lessThan\",\"value\":{\"fact\":\"wizard\",\"path\":\".potionData.witSharpeningPotionDamageBuff\"}},{\"fact\":\"wizard\",\"path\":\".inCombatWith.isElite\",\"operator\":\"equal\",\"value\":true}]}},{\"event\":{\"type\":\"healthPotion\"},\"priority\":3,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".potions.nHealingPotionsAvailable\",\"operator\":\"greaterThan\",\"value\":0},{\"fact\":\"wizard\",\"path\":\".currentStaminaPercent\",\"operator\":\"lessThan\",\"value\":0.65},{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":true}]}},{\"event\":{\"type\":\"combatSpellCastWizard\"},\"priority\":2,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":true},{\"fact\":\"wizard\",\"path\":\".inCombatWith\",\"operator\":\"notEqual\",\"value\":null}]}},{\"event\":{\"type\":\"batBogeyHex\"},\"priority\":1,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".triggers.batBogeyHex\",\"operator\":\"notEqual\",\"value\":null},{\"fact\":\"highestPriorityAvailableEnemy\",\"path\":null,\"operator\":\"notEqual\",\"value\":null},{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"wizard\",\"path\":\".batBogeyHexOnCooldown\",\"operator\":\"equal\",\"value\":false}]}},{\"event\":{\"type\":\"noAction\"},\"priority\":0,\"conditions\":{\"all\":[]}}]}");

/***/ }),

/***/ "../src/rules/store/magizoologistRules.json":
/*!**************************************************!*\
  !*** ../src/rules/store/magizoologistRules.json ***!
  \**************************************************/
/*! exports provided: author, nameClass, rules, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"author\":\"Zhadok\",\"nameClass\":\"magizoologist\",\"rules\":[{\"event\":{\"type\":\"reviveCharm\",\"params\":{\"targetWizard\":\"defeatedWizard\"}},\"priority\":14,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".focus\",\"operator\":\"greaterThanInclusive\",\"value\":{\"fact\":\"wizard\",\"path\":\".focusCostData.reviveCharm\"}},{\"fact\":\"chamber\",\"path\":\".isAnyWizardDefeated\",\"operator\":\"equal\",\"value\":true},{\"fact\":\"wizard\",\"path\":\".triggers.reviveCharm\",\"operator\":\"notEqual\",\"value\":null},{\"fact\":\"chamber\",\"path\":\".numberOfWizards\",\"operator\":\"greaterThan\",\"value\":1},{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":false}]}},{\"event\":{\"type\":\"staminaCharm\",\"params\":{\"targetWizard\":\"lowestHP_notSelf\"}},\"priority\":13,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".focus\",\"operator\":\"greaterThanInclusive\",\"value\":{\"fact\":\"wizard\",\"path\":\".focusCostData.staminaCharm\"}},{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"wizard\",\"path\":\".triggers.staminaCharm\",\"operator\":\"notEqual\",\"value\":null},{\"fact\":\"chamber\",\"path\":\".numberOfWizards\",\"operator\":\"greaterThan\",\"value\":1},{\"fact\":\"wizard\",\"path\":\".focus\",\"operator\":\"greaterThanInclusive\",\"value\":7}]}},{\"event\":{\"type\":\"strongInvigorationPotion\"},\"priority\":12,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"wizard\",\"path\":\".focus\",\"operator\":\"lessThan\",\"value\":{\"fact\":\"wizard\",\"path\":\".stats.maxFocus\"}},{\"fact\":\"wizard\",\"path\":\".potions.nStrongInvigorationAvailable\",\"operator\":\"greaterThan\",\"value\":0},{\"any\":[{\"fact\":\"chamber\",\"path\":\".isAnyWizardDefeated\",\"operator\":\"equal\",\"value\":true},{\"all\":[{\"fact\":\"wizard\",\"path\":\".triggers.becomeTheBeast\",\"operator\":\"notEqual\",\"value\":null},{\"fact\":\"wizard\",\"path\":\".focus\",\"operator\":\"lessThan\",\"value\":5}]},{\"all\":[{\"fact\":\"wizard\",\"path\":\".triggers.birdInHand\",\"operator\":\"notEqual\",\"value\":null},{\"fact\":\"wizard\",\"path\":\".focus\",\"operator\":\"lessThan\",\"value\":5}]}]}]}},{\"event\":{\"type\":\"mendingCharm\",\"params\":{\"targetWizard\":\"self\",\"description\":\"Magizoologist should cast mending charm once before entering combat\"}},\"priority\":11,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"wizard\",\"path\":\".currentStamina\",\"operator\":\"lessThan\",\"value\":{\"fact\":\"wizard\",\"path\":\".maxStamina\"}},{\"fact\":\"wizard\",\"path\":\".triggers.mendingCharm\",\"operator\":\"notEqual\",\"value\":null},{\"fact\":\"wizard\",\"path\":\".mendingCharmOnCooldown\",\"operator\":\"equal\",\"value\":false}]}},{\"event\":{\"type\":\"weakInvigorationPotion\"},\"priority\":10,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"wizard\",\"path\":\".focus\",\"operator\":\"lessThan\",\"value\":{\"fact\":\"wizard\",\"path\":\".stats.maxFocus\"}},{\"fact\":\"wizard\",\"path\":\".potions.nWeakInvigorationAvailable\",\"operator\":\"greaterThan\",\"value\":0},{\"any\":[{\"fact\":\"chamber\",\"path\":\".isAnyWizardDefeated\",\"operator\":\"equal\",\"value\":true},{\"all\":[{\"fact\":\"wizard\",\"path\":\".triggers.becomeTheBeast\",\"operator\":\"notEqual\",\"value\":null},{\"fact\":\"wizard\",\"path\":\".focus\",\"operator\":\"lessThan\",\"value\":5}]},{\"all\":[{\"fact\":\"wizard\",\"path\":\".triggers.birdInHand\",\"operator\":\"notEqual\",\"value\":null},{\"fact\":\"wizard\",\"path\":\".focus\",\"operator\":\"lessThan\",\"value\":5}]}]}]}},{\"event\":{\"type\":\"enterCombatWithHighestPriorityAvailableEnemy\"},\"priority\":9,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"highestPriorityAvailableEnemy\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":false}]}},{\"event\":{\"type\":\"exitCombat\"},\"priority\":8,\"conditions\":{\"all\":[{\"fact\":\"chamber\",\"path\":\".isAnyWizardDefeated\",\"operator\":\"equal\",\"value\":true},{\"fact\":\"wizard\",\"path\":\".focus\",\"operator\":\"greaterThanInclusive\",\"value\":{\"fact\":\"wizard\",\"path\":\".focusCostData.reviveCharm\"}},{\"fact\":\"wizard\",\"path\":\".triggers.reviveCharm\",\"operator\":\"notEqual\",\"value\":null},{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":true}]}},{\"event\":{\"type\":\"potentExstimuloPotion\"},\"priority\":7,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":true},{\"fact\":\"wizard\",\"path\":\".potions.nPotentExstimuloAvailable\",\"operator\":\"greaterThan\",\"value\":0},{\"fact\":\"wizard\",\"path\":\".exstimuloPotionDamageBuff\",\"operator\":\"lessThan\",\"value\":{\"fact\":\"wizard\",\"path\":\".potionData.potentExstimuloPotionDamageBuff\"}}]}},{\"event\":{\"type\":\"strongExstimuloPotion\"},\"priority\":6,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":true},{\"fact\":\"wizard\",\"path\":\".potions.nStrongExstimuloAvailable\",\"operator\":\"greaterThan\",\"value\":0},{\"fact\":\"wizard\",\"path\":\".exstimuloPotionDamageBuff\",\"operator\":\"lessThan\",\"value\":{\"fact\":\"wizard\",\"path\":\".potionData.strongExstimuloPotionDamageBuff\"}}]}},{\"event\":{\"type\":\"exstimuloPotion\"},\"priority\":5,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":true},{\"fact\":\"wizard\",\"path\":\".potions.nExstimuloAvailable\",\"operator\":\"greaterThan\",\"value\":0},{\"fact\":\"wizard\",\"path\":\".exstimuloPotionDamageBuff\",\"operator\":\"lessThan\",\"value\":{\"fact\":\"wizard\",\"path\":\".potionData.exstimuloPotionDamageBuff\"}}]}},{\"event\":{\"type\":\"witSharpeningPotion\"},\"priority\":4,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":true},{\"fact\":\"wizard\",\"path\":\".potions.nWitSharpeningAvailable\",\"operator\":\"greaterThan\",\"value\":0},{\"fact\":\"wizard\",\"path\":\".witSharpeningPotionDamageBuff\",\"operator\":\"lessThan\",\"value\":{\"fact\":\"wizard\",\"path\":\".potionData.witSharpeningPotionDamageBuff\"}},{\"fact\":\"wizard\",\"path\":\".inCombatWith.isElite\",\"operator\":\"equal\",\"value\":true}]}},{\"event\":{\"type\":\"healthPotion\"},\"priority\":3,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".potions.nHealingPotionsAvailable\",\"operator\":\"greaterThan\",\"value\":0},{\"fact\":\"wizard\",\"path\":\".currentStaminaPercent\",\"operator\":\"lessThan\",\"value\":0.65},{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":true}]}},{\"event\":{\"type\":\"combatSpellCastWizard\"},\"priority\":2,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":true},{\"fact\":\"wizard\",\"path\":\".inCombatWith\",\"operator\":\"notEqual\",\"value\":null}]}},{\"event\":{\"type\":\"mendingCharm\",\"params\":{\"targetWizard\":\"lowestHP\"}},\"priority\":1,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"highestPriorityAvailableEnemy\",\"operator\":\"equal\",\"value\":null},{\"fact\":\"wizard\",\"path\":\".triggers.mendingCharm\",\"operator\":\"notEqual\",\"value\":null},{\"fact\":\"wizard\",\"path\":\".mendingCharmOnCooldown\",\"operator\":\"equal\",\"value\":false}]}},{\"event\":{\"type\":\"noAction\"},\"priority\":0,\"conditions\":{\"all\":[]}}]}");

/***/ }),

/***/ "../src/rules/store/professorRules.json":
/*!**********************************************!*\
  !*** ../src/rules/store/professorRules.json ***!
  \**********************************************/
/*! exports provided: author, nameClass, rules, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"author\":\"Zhadok\",\"nameClass\":\"professor\",\"rules\":[{\"event\":{\"type\":\"defenceCharm\",\"params\":{\"targetWizard\":\"self\"}},\"priority\":15,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"wizard\",\"path\":\".focus\",\"operator\":\"greaterThanInclusive\",\"value\":{\"fact\":\"wizard\",\"path\":\".focusCostData.defenceCharm\"}},{\"fact\":\"wizard\",\"path\":\".hasDefenceCharm\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"wizard\",\"path\":\".triggers.defenceCharm\",\"operator\":\"notEqual\",\"value\":null}]}},{\"event\":{\"type\":\"proficiencyPowerCharm\"},\"priority\":14,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"wizard\",\"path\":\".focus\",\"operator\":\"greaterThanInclusive\",\"value\":{\"fact\":\"wizard\",\"path\":\".focusCostData.proficiencyPowerCharm\"}},{\"fact\":\"wizard\",\"path\":\".hasProficiencyPowerCharm\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"wizard\",\"path\":\".triggers.proficiencyPowerCharm\",\"operator\":\"notEqual\",\"value\":null}]}},{\"event\":{\"type\":\"deteriorationHex\",\"params\":{\"targetEnemy\":\"highestPriorityAvailableEnemy\"}},\"priority\":13,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"wizard\",\"path\":\".focus\",\"operator\":\"greaterThanInclusive\",\"value\":{\"fact\":\"wizard\",\"path\":\".focusCostData.deteriorationHex\"}},{\"fact\":\"highestPriorityAvailableEnemy\",\"path\":\".hasDeteriorationHex\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"wizard\",\"path\":\".triggers.deteriorationHex\",\"operator\":\"notEqual\",\"value\":null}]}},{\"event\":{\"type\":\"strongInvigorationPotion\"},\"priority\":12,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"wizard\",\"path\":\".focus\",\"operator\":\"lessThan\",\"value\":{\"fact\":\"wizard\",\"path\":\".stats.maxFocus\"}},{\"fact\":\"wizard\",\"path\":\".potions.nStrongInvigorationAvailable\",\"operator\":\"greaterThan\",\"value\":0},{\"any\":[{\"fact\":\"wizard\",\"path\":\".hasDefenceCharm\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"wizard\",\"path\":\".hasProficiencyPowerCharm\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"highestPriorityAvailableEnemy\",\"path\":\".hasDeteriorationHex\",\"operator\":\"equal\",\"value\":false}]}]}},{\"event\":{\"type\":\"weakInvigorationPotion\"},\"priority\":11,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"wizard\",\"path\":\".focus\",\"operator\":\"lessThan\",\"value\":{\"fact\":\"wizard\",\"path\":\".stats.maxFocus\"}},{\"fact\":\"wizard\",\"path\":\".potions.nWeakInvigorationAvailable\",\"operator\":\"greaterThan\",\"value\":0},{\"any\":[{\"fact\":\"wizard\",\"path\":\".hasDefenceCharm\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"wizard\",\"path\":\".hasProficiencyPowerCharm\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"highestPriorityAvailableEnemy\",\"path\":\".hasDeteriorationHex\",\"operator\":\"equal\",\"value\":false}]}]}},{\"event\":{\"type\":\"mendingCharm\",\"params\":{\"targetWizard\":\"self\",\"description\":\"Professor should cast mending charm once before entering combat\"}},\"priority\":10,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"wizard\",\"path\":\".currentStamina\",\"operator\":\"lessThan\",\"value\":{\"fact\":\"wizard\",\"path\":\".maxStamina\"}},{\"fact\":\"wizard\",\"path\":\".triggers.mendingCharm\",\"operator\":\"notEqual\",\"value\":null},{\"fact\":\"wizard\",\"path\":\".mendingCharmOnCooldown\",\"operator\":\"equal\",\"value\":false}]}},{\"event\":{\"type\":\"enterCombatWithHighestPriorityAvailableEnemy\"},\"priority\":9,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"highestPriorityAvailableEnemy\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":false}]}},{\"event\":{\"type\":\"exitCombat\",\"params\":{\"description\":\"Professor should exit and check for better enemies available (disabled for now)\"}},\"priority\":8,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":true},{\"fact\":\"wizard\",\"path\":\".inCombatWith.inCombat\",\"operator\":\"equal\",\"value\":true},{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":null}]}},{\"event\":{\"type\":\"potentExstimuloPotion\"},\"priority\":7,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":true},{\"fact\":\"wizard\",\"path\":\".potions.nPotentExstimuloAvailable\",\"operator\":\"greaterThan\",\"value\":0},{\"fact\":\"wizard\",\"path\":\".exstimuloPotionDamageBuff\",\"operator\":\"lessThan\",\"value\":{\"fact\":\"wizard\",\"path\":\".potionData.potentExstimuloPotionDamageBuff\"}}]}},{\"event\":{\"type\":\"strongExstimuloPotion\"},\"priority\":6,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":true},{\"fact\":\"wizard\",\"path\":\".potions.nStrongExstimuloAvailable\",\"operator\":\"greaterThan\",\"value\":0},{\"fact\":\"wizard\",\"path\":\".exstimuloPotionDamageBuff\",\"operator\":\"lessThan\",\"value\":{\"fact\":\"wizard\",\"path\":\".potionData.strongExstimuloPotionDamageBuff\"}}]}},{\"event\":{\"type\":\"exstimuloPotion\"},\"priority\":5,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":true},{\"fact\":\"wizard\",\"path\":\".potions.nExstimuloAvailable\",\"operator\":\"greaterThan\",\"value\":0},{\"fact\":\"wizard\",\"path\":\".exstimuloPotionDamageBuff\",\"operator\":\"lessThan\",\"value\":{\"fact\":\"wizard\",\"path\":\".potionData.exstimuloPotionDamageBuff\"}}]}},{\"event\":{\"type\":\"witSharpeningPotion\"},\"priority\":4,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":true},{\"fact\":\"wizard\",\"path\":\".potions.nWitSharpeningAvailable\",\"operator\":\"greaterThan\",\"value\":0},{\"fact\":\"wizard\",\"path\":\".witSharpeningPotionDamageBuff\",\"operator\":\"lessThan\",\"value\":{\"fact\":\"wizard\",\"path\":\".potionData.witSharpeningPotionDamageBuff\"}},{\"fact\":\"wizard\",\"path\":\".inCombatWith.isElite\",\"operator\":\"equal\",\"value\":true}]}},{\"event\":{\"type\":\"healthPotion\"},\"priority\":3,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":true},{\"fact\":\"wizard\",\"path\":\".potions.nHealingPotionsAvailable\",\"operator\":\"greaterThan\",\"value\":0},{\"fact\":\"wizard\",\"path\":\".currentStaminaPercent\",\"operator\":\"lessThan\",\"value\":0.65}]}},{\"event\":{\"type\":\"combatSpellCastWizard\"},\"priority\":2,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":true},{\"fact\":\"wizard\",\"path\":\".inCombatWith\",\"operator\":\"notEqual\",\"value\":null}]}},{\"event\":{\"type\":\"mendingCharm\",\"params\":{\"targetWizard\":\"lowestHP\"}},\"priority\":1,\"conditions\":{\"all\":[{\"fact\":\"wizard\",\"path\":\".inCombat\",\"operator\":\"equal\",\"value\":false},{\"fact\":\"highestPriorityAvailableEnemy\",\"operator\":\"equal\",\"value\":null},{\"fact\":\"wizard\",\"path\":\".triggers.mendingCharm\",\"operator\":\"notEqual\",\"value\":null},{\"fact\":\"wizard\",\"path\":\".mendingCharmOnCooldown\",\"operator\":\"equal\",\"value\":false}]}},{\"event\":{\"type\":\"noAction\"},\"priority\":0,\"conditions\":{\"all\":[]}}]}");

/***/ }),

/***/ "../src/sim/CombatSimulation.ts":
/*!**************************************!*\
  !*** ../src/sim/CombatSimulation.ts ***!
  \**************************************/
/*! exports provided: CombatSimulation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CombatSimulation", function() { return CombatSimulation; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var thenby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! thenby */ "../node_modules/thenby/thenBy.module.js");
/* harmony import */ var thenby__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(thenby__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _model_player_WizardFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/player/WizardFactory */ "../src/model/player/WizardFactory.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/Logger */ "../src/util/Logger.ts");
/* harmony import */ var _events_wizard_WizardEvent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./events/wizard/WizardEvent */ "../src/sim/events/wizard/WizardEvent.ts");
/* harmony import */ var _events_env_InitialEnemySpawnEvent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./events/env/InitialEnemySpawnEvent */ "../src/sim/events/env/InitialEnemySpawnEvent.ts");
/* harmony import */ var _events_env_EnemySpawnEvent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./events/env/EnemySpawnEvent */ "../src/sim/events/env/EnemySpawnEvent.ts");
/* harmony import */ var _events_env_EnvEvent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./events/env/EnvEvent */ "../src/sim/events/env/EnvEvent.ts");
/* harmony import */ var _events_env_EnemyDefeatEvent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./events/env/EnemyDefeatEvent */ "../src/sim/events/env/EnemyDefeatEvent.ts");
/* harmony import */ var _events_env_SecondEnemySpawnEvent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./events/env/SecondEnemySpawnEvent */ "../src/sim/events/env/SecondEnemySpawnEvent.ts");
/* harmony import */ var _model_player_SkillTree_SkillTree__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../model/player/SkillTree/SkillTree */ "../src/model/player/SkillTree/SkillTree.ts");
/* harmony import */ var _rules_RulesEngine__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../rules/RulesEngine */ "../src/rules/RulesEngine.ts");
/* harmony import */ var _events_env_WizardsOutOfTimeEvent__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./events/env/WizardsOutOfTimeEvent */ "../src/sim/events/env/WizardsOutOfTimeEvent.ts");
/* harmony import */ var _model_env_FortressRoom__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../model/env/FortressRoom */ "../src/model/env/FortressRoom.ts");
/* harmony import */ var _events_wizard_combat_CombatSpellCastEnemyEvent__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./events/wizard/combat/CombatSpellCastEnemyEvent */ "../src/sim/events/wizard/combat/CombatSpellCastEnemyEvent.ts");
/* harmony import */ var _events_wizard_room_spells_CooldownFinishedEvent__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./events/wizard/room/spells/CooldownFinishedEvent */ "../src/sim/events/wizard/room/spells/CooldownFinishedEvent.ts");
















var CombatSimulation = /** @class */ (function () {
    function CombatSimulation(params, rng) {
        var e_1, _a, e_2, _b;
        this.wizards = [];
        // For simulation results
        this.timeStart = -1;
        this.timeEnd = -1;
        this.nEventsProcessed = 0;
        this.isWin = null;
        this.timeStart = (new Date()).getTime();
        this.params = params;
        this.rng = rng;
        this.currentTime = 0;
        //this.events = new Map<number, Array<SimEvent>>();
        this.eventQueue = [];
        this.fortressRoom = new _model_env_FortressRoom__WEBPACK_IMPORTED_MODULE_13__["FortressRoom"](params, rng);
        var knockoutTime = this.fortressRoom.computeKnockoutTime();
        this.maxTime = this.fortressRoom.computeMaxtime() * 1000;
        for (var i = 0; i < params.nameClasses.length; i++) {
            var skillTree = _model_player_SkillTree_SkillTree__WEBPACK_IMPORTED_MODULE_10__["SkillTree"].fromPersisted(params.skillTrees[i]);
            var wizard = _model_player_WizardFactory__WEBPACK_IMPORTED_MODULE_2__["WizardFactory"].buildWizardWithSkillTree(skillTree, i, knockoutTime, params.potions[i]);
            this.wizards.push(wizard);
        }
        this.rulesEngines = [];
        if (params.ruleContainers === undefined) {
            try {
                for (var _c = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](params.nameClasses), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var nameClass = _d.value;
                    this.rulesEngines.push(_rules_RulesEngine__WEBPACK_IMPORTED_MODULE_11__["RulesEngine"].buildFromStandard(nameClass, rng));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            try {
                for (var _e = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](params.ruleContainers), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var ruleContainer = _f.value;
                    this.rulesEngines.push(new _rules_RulesEngine__WEBPACK_IMPORTED_MODULE_11__["RulesEngine"](ruleContainer, rng));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    CombatSimulation.prototype.init = function () {
        // Create initial events
        this.addEvent(new _events_env_InitialEnemySpawnEvent__WEBPACK_IMPORTED_MODULE_5__["InitialEnemySpawnEvent"](0));
        // Add one enemy per wizard initially
        for (var i = 0; i < this.wizards.length; i++) {
            this.addEvent(new _events_env_EnemySpawnEvent__WEBPACK_IMPORTED_MODULE_6__["EnemySpawnEvent"](0, this.fortressRoom.getNextActiveEnemy(i)));
        }
        // Add another enemy per wizard after 18s
        this.addEvent(new _events_env_SecondEnemySpawnEvent__WEBPACK_IMPORTED_MODULE_9__["SecondEnemySpawnEvent"]("secondEnemySpawnTime", 0));
        // Add another enemy per wizard after 34s
        this.addEvent(new _events_env_SecondEnemySpawnEvent__WEBPACK_IMPORTED_MODULE_9__["SecondEnemySpawnEvent"]("thirdEnemySpawnTime", 0));
        // Add out of time event
        this.addEvent(new _events_env_WizardsOutOfTimeEvent__WEBPACK_IMPORTED_MODULE_12__["WizardsOutOfTimeEvent"](this.maxTime));
    };
    CombatSimulation.prototype.log = function (verbosity, message) {
        _util_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].logT(verbosity, this.currentTime, message);
    };
    CombatSimulation.prototype.addEnemyToActive = function (enemy) {
        if (enemy.isActive === false) { // Perhaps enemy was already spawned earlier
            enemy.isActive = true;
            this.fortressRoom.addEnemyToActive(enemy);
        }
    };
    CombatSimulation.prototype.removeEnemyFromActive = function (enemy) {
        enemy.isActive = false;
        this.fortressRoom.removeEnemyFromActive(enemy);
    };
    //getRemainingInactiveEnemyCount(): number {
    //    return this.fortressRoom.getRemainingInactiveEnemyCount();
    //}
    //getAvailableEnemyCount(): number {
    //    return this.fortressRoom.enemiesActive.filter(e => e.isActive === true && e.inCombat === false).length;
    //}
    CombatSimulation.prototype.addEvent = function (newEvent) {
        var e_3, _a;
        if (this.currentTime > newEvent.timestampBegin) {
            throw new Error("Attempted to add event at eventTimestamp=" + newEvent.timestampBegin + " with currentTime=" + this.currentTime + ", " +
                newEvent.eventName);
        }
        // Stack based implementation: top of stack (=last element) is next event 
        // (FIFO queue)
        // event must be inserted at correct index
        var eventIndex = 0; // If no update, has soonest timestampEnd
        try {
            for (var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](this.eventQueue), _c = _b.next(); !_c.done; _c = _b.next()) {
                var event = _c.value;
                if (newEvent.timestampEnd < event.timestampEnd) {
                    eventIndex++;
                }
                else {
                    break;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this.log(2, "Adding event: " + newEvent.constructor.name + " with begin=" + newEvent.timestampBegin + ", end=" + newEvent.timestampEnd +
            " (" + newEvent.eventName + ")");
        this.eventQueue.splice(eventIndex, 0, newEvent);
        newEvent.onStart();
    };
    CombatSimulation.prototype.simulate = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var done, eventProcessed;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        done = false;
                        _a.label = 1;
                    case 1:
                        if (!(this.eventQueue.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.processNextEvent()];
                    case 2:
                        eventProcessed = _a.sent();
                        if (eventProcessed === false) {
                            this.log(2, "Simulation reached max time (" + this.maxTime / 1000 + "s). Wizard(s) were defeated!");
                            this.isWin = false;
                            this.emptyEventQueue();
                            this.wizards.forEach(function (wizard) {
                                if (wizard.getIsDefeated() === true) {
                                    wizard.timeSpentDefeated += _this.currentTime - wizard.timestampDefeated; // Need to add here because otherwise it would only be added on revive
                                }
                            });
                            return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 1];
                    case 3:
                        if (this.isWin === null) {
                            this.log(2, "All enemies have been defeated!");
                            this.isWin = true;
                        }
                        this.timeEnd = (new Date()).getTime();
                        this.log(2, "Simulation finished after " + (this.timeEnd - this.timeStart) + "ms.");
                        return [2 /*return*/];
                }
            });
        });
    };
    CombatSimulation.prototype.peekNextEvent = function () {
        return this.eventQueue[this.eventQueue.length - 1];
    };
    CombatSimulation.prototype.emptyEventQueue = function () {
        this.eventQueue.splice(0, this.eventQueue.length);
    };
    // Returns whether event was processed or not
    CombatSimulation.prototype.processNextEvent = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var currentEvent;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentEvent = this.eventQueue.pop();
                        if (this.currentTime > currentEvent.timestampEnd) {
                            throw new Error("Tried to go back in time! currentTime=" + this.currentTime + ", event.timestampEnd=" + currentEvent.timestampEnd);
                        }
                        this.currentTime = currentEvent.timestampEnd;
                        this.log(2, "Processing event: " + currentEvent.constructor.name);
                        return [4 /*yield*/, this.processEvent(currentEvent)];
                    case 1:
                        _a.sent();
                        this.nEventsProcessed++;
                        if (this.currentTime >= this.maxTime) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    // Event is always called at END of event (e.g. at END of animation)
    // timestampBegin of next event is equal to timestampEnd of this event
    CombatSimulation.prototype.processEvent = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var i;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.onFinish();
                        if (!(event instanceof _events_env_EnvEvent__WEBPACK_IMPORTED_MODULE_7__["EnvEvent"])) return [3 /*break*/, 11];
                        if (!(event instanceof _events_env_InitialEnemySpawnEvent__WEBPACK_IMPORTED_MODULE_5__["InitialEnemySpawnEvent"])) return [3 /*break*/, 2];
                        // Special case because all wizards are allowed to perform actions
                        return [4 /*yield*/, this.triggerIdleWizards()];
                    case 1:
                        // Special case because all wizards are allowed to perform actions
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 2:
                        if (!(event instanceof _events_env_SecondEnemySpawnEvent__WEBPACK_IMPORTED_MODULE_9__["SecondEnemySpawnEvent"])) return [3 /*break*/, 3];
                        // Enemies will continue spawning after 18s/34s
                        for (i = 0; i < this.wizards.length; i++) {
                            if (this.fortressRoom.hasNextActiveEnemy()) {
                                this.addEvent(new _events_env_EnemySpawnEvent__WEBPACK_IMPORTED_MODULE_6__["EnemySpawnEvent"](this.currentTime, this.fortressRoom.getNextActiveEnemy()));
                            }
                        }
                        return [3 /*break*/, 10];
                    case 3:
                        if (!(event instanceof _events_env_EnemySpawnEvent__WEBPACK_IMPORTED_MODULE_6__["EnemySpawnEvent"])) return [3 /*break*/, 6];
                        this.log(2, "Spawning enemy id=" + event.enemy.enemyIndex + " (" + event.enemy.nameUserFriendly + ")");
                        this.addEnemyToActive(event.enemy);
                        if (!(this.eventQueue.filter(function (e) { return e instanceof _events_env_InitialEnemySpawnEvent__WEBPACK_IMPORTED_MODULE_5__["InitialEnemySpawnEvent"]; }).length === 0)) return [3 /*break*/, 5];
                        // Only trigger idle wizards if no more initial enemy spawns in queue
                        return [4 /*yield*/, this.triggerIdleWizards()];
                    case 4:
                        // Only trigger idle wizards if no more initial enemy spawns in queue
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 10];
                    case 6:
                        if (!(event instanceof _events_env_EnemyDefeatEvent__WEBPACK_IMPORTED_MODULE_8__["EnemyDefeatEvent"])) return [3 /*break*/, 10];
                        this.removeEnemyFromActive(event.enemy);
                        this.rewardWizardFocus(event.enemy.focusReward);
                        if (!this.fortressRoom.hasNextActiveEnemy()) return [3 /*break*/, 7];
                        // In this case, the wizard should NOT be allowed a followup action, since he should wait for the spawn event
                        this.addEvent(new _events_env_EnemySpawnEvent__WEBPACK_IMPORTED_MODULE_6__["EnemySpawnEvent"](this.currentTime, this.fortressRoom.getNextActiveEnemy()));
                        return [3 /*break*/, 9];
                    case 7: 
                    // In this case, the wizard should be allowed a followup action, since there will be no new enemies after next event
                    return [4 /*yield*/, this.triggerIdleWizards()];
                    case 8:
                        // In this case, the wizard should be allowed a followup action, since there will be no new enemies after next event
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        if (this.checkForVictory() === true) {
                            this.emptyEventQueue();
                            return [2 /*return*/];
                        }
                        _a.label = 10;
                    case 10: return [2 /*return*/];
                    case 11:
                        if (!event.allowWizardFollowupAction()) return [3 /*break*/, 13];
                        // Wizard is allowed to perform action
                        return [4 /*yield*/, this.addNextWizardEvent(event.wizard)];
                    case 12:
                        // Wizard is allowed to perform action
                        _a.sent();
                        _a.label = 13;
                    case 13:
                        if (event.hasFollowupEvent()) {
                            this.addEvent(event.getFollowupEvent());
                        }
                        if (!(event instanceof _events_wizard_room_spells_CooldownFinishedEvent__WEBPACK_IMPORTED_MODULE_15__["CooldownFinishedEvent"])) return [3 /*break*/, 15];
                        // trigger this specific wizard
                        return [4 /*yield*/, this.triggerIdleWizard(event.getCaster())];
                    case 14:
                        // trigger this specific wizard
                        _a.sent();
                        _a.label = 15;
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    CombatSimulation.prototype.checkForVictory = function () {
        return this.fortressRoom.areAllEnemiesDefeated();
    };
    CombatSimulation.prototype.rewardWizardFocus = function (focus) {
        var e_4, _a;
        this.log(2, "Adding " + focus + " focus to all wizards.");
        try {
            for (var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](this.wizards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var wizard = _c.value;
                wizard.addFocus(focus);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
    };
    // Sometimes, wizards need to be retriggered
    // Those that are not in combat AND not defeated AND
    // do not have a "blocking" event waiting in the queue
    // (all events are generally blocking, except for spamming mending charm etc)
    CombatSimulation.prototype.isWizardIdle = function (wizard) {
        var e_5, _a;
        var hasBlockingEvent = false;
        try {
            for (var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](this.eventQueue), _c = _b.next(); !_c.done; _c = _b.next()) {
                var event = _c.value;
                if (event instanceof _events_wizard_WizardEvent__WEBPACK_IMPORTED_MODULE_4__["WizardEvent"]) {
                    if (event.wizard.playerIndex === wizard.playerIndex) {
                        //this.log(3, "Wizard id=" + wizard.playerIndex + " has blocking event: " + event.eventName);
                        hasBlockingEvent = true;
                    }
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return wizard.inCombat === false &&
            wizard.getIsDefeated() === false &&
            hasBlockingEvent === false;
    };
    CombatSimulation.prototype.triggerIdleWizards = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, _b, wizard, e_6_1;
            var e_6, _c;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, 6, 7]);
                        _a = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](this.wizards), _b = _a.next();
                        _d.label = 1;
                    case 1:
                        if (!!_b.done) return [3 /*break*/, 4];
                        wizard = _b.value;
                        /*if (this.isWizardIdle(wizard)) {
                            await this.addNextWizardEvent(wizard);
                        } */
                        return [4 /*yield*/, this.triggerIdleWizard(wizard)];
                    case 2:
                        /*if (this.isWizardIdle(wizard)) {
                            await this.addNextWizardEvent(wizard);
                        } */
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _b = _a.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_6_1 = _d.sent();
                        e_6 = { error: e_6_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_6) throw e_6.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    CombatSimulation.prototype.triggerIdleWizard = function (wizard) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isWizardIdle(wizard)) return [3 /*break*/, 2];
                        this.log(2, "Player id=" + wizard.playerIndex + " was idle and an action has been triggered.");
                        return [4 /*yield*/, this.addNextWizardEvent(wizard)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    CombatSimulation.prototype.getRulesEngine = function (playerIndex) {
        return this.rulesEngines[playerIndex];
    };
    // Priority based next action
    // Possible actions:
    // Outside combat: Drink potion, cast strategic spell, enter combat
    CombatSimulation.prototype.addNextWizardEvent = function (wizard) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var timestampBegin, potions, highestPriorityAvailableEnemy, facts, nextEvent, enemyAttackEvent;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timestampBegin = this.currentTime;
                        potions = this.params.potions[wizard.playerIndex];
                        highestPriorityAvailableEnemy = this.getHighestPriorityAvailableEnemy(wizard);
                        if (highestPriorityAvailableEnemy === undefined) {
                            highestPriorityAvailableEnemy = null;
                        }
                        facts = {
                            wizard: wizard,
                            highestPriorityAvailableEnemy: highestPriorityAvailableEnemy,
                            allWizards: this.wizards,
                            allActiveEnemies: this.fortressRoom.enemiesActive,
                            chamber: {
                                currentTimeSeconds: this.currentTime / 1000,
                                remainingTimeSeconds: (this.maxTime - this.currentTime) / 1000,
                                isAnyWizardDefeated: this.isAnyWizardDefeated(),
                                remainingEnemies: this.fortressRoom.getRemainingEnemiesCount(),
                                numberOfWizards: this.wizards.length
                            }
                        };
                        return [4 /*yield*/, this.getRulesEngine(wizard.playerIndex).getNextAction(timestampBegin, facts)];
                    case 1:
                        nextEvent = _a.sent();
                        if (nextEvent !== null) {
                            // event can be null, for example, if professor has not studied mending charm and no enemies available
                            this.addEvent(nextEvent);
                        }
                        else {
                            this.log(2, "Player id=" + wizard.playerIndex + " chose 'no action' as followup.");
                            if (wizard.inCombat === true) {
                                enemyAttackEvent = new _events_wizard_combat_CombatSpellCastEnemyEvent__WEBPACK_IMPORTED_MODULE_14__["CombatSpellCastEnemyEvent"](timestampBegin, wizard.inCombatWith, wizard, this.rng, true);
                                this.addEvent(enemyAttackEvent);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CombatSimulation.prototype.isAnyWizardDefeated = function () {
        var e_7, _a;
        try {
            for (var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](this.wizards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var wizard = _c.value;
                if (wizard.getIsDefeated()) {
                    return true;
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return false;
    };
    // Priority calculation:
    // is enemy in combat? 
    // am i proficient against enemy?
    // then by focus reward
    // for professor: pixie > werewolf
    //
    // Result: Highest priority will be at index=0
    CombatSimulation.prototype.sortEnemyTargetsByPriority = function (wizard, activeEnemies) {
        return activeEnemies.sort(Object(thenby__WEBPACK_IMPORTED_MODULE_1__["firstBy"])(function (v1, v2) { return v1.inCombat === v2.inCombat ? 0 : v1.inCombat ? 1 : -1; })
            .thenBy(function (v1, v2) { return wizard.isProficientAgainst(v1) === wizard.isProficientAgainst(v2) ? 0 : wizard.isProficientAgainst(v1) ? -1 : 1; })
            .thenBy(function (v1, v2) { return v2.focusReward - v1.focusReward; }));
    };
    CombatSimulation.prototype.getHighestPriorityAvailableEnemy = function (wizard) {
        var sortedActiveEnemies = this.sortEnemyTargetsByPriority(wizard, this.fortressRoom.enemiesActive.filter(function (enemy) { return enemy.inCombat === false; }));
        return sortedActiveEnemies[0];
    };
    CombatSimulation.prototype.isFinished = function () {
        return this.eventQueue.length === 0;
    };
    CombatSimulation.prototype.toSimulationResults = function () {
        var _this = this;
        if (this.isFinished() === false) {
            throw new Error("Simulation not finished yet!");
        }
        var challengeXPRewards = this.fortressRoom.computeChallengeXPRewards(this.isWin, this.params.useSponsoredFortressRewards);
        var wizardResults = this.wizards.map(function (wizard) {
            return {
                playerIndex: wizard.playerIndex,
                nameClass: wizard.nameClass,
                nameClassUserFriendly: wizard.nameClassUserFriendly,
                numberOfCasts: wizard.numberAttackCasts,
                numberOfDodgedCasts: wizard.numberDodgedCasts,
                numberOfCriticalCasts: wizard.numberCriticalCasts,
                totalDamage: wizard.totalDamage,
                averageDamage: wizard.totalDamage / wizard.numberAttackCasts,
                numberEnhancementsDuringAttacks: wizard.numberEnhancementsDuringAttacks,
                numberImpairmentsDuringAttacks: wizard.numberImpairmentsDuringAttacks,
                totalDamageReceived: wizard.totalDamageReceived,
                numberAttacksReceived: wizard.numberAttacksReceived,
                numberEnhancementsDuringAttacksReceived: wizard.numberEnhancementsDuringAttacksReceived,
                numberImpairmentsDuringAttacksReceived: wizard.numberImpairmentsDuringAttacksReceived,
                challengeXPReward: challengeXPRewards[wizard.playerIndex],
                runestoneLevel: _this.params.runestoneLevels[wizard.playerIndex],
                timeSpentDefeated: wizard.timeSpentDefeated,
                potionsAtBeginning: wizard.getPotionsAtBeginning(),
                potionsUsed: wizard.getPotionsUsed(),
                potionsUsedBrewTimeHours: wizard.getPotionsUsedBrewTime(false),
                potionsUsedBrewTimeHoursWithMasterNotes: wizard.getPotionsUsedBrewTime(true),
                hasDefenceCharm: wizard.hasDefenceCharm,
                defenceCharmValue: wizard.defenceCharmValue,
                hasProficiencyPowerCharm: wizard.hasProficiencyPowerCharm,
                proficiencyPowerCharmValue: wizard.proficiencyPowerCharmValue,
                hasBraveryCharm: wizard.hasBraveryCharm,
                braveryCharmValue: wizard.braveryCharmValue
            };
        });
        return {
            wallTimeStart: this.timeStart,
            wallTimeEnd: this.timeEnd,
            durationWallTimeMS: this.timeEnd - this.timeStart,
            durationGameTimeMS: this.currentTime,
            maxGameTimeMS: this.maxTime,
            nEvents: this.nEventsProcessed,
            isWin: this.isWin,
            simParameters: this.params,
            wizardResults: wizardResults,
            enemies: this.fortressRoom.enemiesAll,
            energyReward: this.fortressRoom.getEnergyReward(this.params.useSponsoredFortressRewards)
        };
    };
    return CombatSimulation;
}());



/***/ }),

/***/ "../src/sim/events/SimEvent.ts":
/*!*************************************!*\
  !*** ../src/sim/events/SimEvent.ts ***!
  \*************************************/
/*! exports provided: SimEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimEvent", function() { return SimEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _data_events_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/events.json */ "../src/data/events.json");
var _data_events_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../data/events.json */ "../src/data/events.json", 1);


var SimEvent = /** @class */ (function () {
    function SimEvent(eventName, timestampBegin, dynamicDuration) {
        this.eventName = eventName;
        this.timestampBegin = timestampBegin;
        if (dynamicDuration === undefined) {
            this.duration = _data_events_json__WEBPACK_IMPORTED_MODULE_1__[eventName];
        }
        else {
            this.duration = dynamicDuration;
        }
        this.timestampEnd = timestampBegin + this.duration;
    }
    SimEvent.prototype.onStart = function () {
    };
    SimEvent.prototype.onFinish = function () {
    };
    SimEvent.prototype.hasFollowupEvent = function () {
        return false;
    };
    SimEvent.prototype.getFollowupEvent = function () {
        throw new Error("Subclass should override this!");
    };
    return SimEvent;
}());



/***/ }),

/***/ "../src/sim/events/env/EnemyDefeatEvent.ts":
/*!*************************************************!*\
  !*** ../src/sim/events/env/EnemyDefeatEvent.ts ***!
  \*************************************************/
/*! exports provided: EnemyDefeatEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnemyDefeatEvent", function() { return EnemyDefeatEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _EnvEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EnvEvent */ "../src/sim/events/env/EnvEvent.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../util/Logger */ "../src/util/Logger.ts");



var EnemyDefeatEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EnemyDefeatEvent, _super);
    function EnemyDefeatEvent(eventTimestampBegin, enemy, wizard) {
        var _this = _super.call(this, "enemyDeathAnimation", eventTimestampBegin) || this;
        _this.enemy = enemy;
        _this.wizard = wizard;
        return _this;
    }
    EnemyDefeatEvent.prototype.allowWizardFollowupAction = function () {
        return false;
    };
    EnemyDefeatEvent.prototype.onFinish = function () {
        this.enemy.inCombat = false;
        this.enemy.inCombatWith = null;
        this.wizard.inCombat = false;
        this.wizard.inCombatWith = null;
        this.wizard.removePotionBuffs();
        var message = this.wizard.toUserFriendlyDescription() + " has defeated " + this.enemy.toUserFriendlyDescription() + "!";
        _util_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].logTUserFriendly(1, this.timestampEnd, message);
    };
    return EnemyDefeatEvent;
}(_EnvEvent__WEBPACK_IMPORTED_MODULE_1__["EnvEvent"]));



/***/ }),

/***/ "../src/sim/events/env/EnemySpawnEvent.ts":
/*!************************************************!*\
  !*** ../src/sim/events/env/EnemySpawnEvent.ts ***!
  \************************************************/
/*! exports provided: EnemySpawnEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnemySpawnEvent", function() { return EnemySpawnEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _EnvEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EnvEvent */ "../src/sim/events/env/EnvEvent.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../util/Logger */ "../src/util/Logger.ts");



var EnemySpawnEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EnemySpawnEvent, _super);
    function EnemySpawnEvent(timestampBegin, enemy) {
        var _this = _super.call(this, "enemySpawn", timestampBegin) || this;
        _this.enemy = enemy;
        return _this;
    }
    EnemySpawnEvent.prototype.allowWizardFollowupAction = function () {
        return false;
    };
    EnemySpawnEvent.prototype.hasFollowupEvent = function () {
        return false;
    };
    EnemySpawnEvent.prototype.onFinish = function () {
        _util_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].logTUserFriendly(1, this.timestampEnd, this.enemy.toUserFriendlyDescription() + " has spawned.");
    };
    return EnemySpawnEvent;
}(_EnvEvent__WEBPACK_IMPORTED_MODULE_1__["EnvEvent"]));



/***/ }),

/***/ "../src/sim/events/env/EnvEvent.ts":
/*!*****************************************!*\
  !*** ../src/sim/events/env/EnvEvent.ts ***!
  \*****************************************/
/*! exports provided: EnvEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnvEvent", function() { return EnvEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _SimEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SimEvent */ "../src/sim/events/SimEvent.ts");


var EnvEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EnvEvent, _super);
    function EnvEvent(eventName, eventTimestampBegin, dynamicDuration) {
        return _super.call(this, eventName, eventTimestampBegin, dynamicDuration) || this;
    }
    return EnvEvent;
}(_SimEvent__WEBPACK_IMPORTED_MODULE_1__["SimEvent"]));



/***/ }),

/***/ "../src/sim/events/env/InitialEnemySpawnEvent.ts":
/*!*******************************************************!*\
  !*** ../src/sim/events/env/InitialEnemySpawnEvent.ts ***!
  \*******************************************************/
/*! exports provided: InitialEnemySpawnEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InitialEnemySpawnEvent", function() { return InitialEnemySpawnEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _EnvEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EnvEvent */ "../src/sim/events/env/EnvEvent.ts");


var InitialEnemySpawnEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](InitialEnemySpawnEvent, _super);
    function InitialEnemySpawnEvent(eventTimestampBegin) {
        return _super.call(this, "initialEnemySpawnAnimation", eventTimestampBegin) || this;
    }
    InitialEnemySpawnEvent.prototype.allowWizardFollowupAction = function () {
        return false;
    };
    return InitialEnemySpawnEvent;
}(_EnvEvent__WEBPACK_IMPORTED_MODULE_1__["EnvEvent"]));



/***/ }),

/***/ "../src/sim/events/env/SecondEnemySpawnEvent.ts":
/*!******************************************************!*\
  !*** ../src/sim/events/env/SecondEnemySpawnEvent.ts ***!
  \******************************************************/
/*! exports provided: SecondEnemySpawnEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SecondEnemySpawnEvent", function() { return SecondEnemySpawnEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _EnvEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EnvEvent */ "../src/sim/events/env/EnvEvent.ts");


// After 18s/34s, another wave of enemies is spawned
var SecondEnemySpawnEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SecondEnemySpawnEvent, _super);
    function SecondEnemySpawnEvent(eventName, eventTimestampBegin) {
        return _super.call(this, eventName, eventTimestampBegin) || this;
    }
    SecondEnemySpawnEvent.prototype.allowWizardFollowupAction = function () {
        return false;
    };
    SecondEnemySpawnEvent.prototype.hasFollowupEvent = function () {
        return false;
    };
    return SecondEnemySpawnEvent;
}(_EnvEvent__WEBPACK_IMPORTED_MODULE_1__["EnvEvent"]));



/***/ }),

/***/ "../src/sim/events/env/WizardsOutOfTimeEvent.ts":
/*!******************************************************!*\
  !*** ../src/sim/events/env/WizardsOutOfTimeEvent.ts ***!
  \******************************************************/
/*! exports provided: WizardsOutOfTimeEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizardsOutOfTimeEvent", function() { return WizardsOutOfTimeEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _EnvEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EnvEvent */ "../src/sim/events/env/EnvEvent.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../util/Logger */ "../src/util/Logger.ts");



var WizardsOutOfTimeEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](WizardsOutOfTimeEvent, _super);
    function WizardsOutOfTimeEvent(maxTimeMS) {
        return _super.call(this, "dynamicDuration", 0, maxTimeMS) || this;
    }
    WizardsOutOfTimeEvent.prototype.allowWizardFollowupAction = function () {
        return false;
    };
    WizardsOutOfTimeEvent.prototype.onFinish = function () {
        _util_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].logTUserFriendly(1, this.timestampEnd, "Wizards have run out time and have been defeated!");
    };
    return WizardsOutOfTimeEvent;
}(_EnvEvent__WEBPACK_IMPORTED_MODULE_1__["EnvEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/WizardEvent.ts":
/*!***********************************************!*\
  !*** ../src/sim/events/wizard/WizardEvent.ts ***!
  \***********************************************/
/*! exports provided: WizardEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizardEvent", function() { return WizardEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _SimEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SimEvent */ "../src/sim/events/SimEvent.ts");


var WizardEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](WizardEvent, _super);
    function WizardEvent(eventName, timestampBegin, wizard, dynamicDuration) {
        var _this = _super.call(this, eventName, timestampBegin, dynamicDuration) || this;
        _this.wizard = wizard;
        return _this;
    }
    return WizardEvent;
}(_SimEvent__WEBPACK_IMPORTED_MODULE_1__["SimEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/combat/CombatBeginEvent.ts":
/*!***********************************************************!*\
  !*** ../src/sim/events/wizard/combat/CombatBeginEvent.ts ***!
  \***********************************************************/
/*! exports provided: CombatBeginEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CombatBeginEvent", function() { return CombatBeginEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _CombatEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CombatEvent */ "../src/sim/events/wizard/combat/CombatEvent.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../util/Logger */ "../src/util/Logger.ts");



var CombatBeginEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CombatBeginEvent, _super);
    function CombatBeginEvent(eventTimestampBegin, targetEnemy, wizard, rng) {
        var _this = this;
        var combatBeginAnimation_key = "combatBeginAnimation_" + targetEnemy.name;
        _this = _super.call(this, combatBeginAnimation_key, eventTimestampBegin, targetEnemy, wizard, rng) || this;
        return _this;
    }
    CombatBeginEvent.prototype.allowWizardFollowupAction = function () {
        return true;
    };
    CombatBeginEvent.prototype.onFinish = function () {
        this.enemy.refreshWizardPotionBuffs(this.wizard);
        _util_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].logTUserFriendly(1, this.timestampEnd, this.wizard.toUserFriendlyDescription() + " has begun combat with " +
            this.enemy.toUserFriendlyDescription() + ".");
    };
    return CombatBeginEvent;
}(_CombatEvent__WEBPACK_IMPORTED_MODULE_1__["CombatEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/combat/CombatEvent.ts":
/*!******************************************************!*\
  !*** ../src/sim/events/wizard/combat/CombatEvent.ts ***!
  \******************************************************/
/*! exports provided: CombatEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CombatEvent", function() { return CombatEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _WizardEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../WizardEvent */ "../src/sim/events/wizard/WizardEvent.ts");


var CombatEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CombatEvent, _super);
    function CombatEvent(eventName, timestampBegin, enemy, wizard, rng, dynamicDuration) {
        var _this = _super.call(this, eventName, timestampBegin, wizard, dynamicDuration) || this;
        _this.enemy = enemy;
        _this.rng = rng;
        return _this;
    }
    return CombatEvent;
}(_WizardEvent__WEBPACK_IMPORTED_MODULE_1__["WizardEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/combat/CombatSpellCastEnemyEvent.ts":
/*!********************************************************************!*\
  !*** ../src/sim/events/wizard/combat/CombatSpellCastEnemyEvent.ts ***!
  \********************************************************************/
/*! exports provided: CombatSpellCastEnemyEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CombatSpellCastEnemyEvent", function() { return CombatSpellCastEnemyEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _CombatEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CombatEvent */ "../src/sim/events/wizard/combat/CombatEvent.ts");
/* harmony import */ var _WizardDefeatEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WizardDefeatEvent */ "../src/sim/events/wizard/combat/WizardDefeatEvent.ts");
/* harmony import */ var _env_EnemyDefeatEvent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../env/EnemyDefeatEvent */ "../src/sim/events/env/EnemyDefeatEvent.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../util/Logger */ "../src/util/Logger.ts");





var CombatSpellCastEnemyEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CombatSpellCastEnemyEvent, _super);
    // wizardActionTimeout: Did the wizard perform an action or is this attack because of a timeout?
    function CombatSpellCastEnemyEvent(eventTimestampBegin, targetEnemy, wizard, rng, wizardActionTimeout) {
        var _this = _super.call(this, wizardActionTimeout ? "spellCast_enemy_after_no_wizard_action" : "spellCast_enemy", eventTimestampBegin, targetEnemy, wizard, rng) || this;
        _this.probabilityChainAttackEnemy = -1;
        _this.isChainAttack = _this.probabilityChainAttackEnemy >= _this.rng.next();
        return _this;
    }
    // If the enemy is doing a chain attack:
    // Wizard is not allowed an action
    // If enemy is not doing a chain attack: 
    // Wizard is allowed an action
    CombatSpellCastEnemyEvent.prototype.allowWizardFollowupAction = function () {
        return this.isChainAttack === false && this.wizard.getIsDefeated() === false && this.enemy.getIsDefeated() === false;
    };
    // Opposite of whether wizard is allowed an action
    CombatSpellCastEnemyEvent.prototype.hasFollowupEvent = function () {
        return !this.allowWizardFollowupAction();
    };
    CombatSpellCastEnemyEvent.prototype.getFollowupEvent = function () {
        if (this.wizard.getIsDefeated()) {
            return new _WizardDefeatEvent__WEBPACK_IMPORTED_MODULE_2__["WizardDefeatEvent"](this.timestampEnd, this.enemy, this.wizard, this.rng);
        }
        else if (this.enemy.getIsDefeated() === true) {
            return new _env_EnemyDefeatEvent__WEBPACK_IMPORTED_MODULE_3__["EnemyDefeatEvent"](this.timestampEnd, this.enemy, this.wizard);
        }
        else {
            // Else this is a chain attack
            return new CombatSpellCastEnemyEvent(this.timestampEnd, this.enemy, this.wizard, this.rng);
        }
    };
    CombatSpellCastEnemyEvent.prototype.onFinish = function () {
        var damage = CombatSpellCastEnemyEvent.computeEnemyDamage(this.wizard, this.enemy, 1);
        var enemyStaminaBeforeDamage = this.enemy.getCurrentStamina();
        if (this.enemy.hasDeteriorationHex) {
            this.enemy.removeStamina(this.enemy.deteriorationHexDamage);
        }
        var staminaBeforeDamage = this.wizard.getCurrentStamina();
        this.wizard.removeStamina(damage);
        this.wizard.receiveAttack(damage, this.enemy);
        var message = this.enemy.toUserFriendlyDescription() + " dealt " + damage +
            " damage to " + this.wizard.toUserFriendlyDescription() + " (" +
            staminaBeforeDamage + "/" + this.wizard.getMaxStamina() + " -> " +
            this.wizard.getCurrentStamina() + "/" + this.wizard.getMaxStamina() + ")";
        if (this.enemy.hasDeteriorationHex) {
            message += " and takes " + (enemyStaminaBeforeDamage - this.enemy.getCurrentStamina()) + " damage from hex " +
                " (" + enemyStaminaBeforeDamage + "/" + this.enemy.getMaxStamina() + " -> " +
                this.enemy.getCurrentStamina() + "/" + this.enemy.getMaxStamina() + ")";
        }
        _util_Logger__WEBPACK_IMPORTED_MODULE_4__["Logger"].logT(2, this.timestampEnd, message);
        _util_Logger__WEBPACK_IMPORTED_MODULE_4__["Logger"].logTUserFriendly(2, this.timestampEnd, message);
    };
    // How much damage will enemy deal to wizard?
    // EnemyDmg=Ceiling{Enemy_Power∗
    //(1+(Enemy_IsProficient∗Max[0,(Enemy_ProficiencyPow−DeficiencyDef)]))∗
    //(1−Range[0−100%,(Defence−Enemy_DefenceBreach)])∗
    //(1−(IsProtego∗ProtegoPower))}
    CombatSpellCastEnemyEvent.computeEnemyDamage = function (wizard, enemy, isProtego) {
        var isProficient = (enemy.isProficientAgainst(wizard)) ? 1 : 0;
        var result = enemy.getPowerAfterModifications() *
            (1 + isProficient * Math.max(0, enemy.getProficiencyPowerAfterModifications() - wizard.getDeficiencyDefenceAfterModifications())) *
            (1 - Math.min(1, Math.max(0, wizard.getDefenceAfterModifications(enemy) - enemy.getDefenceBreachAfterModifications())));
        //console.log("power after modifications=" + enemy.getPowerAfterModifications() + ", defence after modifications=" + wizard.getDefenceAfterModifications() + ", defence breach="  + enemy.getDefenceBreachAfterModifications());
        //console.log("result without protego="  + result);
        result *= (1 - (isProtego * wizard.getProtegoPowerAfterModifications(enemy)));
        //console.log("result with protego=" + result);
        return Math.ceil(result);
    };
    return CombatSpellCastEnemyEvent;
}(_CombatEvent__WEBPACK_IMPORTED_MODULE_1__["CombatEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/combat/CombatSpellCastWizardEvent.ts":
/*!*********************************************************************!*\
  !*** ../src/sim/events/wizard/combat/CombatSpellCastWizardEvent.ts ***!
  \*********************************************************************/
/*! exports provided: CombatSpellCastWizardEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CombatSpellCastWizardEvent", function() { return CombatSpellCastWizardEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _CombatEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CombatEvent */ "../src/sim/events/wizard/combat/CombatEvent.ts");
/* harmony import */ var _CombatSpellCastEnemyEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CombatSpellCastEnemyEvent */ "../src/sim/events/wizard/combat/CombatSpellCastEnemyEvent.ts");
/* harmony import */ var _env_EnemyDefeatEvent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../env/EnemyDefeatEvent */ "../src/sim/events/env/EnemyDefeatEvent.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../util/Logger */ "../src/util/Logger.ts");





var CombatSpellCastWizardEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CombatSpellCastWizardEvent, _super);
    function CombatSpellCastWizardEvent(eventTimestampBegin, targetEnemy, wizard, rng) {
        var _this = _super.call(this, "spellCast_wizard", eventTimestampBegin, targetEnemy, wizard, rng) || this;
        _this.probabilityChainAttackWizard = -1;
        _this.isChainAttack = _this.probabilityChainAttackWizard >= _this.rng.next();
        return _this;
    }
    CombatSpellCastWizardEvent.prototype.allowWizardFollowupAction = function () {
        return this.isChainAttack && this.enemy.getIsDefeated() === false;
    };
    CombatSpellCastWizardEvent.prototype.hasFollowupEvent = function () {
        return !this.allowWizardFollowupAction();
    };
    // Is called after onFinish
    CombatSpellCastWizardEvent.prototype.getFollowupEvent = function () {
        if (this.enemy.getIsDefeated() === false) {
            return new _CombatSpellCastEnemyEvent__WEBPACK_IMPORTED_MODULE_2__["CombatSpellCastEnemyEvent"](this.timestampEnd, this.enemy, this.wizard, this.rng);
        }
        else {
            return new _env_EnemyDefeatEvent__WEBPACK_IMPORTED_MODULE_3__["EnemyDefeatEvent"](this.timestampEnd, this.enemy, this.wizard);
        }
    };
    CombatSpellCastWizardEvent.prototype.onFinish = function () {
        var isCritical = 0;
        var rngResult = this.rng.next();
        var isDodge = this.enemy.getDodgeAfterModifications(this.wizard) -
            this.wizard.getAccuracyAfterModifications(this.enemy) >=
            rngResult;
        //console.log("isDodge=" + isDodge + ", dodgeChance=" + this.enemy.getDodgeAfterModifications(this.wizard) + ", rngResult=" + rngResult);
        var damage = 0;
        if (isDodge === false) {
            var rngResult_1 = this.rng.next();
            isCritical = (this.wizard.getCritChanceAfterModifications(this.enemy) >= rngResult_1) ? 1 : 0;
            //console.log("isCritical=" + isCritical + ", critChance=" + this.wizard.getCritChanceAfterModifications(this.enemy) + ", rngResult=" + rngResult);
            damage = CombatSpellCastWizardEvent.computeWizardDamage(this.wizard, this.enemy, isCritical);
        }
        else {
            _util_Logger__WEBPACK_IMPORTED_MODULE_4__["Logger"].logT(2, this.timestampEnd, "Enemy id=" + this.enemy.enemyIndex + " dodged attack by wizard id=" + this.wizard.playerIndex + "!");
        }
        if (this.enemy.hasDeteriorationHex) {
            damage += this.enemy.deteriorationHexDamage;
        }
        var staminaBeforeDamage = this.enemy.getCurrentStamina();
        this.enemy.removeStamina(damage);
        this.wizard.performAttackCast(damage, isCritical === 1, isDodge, this.enemy); // Reduce exstimulo, wit sharpening and for stats
        var critString = isCritical === 1 ? " (crit) " : " ";
        var message = this.wizard.toUserFriendlyDescription() + " dealt " + damage +
            " damage" + critString + " to " + this.enemy.toUserFriendlyDescription() + ". (" +
            staminaBeforeDamage + "/" + this.enemy.getMaxStamina() + " -> " +
            this.enemy.getCurrentStamina() + "/" + this.enemy.getMaxStamina() + ")";
        _util_Logger__WEBPACK_IMPORTED_MODULE_4__["Logger"].logT(2, this.timestampEnd, message);
        _util_Logger__WEBPACK_IMPORTED_MODULE_4__["Logger"].logTUserFriendly(2, this.timestampEnd, message);
    };
    // Sources: 
    // https://www.reddit.com/r/harrypotterwu/comments/csgsdd/all_about_combat_damage_what_i_know_or_i_think_i/?st=k0b2etkb&sh=2c084fce
    // https://docs.google.com/spreadsheets/d/1Y-D5C3zqCr9NGDjXCTJ83K8nU7Gje98D59-06zF-riw/edit#gid=1951249859
    // https://wizardsunite.gamepress.gg/guide/combat-damage-formula
    //Dmg=Ceiling{(Power)∗
    //    (1+(IsProficient∗Max[0,(ProficiencyPower−Enemy_DeficiencyDefence)]))∗
    //    (1−Range[0−100%,(Enemy_Defence−DefenceBreach)])∗
    //    (1+(IsCritical∗CriticalPower))}
    CombatSpellCastWizardEvent.computeWizardDamage = function (wizard, enemy, isCritical) {
        var isProficient = (wizard.isProficientAgainst(enemy)) ? 1 : 0;
        var damageBuffs = wizard.getDamageBuffMultiplier(enemy);
        var defenceMultiplier = this.computeDefenceMultiplier(wizard, enemy);
        var result = wizard.getPowerAfterModifications(enemy) * // Power
            (1 + (isProficient * Math.max(0, wizard.getProficiencyPowerAfterModifications() - enemy.getDeficiencyDefenceAfterModifications()))); // Proficiency / deficiency
        //console.log("Wizard damage before defence: " + result);
        result *=
            defenceMultiplier *
                (1 + (isCritical * wizard.getCriticalPowerAfterModifications(enemy))) *
                damageBuffs;
        //console.log("Wizard damage after defence: " + result + ", enemy has defenceMultiplier=" + defenceMultiplier);
        return Math.ceil(result);
    };
    CombatSpellCastWizardEvent.computeDefenceMultiplier = function (wizard, enemy) {
        return (1 - Math.min(1, Math.max(0, enemy.getDefenceAfterModifications() - wizard.getDefenceBreachAfterModifications(enemy))));
    };
    return CombatSpellCastWizardEvent;
}(_CombatEvent__WEBPACK_IMPORTED_MODULE_1__["CombatEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/combat/CombatSpellCircleEvent.ts":
/*!*****************************************************************!*\
  !*** ../src/sim/events/wizard/combat/CombatSpellCircleEvent.ts ***!
  \*****************************************************************/
/*! exports provided: CombatSpellCircleEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CombatSpellCircleEvent", function() { return CombatSpellCircleEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _CombatEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CombatEvent */ "../src/sim/events/wizard/combat/CombatEvent.ts");
/* harmony import */ var _CombatSpellTraceEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CombatSpellTraceEvent */ "../src/sim/events/wizard/combat/CombatSpellTraceEvent.ts");



var CombatSpellCircleEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CombatSpellCircleEvent, _super);
    function CombatSpellCircleEvent(eventTimestampBegin, targetEnemy, wizard, rng) {
        var _this = this;
        var spellCircle_key = "spellCircle_" + targetEnemy.name;
        _this = _super.call(this, spellCircle_key, eventTimestampBegin, targetEnemy, wizard, rng) || this;
        return _this;
    }
    CombatSpellCircleEvent.prototype.allowWizardFollowupAction = function () {
        return false;
    };
    CombatSpellCircleEvent.prototype.hasFollowupEvent = function () {
        return true;
    };
    CombatSpellCircleEvent.prototype.getFollowupEvent = function () {
        return new _CombatSpellTraceEvent__WEBPACK_IMPORTED_MODULE_2__["CombatSpellTraceEvent"](this.timestampEnd, this.enemy, this.wizard, this.rng);
    };
    return CombatSpellCircleEvent;
}(_CombatEvent__WEBPACK_IMPORTED_MODULE_1__["CombatEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/combat/CombatSpellTraceEvent.ts":
/*!****************************************************************!*\
  !*** ../src/sim/events/wizard/combat/CombatSpellTraceEvent.ts ***!
  \****************************************************************/
/*! exports provided: CombatSpellTraceEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CombatSpellTraceEvent", function() { return CombatSpellTraceEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _CombatEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CombatEvent */ "../src/sim/events/wizard/combat/CombatEvent.ts");
/* harmony import */ var _CombatSpellCastWizardEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CombatSpellCastWizardEvent */ "../src/sim/events/wizard/combat/CombatSpellCastWizardEvent.ts");



var CombatSpellTraceEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CombatSpellTraceEvent, _super);
    function CombatSpellTraceEvent(eventTimestampBegin, targetEnemy, wizard, rng) {
        return _super.call(this, "spellTrace", eventTimestampBegin, targetEnemy, wizard, rng) || this;
    }
    CombatSpellTraceEvent.prototype.allowWizardFollowupAction = function () {
        return false;
    };
    CombatSpellTraceEvent.prototype.hasFollowupEvent = function () {
        return true;
    };
    CombatSpellTraceEvent.prototype.getFollowupEvent = function () {
        return new _CombatSpellCastWizardEvent__WEBPACK_IMPORTED_MODULE_2__["CombatSpellCastWizardEvent"](this.timestampEnd, this.enemy, this.wizard, this.rng);
    };
    return CombatSpellTraceEvent;
}(_CombatEvent__WEBPACK_IMPORTED_MODULE_1__["CombatEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/combat/EnterCombatEvent.ts":
/*!***********************************************************!*\
  !*** ../src/sim/events/wizard/combat/EnterCombatEvent.ts ***!
  \***********************************************************/
/*! exports provided: EnterCombatEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnterCombatEvent", function() { return EnterCombatEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _CombatEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CombatEvent */ "../src/sim/events/wizard/combat/CombatEvent.ts");
/* harmony import */ var _CombatBeginEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CombatBeginEvent */ "../src/sim/events/wizard/combat/CombatBeginEvent.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../util/Logger */ "../src/util/Logger.ts");




var EnterCombatEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EnterCombatEvent, _super);
    function EnterCombatEvent(timestampBegin, enemy, wizard, rng) {
        return _super.call(this, "enterCombat", timestampBegin, enemy, wizard, rng) || this;
    }
    EnterCombatEvent.prototype.onStart = function () {
        _util_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].logT(2, this.timestampBegin, "EnterCombatEvent.onStart: Wizard (id=" + this.wizard.playerIndex + ") and enemy (id=" + this.enemy.enemyIndex + ") are entering combat");
        if (this.enemy.inCombat === true) {
            throw new Error("Wizard id=" + this.wizard.playerIndex + " tried entering combat with enemy id=" +
                this.enemy.enemyIndex + ", but enemy was already in combat!");
        }
        this.wizard.inCombat = true;
        this.wizard.inCombatWith = this.enemy;
        this.enemy.inCombat = true;
        this.enemy.inCombatWith = this.wizard;
    };
    EnterCombatEvent.prototype.hasFollowupEvent = function () {
        return true;
    };
    EnterCombatEvent.prototype.getFollowupEvent = function () {
        return new _CombatBeginEvent__WEBPACK_IMPORTED_MODULE_2__["CombatBeginEvent"](this.timestampEnd, this.enemy, this.wizard, this.rng);
    };
    EnterCombatEvent.prototype.allowWizardFollowupAction = function () {
        return false;
    };
    return EnterCombatEvent;
}(_CombatEvent__WEBPACK_IMPORTED_MODULE_1__["CombatEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/combat/ExitCombatEvent.ts":
/*!**********************************************************!*\
  !*** ../src/sim/events/wizard/combat/ExitCombatEvent.ts ***!
  \**********************************************************/
/*! exports provided: ExitCombatEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExitCombatEvent", function() { return ExitCombatEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _CombatEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CombatEvent */ "../src/sim/events/wizard/combat/CombatEvent.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../util/Logger */ "../src/util/Logger.ts");



var ExitCombatEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ExitCombatEvent, _super);
    function ExitCombatEvent(timestampBegin, enemy, wizard, rng) {
        return _super.call(this, "exitCombat", timestampBegin, enemy, wizard, rng) || this;
    }
    ExitCombatEvent.prototype.allowWizardFollowupAction = function () {
        return true;
    };
    ExitCombatEvent.prototype.onFinish = function () {
        this.wizard.removePotionBuffs();
        this.enemy.inCombat = false;
        this.enemy.inCombatWith = null;
        this.wizard.inCombat = false;
        this.wizard.inCombatWith = null;
        _util_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].logTUserFriendly(1, this.timestampEnd, this.wizard.toUserFriendlyDescription() + " has exited combat with " +
            this.enemy.toUserFriendlyDescription() + ".");
    };
    return ExitCombatEvent;
}(_CombatEvent__WEBPACK_IMPORTED_MODULE_1__["CombatEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/combat/WizardDefeatEvent.ts":
/*!************************************************************!*\
  !*** ../src/sim/events/wizard/combat/WizardDefeatEvent.ts ***!
  \************************************************************/
/*! exports provided: WizardDefeatEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizardDefeatEvent", function() { return WizardDefeatEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _CombatEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CombatEvent */ "../src/sim/events/wizard/combat/CombatEvent.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../util/Logger */ "../src/util/Logger.ts");



var WizardDefeatEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](WizardDefeatEvent, _super);
    function WizardDefeatEvent(timestampBegin, enemy, wizard, rng) {
        var _this = _super.call(this, "dynamicDuration", timestampBegin, enemy, wizard, rng, wizard.knockoutTime) || this;
        // Used to disallow followup action if wizard was revived using revive charm
        _this.revivedAfterThisEvent = false;
        _this.subclassWizard = wizard;
        return _this;
    }
    WizardDefeatEvent.prototype.onStart = function () {
        this.wizard.removePotionBuffs();
        this.enemy.inCombat = false;
        this.enemy.inCombatWith = null;
        this.wizard.inCombat = false;
        this.wizard.inCombatWith = null;
        this.wizard.timestampDefeated = this.timestampBegin;
        _util_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].logTUserFriendly(1, this.timestampBegin, this.wizard.toUserFriendlyDescription() + " has been defeated.");
    };
    WizardDefeatEvent.prototype.onFinish = function () {
        if (this.wizard.getIsDefeated() === true) {
            this.wizard.revive(this.timestampEnd);
            this.revivedAfterThisEvent = true;
            _util_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].logTUserFriendly(1, this.timestampEnd, this.wizard.toUserFriendlyDescription() + " has been revived!");
        }
    };
    WizardDefeatEvent.prototype.allowWizardFollowupAction = function () {
        if (this.revivedAfterThisEvent === true) {
            return true;
        }
        return false;
    };
    return WizardDefeatEvent;
}(_CombatEvent__WEBPACK_IMPORTED_MODULE_1__["CombatEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/potions/ExstimuloPotionEvent.ts":
/*!****************************************************************!*\
  !*** ../src/sim/events/wizard/potions/ExstimuloPotionEvent.ts ***!
  \****************************************************************/
/*! exports provided: ExstimuloPotionEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExstimuloPotionEvent", function() { return ExstimuloPotionEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _PotionEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PotionEvent */ "../src/sim/events/wizard/potions/PotionEvent.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../util/Logger */ "../src/util/Logger.ts");



var ExstimuloPotionEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ExstimuloPotionEvent, _super);
    function ExstimuloPotionEvent(timestampBegin, wizard, enemy, potionAvailability, damageBuff, uses, potionName) {
        var _this = _super.call(this, timestampBegin, wizard, potionAvailability) || this;
        _this.enemy = enemy;
        _this.damageBuff = damageBuff;
        _this.uses = uses;
        _this.potionName = potionName;
        if ((potionName === "normal" && potionAvailability.nExstimuloAvailable === 0) ||
            (potionName === "strong" && potionAvailability.nStrongExstimuloAvailable === 0) ||
            (potionName === "potent" && potionAvailability.nPotentExstimuloAvailable === 0)) {
            throw new Error("Tried drinking exstimulo potion with name=" + potionName + " but none available by wizard id=" + wizard.playerIndex + "!");
        }
        return _this;
    }
    ExstimuloPotionEvent.prototype.onFinish = function () {
        _super.prototype.onFinish.call(this);
        // Check if stronger or existing version already active
        if (this.enemy.getExstimuloDamageBuff(this.wizard.playerIndex) >= this.damageBuff) {
            _util_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].logT(2, this.timestampBegin, "ExstimuloPotionEvent: wizard id=" + this.wizard.playerIndex + " tried drinking exstimulo potion but version already active!");
            return;
        }
        this.enemy.applyExstimuloPotion(this.wizard, this.uses, this.damageBuff);
        if (this.potionName === "normal")
            this.potions.nExstimuloAvailable--;
        else if (this.potionName === "strong")
            this.potions.nStrongExstimuloAvailable--;
        else if (this.potionName === "potent")
            this.potions.nPotentExstimuloAvailable--;
    };
    ExstimuloPotionEvent.prototype.getPotionName = function () {
        return this.potionName.charAt(0).toUpperCase() + this.potionName.substr(1) + " Exstimulo Potion";
    };
    return ExstimuloPotionEvent;
}(_PotionEvent__WEBPACK_IMPORTED_MODULE_1__["PotionEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/potions/HealthPotionEvent.ts":
/*!*************************************************************!*\
  !*** ../src/sim/events/wizard/potions/HealthPotionEvent.ts ***!
  \*************************************************************/
/*! exports provided: HealthPotionEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HealthPotionEvent", function() { return HealthPotionEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _PotionEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PotionEvent */ "../src/sim/events/wizard/potions/PotionEvent.ts");


var HealthPotionEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](HealthPotionEvent, _super);
    function HealthPotionEvent(timestampBegin, wizard, potionAvailability, staminaRestorePercent) {
        var _this = _super.call(this, timestampBegin, wizard, potionAvailability) || this;
        _this.staminaRestorePercent = staminaRestorePercent;
        if (potionAvailability.nHealingPotionsAvailable === 0) {
            throw new Error("Wizard id=" + wizard.playerIndex + " tried to drink a health potion but has none available!");
        }
        return _this;
    }
    HealthPotionEvent.prototype.onFinish = function () {
        _super.prototype.onFinish.call(this);
        this.wizard.addStaminaPercent(this.staminaRestorePercent);
        this.potions.nHealingPotionsAvailable--;
    };
    HealthPotionEvent.prototype.getPotionName = function () {
        return "Health Potion (+" +
            Math.ceil(this.wizard.getMaxStamina() * this.staminaRestorePercent) + "hp)";
    };
    return HealthPotionEvent;
}(_PotionEvent__WEBPACK_IMPORTED_MODULE_1__["PotionEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/potions/InvigorationPotionEvent.ts":
/*!*******************************************************************!*\
  !*** ../src/sim/events/wizard/potions/InvigorationPotionEvent.ts ***!
  \*******************************************************************/
/*! exports provided: InvigorationPotionEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvigorationPotionEvent", function() { return InvigorationPotionEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _PotionEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PotionEvent */ "../src/sim/events/wizard/potions/PotionEvent.ts");


var InvigorationPotionEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](InvigorationPotionEvent, _super);
    function InvigorationPotionEvent(timestampBegin, wizard, potionAvailability, focusReward, potionName) {
        var _this = _super.call(this, timestampBegin, wizard, potionAvailability) || this;
        _this.focusReward = focusReward;
        _this.potionName = potionName;
        if ((_this.potionName === "weak" && potionAvailability.nWeakInvigorationAvailable === 0) ||
            (_this.potionName === "strong" && potionAvailability.nStrongInvigorationAvailable === 0)) {
            throw new Error("Tried drinking exstimulo potion with name=" + potionName + " but none available by wizard id=" + wizard.playerIndex + "!");
        }
        return _this;
    }
    InvigorationPotionEvent.prototype.onFinish = function () {
        _super.prototype.onFinish.call(this);
        this.wizard.addFocus(this.focusReward);
        if (this.potionName === "weak")
            this.potions.nWeakInvigorationAvailable--;
        else if (this.potionName === "strong")
            this.potions.nStrongInvigorationAvailable--;
    };
    InvigorationPotionEvent.prototype.getPotionName = function () {
        return this.potionName.charAt(0).toUpperCase() + this.potionName.substr(1) + " Invigoration" +
            " (" + this.wizard.getFocus() + "/" + this.wizard.stats.maxFocus + " -> " +
            Math.min(this.wizard.getFocus() + this.focusReward, this.wizard.stats.maxFocus) + "/" + this.wizard.stats.maxFocus +
            " focus)";
    };
    return InvigorationPotionEvent;
}(_PotionEvent__WEBPACK_IMPORTED_MODULE_1__["PotionEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/potions/PotionEvent.ts":
/*!*******************************************************!*\
  !*** ../src/sim/events/wizard/potions/PotionEvent.ts ***!
  \*******************************************************/
/*! exports provided: PotionEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PotionEvent", function() { return PotionEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _WizardEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../WizardEvent */ "../src/sim/events/wizard/WizardEvent.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../util/Logger */ "../src/util/Logger.ts");



var PotionEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PotionEvent, _super);
    function PotionEvent(eventTimestampBegin, wizard, potionAvailability) {
        var _this = _super.call(this, "potionMenuAndSelectAndDrink", eventTimestampBegin, wizard) || this;
        _this.potions = potionAvailability;
        return _this;
    }
    PotionEvent.prototype.allowWizardFollowupAction = function () {
        return true;
    };
    PotionEvent.prototype.onFinish = function () {
        _util_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].logTUserFriendly(2, this.timestampEnd, this.wizard.toUserFriendlyDescription() + " drank: " + this.getPotionName());
    };
    return PotionEvent;
}(_WizardEvent__WEBPACK_IMPORTED_MODULE_1__["WizardEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/potions/WitSharpeningPotionEvent.ts":
/*!********************************************************************!*\
  !*** ../src/sim/events/wizard/potions/WitSharpeningPotionEvent.ts ***!
  \********************************************************************/
/*! exports provided: WitSharpeningPotionEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WitSharpeningPotionEvent", function() { return WitSharpeningPotionEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _PotionEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PotionEvent */ "../src/sim/events/wizard/potions/PotionEvent.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../util/Logger */ "../src/util/Logger.ts");



var WitSharpeningPotionEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](WitSharpeningPotionEvent, _super);
    function WitSharpeningPotionEvent(timestampBegin, wizard, enemy, damageBuff, uses, potions) {
        var _this = _super.call(this, timestampBegin, wizard, potions) || this;
        _this.enemy = enemy;
        _this.damageBuff = damageBuff;
        _this.uses = uses;
        if (potions.nWitSharpeningAvailable === 0) {
            throw new Error("Tried drinking wit sharpening potion but none available by wizard id=" + wizard.playerIndex + "!");
        }
        return _this;
    }
    WitSharpeningPotionEvent.prototype.onFinish = function () {
        _super.prototype.onFinish.call(this);
        if (this.enemy.getWitSharpeningDamageBuff(this.wizard.playerIndex) >= this.damageBuff) {
            _util_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].logT(2, this.timestampBegin, "WitSharpeningPotionEvent: wizard id=" + this.wizard.playerIndex + " tried drinking WitSharpeningPotion but version already active!");
            return;
        }
        if (this.enemy.isElite === false) {
            _util_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].logT(2, this.timestampBegin, "WitSharpeningPotionEvent: wizard id=" + this.wizard.playerIndex + " tried drinking WitSharpeningPotion but enemy is not elite!");
            return;
        }
        this.enemy.applyWitSharpeningPotion(this.wizard, this.uses, this.damageBuff);
        this.potions.nWitSharpeningAvailable--;
    };
    WitSharpeningPotionEvent.prototype.getPotionName = function () {
        return "Wit Sharpening";
    };
    return WitSharpeningPotionEvent;
}(_PotionEvent__WEBPACK_IMPORTED_MODULE_1__["PotionEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/room/WizardReviveEvent.ts":
/*!**********************************************************!*\
  !*** ../src/sim/events/wizard/room/WizardReviveEvent.ts ***!
  \**********************************************************/
/*! exports provided: WizardReviveEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizardReviveEvent", function() { return WizardReviveEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _WizardEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../WizardEvent */ "../src/sim/events/wizard/WizardEvent.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../util/Logger */ "../src/util/Logger.ts");



/**
 * Used ONLY for ReviveCharm of magizoologist (is used as followup event)
 */
var WizardReviveEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](WizardReviveEvent, _super);
    function WizardReviveEvent(timestampBegin, targetWizard) {
        var _this = _super.call(this, "wizardSpawnAfterReviveCharm", timestampBegin, targetWizard) || this;
        _this.revivedAfterThisEvent = false;
        return _this;
    }
    WizardReviveEvent.prototype.onFinish = function () {
        if (this.wizard.getIsDefeated() === true) {
            this.wizard.revive(this.timestampEnd);
            this.revivedAfterThisEvent = true;
        }
        _util_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].logTUserFriendly(1, this.timestampEnd, this.wizard.toUserFriendlyDescription() + " has been revived!");
    };
    WizardReviveEvent.prototype.allowWizardFollowupAction = function () {
        if (this.revivedAfterThisEvent === true) {
            return true;
        }
        return false;
    };
    return WizardReviveEvent;
}(_WizardEvent__WEBPACK_IMPORTED_MODULE_1__["WizardEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/room/spells/CooldownFinishedEvent.ts":
/*!*********************************************************************!*\
  !*** ../src/sim/events/wizard/room/spells/CooldownFinishedEvent.ts ***!
  \*********************************************************************/
/*! exports provided: CooldownFinishedEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CooldownFinishedEvent", function() { return CooldownFinishedEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../util/Logger */ "../src/util/Logger.ts");
/* harmony import */ var _SimEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../SimEvent */ "../src/sim/events/SimEvent.ts");



var CooldownFinishedEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CooldownFinishedEvent, _super);
    function CooldownFinishedEvent(timestampBegin, duration, caster) {
        var _this = _super.call(this, "dynamicDuration", timestampBegin, duration) || this;
        _this.caster = caster;
        return _this;
    }
    CooldownFinishedEvent.prototype.getCaster = function () {
        return this.caster;
    };
    CooldownFinishedEvent.prototype.onFinish = function () {
        _util_Logger__WEBPACK_IMPORTED_MODULE_1__["Logger"].logTUserFriendly(2, this.timestampEnd, this.caster.toUserFriendlyDescription() + " cooldown is up for spell: " + this.getStrategicSpellName());
    };
    CooldownFinishedEvent.prototype.allowWizardFollowupAction = function () {
        return false;
    };
    return CooldownFinishedEvent;
}(_SimEvent__WEBPACK_IMPORTED_MODULE_2__["SimEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/room/spells/StrategicSpellEvent.ts":
/*!*******************************************************************!*\
  !*** ../src/sim/events/wizard/room/spells/StrategicSpellEvent.ts ***!
  \*******************************************************************/
/*! exports provided: StrategicSpellEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StrategicSpellEvent", function() { return StrategicSpellEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _wizard_WizardEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../wizard/WizardEvent */ "../src/sim/events/wizard/WizardEvent.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../util/Logger */ "../src/util/Logger.ts");



var StrategicSpellEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](StrategicSpellEvent, _super);
    function StrategicSpellEvent(timestampBegin, caster) {
        var _this = _super.call(this, "strategicSpellDragAndCastAnimation", timestampBegin, caster) || this;
        // Check if in combat
        if (caster.inCombat === true) {
            throw new Error(caster.toUserFriendlyDescription() + " tried casting strategic spell (" + _this.getStrategicSpellName() + ") but was in combat!");
        }
        return _this;
    }
    StrategicSpellEvent.prototype.allowWizardFollowupAction = function () {
        return true;
    };
    StrategicSpellEvent.prototype.getCaster = function () {
        return this.wizard;
    };
    StrategicSpellEvent.prototype.onFinish = function () {
        _util_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].logTUserFriendly(2, this.timestampEnd, this.wizard.toUserFriendlyDescription() + " cast spell: " + this.getStrategicSpellName());
    };
    return StrategicSpellEvent;
}(_wizard_WizardEvent__WEBPACK_IMPORTED_MODULE_1__["WizardEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/room/spells/auror/BatBogeyHexCooldownFinishedEvent.ts":
/*!**************************************************************************************!*\
  !*** ../src/sim/events/wizard/room/spells/auror/BatBogeyHexCooldownFinishedEvent.ts ***!
  \**************************************************************************************/
/*! exports provided: BatBogeyHexCooldownFinishedEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BatBogeyHexCooldownFinishedEvent", function() { return BatBogeyHexCooldownFinishedEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _CooldownFinishedEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CooldownFinishedEvent */ "../src/sim/events/wizard/room/spells/CooldownFinishedEvent.ts");


var BatBogeyHexCooldownFinishedEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BatBogeyHexCooldownFinishedEvent, _super);
    function BatBogeyHexCooldownFinishedEvent(timestampBegin, remainingCooldownDuration, caster) {
        return _super.call(this, timestampBegin, remainingCooldownDuration, caster) || this;
    }
    BatBogeyHexCooldownFinishedEvent.prototype.onFinish = function () {
        this.getCaster().batBogeyHexOnCooldown = false;
    };
    BatBogeyHexCooldownFinishedEvent.prototype.getStrategicSpellName = function () {
        return "Bat Bogey Hex";
    };
    return BatBogeyHexCooldownFinishedEvent;
}(_CooldownFinishedEvent__WEBPACK_IMPORTED_MODULE_1__["CooldownFinishedEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/room/spells/auror/BatBogeyHexEvent.ts":
/*!**********************************************************************!*\
  !*** ../src/sim/events/wizard/room/spells/auror/BatBogeyHexEvent.ts ***!
  \**********************************************************************/
/*! exports provided: BatBogeyHexEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BatBogeyHexEvent", function() { return BatBogeyHexEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _StrategicSpellEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../StrategicSpellEvent */ "../src/sim/events/wizard/room/spells/StrategicSpellEvent.ts");
/* harmony import */ var _BatBogeyHexCooldownFinishedEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BatBogeyHexCooldownFinishedEvent */ "../src/sim/events/wizard/room/spells/auror/BatBogeyHexCooldownFinishedEvent.ts");
/* harmony import */ var _data_spellCooldowns_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../data/spellCooldowns.json */ "../src/data/spellCooldowns.json");
var _data_spellCooldowns_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../../../../../data/spellCooldowns.json */ "../src/data/spellCooldowns.json", 1);




var BatBogeyHexEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BatBogeyHexEvent, _super);
    function BatBogeyHexEvent(timestampBegin, damage, targetEnemy, caster) {
        var _this = _super.call(this, timestampBegin, caster) || this;
        _this.damage = damage;
        _this.targetEnemy = targetEnemy;
        if (caster.hasStudiedBatBogeyHex() === false) {
            throw new Error("Wizard id=" + caster.playerIndex + " has not studied bat bogey hex but tried casting it!");
        }
        if (caster.batBogeyHexOnCooldown === true) {
            throw new Error(caster.toUserFriendlyDescription() + " tried casting bat bogey hex while it was still on cooldown!");
        }
        return _this;
    }
    BatBogeyHexEvent.prototype.onStart = function () {
        this.getCaster().batBogeyHexOnCooldown = true;
    };
    BatBogeyHexEvent.prototype.onFinish = function () {
        _super.prototype.onFinish.call(this);
        this.targetEnemy.removeStamina(this.damage);
        this.getCaster().processFocusCostStrategicSpell("batBogeyHex");
    };
    BatBogeyHexEvent.prototype.getStrategicSpellName = function () {
        return "Bat Bogey Hex (" + this.damage + " damage)";
    };
    BatBogeyHexEvent.prototype.hasFollowupEvent = function () {
        return true;
    };
    BatBogeyHexEvent.prototype.getFollowupEvent = function () {
        return new _BatBogeyHexCooldownFinishedEvent__WEBPACK_IMPORTED_MODULE_2__["BatBogeyHexCooldownFinishedEvent"](this.timestampEnd, _data_spellCooldowns_json__WEBPACK_IMPORTED_MODULE_3__.batBogeyHex - (this.duration), this.getCaster());
    };
    return BatBogeyHexEvent;
}(_StrategicSpellEvent__WEBPACK_IMPORTED_MODULE_1__["StrategicSpellEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/room/spells/auror/ConfusionHexEvent.ts":
/*!***********************************************************************!*\
  !*** ../src/sim/events/wizard/room/spells/auror/ConfusionHexEvent.ts ***!
  \***********************************************************************/
/*! exports provided: ConfusionHexEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfusionHexEvent", function() { return ConfusionHexEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _StrategicSpellEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../StrategicSpellEvent */ "../src/sim/events/wizard/room/spells/StrategicSpellEvent.ts");


var ConfusionHexEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ConfusionHexEvent, _super);
    function ConfusionHexEvent(timestampBegin, confusionHexValue, targetEnemy, caster) {
        var _this = _super.call(this, timestampBegin, caster) || this;
        _this.confusionHexValue = confusionHexValue;
        _this.targetEnemy = targetEnemy;
        if (caster.hasStudiedConfusionHex() === false) {
            throw new Error("Wizard id=" + caster.playerIndex + " has not studied confusion hex but tried casting it!");
        }
        return _this;
    }
    ConfusionHexEvent.prototype.onFinish = function () {
        // Should only cast when this is a better version of the hex
        if (this.targetEnemy.confusionHexValue < this.confusionHexValue) {
            _super.prototype.onFinish.call(this);
            this.targetEnemy.hasConfusionHex = true;
            this.targetEnemy.confusionHexValue = this.confusionHexValue;
            this.getCaster().processFocusCostStrategicSpell("confusionHex");
        }
    };
    ConfusionHexEvent.prototype.getStrategicSpellName = function () {
        return "Confusion Hex";
    };
    return ConfusionHexEvent;
}(_StrategicSpellEvent__WEBPACK_IMPORTED_MODULE_1__["StrategicSpellEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/room/spells/auror/WeakeningHexEvent.ts":
/*!***********************************************************************!*\
  !*** ../src/sim/events/wizard/room/spells/auror/WeakeningHexEvent.ts ***!
  \***********************************************************************/
/*! exports provided: WeakeningHexEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WeakeningHexEvent", function() { return WeakeningHexEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _StrategicSpellEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../StrategicSpellEvent */ "../src/sim/events/wizard/room/spells/StrategicSpellEvent.ts");


var WeakeningHexEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](WeakeningHexEvent, _super);
    function WeakeningHexEvent(timestampBegin, powerDecreasePercent, targetEnemy, caster) {
        var _this = _super.call(this, timestampBegin, caster) || this;
        _this.powerDecreasePercent = powerDecreasePercent;
        _this.targetEnemy = targetEnemy;
        if (caster.hasStudiedWeakeningHex() === false) {
            throw new Error("Wizard id=" + caster.playerIndex + " has not studied weakening hex but tried casting it!");
        }
        return _this;
    }
    WeakeningHexEvent.prototype.onFinish = function () {
        if (this.targetEnemy.weakeningHexValue < this.powerDecreasePercent) {
            _super.prototype.onFinish.call(this);
            this.targetEnemy.hasWeakeningHex = true;
            this.targetEnemy.weakeningHexValue = this.powerDecreasePercent;
            this.getCaster().processFocusCostStrategicSpell("weakeningHex");
        }
    };
    WeakeningHexEvent.prototype.getStrategicSpellName = function () {
        return "Weakening Hex";
    };
    return WeakeningHexEvent;
}(_StrategicSpellEvent__WEBPACK_IMPORTED_MODULE_1__["StrategicSpellEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/room/spells/magizoologist/BraveryCharmEvent.ts":
/*!*******************************************************************************!*\
  !*** ../src/sim/events/wizard/room/spells/magizoologist/BraveryCharmEvent.ts ***!
  \*******************************************************************************/
/*! exports provided: BraveryCharmEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BraveryCharmEvent", function() { return BraveryCharmEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _StrategicSpellEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../StrategicSpellEvent */ "../src/sim/events/wizard/room/spells/StrategicSpellEvent.ts");


var BraveryCharmEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BraveryCharmEvent, _super);
    function BraveryCharmEvent(timestampBegin, powerIncreaseAgainstElites, allWizards, caster) {
        var _this = _super.call(this, timestampBegin, caster) || this;
        _this.powerIncreaseAgainstElites = powerIncreaseAgainstElites;
        _this.allWizards = allWizards;
        if (caster.hasStudiedBraveryCharm() === false) {
            throw new Error(caster.toUserFriendlyDescription() + "has not studied bravery charm but tried casting it!");
        }
        return _this;
    }
    BraveryCharmEvent.prototype.onFinish = function () {
        var e_1, _a;
        _super.prototype.onFinish.call(this);
        try {
            for (var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](this.allWizards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var wizard = _c.value;
                if (wizard.braveryCharmValue < this.powerIncreaseAgainstElites) {
                    wizard.hasBraveryCharm = true;
                    wizard.braveryCharmValue = this.powerIncreaseAgainstElites;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.getCaster().processFocusCostStrategicSpell("braveryCharm");
    };
    BraveryCharmEvent.prototype.getStrategicSpellName = function () {
        return "Bravery Charm (" + this.powerIncreaseAgainstElites + "% more dmg against elites)";
    };
    return BraveryCharmEvent;
}(_StrategicSpellEvent__WEBPACK_IMPORTED_MODULE_1__["StrategicSpellEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/room/spells/magizoologist/ReviveCharmEvent.ts":
/*!******************************************************************************!*\
  !*** ../src/sim/events/wizard/room/spells/magizoologist/ReviveCharmEvent.ts ***!
  \******************************************************************************/
/*! exports provided: ReviveCharmEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReviveCharmEvent", function() { return ReviveCharmEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _StrategicSpellEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../StrategicSpellEvent */ "../src/sim/events/wizard/room/spells/StrategicSpellEvent.ts");
/* harmony import */ var _WizardReviveEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../WizardReviveEvent */ "../src/sim/events/wizard/room/WizardReviveEvent.ts");



var ReviveCharmEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ReviveCharmEvent, _super);
    function ReviveCharmEvent(timestampBegin, reviveCharmValue, targetWizard, caster) {
        var _this = _super.call(this, timestampBegin, caster) || this;
        _this.targetWizard = targetWizard;
        _this.reviveCharmValue = reviveCharmValue;
        if (caster.hasStudiedReviveCharm() === false) {
            throw new Error(caster.toUserFriendlyDescription() + "has not studied revive charm but tried casting it!");
        }
        if (targetWizard.getIsDefeated() === false) {
            throw new Error(targetWizard.toUserFriendlyDescription() + " is not defeated but " + caster.toUserFriendlyDescription() + " tried casting revive charm!");
        }
        return _this;
    }
    ReviveCharmEvent.prototype.onFinish = function () {
        if (this.targetWizard.getIsDefeated()) {
            _super.prototype.onFinish.call(this);
            this.getCaster().processFocusCostStrategicSpell("reviveCharm");
        }
    };
    ReviveCharmEvent.prototype.allowWizardFollowupAction = function () {
        return true;
    };
    ReviveCharmEvent.prototype.hasFollowupEvent = function () {
        return this.targetWizard.getIsDefeated() === true;
    };
    ReviveCharmEvent.prototype.getFollowupEvent = function () {
        return new _WizardReviveEvent__WEBPACK_IMPORTED_MODULE_2__["WizardReviveEvent"](this.timestampEnd, this.targetWizard);
    };
    ReviveCharmEvent.prototype.getStrategicSpellName = function () {
        return "Revive Charm (with " + this.reviveCharmValue + "% HP)";
    };
    return ReviveCharmEvent;
}(_StrategicSpellEvent__WEBPACK_IMPORTED_MODULE_1__["StrategicSpellEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/room/spells/magizoologist/StaminaCharmEvent.ts":
/*!*******************************************************************************!*\
  !*** ../src/sim/events/wizard/room/spells/magizoologist/StaminaCharmEvent.ts ***!
  \*******************************************************************************/
/*! exports provided: StaminaCharmEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaminaCharmEvent", function() { return StaminaCharmEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _StrategicSpellEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../StrategicSpellEvent */ "../src/sim/events/wizard/room/spells/StrategicSpellEvent.ts");


var StaminaCharmEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](StaminaCharmEvent, _super);
    function StaminaCharmEvent(timestampBegin, staminaRestorePercent, targetWizard, caster) {
        var _this = _super.call(this, timestampBegin, caster) || this;
        _this.staminaRestorePercent = staminaRestorePercent;
        _this.targetWizard = targetWizard;
        if (caster.hasStudiedStaminaCharm() === false) {
            throw new Error(caster.toUserFriendlyDescription() + "has not studied stamina charm but tried casting it!");
        }
        if (caster === targetWizard) {
            throw new Error(caster.toUserFriendlyDescription() + " tried casting stamina charm on self!");
        }
        return _this;
    }
    StaminaCharmEvent.prototype.onFinish = function () {
        _super.prototype.onFinish.call(this);
        this.targetWizard.addStaminaPercent(this.staminaRestorePercent);
        this.getCaster().processFocusCostStrategicSpell("staminaCharm");
    };
    StaminaCharmEvent.prototype.getStrategicSpellName = function () {
        return "Stamina Charm (+ " + this.staminaRestorePercent + "% hp)";
    };
    return StaminaCharmEvent;
}(_StrategicSpellEvent__WEBPACK_IMPORTED_MODULE_1__["StrategicSpellEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/room/spells/professor/DefenceCharmEvent.ts":
/*!***************************************************************************!*\
  !*** ../src/sim/events/wizard/room/spells/professor/DefenceCharmEvent.ts ***!
  \***************************************************************************/
/*! exports provided: DefenceCharmEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefenceCharmEvent", function() { return DefenceCharmEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _StrategicSpellEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../StrategicSpellEvent */ "../src/sim/events/wizard/room/spells/StrategicSpellEvent.ts");


var DefenceCharmEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DefenceCharmEvent, _super);
    function DefenceCharmEvent(timestampBegin, defenceIncrease, targetWizard, caster) {
        var _this = _super.call(this, timestampBegin, caster) || this;
        _this.defenceIncrease = defenceIncrease;
        _this.targetWizard = targetWizard;
        if (caster.hasStudiedDefenceCharm() === false) {
            throw new Error("Wizard id=" + caster.playerIndex + " has not studied defence charm but tried casting it!");
        }
        return _this;
    }
    DefenceCharmEvent.prototype.onFinish = function () {
        // Should only cast when there is a weaker or no version of the charm
        if (this.targetWizard.defenceCharmValue < this.defenceIncrease) {
            _super.prototype.onFinish.call(this);
            this.targetWizard.hasDefenceCharm = true; // Increase target's defence
            this.targetWizard.defenceCharmValue = this.defenceIncrease;
            this.getCaster().processFocusCostStrategicSpell("defenceCharm");
        }
    };
    DefenceCharmEvent.prototype.getStrategicSpellName = function () {
        return "Defence Charm (+" + (this.defenceIncrease * 100).toFixed(0) + "% defence)";
    };
    return DefenceCharmEvent;
}(_StrategicSpellEvent__WEBPACK_IMPORTED_MODULE_1__["StrategicSpellEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/room/spells/professor/DeteriorationHexEvent.ts":
/*!*******************************************************************************!*\
  !*** ../src/sim/events/wizard/room/spells/professor/DeteriorationHexEvent.ts ***!
  \*******************************************************************************/
/*! exports provided: DeteriorationHexEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeteriorationHexEvent", function() { return DeteriorationHexEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _StrategicSpellEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../StrategicSpellEvent */ "../src/sim/events/wizard/room/spells/StrategicSpellEvent.ts");
/* harmony import */ var _util_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../util/Logger */ "../src/util/Logger.ts");



var DeteriorationHexEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DeteriorationHexEvent, _super);
    function DeteriorationHexEvent(timestampBegin, damage, targetEnemy, caster) {
        var _this = _super.call(this, timestampBegin, caster) || this;
        _this.deteriorationHexDamage = damage;
        _this.targetEnemy = targetEnemy;
        if (caster.hasStudiedDeteriorationHex() === false) {
            throw new Error("Wizard id=" + caster.playerIndex + " has not studied deterioration charm but tried casting it!");
        }
        return _this;
    }
    DeteriorationHexEvent.prototype.onFinish = function () {
        if (this.targetEnemy.deteriorationHexDamage < this.deteriorationHexDamage) {
            _super.prototype.onFinish.call(this);
            this.targetEnemy.hasDeteriorationHex = true;
            this.targetEnemy.deteriorationHexDamage = this.deteriorationHexDamage;
            _util_Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].logT(2, this.timestampEnd, "Added deterioration hex (damage=" + this.deteriorationHexDamage + ") on enemy id=" +
                this.targetEnemy.enemyIndex + " by wizard id=" + this.wizard.playerIndex);
            this.getCaster().processFocusCostStrategicSpell("deteriorationHex");
        }
    };
    DeteriorationHexEvent.prototype.getStrategicSpellName = function () {
        return "Deterioration Hex (" + this.deteriorationHexDamage + " damage)";
    };
    return DeteriorationHexEvent;
}(_StrategicSpellEvent__WEBPACK_IMPORTED_MODULE_1__["StrategicSpellEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/room/spells/professor/MendingCharmCooldownFinishedEvent.ts":
/*!*******************************************************************************************!*\
  !*** ../src/sim/events/wizard/room/spells/professor/MendingCharmCooldownFinishedEvent.ts ***!
  \*******************************************************************************************/
/*! exports provided: MendingCharmCooldownFinishedEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MendingCharmCooldownFinishedEvent", function() { return MendingCharmCooldownFinishedEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _CooldownFinishedEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CooldownFinishedEvent */ "../src/sim/events/wizard/room/spells/CooldownFinishedEvent.ts");


var MendingCharmCooldownFinishedEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MendingCharmCooldownFinishedEvent, _super);
    function MendingCharmCooldownFinishedEvent(timestampBegin, remainingCooldownDuration, caster) {
        return _super.call(this, timestampBegin, remainingCooldownDuration, caster) || this;
    }
    MendingCharmCooldownFinishedEvent.prototype.onFinish = function () {
        this.getCaster().mendingCharmOnCooldown = false;
    };
    MendingCharmCooldownFinishedEvent.prototype.getStrategicSpellName = function () {
        return "Mending Charm";
    };
    return MendingCharmCooldownFinishedEvent;
}(_CooldownFinishedEvent__WEBPACK_IMPORTED_MODULE_1__["CooldownFinishedEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/room/spells/professor/MendingCharmEvent.ts":
/*!***************************************************************************!*\
  !*** ../src/sim/events/wizard/room/spells/professor/MendingCharmEvent.ts ***!
  \***************************************************************************/
/*! exports provided: MendingCharmEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MendingCharmEvent", function() { return MendingCharmEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _StrategicSpellEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../StrategicSpellEvent */ "../src/sim/events/wizard/room/spells/StrategicSpellEvent.ts");
/* harmony import */ var _model_player_Professor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../model/player/Professor */ "../src/model/player/Professor.ts");
/* harmony import */ var _MendingCharmCooldownFinishedEvent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MendingCharmCooldownFinishedEvent */ "../src/sim/events/wizard/room/spells/professor/MendingCharmCooldownFinishedEvent.ts");
/* harmony import */ var _data_spellCooldowns_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../data/spellCooldowns.json */ "../src/data/spellCooldowns.json");
var _data_spellCooldowns_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../../../../../data/spellCooldowns.json */ "../src/data/spellCooldowns.json", 1);
/* harmony import */ var _model_player_Magizoologist__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../model/player/Magizoologist */ "../src/model/player/Magizoologist.ts");






var MendingCharmEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MendingCharmEvent, _super);
    function MendingCharmEvent(timestampBegin, staminaRestore, targetWizard, caster) {
        var _this = _super.call(this, timestampBegin, caster) || this;
        _this.staminaRestore = staminaRestore;
        _this.targetWizard = targetWizard;
        if (caster instanceof _model_player_Professor__WEBPACK_IMPORTED_MODULE_2__["Professor"]) {
            if (caster.hasStudiedMendingCharm() === false) {
                throw new Error(caster.toUserFriendlyDescription() + " has not studied mending charm but tried casting it!");
            }
        }
        else if (caster instanceof _model_player_Magizoologist__WEBPACK_IMPORTED_MODULE_5__["Magizoologist"]) {
            if (caster.hasStudiedMendingCharm() === false) {
                throw new Error(caster.toUserFriendlyDescription() + " has not studied mending charm but tried casting it!");
            }
        }
        if (caster.mendingCharmOnCooldown === true) {
            throw new Error(caster.toUserFriendlyDescription() + " tried casting mending charm while it was still on cooldown!");
        }
        return _this;
    }
    MendingCharmEvent.prototype.onStart = function () {
        this.getCaster().mendingCharmOnCooldown = true;
    };
    MendingCharmEvent.prototype.onFinish = function () {
        _super.prototype.onFinish.call(this);
        this.targetWizard.addStamina(this.staminaRestore);
        this.getCaster().processFocusCostStrategicSpell("mendingCharm");
    };
    MendingCharmEvent.prototype.getStrategicSpellName = function () {
        return "Mending Charm (+" + this.staminaRestore + "hp)";
    };
    MendingCharmEvent.prototype.hasFollowupEvent = function () {
        return true;
    };
    MendingCharmEvent.prototype.getFollowupEvent = function () {
        return new _MendingCharmCooldownFinishedEvent__WEBPACK_IMPORTED_MODULE_3__["MendingCharmCooldownFinishedEvent"](this.timestampEnd, _data_spellCooldowns_json__WEBPACK_IMPORTED_MODULE_4__.mendingCharm - (this.duration), this.getCaster());
    };
    return MendingCharmEvent;
}(_StrategicSpellEvent__WEBPACK_IMPORTED_MODULE_1__["StrategicSpellEvent"]));



/***/ }),

/***/ "../src/sim/events/wizard/room/spells/professor/ProficiencyPowerCharmEvent.ts":
/*!************************************************************************************!*\
  !*** ../src/sim/events/wizard/room/spells/professor/ProficiencyPowerCharmEvent.ts ***!
  \************************************************************************************/
/*! exports provided: ProficiencyPowerCharmEvemt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProficiencyPowerCharmEvemt", function() { return ProficiencyPowerCharmEvemt; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _StrategicSpellEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../StrategicSpellEvent */ "../src/sim/events/wizard/room/spells/StrategicSpellEvent.ts");


var ProficiencyPowerCharmEvemt = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ProficiencyPowerCharmEvemt, _super);
    function ProficiencyPowerCharmEvemt(timestampBegin, proficiencyIncrease, allWizards, caster) {
        var _this = _super.call(this, timestampBegin, caster) || this;
        _this.proficiencyIncrease = proficiencyIncrease;
        _this.allWizards = allWizards;
        if (caster.hasStudiedProficiencyPowerCharm() === false) {
            throw new Error("Wizard id=" + caster.playerIndex + " has not studied proficiency power charm but tried casting it!");
        }
        return _this;
    }
    ProficiencyPowerCharmEvemt.prototype.onFinish = function () {
        var e_1, _a;
        _super.prototype.onFinish.call(this);
        try {
            for (var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](this.allWizards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var wizard = _c.value;
                if (wizard.proficiencyPowerCharmValue < this.proficiencyIncrease) {
                    wizard.hasProficiencyPowerCharm = true;
                    wizard.proficiencyPowerCharmValue = this.proficiencyIncrease;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.getCaster().processFocusCostStrategicSpell("proficiencyPowerCharm");
    };
    ProficiencyPowerCharmEvemt.prototype.getStrategicSpellName = function () {
        return "Proficiency Power Charm (+" +
            (this.proficiencyIncrease * 100).toFixed(0) + "% proficiency)";
    };
    return ProficiencyPowerCharmEvemt;
}(_StrategicSpellEvent__WEBPACK_IMPORTED_MODULE_1__["StrategicSpellEvent"]));



/***/ }),

/***/ "../src/util/Logger.ts":
/*!*****************************!*\
  !*** ../src/util/Logger.ts ***!
  \*****************************/
/*! exports provided: Logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return Logger; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");

var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.log = function (verbosityParam, message, simLogChannel) {
        if (simLogChannel === undefined) {
            simLogChannel = "Debug";
        }
        if (this.verbosity >= verbosityParam) {
            switch (simLogChannel) {
                case "Debug":
                    Logger.callbackFunction(message);
                    break;
                case "User friendly":
                    Logger.callbackFunctionUserFriendly(message);
                    break;
            }
        }
    };
    Logger.logT = function (verbosityParam, timestamp, message) {
        Logger.log(verbosityParam, (timestamp / 1000.0).toFixed(3) + ": " + message, "Debug");
    };
    Logger.logTUserFriendly = function (verbosityParam, timestamp, message) {
        Logger.log(verbosityParam, (timestamp / 1000.0).toFixed(3) + ": " + message, "User friendly");
    };
    Logger.verbosity = 2;
    Logger.callbackFunction = console.log;
    // noop: should be set from other channel where we want this, for example in frontend 
    Logger.callbackFunctionUserFriendly = function (message) { };
    return Logger;
}());



/***/ }),

/***/ "../src/util/Utils.ts":
/*!****************************!*\
  !*** ../src/util/Utils.ts ***!
  \****************************/
/*! exports provided: Utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return Utils; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");

var Utils = /** @class */ (function () {
    function Utils() {
    }
    // https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
    Utils.isObject = function (val) {
        if (val === null) {
            return false;
        }
        return ((typeof val === 'function') || (typeof val === 'object'));
    };
    // recursively do this but allow only primitives 
    // avoid circular references
    // prepend "." to all paths
    // example: 
    /**
     *
     * @param object
     *
     * {
     *     "a": 123,
     *     "b": true,
     *     "c": {
     *          "d": 4
     *     }
     * }
     *
     * should return [".a", ".b", ".c", ".c.d"]
     */
    Utils.getAllFieldNames = function (object, currentPath, exploredPaths) {
        var e_1, _a;
        if (Utils.isObject(object) === false) {
            return [currentPath];
        }
        var result = [];
        if (currentPath !== "") {
            // push path to this object itself as well
            result.push(currentPath);
        }
        try {
            for (var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](Object.getOwnPropertyNames(object)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                // check if key is already in path somewhere to avoid circular references
                var pathSections = currentPath.split(".");
                var childPath = currentPath + "." + key;
                if (pathSections.indexOf(key) === -1) {
                    exploredPaths.push(childPath);
                    var childKeys = Utils.getAllFieldNames(object[key], childPath, exploredPaths);
                    result = result.concat(childKeys);
                }
                else {
                    //console.log("Not exploring " + childPath); 
                }
                //console.log(exploredPaths); 
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return result;
    };
    Utils.deepCompareObjectSameKeys = function (o1, o2) {
        // Get the keys of each object
        var o1keys = Object.keys(o1).sort();
        var o2keys = Object.keys(o2).sort();
        // Make sure they match
        // If you don't want a string check, you could do
        // if (o1keys.length !== o2keys.length || !o1keys.every((key, index) => o2keys[index] === key)) {
        if (o1keys.join() !== o2keys.join()) {
            // This level doesn't have the same keys
            return false;
        }
        // Check any objects
        return o1keys.every(function (key) {
            var v1 = o1[key];
            var v2 = o2[key];
            if (v1 === null) {
                return v2 === null;
            }
            var t1 = typeof v1;
            var t2 = typeof v2;
            if (t1 !== t2) {
                return false;
            }
            return t1 === "object" ? Utils.deepCompareObjectSameKeys(v1, v2) : true;
        });
    };
    return Utils;
}());



/***/ }),

/***/ "./node_modules/@ngtools/webpack/src/index.js!./src/app/app.worker.ts":
/*!*******************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src!./src/app/app.worker.ts ***!
  \*******************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var prando__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prando */ "./node_modules/prando/dist/Prando.es.js");
/* harmony import */ var _src_sim_CombatSimulation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../src/sim/CombatSimulation */ "../src/sim/CombatSimulation.ts");
/* harmony import */ var _src_util_Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../src/util/Logger */ "../src/util/Logger.ts");
var _this = undefined;

/// <reference lib="webworker" />



addEventListener('message', function (_a) {
    var data = _a.data;
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
        var messageContainer, _b, combatSimulation, results;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
            switch (_c.label) {
                case 0:
                    messageContainer = data;
                    if (messageContainer === undefined) {
                        throw new Error("Web worker received 'undefined' as message!");
                    }
                    _b = messageContainer.messageType;
                    switch (_b) {
                        case "executeSimulation": return [3 /*break*/, 1];
                    }
                    return [3 /*break*/, 3];
                case 1:
                    _src_util_Logger__WEBPACK_IMPORTED_MODULE_3__["Logger"].verbosity = 0; // todo: redirect this console.log to postMessage 
                    combatSimulation = new _src_sim_CombatSimulation__WEBPACK_IMPORTED_MODULE_2__["CombatSimulation"](messageContainer.params.combatSimulationParameters, new prando__WEBPACK_IMPORTED_MODULE_1__["default"](messageContainer.params.combatSimulationParameters.seed));
                    combatSimulation.init();
                    return [4 /*yield*/, combatSimulation.simulate()];
                case 2:
                    _c.sent();
                    results = combatSimulation.toSimulationResults();
                    results.runID = messageContainer.params.runID;
                    postFinishedSimulation(results);
                    return [3 /*break*/, 4];
                case 3:
                    postMessage("Worker received unknown message: ");
                    postMessage(messageContainer);
                    _c.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
});
function postFinishedSimulation(simulationResults) {
    var response = {
        messageType: "simulationFinished",
        params: {
            combatSimulationResults: simulationResults
        }
    };
    postMessage(response);
}


/***/ }),

/***/ "./node_modules/prando/dist/Prando.es.js":
/*!***********************************************!*\
  !*** ./node_modules/prando/dist/Prando.es.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Prando = /** @class */ (function () {
    // ================================================================================================================
    // CONSTRUCTOR ----------------------------------------------------------------------------------------------------
    /**
     * Generate a new Prando pseudo-random number generator.
     *
     * @param seed - A number or string seed that determines which pseudo-random number sequence will be created. Defaults to current time.
     */
    function Prando(seed) {
        this._value = NaN;
        if (typeof (seed) === "string") {
            // String seed
            this._seed = this.hashCode(seed);
        }
        else if (typeof (seed) === "number") {
            // Numeric seed
            this._seed = this.getSafeSeed(seed);
        }
        else {
            // Pseudo-random seed
            this._seed = this.getSafeSeed(Prando.MIN + Math.floor((Prando.MAX - Prando.MIN) * Math.random()));
        }
        this.reset();
    }
    // ================================================================================================================
    // PUBLIC INTERFACE -----------------------------------------------------------------------------------------------
    /**
     * Generates a pseudo-random number between a lower (inclusive) and a higher (exclusive) bounds.
     *
     * @param min - The minimum number that can be randomly generated.
     * @param pseudoMax - The maximum number that can be randomly generated (exclusive).
     * @return The generated pseudo-random number.
     */
    Prando.prototype.next = function (min, pseudoMax) {
        if (min === void 0) { min = 0; }
        if (pseudoMax === void 0) { pseudoMax = 1; }
        this.recalculate();
        return this.map(this._value, Prando.MIN, Prando.MAX, min, pseudoMax);
    };
    /**
     * Generates a pseudo-random integer number in a range (inclusive).
     *
     * @param min - The minimum number that can be randomly generated.
     * @param max - The maximum number that can be randomly generated.
     * @return The generated pseudo-random number.
     */
    Prando.prototype.nextInt = function (min, max) {
        if (min === void 0) { min = 10; }
        if (max === void 0) { max = 100; }
        this.recalculate();
        return Math.floor(this.map(this._value, Prando.MIN, Prando.MAX, min, max + 1));
    };
    /**
     * Generates a pseudo-random string sequence of a particular length from a specific character range.
     *
     * Note: keep in mind that creating a random string sequence does not guarantee uniqueness; there is always a
     * 1 in (char_length^string_length) chance of collision. For real unique string ids, always check for
     * pre-existing ids, or employ a robust GUID/UUID generator.
     *
     * @param length - Length of the strting to be generated.
     * @param chars - Characters that are used when creating the random string. Defaults to all alphanumeric chars (A-Z, a-z, 0-9).
     * @return The generated string sequence.
     */
    Prando.prototype.nextString = function (length, chars) {
        if (length === void 0) { length = 16; }
        if (chars === void 0) { chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; }
        var str = "";
        while (str.length < length) {
            str += this.nextChar(chars);
        }
        return str;
    };
    /**
     * Generates a pseudo-random string of 1 character specific character range.
     *
     * @param chars - Characters that are used when creating the random string. Defaults to all alphanumeric chars (A-Z, a-z, 0-9).
     * @return The generated character.
     */
    Prando.prototype.nextChar = function (chars) {
        if (chars === void 0) { chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; }
        this.recalculate();
        return chars.substr(this.nextInt(0, chars.length - 1), 1);
    };
    /**
     * Picks a pseudo-random item from an array. The array is left unmodified.
     *
     * Note: keep in mind that while the returned item will be random enough, picking one item from the array at a time
     * does not guarantee nor imply that a sequence of random non-repeating items will be picked. If you want to
     * *pick items in a random order* from an array, instead of *pick one random item from an array*, it's best to
     * apply a *shuffle* transformation to the array instead, then read it linearly.
     *
     * @param array - Array of any type containing one or more candidates for random picking.
     * @return An item from the array.
     */
    Prando.prototype.nextArrayItem = function (array) {
        this.recalculate();
        return array[this.nextInt(0, array.length - 1)];
    };
    /**
     * Generates a pseudo-random boolean.
     *
     * @return A value of true or false.
     */
    Prando.prototype.nextBoolean = function () {
        this.recalculate();
        return this._value > 0.5;
    };
    /**
     * Skips ahead in the sequence of numbers that are being generated. This is equivalent to
     * calling next() a specified number of times, but faster since it doesn't need to map the
     * new random numbers to a range and return it.
     *
     * @param iterations - The number of items to skip ahead.
     */
    Prando.prototype.skip = function (iterations) {
        if (iterations === void 0) { iterations = 1; }
        while (iterations-- > 0) {
            this.recalculate();
        }
    };
    /**
     * Reset the pseudo-random number sequence back to its starting seed. Further calls to next()
     * will then produce the same sequence of numbers it had produced before. This is equivalent to
     * creating a new Prando instance with the same seed as another Prando instance.
     *
     * Example:
     * let rng = new Prando(12345678);
     * console.log(rng.next()); // 0.6177754114889017
     * console.log(rng.next()); // 0.5784605181725837
     * rng.reset();
     * console.log(rng.next()); // 0.6177754114889017 again
     * console.log(rng.next()); // 0.5784605181725837 again
     */
    Prando.prototype.reset = function () {
        this._value = this._seed;
    };
    // ================================================================================================================
    // PRIVATE INTERFACE ----------------------------------------------------------------------------------------------
    Prando.prototype.recalculate = function () {
        this._value = this.xorshift(this._value);
    };
    Prando.prototype.xorshift = function (value) {
        // Xorshift*32
        // Based on George Marsaglia's work: http://www.jstatsoft.org/v08/i14/paper
        value ^= value << 13;
        value ^= value >> 17;
        value ^= value << 5;
        return value;
    };
    Prando.prototype.map = function (val, minFrom, maxFrom, minTo, maxTo) {
        return ((val - minFrom) / (maxFrom - minFrom)) * (maxTo - minTo) + minTo;
    };
    Prando.prototype.hashCode = function (str) {
        var hash = 0;
        if (str) {
            var l = str.length;
            for (var i = 0; i < l; i++) {
                hash = ((hash << 5) - hash) + str.charCodeAt(i);
                hash |= 0;
                hash = this.xorshift(hash);
            }
        }
        return this.getSafeSeed(hash);
    };
    Prando.prototype.getSafeSeed = function (seed) {
        if (seed === 0)
            return 1;
        return seed;
    };
    Prando.MIN = -2147483648; // Int32 min
    Prando.MAX = 2147483647; // Int32 max
    return Prando;
}());

/* harmony default export */ __webpack_exports__["default"] = (Prando);


/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ })

/******/ });