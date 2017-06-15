import pump from 'pump'

module.exports = (gulp, plugins) => {
    return (callback) => {
        return pump([
            gulp.src('./dist/client/app.js'),
            plugins.uglify(),
            gulp.dest('./dist/client')
        ],
        callback)
    }
}
