module.exports = (gulp, plugins) => {
    return () => {
        return gulp
            .src('./src/frontend/assets/images/*.png')
            .pipe(gulp.dest('./dist/assets/images'))
    }
}
