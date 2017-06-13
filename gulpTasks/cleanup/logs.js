import del from 'del'

module.exports = (gulp, plugins) => {
    return (done) => {
        del.sync('./*.logs')
        return done()
    }
}
