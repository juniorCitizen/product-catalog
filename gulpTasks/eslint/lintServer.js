import fs from 'fs'

require('dotenv').config()

module.exports = (gulp, plugins) => {
    return () => {
        return gulp.src([
                'src/server/**/*.js'
            ])
            .pipe(plugins.if(process.env.NODE_ENV === 'development', plugins.print()))
            .pipe(plugins.eslint('./.eslintrc'))
            .pipe(plugins.eslint.format())
            .pipe(plugins.eslint.format('stylish', fs.createWriteStream('./eslintServer.log')))
            .pipe(plugins.eslint.failOnError())
    }
}
