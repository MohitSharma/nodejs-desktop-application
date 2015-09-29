var gulp = require('gulp'),
  gutil = require('gulp-util'),
  del = require('del'),
  runSequence = require('run-sequence'),
  src = {};

// Clean output directory
gulp.task('clean', del.bind(null, ['.tmp', 'build/*', '!build/.git'], {dot: true}));

gulp.task('html', function() {
  src.html = ['*.html'];
  return gulp.src(src.html)
      .pipe(gulp.dest('build'));
});

gulp.task('js', function() {
  src.js = ['js/**/*'];
  return gulp.src(src.js)
      .pipe(gulp.dest('build/js'));
});

gulp.task('images', function() {
    src.images = ['images/**/*'];
    return gulp.src(src.images)
        .pipe(gulp.dest('build/images'));
});

gulp.task('css', function() {
  src.css = ['css/*.css', 'node_modules/bootstrap/dist/css/bootstrap.min.css'];
  return gulp.src(src.css)
      .pipe(gulp.dest('build/css'))
});

gulp.task('fonts', function() {
    src.css = ['node_modules/bootstrap/dist/fonts/*'];
    return gulp.src(src.css)
        .pipe(gulp.dest('build/fonts'))
});

gulp.task('watch', function() {
  gulp.watch(src.js, ['js']);
  gulp.watch(src.css, ['css']);
  gulp.watch(src.html, ['html']);
});

gulp.task('default', ['clean'], function(cb) {
    runSequence(['html', 'js', 'css', 'fonts', 'images', 'watch'], cb);
});
