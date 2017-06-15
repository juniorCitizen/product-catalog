import pump from 'pump'

module.exports = (gulp, plugins) => {
    return (callback) => {
        return pump([
            gulp.src(['./dist/server/**/*.js']),
            plugins.uglify(),
            gulp.dest('./dist/server')
        ],
        callback)
    }
}
