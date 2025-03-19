import ColorPalette from './components/ColorPalette/ColorPalette'
import './styles/css-absolute-chroma/main.css'

const App = () => {
  return (
    <div className="s-section">
      <div className="s-container">
        <h2>✅ Relative chroma palette</h2>
        <p>
          The palette's colors are made with the new notation: oklch(colorspace L RC H), where RC is a relative chroma. You can
          see that we got nice results compared to the next example with a fixed absolute chroma value for all lightness variants.
        </p>
        <p className="u-mb-10">
          The color codes used are like this (values from the first red palette below): <br />
          oklch(display-p3 5% 90% 10) to oklch(display-p3 95% 90% 10) by lightness steps of 5%.
        </p>
        <ColorPalette paletteChromaType="rc" />
      </div>

      <div className="s-container">
        <h2>⚠️ Absolute chroma palette</h2>
        <p>
          Here, we use the same absolute chroma value for all lightness variants. You can see that for some colors, because of the
          browser clipping method, we got hue and lightness shifts.
        </p>
        <p className="u-mb-10">
          The color codes used are like this (values from the first red palette below): <br />
          oklch(5% 0.37 10) to oklch(95% 0.37 10) by lightness steps of 5%.
        </p>
        <ColorPalette paletteChromaType="ac" />
      </div>
    </div>
  )
}

export default App
