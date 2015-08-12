var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var shell = require('gulp-shell');
var nw = require('nw');
var pkg = require('./package.json');
var path = require('path');
var paths = pkg.paths;

gulp.task('browserify', function(){
  // set up the browserify instance on a task basis
  // use configuration from the package.json
  var b = browserify({
    entries:paths.entries
  });
  b.external(pkg.browserify.external);

  return b.bundle()
    .pipe(source(paths.bundle))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        //.pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write(paths.maps))
    .pipe(gulp.dest(path.join(paths.application,paths.dist)));
});

gulp.task('watch',function(){
    gulp.watch(paths.src + '/**/*.*', ['browserify']);
});

gulp.task('nw-debug',shell.task([nw.findpath() + ' ' + paths.application]));

gulp.task('default',['browserify']);

gulp.task('dev', ['default','watch','nw-debug']);
