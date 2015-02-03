var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();

var app = 'app/Resources';

var onError = function(err) {
    console.log(err);
};
<% if (gulpRubySass) { %>
gulp.task('Sass', function() {

    gulp.src(app + '/scss/**/*.scss')
        .pipe(plugins.plumber({
            errorHandler: onError
        }))
        .pipe(plugins.rubySass({
            compass: true,
            style: 'compressed',
            check: true}))
        .pipe(plugins.minifyCss({keepSpecialComments:0}))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest('web/css/'));
});
<% } %>

<% if (gulpCopy) { %>
gulp.task('copy', function() {
    gulp.src(app + '/fonts/*.{ttf,woff,eof,svg,eot}')
        .pipe(gulp.dest('web/fonts/'));
});
<% } %>

<% if (gulpConcat) { %>
gulp.task('concat', function() {
    gulp.src([
        app + '/libs/jquery/dist/jquery.js',
        app + '/libs/bootstrap/assets/javascripts/bootstrap.js'
    ])
        .pipe(plugins.concat('app.js'))
        .pipe(plugins.uglify({mangle: true}))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest('web/js/'));
});
<% } %>

<% if (gulpRubySass) { %>
gulp.task('watch', function() {
    gulp.watch(app + '/scss/**/*.scss', ['Sass']);
});
<% } %>

gulp.task('build', [
<% if (gulpCopy) { %>'copy',<% } %>
<% if (gulpConcat) { %>'concat',<% } %>
<% if (gulpRubySass) { %>'Sass',<% } %>
]);

gulp.task('default', [
<% if (gulpRubySass) { %>'Sass',<% } %>
]);
