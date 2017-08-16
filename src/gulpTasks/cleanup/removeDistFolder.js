import del from 'del'

module.exports = (gulp, plugins) => {
    return () => {
        return del('./dist/**/*.*')
    }
}
