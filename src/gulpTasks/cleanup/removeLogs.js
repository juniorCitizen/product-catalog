import del from 'del'

module.exports = (gulp, plugins) => {
    return () => {
        // remove all log files from the base directory
        return del('./*.log')
    }
}
