// import browserSync from 'browser-sync'
import chalk from 'chalk'
// import path from 'path'

require('dotenv').config()

// current setting only monitor dist folder for changes
// nodemon only handles server restart
const nodemonOptions = {
    env: {
        'PORT': process.env.PORT,
        'NODE_ENV': process.env.NODE_ENV
    },
    script: './dist/server/server.js',
    watch: [
        './dist/server/',
        './dist/client/'
    ],
    ext: 'js html',
    ignore: ['./dist/client/lib/app.js'],
    runOnChangeOnly: true,
    delay: 1000,
    verbose: process.env.NODE_ENV !== 'production',
    restartable: 'rs'
    // tasks: (changedFiles) => {
    //     let tasks = []
    //     changedFiles.forEach((file) => {
    //         if (
    //             path.extname(file) === '.js' &&
    //             !~tasks.indexOf('buildServer')
    //         ) tasks.push('buildServer')
    //         if (
    //             path.extname(file) === '.html' &&
    //             !~tasks.indexOf('html')
    //         ) tasks.push('index.html')
    //     })
    //     return tasks
    // }
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
    // gulp.task('index.html', require('../assets/index.html')(gulp, plugins))
    // gulp.task('serverSideLint', require('../eslint/lintServer')(gulp, plugins))
    // gulp.task('buildServer', require('../transpile/buildServer')(gulp, plugins))
    // gulp.task('refreshServerCode', gulp.series(
    //     'serverSideLint',
    //     'buildServer'
    // ))

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
