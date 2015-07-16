var gulp = require('gulp');
<% if (gulpRubySass) { %>var sass = require('gulp-ruby-sass');<% } %>
<% if (gulpRubySass || gulpLess) { %>
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var watch = require('gulp-watch');<% } %>
<% if (gulpRubySass || gulpConcat || gulpLess) { %>
var rename = require('gulp-rename');<% } %>
<% if (gulpConcat || gulpBabel || gulpCoffee || gulpTypescript) { %>
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');<% } %>
<% if (gulpTypescript) { %>var ts = require('gulp-typescript');<% } %>
<% if (gulpCoffee) { %>var coffee = require('gulp-coffee');<% } %>
<% if (gulpLess) { %>var less = require('gulp-less');<% } %>
<% if (gulpBabel) { %>var babel = require('gulp-babel');<% } %>
var gutil = require('gulp-util');

var path = {
  app: 'app/Resources',
  bower_components: './bower_components'
};

<% if (gulpCopy) { %>
gulp.task('copy', function() {
    gulp.src(path.app + '/assets/fonts/*.{ttf,woff,eof,svg,eot}')
        .pipe(gulp.dest('web/fonts/'));
});<% } %>

<% if (gulpRubySass) { %>
/**
* gulp-ruby-sass
* @see https://www.npmjs.com/package/gulp-ruby-sass
*
* Compile Sass to CSS using Compass.
*/
gulp.task('sass', function() {

  return sass(path.app + '/scss', { compass: true, style: 'compressed', sourcemap: true })
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(minifyCss({keepSpecialComments:0}))
    .pipe(sourcemaps.write())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('web/css/'));
});<% } %>

<% if (gulpConcat) { %>
/**
* gulp-concat && gulp-uglify
* @see https://www.npmjs.com/package/gulp-concat
* @see https://www.npmjs.com/package/gulp-uglify
*
* Compile and minify js vendor (bower_components).
*/
gulp.task('vendor', function() {
    gulp.src([
        './bower_components/jquery/dist/jquery.js',
        './bower_components/bootstrap/assets/javascripts/bootstrap.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(uglify({mangle: true}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('web/js/'));
});

/**
* gulp-concat && gulp-uglify
* @see https://www.npmjs.com/package/gulp-concat
* @see https://www.npmjs.com/package/gulp-uglify
*
* Compile and minify js App (app/Resources/js).
*/
gulp.task('app', function() {
    return gulp.src(path.app + '/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(uglify({mangle: true}).on('error', gutil.log))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('web/js/'));
});<% } %>

<% if (gulpLess) { %>
/**
* gulp-less
* @see https://www.npmjs.com/package/gulp-less
*
* Compile Less to CSS.
*/
gulp.task('less', function() {
    gulp.src(path.app + '/less/main.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(minifyCss({keepSpecialComments:0}))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('web/css/'));
});<% } %>

<% if (gulpCoffee) { %>
/**
* gulp-coffee
* @see https://www.npmjs.com/package/gulp-coffee
*
* Compile CoffeeScript files to Javascript.
*/
gulp.task('coffee', function() {
  gulp.src(path.app + '/js/*.coffee')
    .pipe(sourcemaps.init())
    .pipe(coffee({ bare: true })).on('error', gutil.log)
    .pipe(concat('coffee.js'))
    .pipe(uglify({mangle: true}).on('error', gutil.log))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('web/js/'));
});<% } %>

<% if (gulpTypescript) { %>
/**
* gulp-typescript
* @see https://www.npmjs.com/package/gulp-typescript
*
* Compile Typescript files to Javascript.
*/
gulp.task('ts', function() {
  var tsResult = gulp.src(path.app + '/js/*.ts')
    .pipe(sourcemaps.init())
    .pipe(ts({
      sortOutput: true,
      target: 'ES6', // 'ES3' (default), 'ES5' or 'ES6'.
      module: 'commonjs' //'commonjs' or 'amd'.
    }));

  return tsResult.js
    .pipe(concat('typescript.js'))
    .pipe(uglify({mangle: true}).on('error', gutil.log))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('web/js/'));
});<% } %>

<% if (gulpBabel) { %>
/**
* gulp-babel
* @see https://www.npmjs.com/package/gulp-babel
*
* Turn ES6 code into vanilla ES5 with no runtime required
*/
gulp.task('babel', function () {
  return gulp.src(path.app + '/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('babel.js'))
    .pipe(uglify({mangle: true}).on('error', gutil.log))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('web/js/'));
});<% } %>

gulp.task('default', [
<% if (gulpCopy) { %>'copy',<% } %>
<% if (gulpConcat) { %>'vendor',<% } %>
<% if (gulpConcat) { %>'app',<% } %>
<% if (gulpBabel) { %>'babel',<% } %>
<% if (gulpCoffee) { %>'coffee',<% } %>
<% if (gulpTypescript) { %>'ts',<% } %>
<% if (gulpLess) { %>'less',<% } %>
<% if (gulpRubySass) { %>'sass'<% } %>
]);
