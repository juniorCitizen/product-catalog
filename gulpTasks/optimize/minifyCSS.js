module.exports = (gulp, plugins) => {
    return () => {
        return gulp.src('./dist/client/app.css')
            .pipe(plugins.autoprefixer('last 2 version'))
            .pipe(plugins.csso())
            .pipe(gulp.dest('./dist/client'))
    }
}
