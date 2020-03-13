let gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('autoprefixer');


gulp.task('clean', async () => {
  del.sync('dist')
})

gulp.task('scss', () => {
  return gulp.src('app/scss/**/style.scss')
      .pipe(plumber())
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(postcss([
            autoprefixer()
          ]
      ))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('app/css'))
      .pipe(browserSync.stream())
});

gulp.task('css', () => {
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/slick-carousel/slick/slick.css',
  ])
      .pipe(concat('_libs.scss'))
      .pipe(gulp.dest('app/scss'))
      .pipe(browserSync.stream())
});

gulp.task('pages', () => {
  return gulp.src('app/pug/pages/**/*.pug')
      .pipe(pug({
        pretty: true
      }))
      .pipe(gulp.dest('./app/pages'))
      .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', () => {
  return gulp.src('app/pug/pages/Houses/*.pug')
      .pipe(pug({
        pretty: true
      }))
      .pipe(rename('index.html'))
      .pipe(gulp.dest('./app'))
      .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', () => {
  return gulp.src('app/js/*.js')
      .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', () => {
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js'
  ])
      .pipe(concat('libs.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('app/js'))
      .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
});

gulp.task('export', () => {
  let buildHtml = gulp.src('app/pages/Houses/*.html')
      .pipe(rename('index.html'))
      .pipe(gulp.dest('dist'));

  let buildPages = gulp.src('app/pages/**/*.html')
      .pipe(gulp.dest('dist/pages'));

  let BuildCss = gulp.src('app/css/**/*.css')
      .pipe(gulp.dest('dist/css'));

  let BuildJs = gulp.src('app/js/**/*.js')
      .pipe(gulp.dest('dist/js'));

  let BuildFonts = gulp.src('app/fonts/**/*.*')
      .pipe(gulp.dest('dist/fonts'));

  let BuildImg = gulp.src('app/img/**/*.*')
      .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', () => {
  gulp.watch('app/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/**/*.pug', gulp.series('pages', 'html'))
  gulp.watch('app/js/*.js', gulp.parallel('script'))
  gulp.watch('app/*.html').on('change', browserSync.reload)
  gulp.watch('app/*.pug').on('change', browserSync.reload)
});

gulp.task('build', gulp.series('clean', 'export'))

gulp.task('default', gulp.parallel('css' ,'scss', 'js','pages' ,'html', 'browser-sync', 'watch'));

