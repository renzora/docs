# Lighting Plugin

![](https://i.imgur.com/5F3AEFs.png)

![](https://i.imgur.com/xwmUYb1.png)

## Loading Plugin
To load the lighting plugin from the `plugins/core` directory, use the following code:

```js
plugin.load("lighting", { path: "core" });
```

## Plugin Configuration

Within the lighting plugin, the `config` property defines the time settings for the day-night cycle. You can adjust the following properties:

- **dayStart**: Hour when the day begins.
- **sunsetStart**: Hour when sunset starts.
- **nightStart**: Hour when night begins.
- **nightEnd**: Hour when night ends.
- **sunriseEnd**: Hour when sunrise is complete.

Example configuration:

```js
config: {
  dayStart: 7,
  sunsetStart: 19.5,
  nightStart: 22,
  nightEnd: 5,
  sunriseEnd: 7
}
```

## Usage
The day/night lighting cycle is built into the game render by default using the `onRender()` hook. No configuration is needed.

## Adding Lights
Use `lighting.addLight(...)` to add custom light sources. For example:

``` js
lighting.addLight(
  'sample_light',
  100, 100,               // x, y coordinates
  150,                    // radius
  { r: 255, g: 200, b: 150 }, // color
  1,                      // maximum intensity
  'lamp',                 // type
  true,                   // enable flicker
  0.05,                   // flickerSpeed
  0.1                     // flickerAmount
);
```

## Clearing Lights and Effects:
To remove all lights (except for the player’s light), call:

``` js
lighting.clearLightsAndEffects();
```

Lighting depends on the `time` plugin. Please make sure it's added to the plugin preload queue first before adding the `lighting` plugin. It will likely still work but it's good to make sure.

## API Reference

### Properties

- **config**  
  - `dayStart` (Number): Hour when the day begins.
  - `sunsetStart` (Number): Hour when sunset starts.
  - `nightStart` (Number): Hour when night begins.
  - `nightEnd` (Number): Hour when night ends.
  - `sunriseEnd` (Number): Hour when sunrise is complete.

- **lights** (Array): Active light objects.
- **lightsActive** (Boolean): Enables or disables light processing.
- **nightFilterActive** (Boolean): Enables or disables the night filter effect.
- **nightFilter** (Object): Appearance settings for the night filter.
  - `dayColor` (Object): Daytime color `{ r, g, b }`.
  - `nightColor` (Object): Nighttime color `{ r, g, b }`.
  - `compositeOperation` (String): Canvas composite operation.
  - `brightness` (Number): Brightness multiplier.
  - `saturation` (Number): Saturation multiplier.
  - `manualColor` (Object): Manual override color `{ r, g, b }`.
- **timeBasedUpdatesEnabled** (Boolean): Toggles time-based updates.
- **useManualRGB** (Boolean): Forces use of the manual night filter color.
- **lightIntensityMultiplier** (Number): (0–1) Controls light intensity based on time.
- **lastBaseNightFilterColor** (Object): Caches the last base night filter color.
- **lastProcessedNightFilterColor** (Object): Caches the last processed night filter color.

### Methods

- **addLight(id, x, y, radius, color, maxIntensity, type, flicker, flickerSpeed, flickerAmount, shape)**  
  _Description:_ Adds a new light source if one with the given `id` does not already exist.

- **clearLightsAndEffects()**  
  _Description:_ Clears all light sources and resets particle effects, preserving the player's light if present.

- **unmount()**  
  _Description:_ Placeholder method for cleanup when unmounting the plugin.

- **onRender()**  
  _Description:_ Main method to update the day-night cycle, process lights, and render the night filter. Should be called in the game’s render loop.

- **renderLights()**  
  _Description:_ Processes game room data to add or update lights based on object visibility and viewport constraints.

- **updateLights()**  
  _Description:_ Applies dynamic effects (such as flickering) to each light source.

- **updateDayNightCycle()**  
  _Description:_ Computes the `lightIntensityMultiplier` based on the current time using the settings in `config`.

- **createBaseNightFilter()**  
  _Description:_ Creates and returns a canvas overlay for the night filter with interpolated colors.

- **applyBrightnessSaturation(color, brightness, saturation)**  
  _Description:_ Adjusts a given color's brightness and saturation.

- **renderLightsOnFilter(maskCtx)**  
  _Description:_ Draws light sources onto the night filter using radial gradients.

- **renderFinalOverlay(ctx, maskCanvas)**  
  _Description:_ Renders the composite night filter overlay onto the main game canvas.

- **lerp(a, b, t)**  
  _Description:_ Utility function for linear interpolation between two numeric values.

- **lerpColor(colorA, colorB, t)**  
  _Description:_ Utility function for linear interpolation between two colors.