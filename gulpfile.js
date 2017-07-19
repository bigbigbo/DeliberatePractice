var gulp = require('gulp') 
var sass = require('gulp-sass') 
var less = require('gulp-less') 
var notify = require('gulp-notify')
var plumber = require('gulp-plumber')
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var filePath = {
  less: 'app/**/*.less',
  scss: 'app/**/*.scss'
}

gulp.task('less', function(){
  return gulp.src(filePath.less)
  .pipe(plumber({errorHandler: notify.onError('错误: <%= error.message %>')}))
  .pipe(less())
  .pipe(gulp.dest(function(e) {return e.base}))
  .pipe(reload({stream: true}));
});

gulp.task('sass', function(){
  return gulp.src(filePath.scss)
  .pipe(plumber({errorHandler: notify.onError('错误: <%= error.message %>')}))
  .pipe(sass())
  .pipe(gulp.dest(function(e) {return e.base}))
  .pipe(reload({stream: true}));
});

// 生成目录
gulp.task('catalogue', function() {
  // return gulp.src('app/**/*.html', function(err, ))
})

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass', 'less'], function() {
  browserSync.init({
      server: "./app"
  });

  gulp.watch(filePath.less, ['less']);
  gulp.watch(filePath.scss, ['sass']);
  gulp.watch("app/**/*.html").on('change', reload);
});

gulp.task('default', ['serve'])
