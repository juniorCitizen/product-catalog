import open from 'open'

require('dotenv').config()

module.exports = (gulp, plugins) => {
    return (done) => {
        setTimeout(() => {
            open(`${process.env.DEV_HOST}:${process.env.PORT}`)
            return done()
        }, 10000)
    }
}
