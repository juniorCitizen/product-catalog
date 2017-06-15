import dotenv from 'dotenv'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import open from 'open'

dotenv.config()
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
gulp.task('hbs', require('./gulpTasks/assets/hbs')(gulp, plugins))
gulp.task('favicon', require('./gulpTasks/assets/favicon')(gulp, plugins))
gulp.task('images', require('./gulpTasks/assets/images')(gulp, plugins))
gulp.task('prepAssets', gulp.parallel(
    'hbs',
    'favicon',
    'images'
))

// linting related tasks
gulp.task('lintServerFiles', require('./gulpTasks/eslint/lintServerFiles')(gulp, plugins))
gulp.task('lintClientFiles', require('./gulpTasks/eslint/lintClientFiles')(gulp, plugins))
gulp.task('lintFullSource', require('./gulpTasks/eslint/lintFullSource')(gulp, plugins))

// transpiling source code
gulp.task('transpileClientCode', require('./gulpTasks/transpile/transpileClientCode')(gulp, plugins))
gulp.task('transpileServerCode', require('./gulpTasks/transpile/transpileServerCode')(gulp, plugins))

// code optimizations
// gulp.task('optimizeCss', require('./gulpTasks/optimize/optimizeCss')(gulp, plugins))
gulp.task('uglifyClientCode', require('./gulpTasks/optimize/uglifyClientCode')(gulp, plugins))
gulp.task('uglifyServerCode', require('./gulpTasks/optimize/uglifyServerCode')(gulp, plugins))

// development services
gulp.task('hmr', require('./gulpTasks/devServer/hmr')(gulp, plugins))
gulp.task('nodemon', require('./gulpTasks/devServer/nodemon')(gulp, plugins))
gulp.task('startBrowser', (done) => {
    open(`${process.env.DEV_HOST}:${process.env.PORT}/${process.env.SYS_REF}`)
    return done()
})

// misc
gulp.task('saveExampleDb', require('./gulpTasks/misc/saveExampleDb')(gulp, plugins))
gulp.task('saveExampleEnvConfig', require('./gulpTasks/misc/saveExampleEnvConfig')(gulp, plugins))
gulp.task('saveExampleFiles', gulp.parallel(
    'saveExampleDb',
    'saveExampleEnvConfig'
))

// build for development
gulp.task('startDevServer',
    gulp.series(
        gulp.parallel(
            gulp.series(
                'realignDistStructure',
                'prepAssets'
            ),
            'lintFullSource',
            'saveExampleFiles'
        ),
        'hmr',
        'startBrowser',
        gulp.series(
            'transpileServerCode',
            'nodemon'
        )
    )
)

// build for production
gulp.task('productionBuild',
    gulp.series(
        gulp.parallel(
            gulp.series(
                'realignDistStructure',
                'prepAssets'
            ),
            'lintFullSource',
            'saveExampleFiles'
        ),
        gulp.parallel(
            gulp.series(
                'transpileClientCode',
                // gulp.parallel(
                //     'optimizeCss',
                'uglifyClientCode'
                // )
            ),
            gulp.series(
                'transpileServerCode',
                'uglifyServerCode'
            )
        )
    )
)
