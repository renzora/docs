# Time Plugin

The **time** plugin is responsible for managing in-game time, updating hours, minutes, seconds, and days based on the game’s delta time and a configurable speed multiplier. It also provides a formatted display of the current time.

## Loading plugin
To load the time plugin from the `plugins/core` directory, use the following code:
```
plugin.load("time", { path: "core" });
```

## Example

Since the **time** plugin is exposed as a global object via the plugin system, you can modify its properties from anywhere in your code. For instance, you can directly update the hours, minutes, seconds, or even the speed multiplier like this:

```js
// Set the in-game time to 22:15:00 and slow down time progression
plugin.time.hours = 22;
plugin.time.minutes = 15;
plugin.time.seconds = 0;
plugin.time.speedMultiplier = 50;

// Expected output: "Sun 22:15" (if days = 0)
console.log(plugin.time.display());
```

## Api Reference

- **hours** *(number)*  
  The current hour of the day (0–23).  
  _Default: 22_

- **minutes** *(number)*  
  The current minute (0–59).  
  _Default: 0_

- **seconds** *(number)*  
  The current seconds (0–59).  
  _Default: 0_

- **days** *(number)*  
  The total number of days that have passed.  
  _Default: 0_

- **speedMultiplier** *(number)*  
  A multiplier that speeds up (or slows down) time progression.  
  _Default: 100_

- **active** *(boolean)*  
  Indicates whether the time simulation is active.  
  _Default: true_

- **daysOfWeek** *(Array&lt;string&gt;)*  
  An array of day names, used for formatting the display output.  
  _Default: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]_

---

### Methods

- **start()**  
  Initializes the time plugin.  
  _Usage:_  
  This method is intended to perform any startup routines needed for the time simulation. Currently, it is empty and can be customized as needed.

- **unmount()**  
  Cleans up or stops the time plugin when it is no longer needed.  
  _Usage:_  
  This method is available for cleanup tasks. It is currently empty and can be extended for proper resource management.

- **onRender()**  
  A hook method that is called during the render cycle.  
  _Behavior:_  
  Internally, it calls the `update()` method to progress the in-game time.  
  _Usage:_  
  This method should be hooked into the game’s render loop to continuously update the time.

- **update()**  
  Updates the time properties based on the elapsed game time.  
  _Process:_  
  - Checks if the time simulation is active.  
  - Increments seconds based on the game’s `deltaTime` and the `speedMultiplier`.  
  - Converts excess seconds into minutes, minutes into hours, and hours into days as appropriate.  
  _Usage:_  
  Called automatically via `onRender()` during the game loop.

- **display()**  
  Returns a formatted string representing the current time.  
  _Format:_  
  Returns a string in the format: `"<DayOfWeek> HH:MM"`, where the day of the week is determined from the `daysOfWeek` array.  
  _Example:_  
  If `days = 1`, `hours = 9`, and `minutes = 5`, the method returns `"Mon 09:05"`.  
  _Usage:_  
  Call this method to display the current in-game time to the user.