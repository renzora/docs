# Asset Management
Learn how to load, manage, and use game assets efficiently.
## Loading Assets
### Basic Asset Loading
```js
assets.preload([
  { name: "player", path: "assets/sprites/player.png" },
  { name: "tiles", path: "assets/sprites/tiles.png" },
  { name: "config", path: "assets/data/config.json" }
], () => {
  console.log("Assets loaded!");
});
```
## Asset Types
### Images
```js
// Load sprite sheets
assets.preload([
  { name: "characters", path: "sprites/characters.png" }
]);

// Use in game
game.ctx.drawImage(assets.use("characters"), sx, sy, sw, sh, dx, dy, dw, dh);
```

### Audio
```js
// Load sound effects
assets.preload([
  { name: "jump", path: "assets/audio/jump.mp3" }
]);

// Play audio
const jumpSound = assets.use("jump");
jumpSound.play();
```
### JSON Data
```js
// Load game data
assets.preload([
  { name: "objectData", path: "assets/json/objectData.json" },
  { name: "spriteData", path: "assets/json/spriteData.json" }
]);

// Access data
const objects = assets.use("objectData");
const spriteConfig = assets.use("spriteData");
```

## Asset Management
### Unloading Assets
```js
// Remove asset from memory
assets.unload("temporaryAsset");
```

### Check if asset exists
``` js
if (assets.use("assetName"))
```

### Reloading Assets
```js
// Force reload assets
assets.reloadAssets(assetsList, () => {
  console.log("Assets reloaded");
});
```
## Organization
### Recommended Structure
```
assets/
├── sprites/
│   characters/
│   ├── player.png
│   └── npcs.png
├── audio/
│   ├── music/
│   └── sfx/
└── json/
    ├── objectData.json
    └── spriteData.json
```
## Example: Complete Asset Loading
```js
// Asset loading configuration
const gameAssets = [
  // Sprite sheets
  { name: "female-01", path: "assets/img/sprites/characters/female-01.png" },
  { name: "tiles", path: "assets/img/sprites/environment/tiles.png" },
  // Game data
  { name: "objectData", path: "assets/json/objectData.json" },
  { name: "spriteData", path: "assets/json/spritesData.json" },
  // Audio
  { name: "bgMusic", path: "assets/audio/background.mp3" },
  { name: "effects", path: "assets/audio/effects.mp3" }
];

assets.preload(gameAssets, () => {
  // Create game objects
  const playerSprite = sprite.create({
    id: "player1",
    type: "female-01",
    speed: 70
  });
  
  // Initialize game
  game.create({
    objectData: assets.use("objectData"),
    spriteData: assets.use("spriteData"),
    player: playerSprite,
    after: () => {
      // Start background music
      const music = assets.use("bgMusic");
      music.play();
      sprite.init();
    }
  });
});
```