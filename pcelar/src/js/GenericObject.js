import { c } from "./canvas.js";

export class GenericObject {
  constructor({ x, y, image, kuca, size }) {
    this.position = {
      x,
      y,
    };

    this.velocity = {
      x: 0,
    };

    this.image = image;

    this.width = image.width;
    this.height = image.height;
    this.kuca = kuca;
  }

  draw() {
    if (this.kuca) console.log("crtam");
    c.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
  }
}
