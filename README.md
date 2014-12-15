JoliStarter - Symfony2
=====================

## Requires

Things you probably need:

- [npm](http://nodejs.org/)
- [yo](http://yeoman.io/)
- [gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started)
- [grunt](http://gruntjs.com/getting-started)

Only if using Compass
- [gem](https://www.ruby-lang.org/en/downloads/)
- [compass](http://compass-style.org/install/)

for Symfony2
- [composer](https://getcomposer.org/download/)

## Choose features

* Symfony 2 Standard Edition [[2.3](https://github.com/symfony/symfony-standard/tree/2.3), [2.5](https://github.com/symfony/symfony-standard/tree/2.5), [2.6](https://github.com/symfony/symfony-standard/tree/2.6)]
* Grunt [[grunt-compass](https://github.com/gruntjs/grunt-contrib-compass), [grunt-coffee](https://github.com/gruntjs/grunt-contrib-coffee), [grunt-sass](https://github.com/gruntjs/grunt-contrib-sass), [grunt-typescript](https://github.com/k-maru/grunt-typescript), [grunt-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin), [grunt-uglify](https://github.com/gruntjs/grunt-contrib-uglify), [grunt-copy](https://github.com/gruntjs/grunt-contrib-copy)]
* Gulp [[gulp-ruby-sass](https://github.com/sindresorhus/gulp-ruby-sass), [gulp-copy](https://github.com/klaascuvelier/gulp-copy), [gulp-concat](https://github.com/wearefractal/gulp-concat)]
* Bundle [[DoctrineFixturesBundle](https://github.com/doctrine/DoctrineFixturesBundle), [DoctrineMigrationsBundle](https://github.com/doctrine/DoctrineMigrationsBundle), [DoctrineMongoDBBundle](https://github.com/doctrine/DoctrineMongoDBBundle)]
* Bootstrap 3.3

## Default
* Remove Assetic
* -
* Only if using grunt **(load-grunt-tasks)**
* Only if using grunt-typescript or grunt-coffeee **(grunt-uglify)**
* Only if using grunt-sass or grunt-compass **(grunt-css-min)**
* -
* Only if using gulp **(gulp-load-plugins)**
* Only if using gulp-ruby-sass **(gulp-minify-css, gulp-plumber, gulp-rename, gulp-watch)**
* Only if using gulp-concat **(gulp-uglify)**
*-
* Starts the automatic execution of `bower`, `npm` and `composer` after scaffolding has finished.

## Assets

Assets are stored in the folder **app/Resources/others/**
* app/Resources/scss
* app/Resources/fonts
* app/Resources/...

File [.bowerrc](http://bower.io/docs/config/#bowerrc-specification) is enabled in the folder **app/Resources/libs**

Boostrap 3.3 is available here **app/Resources/libs/** and all other bower library

## Getting Started

- Install: `npm install -g yo`
- Install: `npm install -g generator-jolistarter`
- Run: `yo jolistarter --force`

Only use Grunt
- Run: 'grunt' once
- Run: `grunt javascript` for compiled all files coffee or typescript
- Run: `grunt css` for compiled all files scss
- Run: `grunt cp` for copied all files stored in **app/Resources** types in the folder **web/fonts**

Only use Gulp
- Run: `gulp build` once, compiled all assets (Javascript, scss, copy)
- Run: `gulp watch` for watch assets files, point at app/Resources
- Run: `gulp` for compile assets files **(sass)** stored in **app/Resources** in the folder **web/css**

## Contribute

`generator-jolistarter` is fork-friendly and you can always maintain a custom version which you `npm install && npm link` to continue using via `yo jolistarter` or a name of your choosing.

## License

