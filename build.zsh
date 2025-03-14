#!/bin/zsh

# Exit immediately if a command exits with a non-zero status.
set -e

# Process the css files in src.
pnpm all-css-build

# Create the dist folder and copy the index.html and css file into it.
mkdir -p ./dist/demo
cp ./src/demo/index.html ./dist/demo/index.html

mkdir -p ./dist/demo/css/css-absolute-chroma
cp ./src/demo/css/css-absolute-chroma/main.css ./dist/demo/css/css-absolute-chroma/main.css
