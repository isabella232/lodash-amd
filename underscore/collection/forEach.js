/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize underscore exports="amd" -o ./underscore/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['../internal/arrayEach', '../internal/baseCallback', '../internal/baseEach'], function(arrayEach, baseCallback, baseEach) {

  /**
   * Used as the maximum length of an array-like object.
   * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
   * for more details.
   */
  var maxSafeInteger = Math.pow(2, 53) - 1;

  /**
   * Iterates over elements of a collection executing `iterator` for each
   * element. The `iterator` is bound to `thisArg` and invoked with three arguments;
   * (value, index|key, collection). Iterator functions may exit iteration early
   * by explicitly returning `false`.
   *
   * Note: As with other "Collections" methods, objects with a `length` property
   * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
   * may be used for object iteration.
   *
   * @static
   * @memberOf _
   * @alias each
   * @category Collection
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} [iterator=identity] The function called per iteration.
   * @param {*} [thisArg] The `this` binding of `iterator`.
   * @returns {Array|Object|string} Returns `collection`.
   * @example
   *
   * _([1, 2, 3]).forEach(function(n) { console.log(n); }).join(',');
   * // => logs each number and returns '1,2,3'
   *
   * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, function(n) { console.log(n); });
   * // => logs each number and returns the object (property order is not guaranteed across environments)
   */
  function forEach(collection, iterator, thisArg) {
    var length = collection ? collection.length : 0;

    if (typeof iterator != 'function' || typeof thisArg != 'undefined') {
      iterator = baseCallback(iterator, thisArg, 3);
    }
    return (typeof length == 'number' && length > -1 && length <= maxSafeInteger)
      ? arrayEach(collection, iterator)
      : baseEach(collection, iterator);
  }

  return forEach;
});
