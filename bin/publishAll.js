const Promise = require('bluebird')

const api = require('./libs/storyblokApi')

api
  .getUnpublishedStories()
  .then(unpublished => {
    return Promise.each(unpublished, (story, index, length) => {
      return api
        .publishStory(story.id)
        .then(() => {
          let message = `story (id: '${story.id}') published... ${index +
            1}/${length}`
          console.log(message)
          return Promise.resolve()
        })
        .catch(error => Promise.reject(error))
    }).catch(error => Promise.reject(error))
  })
  .catch(error => {
    console.log(error)
    return process.exit(1)
  })
