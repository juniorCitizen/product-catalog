const fs = require('fs-extra')
const Promise = require('bluebird')

const config = require('./libs/config')

const api = require('./libs/storyblokApi')

let photoMappingData = fs.readJsonSync(config.flatProductListFilePath)

Promise.each(photoMappingData, (dataEntry, index) => {
  if (dataEntry.uploaded === true) {
    console.log(`story: '${dataEntry.code}' is skipped`)
    return Promise.resolve()
  } else {
    console.log(`working on: ${dataEntry.code}`)
    return api
      .getStory(dataEntry.id)
      .then(story => {
        let newContent = story.content
        delete newContent._uid
        delete newContent.specification[0]._uid
        delete newContent.specification[0].details[0]._uid
        return api
          .uploadAsset(dataEntry.primaryPhotoPath)
          .then(prettyUrl => {
            newContent.primaryPhoto = prettyUrl
            if (dataEntry.secondaryPhotoPaths.length === 0)
              return Promise.resolve()
            return Promise.map(dataEntry.secondaryPhotoPaths, photoPath => {
              return api
                .uploadAsset(photoPath)
                .then(prettyUrl => {
                  newContent.secondaryPhotos.push({
                    component: 'Photo',
                    url: prettyUrl,
                  })
                  return Promise.resolve()
                })
                .catch(error => Promise.reject(error))
            })
          })
          .then(() => {
            return api
              .updateStory(story.id, story.name, newContent)
              .then(() => {
                photoMappingData[index].uploaded = true
                return fs.outputJson(
                  config.flatProductListFilePath,
                  photoMappingData
                )
              })
              .catch(error => Promise.reject(error))
          })
          .then(() => {
            console.log(`story '${story.name}' completed`)
            return Promise.resolve()
          })
          .catch(error => {
            console.log(`error while working on: ${story.name}`)
            return Promise.reject(error)
          })
      })
      .catch(error => Promise.reject(error))
  }
})
  .then(() => {
    console.dir(
      photoMappingData.filter(dataEntry => {
        return dataEntry.uploaded === false
      })
    )
    console.log('photo uploader task completed')
    return Promise.resolve()
  })
  .catch(error => {
    console.log('photo uploader did not finish')
    return Promise.reject(error)
  })
