# Collision Plugin

## Loading Plugin
To load the collision plugin from the `plugins/core` directory, use the following code:

```js
plugin.load("collision", { path: "core" });
```

## Example Usage
Below is an example of how collision detection works. Currently it's built into the sprite movement natively so you don't need to do anything after you load the plugin.

``` js
const collisionResult = plugin.collision.check(newX, newY, sprite, previousX, previousY);
if (collisionResult.collisionDetected) {
  console.log("Collision detected! Adjusting sprite position...");
} else {
  console.log("No collision detected. Proceeding with movement...");
}
```


## API Reference

**cornerBuffer**  
*Description:*  
A numerical buffer used in collision calculations.  
*Type:*  
- **number**  
*Default:*  
16

---

**pointInPolygon(px, py, polygon)**  
*Description:*  
Determines if a point (px, py) lies within a polygon defined by an array of points. This method uses a ray-casting algorithm to toggle an inside flag based on edge intersections.  
*Parameters:*  
- `px` *(number)*: The x-coordinate of the point.  
- `py` *(number)*: The y-coordinate of the point.  
- `polygon` *(Array)*: An array of point objects (each with `x` and `y` properties) that define the polygon.  
*Returns:*  
- **boolean** — `true` if the point is inside the polygon; otherwise, `false`.

---

**check(x, y, sprite, previousX, previousY)**  
*Description:*  
Checks whether a moving sprite collides with any objects in the current game room. The method evaluates multiple points around the sprite against object boundaries defined in the room data. If a collision is detected, the sprite’s position is adjusted using a calculated slide vector.  
*Parameters:*  
- `x` *(number)*: The new x-coordinate for the sprite.  
- `y` *(number)*: The new y-coordinate for the sprite.  
- `sprite` *(object)*: The sprite object being tested.  
- `previousX` *(number)*: The sprite’s previous x-coordinate.  
- `previousY` *(number)*: The sprite’s previous y-coordinate.  
*Returns:*  
- **object** — An object with a property `collisionDetected` (boolean) indicating whether a collision occurred.

---

**calculateSlideVector(startX, startY, endX, endY, polygon)**  
*Description:*  
Calculates a vector that defines the direction and distance for a sprite to slide along an obstacle after a collision. It determines the movement vector, computes its perpendicular, and then checks both perpendicular directions to choose the one with the minimal displacement required to clear the collision.  
*Parameters:*  
- `startX` *(number)*: The starting x-coordinate before movement.  
- `startY` *(number)*: The starting y-coordinate before movement.  
- `endX` *(number)*: The attempted new x-coordinate of the sprite.  
- `endY` *(number)*: The attempted new y-coordinate of the sprite.  
- `polygon` *(Array, optional)*: The polygon representing the colliding object's boundaries.  
*Returns:*  
- **object** — An object with properties `x` and `y` representing the slide vector scaled by the calculated distance.

---

**checkPath(startX, startY, dirX, dirY, polygon)**  
*Description:*  
Traces a path from a starting point in a given direction to determine the distance the sprite can move before it exits the colliding area. The method increments the distance until a point is found that is not within the specified polygon.  
*Parameters:*  
- `startX` *(number)*: The starting x-coordinate for the path check.  
- `startY` *(number)*: The starting y-coordinate for the path check.  
- `dirX` *(number)*: The x component of the direction vector.  
- `dirY` *(number)*: The y component of the direction vector.  
- `polygon` *(Array)*: The polygon representing the obstacle’s boundaries.  
*Returns:*  
- **object** — An object containing:  
  - `distance` *(number)*: The distance traversed until a non-colliding point was found.  
  - `vector` *(object)*: An object with `x` and `y` properties indicating the direction of the path.
