import { events } from "../../Events.js";
import {GameObject} from "../../GameObject.js"
import { resources } from "../../Resource.js";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2.js";

export class Inventory extends GameObject {
    constructor(){
        super({position: new Vector2(0, 1),});
        //React to pickup
        events.on("HERO_PICKS_UP_ITEM",this,data =>{
            const sprite = new Sprite({
                resource: resources.images.rod,
            })
            this.addChild(sprite);
          })
    }
}