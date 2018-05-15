# nuxt-product-catalog

> SSR product catalog website using NUXT and Storyblok headless CMS

## Storyblok Space Setup

``` bash
1. create a Storyblok account and login

2. generate a new personnal access token from the account management page and record this token in the .env file, under the 'STORYBLOK_MANAGEMENT_API_TOKEN' key

3. setup a new space

4. from the space settings page, generate new 'preview' and 'public' token.  Record the tokens and the space id in the .env file, under the following keys:

  * 'STORYBLOK_SPACE_ID'
  * 'STORYBLOK_API_PREVIEW_TOKEN'
  * 'STORYBLOK_API_PUBLIC_TOKEN'
```

## Project Seeding

``` bash
1. create 'seedData.xlsx' excel file, 'carouselPhotos' folder and 'certifications' folder under './bin/seedData'

2. add carousel photos and certification logos as needed to the respective folders

3. fill out 'seedData.xlsx' spread sheet

4. run 'npm run starter', this will generate an barebone 'catalog' folder under './bin/seedData' that matches the data provided by 'seedData.xlsx'.  Proceed to add product and category photographs to the folder structure.

## DO NOT MANUALLY EDIT THE FOLDERS, edit the seedData.xlsx and rerun the start command to update the catalog folder structure

5. run 'npm run builder', this will parse the desired data structure and build it out in the specified Storyblok space.

## BEWARE - this script starts by removing all existing stories, components and assets from the specified content space, do not run this command on a required space

6. run 'npm run upload', this will upload all product photo as Storyblok assets.  Depending on the number of products and photos, this will take quite a while.

7. at this point, the 'development' environment is ready to run.  Before 'production' deployment, be sure to run 'npm run publish'.  This will publish all contents for production build.
```

## Project Building Commands

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
