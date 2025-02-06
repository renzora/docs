## Plugin Hooks
In the plugin system, hooks provide a way for the core engine to trigger specific functions defined in plugins, allowing them to respond to various events or stages of the application lifecycle.

### How Hooks Work

- The `plugin.hook(hookName)` method iterates over every loaded plugin.
- For each plugin, it checks if a function matching the provided `hookName` exists (for example, `onRender`).
- If the function is found, it is invoked, allowing the plugin to execute its custom code for that particular hook.
- Errors thrown by any hook function are caught and logged, ensuring that one failing hook does not disrupt the entire system.

### Benefits of Using Hooks

- **Extensibility:** Hooks allow new functionality to be added without modifying the core engine.
- **Decoupling:** The core engine simply triggers a hook, and any plugin that has defined that hook function will react accordingly.
- **Modularity:** Plugins independently manage their own responses to events. For instance, a lighting plugin may define an `onRender()` method to update and render lighting effects during each render cycle.

## Code Examples

#### Example: Defining a Plugin with Hooks

```js
examplePlugin = {
    // executes inside game.render()
    onRender() {
        console.log("examplePlugin onRender hook called")
    }
}
```

## Custom Hooks
You can create and place custom hooks anywhere. The best place for hooks to operate are within loops that need constant updates.
```js
first_plugin = {
    onCustomHook() {
        console.log("examplePlugin hook called from first_plugin")
    }
}

second_plugin = {
    onCustomHook() {
        console.log("examplePlugin hook called from second_plugin")
    }
}
```

```js
other_object = {
    example_function() {
        plugin.hook("onCustomHook")
    }
}
```

when `other_object.example_function()` is called, it will call the `onCustomHook` function from both `first_plugin` and `second_plugin`. You can add and execute hooks from any plugins and there are built in hooks defined in the core engine code that you can find in the api reference.

This mechanism allows plugins to extend the functionality of the core system without requiring direct integration into the engine's code.

## Api Reference
# Core Engine Hooks

Below is a list of the hooks available in the core engine along with a brief description of when each hook is triggered. Plugin developers can implement any of these hooks by defining the corresponding function on their global plugin object.

- **onGameCreate**  
  _Triggered after the game has been created and initialized (e.g., after setting up the canvas, input assignments, etc.)._

- **onPreUpdate**  
  _Triggered at the start of the game loop, before game objects are updated. Use this hook to modify or inspect the game state pre-update._

- **onPostUpdate**  
  _Triggered after game objects have been updated but before rendering begins. Useful for cleanup or additional state modifications._

- **onRenderBackground**  
  _Triggered after the background has been rendered. Plugins can use this hook to apply additional background effects or overlays._

- **beforeRender**  
  _Triggered before the rendering of game objects and sprites begins. Allows plugins to set up pre-render conditions._

- **afterRender**  
  _Triggered after rendering is complete. Ideal for post-processing effects or additional render overlays._

- **onGamePause**  
  _Triggered when the game is paused. Plugins may use this hook to suspend certain actions or animations._

- **onGameResume**  
  _Triggered when the game is resumed. Use this hook to restart or reinitialize paused components._

- **onAssetsLoaded**  
  _Triggered after all preloaded assets have finished loading. Allows plugins to safely access assets and perform asset-dependent initialization._

- **onReloadAssets**  
  _Triggered when assets are reloaded. Useful for plugins that need to reinitialize or adjust asset-dependent functionality._

- **onSpriteInit**  
  _Triggered immediately after a sprite is created or initialized. Plugins can use this to modify sprite properties or register additional behavior._

- **onSpriteUpdate**  
  _Triggered during the sprite update cycle. Plugins can use this hook to modify sprite behavior, animations, or implement additional visual effects._

- **onInputChange**  
  _Triggered when there is a change in the input method or input settings. Plugins can monitor and adjust behavior based on input configuration changes._

- **onInputAssign**  
  _Triggered after an input event listener is assigned. Useful for plugins that need to track when new input bindings are added._

- **onCameraUpdate**  
  _Triggered after the camera has updated its position. This hook allows plugins to react to camera movements or modify camera behavior._

- **onResizeCanvas**  
  _Triggered after the game canvas has been resized. Plugins can use this to adjust layout or reinitialize visual elements based on the new canvas size._

- **onSceneChange**  
  _Triggered when the scene changes (e.g., when a new scene is loaded or the current scene is updated). Plugins can use this hook to refresh scene-dependent settings or elements._

- **onZoom**  
  _Triggered when the zoom level changes. This hook is useful for plugins that need to adjust scaling or re-calculate layout based on the current zoom level._

- **onPluginLoaded**  
  _Triggered after a plugin has been successfully loaded. Plugins can use this hook to perform post-load initialization or to interact with newly available functionality._