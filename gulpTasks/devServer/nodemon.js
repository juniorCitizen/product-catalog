// import browserSync from 'browser-sync'
import chalk from 'chalk'
import path from 'path'

const nodemonOptions = {
    env: {
        'PORT': process.env.PORT,
        'NODE_ENV': process.env.NODE_ENV
    },
    script: './dist/server/server.js',
    watch: ['./src/backend/'],
    ignore: [],
    ext: 'js hbs',
    delayTime: 1,
    tasks: (changedFiles) => {
        let tasks = []
        changedFiles.forEach((file) => {
            if (
                path.extname(file) === '.js' &&
                !~tasks.indexOf('refreshServerCode')
            ) tasks.push('refreshServerCode')
            if (
                path.extname(file) === '.hbs' &&
                !~tasks.indexOf('hbs')
            ) tasks.push('hbs')
        })
        return tasks
    },
    verbose: false
}

// const browserSyncOptions = {
//     // proxy: `${process.env.DEV_HOST}/${process.env.PORT}`,
//     // port: process.env.BROWSERSYNC_PORT,
//     proxy: `${process.env.DEV_HOST}:${process.env.PORT}/${process.env.SYS_REF}`,
//     port: process.env.BROWSERSYNC_PORT,
//     // ghostMode: {
//     //     clicks: true,
//     //     location: false,
//     //     forms: true,
//     //     scroll: true
//     // },
//     // injectChanges: true,
//     // logFileChanges: true,
//     // logLevel: 'debug',
//     // logPrefix: 'gulp-output',
//     notify: true,
//     reloadDelay: 1000
// }

module.exports = (gulp, plugins) => {
    gulp.task('hbs', require('../assets/hbs')(gulp, plugins))
    gulp.task('serverSideLint', require('../eslint/lintServerFiles')(gulp, plugins))
    gulp.task('transpileServerCode', require('../transpile/transpileServerCode')(gulp, plugins))
    gulp.task('refreshServerCode', gulp.series(
        'serverSideLint',
        'transpileServerCode'
    ))

    return (done) => {
        return plugins.nodemon(nodemonOptions)
            .on('start', () => {
                // browserSync.create().init(browserSyncOptions)
                console.log(chalk.bold.blue(`*** server started on port: ${process.env.PORT}...`))
            })
            .on('restart', (event) => {
                // browserSync.reload()
                console.log(chalk.bold.green(`*** server restarted on port: ${process.env.PORT}...`))
                if (event) {
                    console.log(chalk.bold.green(
                        `files triggered the restart: ${chalk.bold.blue(event)}...`
                    ))
                }
            })
            .on('crash', () => {
                console.log(chalk.bold.red('*** server had crashed...'))
                return done()
            })
            .on('exit', () => {
                console.log(chalk.bold.blue('*** server had been shutdown...'))
                return done()
            })
    }
}
