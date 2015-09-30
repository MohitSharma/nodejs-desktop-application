var gulp = require('gulp'),
  concat = require('gulp-concat'),
  del = require('del'),
  runSequence = require('run-sequence'),
  webserver = require('gulp-webserver'),
  src = {};

// Clean output directory
gulp.task('clean', del.bind(null, ['.tmp', 'build/*', '!build/.git'], {dot: true}));

gulp.task('html', function() {
  src.html = ['*.html'];
  return gulp.src(src.html)
      .pipe(gulp.dest('build'));
});

gulp.task('views', function() {
    src.views = ['views/**/*', 'views/**/**/*'];
    return gulp.src(src.views)
        .pipe(gulp.dest('build/views'));
});

gulp.task('js', function() {
  src.js = ['js/**/*'];
  return gulp.src(src.js)
      .pipe(gulp.dest('build/js'));
});


gulp.task('libraries', function() {
    src.libraries = [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-route/angular-route.js',
        'node_modules/angular-sanitize/angular-sanitize.js',
        'node_modules/angular-touch/angular-touch.js',
        'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.min.js'
    ];
    return gulp.src(src.libraries)
        .pipe(concat('libs.js'))
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
  gulp.watch(src.views, ['views']);
});

gulp.task('default', ['clean'], function(cb) {
    runSequence(['html', 'views', 'libraries', 'js', 'css', 'fonts', 'images', 'watch'], cb);
});
