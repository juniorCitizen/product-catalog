module.exports = (gulp, plugins) => {
    return () => {
        return gulp
            .src([
                // company brouchure
                './src/client/assets/misc/gentry_way_brouchure.pdf',
                // static website logo and icons
                './src/client/assets/logos/gentryLogo.png',
                './src/client/assets/logos/gentryLogo.jpg',
                './src/client/assets/logos/favicon.png',
                './src/client/assets/logos/favicon.ico',
                // country flag svg images
                './node_modules/world-countries/data/**/*.svg'
            ])
            .pipe(gulp.dest(`./dist/server/client/assets`))
    }
}
