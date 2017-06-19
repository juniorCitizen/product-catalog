module.exports = (gulp, plugins) => {
    return () => {
        return gulp
            .src('./src/client/assets/favicon/favicon.ico')
            .pipe(gulp.dest('./dist/client/favicon'))
    }
}
