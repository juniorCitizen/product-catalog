import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import path from 'path'

const plugins = gulpLoadPlugins({
    lazy: true,
    camelize: true
})

function requireTaskPath(pathString) {
    return require(path.resolve(path.join('./src/gulpTasks', pathString)))(gulp, plugins)
}

// backup tasks
gulp.task('backupDatabase', requireTaskPath('/backup/backupDatabase'))
gulp.task('backupEnvConfig', requireTaskPath('/backup/backupEnvConfig'))
gulp.task('backup', gulp.parallel(
    'backupDatabase',
    'backupEnvConfig'
))

// clean up related tasks
gulp.task('removeLogs', requireTaskPath('/cleanup/removeLogs'))
gulp.task('removeDistFolder', requireTaskPath('/cleanup/removeDistFolder'))
gulp.task('generateClientFolders', requireTaskPath('/cleanup/generateClientFolders'))
gulp.task('realignDistStructure', gulp.parallel(
    'removeLogs',
    gulp.series(
        'removeDistFolder',
        'generateClientFolders'
    )
))

// asset preparations
gulp.task('commonAssets', requireTaskPath('/assets/commonAssets'))
gulp.task('hbsTemplates', requireTaskPath('/assets/hbsTemplates'))
gulp.task('prepAssets', gulp.parallel(
    'commonAssets',
    'hbsTemplates'
))

// linting related tasks
gulp.task('lintClientSideCode', requireTaskPath('/eslint/lintClientSideCode'))
gulp.task('lintServerSideCode', requireTaskPath('/eslint/lintServerSideCode'))
gulp.task('lintFullSource', requireTaskPath('/eslint/lintFullSource'))

// server preperation task routines
gulp.task('prepDevServer', gulp.series(
    'backup',
    'realignDistStructure',
    gulp.parallel(
        'lintFullSource',
        'prepAssets'
    )
))

// development server task routines
gulp.task('watchTemplates', requireTaskPath('/devServer/watchTemplates'))
gulp.task('nodemon', requireTaskPath('/devServer/nodemon'))
gulp.task('startBrowser', requireTaskPath('/devServer/startBrowser'))
