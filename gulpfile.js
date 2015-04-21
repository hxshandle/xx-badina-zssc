"use strict";
var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-ruby-sass');
var path = require('path');


gulp.task('compile-jade', function() {
  console.log('compile-jade');
  gulp.src('src/jade/**/[!^_]*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('compile-scss', function() {
  console.log('compile-scss');
  return sass('src/scss/') 
    .on('error', function (err) {
      console.error('Error!', err.message);
   })
    .pipe(gulp.dest('public/css'));
});

gulp.task('move-js', function() {
  gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('public/js'));
})

gulp.task('watch-jade', function() {
  gulp.watch('src/jade/**/*.jade', ['compile-jade']);
});

gulp.task('watch-scss', function() {
  gulp.watch('src/scss/**/*.scss', ['compile-scss']);
});

gulp.task('watch-js', function() {
  gulp.watch('src/js/**/*.js', ['move-js']);
});

gulp.task('default', ['watch-jade', 'watch-scss','watch-js']);
