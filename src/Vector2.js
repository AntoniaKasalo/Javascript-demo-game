export class Vector2{
    constructor(x =0, y=0){
        this.x = x;
        this.y = y;
        console.log("Vector2 created:", this);
    }

    duplicate() {
        console.log("Duplicating Vector2:", this);
        return new Vector2(this.x, this.y);
    }
}