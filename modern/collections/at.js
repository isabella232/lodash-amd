/**
 * Lo-Dash 2.0.0 (Custom Build) <http://lodash.com/>
 * Build: `lodash modern modularize exports="amd" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
define(['../internals/baseFlatten', '../objects/isString'], function(baseFlatten, isString) {

  /**
   * Creates an array of elements from the specified indexes, or keys, of the
   * `collection`. Indexes may be specified as individual arguments or as arrays
   * of indexes.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {...(number|number[]|string|string[])} [index] The indexes of `collection`
   *   to retrieve, specified as individual indexes or arrays of indexes.
   * @returns {Array} Returns a new array of elements corresponding to the
   *  provided indexes.
   * @example
   *
   * _.at(['a', 'b', 'c', 'd', 'e'], [0, 2, 4]);
   * // => ['a', 'c', 'e']
   *
   * _.at(['moe', 'larry', 'curly'], 0, 2);
   * // => ['moe', 'curly']
   */
  function at(collection) {
    var args = arguments,
        index = -1,
        props = baseFlatten(args, true, false, 1),
        length = (args[2] && args[2][args[1]] === collection) ? 1 : props.length,
        result = Array(length);

    while(++index < length) {
      result[index] = collection[props[index]];
    }
    return result;
  }

  return at;
});
