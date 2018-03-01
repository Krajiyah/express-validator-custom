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
    valueGreaterThan: function(param, value) {
      return param > value;
    },
    isNonEmptyArray: function(value) {
      return (Array.isArray(value)) && (value.length > 0);
    },
    isFnTrue: function(param, fn) {
      try {
        return fn(param) === true;
      } catch (e) {
        return false;
      }
    },
    isAsyncFnTrue: function(param, fn) {
      return _promiseBoolTrue(function() {
        return fn(param);
      });
    },
    isValidNumber: function(param) {
      var num = +param;
      return !isNaN(num);
    },
    isValidUrl: function(param) {
      return isUrl(param);
    }
  }
});
