import fs from 'fs'

module.exports = (gulp, plugins) => {
    return (done) => {
        copy(
            './node_modules/jquery/dist/jquery.min.js',
            './dist/client/jquery.min.js'
        ) // jquery
        copy(
            './node_modules/foundation-sites/dist/js/foundation.min.js',
            './dist/client/foundation.min.js'
        ) // foundation
        return done()
    }

    function copy(origPath, destPath) {
        fs.createReadStream(origPath)
            .pipe(fs.createWriteStream(destPath))
    }
}
