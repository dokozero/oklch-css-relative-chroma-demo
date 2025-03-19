import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * Node script to create manualPaletteOklchValues.ts file.
 * This file contains the oklch() values of the palette with the manual tokens.
 * It is used to add these value in the ColorPalette.tsx file.
 */

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const scssFilePath = path.join(__dirname, './styles/sass/manual-palette-tokens.scss')
const tsFilePath = path.join(__dirname, './data/manualPaletteOklchValues.ts')

const scssContent = fs.readFileSync(scssFilePath, 'utf8')

// Regular expression to extract variables.
const regex = /--b__color__(\w+)__manual-rc__(\d+):\s*([^;]+);/g

const colorValues = {}

let match
while ((match = regex.exec(scssContent)) !== null) {
  const [, color, shade, value] = match
  if (!colorValues[color]) {
    colorValues[color] = {}
  }
  colorValues[color][shade] = value.trim()
}

// Generate TypeScript content
const tsContent = `
  type ManualPaletteOklchValues = {
    [key: string]: {
      [key: string]: string
    }
  }

  export const manualPaletteOklchValues: ManualPaletteOklchValues = ${JSON.stringify(colorValues, null, 2)};\n
`

// Write the TypeScript file
fs.writeFileSync(tsFilePath, tsContent, 'utf8')

console.log('TypeScript file successfully generated:', tsFilePath)
