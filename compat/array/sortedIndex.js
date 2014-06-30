define(['../internal/baseCallback', '../internal/binaryIndex', '../internal/binaryIndexBy'], function(baseCallback, binaryIndex, binaryIndexBy) {

  /**
   * Uses a binary search to determine the lowest index at which `value` should
   * be inserted into `array` in order to maintain its sort order. If an iteratee
   * function is provided it is invoked for `value` and each element of `array`
   * to compute their sort ranking. The iteratee is bound to `thisArg` and
   * invoked with one argument; (value).
   *
   * If a property name is provided for `predicate` the created "_.property"
   * style callback returns the property value of the given element.
   *
   * If an object is provided for `predicate` the created "_.matches" style
   * callback returns `true` for elements that have the properties of the given
   * object, else `false`.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The sorted array to inspect.
   * @param {*} value The value to evaluate.
   * @param {Function|Object|string} [iteratee=_.identity] The function invoked
   *  per iteration. If a property name or object is provided it is used to
   *  create a "_.property" or "_.matches" style callback respectively.
   * @param {*} [thisArg] The `this` binding of `iteratee`.
   * @returns {number} Returns the index at which `value` should be inserted
   *  into `array`.
   * @example
   *
   * _.sortedIndex([30, 50], 40);
   * // => 1
   *
   * _.sortedIndex([4, 4, 5, 5, 6, 6], 5);
   * // => 2
   *
   * var dict = { 'data': { 'thirty': 30, 'forty': 40, 'fifty': 50 } };
   *
   * // using an iteratee function
   * _.sortedIndex(['thirty', 'fifty'], 'forty', function(word) {
   *   return this.data[word];
   * }, dict);
   * // => 1
   *
   * // using the "_.property" callback shorthand
   * _.sortedIndex([{ 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
   * // => 1
   */
  function sortedIndex(array, value, iteratee, thisArg) {
    return iteratee == null
      ? binaryIndex(array, value)
      : binaryIndexBy(array, value, baseCallback(iteratee, thisArg, 1));
  }

  return sortedIndex;
});
