module.exports = {
    sass: {
        includePaths: [
            './src/frontend/assets/scss',
            './bower_components/foundation-sites/scss',
            './bower_components/motion-ui/src'
        ]
    },
    babel: {
        babelrc: true,
        comments: process.env.NODE_ENV === 'production' ? false : true,
        presets: ['es2015', 'stage-2'],
        sourceMaps: true // set to 'false' to map to post-transpiled code
    }
}
