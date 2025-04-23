import {
  LIGHTNESS_MIN_VALUE,
  LIGHTNESS_MAX_VALUE,
  LIGHTNESS_STEPS,
  COLOR_NAMES,
  GAMUT,
  RELATIVE_CHROMA,
  ABSOLUTE_CHROMA
} from '../../data/constants'
import { manualPaletteOklchValues } from '../../data/manualPaletteOklchValues'

type Props = {
  paletteChromaType: 'rc' | 'ac' | 'manual-rc'
}

const getLightnessValues = (): number[] => {
  const lightnessValues = []

  for (let lightness = LIGHTNESS_MIN_VALUE; lightness <= LIGHTNESS_MAX_VALUE; lightness += LIGHTNESS_STEPS) {
    lightnessValues.push(lightness)
  }

  lightnessValues.push(95)

  return lightnessValues
}

export default function ColorPalette(props: Props) {
  const { paletteChromaType } = props
  const lightnessValues = getLightnessValues()

  return (
    <div className="c-color-palettes-container">
      {[...COLOR_NAMES.entries()].map(([hue, colorName]) => (
        <div key={hue} className="c-color-palette">
          {lightnessValues.map((lightness) => (
            <div key={lightness}>
              <div
                className={`c-color-palette__lightness-variant c-color-palette__lightness-variant--${paletteChromaType}-${colorName}${lightness}`}
              ></div>
              <p className="c-color-palette__color-code">
                <b>
                  {colorName}
                  {lightness}
                </b>{' '}
                <br />
                {paletteChromaType !== 'manual-rc' && (
                  <>
                    oklch({paletteChromaType === 'rc' && `${GAMUT} `}
                    {lightness}% {paletteChromaType === 'rc' ? `${RELATIVE_CHROMA}%` : ABSOLUTE_CHROMA} {hue})
                  </>
                )}
                {paletteChromaType === 'manual-rc' && <>{manualPaletteOklchValues[colorName][lightness]}</>}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
