import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'

const plugins = gulpLoadPlugins({
    lazy: true,
    camelize: true
})

// clean up related tasks
gulp.task('logs', require('./gulpTasks/cleanup/logs')(gulp, plugins))
gulp.task('resetDistContents', require('./gulpTasks/cleanup/resetDistContents')(gulp, plugins))

// asset preparations
gulp.task('hbs', require('./gulpTasks/assets/hbs')(gulp, plugins))
gulp.task('html', require('./gulpTasks/assets/html')(gulp, plugins))
gulp.task('favicon', require('./gulpTasks/assets/favicon')(gulp, plugins))
gulp.task('images', require('./gulpTasks/assets/images')(gulp, plugins))

// linting related tasks
gulp.task('lintServerFiles', require('./gulpTasks/eslint/lintServerFiles')(gulp, plugins))
gulp.task('lintClientFiles', require('./gulpTasks/eslint/lintClientFiles')(gulp, plugins))
gulp.task('lintFullSource', require('./gulpTasks/eslint/lintFullSource')(gulp, plugins))

// transpiling source code
gulp.task('transpileClientCode', require('./gulpTasks/transpile/transpileClientCode')(gulp, plugins))
gulp.task('transpileServerCode', require('./gulpTasks/transpile/transpileServerCode')(gulp, plugins))

// code optimizations
gulp.task('minifyCSS', require('./gulpTasks/optimize/minifyCSS')(gulp, plugins))
gulp.task('uglifyClientCode', require('./gulpTasks/optimize/uglifyClientCode')(gulp, plugins))
gulp.task('uglifyServerCode', require('./gulpTasks/optimize/uglifyServerCode')(gulp, plugins))

// development services
gulp.task('hmr', require('./gulpTasks/devServer/hmr')(gulp, plugins))
gulp.task('nodemon', require('./gulpTasks/devServer/nodemon')(gulp, plugins))

// build for development
gulp.task('startDevServer',
    gulp.series(
        gulp.parallel(
            'logs',
            'resetDistContents',
            'lintFullSource'
        ),
        'hmr',
        gulp.parallel(
            'hbs',
            'html',
            'favicon',
            'images',
        ),
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
            'logs',
            'resetDistContents',
            'lintFullSource'
        ),
        gulp.parallel(
            'hbs',
            'html',
            'favicon',
            'images',
            gulp.series(
                'transpileClientCode',
                gulp.parallel(
                    'minifyCSS',
                    'uglifyClientCode'
                )
            ),
            gulp.series(
                'transpileServerCode',
                'uglifyServerCode'
            )
        )
    )
)
