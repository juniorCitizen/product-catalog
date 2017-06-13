module.exports = (gulp, plugins) => {
    return () => {
        return gulp
            .src('./src/frontend/index.html')
            .pipe(gulp.dest('./dist/client'))
    }
}
