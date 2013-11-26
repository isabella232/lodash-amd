# lodash-amd v2.4.0

A collection of [Lo-Dash](http://lodash.com/) methods as [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) modules generated by [lodash-cli](https://npmjs.org/package/lodash-cli).

## Packages

Define a build as `'lodash'` (instead of `'lodash-amd/{build}'`)

```js
require({
  'packages': [
    { 'name': 'lodash', 'location': 'lodash-amd/modern' }
  ]
}, ['lodash/collections/forEach'], function(forEach) {
  // use `forEach`
});
```

## Migrations

Easily migrate Underscore code to Lo-Dash code.

```js
require({
  'packages': [
    { 'name': 'lodash', 'location': 'lodash-amd/compat' },
    { 'name': 'underscore', 'location': 'lodash-amd/underscore' }
  ]
}, [], function() {});
```

When working with code that must have Underscore compatibility, just import the `'underscore'` dependency.
If you don’t need Underscore compatibility & want the [benefits](http://lodash.com/#features) of Lo-Dash, import the `'lodash'` dependency.
You can even mix & match.

```js
define(['underscore', 'lodash/objects/transform'], function(_, transform) {
  // use `_` prefixed code with underscore
  // use `transform` from lodash
});
```

Eventually, when Underscore compatibility is no longer needed, just switch your `packages` configuration.

```js
require({
  'packages': [
    { 'name': 'lodash', 'location': 'lodash-amd/compat' },
    { 'name': 'underscore', 'location': 'lodash-amd/compat' }
  ]
}, [], function() {});
```

## Author

| [![twitter/jdalton](http://gravatar.com/avatar/299a3d891ff1920b69c364d061007043?s=70)](https://twitter.com/jdalton "Follow @jdalton on Twitter") |
|---|
| [John-David Dalton](http://allyoucanleet.com/) |

## Contributors

| [![twitter/blainebublitz](http://gravatar.com/avatar/ac1c67fd906c9fecd823ce302283b4c1?s=70)](https://twitter.com/blainebublitz "Follow @BlaineBublitz on Twitter") | [![twitter/kitcambridge](http://gravatar.com/avatar/6662a1d02f351b5ef2f8b4d815804661?s=70)](https://twitter.com/kitcambridge "Follow @kitcambridge on Twitter") | [![twitter/mathias](http://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|---|---|
| [Blaine Bublitz](http://www.iceddev.com/) | [Kit Cambridge](http://kitcambridge.be/) | [Mathias Bynens](http://mathiasbynens.be/) |
