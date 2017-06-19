module.exports = (gulp, plugins) => {
    return () => {
        return gulp
            .src('./src/client/assets/misc/placeholder.css')
            .pipe(plugins.rename('app.css'))
            .pipe(gulp.dest('./dist/client/style'))
    }
}
