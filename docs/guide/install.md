# Requirements
- Docker Desktop: https://www.docker.com/products/docker-desktop

## Installing Renzora Engine

Open your terminal of choice (make sure docker desktop is running). Before starting the server make sure you edit ```.env``` to change the environment variables to suit your needs.
``` bash
git clone https://github.com/renzora/engine.git
cd engine
docker compose up --build
```

## Docker Services
- Client: Nginx ```(port 80/443)```
- Game Engine: ```http://localhost```
- Fastify Api endpoint: ```http://localhost:3000```

### Default MongoDB
- URI: ```mongodb://admin:this_is_a_test_password@localhost:27017/```
- Host: ```localhost```
- Port: ```27017```
- Database Name: ```renzora```
- Mongo Username: ```admin```
- Mongo Password: ```this_is_a_test_password```

## init.js
The init.js file in your root directory serves as the central configuration for your game engine. This file is where you'll handle essential setup tasks like:

- Loading your plugins  
- Preloading assets  
- Setting up a game loop  
- Creating sprites  

Let's look at a basic setup example:
First, use `assets.preload()` to load your core assets - in this case, a tilesheet image and JSON object data. Next, create your sprite using `sprite.create()`, where you can specify both the sprite's ID and movement speed (check the sprite documentation for additional configuration options).
Finally, initialize your game loop with `game.create()`. This function takes your object data and sprite as parameters, setting up the necessary scene interactions.
```js
assets.preload([
    { name: "player", path: "assets/img/sprites/player.png" },
    { name: "objectData", path: "assets/json/objectData.json" },
], () => {

    const playerSprite = sprite.create({
        id: "player1",
        speed: 70
    });

    game.create({
        objectData: assets.use("objectData"),
        player: playerSprite,
        after: () => {
            sprite.init();
        }
    });
});
```
## Engine Architecture
The engine is built around several core modules:

`game.js` Main game loop and rendering  
`assets.js` Asset loading and management  
`sprite.js` Sprite creation and animation  
`input.js` Input handling  
`camera.js` Camera and viewport management  
`plugin.js` Plugin system  

Each module is designed to work independently while maintaining seamless integration with other components.
## Plugin System
The engine features a powerful plugin system that allows you to extend the engine with ui overlays, effects, background workers and more. There is a community plugins repo which can be found [here](https://github.com/renzora/plugins)
```js
plugin.load('collision', {
    after: () => {
        console.log('Collision system ready');
    }
});
```