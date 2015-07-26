JoliSymfony - Symfony2
=====================

generator-joli-symfony is a [Yeoman Generator](http://yeoman.io/generators/) to scaffold Symfony2 projects with sensible defaults, common bundles and frontend tools.

It will create a new Symfony project, remove Assetic and replace it with either Gulp or Grunt.

### Demo

![](http://i.imgur.com/idCv3zq.gif)

## Dependencies

Mandatory dependencies :

- [composer](https://getcomposer.org/download/)
- [npm](http://nodejs.org/)
- [yo](http://yeoman.io/)
- [gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started)
- [grunt](http://gruntjs.com/getting-started)
- [bower](http://bower.io/#install-bower)

Optional dependencies :

- [gem](https://www.ruby-lang.org/en/downloads/)
- [compass](http://compass-style.org/install/)


## What you can choose

* Symfony 2 Standard Edition:
 * [2.3](https://github.com/symfony/symfony-standard/tree/2.3)
 * [2.6](https://github.com/symfony/symfony-standard/tree/2.6)
 * [2.7](https://github.com/symfony/symfony-standard/tree/2.7)
* Grunt:
 * [grunt-compass](https://github.com/gruntjs/grunt-contrib-compass)
 * [grunt-coffee](https://github.com/gruntjs/grunt-contrib-coffee)
 * [grunt-sass](https://github.com/gruntjs/grunt-contrib-sass)
 * [grunt-typescript](https://github.com/k-maru/grunt-typescript)
 * [grunt-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin)
 * [grunt-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
 * [grunt-copy](https://github.com/gruntjs/grunt-contrib-copy)
* Gulp:
 * [gulp-ruby-sass](https://github.com/sindresorhus/gulp-ruby-sass)
 * [gulp-copy](https://github.com/klaascuvelier/gulp-copy)
 * [gulp-concat](https://github.com/wearefractal/gulp-concat)
* Symfony2 Bundle:
 * [DoctrineFixturesBundle](https://github.com/doctrine/DoctrineFixturesBundle)
 * [DoctrineMigrationsBundle](https://github.com/doctrine/DoctrineMigrationsBundle)
 * [DoctrineMongoDBBundle](https://github.com/doctrine/DoctrineMongoDBBundle)
* Bootstrap 3.3 (SASS)

## Default workflow

* Installs Symfony
* Removes Assetic
 * Only if using grunt: **(load-grunt-tasks)**
 * Only if using grunt-typescript or grunt-coffeee: **(grunt-uglify)**
 * Only if using grunt-sass or grunt-compass: **(grunt-css-min)**
 * Only if using gulp **(gulp-load-plugins)**
 * Only if using gulp-ruby-sass **(gulp-minify-css, gulp-plumber, gulp-rename, gulp-watch)**
 * Only if using gulp-concat **(gulp-uglify)**
* Starts the automatic execution of `bower`, `npm` and `composer` after scaffolding has finished.

## Assets location

Assets are stored in the **app/Resources/** folder :

* app/Resources/scss
* app/Resources/fonts
* app/Resources/...

Bower dependencies (like Bootstrap 3.3) are installed in the **app/Resources/libs/** folder, thanks to a custom [.bowerrc](http://bower.io/docs/config/#bowerrc-specification) file.


## Getting Started

- Install: `npm install -g yo`
- Install: `npm install -g generator-joli-symfony`
- Run: `yo joli-symfony --force`

## Contribute

`generator-joli-symfony` is fork-friendly : you can maintain a custom version, in which you `npm install && npm link` so that you can still use it with `yo joli-symfony`, or with the name of your choice.
