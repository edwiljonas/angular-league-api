// Variables
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify');

// Source
var _js = [
        'includes/js/main.js',
        'includes/js/jquery-3.3.1.min.js'
    ],
    _sass = [
        'includes/scss/styles.scss',
        'includes/scss/font-awesome/scss/font-awesome.scss'
    ],
    _output = 'src';

// Sass
gulp.task('sass', function() {
    gulp.src(_sass)
        .pipe(sass({style: 'expanded'}))
        .on('error', gutil.log)
        .pipe(gulp.dest(_output))
        .pipe(connect.reload())
});

// Script
gulp.task('scripts', function() {
    gulp.src(_js)
        .pipe(uglify())
        .pipe(gulp.dest(_output+'/assets/js'))
        .pipe(connect.reload())
});

// Images
gulp.task('images', function() {
    return gulp.src('includes/images/*.{jpg,png}')
        .pipe(gulp.dest(_output+'/assets/images'));
});

// Watch
gulp.task('watch', function() {
    gulp.watch('scripts/*.js', ['scripts']);
    gulp.watch('includes/scss/styles.scss', ['sass']);
});