module.exports = (gulp, plugins) => {
    return () => {
        return gulp
            .src('./src/client/assets/carousel/**/*')
            .pipe(gulp.dest('./dist/server/client/assets/carousel'))
    }
}
