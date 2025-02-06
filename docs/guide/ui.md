# UI Plugin
The ui plugin is currently new so has a limited amount of uses but over time, this will change and we will update the documentation when new features are added. You can currently access full screen mode and check for the prescence of mobile devices.

## Loading Plugin
To load the ui plugin from the `plugins/core` directory, use the following code:

```js
plugin.load("ui", { path: "core" });
```

## Example
Below is an example of how to use the ui plugin functions:

``` js
// Check if the device is mobile
if (plugin.ui.isMobile()) {
  console.log("Mobile device detected");
} else {
  console.log("Desktop device detected");
}

// Toggle fullscreen mode
plugin.ui.fullScreen();
```

## Api Reference

**isMobile()**  
*Description:*  
Determines whether the current device is mobile by checking the user agent string for Android or iOS indicators and verifying if the viewport width is 768px or less.  
*Returns:*  
- **boolean** — `true` if the device is considered mobile; otherwise, `false`.

---

**fullScreen()**  
*Description:*  
Toggles the fullscreen mode of the document.  
- If the document is not in fullscreen, it requests fullscreen mode using `requestFullscreen()` or its vendor-prefixed variants.
- If the document is already in fullscreen, it exits fullscreen using `exitFullscreen()` or its vendor-prefixed variants.
- On Android devices, it attaches an event listener to scroll the window (hiding the browser's URL bar) when entering fullscreen.  
*Returns:*  
- **void**