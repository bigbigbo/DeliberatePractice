var gulp = require('gulp') 
var sass = require('gulp-sass') 
var less = require('gulp-less') 
var notify = require('gulp-notify')
var plumber = require('gulp-plumber')
var postcss = require('gulp-postcss');
var pxtorem = require('postcss-pxtorem')
var autoprefixer = require('autoprefixer')
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var filePath = {
  less: 'app/**/*.less',
  scss: 'app/**/*.scss',
  remcss: ['app/**/*.rem.sass','app/**/*.rem.less','app/**/*.rem.css']
}

var postcssAutoprefixer = [
  autoprefixer({browsers: ['> 1%'], cascade: false})
];

var postcssPxtorem = [
  pxtorem({
    replace: true,
    rootValue: 75,
    unitPrecision: 5,
    propWhiteList: []
  })
];


gulp.task('less', function(){
  return gulp.src(filePath.less)
  .pipe(plumber({errorHandler: notify.onError('task:less 错误: <%= error.message %>')}))
  .pipe(less())
  .pipe(postcss(postcssAutoprefixer))
  .pipe(gulp.dest(function(e) {return e.base}))
  .pipe(reload({stream: true}));
});

gulp.task('sass', function(){
  return gulp.src(filePath.scss)
  .pipe(plumber({errorHandler: notify.onError('task:sass 错误: <%= error.message %>')}))
  .pipe(sass())
  .pipe(postcss(postcssAutoprefixer))
  .pipe(gulp.dest(function(e) {return e.base}))
  .pipe(reload({stream: true}));
});

gulp.task('px2rem', function() {
  return gulp.src(filePath.remcss)
  .pipe(postcss(postcssPxtorem));
})

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
