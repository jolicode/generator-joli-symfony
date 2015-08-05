# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## 1.0.0 - 2015-08-06

### Changed
- Improve install bootstrap
- improving the suppresion of Assetic
- Changing `Gruntfile.js` and `Gulpfile.js` files
- Changing `bower.json` file
- Updating the version of the modules npm
- Changing method fetch symfony

### Removed
- Removed module `grunt-sass`
- Removed module `load-grunt-tasks`
- Removed module `gulp-load-plugins
- Removed bundle `DoctrineMongoDBBundle`
- Removed file `.bowerrc`
all files installed with bower will stored directory `bower_component` default


### Added

Grunt
- Added module `grunt-less`
- Added module `grunt-babel`
- Added module `grunt-contrib-watch`g

Gulp
- Added module `gulp-less`
- Added module `gulp-babel`
- Added module `gulp-typescript`
- Added module `gulp-coffee`
- Added module `gulp-watch`

Brunch
- Added file `brunch-config.js`
- Added choices `Brunch` in the list tools
- Added module `less-brunch`
- Added module `sass-brunch`
- Added module `stylus-brunch`
- Added module `coffee-brunch`
- Added module `typescript-brunch`
- Added module `uglify-js-brunch`
- Added module `babel-brunch`

- Added method which determines how version symfony by tag
- Added method, check if composer is defined in the system
- Added method, check if bower is defined in the system
- Added modules npm `fs-extra`

- Added files demo compilation
	- files `scss`
	- files `less`
	- files `stylus`
	- files `Typescript`
	- files `Coffee`
	- files `Js (export)`
	- files `Js (Class ES6)`

Added only if you choices good modules with Grunt, Gulp or Brunch
