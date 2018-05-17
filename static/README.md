# STATIC

**This directory is not required, you can delete it if you don't want to use it.**

This directory contains your static files.
Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/assets#static).

# DEPLOYMENT TO GITHUB PAGES

1. steps for first deployment:

  1. create a github pages repository with its name exactly as your github account

  2. run 'git clone https://github.com/username/username.github.io' under the root folder of where the deployment files should reside.  This will create a 'username.github.io' folder under the root folder

  3. run 'npm run generate' on your static site project, to build the static site files, which are placed under the './dist' folder

  4. copy everything under this './dist' folder to the 'username.github.io' folder

  5. with a terminal console, move to 'username.github.io' folder, then run:
      $ git add -all
      $ git commit -m "commit message/information"
      $ git push -u origin master

  6. fire up 'https://username.github.io" in your browser

2. future deployment steps:

  1. run 'npm run generate' at the project folder

  2. remove everything under 'username.github.io' folder

  3. copy everything under './dist' to 'username.github.io'

  4. with a terminal console, run the following commands at the 'username.github.io' folder:
      $ git add -all
      $ git commit -m "commit message/information"
      $ git push -u origin master

  5. done
