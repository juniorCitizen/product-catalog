require('dotenv-safe').config()

const axios = require('axios')
const fs = require('fs-extra')
const Promise = require('bluebird')
const rp = require('request-promise')
const rpr = require('request-promise-retry')(rp)

const apiUrl = process.env.STORYBLOK_MANAGEMENT_API_URL
const spaceId = parseInt(process.env.STORYBLOK_SPACE_ID)
const token = process.env.STORYBLOK_MANAGEMENT_API_TOKEN

const axiosInst = axios.create({
  baseURL: `${apiUrl}/spaces/${spaceId}`,
  headers: {Authorization: token},
})

module.exports = {
  getStory,
  getUnpublishedStories,
  getStories,
  resolveStory,
  createStory,
  updateStory,
  publishStory,
  deleteStory,
  getComponent,
  getComponents,
  resolveComponent,
  createComponent,
  updateComponent,
  deleteComponent,
  getAssets,
  deleteAsset,
  uploadAsset,
}

function publishStory(storyId) {
  return axiosInst
    .get(`/stories/${storyId}/publish`)
    .catch(error => Promise.reject(error))
}

function getUnpublishedStories() {
  let stories = []
  return axiosInst
    .get('/stories')
    .then(res => {
      let pageCount = Math.ceil(res.headers.total / res.headers['per-page'])
      let paramsOptList = []
      for (let x = 1; x <= pageCount; x++) {
        paramsOptList.push({params: {page: x}})
      }
      return Promise.each(paramsOptList, (params, index) => {
        return axiosInst
          .get('/stories', params)
          .then(res => {
            console.log(`getting stories from page ${index + 1}`)
            stories = stories.concat(res.data.stories)
            return Promise.resolve()
          })
          .catch(error => Promise.reject(error))
      })
    })
    .then(() => {
      console.log(`total stories fetched: ${stories.length}`)
      return Promise.resolve(
        stories.filter(story => {
          return !story.published
        })
      )
    })
    .then(unpublished => {
      console.log(`total unpublished story pages: ${unpublished.length}`)
      return Promise.resolve(unpublished)
    })
    .catch(error => Promise.reject(error))
}

function getStories() {
  return axiosInst
    .get('/stories')
    .then(res => Promise.resolve(res.data.stories))
    .catch(error => Promise.reject(error))
}

function resolveStory(res) {
  return Promise.resolve(res.data.story)
}

function getStory(storyId) {
  return axiosInst
    .get(`/stories/${storyId}`)
    .then(resolveStory)
    .catch(error => Promise.reject(error))
}

function createStory(storyData) {
  return axiosInst
    .post('/stories', storyData)
    .then(res => {
      console.log(`'${storyData.story.name}' story created`)
      return Promise.resolve(res)
    })
    .then(resolveStory)
    .catch(error => Promise.reject(error))
}

function updateStory(storyId, name, content) {
  return axiosInst
    .put(`/stories/${storyId}`, {
      story: {name, content},
    })
    .then(resolveStory)
    .catch(error => Promise.reject(error))
}

function deleteStory(storyId) {
  return axiosInst.delete(`/stories/${storyId}`)
}

function getComponents() {
  return axiosInst
    .get('/components')
    .then(res => Promise.resolve(res.data.components))
    .catch(error => Promise.reject(error))
}

function resolveComponent(res) {
  return Promise.resolve(res.data.component)
}

function getComponent(componentId) {
  return axiosInst
    .get(`/components/${componentId}`)
    .then(resolveComponent)
    .catch(error => Promise.reject(error))
}

function createComponent(componentData) {
  return axiosInst
    .post('/components', componentData)
    .then(resolveComponent)
    .then(component => {
      console.log(`'${component.name}' component created...`)
      return Promise.resolve(component)
    })
    .catch(error => Promise.reject(error))
}

function updateComponent(componentId, componentData) {
  return axiosInst
    .put(`/components/${componentId}`, componentData)
    .then(resolveComponent)
    .catch(error => Promise.reject(error))
}

function deleteComponent(componentId) {
  return axiosInst.delete(`/components/${componentId}`)
}

function getAssets() {
  return axios({
    method: 'get',
    url: `${apiUrl}/spaces/${spaceId}/assets`,
    headers: {Authorization: token},
    params: {
      per_page: 1000,
    },
  })
    .then(res => Promise.resolve(res.data.assets))
    .catch(error => Promise.reject(error))
}

function deleteAsset(assetId) {
  return axiosInst
    .get(`/assets/${assetId}`)
    .then(() => {
      console.log(`asset '${assetId}' deleted`)
      return Promise.resolve()
    })
    .catch(error => Promise.reject(error))
}

function uploadAsset(assetPath) {
  // check if asset actually existed
  let filename = assetPath.split('\\').pop()
  return fs
    .pathExists(assetPath)
    .then(exists => {
      let error = new Error(`image: '${assetPath}' does not exist`)
      return !exists ? Promise.reject(error) : Promise.resolve()
    })
    .then(() => {
      // sign the asset with storyblok
      return rpr({
        method: 'post',
        uri: `${apiUrl}/spaces/${spaceId}/assets`,
        body: {filename},
        headers: {Authorization: token},
        json: true,
      })
    })
    .then(signedRequest => {
      // actual upload of the asset
      let formData = signedRequest.fields
      formData.file = {
        value: fs.createReadStream(assetPath),
        options: {
          filename,
          contentType: signedRequest.fields['Content-Type'],
        },
      }
      return rpr({
        method: 'post',
        uri: signedRequest.post_url,
        formData,
      }).then(() => {
        console.log(`'${filename}' uploaded`)
        return Promise.resolve(signedRequest.pretty_url)
      })
    })
    .catch(error => Promise.reject(error))
}
