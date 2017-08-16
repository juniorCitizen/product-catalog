import chalk from 'chalk'

require('dotenv').config()

// nodemon monitors the '/dist' folder
// files are copied to the '/dist' folder when changes are detected by various watchers
// nodemon restarts when '.js' file or server-side templates are changed
// use browerify hot-reloading so nodemon doesn't watch .vue files
const nodemonOptions = {
    env: {
        'PORT': process.env.LOCAL_PORT,
        'NODE_ENV': process.env.NODE_ENV
    },
    script: './dist/server/server.js',
    watch: ['./dist'],
    ext: 'js hbs',
    ignore: ['./dist/server/client/lib/app.js'],
    runOnChangeOnly: true,
    delay: 1000,
    verbose: process.env.NODE_ENV !== 'production',
    restartable: 'rs'
}

module.exports = (gulp, plugins) => {
    return (done) => {
        return plugins.nodemon(nodemonOptions)
            .on('start', () => {
                console.log(chalk.bold.red(`*** server started on port: ${chalk.bold.blue(process.env.PORT)}...`))
            })
            .on('restart', (event) => {
                console.log(chalk.bold.red(`*** server restarted on port: ${chalk.bold.blue(process.env.PORT)}...`))
                if (event) {
                    console.log(chalk.bold.red(`files triggered the restart: ${chalk.bold.blue(event)}...`))
                }
            })
            .on('crash', () => {
                console.log(chalk.bold.red('*** server had crashed...'))
                return done()
            })
            .on('exit', () => {
                console.log(chalk.bold.red('*** server had been shutdown...'))
                return done()
            })
    }
}
