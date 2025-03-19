#!/bin/zsh

# Exit immediately if a command exits with a non-zero status.
set -e

# Process sass code and run postcss-oklch-relative-chroma plugin.
pnpm all-css-build

# Build typescript
tsc -b

# Bundle code with vite into dist/ folder
vite build
