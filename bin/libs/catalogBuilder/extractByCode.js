module.exports = (data, code) => {
  let index = data.findIndex(dataEntry => {
    return dataEntry.code === code
  })
  if (index === -1) {
    console.log('script terminated')
    console.log(`code: ${code} does not exist within dataset`)
    process.exit(1)
  }
  return data.splice(index, 1)[0]
}
