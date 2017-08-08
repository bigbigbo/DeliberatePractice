import gulp from 'gulp';
import fs from 'fs';
import del from 'del';
import sass from 'gulp-sass';
import less from 'gulp-less';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import pxtorem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';
import template from 'gulp-template';
import rename from 'gulp-rename';
import clean from 'gulp-clean';
import babel from 'gulp-babel';
import ts from 'gulp-typescript';
import webpack from 'gulp-webpack';
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const filePath = {
  html: 'app/**/*.html',
  js: 'app/**/*.js',
  ts: 'app/**/*.ts',
  less: 'app/**/*.less',
  scss: 'app/**/*.scss',
  remcss: ['app/**/*.rem.sass','app/**/*.rem.less','app/**/*.rem.css']
}

const tsProject = ts.createProject('tsconfig.json');

const postcssAutoprefixer = [
  autoprefixer({browsers: ['> 1%'], cascade: false})
];

const postcssPxtorem = [
  pxtorem({
    replace: true,
    rootValue: 75,
    unitPrecision: 5,
    propWhiteList: []
  })
];

// less预编译
gulp.task('less', function(){
  return gulp.src(filePath.less)
  .pipe(plumber({errorHandler: notify.onError('task:less 错误: <%= error.message %>')}))
  .pipe(less())
  .pipe(postcss(postcssAutoprefixer))
  .pipe(gulp.dest('dist'))
  .pipe(reload({stream: true}));
});

// 复制asset文件夹
gulp.task('copyassets', function() {
  console.log('正在搬运assets资源文件...')
  return gulp.src('app/assets/**/*', {base: './app'})
  .pipe(gulp.dest('dist'));
})

// 复制html文件
gulp.task('copyhtml', function() {
  console.info('正在搬运html文件...')
  return gulp.src(filePath.html)
  .pipe(gulp.dest('dist'));
})

// sass预编译
gulp.task('sass', function(){
  return gulp.src(filePath.scss)
  .pipe(plumber({errorHandler: notify.onError('task:sass 错误: <%= error.message %>')}))
  .pipe(sass())
  .pipe(postcss(postcssAutoprefixer))
  .pipe(gulp.dest('dist'))
  .pipe(reload({stream: true}));
});

// 将css的px单位转成rem
gulp.task('px2rem', function() {
  return gulp.src(filePath.remcss)
  .pipe(postcss(postcssPxtorem));
})

// babel转义es6
gulp.task('babeljs', function() {
  return gulp.src(filePath.js)
  .pipe(babel({
    presets: ['env', 'es2015', 'react', 'stage-0'],
    plugins: ['transform-runtime']
  }))
  // .pipe(rename({
  //   suffix: '.es5'
  // }))
  .pipe(gulp.dest('dist'))
  .pipe(webpack({
    output: {filename: 'bundle.js'}
  }))
  .pipe(gulp.dest(e => {
    console.log(e.cwd, e.base, e.path)
    return 'dist'
  }));
})

// 编译ts
gulp.task('typescript', function() {
  const tsResult = gulp.src(filePath.ts) // or tsProject.src() 
  .pipe(tsProject());

  return tsResult.js.pipe(rename({
    suffix: '.ts'
  }))
  .pipe(gulp.dest('dist'));
});

// 清除index.html文件
gulp.task('clean:index.html', function() {
  console.info('已删除index.html!')
  return gulp.src('app/index.html')
  .pipe(clean({force: true}));
})

// 清除dest目录
gulp.task('clean:dist', function() {
  return gulp.src('dist', {read: false})
  .pipe(clean({force: true}));
})

// 生成目录
gulp.task('catalogue', ['clean:index.html'], function() {
  console.log('正在生成目录...')
  return gulp.src(filePath.html, function(err, data) {
    if(err) throw {msg: '目录生成失败- -！', err}
    const len = data.length
    const catalogue = data.slice(0, len-1).map(item => item.split('DeliberatePractice/app/').pop())
    .filter(item => item !== 'index.html' || item !== 'template.html')

    return gulp.src('app/template.html')
    .pipe(plumber({errorHandler: notify.onError('task:catalogue 错误: <%= error.message %>')}))
    .pipe(template({files: catalogue}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(() => {
      console.log('目录生成成功 ^_^')
      return 'dist'
    }));
  })
})

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass', 'less', 'babeljs', 'typescript'], function() {
  browserSync.init({
      server: "./dist"
  });

  gulp.watch(filePath.less, ['less']);
  gulp.watch(filePath.scss, ['sass']);
  gulp.watch(filePath.js, ['babeljs']);
  gulp.watch(filePath.ts, ['typescript']);
  gulp.watch("app/**/*.html").on('change', reload);
});

gulp.task('default', ['clean:dist'], function() {
  gulp.start('catalogue', 'copyassets', 'copyhtml', 'serve')
})
