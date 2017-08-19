import open from 'open'

require('dotenv').config()

module.exports = (gulp, plugins) => {
    return (done) => {
        setTimeout(() => {
            open(`${process.env.REMOTE_DEV_HOST}/${process.env.SYS_REF}`)
            return done()
        }, 10000)
    }
}
