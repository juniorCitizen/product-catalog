# nuxt-product-catalog

> SSR product catalog website using NUXT and Storyblok headless CMS

## Build Setup

``` bash
# install dependencies
$ npm install

# create empty catalog folder structure from ./bin/seedData/seedData.xlsx
$ npm run starter

# create data structure on Storyblok server
$ npm run builder

# upload assets (may take quite a while depending on the number of assets)
$ npm run uploader

# serve with hot reload at localhost:3000
$ npm run dev

# publish all Storyblok contents
$ npm run publish

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```


For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org) and [Storyblok docs](https://www.storyblok.com/docs/Prologue/Introduction).
