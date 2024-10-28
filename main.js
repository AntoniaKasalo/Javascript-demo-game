import { Camera } from './src/Camera.js';
import { events } from './src/Events.js';
import { Gameloop } from './src/GameLoop.js';
import { GameObject } from './src/GameObject.js';
import { gridCells, isSpaceFree } from './src/helpers/grid.js';
import { Input} from './src/Input.js';
import { Hero } from './src/objects/Hero/Hero.js';
import { Inventory } from './src/objects/Inventory/Inventory.js';
import { Rod } from './src/objects/Rod/Rod.js';
import { resources } from './src/Resource.js';
import { Sprite } from './src/Sprite.js';
import { Vector2 } from './src/Vector2.js';
import './style.css'

// Grabbing the canvas to draw to
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

// Establish the root scene
const mainScene = new GameObject({
  position: new Vector2(0,0),
})
// Build up the scene bu adding the sky a ground and hero
const skySprite = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(320, 180)
})


const groundSprite = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(320, 180)
})
mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(6),gridCells(5));
mainScene.addChild(hero);

const camera = new Camera()
mainScene.addChild(camera);

const rod = new Rod(gridCells(7),gridCells(6));
mainScene.addChild(rod);

const inventory = new Inventory();


//Add an input class to the main scene
mainScene.input = new Input();




//Establish update and draw loops
const update = (delta) => {
  mainScene.stepEntry(delta,mainScene);
};


const draw = () => {

  //Clear anything stale
  ctx.clearRect(0,0, canvas.width , canvas.height);
  skySprite.draw(ctx,0,0)

  //Save the cuurent state(for camera offset)
  ctx.save();

  //Offset by camera position
  ctx.translate(camera.position.x,camera.position.y);


  mainScene.draw(ctx, 0, 0);

  //Restore to original state
  ctx.restore();

  //Draw anything above the game world
  inventory.draw(ctx, 0, 0)
}


//Start the game
const gameLoop = new Gameloop(update,draw);
gameLoop.start();
