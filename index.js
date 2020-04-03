(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.DatePicker = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  function isDate(value) {
    return value instanceof Date || Object.prototype.toString.call(value) === '[object Date]';
  }
  function toDate(value) {
    if (isDate(value)) {
      return new Date(value.getTime());
    }

    if (value == null) {
      return new Date(NaN);
    }

    return new Date(value);
  }
  function isValidDate(value) {
    return isDate(value) && !isNaN(value.getTime());
  }
  function startOfWeek(value) {
    var firstDayOfWeek = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (!(firstDayOfWeek >= 0 && firstDayOfWeek <= 6)) {
      throw new RangeError('weekStartsOn must be between 0 and 6');
    }

    var date = toDate(value);
    var day = date.getDay();
    var diff = (day + 7 - firstDayOfWeek) % 7;
    date.setDate(date.getDate() - diff);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  function startOfWeekYear(value) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$firstDayOfWeek = _ref.firstDayOfWeek,
        firstDayOfWeek = _ref$firstDayOfWeek === void 0 ? 0 : _ref$firstDayOfWeek,
        _ref$firstWeekContain = _ref.firstWeekContainsDate,
        firstWeekContainsDate = _ref$firstWeekContain === void 0 ? 1 : _ref$firstWeekContain;

    if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
      throw new RangeError('firstWeekContainsDate must be between 1 and 7');
    }

    var date = toDate(value);
    var year = date.getFullYear();
    var firstDateOfFirstWeek = new Date(0);

    for (var i = year + 1; i >= year - 1; i--) {
      firstDateOfFirstWeek.setFullYear(i, 0, firstWeekContainsDate);
      firstDateOfFirstWeek.setHours(0, 0, 0, 0);
      firstDateOfFirstWeek = startOfWeek(firstDateOfFirstWeek, firstDayOfWeek);

      if (date.getTime() >= firstDateOfFirstWeek.getTime()) {
        break;
      }
    }

    return firstDateOfFirstWeek;
  }
  function getWeek(value) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$firstDayOfWeek = _ref2.firstDayOfWeek,
        firstDayOfWeek = _ref2$firstDayOfWeek === void 0 ? 0 : _ref2$firstDayOfWeek,
        _ref2$firstWeekContai = _ref2.firstWeekContainsDate,
        firstWeekContainsDate = _ref2$firstWeekContai === void 0 ? 1 : _ref2$firstWeekContai;

    var date = toDate(value);
    var firstDateOfThisWeek = startOfWeek(date, firstDayOfWeek);
    var firstDateOfFirstWeek = startOfWeekYear(date, {
      firstDayOfWeek: firstDayOfWeek,
      firstWeekContainsDate: firstWeekContainsDate
    });
    var diff = firstDateOfThisWeek.getTime() - firstDateOfFirstWeek.getTime();
    return Math.round(diff / (7 * 24 * 3600 * 1000)) + 1;
  }

  var locale = {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    firstDayOfWeek: 0,
    firstWeekContainsDate: 1
  };

  var REGEX_FORMAT = /\[([^\]]+)]|YYYY|YY?|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|Z{1,2}|S{1,3}|w{1,2}|x|X|a|A/g;

  function pad(val) {
    var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var output = "".concat(Math.abs(val));
    var sign = val < 0 ? '-' : '';

    while (output.length < len) {
      output = "0".concat(output);
    }

    return sign + output;
  }

  function formatTimezone(offset) {
    var delimeter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var sign = offset > 0 ? '-' : '+';
    var absOffset = Math.abs(offset);
    var hours = Math.floor(absOffset / 60);
    var minutes = absOffset % 60;
    return sign + pad(hours, 2) + delimeter + pad(minutes, 2);
  }

  var meridiem = function meridiem(h, _, isLowercase) {
    var word = h < 12 ? 'AM' : 'PM';
    return isLowercase ? word.toLocaleLowerCase() : word;
  };

  var formatFlags = {
    Y: function Y(date) {
      var y = date.getFullYear();
      return y <= 9999 ? "".concat(y) : "+".concat(y);
    },
    // Year: 00, 01, ..., 99
    YY: function YY(date) {
      return pad(date.getFullYear(), 4).substr(2);
    },
    // Year: 1900, 1901, ..., 2099
    YYYY: function YYYY(date) {
      return pad(date.getFullYear(), 4);
    },
    // Month: 1, 2, ..., 12
    M: function M(date) {
      return date.getMonth() + 1;
    },
    // Month: 01, 02, ..., 12
    MM: function MM(date) {
      return pad(date.getMonth() + 1, 2);
    },
    MMM: function MMM(date, locale) {
      return locale.monthsShort[date.getMonth()];
    },
    MMMM: function MMMM(date, locale) {
      return locale.months[date.getMonth()];
    },
    // Day of month: 1, 2, ..., 31
    D: function D(date) {
      return date.getDate();
    },
    // Day of month: 01, 02, ..., 31
    DD: function DD(date) {
      return pad(date.getDate(), 2);
    },
    // Hour: 0, 1, ... 23
    H: function H(date) {
      return date.getHours();
    },
    // Hour: 00, 01, ..., 23
    HH: function HH(date) {
      return pad(date.getHours(), 2);
    },
    // Hour: 1, 2, ..., 12
    h: function h(date) {
      var hours = date.getHours();

      if (hours === 0) {
        return 12;
      }

      if (hours > 12) {
        return hours % 12;
      }

      return hours;
    },
    // Hour: 01, 02, ..., 12
    hh: function hh() {
      var hours = formatFlags.h.apply(formatFlags, arguments);
      return pad(hours, 2);
    },
    // Minute: 0, 1, ..., 59
    m: function m(date) {
      return date.getMinutes();
    },
    // Minute: 00, 01, ..., 59
    mm: function mm(date) {
      return pad(date.getMinutes(), 2);
    },
    // Second: 0, 1, ..., 59
    s: function s(date) {
      return date.getSeconds();
    },
    // Second: 00, 01, ..., 59
    ss: function ss(date) {
      return pad(date.getSeconds(), 2);
    },
    // 1/10 of second: 0, 1, ..., 9
    S: function S(date) {
      return Math.floor(date.getMilliseconds() / 100);
    },
    // 1/100 of second: 00, 01, ..., 99
    SS: function SS(date) {
      return pad(Math.floor(date.getMilliseconds() / 10), 2);
    },
    // Millisecond: 000, 001, ..., 999
    SSS: function SSS(date) {
      return pad(date.getMilliseconds(), 3);
    },
    // Day of week: 0, 1, ..., 6
    d: function d(date) {
      return date.getDay();
    },
    // Day of week: 'Su', 'Mo', ..., 'Sa'
    dd: function dd(date, locale) {
      return locale.weekdaysMin[date.getDay()];
    },
    // Day of week: 'Sun', 'Mon',..., 'Sat'
    ddd: function ddd(date, locale) {
      return locale.weekdaysShort[date.getDay()];
    },
    // Day of week: 'Sunday', 'Monday', ...,'Saturday'
    dddd: function dddd(date, locale) {
      return locale.weekdays[date.getDay()];
    },
    // AM, PM
    A: function A(date, locale) {
      var meridiemFunc = locale.meridiem || meridiem;
      return meridiemFunc(date.getHours(), date.getMinutes(), false);
    },
    // am, pm
    a: function a(date, locale) {
      var meridiemFunc = locale.meridiem || meridiem;
      return meridiemFunc(date.getHours(), date.getMinutes(), true);
    },
    // Timezone: -01:00, +00:00, ... +12:00
    Z: function Z(date) {
      return formatTimezone(date.getTimezoneOffset(), ':');
    },
    // Timezone: -0100, +0000, ... +1200
    ZZ: function ZZ(date) {
      return formatTimezone(date.getTimezoneOffset());
    },
    // Seconds timestamp: 512969520
    X: function X(date) {
      return Math.floor(date.getTime() / 1000);
    },
    // Milliseconds timestamp: 512969520900
    x: function x(date) {
      return date.getTime();
    },
    w: function w(date, locale) {
      return getWeek(date, {
        firstDayOfWeek: locale.firstDayOfWeek,
        firstWeekContainsDate: locale.firstWeekContainsDate
      });
    },
    ww: function ww(date, locale) {
      return pad(formatFlags.w(date, locale), 2);
    }
  };

  function format(val, str) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var formatStr = str ? String(str) : 'YYYY-MM-DDTHH:mm:ss.SSSZ';
    var date = toDate(val);

    if (!isValidDate(date)) {
      return 'Invalid Date';
    }

    var locale$1 = options.locale || locale;
    return formatStr.replace(REGEX_FORMAT, function (match, p1) {
      if (p1) {
        return p1;
      }

      if (typeof formatFlags[match] === 'function') {
        return "".concat(formatFlags[match](date, locale$1));
      }

      return match;
    });
  }

  function _toConsumableArray$1(arr) {
    return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _nonIterableSpread$1();
  }

  function _nonIterableSpread$1() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _iterableToArray$1(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _arrayWithoutHoles$1(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  function ownKeys$1(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys$1(source, true).forEach(function (key) {
          _defineProperty$1(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys$1(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray$1(arr, i) {
    return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _nonIterableRest$1();
  }

  function _nonIterableRest$1() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  function _iterableToArrayLimit$1(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _arrayWithHoles$1(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _defineProperty$1(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }
  var formattingTokens = /(\[[^\[]*\])|(MM?M?M?|Do|DD?|ddd?d?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|S{1,3}|x|X|ZZ?|.)/g;
  var match1 = /\d/; // 0 - 9

  var match2 = /\d\d/; // 00 - 99

  var match3 = /\d{3}/; // 000 - 999

  var match4 = /\d{4}/; // 0000 - 9999

  var match1to2 = /\d\d?/; // 0 - 99

  var matchShortOffset = /[+-]\d\d:?\d\d/; // +00:00 -00:00 +0000 or -0000

  var matchSigned = /[+-]?\d+/; // -inf - inf

  var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

  var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i; // Word

  var YEAR = 'year';
  var MONTH = 'month';
  var DAY = 'day';
  var HOUR = 'hour';
  var MINUTE = 'minute';
  var SECOND = 'second';
  var MILLISECOND = 'millisecond';
  var parseFlags = {};

  var addParseFlag = function addParseFlag(token, regex, callback) {
    var tokens = Array.isArray(token) ? token : [token];
    var func;

    if (typeof callback === 'string') {
      func = function func(input) {
        var value = parseInt(input, 10);
        return _defineProperty$1({}, callback, value);
      };
    } else {
      func = callback;
    }

    tokens.forEach(function (key) {
      parseFlags[key] = [regex, func];
    });
  };

  var matchWordCallback = function matchWordCallback(localeKey, key) {
    return function (input, locale) {
      var array = locale[localeKey];

      if (!Array.isArray(array)) {
        throw new Error("Locale[".concat(localeKey, "] need an array"));
      }

      var index = array.indexOf(input);

      if (index < 0) {
        throw new Error('Invalid Word');
      }

      return _defineProperty$1({}, key, index);
    };
  };

  addParseFlag('Y', matchSigned, YEAR);
  addParseFlag('YY', match2, function (input) {
    var year = new Date().getFullYear();
    var cent = Math.floor(year / 100);
    var value = parseInt(input, 10);
    value = (value > 68 ? cent - 1 : cent) * 100 + value;
    return _defineProperty$1({}, YEAR, value);
  });
  addParseFlag('YYYY', match4, YEAR);
  addParseFlag('M', match1to2, function (input) {
    return _defineProperty$1({}, MONTH, parseInt(input, 10) - 1);
  });
  addParseFlag('MM', match2, function (input) {
    return _defineProperty$1({}, MONTH, parseInt(input, 10) - 1);
  });
  addParseFlag('MMM', matchWord, matchWordCallback('monthsShort', MONTH));
  addParseFlag('MMMM', matchWord, matchWordCallback('months', MONTH));
  addParseFlag('D', match1to2, DAY);
  addParseFlag('DD', match2, DAY);
  addParseFlag(['H', 'h'], match1to2, HOUR);
  addParseFlag(['HH', 'hh'], match2, HOUR);
  addParseFlag('m', match1to2, MINUTE);
  addParseFlag('mm', match2, MINUTE);
  addParseFlag('s', match1to2, SECOND);
  addParseFlag('ss', match2, SECOND);
  addParseFlag('S', match1, function (input) {
    return _defineProperty$1({}, MILLISECOND, parseInt(input, 10) * 100);
  });
  addParseFlag('SS', match2, function (input) {
    return _defineProperty$1({}, MILLISECOND, parseInt(input, 10) * 10);
  });
  addParseFlag('SSS', match3, MILLISECOND);

  function matchMeridiem(locale) {
    return locale.meridiemParse || /[ap]\.?m?\.?/i;
  }

  function defaultIsPM(input) {
    return "".concat(input).toLowerCase().charAt(0) === 'p';
  }

  addParseFlag(['A', 'a'], matchMeridiem, function (input, locale) {
    var isPM = typeof locale.isPM === 'function' ? locale.isPM(input) : defaultIsPM(input);
    return {
      isPM: isPM
    };
  });

  function offsetFromString(str) {
    var _ref8 = str.match(/([+-]|\d\d)/g) || ['-', '0', '0'],
        _ref9 = _slicedToArray$1(_ref8, 3),
        symbol = _ref9[0],
        hour = _ref9[1],
        minute = _ref9[2];

    var minutes = parseInt(hour, 10) * 60 + parseInt(minute, 10);

    if (minutes === 0) {
      return 0;
    }

    return symbol === '+' ? -minutes : +minutes;
  }

  addParseFlag(['Z', 'ZZ'], matchShortOffset, function (input) {
    return {
      offset: offsetFromString(input)
    };
  });
  addParseFlag('x', matchSigned, function (input) {
    return {
      date: new Date(parseInt(input, 10))
    };
  });
  addParseFlag('X', matchTimestamp, function (input) {
    return {
      date: new Date(parseFloat(input) * 1000)
    };
  });
  addParseFlag('d', match1, 'weekday');
  addParseFlag('dd', matchWord, matchWordCallback('weekdaysMin', 'weekday'));
  addParseFlag('ddd', matchWord, matchWordCallback('weekdaysShort', 'weekday'));
  addParseFlag('dddd', matchWord, matchWordCallback('weekdays', 'weekday'));
  addParseFlag('w', match1to2, 'week');
  addParseFlag('ww', match2, 'week');

  function to24hour(hour, isPM) {
    if (hour !== undefined && isPM !== undefined) {
      if (isPM) {
        if (hour < 12) {
          return hour + 12;
        }
      } else if (hour === 12) {
        return 0;
      }
    }

    return hour;
  }

  function getFullInputArray(input) {
    var backupDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
    var result = [0, 0, 1, 0, 0, 0, 0];
    var backupArr = [backupDate.getFullYear(), backupDate.getMonth(), backupDate.getDate(), backupDate.getHours(), backupDate.getMinutes(), backupDate.getSeconds(), backupDate.getMilliseconds()];
    var useBackup = true;

    for (var i = 0; i < 7; i++) {
      if (input[i] === undefined) {
        result[i] = useBackup ? backupArr[i] : result[i];
      } else {
        result[i] = input[i];
        useBackup = false;
      }
    }

    return result;
  }

  function createUTCDate() {
    var date;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var y = args[0];

    if (y < 100 && y >= 0) {
      args[0] += 400;
      date = new Date(Date.UTC.apply(Date, args)); // eslint-disable-next-line no-restricted-globals

      if (isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
      }
    } else {
      date = new Date(Date.UTC.apply(Date, args));
    }

    return date;
  }

  function makeParser(dateString, format, locale) {
    var tokens = format.match(formattingTokens);

    if (!tokens) {
      throw new Error();
    }

    var length = tokens.length;
    var mark = {};

    for (var i = 0; i < length; i += 1) {
      var token = tokens[i];
      var parseTo = parseFlags[token];

      if (!parseTo) {
        var word = token.replace(/^\[|\]$/g, '');

        if (dateString.indexOf(word) === 0) {
          dateString = dateString.substr(word.length);
        } else {
          throw new Error('not match');
        }
      } else {
        var regex = typeof parseTo[0] === 'function' ? parseTo[0](locale) : parseTo[0];
        var parser = parseTo[1];
        var value = (regex.exec(dateString) || [])[0];
        var obj = parser(value, locale);
        mark = _objectSpread({}, mark, {}, obj);
        dateString = dateString.replace(value, '');
      }
    }

    return mark;
  }

  function parse(str, format) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    try {
      var _options$locale = options.locale,
          _locale = _options$locale === void 0 ? locale : _options$locale,
          _options$backupDate = options.backupDate,
          backupDate = _options$backupDate === void 0 ? new Date() : _options$backupDate;

      var parseResult = makeParser(str, format, _locale);
      var year = parseResult.year,
          month = parseResult.month,
          day = parseResult.day,
          hour = parseResult.hour,
          minute = parseResult.minute,
          second = parseResult.second,
          millisecond = parseResult.millisecond,
          isPM = parseResult.isPM,
          date = parseResult.date,
          offset = parseResult.offset,
          weekday = parseResult.weekday,
          week = parseResult.week;

      if (date) {
        return date;
      }

      var inputArray = [year, month, day, hour, minute, second, millisecond];
      inputArray[3] = to24hour(inputArray[3], isPM); // check week

      if (week !== undefined && month === undefined && day === undefined) {
        // new Date(year, 3) make sure in current year
        var firstDate = startOfWeekYear(year === undefined ? backupDate : new Date(year, 3), {
          firstDayOfWeek: _locale.firstDayOfWeek,
          firstWeekContainsDate: _locale.firstWeekContainsDate
        });
        return new Date(firstDate.getTime() + (week - 1) * 7 * 24 * 3600 * 1000);
      }

      var utcDate = createUTCDate.apply(void 0, _toConsumableArray$1(getFullInputArray(inputArray, backupDate)));
      var offsetMilliseconds = (offset === undefined ? utcDate.getTimezoneOffset() : offset) * 60 * 1000;
      var parsedDate = new Date(utcDate.getTime() + offsetMilliseconds); // check weekday

      if (weekday !== undefined && parsedDate.getDay() !== weekday) {
        return new Date(NaN);
      }

      return parsedDate;
    } catch (e) {
      return new Date(NaN);
    }
  }

  // new Date(10, 0, 1) The year from 0 to 99 will be incremented by 1900 automatically.
  function createDate(y) {
    var M = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var d = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var m = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var s = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var ms = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var date = new Date(y, M, d, h, m, s, ms);

    if (y < 100 && y >= 0) {
      date.setFullYear(y);
    }

    return date;
  }
  function isValidDate$1(date) {
    return date instanceof Date && !isNaN(date);
  }
  function isValidRangeDate(date) {
    return Array.isArray(date) && date.length === 2 && date.every(isValidDate$1) && date[0] <= date[1];
  }
  function getValidDate(value) {
    var date = new Date(value);

    for (var _len = arguments.length, backup = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      backup[_key - 1] = arguments[_key];
    }

    return isValidDate$1(date) ? date : getValidDate.apply(void 0, backup);
  }
  function assignTime(target, source) {
    var date = new Date(target);
    var time = new Date(source);
    date.setHours(time.getHours(), time.getMinutes(), time.getSeconds());
    return date;
  }

  /**
   * chunk the array
   * @param {Array} arr
   * @param {Number} size
   */
  function chunk(arr, size) {
    if (!Array.isArray(arr)) {
      return [];
    }

    var result = [];
    var len = arr.length;
    var i = 0;
    size = size || len;

    while (i < len) {
      result.push(arr.slice(i, i += size));
    }

    return result;
  }
  /**
   * isObject
   * @param {*} obj
   * @returns {Boolean}
   */

  function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }
  /**
   * pick object
   * @param {Object} obj
   * @param {Array|String} props
   */

  function pick(obj, props) {
    if (!isObject(obj)) return {};

    if (!Array.isArray(props)) {
      props = [props];
    }

    var res = {};
    props.forEach(function (prop) {
      if (prop in obj) {
        res[prop] = obj[prop];
      }
    });
    return res;
  }
  /**
   * deep merge two object without merging array
   * @param {object} target
   * @param {object} source
   */

  function mergeDeep(target, source) {
    if (!isObject(target)) {
      return {};
    }

    var result = target;

    if (isObject(source)) {
      Object.keys(source).forEach(function (key) {
        var value = source[key];

        if (isObject(value) && isObject(target[key])) {
          value = mergeDeep(target[key], value);
        }

        result = _objectSpread2({}, result, _defineProperty({}, key, value));
      });
    }

    return result;
  }

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var en = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;
  var locale = {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    firstDayOfWeek: 0,
    firstWeekContainsDate: 1
  };
  var _default = locale;
  exports["default"] = _default;
  module.exports = exports.default;
  });

  var en$1 = unwrapExports(en);

  var lang = {
    formatLocale: en$1,
    yearFormat: 'YYYY',
    monthFormat: 'MMM',
    monthBeforeYear: true
  };

  var defaultLocale = 'en';
  var locales = {};
  locales[defaultLocale] = lang;
  function locale$1(name, object, isLocal) {
    if (typeof name !== 'string') return locales[defaultLocale];
    var l = defaultLocale;

    if (locales[name]) {
      l = name;
    }

    if (object) {
      locales[name] = object;
      l = name;
    }

    if (!isLocal) {
      defaultLocale = l;
    }

    return locales[name] || locales[defaultLocale];
  }
  /**
   * get locale object
   * @param {string} name lang
   */

  function getLocale(name) {
    return locale$1(name, null, true);
  }
  /**
   * get locale field value
   * @param {string} field field eg: 'formatLocale.shortMonth'
   * @param {object} lang locale object
   */

  function getLocaleFieldValue(field, lang) {
    var arr = (field || '').split('.');
    var current = lang || getLocale();
    var value;

    for (var i = 0, len = arr.length; i < len; i++) {
      var prop = arr[i];
      value = current[prop];

      if (i === len - 1) {
        return value;
      }

      if (!value) {
        return null;
      }

      current = value;
    }

    return null;
  }

  /* istanbul ignore file */
  function rafThrottle(fn) {
    var isRunning = false;
    return function fnBinfRaf() {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (isRunning) return;
      isRunning = true;
      requestAnimationFrame(function () {
        isRunning = false;
        fn.apply(_this, args);
      });
    };
  }

  /**
   * get the hidden element width, height
   * @param {HTMLElement} element dom
   */
  function getPopupElementSize(element) {
    var originalDisplay = element.style.display;
    var originalVisibility = element.style.visibility;
    element.style.display = 'block';
    element.style.visibility = 'hidden';
    var styles = window.getComputedStyle(element);
    var width = element.offsetWidth + parseInt(styles.marginLeft, 10) + parseInt(styles.marginRight, 10);
    var height = element.offsetHeight + parseInt(styles.marginTop, 10) + parseInt(styles.marginBottom, 10);
    element.style.display = originalDisplay;
    element.style.visibility = originalVisibility;
    return {
      width: width,
      height: height
    };
  }
  /**
   * get the popup position
   * @param {HTMLElement} el relative element
   * @param {Number} targetWidth target element's width
   * @param {Number} targetHeight target element's height
   * @param {Boolean} fixed
   */

  function getRelativePosition(el, targetWidth, targetHeight, fixed) {
    var left = 0;
    var top = 0;
    var offsetX = 0;
    var offsetY = 0;
    var relativeRect = el.getBoundingClientRect();
    var dw = document.documentElement.clientWidth;
    var dh = document.documentElement.clientHeight;

    if (fixed) {
      offsetX = window.pageXOffset + relativeRect.left;
      offsetY = window.pageYOffset + relativeRect.top;
    }

    if (dw - relativeRect.left < targetWidth && relativeRect.right < targetWidth) {
      left = offsetX - relativeRect.left + 1;
    } else if (relativeRect.left + relativeRect.width / 2 <= dw / 2) {
      left = offsetX;
    } else {
      left = offsetX + relativeRect.width - targetWidth;
    }

    if (relativeRect.top <= targetHeight && dh - relativeRect.bottom <= targetHeight) {
      top = offsetY + dh - relativeRect.top - targetHeight;
    } else if (relativeRect.top + relativeRect.height / 2 <= dh / 2) {
      top = offsetY + relativeRect.height;
    } else {
      top = offsetY - targetHeight;
    }

    return {
      left: "".concat(left, "px"),
      top: "".concat(top, "px")
    };
  }
  function getScrollParent(node) {
    var until = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

    if (!node || node === until) {
      return null;
    }

    var style = function style(value, prop) {
      return getComputedStyle(value, null).getPropertyValue(prop);
    };

    var regex = /(auto|scroll)/;
    var scroll = regex.test(style(node, 'overflow') + style(node, 'overflow-y') + style(node, 'overflow-x'));
    return scroll ? node : getScrollParent(node.parentNode, until);
  }

  var Popup = {
    name: 'Popup',
    inject: {
      prefixClass: {
        default: 'mx'
      }
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      appendToBody: {
        type: Boolean,
        default: true
      },
      inline: {
        type: Boolean,
        default: false
      }
    },
    data: function data() {
      return {
        top: '',
        left: ''
      };
    },
    watch: {
      visible: {
        immediate: true,
        handler: function handler(val) {
          var _this = this;

          this.$nextTick(function () {
            if (val) {
              _this.displayPopup();
            }
          });
        }
      }
    },
    mounted: function mounted() {
      var _this2 = this;

      if (this.inline) {
        return;
      }

      if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }

      this._clickoutEvent = 'ontouchend' in document ? 'touchstart' : 'mousedown';
      document.addEventListener(this._clickoutEvent, this.handleClickOutside); // change the popup position when resize or scroll

      var relativeElement = this.$parent.$el;
      this._displayPopup = rafThrottle(function () {
        return _this2.displayPopup();
      });
      this._scrollParent = getScrollParent(relativeElement) || window;

      this._scrollParent.addEventListener('scroll', this._displayPopup);

      window.addEventListener('resize', this._displayPopup);
    },
    beforeDestroy: function beforeDestroy() {
      if (this.inline) {
        return;
      }

      if (this.appendToBody && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }

      document.removeEventListener(this._clickoutEvent, this.handleClickOutside);

      this._scrollParent.removeEventListener('scroll', this._displayPopup);

      window.removeEventListener('resize', this._displayPopup);
    },
    methods: {
      handleClickOutside: function handleClickOutside(evt) {
        if (!this.visible) return;
        var target = evt.target;
        var el = this.$el;

        if (el && !el.contains(target)) {
          this.$emit('clickoutside', evt);
        }
      },
      displayPopup: function displayPopup() {
        if (this.inline || !this.visible) return;
        var popup = this.$el;
        var relativeElement = this.$parent.$el;
        var appendToBody = this.appendToBody;

        if (!this._popupRect) {
          this._popupRect = getPopupElementSize(popup);
        }

        var _this$_popupRect = this._popupRect,
            width = _this$_popupRect.width,
            height = _this$_popupRect.height;

        var _getRelativePosition = getRelativePosition(relativeElement, width, height, appendToBody),
            left = _getRelativePosition.left,
            top = _getRelativePosition.top;

        this.left = left;
        this.top = top;
      }
    },
    render: function render() {
      var h = arguments[0];
      var prefixClass = this.prefixClass;

      if (this.inline) {
        return h("div", {
          "class": "".concat(prefixClass, "-datepicker-main")
        }, [this.$slots.default]);
      }

      return h("transition", {
        "attrs": {
          "name": "".concat(prefixClass, "-zoom-in-down")
        }
      }, [this.visible && h("div", {
        "class": "".concat(prefixClass, "-datepicker-main ").concat(prefixClass, "-datepicker-popup"),
        "style": {
          top: this.top,
          left: this.left,
          position: 'absolute'
        }
      }, [this.$slots.default])]);
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function (context) {
        style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  /* script */

  /* template */
  var __vue_render__ = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('svg', {
      attrs: {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 1024 1024"
      }
    }, [_c('path', {
      attrs: {
        "d": "M940.218182 107.054545h-209.454546V46.545455h-65.163636v60.50909H363.054545V46.545455H297.890909v60.50909H83.781818c-18.618182 0-32.581818 13.963636-32.581818 32.581819v805.236363c0 18.618182 13.963636 32.581818 32.581818 32.581818h861.090909c18.618182 0 32.581818-13.963636 32.581818-32.581818V139.636364c-4.654545-18.618182-18.618182-32.581818-37.236363-32.581819zM297.890909 172.218182V232.727273h65.163636V172.218182h307.2V232.727273h65.163637V172.218182h176.872727v204.8H116.363636V172.218182h181.527273zM116.363636 912.290909V442.181818h795.927273v470.109091H116.363636z"
      }
    })]);
  };

  var __vue_staticRenderFns__ = [];
  /* style */

  var __vue_inject_styles__ = undefined;
  /* scoped */

  var __vue_scope_id__ = undefined;
  /* module identifier */

  var __vue_module_identifier__ = undefined;
  /* functional template */

  var __vue_is_functional_template__ = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var IconCalendar = normalizeComponent({
    render: __vue_render__,
    staticRenderFns: __vue_staticRenderFns__
  }, __vue_inject_styles__, {}, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

  /* script */

  /* template */
  var __vue_render__$1 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('svg', {
      attrs: {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 1024 1024"
      }
    }, [_c('path', {
      attrs: {
        "d": "M810.005333 274.005333l-237.994667 237.994667 237.994667 237.994667-60.010667 60.010667-237.994667-237.994667-237.994667 237.994667-60.010667-60.010667 237.994667-237.994667-237.994667-237.994667 60.010667-60.010667 237.994667 237.994667 237.994667-237.994667z"
      }
    })]);
  };

  var __vue_staticRenderFns__$1 = [];
  /* style */

  var __vue_inject_styles__$1 = undefined;
  /* scoped */

  var __vue_scope_id__$1 = undefined;
  /* module identifier */

  var __vue_module_identifier__$1 = undefined;
  /* functional template */

  var __vue_is_functional_template__$1 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var IconClose = normalizeComponent({
    render: __vue_render__$1,
    staticRenderFns: __vue_staticRenderFns__$1
  }, __vue_inject_styles__$1, {}, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

  /**
   * @name toDate
   * @category Common Helpers
   * @summary Convert the given argument to an instance of Date.
   *
   * @description
   * Convert the given argument to an instance of Date.
   *
   * If the argument is an instance of Date, the function returns its clone.
   *
   * If the argument is a number, it is treated as a timestamp.
   *
   * If the argument is none of the above, the function returns Invalid Date.
   *
   * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
   *
   * @param {Date|Number} argument - the value to convert
   * @returns {Date} the parsed date in the local time zone
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // Clone the date:
   * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
   * //=> Tue Feb 11 2014 11:30:30
   *
   * @example
   * // Convert the timestamp to date:
   * const result = toDate(1392098430000)
   * //=> Tue Feb 11 2014 11:30:30
   */
  function toDate$1(argument) {
    if (arguments.length < 1) {
      throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
    }

    var argStr = Object.prototype.toString.call(argument); // Clone the date

    if (argument instanceof Date || _typeof(argument) === 'object' && argStr === '[object Date]') {
      // Prevent the date to lose the milliseconds when passed to new Date() in IE10
      return new Date(argument.getTime());
    } else if (typeof argument === 'number' || argStr === '[object Number]') {
      return new Date(argument);
    } else {
      if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
        // eslint-disable-next-line no-console
        console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"); // eslint-disable-next-line no-console

        console.warn(new Error().stack);
      }

      return new Date(NaN);
    }
  }

  function toInteger(dirtyNumber) {
    if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
      return NaN;
    }

    var number = Number(dirtyNumber);

    if (isNaN(number)) {
      return number;
    }

    return number < 0 ? Math.ceil(number) : Math.floor(number);
  }

  /**
   * @name startOfDay
   * @category Day Helpers
   * @summary Return the start of a day for the given date.
   *
   * @description
   * Return the start of a day for the given date.
   * The result will be in the local timezone.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the original date
   * @returns {Date} the start of a day
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // The start of a day for 2 September 2014 11:55:00:
   * var result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
   * //=> Tue Sep 02 2014 00:00:00
   */

  function startOfDay(dirtyDate) {
    if (arguments.length < 1) {
      throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
    }

    var date = toDate$1(dirtyDate);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  /**
   * @name getDaysInMonth
   * @category Month Helpers
   * @summary Get the number of days in a month of the given date.
   *
   * @description
   * Get the number of days in a month of the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the given date
   * @returns {Number} the number of days in a month
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // How many days are in February 2000?
   * var result = getDaysInMonth(new Date(2000, 1))
   * //=> 29
   */

  function getDaysInMonth(dirtyDate) {
    if (arguments.length < 1) {
      throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
    }

    var date = toDate$1(dirtyDate);
    var year = date.getFullYear();
    var monthIndex = date.getMonth();
    var lastDayOfMonth = new Date(0);
    lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
    lastDayOfMonth.setHours(0, 0, 0, 0);
    return lastDayOfMonth.getDate();
  }

  /**
   * @name addMonths
   * @category Month Helpers
   * @summary Add the specified number of months to the given date.
   *
   * @description
   * Add the specified number of months to the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} amount - the amount of months to be added
   * @returns {Date} the new date with the months added
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Add 5 months to 1 September 2014:
   * var result = addMonths(new Date(2014, 8, 1), 5)
   * //=> Sun Feb 01 2015 00:00:00
   */

  function addMonths(dirtyDate, dirtyAmount) {
    if (arguments.length < 2) {
      throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
    }

    var date = toDate$1(dirtyDate);
    var amount = toInteger(dirtyAmount);
    var desiredMonth = date.getMonth() + amount;
    var dateWithDesiredMonth = new Date(0);
    dateWithDesiredMonth.setFullYear(date.getFullYear(), desiredMonth, 1);
    dateWithDesiredMonth.setHours(0, 0, 0, 0);
    var daysInMonth = getDaysInMonth(dateWithDesiredMonth); // Set the last day of the new month
    // if the original date was the last day of the longer month

    date.setMonth(desiredMonth, Math.min(daysInMonth, date.getDate()));
    return date;
  }

  /**
   * @name addYears
   * @category Year Helpers
   * @summary Add the specified number of years to the given date.
   *
   * @description
   * Add the specified number of years to the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} amount - the amount of years to be added
   * @returns {Date} the new date with the years added
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Add 5 years to 1 September 2014:
   * var result = addYears(new Date(2014, 8, 1), 5)
   * //=> Sun Sep 01 2019 00:00:00
   */

  function addYears(dirtyDate, dirtyAmount) {
    if (arguments.length < 2) {
      throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
    }

    var amount = toInteger(dirtyAmount);
    return addMonths(dirtyDate, amount * 12);
  }

  /**
   * @name differenceInCalendarMonths
   * @category Month Helpers
   * @summary Get the number of calendar months between the given dates.
   *
   * @description
   * Get the number of calendar months between the given dates.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} dateLeft - the later date
   * @param {Date|Number} dateRight - the earlier date
   * @returns {Number} the number of calendar months
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // How many calendar months are between 31 January 2014 and 1 September 2014?
   * var result = differenceInCalendarMonths(
   *   new Date(2014, 8, 1),
   *   new Date(2014, 0, 31)
   * )
   * //=> 8
   */

  function differenceInCalendarMonths(dirtyDateLeft, dirtyDateRight) {
    if (arguments.length < 2) {
      throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
    }

    var dateLeft = toDate$1(dirtyDateLeft);
    var dateRight = toDate$1(dirtyDateRight);
    var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
    var monthDiff = dateLeft.getMonth() - dateRight.getMonth();
    return yearDiff * 12 + monthDiff;
  }

  /**
   * @name startOfMonth
   * @category Month Helpers
   * @summary Return the start of a month for the given date.
   *
   * @description
   * Return the start of a month for the given date.
   * The result will be in the local timezone.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the original date
   * @returns {Date} the start of a month
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // The start of a month for 2 September 2014 11:55:00:
   * var result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
   * //=> Mon Sep 01 2014 00:00:00
   */

  function startOfMonth(dirtyDate) {
    if (arguments.length < 1) {
      throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
    }

    var date = toDate$1(dirtyDate);
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  /**
   * @name startOfYear
   * @category Year Helpers
   * @summary Return the start of a year for the given date.
   *
   * @description
   * Return the start of a year for the given date.
   * The result will be in the local timezone.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the original date
   * @returns {Date} the start of a year
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // The start of a year for 2 September 2014 11:55:00:
   * var result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
   * //=> Wed Jan 01 2014 00:00:00
   */

  function startOfYear(dirtyDate) {
    if (arguments.length < 1) {
      throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
    }

    var cleanDate = toDate$1(dirtyDate);
    var date = new Date(0);
    date.setFullYear(cleanDate.getFullYear(), 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  /**
   * @name setMonth
   * @category Month Helpers
   * @summary Set the month to the given date.
   *
   * @description
   * Set the month to the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} month - the month of the new date
   * @returns {Date} the new date with the month set
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Set February to 1 September 2014:
   * var result = setMonth(new Date(2014, 8, 1), 1)
   * //=> Sat Feb 01 2014 00:00:00
   */

  function setMonth(dirtyDate, dirtyMonth) {
    if (arguments.length < 2) {
      throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
    }

    var date = toDate$1(dirtyDate);
    var month = toInteger(dirtyMonth);
    var year = date.getFullYear();
    var day = date.getDate();
    var dateWithDesiredMonth = new Date(0);
    dateWithDesiredMonth.setFullYear(year, month, 15);
    dateWithDesiredMonth.setHours(0, 0, 0, 0);
    var daysInMonth = getDaysInMonth(dateWithDesiredMonth); // Set the last day of the new month
    // if the original date was the last day of the longer month

    date.setMonth(month, Math.min(day, daysInMonth));
    return date;
  }

  /**
   * @name setYear
   * @category Year Helpers
   * @summary Set the year to the given date.
   *
   * @description
   * Set the year to the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} year - the year of the new date
   * @returns {Date} the new date with the year set
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Set year 2013 to 1 September 2014:
   * var result = setYear(new Date(2014, 8, 1), 2013)
   * //=> Sun Sep 01 2013 00:00:00
   */

  function setYear(dirtyDate, dirtyYear) {
    if (arguments.length < 2) {
      throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
    }

    var date = toDate$1(dirtyDate);
    var year = toInteger(dirtyYear); // Check if date is Invalid Date because Date.prototype.setFullYear ignores the value of Invalid Date

    if (isNaN(date)) {
      return new Date(NaN);
    }

    date.setFullYear(year);
    return date;
  }

  /**
   * @name subMonths
   * @category Month Helpers
   * @summary Subtract the specified number of months from the given date.
   *
   * @description
   * Subtract the specified number of months from the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} amount - the amount of months to be subtracted
   * @returns {Date} the new date with the months subtracted
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Subtract 5 months from 1 February 2015:
   * var result = subMonths(new Date(2015, 1, 1), 5)
   * //=> Mon Sep 01 2014 00:00:00
   */

  function subMonths(dirtyDate, dirtyAmount) {
    if (arguments.length < 2) {
      throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
    }

    var amount = toInteger(dirtyAmount);
    return addMonths(dirtyDate, -amount);
  }

  /**
   * @name subYears
   * @category Year Helpers
   * @summary Subtract the specified number of years from the given date.
   *
   * @description
   * Subtract the specified number of years from the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} amount - the amount of years to be subtracted
   * @returns {Date} the new date with the years subtracted
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Subtract 5 years from 1 September 2014:
   * var result = subYears(new Date(2014, 8, 1), 5)
   * //=> Tue Sep 01 2009 00:00:00
   */

  function subYears(dirtyDate, dirtyAmount) {
    if (arguments.length < 2) {
      throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
    }

    var amount = toInteger(dirtyAmount);
    return addYears(dirtyDate, -amount);
  }

  var LunarCalendar = createCommonjsModule(function (module, exports) {
  /**
   * 农历（阴历）万年历
   * LunarCalendar
   * vervison : v0.1.4
   * Github : https://github.com/zzyss86/LunarCalendar
   * HomePage : http://www.tuijs.com/
   * Author : JasonZhou
   * Email : zzyss86@qq.com
   */

  (function(){
  	var extend = function(o, c){
  		if(o && c && typeof c == "object"){
  			for(var p in c){
  				o[p] = c[p];
  			}
  		}
  		return o;
  	};
  	
  	var creatLenArr = function(year,month,len,start){
  		var arr = [];
  			start = start || 0;
  		if(len<1)return arr;
  		var k = start;
  		for(var i=0;i<len;i++){
  			arr.push({year:year,month:month,day:k});
  			k++;
  		}
  		return arr;
  	};
  	
  	var errorCode = { //错误码列表
  		100 : '输入的年份超过了可查询范围，仅支持1891至2100年',
  		101 : '参数输入错误，请查阅文档'
  	};
  	
  	var cache = null; //某年相同计算进行cache，以加速计算速度
  	var cacheUtil = { //cache管理工具
  		current : '',
  		setCurrent : function(year){
  			if(this.current != year){
  				this.current = year;
  				this.clear();
  			}
  		},
  		set : function(key,value){
  			if(!cache) cache = {};
  			cache[key] = value;
  			return cache[key];
  		},
  		get : function(key){
  			if(!cache) cache = {};
  			return cache[key];
  		},
  		clear : function(){
  			cache = null;
  		}
  	};
  	
  	var formateDayD4 = function(month,day){
  		month = month+1;
  		month = month<10 ? '0'+month : month;
  		day = day<10 ? '0'+day : day;
  		return 'd'+month+day;
  	};
  	
  	var minYear = 1890;//最小年限
  	var maxYear = 2100;//最大年限
  	var DATA = {
  		heavenlyStems: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'], //天干
  		earthlyBranches: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'], //地支
  		zodiac: ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'], //对应地支十二生肖
  		solarTerm: ['小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪','冬至'], //二十四节气
  		monthCn: ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
  		dateCn: ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十', '卅一']
  	};
  	
  	//中国节日放假安排，外部设置，0无特殊安排，1工作，2放假
  	var worktime = {};
  	//默认设置2013-2014年放假安排
  	worktime.y2013 = {"d0101":2,"d0102":2,"d0103":2,"d0105":1,"d0106":1,"d0209":2,"d0210":2,"d0211":2,"d0212":2,"d0213":2,"d0214":2,"d0215":2,"d0216":1,"d0217":1,"d0404":2,"d0405":2,"d0406":2,"d0407":1,"d0427":1,"d0428":1,"d0429":2,"d0430":2,"d0501":2,"d0608":1,"d0609":1,"d0610":2,"d0611":2,"d0612":2,"d0919":2,"d0920":2,"d0921":2,"d0922":1,"d0929":1,"d1001":2,"d1002":2,"d1003":2,"d1004":2,"d1005":2,"d1006":2,"d1007":2,"d1012":1};
  	worktime.y2014 = {"d0101":2,"d0126":1,"d0131":2,"d0201":2,"d0202":2,"d0203":2,"d0204":2,"d0205":2,"d0206":2,"d0208":1,"d0405":2,"d0407":2,"d0501":2,"d0502":2,"d0503":2,"d0504":1,"d0602":2,"d0908":2,"d0928":1,"d1001":2,"d1002":2,"d1003":2,"d1004":2,"d1005":2,"d1006":2,"d1007":2,"d1011":1};
  	
  	//公历节日
  	var solarFestival = {
  		'd0101':'元旦节',
  		'd0202':'世界湿地日',
  		'd0210':'国际气象节',
  		'd0214':'情人节',
  		'd0301':'国际海豹日',
  		'd0303':'全国爱耳日',
  		'd0305':'学雷锋纪念日',
  		'd0308':'妇女节',
  		'd0312':'植树节 孙中山逝世纪念日',
  		'd0314':'国际警察日',
  		'd0315':'消费者权益日',
  		'd0317':'中国国医节 国际航海日',
  		'd0321':'世界森林日 消除种族歧视国际日 世界儿歌日',
  		'd0322':'世界水日',
  		'd0323':'世界气象日',
  		'd0324':'世界防治结核病日',
  		'd0325':'全国中小学生安全教育日',
  		'd0330':'巴勒斯坦国土日',
  		'd0401':'愚人节 全国爱国卫生运动月(四月) 税收宣传月(四月)',
  		'd0407':'世界卫生日',
  		'd0422':'世界地球日',
  		'd0423':'世界图书和版权日',
  		'd0424':'亚非新闻工作者日',
  		'd0501':'劳动节',
  		'd0504':'青年节',
  		'd0505':'碘缺乏病防治日',
  		'd0508':'世界红十字日',
  		'd0512':'国际护士节',
  		'd0515':'国际家庭日',
  		'd0517':'世界电信日',
  		'd0518':'国际博物馆日',
  		'd0520':'全国学生营养日',
  		'd0522':'国际生物多样性日',
  		'd0523':'国际牛奶日',
  		'd0531':'世界无烟日', 
  		'd0601':'国际儿童节',
  		'd0605':'世界环境日',
  		'd0606':'全国爱眼日',
  		'd0617':'防治荒漠化和干旱日',
  		'd0623':'国际奥林匹克日',
  		'd0625':'全国土地日',
  		'd0626':'国际禁毒日',
  		'd0701':'香港回归纪念日 中共诞辰 世界建筑日',
  		'd0702':'国际体育记者日',
  		'd0707':'抗日战争纪念日',
  		'd0711':'世界人口日',
  		'd0730':'非洲妇女日',
  		'd0801':'建军节',
  		'd0808':'中国男子节(爸爸节)',
  		'd0815':'抗日战争胜利纪念',
  		'd0908':'国际扫盲日 国际新闻工作者日',
  		'd0909':'毛泽东逝世纪念',
  		'd0910':'中国教师节', 
  		'd0914':'世界清洁地球日',
  		'd0916':'国际臭氧层保护日',
  		'd0918':'九一八事变纪念日',
  		'd0920':'国际爱牙日',
  		'd0927':'世界旅游日',
  		'd0928':'孔子诞辰',
  		'd1001':'国庆节 世界音乐日 国际老人节',
  		'd1002':'国际和平与民主自由斗争日',
  		'd1004':'世界动物日',
  		'd1006':'老人节',
  		'd1008':'全国高血压日 世界视觉日',
  		'd1009':'世界邮政日 万国邮联日',
  		'd1010':'辛亥革命纪念日 世界精神卫生日',
  		'd1013':'世界保健日 国际教师节',
  		'd1014':'世界标准日',
  		'd1015':'国际盲人节(白手杖节)',
  		'd1016':'世界粮食日',
  		'd1017':'世界消除贫困日',
  		'd1022':'世界传统医药日',
  		'd1024':'联合国日 世界发展信息日',
  		'd1031':'世界勤俭日',
  		'd1107':'十月社会主义革命纪念日',
  		'd1108':'中国记者日',
  		'd1109':'全国消防安全宣传教育日',
  		'd1110':'世界青年节',
  		'd1111':'国际科学与和平周(本日所属的一周)',
  		'd1112':'孙中山诞辰纪念日',
  		'd1114':'世界糖尿病日',
  		'd1117':'国际大学生节 世界学生节',
  		'd1121':'世界问候日 世界电视日',
  		'd1129':'国际声援巴勒斯坦人民国际日',
  		'd1201':'世界艾滋病日',
  		'd1203':'世界残疾人日',
  		'd1205':'国际经济和社会发展志愿人员日',
  		'd1208':'国际儿童电视日',
  		'd1209':'世界足球日',
  		'd1210':'世界人权日',
  		'd1212':'西安事变纪念日',
  		'd1213':'南京大屠杀(1937年)纪念日！紧记血泪史！',
  		'd1220':'澳门回归纪念',
  		'd1221':'国际篮球日',
  		'd1224':'平安夜',
  		'd1225':'圣诞节',
  		'd1226':'毛泽东诞辰纪念'
  	};
  	
  	//农历节日
  	var lunarFestival = {
  		'd0101':'春节',
  		'd0115':'元宵节',
  		'd0202':'龙抬头节',
  		'd0323':'妈祖生辰',
  		'd0505':'端午节',
  		'd0707':'七夕情人节',
  		'd0715':'中元节',
  		'd0815':'中秋节',
  		'd0909':'重阳节',
  		'd1015':'下元节',
  		'd1208':'腊八节',
  		'd1223':'小年',
  		'd0100':'除夕'
  	};

  	/**
  	 * 1890 - 2100 年的农历数据
  	 * 数据格式：[0,2,9,21936]
  	 * [闰月所在月，0为没有闰月; *正月初一对应公历月; *正月初一对应公历日; *农历每月的天数的数组（需转换为二进制,得到每月大小，0=小月(29日),1=大月(30日)）;]
  	*/
  	var lunarInfo = [[2,1,21,22184],[0,2,9,21936],[6,1,30,9656],[0,2,17,9584],[0,2,6,21168],[5,1,26,43344],[0,2,13,59728],[0,2,2,27296],[3,1,22,44368],[0,2,10,43856],[8,1,30,19304],[0,2,19,19168],[0,2,8,42352],[5,1,29,21096],[0,2,16,53856],[0,2,4,55632],[4,1,25,27304],[0,2,13,22176],[0,2,2,39632],[2,1,22,19176],[0,2,10,19168],[6,1,30,42200],[0,2,18,42192],[0,2,6,53840],[5,1,26,54568],[0,2,14,46400],[0,2,3,54944],[2,1,23,38608],[0,2,11,38320],[7,2,1,18872],[0,2,20,18800],[0,2,8,42160],[5,1,28,45656],[0,2,16,27216],[0,2,5,27968],[4,1,24,44456],[0,2,13,11104],[0,2,2,38256],[2,1,23,18808],[0,2,10,18800],[6,1,30,25776],[0,2,17,54432],[0,2,6,59984],[5,1,26,27976],[0,2,14,23248],[0,2,4,11104],[3,1,24,37744],[0,2,11,37600],[7,1,31,51560],[0,2,19,51536],[0,2,8,54432],[6,1,27,55888],[0,2,15,46416],[0,2,5,22176],[4,1,25,43736],[0,2,13,9680],[0,2,2,37584],[2,1,22,51544],[0,2,10,43344],[7,1,29,46248],[0,2,17,27808],[0,2,6,46416],[5,1,27,21928],[0,2,14,19872],[0,2,3,42416],[3,1,24,21176],[0,2,12,21168],[8,1,31,43344],[0,2,18,59728],[0,2,8,27296],[6,1,28,44368],[0,2,15,43856],[0,2,5,19296],[4,1,25,42352],[0,2,13,42352],[0,2,2,21088],[3,1,21,59696],[0,2,9,55632],[7,1,30,23208],[0,2,17,22176],[0,2,6,38608],[5,1,27,19176],[0,2,15,19152],[0,2,3,42192],[4,1,23,53864],[0,2,11,53840],[8,1,31,54568],[0,2,18,46400],[0,2,7,46752],[6,1,28,38608],[0,2,16,38320],[0,2,5,18864],[4,1,25,42168],[0,2,13,42160],[10,2,2,45656],[0,2,20,27216],[0,2,9,27968],[6,1,29,44448],[0,2,17,43872],[0,2,6,38256],[5,1,27,18808],[0,2,15,18800],[0,2,4,25776],[3,1,23,27216],[0,2,10,59984],[8,1,31,27432],[0,2,19,23232],[0,2,7,43872],[5,1,28,37736],[0,2,16,37600],[0,2,5,51552],[4,1,24,54440],[0,2,12,54432],[0,2,1,55888],[2,1,22,23208],[0,2,9,22176],[7,1,29,43736],[0,2,18,9680],[0,2,7,37584],[5,1,26,51544],[0,2,14,43344],[0,2,3,46240],[4,1,23,46416],[0,2,10,44368],[9,1,31,21928],[0,2,19,19360],[0,2,8,42416],[6,1,28,21176],[0,2,16,21168],[0,2,5,43312],[4,1,25,29864],[0,2,12,27296],[0,2,1,44368],[2,1,22,19880],[0,2,10,19296],[6,1,29,42352],[0,2,17,42208],[0,2,6,53856],[5,1,26,59696],[0,2,13,54576],[0,2,3,23200],[3,1,23,27472],[0,2,11,38608],[11,1,31,19176],[0,2,19,19152],[0,2,8,42192],[6,1,28,53848],[0,2,15,53840],[0,2,4,54560],[5,1,24,55968],[0,2,12,46496],[0,2,1,22224],[2,1,22,19160],[0,2,10,18864],[7,1,30,42168],[0,2,17,42160],[0,2,6,43600],[5,1,26,46376],[0,2,14,27936],[0,2,2,44448],[3,1,23,21936],[0,2,11,37744],[8,2,1,18808],[0,2,19,18800],[0,2,8,25776],[6,1,28,27216],[0,2,15,59984],[0,2,4,27424],[4,1,24,43872],[0,2,12,43744],[0,2,2,37600],[3,1,21,51568],[0,2,9,51552],[7,1,29,54440],[0,2,17,54432],[0,2,5,55888],[5,1,26,23208],[0,2,14,22176],[0,2,3,42704],[4,1,23,21224],[0,2,11,21200],[8,1,31,43352],[0,2,19,43344],[0,2,7,46240],[6,1,27,46416],[0,2,15,44368],[0,2,5,21920],[4,1,24,42448],[0,2,12,42416],[0,2,2,21168],[3,1,22,43320],[0,2,9,26928],[7,1,29,29336],[0,2,17,27296],[0,2,6,44368],[5,1,26,19880],[0,2,14,19296],[0,2,3,42352],[4,1,24,21104],[0,2,10,53856],[8,1,30,59696],[0,2,18,54560],[0,2,7,55968],[6,1,27,27472],[0,2,15,22224],[0,2,5,19168],[4,1,25,42216],[0,2,12,42192],[0,2,1,53584],[2,1,21,55592],[0,2,9,54560]];
  	
  	/**
  	 * 二十四节气数据，节气点时间（单位是分钟）
  	 * 从0小寒起算
  	 */
  	var termInfo = [0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758];
  	
  	/**
  	 * 判断农历年闰月数
  	 * @param {Number} year 农历年
  	 * return 闰月数 （月份从1开始）
  	 */
  	function getLunarLeapYear(year){
  		var yearData = lunarInfo[year-minYear];
  		return yearData[0];
  	}	
  	/**
  	 * 获取农历年份一年的每月的天数及一年的总天数
  	 * @param {Number} year 农历年
  	 */
  	function getLunarYearDays(year){
  		var yearData = lunarInfo[year-minYear];
  		var leapMonth = yearData[0]; //闰月
  		var monthData = yearData[3].toString(2);
  		var monthDataArr = monthData.split('');
  		
  		//还原数据至16位,少于16位的在前面插入0（二进制存储时前面的0被忽略）
  		for(var i=0;i<16-monthDataArr.length;i++){
  			monthDataArr.unshift(0);
  		}
  		
  		var len = leapMonth ? 13 : 12; //该年有几个月
  		var yearDays = 0;
  		var monthDays = [];
  		for(var i=0;i<len;i++){
  			if(monthDataArr[i]==0){
  				yearDays += 29;
  				monthDays.push(29);
  			}else{
  				yearDays += 30;
  				monthDays.push(30);
  			}
  		}
  		
  		return {
  			yearDays : yearDays,
  			monthDays : monthDays
  		};
  	}	
  	/**
  	 * 通过间隔天数查找农历日期
  	 * @param {Number} year,between 农历年，间隔天数
  	 */
  	function getLunarDateByBetween(year,between){
  		var lunarYearDays = getLunarYearDays(year);
  		var end = between>0 ? between : lunarYearDays.yearDays - Math.abs(between);
  		var monthDays = lunarYearDays.monthDays;
  		var tempDays = 0;
  		var month = 0;
  		for(var i=0;i<monthDays.length;i++){
  			tempDays += monthDays[i];
  			if(tempDays > end){
  				month = i;
  				tempDays = tempDays-monthDays[i];
  				break;
  			}
  		}
  		
  		return [year,month,end - tempDays + 1];
  	}
  	/**
  	 * 根据距离正月初一的天数计算农历日期
  	 * @param {Number} year 公历年，月，日
  	 */
  	function getLunarByBetween(year,month,day){
  		var yearData = lunarInfo[year-minYear];
  		var zenMonth = yearData[1];
  		var zenDay = yearData[2];
  		var between = getDaysBetweenSolar(year,zenMonth-1,zenDay,year,month,day);
  		if(between==0){ //正月初一
  			return [year,0,1];
  		}else{
  			var lunarYear = between>0 ? year : year-1;
  			return getLunarDateByBetween(lunarYear,between);
  		}
  	}	
  	/**
  	 * 两个公历日期之间的天数
  	 */
  	function getDaysBetweenSolar(year,month,day,year1,month1,day1){
  		var date = new Date(year,month,day).getTime();
  		var date1 = new Date(year1,month1,day1).getTime();
  		return (date1-date) / 86400000;
  	}	
  	/**
  	 * 计算农历日期离正月初一有多少天
  	 * @param {Number} year,month,day 农年，月(0-12，有闰月)，日
  	 */
  	function getDaysBetweenZheng(year,month,day){
  		var lunarYearDays = getLunarYearDays(year);
  		var monthDays = lunarYearDays.monthDays;
  		var days = 0;
  		for(var i=0;i<monthDays.length;i++){
  			if(i<month){
  				days += monthDays[i];
  			}else{
  				break;
  			}
  		}		return days+day-1;
  	}	
  	/**
  	 * 某年的第n个节气为几日
  	 * 31556925974.7为地球公转周期，是毫秒
  	 * 1890年的正小寒点：01-05 16:02:31，1890年为基准点
  	 * @param {Number} y 公历年
  	 * @param {Number} n 第几个节气，从0小寒起算
  	 * 由于农历24节气交节时刻采用近似算法，可能存在少量误差(30分钟内)
  	 */
  	function getTerm(y,n) {
  		var offDate = new Date( ( 31556925974.7*(y-1890) + termInfo[n]*60000  ) + Date.UTC(1890,0,5,16,2,31) );
  		return(offDate.getUTCDate());
  	}	
  	/**
  	 * 获取公历年一年的二十四节气
  	 * 返回key:日期，value:节气中文名
  	 */
  	function getYearTerm(year){
  		var res = {};
  		var month = 0;
  		for(var i=0;i<24;i++){
  			var day = getTerm(year,i);
  			if(i%2==0)month++;
  			res[formateDayD4(month-1,day)] = DATA.solarTerm[i];
  		}
  		return res;
  	}	
  	/**
  	 * 获取生肖
  	 * @param {Number} year 干支所在年（默认以立春前的公历年作为基数）
  	 */
  	function getYearZodiac(year){
  		 var num = year-1890+25; //参考干支纪年的计算，生肖对应地支
  		 return DATA.zodiac[num%12];
  	}	
  	/**
  	 * 计算天干地支
  	 * @param {Number} num 60进制中的位置(把60个天干地支，当成一个60进制的数)
  	 */
  	function cyclical(num) {
  		return(DATA.heavenlyStems[num%10]+DATA.earthlyBranches[num%12]);
  	}
  	
  	/**
  	 * 获取干支纪年
  	 * @param {Number} year 干支所在年
  	 * @param {Number} offset 偏移量，默认为0，便于查询一个年跨两个干支纪年（以立春为分界线）
  	 */
  	function getLunarYearName(year,offset){
  		offset = offset || 0;
  		//1890年1月小寒（小寒一般是1月5或6日）以前为己丑年，在60进制中排25
  		return cyclical(year-1890+25+offset);
  	}	
  	/**
  	 * 获取干支纪月
  	 * @param {Number} year,month 公历年，干支所在月
  	 * @param {Number} offset 偏移量，默认为0，便于查询一个月跨两个干支纪月（有立春的2月）
  	 */
  	function getLunarMonthName(year,month,offset){
  		offset = offset || 0;
  		//1890年1月小寒以前为丙子月，在60进制中排12
  		return cyclical((year-1890)*12+month+12+offset);
  	}	
  	/**
  	 * 获取干支纪日
  	 * @param {Number} year,month,day 公历年，月，日
  	 */
  	function getLunarDayName(year,month,day){
  		//当日与1890/1/1 相差天数
  		//1890/1/1与 1970/1/1 相差29219日, 1890/1/1 日柱为壬午日(60进制18)
  		var dayCyclical = Date.UTC(year,month,day)/86400000+29219+18;
  		return cyclical(dayCyclical);
  	}	
  	/**
  	 * 获取公历月份的天数
  	 * @param {Number} year 公历年
  	 * @param {Number} month 公历月
  	 */
  	function getSolarMonthDays(year,month){
  		 var monthDays = [31,isLeapYear(year)?29:28,31,30,31,30,31,31,30,31,30,31];
  		 return monthDays[month];
  	}	
  	/**
  	 * 判断公历年是否是闰年
  	 * @param {Number} year 公历年
  	 */
  	function isLeapYear(year){
  		return ((year%4==0 && year%100 !=0) || (year%400==0));
  	}		
  	/*
  	 * 统一日期输入参数（输入月份从1开始，内部月份统一从0开始）
  	 */
  	function formateDate(year,month,day,_minYear){
  		var argsLen = arguments.length;
  		var now = new Date();
  		year = argsLen ? parseInt(year,10) : now.getFullYear();
  		month = argsLen ? parseInt(month-1,10) : now.getMonth();
  		day = argsLen ? parseInt(day,10) || now.getDate() : now.getDate();
  		if(year < (_minYear ? _minYear : minYear+1) || year > maxYear)return {error:100, msg:errorCode[100]};
  		return {
  			year : year,
  			month : month,
  			day : day
  		};
  	}	
  	/**
  	 * 将农历转换为公历
  	 * @param {Number} year,month,day 农历年，月(1-13，有闰月)，日
  	 */
  	function lunarToSolar(_year,_month,_day){
  		var inputDate = formateDate(_year,_month,_day);
  		if(inputDate.error)return inputDate;
  		var year = inputDate.year;
  		var month = inputDate.month;
  		var day = inputDate.day;
  		
  		var between = getDaysBetweenZheng(year,month,day); //离正月初一的天数
  		var yearData = lunarInfo[year-minYear];
  		var zenMonth = yearData[1];
  		var zenDay = yearData[2];
  		
  		var offDate = new Date(year,zenMonth-1,zenDay).getTime() + between * 86400000;
  			offDate = new Date(offDate);
  		return {
  			year : offDate.getFullYear(),
  			month : offDate.getMonth()+1,
  			day : offDate.getDate()
  		};
  	}	
  	/**
  	 * 将公历转换为农历
  	 * @param {Number} year,month,day 公历年，月，日
  	 */
  	function solarToLunar(_year,_month,_day){
  		var inputDate = formateDate(_year,_month,_day,minYear);
  		if(inputDate.error)return inputDate;
  		var year = inputDate.year;
  		var month = inputDate.month;
  		var day = inputDate.day;
  		
  		cacheUtil.setCurrent(year);
  		//立春日期
  		var term2 = cacheUtil.get('term2') ? cacheUtil.get('term2') : cacheUtil.set('term2',getTerm(year,2));
  		//二十四节气
  		var termList = cacheUtil.get('termList') ? cacheUtil.get('termList') : cacheUtil.set('termList',getYearTerm(year));
  		
  		var firstTerm = getTerm(year,month*2); //某月第一个节气开始日期
  		var GanZhiYear = (month>1 || month==1 && day>=term2) ? year+1 : year;//干支所在年份
  		var GanZhiMonth = day>=firstTerm ? month+1 : month; //干支所在月份（以节气为界）
  		
  		var lunarDate = getLunarByBetween(year,month,day);
  		var lunarLeapMonth = getLunarLeapYear(lunarDate[0]);
  		var lunarMonthName = '';
  		if(lunarLeapMonth>0 && lunarLeapMonth==lunarDate[1]){
  			lunarMonthName = '闰'+DATA.monthCn[lunarDate[1]-1]+'月';
  		}else if(lunarLeapMonth>0 && lunarDate[1]>lunarLeapMonth){
  			lunarMonthName = DATA.monthCn[lunarDate[1]-1]+'月';
  		}else{
  			lunarMonthName = DATA.monthCn[lunarDate[1]]+'月';
  		}
  		
  		//农历节日判断
  		var lunarFtv = '';
  		var lunarMonthDays = getLunarYearDays(lunarDate[0]).monthDays;
  		//除夕
  		if(lunarDate[1] == lunarMonthDays.length-1 && lunarDate[2]==lunarMonthDays[lunarMonthDays.length-1]){
  			lunarFtv = lunarFestival['d0100'];
  		}else if(lunarLeapMonth>0 && lunarDate[1]>lunarLeapMonth){
  			lunarFtv = lunarFestival[formateDayD4(lunarDate[1]-1,lunarDate[2])];
  		}else{
  			lunarFtv = lunarFestival[formateDayD4(lunarDate[1],lunarDate[2])];
  		}
  		
  		var res = {
  			zodiac : getYearZodiac(GanZhiYear),
  			GanZhiYear : getLunarYearName(GanZhiYear),
  			GanZhiMonth : getLunarMonthName(year,GanZhiMonth),
  			GanZhiDay : getLunarDayName(year,month,day),
  			//放假安排：0无特殊安排，1工作，2放假
  			worktime : worktime['y'+year] && worktime['y'+year][formateDayD4(month,day)] ? worktime['y'+year][formateDayD4(month,day)] : 0,
  			term : termList[formateDayD4(month,day)],
  			
  			lunarYear : lunarDate[0],
  			lunarMonth : lunarDate[1]+1,
  			lunarDay : lunarDate[2],
  			lunarMonthName : lunarMonthName,
  			lunarDayName : DATA.dateCn[lunarDate[2]-1],
  			lunarLeapMonth : lunarLeapMonth,
  			
  			solarFestival : solarFestival[formateDayD4(month,day)],
  			lunarFestival : lunarFtv
  		};

  		return res;
  	}	
  	/**
  	 * 获取指定公历月份的农历数据
  	 * return res{Object}
  	 * @param {Number} year,month 公历年，月
  	 * @param {Boolean} fill 是否用上下月数据补齐首尾空缺，首例数据从周日开始
  	 */
  	function calendar(_year,_month,fill){
  		var inputDate = formateDate(_year,_month);
  		if(inputDate.error)return inputDate;
  		var year = inputDate.year;
  		var month = inputDate.month;
  		
  		var calendarData = solarCalendar(year,month+1,fill);
  		for(var i=0;i<calendarData.monthData.length;i++){
  			var cData = calendarData.monthData[i];
  			var lunarData = solarToLunar(cData.year,cData.month,cData.day);
  			extend(calendarData.monthData[i],lunarData);
  		}
  		return calendarData;
  	}	
  	/**
  	 * 公历某月日历
  	 * return res{Object}
  	 * @param {Number} year,month 公历年，月
  	 * @param {Boolean} fill 是否用上下月数据补齐首尾空缺，首例数据从周日开始 (7*6阵列)
  	 */
  	function solarCalendar(_year,_month,fill){
  		var inputDate = formateDate(_year,_month);
  		if(inputDate.error)return inputDate;
  		var year = inputDate.year;
  		var month = inputDate.month;
  		
  		var firstDate = new Date(year,month,1);
  		var preMonthDays,preMonthData,nextMonthData;
  		
  		var res = {
  			firstDay : firstDate.getDay(), //该月1号星期几
  			monthDays : getSolarMonthDays(year,month), //该月天数
  			monthData : []
  		};
  		
  		res.monthData = creatLenArr(year,month+1,res.monthDays,1);

  		if(fill){
  			if(res.firstDay > 0){ //前补
  				var preYear = month-1<0 ? year-1 : year;
  				var preMonth = month-1<0 ? 11 : month-1;
  				preMonthDays = getSolarMonthDays(preYear,preMonth);
  				preMonthData = creatLenArr(preYear,preMonth+1,res.firstDay,preMonthDays-res.firstDay+1);
  				res.monthData = preMonthData.concat(res.monthData);
  			}
  			
  			if(7*6 - res.monthData.length!=0){ //后补
  				var nextYear = month+1>11 ? year+1 : year;
  				var nextMonth = month+1>11 ? 0 : month+1;
  				var fillLen = 7*6 - res.monthData.length;
  				nextMonthData = creatLenArr(nextYear,nextMonth+1,fillLen,1);
  				res.monthData = res.monthData.concat(nextMonthData);
  			}
  		}
  		
  		return res;
  	}	
  	/**
  	 * 设置放假安排【对外暴露接口】
  	 * @param {Object} workData
  	 */
  	function setWorktime(workData){
  		extend(worktime,workData);
  	}
  	var LunarCalendar = {
  		solarToLunar : solarToLunar,
  		lunarToSolar : lunarToSolar,
  		calendar : calendar,
  		solarCalendar : solarCalendar,
  		setWorktime : setWorktime,
  		getSolarMonthDays : getSolarMonthDays
  	};
  	
  	{
  		module.exports = LunarCalendar;
  	}})();
  });

  var script = {
    name: 'TableDate',
    inject: {
      t: {
        default: function _default() {
          return getLocaleFieldValue;
        }
      },
      getWeek: {
        default: function _default() {
          return getWeek;
        }
      },
      prefixClass: {
        default: 'mx'
      }
    },
    props: {
      calendarYear: {
        type: Number,
        default: function _default() {
          return new Date().getFullYear();
        }
      },
      calendarMonth: {
        type: Number,
        default: function _default() {
          return new Date().getMonth();
        }
      },
      showWeekNumber: {
        type: Boolean,
        default: false
      },
      titleFormat: {
        type: String,
        default: 'YYYY-MM-DD'
      },
      getRowClasses: {
        type: Function,
        default: function _default() {
          return [];
        }
      },
      getCellClasses: {
        type: Function,
        default: function _default() {
          return [];
        }
      }
    },
    computed: {
      firstDayOfWeek: function firstDayOfWeek() {
        return this.t('formatLocale.firstDayOfWeek') || 0;
      },
      days: function days() {
        var days = this.t('days') || this.t('formatLocale.weekdaysMin');
        return days.concat(days).slice(this.firstDayOfWeek, this.firstDayOfWeek + 7);
      },
      dates: function dates() {
        var arr = [];
        var firstDayOfWeek = this.firstDayOfWeek;
        var year = this.calendarYear;
        var month = this.calendarMonth; // change to the last day of the last month

        var calendar = createDate(year, month, 0);
        var lastDayInLastMonth = calendar.getDate(); // getDay() 0 is Sunday, 1 is Monday

        var firstDayInLastMonth = lastDayInLastMonth - (calendar.getDay() + 7 - firstDayOfWeek) % 7;

        for (var i = firstDayInLastMonth; i <= lastDayInLastMonth; i++) {
          var day = i - lastDayInLastMonth;
          arr.push({
            day: day,
            text: i
          });
        } // change to the last day of the current month


        calendar.setMonth(month + 1, 0);
        var lastDayInCurrentMonth = calendar.getDate();

        for (var _i = 1; _i <= lastDayInCurrentMonth; _i++) {
          arr.push({
            day: _i,
            text: _i
          });
        }

        var lastMonthLength = lastDayInLastMonth - firstDayInLastMonth + 1;
        var nextMonthLength = 6 * 7 - lastMonthLength - lastDayInCurrentMonth;

        for (var _i2 = 1; _i2 <= nextMonthLength; _i2++) {
          arr.push({
            day: lastDayInCurrentMonth + _i2,
            text: _i2
          });
        }

        return chunk(arr, 7);
      }
    },
    methods: {
      formatDate: function formatDate(date, fmt) {
        return format(date, fmt, {
          locale: this.t('formatLocale')
        });
      },
      handleCellClick: function handleCellClick(evt) {
        var target = evt.target;

        if (target.tagName === 'DIV') {
          target = target.parentNode;
        }

        var day = target.getAttribute('data-day');

        if (day) {
          this.$emit('select', parseInt(day, 10));
        }
      },
      getCellTitle: function getCellTitle(day) {
        var year = this.calendarYear;
        var month = this.calendarMonth;
        var fmt = this.titleFormat;
        var date = createDate(year, month, day);
        return this.formatDate(date, fmt);
      },
      getWeekNumber: function getWeekNumber(day) {
        var year = this.calendarYear;
        var month = this.calendarMonth;
        var date = createDate(year, month, day);
        return this.getWeek(date, this.t('formatLocale'));
      },
      getTerm: function getTerm(date) {
        var info = LunarCalendar.solarToLunar.apply(LunarCalendar, _toConsumableArray(this.getCellTitle(date).split('-')));
        return info.term ? info.term : info.lunarDayName;
      }
    }
  };

  /* script */
  var __vue_script__ = script;
  /* template */

  var __vue_render__$2 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('table', {
      class: _vm.prefixClass + "-table " + _vm.prefixClass + "-table-date"
    }, [_c('thead', [_c('tr', [_vm.showWeekNumber ? _c('th', {
      class: _vm.prefixClass + "-week-number-header"
    }) : _vm._e(), _vm._v(" "), _vm._l(_vm.days, function (day) {
      return _c('th', {
        key: day
      }, [_vm._v(_vm._s(day))]);
    })], 2)]), _vm._v(" "), _c('tbody', {
      on: {
        "click": _vm.handleCellClick
      }
    }, _vm._l(_vm.dates, function (row, i) {
      return _c('tr', {
        key: i,
        class: [_vm.prefixClass + "-date-row", _vm.getRowClasses(row)]
      }, [_vm.showWeekNumber ? _c('td', {
        class: _vm.prefixClass + "-week-number"
      }, [_vm._v("\n        " + _vm._s(_vm.getWeekNumber(row[0].day)) + "\n      ")]) : _vm._e(), _vm._v(" "), _vm._l(row, function (cell, j) {
        return _c('td', {
          key: j,
          staticClass: "cell",
          class: _vm.getCellClasses(cell.day),
          attrs: {
            "data-day": cell.day,
            "title": _vm.getCellTitle(cell.day)
          }
        }, [_c('div', [_vm._v(_vm._s(cell.text))]), _vm._v(" "), _c('div', [_vm._v(_vm._s(_vm.getTerm(cell.day)))])]);
      })], 2);
    }), 0)]);
  };

  var __vue_staticRenderFns__$2 = [];
  /* style */

  var __vue_inject_styles__$2 = undefined;
  /* scoped */

  var __vue_scope_id__$2 = undefined;
  /* module identifier */

  var __vue_module_identifier__$2 = undefined;
  /* functional template */

  var __vue_is_functional_template__$2 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var TableDate = normalizeComponent({
    render: __vue_render__$2,
    staticRenderFns: __vue_staticRenderFns__$2
  }, __vue_inject_styles__$2, __vue_script__, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

  //
  var script$1 = {
    name: 'TableMonth',
    inject: {
      t: {
        default: function _default() {
          return getLocaleFieldValue;
        }
      },
      prefixClass: {
        default: 'mx'
      }
    },
    props: {
      getCellClasses: {
        type: Function,
        default: function _default() {
          return [];
        }
      }
    },
    computed: {
      months: function months() {
        var monthsLocale = this.t('months') || this.t('formatLocale.monthsShort');
        var months = monthsLocale.map(function (text, month) {
          return {
            text: text,
            month: month
          };
        });
        return chunk(months, 3);
      }
    },
    methods: {
      handleClick: function handleClick(evt) {
        var target = evt.target;

        if (target.tagName === 'DIV') {
          target = target.parentNode;
        }

        var month = target.getAttribute('data-month');

        if (month) {
          this.$emit('select', parseInt(month, 10));
        }
      }
    }
  };

  /* script */
  var __vue_script__$1 = script$1;
  /* template */

  var __vue_render__$3 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('table', {
      class: _vm.prefixClass + "-table " + _vm.prefixClass + "-table-month",
      on: {
        "click": _vm.handleClick
      }
    }, _vm._l(_vm.months, function (row, i) {
      return _c('tr', {
        key: i
      }, _vm._l(row, function (cell, j) {
        return _c('td', {
          key: j,
          staticClass: "cell",
          class: _vm.getCellClasses(cell.month),
          attrs: {
            "data-month": cell.month
          }
        }, [_c('div', [_vm._v(_vm._s(cell.text))])]);
      }), 0);
    }), 0);
  };

  var __vue_staticRenderFns__$3 = [];
  /* style */

  var __vue_inject_styles__$3 = undefined;
  /* scoped */

  var __vue_scope_id__$3 = undefined;
  /* module identifier */

  var __vue_module_identifier__$3 = undefined;
  /* functional template */

  var __vue_is_functional_template__$3 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var TableMonth = normalizeComponent({
    render: __vue_render__$3,
    staticRenderFns: __vue_staticRenderFns__$3
  }, __vue_inject_styles__$3, __vue_script__$1, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

  //
  var script$2 = {
    name: 'TableYear',
    inject: {
      prefixClass: {
        default: 'mx'
      }
    },
    props: {
      decade: Number,
      getCellClasses: {
        type: Function,
        default: function _default() {
          return [];
        }
      }
    },
    computed: {
      years: function years() {
        var firstYear = this.decade;
        var years = [];

        for (var i = 0; i < 10; i++) {
          years.push(firstYear + i);
        }

        return chunk(years, 2);
      }
    },
    methods: {
      handleClick: function handleClick(evt) {
        var target = evt.target;

        if (target.tagName === 'DIV') {
          target = target.parentNode;
        }

        var year = target.getAttribute('data-year');

        if (year) {
          this.$emit('select', parseInt(year, 10));
        }
      }
    }
  };

  /* script */
  var __vue_script__$2 = script$2;
  /* template */

  var __vue_render__$4 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('table', {
      class: _vm.prefixClass + "-table " + _vm.prefixClass + "-table-year",
      on: {
        "click": _vm.handleClick
      }
    }, _vm._l(_vm.years, function (row, i) {
      return _c('tr', {
        key: i
      }, _vm._l(row, function (cell, j) {
        return _c('td', {
          key: j,
          staticClass: "cell",
          class: _vm.getCellClasses(cell),
          attrs: {
            "data-year": cell
          }
        }, [_c('div', [_vm._v(_vm._s(cell))])]);
      }), 0);
    }), 0);
  };

  var __vue_staticRenderFns__$4 = [];
  /* style */

  var __vue_inject_styles__$4 = undefined;
  /* scoped */

  var __vue_scope_id__$4 = undefined;
  /* module identifier */

  var __vue_module_identifier__$4 = undefined;
  /* functional template */

  var __vue_is_functional_template__$4 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var TableYear = normalizeComponent({
    render: __vue_render__$4,
    staticRenderFns: __vue_staticRenderFns__$4
  }, __vue_inject_styles__$4, __vue_script__$2, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);

  var emitter = {
    methods: {
      dispatch: function dispatch(componentName) {
        var parent = this.$parent || this.$root;
        var name = parent.$options.name;

        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent;

          if (parent) {
            name = parent.$options.name;
          }
        }

        if (parent) {
          var _parent;

          for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            params[_key - 1] = arguments[_key];
          }

          (_parent = parent).$emit.apply(_parent, params);
        }
      }
    }
  };

  //
  var script$3 = {
    name: 'CalendarPanel',
    components: {
      TableDate: TableDate,
      TableMonth: TableMonth,
      TableYear: TableYear
    },
    mixins: [emitter],
    inject: {
      t: {
        default: function _default() {
          return getLocaleFieldValue;
        }
      },
      prefixClass: {
        default: 'mx'
      }
    },
    props: {
      value: {},
      defaultValue: {
        default: function _default() {
          var date = new Date();
          date.setHours(0, 0, 0, 0);
          return date;
        }
      },
      defaultPanel: {
        type: String
      },
      disabledDate: {
        type: Function,
        default: function _default() {
          return false;
        }
      },
      type: {
        type: String,
        default: 'date'
      },
      getClasses: {
        type: Function,
        default: function _default() {
          return [];
        }
      },
      showWeekNumber: {
        type: Boolean,
        default: undefined
      },
      titleFormat: {
        type: String,
        default: 'YYYY-MM-DD'
      },
      calendar: Date,
      // update date when select year or month
      partialUpdate: {
        type: Boolean,
        default: false
      }
    },
    data: function data() {
      var panels = ['date', 'month', 'year'];
      var index = Math.max(panels.indexOf(this.type), panels.indexOf(this.defaultPanel));
      var panel = index !== -1 ? panels[index] : 'date';
      return {
        panel: panel,
        innerCalendar: null
      };
    },
    computed: {
      innerValue: function innerValue() {
        var value = Array.isArray(this.value) ? this.value : [this.value];
        var map = {
          year: startOfYear,
          month: startOfMonth,
          date: startOfDay
        };
        var start = map[this.type] || map.date;
        return value.filter(isValidDate$1).map(function (v) {
          return start(v);
        });
      },
      calendarYear: function calendarYear() {
        return this.innerCalendar.getFullYear();
      },
      calendarMonth: function calendarMonth() {
        return this.innerCalendar.getMonth();
      },
      calendarDecade: function calendarDecade() {
        return Math.floor(this.calendarYear / 10) * 10;
      },
      showIconDoubleArrow: function showIconDoubleArrow() {
        return this.panel === 'date' || this.panel === 'month' || this.panel === 'year';
      },
      showIconArrow: function showIconArrow() {
        return this.panel === 'date';
      },
      dateHeader: function dateHeader() {
        var monthBeforeYear = this.t('monthBeforeYear');
        var yearFormat = this.t('yearFormat');
        var monthFormat = this.t('monthFormat') || 'MMM';
        var yearLabel = {
          panel: 'year',
          label: this.formatDate(this.innerCalendar, yearFormat)
        };
        var monthLabel = {
          panel: 'month',
          label: this.formatDate(this.innerCalendar, monthFormat)
        };
        return monthBeforeYear ? [monthLabel, yearLabel] : [yearLabel, monthLabel];
      }
    },
    watch: {
      value: {
        immediate: true,
        handler: 'initCalendar'
      },
      calendar: {
        handler: 'initCalendar'
      },
      defaultValue: {
        handler: 'initCalendar'
      }
    },
    methods: {
      formatDate: function formatDate(date, fmt) {
        return format(date, fmt, {
          locale: this.t('formatLocale')
        });
      },
      initCalendar: function initCalendar() {
        var calendarDate = this.calendar;

        if (!isValidDate$1(calendarDate)) {
          calendarDate = getValidDate(this.innerValue[0], this.defaultValue);
        }

        this.innerCalendar = calendarDate;
      },
      isDisabled: function isDisabled(date) {
        return this.disabledDate(new Date(date), this.innerValue);
      },
      emitDate: function emitDate(date, type) {
        if (!this.isDisabled(date)) {
          this.$emit('select', date, type); // someone need get the first selected date to set range value. (#429)

          this.dispatch('DatePicker', 'pick', date, type);
        }
      },
      updateCalendar: function updateCalendar(date) {
        var oldValue = new Date(this.innerCalendar);
        this.innerCalendar = date;
        this.$emit('update:calendar', date);
        this.dispatch('DatePicker', 'calendar-change', date, oldValue);
      },
      handelPanelChange: function handelPanelChange(panel) {
        this.panel = panel;
      },
      handleIconLeftClick: function handleIconLeftClick() {
        var nextCalendar = subMonths(this.innerCalendar, 1);
        this.updateCalendar(nextCalendar);
      },
      handleIconRightClick: function handleIconRightClick() {
        var nextCalendar = addMonths(this.innerCalendar, 1);
        this.updateCalendar(nextCalendar);
      },
      handleIconDoubleLeftClick: function handleIconDoubleLeftClick() {
        var nextCalendar = subYears(this.innerCalendar, this.panel === 'year' ? 10 : 1);
        this.updateCalendar(nextCalendar);
      },
      handleIconDoubleRightClick: function handleIconDoubleRightClick() {
        var nextCalendar = addYears(this.innerCalendar, this.panel === 'year' ? 10 : 1);
        this.updateCalendar(nextCalendar);
      },
      handleSelectYear: function handleSelectYear(year) {
        if (this.type === 'year') {
          var date = this.getCellDate(year, 'year');
          this.emitDate(date, 'year');
        } else {
          var nextCalendar = setYear(this.innerCalendar, year);
          this.updateCalendar(nextCalendar);
          this.handelPanelChange('month');

          if (this.partialUpdate && this.innerValue[0]) {
            var _date = setYear(this.innerValue[0], year);

            this.emitDate(_date, 'year');
          }
        }
      },
      handleSelectMonth: function handleSelectMonth(month) {
        if (this.type === 'month') {
          var date = this.getCellDate(month, 'month');
          this.emitDate(date, 'month');
        } else {
          var nextCalendar = setMonth(this.innerCalendar, month);
          this.updateCalendar(nextCalendar);
          this.handelPanelChange('date');

          if (this.partialUpdate && this.innerValue[0]) {
            var _date2 = setMonth(setYear(this.innerValue[0], this.calendarYear), month);

            this.emitDate(_date2, 'month');
          }
        }
      },
      handleSelectDate: function handleSelectDate(day) {
        var date = this.getCellDate(day, 'date');
        this.emitDate(date, this.type === 'week' ? 'week' : 'date');
      },
      getCellDate: function getCellDate(value, type) {
        if (type === 'year') {
          return createDate(value, 0);
        }

        if (type === 'month') {
          return createDate(this.calendarYear, value);
        }

        return createDate(this.calendarYear, this.calendarMonth, value);
      },
      getDateClasses: function getDateClasses(day) {
        var cellDate = this.getCellDate(day, 'date');
        var notCurrentMonth = cellDate.getMonth() !== this.calendarMonth;
        var classes = [];

        if (cellDate.getTime() === new Date().setHours(0, 0, 0, 0)) {
          classes.push('today');
        }

        if (notCurrentMonth) {
          classes.push('not-current-month');
        }

        var state = this.getStateClass(cellDate);

        if (!(state === 'active' && notCurrentMonth)) {
          classes.push(state);
        }

        return classes.concat(this.getClasses(cellDate, this.innerValue, classes.join(' ')));
      },
      getMonthClasses: function getMonthClasses(month) {
        if (this.type !== 'month') {
          return this.calendarMonth === month ? 'active' : '';
        }

        var classes = [];
        var cellDate = this.getCellDate(month, 'month');
        classes.push(this.getStateClass(cellDate));
        return classes.concat(this.getClasses(cellDate, this.innerValue, classes.join(' ')));
      },
      getYearClasses: function getYearClasses(year) {
        if (this.type !== 'year') {
          return this.calendarYear === year ? 'active' : '';
        }

        var classes = [];
        var cellDate = this.getCellDate(year, 'year');
        classes.push(this.getStateClass(cellDate));
        return classes.concat(this.getClasses(cellDate, this.innerValue, classes.join(' ')));
      },
      getStateClass: function getStateClass(cellDate) {
        if (this.isDisabled(cellDate)) {
          return 'disabled';
        }

        if (this.innerValue.some(function (v) {
          return v.getTime() === cellDate.getTime();
        })) {
          return 'active';
        }

        return '';
      },
      getWeekState: function getWeekState(row) {
        if (this.type !== 'week') return '';
        var start = this.getCellDate(row[0].day, 'date').getTime();
        var end = this.getCellDate(row[6].day, 'date').getTime();
        var active = this.innerValue.some(function (v) {
          var time = v.getTime();
          return time >= start && time <= end;
        });
        return active ? "".concat(this.prefixClass, "-active-week") : '';
      }
    }
  };

  /* script */
  var __vue_script__$3 = script$3;
  /* template */

  var __vue_render__$5 = function __vue_render__() {
    var _obj;

    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      class: [_vm.prefixClass + "-calendar", _vm.prefixClass + "-calendar-panel-" + _vm.panel, (_obj = {}, _obj[_vm.prefixClass + "-calendar-week-mode"] = _vm.type === 'week', _obj)]
    }, [_c('div', {
      class: _vm.prefixClass + "-calendar-header"
    }, [_c('button', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showIconDoubleArrow,
        expression: "showIconDoubleArrow"
      }],
      class: _vm.prefixClass + "-btn " + _vm.prefixClass + "-btn-text " + _vm.prefixClass + "-btn-icon-double-left",
      attrs: {
        "type": "button"
      },
      on: {
        "click": _vm.handleIconDoubleLeftClick
      }
    }, [_c('i', {
      class: _vm.prefixClass + "-icon-double-left"
    })]), _vm._v(" "), _c('button', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showIconArrow,
        expression: "showIconArrow"
      }],
      class: _vm.prefixClass + "-btn " + _vm.prefixClass + "-btn-text " + _vm.prefixClass + "-btn-icon-left",
      attrs: {
        "type": "button"
      },
      on: {
        "click": _vm.handleIconLeftClick
      }
    }, [_c('i', {
      class: _vm.prefixClass + "-icon-left"
    })]), _vm._v(" "), _c('button', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showIconDoubleArrow,
        expression: "showIconDoubleArrow"
      }],
      class: _vm.prefixClass + "-btn " + _vm.prefixClass + "-btn-text " + _vm.prefixClass + "-btn-icon-double-right",
      attrs: {
        "type": "button"
      },
      on: {
        "click": _vm.handleIconDoubleRightClick
      }
    }, [_c('i', {
      class: _vm.prefixClass + "-icon-double-right"
    })]), _vm._v(" "), _c('button', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showIconArrow,
        expression: "showIconArrow"
      }],
      class: _vm.prefixClass + "-btn " + _vm.prefixClass + "-btn-text " + _vm.prefixClass + "-btn-icon-right",
      attrs: {
        "type": "button"
      },
      on: {
        "click": _vm.handleIconRightClick
      }
    }, [_c('i', {
      class: _vm.prefixClass + "-icon-right"
    })]), _vm._v(" "), _c('span', {
      class: _vm.prefixClass + "-calendar-header-label"
    }, [_vm.panel === 'year' ? [_c('span', [_vm._v(_vm._s(_vm.calendarDecade))]), _vm._v(" "), _c('span', {
      class: _vm.prefixClass + "-calendar-decade-separator"
    }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.calendarDecade + 9))])] : _vm.panel === 'month' ? _c('button', {
      class: _vm.prefixClass + "-btn " + _vm.prefixClass + "-btn-text",
      attrs: {
        "type": "button"
      },
      on: {
        "click": function click($event) {
          return _vm.handelPanelChange('year');
        }
      }
    }, [_vm._v("\n        " + _vm._s(_vm.calendarYear) + "\n      ")]) : _vm.panel === 'date' ? _vm._l(_vm.dateHeader, function (item) {
      return _c('button', {
        key: item.panel,
        class: _vm.prefixClass + "-btn " + _vm.prefixClass + "-btn-text " + _vm.prefixClass + "-btn-current-" + item.panel,
        attrs: {
          "type": "button"
        },
        on: {
          "click": function click($event) {
            return _vm.handelPanelChange(item.panel);
          }
        }
      }, [_vm._v("\n          " + _vm._s(item.label) + "\n        ")]);
    }) : _vm._e()], 2)]), _vm._v(" "), _c('div', {
      class: _vm.prefixClass + "-calendar-content"
    }, [_c('table-year', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.panel === 'year',
        expression: "panel === 'year'"
      }],
      attrs: {
        "decade": _vm.calendarDecade,
        "get-cell-classes": _vm.getYearClasses
      },
      on: {
        "select": _vm.handleSelectYear
      }
    }), _vm._v(" "), _vm.type !== 'year' ? _c('table-month', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.panel === 'month',
        expression: "panel === 'month'"
      }],
      attrs: {
        "get-cell-classes": _vm.getMonthClasses
      },
      on: {
        "select": _vm.handleSelectMonth
      }
    }) : _vm._e(), _vm._v(" "), _vm.type !== 'year' && _vm.type !== 'month' ? _c('table-date', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.panel === 'date',
        expression: "panel === 'date'"
      }],
      attrs: {
        "calendar-year": _vm.calendarYear,
        "calendar-month": _vm.calendarMonth,
        "title-format": _vm.titleFormat,
        "show-week-number": typeof _vm.showWeekNumber === 'boolean' ? _vm.showWeekNumber : _vm.type === 'week',
        "get-cell-classes": _vm.getDateClasses,
        "get-row-classes": _vm.getWeekState
      },
      on: {
        "select": _vm.handleSelectDate
      }
    }) : _vm._e()], 1)]);
  };

  var __vue_staticRenderFns__$5 = [];
  /* style */

  var __vue_inject_styles__$5 = undefined;
  /* scoped */

  var __vue_scope_id__$5 = undefined;
  /* module identifier */

  var __vue_module_identifier__$5 = undefined;
  /* functional template */

  var __vue_is_functional_template__$5 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var CalendarPanel = normalizeComponent({
    render: __vue_render__$5,
    staticRenderFns: __vue_staticRenderFns__$5
  }, __vue_inject_styles__$5, __vue_script__$3, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);

  var CalendarRange = {
    name: 'CalendarRange',
    components: {
      CalendarPanel: CalendarPanel
    },
    inject: {
      prefixClass: {
        default: 'mx'
      }
    },
    props: _objectSpread2({}, CalendarPanel.props),
    data: function data() {
      return {
        innerValue: [],
        calendars: []
      };
    },
    computed: {
      // Minimum difference between start and end calendars
      calendarMinDiff: function calendarMinDiff() {
        var map = {
          date: 1,
          // type:date  min 1 month
          month: 1 * 12,
          // type:month min 1 year
          year: 10 * 12 // type:year  min 10 year

        };
        return map[this.type] || map.date;
      },
      calendarMaxDiff: function calendarMaxDiff() {
        return Infinity;
      },
      defaultValues: function defaultValues() {
        return Array.isArray(this.defaultValue) ? this.defaultValue : [this.defaultValue, this.defaultValue];
      }
    },
    watch: {
      value: {
        immediate: true,
        handler: function handler() {
          var _this = this;

          this.innerValue = isValidRangeDate(this.value) ? this.value : [new Date(NaN), new Date(NaN)];
          this.calendars = this.innerValue.map(function (v, i) {
            return getValidDate(v, _this.defaultValues[i]);
          });
          this.validateCalendars(1);
        }
      }
    },
    methods: {
      handleSelect: function handleSelect(date, type) {
        var _this$innerValue = _slicedToArray(this.innerValue, 2),
            startValue = _this$innerValue[0],
            endValue = _this$innerValue[1];

        if (isValidDate$1(startValue) && !isValidDate$1(endValue)) {
          if (startValue.getTime() > date.getTime()) {
            this.innerValue = [date, startValue];
          } else {
            this.innerValue = [startValue, date];
          }

          this.emitDate(this.innerValue, type);
        } else {
          this.innerValue = [date, new Date(NaN)];
        }
      },
      emitDate: function emitDate(dates, type) {
        this.$emit('select', dates, type);
      },
      updateStartCalendar: function updateStartCalendar(value) {
        this.calendars.splice(0, 1, value);
        this.validateCalendars(1);
      },
      updateEndCalendar: function updateEndCalendar(value) {
        this.calendars.splice(1, 1, value);
        this.validateCalendars(0);
      },
      validateCalendars: function validateCalendars(index) {
        var gap = this.getCalendarGap();

        if (gap) {
          var calendar = this.calendars[index];

          if (index === 0) {
            calendar = subMonths(calendar, gap);
          } else {
            calendar = addMonths(calendar, gap);
          }

          this.calendars.splice(index, 1, calendar);
        }
      },
      getCalendarGap: function getCalendarGap() {
        var diff = differenceInCalendarMonths(this.calendars[1], this.calendars[0]);
        var min = this.calendarMinDiff;
        var max = this.calendarMaxDiff;

        if (diff < min) {
          return min - diff;
        }

        if (diff > max) {
          return max - diff;
        }

        return 0;
      },
      getRangeClasses: function getRangeClasses(cellDate, currentDates, classnames) {
        var classes = [].concat(this.getClasses(cellDate, currentDates, classnames));

        if (!/disabled|active|not-current-month/.test(classnames) && currentDates.length === 2 && cellDate.getTime() > currentDates[0].getTime() && cellDate.getTime() < currentDates[1].getTime()) {
          classes.push('in-range');
        }

        return classes;
      }
    },
    render: function render() {
      var _this2 = this;

      var h = arguments[0];
      var calendarRange = this.calendars.map(function (calendar, index) {
        var props = _objectSpread2({}, _this2.$props, {
          calendar: calendar,
          value: _this2.innerValue,
          defaultValue: _this2.defaultValues[index],
          getClasses: _this2.getRangeClasses,
          // don't update when range is true
          partialUpdate: false
        });

        var on = {
          select: _this2.handleSelect,
          'update:calendar': index === 0 ? _this2.updateStartCalendar : _this2.updateEndCalendar
        };
        return h("calendar-panel", {
          "props": _objectSpread2({}, props),
          "on": _objectSpread2({}, on)
        });
      });
      var prefixClass = this.prefixClass;
      return h("div", {
        "class": "".concat(prefixClass, "-range-wrapper")
      }, [calendarRange]);
    }
  };

  var scrollBarWidth;
  function getScrollbarWidth () {
    if (typeof window === 'undefined') return 0;
    if (scrollBarWidth !== undefined) return scrollBarWidth;
    var outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    outer.style.width = '100px';
    outer.style.position = 'absolute';
    outer.style.top = '-9999px';
    document.body.appendChild(outer);
    var inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);
    scrollBarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.parentNode.removeChild(outer);
    return scrollBarWidth;
  }

  //
  var script$4 = {
    inject: {
      prefixClass: {
        default: 'mx'
      }
    },
    data: function data() {
      return {
        scrollbarWidth: 0,
        thumbTop: '',
        thumbHeight: ''
      };
    },
    created: function created() {
      this.scrollbarWidth = getScrollbarWidth();
      document.addEventListener('mouseup', this.handleDragend);
    },
    beforeDestroy: function beforeDestroy() {
      document.addEventListener('mouseup', this.handleDragend);
    },
    mounted: function mounted() {
      this.$nextTick(this.getThumbSize);
    },
    methods: {
      getThumbSize: function getThumbSize() {
        var wrap = this.$refs.wrap;
        if (!wrap) return;
        var heightPercentage = wrap.clientHeight * 100 / wrap.scrollHeight;
        this.thumbHeight = heightPercentage < 100 ? "".concat(heightPercentage, "%") : '';
      },
      handleScroll: function handleScroll(evt) {
        var el = evt.currentTarget;
        var scrollHeight = el.scrollHeight,
            scrollTop = el.scrollTop;
        this.thumbTop = "".concat(scrollTop * 100 / scrollHeight, "%");
      },
      handleDragstart: function handleDragstart(evt) {
        evt.stopImmediatePropagation();
        this._draggable = true;
        var offsetTop = this.$refs.thumb.offsetTop;
        this._prevY = evt.clientY - offsetTop;
        document.addEventListener('mousemove', this.handleDraging);
      },
      handleDraging: function handleDraging(evt) {
        if (!this._draggable) return;
        var clientY = evt.clientY;
        var wrap = this.$refs.wrap;
        var scrollHeight = wrap.scrollHeight,
            clientHeight = wrap.clientHeight;
        var offsetY = clientY - this._prevY;
        var top = offsetY * scrollHeight / clientHeight;
        wrap.scrollTop = top;
      },
      handleDragend: function handleDragend() {
        if (this._draggable) {
          this._draggable = false;
          document.removeEventListener('mousemove', this.handleDraging);
        }
      }
    }
  };

  /* script */
  var __vue_script__$4 = script$4;
  /* template */

  var __vue_render__$6 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      class: _vm.prefixClass + "-scrollbar",
      style: {
        position: 'relative',
        overflow: 'hidden'
      }
    }, [_c('div', {
      ref: "wrap",
      class: _vm.prefixClass + "-scrollbar-wrap",
      style: {
        marginRight: "-" + _vm.scrollbarWidth + "px"
      },
      on: {
        "scroll": _vm.handleScroll
      }
    }, [_vm._t("default")], 2), _vm._v(" "), _c('div', {
      class: _vm.prefixClass + "-scrollbar-track"
    }, [_c('div', {
      ref: "thumb",
      class: _vm.prefixClass + "-scrollbar-thumb",
      style: {
        height: _vm.thumbHeight,
        top: _vm.thumbTop
      },
      on: {
        "mousedown": _vm.handleDragstart
      }
    })])]);
  };

  var __vue_staticRenderFns__$6 = [];
  /* style */

  var __vue_inject_styles__$6 = undefined;
  /* scoped */

  var __vue_scope_id__$6 = undefined;
  /* module identifier */

  var __vue_module_identifier__$6 = undefined;
  /* functional template */

  var __vue_is_functional_template__$6 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var ScrollbarVertical = normalizeComponent({
    render: __vue_render__$6,
    staticRenderFns: __vue_staticRenderFns__$6
  }, __vue_inject_styles__$6, __vue_script__$4, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, undefined, undefined);

  //

  var padNumber = function padNumber(value) {
    value = parseInt(value, 10);
    return value < 10 ? "0".concat(value) : "".concat(value);
  };

  var generateOptions = function generateOptions(length, step, options) {
    if (Array.isArray(options)) {
      return options.filter(function (v) {
        return v >= 0 && v < length;
      });
    }

    if (step <= 0) {
      step = 1;
    }

    var arr = [];

    for (var i = 0; i < length; i += step) {
      arr.push(i);
    }

    return arr;
  };

  var scrollTo = function scrollTo(element, to) {
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    // jump to target if duration zero
    if (duration <= 0) {
      requestAnimationFrame(function () {
        element.scrollTop = to;
      });
      return;
    }

    var difference = to - element.scrollTop;
    var tick = difference / duration * 10;
    requestAnimationFrame(function () {
      var scrollTop = element.scrollTop + tick;

      if (scrollTop >= to) {
        element.scrollTop = to;
        return;
      }

      element.scrollTop = scrollTop;
      scrollTo(element, to, duration - 10);
    });
  };

  var script$5 = {
    name: 'ListColumns',
    components: {
      ScrollbarVertical: ScrollbarVertical
    },
    inject: {
      prefixClass: {
        default: 'mx'
      }
    },
    props: {
      date: Date,
      getClasses: {
        type: Function,
        default: function _default() {
          return [];
        }
      },
      hourOptions: Array,
      minuteOptions: Array,
      secondOptions: Array,
      showHour: {
        type: Boolean,
        default: true
      },
      showMinute: {
        type: Boolean,
        default: true
      },
      showSecond: {
        type: Boolean,
        default: true
      },
      hourStep: {
        type: Number,
        default: 1
      },
      minuteStep: {
        type: Number,
        default: 1
      },
      secondStep: {
        type: Number,
        default: 1
      },
      use12h: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      columns: function columns() {
        var cols = [];
        if (this.showHour) cols.push({
          type: 'hour',
          list: this.getHoursList()
        });
        if (this.showMinute) cols.push({
          type: 'minute',
          list: this.getMinutesList()
        });
        if (this.showSecond) cols.push({
          type: 'second',
          list: this.getSecondsList()
        });
        if (this.use12h) cols.push({
          type: 'ampm',
          list: this.getAMPMList()
        });
        return cols.filter(function (v) {
          return v.list.length > 0;
        });
      }
    },
    watch: {
      date: {
        handler: function handler() {
          var _this = this;

          this.$nextTick(function () {
            _this.scrollToSelected(100);
          });
        }
      }
    },
    mounted: function mounted() {
      this.scrollToSelected(0);
    },
    methods: {
      getHoursList: function getHoursList() {
        var _this2 = this;

        return generateOptions(this.use12h ? 12 : 24, this.hourStep, this.hourOptions).map(function (num) {
          var date = new Date(_this2.date);
          var text = padNumber(num);

          if (_this2.use12h) {
            if (num === 0) {
              text = '12';
            }

            if (date.getHours() >= 12) {
              num += 12;
            }
          }

          var value = date.setHours(num);
          return {
            value: value,
            text: text
          };
        });
      },
      getMinutesList: function getMinutesList() {
        var _this3 = this;

        return generateOptions(60, this.minuteStep, this.minuteOptions).map(function (num) {
          var value = new Date(_this3.date).setMinutes(num);
          return {
            value: value,
            text: padNumber(num)
          };
        });
      },
      getSecondsList: function getSecondsList() {
        var _this4 = this;

        return generateOptions(60, this.secondStep, this.secondOptions).map(function (num) {
          var value = new Date(_this4.date).setSeconds(num);
          return {
            value: value,
            text: padNumber(num)
          };
        });
      },
      getAMPMList: function getAMPMList() {
        var _this5 = this;

        return ['AM', 'PM'].map(function (text, i) {
          var date = new Date(_this5.date);
          var value = date.setHours(date.getHours() % 12 + i * 12);
          return {
            text: text,
            value: value
          };
        });
      },
      scrollToSelected: function scrollToSelected(duration) {
        var elements = this.$el.querySelectorAll('.active');

        for (var i = 0; i < elements.length; i++) {
          var element = elements[i];
          var scrollElement = getScrollParent(element, this.$el);

          if (scrollElement) {
            var to = element.offsetTop;
            scrollTo(scrollElement, to, duration);
          }
        }
      },
      handleSelect: function handleSelect(evt) {
        var target = evt.target,
            currentTarget = evt.currentTarget;
        if (target.tagName.toUpperCase() !== 'LI') return;
        var type = currentTarget.getAttribute('data-type');
        var colIndex = parseInt(currentTarget.getAttribute('data-index'), 10);
        var cellIndex = parseInt(target.getAttribute('data-index'), 10);
        var value = this.columns[colIndex].list[cellIndex].value;
        this.$emit('select', value, type);
      }
    }
  };

  /* script */
  var __vue_script__$5 = script$5;
  /* template */

  var __vue_render__$7 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      class: _vm.prefixClass + "-time-columns"
    }, _vm._l(_vm.columns, function (col, i) {
      return _c('scrollbar-vertical', {
        key: i,
        class: _vm.prefixClass + "-time-column"
      }, [_c('ul', {
        class: _vm.prefixClass + "-time-list",
        attrs: {
          "data-type": col.type,
          "data-index": i
        },
        on: {
          "click": _vm.handleSelect
        }
      }, _vm._l(col.list, function (item, j) {
        return _c('li', {
          key: item.value,
          class: [_vm.prefixClass + "-time-item", _vm.getClasses(item.value)],
          attrs: {
            "data-index": j
          }
        }, [_vm._v("\n        " + _vm._s(item.text) + "\n      ")]);
      }), 0)]);
    }), 1);
  };

  var __vue_staticRenderFns__$7 = [];
  /* style */

  var __vue_inject_styles__$7 = undefined;
  /* scoped */

  var __vue_scope_id__$7 = undefined;
  /* module identifier */

  var __vue_module_identifier__$7 = undefined;
  /* functional template */

  var __vue_is_functional_template__$7 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var ListColumns = normalizeComponent({
    render: __vue_render__$7,
    staticRenderFns: __vue_staticRenderFns__$7
  }, __vue_inject_styles__$7, __vue_script__$5, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, undefined, undefined);

  //

  function parseOption() {
    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var values = time.split(':');

    if (values.length >= 2) {
      var hours = parseInt(values[0], 10);
      var minutes = parseInt(values[1], 10);
      return {
        hours: hours,
        minutes: minutes
      };
    }

    return null;
  }

  var scrollTo$1 = function scrollTo(element, to) {
    if (element) {
      element.scrollTop = to;
    }
  };

  var script$6 = {
    name: 'ListOptions',
    components: {
      ScrollbarVertical: ScrollbarVertical
    },
    inject: {
      t: {
        default: function _default() {
          return getLocaleFieldValue;
        }
      },
      prefixClass: {
        default: 'mx'
      }
    },
    props: {
      date: Date,
      options: {
        type: [Object, Function],
        default: function _default() {
          return [];
        }
      },
      format: {
        type: String,
        default: 'HH:mm:ss'
      },
      getClasses: {
        type: Function,
        default: function _default() {
          return [];
        }
      }
    },
    computed: {
      list: function list() {
        var result = [];
        var options = this.options;

        if (typeof options === 'function') {
          return options() || [];
        }

        var start = parseOption(options.start);
        var end = parseOption(options.end);
        var step = parseOption(options.step);
        var fmt = options.format || this.format;

        if (start && end && step) {
          var startMinutes = start.minutes + start.hours * 60;
          var endMinutes = end.minutes + end.hours * 60;
          var stepMinutes = step.minutes + step.hours * 60;
          var len = Math.floor((endMinutes - startMinutes) / stepMinutes);

          for (var i = 0; i <= len; i++) {
            var timeMinutes = startMinutes + i * stepMinutes;
            var hours = Math.floor(timeMinutes / 60);
            var minutes = timeMinutes % 60;
            var value = new Date(this.date).setHours(hours, minutes, 0);
            result.push({
              value: value,
              text: this.formatDate(value, fmt)
            });
          }
        }

        return result;
      }
    },
    mounted: function mounted() {
      this.scrollToSelected();
    },
    methods: {
      formatDate: function formatDate(date, fmt) {
        return format(date, fmt, {
          locale: this.t('formatLocale')
        });
      },
      scrollToSelected: function scrollToSelected() {
        var element = this.$el.querySelector('.active');
        if (!element) return;
        var scrollElement = getScrollParent(element, this.$el);
        if (!scrollElement) return;
        var to = element.offsetTop;
        scrollTo$1(scrollElement, to);
      },
      handleSelect: function handleSelect(value) {
        this.$emit('select', value, 'time');
      }
    }
  };

  /* script */
  var __vue_script__$6 = script$6;
  /* template */

  var __vue_render__$8 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('scrollbar-vertical', _vm._l(_vm.list, function (item) {
      return _c('div', {
        key: item.value,
        class: [_vm.prefixClass + "-time-option", _vm.getClasses(item.value)],
        on: {
          "click": function click($event) {
            return _vm.handleSelect(item.value);
          }
        }
      }, [_vm._v("\n    " + _vm._s(item.text) + "\n  ")]);
    }), 0);
  };

  var __vue_staticRenderFns__$8 = [];
  /* style */

  var __vue_inject_styles__$8 = undefined;
  /* scoped */

  var __vue_scope_id__$8 = undefined;
  /* module identifier */

  var __vue_module_identifier__$8 = undefined;
  /* functional template */

  var __vue_is_functional_template__$8 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var ListOptions = normalizeComponent({
    render: __vue_render__$8,
    staticRenderFns: __vue_staticRenderFns__$8
  }, __vue_inject_styles__$8, __vue_script__$6, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, undefined, undefined);

  //
  var script$7 = {
    name: 'TimePanel',
    components: {
      ListColumns: ListColumns,
      ListOptions: ListOptions
    },
    inject: {
      t: {
        default: function _default() {
          return getLocaleFieldValue;
        }
      },
      prefixClass: {
        default: 'mx'
      }
    },
    props: {
      value: {},
      defaultValue: {
        default: function _default() {
          var date = new Date();
          date.setHours(0, 0, 0, 0);
          return date;
        }
      },
      format: {
        default: 'HH:mm:ss'
      },
      timeTitleFormat: {
        type: String,
        default: 'YYYY-MM-DD'
      },
      showTimeHeader: {
        type: Boolean,
        default: false
      },
      disabledTime: {
        type: Function,
        default: function _default() {
          return false;
        }
      },
      timePickerOptions: {
        type: [Object, Function],
        default: function _default() {
          return null;
        }
      },
      hourOptions: Array,
      minuteOptions: Array,
      secondOptions: Array,
      hourStep: {
        type: Number,
        default: 1
      },
      minuteStep: {
        type: Number,
        default: 1
      },
      secondStep: {
        type: Number,
        default: 1
      },
      showHour: {
        type: Boolean,
        default: undefined
      },
      showMinute: {
        type: Boolean,
        default: undefined
      },
      showSecond: {
        type: Boolean,
        default: undefined
      },
      use12h: {
        type: Boolean,
        default: undefined
      }
    },
    computed: {
      innerValue: function innerValue() {
        return getValidDate(this.value, this.defaultValue);
      },
      title: function title() {
        var titleFormat = this.timeTitleFormat;
        var date = new Date(this.innerValue);
        return this.formatDate(date, titleFormat);
      },
      innerForamt: function innerForamt() {
        return typeof this.format === 'string' ? this.format : 'HH:mm:ss';
      },
      ShowHourMinuteSecondAMPM: function ShowHourMinuteSecondAMPM() {
        var _this = this;

        var fmt = this.innerForamt;
        var defaultProps = {
          showHour: /[HhKk]/.test(fmt),
          showMinute: /m/.test(fmt),
          showSecond: /s/.test(fmt),
          use12h: /a/i.test(fmt)
        };
        var obj = {};
        Object.keys(defaultProps).forEach(function (key) {
          obj[key] = typeof _this[key] === 'boolean' ? _this[key] : defaultProps[key];
        });
        return obj;
      }
    },
    methods: {
      formatDate: function formatDate(date, fmt) {
        return format(date, fmt, {
          locale: this.t('formatLocale')
        });
      },
      isDisabled: function isDisabled(date) {
        return this.disabledTime(new Date(date));
      },
      handleSelect: function handleSelect(value, type) {
        var date = new Date(value);

        if (!this.isDisabled(value)) {
          this.$emit('select', date, type);
        }
      },
      handleClickTitle: function handleClickTitle() {
        this.$emit('title-click');
      },
      getClasses: function getClasses(value) {
        var cellDate = new Date(value);

        if (this.isDisabled(value)) {
          return 'disabled';
        }

        if (cellDate.getTime() === this.innerValue.getTime()) {
          return 'active';
        }

        return '';
      }
    }
  };

  /* script */
  var __vue_script__$7 = script$7;
  /* template */

  var __vue_render__$9 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      class: _vm.prefixClass + "-time"
    }, [_vm.showTimeHeader ? _c('div', {
      class: _vm.prefixClass + "-time-header"
    }, [_c('button', {
      class: _vm.prefixClass + "-btn " + _vm.prefixClass + "-btn-text " + _vm.prefixClass + "-time-header-title",
      attrs: {
        "type": "button"
      },
      on: {
        "click": _vm.handleClickTitle
      }
    }, [_vm._v("\n      " + _vm._s(_vm.title) + "\n    ")])]) : _vm._e(), _vm._v(" "), _c('div', {
      class: _vm.prefixClass + "-time-content"
    }, [_vm.timePickerOptions ? _c('list-options', {
      attrs: {
        "date": _vm.innerValue,
        "get-classes": _vm.getClasses,
        "options": _vm.timePickerOptions,
        "format": _vm.innerForamt
      },
      on: {
        "select": _vm.handleSelect
      }
    }) : _c('list-columns', _vm._b({
      attrs: {
        "date": _vm.innerValue,
        "get-classes": _vm.getClasses,
        "hour-options": _vm.hourOptions,
        "minute-options": _vm.minuteOptions,
        "second-options": _vm.secondOptions,
        "hour-step": _vm.hourStep,
        "minute-step": _vm.minuteStep,
        "second-step": _vm.secondStep
      },
      on: {
        "select": _vm.handleSelect
      }
    }, 'list-columns', _vm.ShowHourMinuteSecondAMPM, false))], 1)]);
  };

  var __vue_staticRenderFns__$9 = [];
  /* style */

  var __vue_inject_styles__$9 = undefined;
  /* scoped */

  var __vue_scope_id__$9 = undefined;
  /* module identifier */

  var __vue_module_identifier__$9 = undefined;
  /* functional template */

  var __vue_is_functional_template__$9 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var TimePanel = normalizeComponent({
    render: __vue_render__$9,
    staticRenderFns: __vue_staticRenderFns__$9
  }, __vue_inject_styles__$9, __vue_script__$7, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, undefined, undefined, undefined);

  var TimeRange = {
    name: 'TimeRange',
    inject: {
      prefixClass: {
        default: 'mx'
      }
    },
    props: _objectSpread2({}, TimePanel.props),
    data: function data() {
      return {
        startValue: new Date(NaN),
        endValue: new Date(NaN)
      };
    },
    watch: {
      value: {
        immediate: true,
        handler: function handler() {
          if (isValidRangeDate(this.value)) {
            var _this$value = _slicedToArray(this.value, 2),
                startValue = _this$value[0],
                endValue = _this$value[1];

            this.startValue = startValue;
            this.endValue = endValue;
          } else {
            this.startValue = new Date(NaN);
            this.endValue = new Date(NaN);
          }
        }
      }
    },
    methods: {
      emitChange: function emitChange(type, index) {
        var date = [this.startValue, this.endValue];
        this.$emit('select', date, type, index);
      },
      handleSelectStart: function handleSelectStart(date, type) {
        this.startValue = date; // check the NaN

        if (!(this.endValue.getTime() >= date.getTime())) {
          this.endValue = date;
        }

        this.emitChange(type, 0);
      },
      handleSelectEnd: function handleSelectEnd(date, type) {
        // check the NaN
        this.endValue = date;

        if (!(this.startValue.getTime() <= date.getTime())) {
          this.startValue = date;
        }

        this.emitChange(type, 1);
      },
      disabledStartTime: function disabledStartTime(date) {
        return this.disabledTime(date, 0);
      },
      disabledEndTime: function disabledEndTime(date) {
        return date.getTime() < this.startValue.getTime() || this.disabledTime(date, 1);
      }
    },
    render: function render() {
      var h = arguments[0];
      var defaultValues = Array.isArray(this.defaultValue) ? this.defaultValue : [this.defaultValue, this.defaultValue];
      var prefixClass = this.prefixClass;
      return h("div", {
        "class": "".concat(prefixClass, "-range-wrapper")
      }, [h(TimePanel, {
        "props": _objectSpread2({}, _objectSpread2({}, this.$props, {
          value: this.startValue,
          defaultValue: defaultValues[0],
          disabledTime: this.disabledStartTime
        })),
        "on": _objectSpread2({}, _objectSpread2({}, this.$listeners, {
          select: this.handleSelectStart
        }))
      }), h(TimePanel, {
        "props": _objectSpread2({}, _objectSpread2({}, this.$props, {
          value: this.endValue,
          defaultValue: defaultValues[1],
          disabledTime: this.disabledEndTime
        })),
        "on": _objectSpread2({}, _objectSpread2({}, this.$listeners, {
          select: this.handleSelectEnd
        }))
      })]);
    }
  };

  function _extends$1() {
    return _extends$1 = Object.assign || function (a) {
      for (var b, c = 1; c < arguments.length; c++) {
        for (var d in b = arguments[c], b) {
          Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        }
      }

      return a;
    }, _extends$1.apply(this, arguments);
  }

  var normalMerge = ["attrs", "props", "domProps"],
      toArrayMerge = ["class", "style", "directives"],
      functionalMerge = ["on", "nativeOn"],
      mergeJsxProps = function mergeJsxProps(a) {
    return a.reduce(function (c, a) {
      for (var b in a) {
        if (!c[b]) c[b] = a[b];else if (-1 !== normalMerge.indexOf(b)) c[b] = _extends$1({}, c[b], a[b]);else if (-1 !== toArrayMerge.indexOf(b)) {
          var d = c[b] instanceof Array ? c[b] : [c[b]],
              e = a[b] instanceof Array ? a[b] : [a[b]];
          c[b] = d.concat(e);
        } else if (-1 !== functionalMerge.indexOf(b)) {
          for (var f in a[b]) {
            if (c[b][f]) {
              var g = c[b][f] instanceof Array ? c[b][f] : [c[b][f]],
                  h = a[b][f] instanceof Array ? a[b][f] : [a[b][f]];
              c[b][f] = g.concat(h);
            } else c[b][f] = a[b][f];
          }
        } else if ("hook" == b) for (var i in a[b]) {
          c[b][i] = c[b][i] ? mergeFn(c[b][i], a[b][i]) : a[b][i];
        } else c[b] = a[b];
      }

      return c;
    }, {});
  },
      mergeFn = function mergeFn(a, b) {
    return function () {
      a && a.apply(this, arguments), b && b.apply(this, arguments);
    };
  };

  var helper = mergeJsxProps;

  var DatetimePanel = {
    name: 'DatetimePanel',
    inject: {
      prefixClass: {
        default: 'mx'
      }
    },
    props: _objectSpread2({}, CalendarPanel.props, {}, TimePanel.props, {
      showTimePanel: {
        type: Boolean,
        default: undefined
      }
    }),
    data: function data() {
      return {
        defaultTimeVisible: false,
        currentValue: this.value
      };
    },
    computed: {
      timeVisible: function timeVisible() {
        return typeof this.showTimePanel === 'boolean' ? this.showTimePanel : this.defaultTimeVisible;
      }
    },
    watch: {
      value: function value(val) {
        this.currentValue = val;
      }
    },
    methods: {
      closeTimePanel: function closeTimePanel() {
        this.defaultTimeVisible = false;
      },
      openTimePanel: function openTimePanel() {
        this.defaultTimeVisible = true;
      },
      emitDate: function emitDate(date, type) {
        this.$emit('select', date, type);
      },
      handleSelect: function handleSelect(date, type) {
        if (type === 'date') {
          this.openTimePanel();
        }

        var datetime = assignTime(date, getValidDate(this.value, this.defaultValue));

        if (this.disabledTime(new Date(datetime))) {
          // set the time of defalutValue;
          datetime = assignTime(date, this.defaultValue);

          if (this.disabledTime(new Date(datetime))) {
            // if disabled don't emit date
            this.currentValue = datetime;
            return;
          }
        }

        this.emitDate(datetime, type);
      }
    },
    render: function render() {
      var h = arguments[0];
      var calendarProps = {
        props: _objectSpread2({}, pick(this, Object.keys(CalendarPanel.props)), {
          type: 'date',
          value: this.currentValue
        }),
        on: {
          select: this.handleSelect
        }
      };
      var timeProps = {
        props: _objectSpread2({}, pick(this, Object.keys(TimePanel.props)), {
          showTimeHeader: true,
          value: this.currentValue
        }),
        on: {
          select: this.emitDate,
          'title-click': this.closeTimePanel
        }
      };
      var prefixClass = this.prefixClass;
      return h("div", [h(CalendarPanel, helper([{}, calendarProps])), this.timeVisible && h(TimePanel, helper([{
        "class": "".concat(prefixClass, "-calendar-time")
      }, timeProps]))]);
    }
  };

  var DatetimeRange = {
    name: 'DatetimeRange',
    inject: {
      prefixClass: {
        default: 'mx'
      }
    },
    props: _objectSpread2({}, CalendarRange.props, {}, TimeRange.props, {
      showTimePanel: {
        type: Boolean,
        default: undefined
      }
    }),
    data: function data() {
      return {
        defaultTimeVisible: false,
        currentValue: this.value
      };
    },
    computed: {
      timeVisible: function timeVisible() {
        return typeof this.showTimePanel === 'boolean' ? this.showTimePanel : this.defaultTimeVisible;
      }
    },
    watch: {
      value: function value(val) {
        this.currentValue = val;
      }
    },
    methods: {
      closeTimePanel: function closeTimePanel() {
        this.defaultTimeVisible = false;
      },
      openTimePanel: function openTimePanel() {
        this.defaultTimeVisible = true;
      },
      emitDate: function emitDate(dates, type) {
        this.$emit('select', dates, type);
      },
      handleSelect: function handleSelect(dates, type) {
        var _this = this;

        if (type === 'date') {
          this.openTimePanel();
        }

        var defaultValues = Array.isArray(this.defaultValue) ? this.defaultValue : [this.defaultValue, this.defaultValue];
        var datetimes = dates.map(function (date, i) {
          var time = isValidRangeDate(_this.value) ? _this.value[i] : defaultValues[i];
          return assignTime(date, time);
        });

        if (datetimes[1].getTime() < datetimes[0].getTime()) {
          datetimes = [datetimes[0], datetimes[0]];
        }

        if (datetimes.some(this.disabledTime)) {
          datetimes = dates.map(function (date, i) {
            return assignTime(date, defaultValues[i]);
          });

          if (datetimes.some(this.disabledTime)) {
            this.currentValue = datetimes;
            return;
          }
        }

        this.emitDate(datetimes, type);
      }
    },
    render: function render() {
      var h = arguments[0];
      var calendarProps = {
        props: _objectSpread2({}, pick(this, Object.keys(CalendarRange.props)), {
          type: 'date',
          value: this.currentValue
        }),
        on: {
          select: this.handleSelect
        }
      };
      var timeProps = {
        props: _objectSpread2({}, pick(this, Object.keys(TimeRange.props)), {
          value: this.currentValue,
          showTimeHeader: true
        }),
        on: {
          select: this.emitDate,
          'title-click': this.closeTimePanel
        }
      };
      var prefixClass = this.prefixClass;
      return h("div", [h(CalendarRange, helper([{}, calendarProps])), this.timeVisible && h(TimeRange, helper([{
        "class": "".concat(prefixClass, "-calendar-time")
      }, timeProps]))]);
    }
  };

  var componentMap = {
    default: CalendarPanel,
    time: TimePanel,
    datetime: DatetimePanel
  };
  var componentRangeMap = {
    default: CalendarRange,
    time: TimeRange,
    datetime: DatetimeRange
  };
  var script$8 = {
    name: 'DatePicker',
    components: {
      IconCalendar: IconCalendar,
      IconClose: IconClose,
      Popup: Popup
    },
    provide: function provide() {
      return {
        t: this.getLocaleFieldValue,
        getWeek: this.getWeek,
        prefixClass: this.prefixClass
      };
    },
    props: _objectSpread2({}, DatetimePanel.props, {
      value: {},
      valueType: {
        type: String,
        default: 'date' // date, format, timestamp, or token like 'YYYY-MM-DD'

      },
      type: {
        type: String,
        // ['date', 'datetime', 'time', 'year', 'month', 'week']
        default: 'date'
      },
      format: {
        type: [String, Object],
        default: function _default() {
          var map = {
            date: 'YYYY-MM-DD',
            datetime: 'YYYY-MM-DD HH:mm:ss',
            year: 'YYYY',
            month: 'YYYY-MM',
            time: 'HH:mm:ss',
            week: 'w'
          };
          return map[this.type] || map.date;
        }
      },
      range: {
        type: Boolean,
        default: false
      },
      rangeSeparator: {
        type: String,
        default: ' ~ '
      },
      lang: {
        type: [String, Object]
      },
      placeholder: {
        type: String,
        default: ''
      },
      editable: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      clearable: {
        type: Boolean,
        default: true
      },
      prefixClass: {
        type: String,
        default: 'mx'
      },
      inputClass: {
        default: function _default() {
          return "".concat(this.prefixClass, "-input");
        }
      },
      inputAttr: {
        type: Object,
        default: function _default() {
          return {};
        }
      },
      appendToBody: {
        type: Boolean,
        default: true
      },
      open: {
        type: Boolean,
        default: undefined
      },
      popupClass: {},
      popupStyle: {
        type: Object,
        default: function _default() {
          return {};
        }
      },
      inline: {
        type: Boolean,
        default: false
      },
      confirm: {
        type: Boolean,
        default: false
      },
      confirmText: {
        type: String,
        default: 'OK'
      },
      shortcuts: {
        type: Array,
        validator: function validator(value) {
          return Array.isArray(value) && value.every(function (v) {
            return isObject(v) && typeof v.text === 'string' && typeof v.onClick === 'function';
          });
        },
        default: function _default() {
          return [];
        }
      }
    }),
    data: function data() {
      return {
        // cache the innervalue, wait to confirm
        currentValue: null,
        userInput: null,
        defaultOpen: false
      };
    },
    computed: {
      currentComponent: function currentComponent() {
        var map = this.range ? componentRangeMap : componentMap;
        return map[this.type] || map.default;
      },
      currentComponentProps: function currentComponentProps() {
        var props = _objectSpread2({}, pick(this, Object.keys(this.currentComponent.props)), {
          value: this.currentValue
        });

        return props;
      },
      popupVisible: function popupVisible() {
        return !this.disabled && (typeof this.open === 'boolean' ? this.open : this.defaultOpen);
      },
      innerValue: function innerValue() {
        var value = this.value;

        if (this.range) {
          value = Array.isArray(value) ? value.slice(0, 2) : [null, null];
          return value.map(this.value2date);
        }

        return this.value2date(this.value);
      },
      text: function text() {
        var _this = this;

        if (this.userInput !== null) {
          return this.userInput;
        }

        if (!this.isValidValue(this.innerValue)) {
          return '';
        }

        var fmt = this.format;

        if (Array.isArray(this.innerValue)) {
          return this.innerValue.map(function (v) {
            return _this.formatDate(v, fmt);
          }).join(this.rangeSeparator);
        }

        return this.formatDate(this.innerValue, fmt);
      },
      showClearIcon: function showClearIcon() {
        return !this.disabled && this.clearable && this.text;
      },
      locale: function locale() {
        if (isObject(this.lang)) {
          return mergeDeep(getLocale(), this.lang);
        }

        return getLocale(this.lang);
      }
    },
    watch: {
      innerValue: {
        immediate: true,
        handler: function handler(val) {
          this.currentValue = val;
        }
      }
    },
    methods: {
      handleClickOutSide: function handleClickOutSide(evt) {
        var target = evt.target;

        if (!this.$el.contains(target)) {
          this.closePopup();
        }
      },
      getWeek: function getWeek$1(date, options) {
        if (isObject(this.format) && typeof this.format.getWeek === 'function') {
          return this.format.getWeek(date, options);
        }

        return getWeek(date, options);
      },
      parseDate: function parseDate(value, fmt) {
        if (isObject(this.format) && typeof this.format.parse === 'function') {
          return this.format.parse(value, fmt);
        }

        var backupDate = new Date();
        return parse(value, fmt, {
          locale: this.locale.formatLocale,
          backupDate: backupDate
        });
      },
      formatDate: function formatDate(date, fmt) {
        if (isObject(this.format) && typeof this.format.stringify === 'function') {
          return this.format.stringify(date, fmt);
        }

        return format(date, fmt, {
          locale: this.locale.formatLocale
        });
      },
      // transform the outer value to inner date
      value2date: function value2date(value) {
        switch (this.valueType) {
          case 'date':
            return value instanceof Date ? new Date(value.getTime()) : new Date(NaN);

          case 'timestamp':
            return typeof value === 'number' ? new Date(value) : new Date(NaN);

          case 'format':
            return typeof value === 'string' ? this.parseDate(value, this.format) : new Date(NaN);

          default:
            return typeof value === 'string' ? this.parseDate(value, this.valueType) : new Date(NaN);
        }
      },
      // transform the inner date to outer value
      date2value: function date2value(date) {
        if (!isValidDate$1(date)) return null;

        switch (this.valueType) {
          case 'date':
            return date;

          case 'timestamp':
            return date.getTime();

          case 'format':
            return this.formatDate(date, this.format);

          default:
            return this.formatDate(date, this.valueType);
        }
      },
      emitValue: function emitValue(date, type) {
        // fix IE11/10 trigger input event when input is focused. (placeholder !== '')
        this.userInput = null;
        var value = Array.isArray(date) ? date.map(this.date2value) : this.date2value(date);
        this.$emit('input', value);
        this.$emit('change', value, type);
        this.afterEmitValue(type);
        return value;
      },
      afterEmitValue: function afterEmitValue(type) {
        // this.type === 'datetime', click the time should close popup
        if (!type || type === this.type || type === 'time') {
          this.closePopup();
        }
      },
      isValidValue: function isValidValue(value) {
        var validate = this.range ? isValidRangeDate : isValidDate$1;
        return validate(value);
      },
      handleSelectDate: function handleSelectDate(val, type) {
        if (this.confirm) {
          this.currentValue = val;
        } else {
          this.emitValue(val, type);
        }
      },
      handleClear: function handleClear() {
        this.emitValue(this.range ? [null, null] : null);
        this.$emit('clear');
      },
      handleConfirmDate: function handleConfirmDate() {
        var value = this.emitValue(this.currentValue);
        this.$emit('confirm', value);
      },
      handleSelectShortcut: function handleSelectShortcut(item) {
        if (isObject(item) && typeof item.onClick === 'function') {
          var date = item.onClick(this);

          if (date) {
            this.emitValue(date);
          }
        }
      },
      openPopup: function openPopup() {
        if (this.popupVisible) return;
        this.defaultOpen = true;
        this.$emit('open');
        this.$emit('update:open', true);
      },
      closePopup: function closePopup() {
        if (!this.popupVisible) return;
        this.defaultOpen = false;
        this.$emit('close');
        this.$emit('update:open', false);
      },
      blur: function blur() {
        this.$refs.input.blur();
      },
      focus: function focus() {
        this.$refs.input.focus();
      },
      handleInputChange: function handleInputChange() {
        var _this2 = this;

        if (!this.editable || this.userInput === null) return;
        var text = this.userInput.trim();
        this.userInput = null;

        if (text === '') {
          this.handleClear();
          return;
        }

        var date;

        if (this.range) {
          var arr = text.split(this.rangeSeparator);

          if (arr.length !== 2) {
            arr = text.split(this.rangeSeparator.trim());
          }

          date = arr.map(function (v) {
            return _this2.parseDate(v.trim(), _this2.format);
          });
        } else {
          date = this.parseDate(text, this.format);
        }

        if (this.isValidValue(date)) {
          this.emitValue(date);
          this.blur();
        } else {
          this.$emit('input-error', text);
        }
      },
      handleInputInput: function handleInputInput(evt) {
        this.userInput = evt.target.value;
      },
      handleInputKeydown: function handleInputKeydown(evt) {
        var keyCode = evt.keyCode; // Tab 9 or Enter 13

        if (keyCode === 9) {
          this.closePopup();
        } else if (keyCode === 13) {
          this.handleInputChange();
        }
      },
      handleInputBlur: function handleInputBlur(evt) {
        // tab close
        this.$emit('blur', evt);
      },
      handleInputFocus: function handleInputFocus(evt) {
        this.openPopup();
        this.$emit('focus', evt);
      },
      hasSlot: function hasSlot(name) {
        return !!(this.$slots[name] || this.$scopedSlots[name]);
      },
      getLocaleFieldValue: function getLocaleFieldValue$1(path) {
        return getLocaleFieldValue(path, this.locale);
      }
    }
  };

  var __vue_script__$8 = script$8;
  /* template */

  var __vue_render__$a = function __vue_render__() {
    var _obj;

    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      class: (_obj = {}, _obj[_vm.prefixClass + "-datepicker"] = true, _obj[_vm.prefixClass + "-datepicker-range"] = _vm.range, _obj[_vm.prefixClass + "-datepicker-inline"] = _vm.inline, _obj.disabled = _vm.disabled, _obj)
    }, [!_vm.inline ? _c('div', {
      class: _vm.prefixClass + "-input-wrapper",
      on: {
        "mousedown": _vm.openPopup,
        "touchstart": _vm.openPopup
      }
    }, [_vm._t("input", [_c('input', _vm._b({
      ref: "input",
      class: _vm.inputClass,
      attrs: {
        "disabled": _vm.disabled,
        "readonly": !_vm.editable,
        "placeholder": _vm.placeholder
      },
      on: {
        "keydown": _vm.handleInputKeydown,
        "focus": _vm.handleInputFocus,
        "blur": _vm.handleInputBlur,
        "input": _vm.handleInputInput,
        "change": _vm.handleInputChange
      }
    }, 'input', _extends({}, {
      name: 'date',
      type: 'text',
      autocomplete: 'off',
      value: _vm.text
    }, _vm.inputAttr), false))]), _vm._v(" "), _vm.showClearIcon ? _c('i', {
      class: _vm.prefixClass + "-icon-clear",
      on: {
        "mousedown": function mousedown($event) {
          $event.stopPropagation();
          return _vm.handleClear($event);
        }
      }
    }, [_vm._t("icon-clear", [_c('icon-close')])], 2) : _vm._e(), _vm._v(" "), _c('i', {
      class: _vm.prefixClass + "-icon-calendar"
    }, [_vm._t("icon-calendar", [_c('icon-calendar')])], 2)], 2) : _vm._e(), _vm._v(" "), _c('Popup', {
      ref: "popup",
      class: _vm.popupClass,
      style: _vm.popupStyle,
      attrs: {
        "inline": _vm.inline,
        "visible": _vm.popupVisible,
        "append-to-body": _vm.appendToBody
      },
      on: {
        "clickoutside": _vm.handleClickOutSide
      }
    }, [_vm.hasSlot('sidebar') || _vm.shortcuts.length ? _c('div', {
      class: _vm.prefixClass + "-datepicker-sidebar"
    }, [_vm._t("sidebar", null, {
      "value": _vm.currentValue,
      "emit": _vm.emitValue
    }), _vm._v(" "), _vm._l(_vm.shortcuts, function (v, i) {
      return _c('button', {
        key: i,
        class: _vm.prefixClass + "-btn " + _vm.prefixClass + "-btn-text " + _vm.prefixClass + "-btn-shortcut",
        attrs: {
          "type": "button"
        },
        on: {
          "click": function click($event) {
            return _vm.handleSelectShortcut(v);
          }
        }
      }, [_vm._v("\n        " + _vm._s(v.text) + "\n      ")]);
    })], 2) : _vm._e(), _vm._v(" "), _c('div', {
      class: _vm.prefixClass + "-datepicker-content"
    }, [_vm.hasSlot('header') ? _c('div', {
      class: _vm.prefixClass + "-datepicker-header"
    }, [_vm._t("header", null, {
      "value": _vm.currentValue,
      "emit": _vm.emitValue
    })], 2) : _vm._e(), _vm._v(" "), _c('div', {
      class: _vm.prefixClass + "-datepicker-body"
    }, [_vm._t("content", [_c(_vm.currentComponent, _vm._b({
      ref: "picker",
      tag: "component",
      on: {
        "select": _vm.handleSelectDate
      }
    }, 'component', _vm.currentComponentProps, false))], {
      "value": _vm.currentValue,
      "emit": _vm.emitValue
    })], 2), _vm._v(" "), _vm.hasSlot('footer') || _vm.confirm ? _c('div', {
      class: _vm.prefixClass + "-datepicker-footer"
    }, [_vm._t("footer", null, {
      "value": _vm.currentValue,
      "emit": _vm.emitValue
    }), _vm._v(" "), _vm.confirm ? _c('button', {
      class: _vm.prefixClass + "-btn " + _vm.prefixClass + "-datepicker-btn-confirm",
      attrs: {
        "type": "button"
      },
      on: {
        "click": _vm.handleConfirmDate
      }
    }, [_vm._v("\n          " + _vm._s(_vm.confirmText) + "\n        ")]) : _vm._e()], 2) : _vm._e()])])], 1);
  };

  var __vue_staticRenderFns__$a = [];
  /* style */

  var __vue_inject_styles__$a = undefined;
  /* scoped */

  var __vue_scope_id__$a = undefined;
  /* module identifier */

  var __vue_module_identifier__$a = undefined;
  /* functional template */

  var __vue_is_functional_template__$a = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var DatePicker = normalizeComponent({
    render: __vue_render__$a,
    staticRenderFns: __vue_staticRenderFns__$a
  }, __vue_inject_styles__$a, __vue_script__$8, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, undefined, undefined, undefined);

  DatePicker.locale = locale$1;

  DatePicker.install = function install(Vue) {
    Vue.component(DatePicker.name, DatePicker);
  };

  if (typeof window !== 'undefined' && window.Vue) {
    DatePicker.install(window.Vue);
  }

  _extends(DatePicker, {
    CalendarPanel: CalendarPanel,
    CalendarRange: CalendarRange,
    TimePanel: TimePanel,
    TimeRange: TimeRange,
    DatetimePanel: DatetimePanel,
    DatetimeRange: DatetimeRange
  });

  return DatePicker;

})));
//# sourceMappingURL=index.js.map
