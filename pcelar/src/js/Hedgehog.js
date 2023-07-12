import spriteHodgehogLeft from "../img/spriteHodgehogLeft.png";
import spriteHodgehogRight from "../img/spriteHodgehogRight.png";
import { createImage, createImageAsync } from "./utils.js";
import { c } from "./canvas.js";
import { canvas } from "./canvas.js";
import { gravity } from "./canvas.js";

export class Hedgehog {
  constructor({
    position,
    velocity,
    distance = {
      limit: 50,
      traveled: 0,
    },
  }) {
    this.position = {
      x: position.x,
      y: position.y,
    };

    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };

    this.width = 60;
    this.height = 50;

    this.sprites = {
      stand: {
        right: createImage(spriteHodgehogRight),
        left: createImage(spriteHodgehogLeft),
      },
    };

    this.currentSprite = this.sprites.stand.left;

    this.distance = distance;
  }

  draw() {
    c.drawImage(
      this.currentSprite,
      0,
      0,
      455,
      340,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;

    // walk the goomba back and forth
    this.distance.traveled += Math.abs(this.velocity.x);

    if (this.distance.traveled > this.distance.limit) {
      this.distance.traveled = 0;
      this.velocity.x = -this.velocity.x;

      if (this.currentSprite === this.sprites.stand.left) {
        this.currentSprite = this.sprites.stand.right;
      } else {
        this.currentSprite = this.sprites.stand.left;
      }
    }
  }
}
