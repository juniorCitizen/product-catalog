module.exports = (gulp, plugins) => {
    return () => {
        return plugins.watch('./src/client/index.dev.html', () => {
            gulp.src('./src/client/index.dev.html')
                .pipe(plugins.rename('index.html'))
                .pipe(gulp.dest('./dist/client'))
        })
    }
}
