module.exports = (gulp, plugins) => {
    return () => {
        return gulp
            .src('./.env')
            .pipe(plugins.rename('example.env'))
            .pipe(gulp.dest('.'))
    }
}
