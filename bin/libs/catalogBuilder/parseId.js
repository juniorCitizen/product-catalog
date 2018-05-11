// parse id number from a folder's absolute path

module.exports = dirPath => {
  let folderName = dirPath.split('\\').pop()
  let parts = folderName.split('-')
  if (parts.length === 1 && parts[0] === 'catalog') {
    return 0
  } else {
    return parseInt(parts[0])
  }
}
