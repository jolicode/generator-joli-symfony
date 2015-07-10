var gulp = require('gulp');
<% if (gulpRubySass) { %>var sass = require('gulp-ruby-sass');<% } %>
<% if (gulpRubySass || gulpLess) { %>
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var watch = require('gulp-watch');<% } %>
<% if (gulpRubySass || gulpConcat || gulpLess) { %>
var rename = require('gulp-rename');<% } %>
<% if (gulpConcat) { %>
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');<% } %>

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


gulp.task('default', [
<% if (gulpCopy) { %>'copy',<% } %>
<% if (gulpConcat) { %>'vendor',<% } %>
<% if (gulpConcat) { %>'app',<% } %>
<% if (gulpRubySass) { %>'sass'<% } %>
]);
