import { createImage, createImageAsync } from "./utils.js";
import spriteStandRight from "../img/spriteStandRight.png";
import spriteMarioStandRight1 from "../img/spriteMarioStandRight1.png";
import spriteMarioStandLeft1 from "../img/spriteMarioStandLeft1.png";
import spriteFireFlowerStandRight from "../img/spriteFireFlowerStandRight.png";
import spriteFireFlowerStandLeft from "../img/spriteFireFlowerStandLeft.png";
import spriteMarioRunRight from "../img/spriteMarioRunRight.png";
import spriteMarioRunLeft from "../img/spriteMarioRunLeft.png";

import spriteFireFlowerRunRight from "../img/spriteFireFlowerRunRight.png";
import spriteFireFlowerRunLeft from "../img/spriteFireFlowerRunLeft.png";
import spriteMarioJumpRight from "../img/spriteMarioJumpRight.png";
import spriteMarioJumpLeft from "../img/spriteMarioJumpLeft.png";
import spriteFireFlowerJumpRight from "../img/spriteFireFlowerJumpRight.png";
import spriteFireFlowerJumpLeft from "../img/spriteFireFlowerJumpLeft.png";
import { images } from "./images.js";
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

import { gravity } from "./canvas.js";
export class Player {
  constructor() {
    this.shooting = false;
    this.speed = 10;
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };

    this.scale = 0.3;
    this.width = 398 * this.scale;
    this.height = 353 * this.scale;

    this.image = createImage(spriteStandRight);
    this.frames = 0;
    this.sprites = {
      stand: {
        right: createImage(spriteMarioStandRight1),
        left: createImage(spriteMarioStandLeft1),
        fireFlower: {
          right: createImage(spriteFireFlowerStandRight),
          left: createImage(spriteFireFlowerStandLeft),
        },
      },
      run: {
        right: createImage(spriteMarioRunRight),
        left: createImage(spriteMarioRunLeft),
        fireFlower: {
          right: createImage(spriteFireFlowerRunRight),
          left: createImage(spriteFireFlowerRunLeft),
        },
      },
      jump: {
        right: createImage(spriteMarioJumpRight),
        left: createImage(spriteMarioJumpLeft),
        fireFlower: {
          right: createImage(spriteFireFlowerJumpRight),
          left: createImage(spriteFireFlowerJumpLeft),
        },
      },
      shoot: {
        fireFlower: {
          right: createImage(images.mario.shoot.fireFlower.right),
          left: createImage(images.mario.shoot.fireFlower.left),
        },
      },
    };

    this.currentSprite = this.sprites.stand.right;
    this.currentCropWidth = 398;
    this.powerUps = {
      fireFlower: false,
    };
    this.invincible = false;
    this.opacity = 1;
  }

  draw() {
    c.save();
    // c.globalAlpha = this.opacity;
    // c.fillStyle = "rgba(255, 0, 0, .2)";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.drawImage(
      this.currentSprite,
      this.currentCropWidth * this.frames,
      0,
      this.currentCropWidth,
      353,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    c.restore();
  }

  update() {
    this.frames++;
    const { currentSprite, sprites } = this;

    if (
      this.frames > 58 &&
      (currentSprite === sprites.stand.fireFlower.left ||
        currentSprite === sprites.stand.fireFlower.right)
    )
      this.frames = 0;
    else if (currentSprite === sprites.stand.right) {
      this.frames = 0;
    } else if (currentSprite === sprites.stand.left) {
      this.frames = 0;
    } else if (
      this.frames > 28 &&
      (currentSprite === sprites.run.right ||
        currentSprite === sprites.run.left ||
        currentSprite === sprites.run.fireFlower.right ||
        currentSprite === sprites.run.fireFlower.left)
    )
      this.frames = 0;
    else if (
      currentSprite === sprites.jump.right ||
      currentSprite === sprites.jump.left ||
      currentSprite === sprites.jump.fireFlower.right ||
      currentSprite === sprites.jump.fireFlower.left ||
      currentSprite === sprites.shoot.fireFlower.left ||
      currentSprite === sprites.shoot.fireFlower.right
    )
      this.frames = 0;

    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;

    if (this.invincible) {
      if (this.opacity === 1) this.opacity = 0;
      else this.opacity = 1;
    } else this.opacity = 1;
  }
}
