var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var files = ['*.js', 'src/**/*.js'];

gulp.task('checkstandards', function () {

    return gulp.src(files)
               .pipe(jshint())
               .pipe(jshint.reporter('jshint-stylish', {
                    verbose: true
                }));
});

gulp.task('checkstyle', function () {
    return gulp.src(files)
               .pipe(jscs())
               .pipe(jscs.reporter());
});