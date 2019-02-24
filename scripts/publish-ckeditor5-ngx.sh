#!/usr/bin/env bash

cd projects/angular-ckeditor5

npm --no-git-tag-version version patch

ng build angular-ckeditor5 --prod

cd ../../dist/angular-ckeditor5

npm publish

cd ../../

git add .

git commit -m "new version published"

git push
