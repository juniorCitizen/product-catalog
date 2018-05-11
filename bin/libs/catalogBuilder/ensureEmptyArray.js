// check array length and exist if not empty

module.exports = data => {
  if (data.length > 0) {
    // console.dir(data)
    console.log('script terminated')
    console.log('array is not empty')
    return process.exit(1)
  }
  return true
}
