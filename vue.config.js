module.exports = {
    sass: {
        includePaths: [
            './src/frontend/scss',
            './node_modules/foundation-sites/scss'
        ]
    },
    babel: {
        babelrc: true,
        comments: process.env.NODE_ENV === 'production' ? false : true,
        presets: ['es2015', 'stage-2'],
        sourceMaps: true // set to 'false' to map to post-transpiled code
    }
}
