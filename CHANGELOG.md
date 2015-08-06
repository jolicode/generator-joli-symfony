# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## 1.0.0 - 2015-08-06

### Changed
- Bootstrap's installation improved
- Assetic's deletion improved
- Brand new method to fetch Symfony's versions
- Now detects if `composer` and `bower`are already installed on the system
- `Gruntfile.js` and `Gulpfile.js` updated
- `bower.json` updated
- Npm modules updated

### Removed
- Module `grunt-sass` removed
- Module `load-grunt-tasks` removed
- Module `gulp-load-plugins` removed
- Bundle `DoctrineMongoDBBundle` removed
- File `.bowerrc` removed - All files installed with bower will be stored in the default `bower_component` directory.


### Added

Grunt
- Module `grunt-less` added
- Module `grunt-babel` added
- Module `grunt-contrib-watch` added

Gulp
- Module `gulp-less` added
- Module `gulp-babel` added
- Module `gulp-typescript` added
- Module `gulp-coffee` added
- Module `gulp-watch` added

Brunch
- Configuration file `brunch-config.js` added
- Choice `Brunch` added in the tools list
- Module `less-brunch` added
- Module `sass-brunch` added
- Module `stylus-brunch` added
- Module `coffee-brunch` added
- Module `typescript-brunch` added
- Module `uglify-js-brunch` added
- Module `babel-brunch` added

NPM
- Module `fs-extra` added

- Demo added
	- files `scss`
	- files `less`
	- files `stylus`
	- files `Typescript`
	- files `Coffee`
	- files `Js (export)`
	- files `Js (Class ES6)`
