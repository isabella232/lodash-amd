/**
 * Lo-Dash 2.0.0 (Custom Build) <http://lodash.com/>
 * Build: `lodash modern modularize exports="amd" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['../internals/reNative'], function(reNative) {

  /** `Object#toString` result shortcuts */
  var arrayClass = '[object Array]';

  /** Used for native method references */
  var objectProto = Object.prototype;

  /** Native method shortcuts */
  var toString = objectProto.toString;

  /* Native method shortcuts for methods with the same name as other `lodash` methods */
  var nativeIsArray = reNative.test(nativeIsArray = Array.isArray) && nativeIsArray;

  /**
   * Checks if `value` is an array.
   *
   * @static
   * @memberOf _
   * @type Function
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if the `value` is an array, else `false`.
   * @example
   *
   * (function() { return _.isArray(arguments); })();
   * // => false
   *
   * _.isArray([1, 2, 3]);
   * // => true
   */
  var isArray = nativeIsArray || function(value) {
    return (value && typeof value == 'object') ? toString.call(value) == arrayClass : false;
  };

  return isArray;
});
