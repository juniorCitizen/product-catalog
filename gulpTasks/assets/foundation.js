module.exports = (gulp, plugins) => {
    return () => {
        return gulp
            .src('../../node_modules/src/frontend/assets/favicon/favicon.png')
            .pipe(gulp.dest('./dist/assets/favicon'))
    }
}
