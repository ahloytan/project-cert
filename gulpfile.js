var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var open = require('gulp-open');
var babel = require('gulp-babel');
var watchify = require('watchify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var buffer = require('gulp-buffer');
var plumber = require('gulp-plumber');
var browserify = require('browserify');
var cleanCSS = require('gulp-clean-css');
var source = require('vinyl-source-stream');

//Style paths
var allScssFiles = 'app/styles/scss/*.scss',
  cssDestination = 'app/styles/css/';

//script paths
var allJsFiles = 'app/scripts/js/*.js',
jsDestination = 'app/scripts/compiledJs/';

//https://codehangar.io/gulp-sass/
gulp.task('sass', function(done) {
  gulp.src(allScssFiles)
  .pipe(sass().on('error', sass.logError))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest(cssDestination))
  done();
});

//https://stackoverflow.com/questions/21961142/concat-scripts-in-order-with-gulp
//https://stackoverflow.com/questions/44958216/how-to-minify-es6-functions-with-gulp-uglify
gulp.task('babel', function() {
  return gulp.src(['app/scripts/js/_reqLib.js', allJsFiles])
    //stackoverflow.com/questions/51769764/gulp-handle-an-array-of-files-with-gulp-rev
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(babel({presets:['@babel/preset-env']}))
    .pipe(uglify())
    .pipe(gulp.dest(jsDestination));
});

//https: //stackoverflow.com/questions/39665773/gulp-error-watch-task-has-to-be-a-function
gulp.task('watch', function() {
  gulp.watch(allScssFiles, gulp.series('sass'))
  gulp.watch(allJsFiles, gulp.series('babel','browserify'));
});


//www.viget.com/articles/gulp-browserify-starter-faq/
//stackoverflow.com/questions/29625182/gulp-browserify-takes-longer-to-compile-on-each-save-change
gulp.task('browserify', function() {
  var watcher = watchify(
      browserify({
        entries: ['app/scripts/compiledJs/app.js'],
        debug: true,
        cache: {},
        packageCache: {},
        // FYI, this is no longer required in recent versions
        // of watchify, in case that's why you're using it.
        // See https://github.com/substack/watchify/pull/160
        fullPaths: true
      })
     );

    function bundle () {
      return watcher
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(jsDestination));
    }

    function update () {
      var updateStart = Date.now();
      console.log('Js changed, compiling via Browserify... Completed!');
    }

    watcher.on('update', update);
    return bundle();
}); //Development mode


/*
gulp.task('browserify', function() {
    return browserify('app/scripts/compiledJs/app.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        // Start piping stream to tasks!
        .pipe(gulp.dest(jsDestination));
}); //Production mode
*/

//https://stackoverflow.com/questions/32526281/how-to-set-react-to-production-mode-when-using-gulp
gulp.task('environment', function() {
    // process.env.NODE_ENV = 'production'; //production
}); //Environment state

//https://www.npmjs.com/package/gulp-open
//https://stackoverflow.com/questions/35077637/how-to-open-the-chrome-browser-with-gulp-open/35093619
//https://stackoverflow.com/questions/8131344/what-is-the-difference-between-dirname-and-in-node-js
gulp.task('open', function() {
  var split_dir = path.parse(__dirname).dir
  var current_year = path.parse(split_dir).base
  var localHost = 'http://localhost:8080/selfDevelopment/' + path.parse(__dirname).base
  gulp.src('./index.html').pipe(open({
    uri: localHost
  }))
});

gulp.task('message', async function() {
  console.log("HTTP Server Started");
});

var tasks_to_execute = ['sass', 'babel', 'watch', 'browserify', 'environment', 'open', 'message'];

gulp.task('default', gulp.parallel(tasks_to_execute))
