module.exports = (gulp, plugins) => {
    return () => {
        return gulp
            .src('./src/frontend/assets/favicon/favicon.png')
            .pipe(gulp.dest('./dist/assets/favicon'))
    }
}
