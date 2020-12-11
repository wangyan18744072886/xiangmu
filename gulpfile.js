const gulp = require('gulp')
const sass = require('gulp-sass')
const cssmin = require('gulp-cssmin')
const autoprefixer = require('gulp-autoprefixer')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const webserver = require('gulp-webserver')
const sassHandler = () => {
   return gulp
    .src('./src/sass/*.scss')
    .pipe(sass()) 
    .pipe(autoprefixer()) 
    .pipe(cssmin()) 
    .pipe(gulp.dest('./dist/sass/'))
}
const cssHandler = () => {
  return gulp
    .src('./src/css/*.css')
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css/'))
}
const jsHandler = () => {
  return gulp
    .src('./src/js/*.js')
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/')) 
}
const htmlHandler = () => {
  return gulp
    .src('./src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true, 
      collapseBooleanAttributes: true, 
      removeAttributeQuotes: true, 
      removeComments: true, 
      removeEmptyElements: true,
      removeEmptyAttributes: true, 
      removeScriptTypeAttributes: true, 
      removeStyleLinkTypeAttributes: true, 
      minifyJS: true, 
      minifyCSS: true,
    }))
    .pipe(gulp.dest('./dist/')) 
}
const imgHandler = () => {
  return gulp
    .src('./src/images/*.**')
    .pipe(gulp.dest('./dist/images/'))
}
const assetsHandler = () => {
  return gulp
    .src('./src/assets/*/**')
    .pipe(gulp.dest('./dist/assets'))
}
const delHandler = () => {
  return del('./dist/')
}
const webHandler = () => {
  return gulp
    .src('./dist/')
    .pipe(webserver({
      host: 'www.shadouyou.com',
      port: 8080,
      open: './pages/a.html',
      livereload: true,
      proxies: [
        {
          source: '/gx',
          target: 'http://localhost:80/test.php'
        },
        {
          source: '/gx3',
          target: 'http://localhost:80/test2.php'
        }
      ]
    }))
}
const watchHandler = () => {
  gulp.watch('./src/css/*.css', cssHandler)
  gulp.watch('./src/sass/*.sass', sassHandler)
  gulp.watch('./src/js/*.js', jsHandler)
  gulp.watch('./src/*.html', htmlHandler)
}
const defaultHandler = gulp.series(
  delHandler,
  gulp.parallel(sassHandler, cssHandler, jsHandler, htmlHandler, imgHandler, assetsHandler),
  webHandler,
  watchHandler
)
module.exports.sassHandler = sassHandler
module.exports.cssHandler = cssHandler
module.exports.jsHandler = jsHandler
module.exports.htmlHandler = htmlHandler
module.exports.imgHandler = imgHandler
module.exports.assetsHandler = assetsHandler
module.exports.delHandler = delHandler
module.exports.default = defaultHandler

