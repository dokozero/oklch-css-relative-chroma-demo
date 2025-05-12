import ColorPalette from '../ColorPalette/ColorPalette'
import '../../styles/css-absolute-chroma/main.css'

const App = () => {
  return (
    <div className="s-section">
      <div className="s-container u-pt-0">
        <h1>OkLCH CSS relative chroma demo</h1>

        <p>
          Demo file for the{' '}
          <a href="https://github.com/dokozero/postcss-oklch-relative-chroma" rel="noreferrer" target="_blank">
            PostCSS OkLCH relative chroma plugin
          </a>
          .
        </p>

        <p className="u-mb-10">
          Check{' '}
          <a href="https://github.com/dokozero/oklch-css-relative-chroma-demo" rel="noreferrer" target="_blank">
            {' '}
            the demo repo{' '}
          </a>{' '}
          to modify it.
        </p>

        <h2>✅ Relative chroma palettes</h2>
        <p className="u-mb-10">
          The palette's colors are made with the new notation: oklch(gamut L RC H), where RC is a relative chroma. You can see
          that we got nice results compared to the next example with a fixed absolute chroma value for all lightness variants.
        </p>
        <ColorPalette paletteChromaType="rc" />
      </div>

      <div className="s-container">
        <h2>⚠️ Absolute chroma palettes</h2>
        <p className="u-mb-10">
          Here, we use the same absolute chroma value for all lightness variants. You can see that for some colors, because of the
          browser clipping method, we got hue and lightness shifts.
        </p>
        <ColorPalette paletteChromaType="ac" />
      </div>

      <div className="s-container">
        <h2>✅ Relative chroma palettes with manual chroma/hue adjustments</h2>
        <p>
          From the first example, you can see that some lightness variants seem to stand out more. As explained in the readme,
          that's because some hues have a peak chroma close to white.
        </p>
        <p className="u-mb-10">
          If we need to create good-looking palettes before design, with the relative chroma feature it's easy. As you can see in
          manual-palette-tokens.scss, all you need to do is reduce the relative chroma for the lightness variants that stand out
          and shift the hues (with a fixed step value) of some palettes like yellow to compensate for the lack of chroma in darker
          variants.
        </p>
        <ColorPalette paletteChromaType="manual-rc" />
      </div>
    </div>
  )
}

export default App
