import fs from 'fs'

require('dotenv').config()

module.exports = (gulp, plugins) => {
    return () => {
        return gulp.src([
                'gulpfile.babel.js',
                'src/**/*.js',
                'src/**/*.vue'
            ])
            .pipe(plugins.if(process.env.NODE_ENV === 'development', plugins.print()))
            .pipe(plugins.eslint('./.eslintrc'))
            .pipe(plugins.eslint.format())
            .pipe(plugins.eslint.format('stylish', fs.createWriteStream('./eslintSource.log')))
            .pipe(plugins.eslint.failOnError())
    }
}
