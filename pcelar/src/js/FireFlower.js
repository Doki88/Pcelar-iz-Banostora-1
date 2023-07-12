import { createImage, createImageAsync } from "./utils.js";
import spriteFireFlower from "../img/spriteFireFlower.png";
import { c } from "./canvas.js";
import { canvas } from "./canvas.js";
import { gravity } from "./canvas.js";

export class FireFlower {
  constructor({ position, velocity }) {
    this.position = {
      x: position.x,
      y: position.y,
    };

    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };

    this.width = 36;
    this.height = 40;

    this.image = createImage(spriteFireFlower);
  }

  draw() {
    c.drawImage(
      this.image,
      0,
      0,
      356,
      360,
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
  }
}
