/**
 * Lo-Dash 2.5.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="amd" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['./baseForIn', '../objects/isFunction'], function(baseForIn, isFunction) {

  /** Used as a safe reference for `undefined` in pre ES5 environments */
  var undefined;

  /** `Object#toString` result shortcuts */
  var argsClass = '[object Arguments]',
      arrayClass = '[object Array]',
      boolClass = '[object Boolean]',
      dateClass = '[object Date]',
      errorClass = '[object Error]',
      funcClass = '[object Function]',
      mapClass = '[object Map]',
      numberClass = '[object Number]',
      objectClass = '[object Object]',
      regexpClass = '[object RegExp]',
      setClass = '[object Set]',
      stringClass = '[object String]',
      weakMapClass = '[object WeakMap]';

  var arrayBufferClass = '[object ArrayBuffer]',
      float32Class = '[object Float32Array]',
      float64Class = '[object Float64Array]',
      int8Class = '[object Int8Array]',
      int16Class = '[object Int16Array]',
      int32Class = '[object Int32Array]',
      uint8Class = '[object Uint8Array]',
      uint8ClampedClass = '[object Uint8ClampedArray]',
      uint16Class = '[object Uint16Array]',
      uint32Class = '[object Uint32Array]';

  /** Used to identify object classifications that are treated like arrays */
  var arrayLikeClasses = {};
  arrayLikeClasses[argsClass] =
  arrayLikeClasses[arrayClass] = arrayLikeClasses[float32Class] =
  arrayLikeClasses[float64Class] = arrayLikeClasses[int8Class] =
  arrayLikeClasses[int16Class] = arrayLikeClasses[int32Class] =
  arrayLikeClasses[uint8Class] = arrayLikeClasses[uint8ClampedClass] =
  arrayLikeClasses[uint16Class] = arrayLikeClasses[uint32Class] = true;
  arrayLikeClasses[arrayBufferClass] = arrayLikeClasses[boolClass] =
  arrayLikeClasses[dateClass] = arrayLikeClasses[errorClass] =
  arrayLikeClasses[funcClass] = arrayLikeClasses[mapClass] =
  arrayLikeClasses[numberClass] = arrayLikeClasses[objectClass] =
  arrayLikeClasses[regexpClass] = arrayLikeClasses[setClass] =
  arrayLikeClasses[stringClass] = arrayLikeClasses[weakMapClass] = false;

  /** Used for native method references */
  var objectProto = Object.prototype;

  /** Used to resolve the internal `[[Class]]` of values */
  var toString = objectProto.toString;

  /** Native method shortcuts */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * The base implementation of `_.isEqual`, without support for `thisArg`
   * binding, which allows partial "_.where" style comparisons.
   *
   * @private
   * @param {*} value The value to compare to `other`.
   * @param {*} other The value to compare to `value`.
   * @param {Function} [callback] The function to customize comparing values.
   * @param {Function} [isWhere=false] A flag to indicate performing partial comparisons.
   * @param {Array} [stackA=[]] Tracks traversed `value` objects.
   * @param {Array} [stackB=[]] Tracks traversed `other` objects.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   */
  function baseIsEqual(value, other, callback, isWhere, stackA, stackB) {
    var result = callback && !stackA ? callback(value, other) : undefined;
    if (typeof result != 'undefined') {
      return !!result;
    }
    // exit early for identical values
    if (value === other) {
      // treat `+0` vs. `-0` as not equal
      return value !== 0 || (1 / value == 1 / other);
    }
    var valType = typeof value,
        othType = typeof other;

    // exit early for unlike primitive values
    if (value === value && (value == null || other == null ||
        (valType != 'function' && valType != 'object' && othType != 'function' && othType != 'object'))) {
      return false;
    }
    var valClass = toString.call(value),
        othClass = toString.call(other),
        valIsArg = valClass == argsClass,
        othIsArg = othClass == argsClass;

    if (valIsArg) {
      valClass = objectClass;
    }
    if (othIsArg) {
      othClass = objectClass;
    }
    if (valClass != othClass) {
      return false;
    }
    switch (valClass) {
      case boolClass:
      case dateClass:
        // coerce dates and booleans to numbers, dates to milliseconds and booleans
        // to `1` or `0` treating invalid dates coerced to `NaN` as not equal
        return +value == +other;

      case numberClass:
        // treat `NaN` vs. `NaN` as equal
        return (value != +value)
          ? other != +other
          // but treat `-0` vs. `+0` as not equal
          : (value == 0 ? (1 / value == 1 / other) : value == +other);

      case errorClass:
      case regexpClass:
      case stringClass:
        // coerce errors (http://es5.github.io/#x15.11.4.4)
        // and regexes (http://es5.github.io/#x15.10.6.4) to strings
        // treat string primitives and their corresponding object instances as equal
        return value == String(other);
    }
    var isArr = arrayLikeClasses[valClass];
    if (!isArr) {
      // exit for functions and DOM nodes
      if (valClass != objectClass) {
        return false;
      }
      // unwrap any `lodash` wrapped values
      var valWrapped = hasOwnProperty.call(value, '__wrapped__'),
          othWrapped = hasOwnProperty.call(other, '__wrapped__');

      if (valWrapped || othWrapped) {
        return baseIsEqual(valWrapped ? value.__wrapped__ : value, othWrapped ? other.__wrapped__ : other, callback, isWhere, stackA, stackB);
      }
      var hasValCtor = !valIsArg && hasOwnProperty.call(value, 'constructor'),
          hasOthCtor = !othIsArg && hasOwnProperty.call(other, 'constructor');

      if (hasValCtor != hasOthCtor) {
        return false;
      }
      if (!hasValCtor) {
        // in older versions of Opera, `arguments` objects have `Array` constructors
        var valCtor = valIsArg ? Object : value.constructor,
            othCtor = othIsArg ? Object : other.constructor;

        // non `Object` object instances with different constructors are not equal
        if (valCtor != othCtor &&
              !(isFunction(valCtor) && valCtor instanceof valCtor && isFunction(othCtor) && othCtor instanceof othCtor) &&
              ('constructor' in value && 'constructor' in other)
            ) {
          return false;
        }
      }
    }
    // assume cyclic structures are equal
    // the algorithm for detecting cyclic structures is adapted from ES 5.1
    // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
    stackA || (stackA = []);
    stackB || (stackB = []);

    var length = stackA.length;
    while (length--) {
      if (stackA[length] == value) {
        return stackB[length] == other;
      }
    }
    result = true;

    // add `value` and `other` to the stack of traversed objects
    stackA.push(value);
    stackB.push(other);

    // recursively compare objects and arrays (susceptible to call stack limits)
    if (isArr) {
      // compare lengths to determine if a deep comparison is necessary
      var othLength = other.length;
      length = value.length;
      result = othLength == length;

      if (result || isWhere) {
        var othIndex = -1;

        // deep compare the contents, ignoring non-numeric properties
        while (++othIndex < othLength) {
          var othValue = other[othIndex];

          if (isWhere) {
            var index = -1;
            while (++index < length) {
              result = baseIsEqual(value[index], othValue, callback, isWhere, stackA, stackB);
              if (result) {
                break;
              }
            }
          } else {
            var valValue = value[othIndex];
            result = callback ? callback(valValue, othValue, othIndex) : undefined;
            result = typeof result == 'undefined'
              ? baseIsEqual(valValue, othValue, callback, isWhere, stackA, stackB)
              : !!result;
          }
          if (!result) {
            break;
          }
        }
      }
    }
    else {
      var size = 0;

      // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`
      // which, in this case, is more costly
      baseForIn(other, function(othValue, key, other) {
        if (hasOwnProperty.call(other, key)) {
          result = false;
          // count the number of properties
          size++;
          // deep compare each property value
          if (hasOwnProperty.call(value, key)) {
            var valValue = value[key];
            result = callback ? callback(valValue, othValue, key) : undefined;
            result = typeof result == 'undefined'
              ? baseIsEqual(valValue, othValue, callback, isWhere, stackA, stackB)
              : !!result;
          }
          return result;
        }
      });

      if (result && !isWhere) {
        // ensure both objects have the same number of properties
        baseForIn(value, function(valValue, key, value) {
          if (hasOwnProperty.call(value, key)) {
            // `size` will be `-1` if `value` has more properties than `other`
            result = --size > -1;
            return result;
          }
        });
      }
    }
    stackA.pop();
    stackB.pop();

    return result;
  }

  return baseIsEqual;
});
