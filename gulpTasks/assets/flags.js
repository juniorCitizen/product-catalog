module.exports = (gulp, plugins) => {
    return () => {
        return gulp
            .src([
                './node_modules/world-countries/data/*.svg'
            ])
            .pipe(gulp.dest('./dist/client/assets/images/flags'))
    }
}
