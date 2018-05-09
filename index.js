// DEPENDENCIES
const expressValidator = require('express-validator');
const isUrl = require('is-url');
const fs = require("fs");

// HELPERS
let _promiseBoolTrue = fn => {
  return new Promise((resolve, reject) => {
    return fn().then(success => {
      if (success) resolve();
      else reject();
    }).catch(error => reject());
  });
}

// EXPORTS
module.exports = expressValidator({
  customValidators: {
    isValidBool: function(param) {
      return param === true || param === false;
    },
    isTrue: function(param) {
      return param === true;
    },
    isFalse: function(param) {
      return param === false;
    },
    isValidFile: function(param) {
      return param && param.path && fs.existsSync(param.path);
    },
    valueLessThan: function(param, value) {
      return param < value;
    },
    valueLessThanOrEqualTo: function(param, value) {
      return param <= value;
    },
    valueGreaterThan: function(param, value) {
      return param > value;
    },
    valueGreaterThanOrEqualTo: function(param, value) {
      return param >= value;
    },
    isObject: function(value) {
      return !Array.isArray(value) && typeof(value) == "object";
    },
    isNonEmptyObject: function(value) {
      return !Array.isArray(value) && typeof(value) == "object" && Object
        .keys(value).length > 0;
    },
    isArray: function(value) {
      return Array.isArray(value);
    },
    isNonEmptyArray: function(value) {
      return (Array.isArray(value)) && (value.length > 0);
    },
    isValidString: function(param) {
      return typeof(param) == "string";
    },
    isValidNumber: function(param) {
      return typeof(param) == "number";
    },
    isValidUrl: function(param) {
      return isUrl(param);
    },
    isFnTrue: function(param, fn) {
      try {
        return fn(param) === true;
      } catch (e) {
        return false;
      }
    },
    isAsyncFnTrue: function(param, fn) {
      return _promiseBoolTrue(async function() {
        try {
          let b = await fn(param);
          return b === true;
        } catch (e) {
          return false;
        }
      });
    }
  }
});
