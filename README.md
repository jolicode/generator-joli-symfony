JoliSymfony - Symfony2
=====================
[![NPM Version](https://img.shields.io/npm/v/generator-joli-symfony.svg?style=flat-square)](https://www.npmjs.com/package/generator-joli-symfony)
[![Download Month](https://img.shields.io/npm/dm/generator-joli-symfony.svg?style=flat-square)](https://www.npmjs.com/package/generator-joli-symfony)

# /!\ This project is no longer maintained, use at your own risks

generator-joli-symfony is a [Yeoman Generator](http://yeoman.io/generators/) to scaffold Symfony2 projects with sensible defaults, common bundles and frontend tools.

It will create a new Symfony project, remove Assetic and replace it with either Gulp, Grunt or Brunch.

### Demo

![](http://i.imgur.com/qPMgBMv.gif)

## Dependencies

Mandatory dependencies :

- [npm](http://nodejs.org/)
- [yo](http://yeoman.io/)
- [gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started)
- [grunt](http://gruntjs.com/getting-started)
- [brunch](http://brunch.io/)

Optional dependencies :

- [gem](https://www.ruby-lang.org/en/downloads/)
- [compass](http://compass-style.org/install/)


## What you can choose

* Symfony 2 Standard Edition:
 * The list of versions of symfony is available [here](https://symfony.com/versions.json)
* Grunt:
 * [grunt-compass](https://github.com/gruntjs/grunt-contrib-compass)
 * [grunt-less](https://github.com/gruntjs/grunt-contrib-less)
 * [grunt-babel](https://github.com/babel/grunt-babel)
 * [grunt-coffee](https://github.com/gruntjs/grunt-contrib-coffee)
 * [grunt-typescript](https://github.com/k-maru/grunt-typescript)
* Gulp:
 * [gulp-ruby-sass](https://github.com/sindresorhus/gulp-ruby-sass)
 * gulp-copy
 * gulp-javascript
 * [gulp-less](https://github.com/plus3network/gulp-less)
 * [gulp-babel](https://github.com/babel/gulp-babel)
 * [gulp-typescript](https://github.com/ivogabe/gulp-typescript)
 * [gulp-coffee](https://github.com/wearefractal/gulp-coffee)
* Brunch:
 * [less-brunch](https://github.com/brunch/less-brunch)
 * [sass-brunch](https://github.com/brunch/sass-brunch)
 * [stylus-brunch](https://github.com/brunch/stylus-brunch)
 * [coffee-script-brunch](https://github.com/brunch/coffee-script-brunch)
 * [typescript-brunch](https://github.com/joshheyse/typescript-brunch)
 * [uglify-js-brunch](https://github.com/brunch/uglify-js-brunch)
 * [babel-brunch](https://github.com/babel/babel-brunch)
* Bootstrap-sass-official

## Default workflow

* Installs Symfony
* Removes Assetic for versions lower than 2.8
 * Only if using grunt-less or grunt-babel or grunt-compass: **(grunt-contrib-watch)**
 * Only if using grunt-typescript or grunt-coffee or grunt-babel : **(grunt-uglify)**
 * Only if using gulp-ruby-sass **(gulp-watch)**
 * Only if using gulp-ruby-sass or gulp-javascript **(gulp-rename, gulp-sourcemaps)**
 * Only if using gulp-ruby-sass or gulp-less **(gulp-minify-css)**
 * Only if using gulp-javascript or gulp-coffee or gulp-typescript or gulp-babel **(gulp-uglify, gulp-concat)**
* Starts the automatic execution of `bower` and `npm` after scaffolding has finished.

## Assets location

Assets are stored in the **app/Resources/** folder :

* app/Resources/scss
* app/Resources/fonts
* app/Resources/...

## Getting Started

- Install: `npm install -g yo`
- Install: `npm install -g generator-joli-symfony`
- Run: `yo joli-symfony --force`

## Contribute

`generator-joli-symfony` is fork-friendly : you can maintain a custom version, in which you `npm install && npm link` so that you can still use it with `yo joli-symfony`, or with the name of your choice.
