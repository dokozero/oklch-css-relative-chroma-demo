#!/bin/zsh

# Exit immediately if a command exits with a non-zero status
set -e

pnpm all-css-build

mkdir -p ./dist/demo
cp ./src/demo/index.html ./dist/demo/index.html

mkdir -p ./dist/demo/css/css-absolute-chroma
cp ./src/demo/css/css-absolute-chroma/main.css ./dist/demo/css/css-absolute-chroma/main.css
