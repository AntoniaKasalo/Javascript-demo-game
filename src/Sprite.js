import { GameObject } from "./GameObject";
import { Vector2 } from "./Vector2";

export class Sprite extends GameObject{
    constructor({
        resource, //image we want to draw
        frameSize, //size of the crop of the image
        hFrames, //horizontal how the sprite arranged
        vFrames, //vertical -||-
        frame, // which frame we want to show
        scale, // how large to draw this image
        position, // where to draw it(top left corner)
        animations,
    }) {
        super({});
        this.resource = resource;
        this.frameSize = frameSize ?? new Vector2(32, 32);
        this.hFrames= hFrames ?? 1; // ?? default, if no frames use 1
        this.vFrames = vFrames ?? 1;
        this.frame = frame ?? 0;
        this.frameMap = new Map();
        this.scale = scale ?? 1;
        this.position = position ?? new Vector2(0,0);
        this.animations = animations ?? null;
        this.buildFrameMap();
    }
    buildFrameMap(){
        let frameCount = 0;
        for(let v = 0; v<this.vFrames; v++){
            for(let h = 0; h<this.hFrames; h++){
                this.frameMap.set(
                    frameCount,
                    new Vector2(this.frameSize.x * h, this.frameSize.x * v)
                )
                frameCount++;
            }
        }
    }

    step(delta) {
        if(!this.animations){
            return;
        }
        this.animations.step(delta);
        this.frame = this.animations.frame;
        
    }

    drawImage(ctx, x, y){
        if(!this.resource.isLoaded){
            return;
        }
        //Find the correct sprite sheet frame to use
        let frameCoordX = 0;
        let frameCoordY = 0;
        const frame = this.frameMap.get(this.frame);
        if(frame){
            frameCoordX = frame.x;
            frameCoordY = frame.y;
        }

        const frameSizeX = this.frameSize.x;
        const frameSizeY = this.frameSize.y;

        ctx.drawImage(
            this.resource.image,
            frameCoordX,
            frameCoordY, //Top Y corner of frame
            frameSizeX, // How much to crop from the sprite sheet X
            frameSizeY, // How much to crop from the sprite sheet Y 
            x, // where to place this on canvas tag x(0)
            y, //where to place this on canvas tag y(0)
            frameSizeX * this.scale, //how large to scale it(x)
            frameSizeY * this.scale, //how large to scale it(y)
        )
    }
} 
