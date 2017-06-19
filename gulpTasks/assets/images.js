module.exports = (gulp, plugins) => {
    return () => {
        return gulp
            .src([
                './src/client/assets/images/**/*.png',
                './src/client/assets/images/**/*.jpg'
            ])
            .pipe(gulp.dest('./dist/client/assets/images'))
    }
}
