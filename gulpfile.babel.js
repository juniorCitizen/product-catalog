import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'

require('dotenv').config()

const plugins = gulpLoadPlugins({
    lazy: true,
    camelize: true
})

// clean up related tasks
gulp.task('removeLogs', require('./gulpTasks/cleanup/removeLogs')(gulp, plugins))
gulp.task('resetDist', require('./gulpTasks/cleanup/resetDist')(gulp, plugins))
gulp.task('realignDistStructure', gulp.parallel(
    'removeLogs',
    'resetDist'
))

// asset preparations
gulp.task('cssPlaceholder', require('./gulpTasks/assets/cssPlaceholder')(gulp, plugins))
gulp.task('index.html', require('./gulpTasks/assets/index.html')(gulp, plugins))
gulp.task('favicon', require('./gulpTasks/assets/favicon')(gulp, plugins))
gulp.task('images', require('./gulpTasks/assets/images')(gulp, plugins))
gulp.task('prepAssets', gulp.parallel(
    'index.html',
    'images',
    'favicon'
))

// linting related tasks
gulp.task('lintClient', require('./gulpTasks/eslint/lintClient')(gulp, plugins))
gulp.task('lintServer', require('./gulpTasks/eslint/lintServer')(gulp, plugins))
gulp.task('lintSource', require('./gulpTasks/eslint/lintSource')(gulp, plugins))

// misc tasks
gulp.task('saveExampleDb', require('./gulpTasks/misc/saveExampleDb')(gulp, plugins))
gulp.task('saveExampleEnvConfig', require('./gulpTasks/misc/saveExampleEnvConfig')(gulp, plugins))
gulp.task('saveExampleFiles', gulp.parallel(
    'saveExampleDb',
    'saveExampleEnvConfig'
))

// devServer
gulp.task('watchDevIndex', require('./gulpTasks/devServer/watchers/watchDevIndex')(gulp, plugins))
gulp.task('nodemon', require('./gulpTasks/devServer/nodemon')(gulp, plugins))
gulp.task('startBrowser', require('./gulpTasks/devServer/startBrowser')(gulp, plugins))

// task combinations
gulp.task('prepDevServer', gulp.series(
    'realignDistStructure',
    gulp.parallel(
        'saveExampleFiles',
        'lintSource'
    ),
    gulp.parallel(
        'prepAssets',
        'cssPlaceholder'
    )
))
