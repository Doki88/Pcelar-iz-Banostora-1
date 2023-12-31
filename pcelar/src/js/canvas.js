import gsap from "gsap";
import {
  createImage,
  createImageAsync,
  isOnTopOfPlatform,
  collisionTop,
  isOnTopOfPlatformCircle,
  hitBottomOfPlatform,
  hitSideOfPlatform,
  objectsTouch,
} from "./utils.js";

import { Player } from "./Player.js";
import { Platform } from "./Platform.js";
import { GenericObject } from "./GenericObject.js";
import { Kosnica } from "./Kosnica.js";
import { Goomba } from "./Goomba.js";
import { Hedgehog } from "./Hedgehog.js";
import { FireFlower } from "./FireFlower.js";
import { Particle } from "./Particle.js";

import platform from "../img/platform.png";
import hills from "../img/hills.png";
import background from "../img/background.png";
import platformSmallTall from "../img/platformSmallTall.png";
import block from "../img/block.png";
import blockTri from "../img/blockTri.png";
import platformSmall from "../img/platformSmall.png";
import mdPlatform from "../img/mdPlatform.png";
import lgPlatform from "../img/lgPlatform.png";
import tPlatform from "../img/tPlatform.png";
import xtPlatform from "../img/xtPlatform.png";
import flagPoleSprite from "../img/flagPole.png";
import tree1Sprite from "../img/tree1.png";
import tree2Sprite from "../img/tree2.png";
import tree3Sprite from "../img/tree3.png";
import tree4Sprite from "../img/tree4.png";
import tree5Sprite from "../img/tree5.png";
import tree6Sprite from "../img/tree6.png";
import tree7Sprite from "../img/tree7.png";
import tree8Sprite from "../img/tree8.png";

import kos2Sprite from "../img/kos2.png";
import kos4Sprite from "../img/kos4.png";
import kos5Sprite from "../img/kos5.png";

import motocultSprite from "../img/motocult.png";

import kuca1Sprite from "../img/kuca1.png";
import kuca2Sprite from "../img/kuca2.png";
import kuca3Sprite from "../img/kuca3.png";
import djedoviSprite from "../img/djedovi.png";
import lubeniceSprite from "../img/lubenice.png";

import { audio } from "./audio.js";
import { images } from "./images.js";

export const canvas = document.querySelector("canvas");
export const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 676;

let gravity = 1.5;

// class Player {
//   constructor() {
//     this.shooting = false;
//     this.speed = 10;
//     this.position = {
//       x: 100,
//       y: 100,
//     };
//     this.velocity = {
//       x: 0,
//       y: 0,
//     };

//     this.scale = 0.3;
//     this.width = 398 * this.scale;
//     this.height = 353 * this.scale;

//     this.image = createImage(spriteStandRight);
//     this.frames = 0;
//     this.sprites = {
//       stand: {
//         right: createImage(spriteMarioStandRight1),
//         left: createImage(spriteMarioStandLeft1),
//         fireFlower: {
//           right: createImage(spriteFireFlowerStandRight),
//           left: createImage(spriteFireFlowerStandLeft),
//         },
//       },
//       run: {
//         right: createImage(spriteMarioRunRight),
//         left: createImage(spriteMarioRunLeft),
//         fireFlower: {
//           right: createImage(spriteFireFlowerRunRight),
//           left: createImage(spriteFireFlowerRunLeft),
//         },
//       },
//       jump: {
//         right: createImage(spriteMarioJumpRight),
//         left: createImage(spriteMarioJumpLeft),
//         fireFlower: {
//           right: createImage(spriteFireFlowerJumpRight),
//           left: createImage(spriteFireFlowerJumpLeft),
//         },
//       },
//       shoot: {
//         fireFlower: {
//           right: createImage(images.mario.shoot.fireFlower.right),
//           left: createImage(images.mario.shoot.fireFlower.left),
//         },
//       },
//     };

//     this.currentSprite = this.sprites.stand.right;
//     this.currentCropWidth = 398;
//     this.powerUps = {
//       fireFlower: false,
//     };
//     this.invincible = false;
//     this.opacity = 1;
//   }

//   draw() {
//     c.save();
//     // c.globalAlpha = this.opacity;
//     // c.fillStyle = "rgba(255, 0, 0, .2)";
//     // c.fillRect(this.position.x, this.position.y, this.width, this.height);
//     c.drawImage(
//       this.currentSprite,
//       this.currentCropWidth * this.frames,
//       0,
//       this.currentCropWidth,
//       353,
//       this.position.x,
//       this.position.y,
//       this.width,
//       this.height
//     );
//     c.restore();
//   }

//   update() {
//     this.frames++;
//     const { currentSprite, sprites } = this;

//     if (
//       this.frames > 58 &&
//       (currentSprite === sprites.stand.fireFlower.left ||
//         currentSprite === sprites.stand.fireFlower.right)
//     )
//       this.frames = 0;
//     else if (currentSprite === sprites.stand.right) {
//       this.frames = 0;
//     } else if (currentSprite === sprites.stand.left) {
//       this.frames = 0;
//     } else if (
//       this.frames > 28 &&
//       (currentSprite === sprites.run.right ||
//         currentSprite === sprites.run.left ||
//         currentSprite === sprites.run.fireFlower.right ||
//         currentSprite === sprites.run.fireFlower.left)
//     )
//       this.frames = 0;
//     else if (
//       currentSprite === sprites.jump.right ||
//       currentSprite === sprites.jump.left ||
//       currentSprite === sprites.jump.fireFlower.right ||
//       currentSprite === sprites.jump.fireFlower.left ||
//       currentSprite === sprites.shoot.fireFlower.left ||
//       currentSprite === sprites.shoot.fireFlower.right
//     )
//       this.frames = 0;

//     this.draw();
//     this.position.x += this.velocity.x;
//     this.position.y += this.velocity.y;

//     if (this.position.y + this.height + this.velocity.y <= canvas.height)
//       this.velocity.y += gravity;

//     if (this.invincible) {
//       if (this.opacity === 1) this.opacity = 0;
//       else this.opacity = 1;
//     } else this.opacity = 1;
//   }
// }

// class Platform {
//   constructor({ x, y, image, block, text }) {
//     this.position = {
//       x,
//       y,
//     };

//     this.velocity = {
//       x: 0,
//     };

//     this.image = image;
//     this.width = image.width;
//     this.height = image.height;
//     this.block = block;
//     this.text = text;
//   }

//   draw() {
//     c.drawImage(this.image, this.position.x, this.position.y);

//     if (this.text) {
//       c.font = "20px Arial";
//       c.fillStyle = "red";
//       c.fillText(this.text, this.position.x, this.position.y);
//     }
//   }

//   update() {
//     this.draw();
//     this.position.x += this.velocity.x;
//   }
// }

// class GenericObject {
//   constructor({ x, y, image, kuca, size }) {
//     this.position = {
//       x,
//       y,
//     };

//     this.velocity = {
//       x: 0,
//     };

//     this.image = image;

//     this.width = image.width;
//     this.height = image.height;
//     this.kuca = kuca;
//   }

//   draw() {
//     if (this.kuca) console.log("crtam");
//     c.drawImage(this.image, this.position.x, this.position.y);
//   }

//   update() {
//     this.draw();
//     this.position.x += this.velocity.x;
//   }
// }
// class Kosnica {
//   constructor({ x, y, image, kuca, size }) {
//     this.position = {
//       x,
//       y,
//     };

//     this.velocity = {
//       x: 0,
//     };

//     this.image = image;

//     this.width = image.width;
//     this.height = image.height;
//     this.kuca = kuca;
//   }

//   draw() {
//     if (this.kuca) console.log("crtam");
//     c.drawImage(this.image, this.position.x, this.position.y);
//   }

//   update() {
//     this.draw();
//     this.position.x += this.velocity.x;
//   }
// }
// class Goomba {
//   constructor({
//     position,
//     velocity,
//     distance = {
//       limit: 50,
//       traveled: 0,
//     },
//   }) {
//     this.position = {
//       x: position.x,
//       y: position.y,
//     };

//     this.velocity = {
//       x: velocity.x,
//       y: velocity.y,
//     };

//     this.width = 80;
//     this.height = 150;

//     //this.image = createImage(spriteGoombaLeft);

//     this.sprites = {
//       stand: {
//         right: createImage(spriteGoombaRight),
//         left: createImage(spriteGoombaLeft),
//       },
//     };

//     this.currentSprite = this.sprites.stand.left;

//     this.frames = 0;

//     this.distance = distance;
//   }

//   draw() {
//     // c.fillStyle = 'red'
//     // c.fillRect(this.position.x, this.position.y, this.width, this.height)

//     c.drawImage(
//       this.currentSprite,
//       0,
//       0,
//       180,
//       385,
//       this.position.x,
//       this.position.y,
//       this.width,
//       this.height
//     );
//   }

//   update() {
//     // this.frames++;
//     // if (this.frames >= 58) this.frames = 0;
//     this.draw();
//     this.position.x += this.velocity.x;
//     this.position.y += this.velocity.y;

//     if (this.position.y + this.height + this.velocity.y <= canvas.height)
//       this.velocity.y += gravity;

//     // walk the goomba back and forth
//     this.distance.traveled += Math.abs(this.velocity.x);

//     if (this.distance.traveled > this.distance.limit) {
//       this.distance.traveled = 0;
//       this.velocity.x = -this.velocity.x;

//       if (this.currentSprite === this.sprites.stand.left) {
//         this.currentSprite = this.sprites.stand.right;
//       } else {
//         this.currentSprite = this.sprites.stand.left;
//       }
//     }
//   }
// }
// class Hedgehog {
//   constructor({
//     position,
//     velocity,
//     distance = {
//       limit: 50,
//       traveled: 0,
//     },
//   }) {
//     this.position = {
//       x: position.x,
//       y: position.y,
//     };

//     this.velocity = {
//       x: velocity.x,
//       y: velocity.y,
//     };

//     this.width = 60;
//     this.height = 50;

//     this.sprites = {
//       stand: {
//         right: createImage(spriteHodgehogRight),
//         left: createImage(spriteHodgehogLeft),
//       },
//     };

//     this.currentSprite = this.sprites.stand.left;

//     this.distance = distance;
//   }

//   draw() {
//     c.drawImage(
//       this.currentSprite,
//       0,
//       0,
//       455,
//       340,
//       this.position.x,
//       this.position.y,
//       this.width,
//       this.height
//     );
//   }

//   update() {
//     this.draw();
//     this.position.x += this.velocity.x;
//     this.position.y += this.velocity.y;

//     if (this.position.y + this.height + this.velocity.y <= canvas.height)
//       this.velocity.y += gravity;

//     // walk the goomba back and forth
//     this.distance.traveled += Math.abs(this.velocity.x);

//     if (this.distance.traveled > this.distance.limit) {
//       this.distance.traveled = 0;
//       this.velocity.x = -this.velocity.x;

//       if (this.currentSprite === this.sprites.stand.left) {
//         this.currentSprite = this.sprites.stand.right;
//       } else {
//         this.currentSprite = this.sprites.stand.left;
//       }
//     }
//   }
// }
// class FireFlower {
//   constructor({ position, velocity }) {
//     this.position = {
//       x: position.x,
//       y: position.y,
//     };

//     this.velocity = {
//       x: velocity.x,
//       y: velocity.y,
//     };

//     this.width = 36;
//     this.height = 40;

//     this.image = createImage(spriteFireFlower);
//     this.frames = 0;
//   }

//   draw() {
//     // c.fillStyle = 'red'
//     // c.fillRect(this.position.x, this.position.y, this.width, this.height)

//     c.drawImage(
//       this.image,
//       0, //* this.frames,
//       0,
//       356,
//       360,
//       this.position.x,
//       this.position.y,
//       this.width,
//       this.height
//     );
//   }

//   update() {
//     // this.frames++;
//     // if (this.frames >= 75) this.frames = 0;
//     this.draw();
//     this.position.x += this.velocity.x;
//     this.position.y += this.velocity.y;

//     if (this.position.y + this.height + this.velocity.y <= canvas.height)
//       this.velocity.y += gravity;
//   }
// }

// class Particle {
//   constructor({
//     position,
//     velocity,
//     radius,
//     color = "#654428",
//     fireball = false,
//     fades = false,
//   }) {
//     this.position = {
//       x: position.x,
//       y: position.y,
//     };

//     this.velocity = {
//       x: velocity.x,
//       y: velocity.y,
//     };

//     this.radius = radius;
//     this.ttl = 300;
//     this.color = color;
//     this.fireball = fireball;
//     this.opacity = 1;
//     this.fades = fades;
//   }

//   draw() {
//     c.save();
//     c.globalAlpha = this.opacity;
//     c.beginPath();
//     c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
//     c.fillStyle = this.color;
//     c.fill();
//     c.closePath();
//     c.restore();
//   }

//   update() {
//     this.ttl--;
//     this.draw();
//     this.position.x += this.velocity.x;
//     this.position.y += this.velocity.y;

//     if (this.position.y + this.radius + this.velocity.y <= canvas.height)
//       this.velocity.y += gravity * 0.4;

//     if (this.fades && this.opacity > 0) {
//       this.opacity -= 0.01;
//     }

//     if (this.opacity < 0) this.opacity = 0;
//   }
// }

let platformImage;
let platformSmallTallImage;
let blockTriImage;
let platformSmallImage;
let lgPlatformImage;
let tPlatformImage;
let xtPlatformImage;
let blockImage;

let player = new Player();
let platforms = [];
let genericObjects = [];
let trees = [];
let kuce = [];
let goombas = [];
let hedgehoges = [];
let kosnice = [];
let particles = [];
let fireFlowers = [];

let lastKey;
let keys;

let scrollOffset;
let flagPole;
let flagPole1;

let flagPoleImage;
let tree1Image;
let tree2Image;
let tree3Image;
let tree4Image;
let tree5Image;
let tree6Image;
let tree7Image;
let tree8Image;
let kos2Image;
let kos4Image;

let kos5Image;
let motocultImage;
let kuca1Image;
let kuca2Image;
let kuca3Image;
let djedoviImage;
let lubeniceImage;

let game;
let currentLevel = 1;

function selectLevel(currentLevel) {
  if (!audio.musicLevel1.playing()) audio.musicLevel1.play();
  switch (currentLevel) {
    case 1:
      init();
      break;
    case 2:
      initLevel2();
      break;
  }
}

async function init() {
  player = new Player();
  keys = {
    right: {
      pressed: false,
    },
    left: {
      pressed: false,
    },
  };
  scrollOffset = 0;

  game = {
    disableUserInput: false,
  };

  platformImage = await createImageAsync(platform);
  platformSmallTallImage = await createImageAsync(platformSmallTall);
  blockTriImage = await createImageAsync(blockTri);
  platformSmallImage = await createImageAsync(platformSmall);
  blockImage = await createImageAsync(block);
  lgPlatformImage = await createImageAsync(lgPlatform);
  tPlatformImage = await createImageAsync(tPlatform);
  xtPlatformImage = await createImageAsync(xtPlatform);
  flagPoleImage = await createImageAsync(flagPoleSprite);
  tree1Image = await createImageAsync(tree1Sprite);
  tree2Image = await createImageAsync(tree2Sprite);
  tree3Image = await createImageAsync(tree3Sprite);
  tree4Image = await createImageAsync(tree4Sprite);
  tree5Image = await createImageAsync(tree5Sprite);
  tree6Image = await createImageAsync(tree6Sprite);
  tree7Image = await createImageAsync(tree7Sprite);
  tree8Image = await createImageAsync(tree8Sprite);

  kos2Image = await createImageAsync(kos2Sprite);
  kos4Image = await createImageAsync(kos4Sprite);
  kos5Image = await createImageAsync(kos5Sprite);
  motocultImage = await createImageAsync(motocultSprite);
  kuca1Image = await createImageAsync(kuca1Sprite);
  kuca2Image = await createImageAsync(kuca2Sprite);
  kuca3Image = await createImageAsync(kuca3Sprite);
  djedoviImage = await createImageAsync(djedoviSprite);
  lubeniceImage = await createImageAsync(lubeniceSprite);

  flagPole = new GenericObject({
    x: 14968 + 600,
    // x: 500,
    y: canvas.height - lgPlatformImage.height - flagPoleImage.height,
    image: flagPoleImage,
  });

  trees = [
    new GenericObject({
      x: 500,
      y: canvas.height - lgPlatformImage.height - tree1Image.height,
      image: tree1Image,
    }),
    new GenericObject({
      x: 1200,
      y: canvas.height - lgPlatformImage.height - tree2Image.height,
      image: tree2Image,
    }),
    new GenericObject({
      x: 2200,
      y: canvas.height - lgPlatformImage.height - tree3Image.height,
      image: tree3Image,
    }),
    new GenericObject({
      x: 2800,
      y: canvas.height - lgPlatformImage.height - tree5Image.height,
      image: tree5Image,
    }),
    new GenericObject({
      x: 3500,
      y: canvas.height - lgPlatformImage.height - tree5Image.height,
      image: tree5Image,
    }),
    new GenericObject({
      x: 3800,
      y: canvas.height - lgPlatformImage.height - tree5Image.height,
      image: tree5Image,
    }),
    new GenericObject({
      x: 5000,
      y: canvas.height - lgPlatformImage.height - tree6Image.height,
      image: tree6Image,
    }),
    new GenericObject({
      x: 5300,
      y: canvas.height - lgPlatformImage.height - tree4Image.height,
      image: tree4Image,
    }),
    new GenericObject({
      x: 5600,
      y: canvas.height - lgPlatformImage.height - tree7Image.height,
      image: tree7Image,
    }),
    new GenericObject({
      x: 6000,
      y: canvas.height - lgPlatformImage.height - tree8Image.height,
      image: tree8Image,
    }),
    new GenericObject({
      x: 6600,
      y: canvas.height - lgPlatformImage.height - tree4Image.height,
      image: tree4Image,
    }),
    new GenericObject({
      x: 7000,
      y: canvas.height - lgPlatformImage.height - tree7Image.height,
      image: tree7Image,
    }),
    new GenericObject({
      x: 7400,
      y: canvas.height - lgPlatformImage.height - tree6Image.height,
      image: tree6Image,
    }),
    new GenericObject({
      x: 6481,
      y: canvas.height - lgPlatformImage.height - motocultImage.height,
      image: motocultImage,
    }),
  ];

  kosnice = [
    new Kosnica({
      x: 500,
      y: canvas.height - lgPlatformImage.height - kos2Image.height,
      image: kos2Image,
    }),
    new Kosnica({
      x: 800,
      y: canvas.height - lgPlatformImage.height - kos2Image.height,
      image: kos2Image,
    }),
    new Kosnica({
      x: 2200,
      y: canvas.height - lgPlatformImage.height - kos5Image.height,
      image: kos5Image,
    }),
    new Kosnica({
      x: 3100,
      y: canvas.height - lgPlatformImage.height - kos5Image.height,
      image: kos5Image,
    }),
    new Kosnica({
      x: 3200,
      y: canvas.height - lgPlatformImage.height - kos5Image.height,
      image: kos5Image,
    }),
    new Kosnica({
      x: 3800,
      y: canvas.height - lgPlatformImage.height - kos5Image.height,
      image: kos5Image,
    }),
    new Kosnica({
      x: 3900,
      y: canvas.height - lgPlatformImage.height - kos5Image.height,
      image: kos5Image,
    }),
    new Kosnica({
      x: 4000,
      y: canvas.height - lgPlatformImage.height - kos5Image.height,
      image: kos5Image,
    }),
    new Kosnica({
      x: 5300,
      y: canvas.height - lgPlatformImage.height - kos4Image.height,
      image: kos4Image,
    }),
    new Kosnica({
      x: 5600,
      y: canvas.height - lgPlatformImage.height - kos4Image.height,
      image: kos4Image,
    }),
    new Kosnica({
      x: 5500,
      y: canvas.height - lgPlatformImage.height - kos4Image.height,
      image: kos4Image,
    }),
    new Kosnica({
      x: 5900,
      y: canvas.height - lgPlatformImage.height - kos4Image.height,
      image: kos4Image,
    }),
    ,
    new Kosnica({
      x: 6100,
      y: canvas.height - lgPlatformImage.height - kos4Image.height,
      image: kos4Image,
    }),
    new Kosnica({
      x: 7000,
      y: canvas.height - lgPlatformImage.height - kos4Image.height,
      image: kos4Image,
    }),
    new Kosnica({
      x: 7100,
      y: canvas.height - lgPlatformImage.height - kos4Image.height,
      image: kos4Image,
    }),
    new Kosnica({
      x: 7200,
      y: canvas.height - lgPlatformImage.height - kos4Image.height,
      image: kos4Image,
    }),
  ];

  kuce = [
    new GenericObject({
      x: 13000,
      y: canvas.height - lgPlatformImage.height - kuca1Image.height,
      image: kuca1Image,
    }),
    new GenericObject({
      x: 13000 + kuca1Image.width,
      y: canvas.height - lgPlatformImage.height - kuca2Image.height,
      image: kuca2Image,
    }),
    new GenericObject({
      x: 13000 + kuca1Image.width + kuca2Image.width,
      y: canvas.height - lgPlatformImage.height - kuca3Image.height,
      image: kuca3Image,
    }),
    new GenericObject({
      x: 13000 + kuca1Image.width - 200,
      y: canvas.height - lgPlatformImage.height - djedoviImage.height,
      image: djedoviImage,
    }),
    new GenericObject({
      x: 13000 + kuca1Image.width + 100,
      y: canvas.height - lgPlatformImage.height - lubeniceImage.height,
      image: lubeniceImage,
    }),
  ];

  fireFlowers = [
    new FireFlower({
      position: {
        x: 400,
        y: 100,
      },
      velocity: {
        x: 0,
        y: 0,
      },
    }),
    new FireFlower({
      position: {
        x: 900,
        y: 100,
      },
      velocity: {
        x: 0,
        y: 0,
      },
    }),
    new FireFlower({
      position: {
        x: 2000,
        y: 100,
      },
      velocity: {
        x: 0,
        y: 0,
      },
    }),
    new FireFlower({
      position: {
        x: 2400,
        y: 100,
      },
      velocity: {
        x: 0,
        y: 0,
      },
    }),
    new FireFlower({
      position: {
        x: 2800,
        y: 100,
      },
      velocity: {
        x: 0,
        y: 0,
      },
    }),
    new FireFlower({
      position: {
        x: 3400,
        y: 100,
      },
      velocity: {
        x: 0,
        y: 0,
      },
    }),
    new FireFlower({
      position: {
        x: 3800,
        y: 100,
      },
      velocity: {
        x: 0,
        y: 0,
      },
    }),
    new FireFlower({
      position: {
        x: 4200,
        y: 100,
      },
      velocity: {
        x: 0,
        y: 0,
      },
    }),
    new FireFlower({
      position: {
        x: 5200,
        y: 100,
      },
      velocity: {
        x: 0,
        y: 0,
      },
    }),
    new FireFlower({
      position: {
        x: 5500,
        y: 100,
      },
      velocity: {
        x: 0,
        y: 0,
      },
    }),
  ];

  player = new Player();

  const goombaWidth = 43.33;
  goombas = [
    new Goomba({
      position: {
        x: 908 + lgPlatformImage.width - goombaWidth,
        y: 100,
      },
      velocity: {
        x: -0.3,
        y: 0,
      },
      distance: {
        limit: 400,
        traveled: 0,
      },
    }),
    new Goomba({
      position: {
        x: 2108 + lgPlatformImage.width - goombaWidth,
        y: 100,
      },
      velocity: {
        x: -0.3,
        y: 0,
      },
      distance: {
        limit: 400,
        traveled: 0,
      },
    }),
    new Goomba({
      position: {
        x: 3249 + lgPlatformImage.width - goombaWidth,
        y: 100,
      },
      velocity: {
        x: -0.3,
        y: 0,
      },
      distance: {
        limit: 400,
        traveled: 0,
      },
    }),
    new Goomba({
      position: {
        x: 3249 + lgPlatformImage.width - goombaWidth - goombaWidth,
        y: 100,
      },
      velocity: {
        x: -0.3,
        y: 0,
      },
      distance: {
        limit: 400,
        traveled: 0,
      },
    }),
    new Goomba({
      position: {
        x:
          3249 +
          lgPlatformImage.width -
          goombaWidth -
          goombaWidth -
          goombaWidth,
        y: 100,
      },
      velocity: {
        x: -0.3,
        y: 0,
      },
      distance: {
        limit: 400,
        traveled: 0,
      },
    }),
    new Goomba({
      position: {
        x:
          3249 +
          lgPlatformImage.width -
          goombaWidth -
          goombaWidth -
          goombaWidth -
          goombaWidth,
        y: 100,
      },
      velocity: {
        x: -0.3,
        y: 0,
      },
      distance: {
        limit: 400,
        traveled: 0,
      },
    }),
    new Goomba({
      position: {
        x: 5135 + xtPlatformImage.width / 2 + goombaWidth,
        y: 100,
      },
      velocity: {
        x: -0.3,
        y: 0,
      },
      distance: {
        limit: 100,
        traveled: 0,
      },
    }),
    new Goomba({
      position: {
        x: 6968,
        y: 0,
      },
      velocity: {
        x: -0.3,
        y: 0,
      },
      distance: {
        limit: 100,
        traveled: 0,
      },
    }),
  ];

  hedgehoges = [
    new Hedgehog({
      position: {
        x: 700,
        y: 100,
      },
      velocity: {
        x: -0.3,
        y: 0,
      },
      distance: {
        limit: 100,
        traveled: 0,
      },
    }),
    new Hedgehog({
      position: {
        x: 1500,
        y: 100,
      },
      velocity: {
        x: -0.3,
        y: 0,
      },
      distance: {
        limit: 100,
        traveled: 0,
      },
    }),
    new Hedgehog({
      position: {
        x: 2500,
        y: 100,
      },
      velocity: {
        x: -0.3,
        y: 0,
      },
      distance: {
        limit: 100,
        traveled: 0,
      },
    }),
  ];
  particles = [];
  platforms = [
    new Platform({
      x: 908 + 100,
      y: 300,
      image: blockTriImage,
      block: true,
    }),
    new Platform({
      x: 908 + 100 + blockImage.width,
      y: 100,
      image: blockImage,
      block: true,
    }),
    new Platform({
      x: 1991 + lgPlatformImage.width - tPlatformImage.width,
      y: canvas.height - lgPlatformImage.height - tPlatformImage.height,
      image: tPlatformImage,
      block: true,
    }),
    new Platform({
      x: 1991 + 3 * lgPlatformImage.width - tPlatformImage.width,
      y: canvas.height - lgPlatformImage.height - tPlatformImage.height,
      image: tPlatformImage,
      block: true,
    }),

    // new Platform({
    //   x: 3991 + lgPlatformImage.width - tPlatformImage.width - 100,
    //   y:
    //     canvas.height -
    //     lgPlatformImage.height -
    //     tPlatformImage.height +
    //     blockImage.height,
    //   image: blockImage,
    //   block: true,
    // }),
    new Platform({
      x: 8712 + xtPlatformImage.width + 175 + 1700,
      y: canvas.height - xtPlatformImage.height,
      image: blockImage,
      block: true,
      text: 5712 + xtPlatformImage.width + 175,
    }),
    new Platform({
      x: 7200 + 3 * lgPlatformImage.width - tPlatformImage.width,
      y: canvas.height - lgPlatformImage.height - tPlatformImage.height - 100,
      image: platformSmallImage,
      block: true,
    }),
    new Platform({
      x: 7800 + 3 * lgPlatformImage.width - tPlatformImage.width,
      y: canvas.height - lgPlatformImage.height - tPlatformImage.height - 100,
      image: platformSmallImage,
      block: true,
    }),

    new Platform({
      x: 9116 + 175 + 1700,
      y: canvas.height - xtPlatformImage.height,
      image: blockImage,
      block: true,
    }),
    new Platform({
      x: 9116 + 175 * 2 + 1700,
      y: canvas.height - xtPlatformImage.height,
      image: blockImage,
      block: true,
    }),
    new Platform({
      x: 9116 + 175 * 3 + 1700,
      y: canvas.height - xtPlatformImage.height - 100,
      image: blockImage,
      block: true,
    }),
    new Platform({
      x: 9116 + 175 * 4 + 1700,
      y: canvas.height - xtPlatformImage.height - 200,
      image: blockTriImage,
      block: true,
    }),
    new Platform({
      x: 9116 + 175 * 4 + blockTriImage.width + 1700,
      y: canvas.height - xtPlatformImage.height - 200,
      image: blockTriImage,
      block: true,
      text: 6116 + 175 * 4 + blockTriImage.width,
    }),

    new Platform({
      x: 9968 + 300 + 1800,
      y: canvas.height - lgPlatformImage.height,
      image: lgPlatformImage,
      block: true,
      text: 6968 + 300,
    }),
    new Platform({
      x: 9968 + 300 + lgPlatformImage.width - 2 + 1800,
      y: canvas.height - lgPlatformImage.height,
      image: lgPlatformImage,
      block: true,
      text: 6968 + 300,
    }),
    new Platform({
      x: 10068 + 300 + 2 * lgPlatformImage.height - 2 + 1800,
      y: canvas.height - tPlatformImage.height,
      image: tPlatformImage,
      block: true,
      text: 6968 + 300,
    }),
    new Platform({
      x: 10168 + 500 + 2 * lgPlatformImage.height - 2 + 1800,
      y: canvas.height - tPlatformImage.height - 100,
      image: tPlatformImage,
      block: true,
      text: 6968 + 300,
    }),
    new Platform({
      x: 9968 + 300 + 2 * lgPlatformImage.width - 2 + 1800,
      y: canvas.height - lgPlatformImage.height,
      image: lgPlatformImage,
      block: true,
    }),
    new Platform({
      x: 9968 + 300 + 2 * lgPlatformImage.width - 2 + 1800,
      y: canvas.height - lgPlatformImage.height,
      image: lgPlatformImage,
      block: true,
    }),
  ];
  genericObjects = [
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(background),
    }),
    // new GenericObject({
    //   x: -1,
    //   y: -1,
    //   image: createImage(hills),
    // }),
  ];

  scrollOffset = 0;

  const platformsMap = [
    "lg",
    "lg",
    "gap",
    "lg",
    "lg",
    "lg",

    "gap",
    "gap",
    "lg",
    "lg",
    "lg",
    "gap",
    "t",
    "gap",
    "xt",
    "gap",
    "xt",
    "gap",
    "gap",
    "xt",
  ];

  let platformDistance = 0;

  platformsMap.forEach((symbol) => {
    switch (symbol) {
      case "lg":
        platforms.push(
          new Platform({
            x: platformDistance,
            y: canvas.height - lgPlatformImage.height,
            image: lgPlatformImage,
            block: true,
            text: platformDistance,
          })
        );

        platformDistance += lgPlatformImage.width - 2;

        break;

      case "gap":
        platformDistance += 175;

        break;

      case "t":
        platforms.push(
          new Platform({
            x: platformDistance,
            y: canvas.height - tPlatformImage.height,
            image: tPlatformImage,
            block: true,
          })
        );

        platformDistance += tPlatformImage.width - 2;

        break;

      case "xt":
        platforms.push(
          new Platform({
            x: platformDistance,
            y: canvas.height - xtPlatformImage.height,
            image: xtPlatformImage,
            block: true,
            text: platformDistance,
          })
        );

        platformDistance += xtPlatformImage.width - 2;

        break;
    }
  });
}

async function initLevel2() {
  player = new Player();
  keys = {
    right: {
      pressed: false,
    },
    left: {
      pressed: false,
    },
  };
  scrollOffset = 0;

  game = {
    disableUserInput: false,
  };

  blockTriImage = await createImageAsync(blockTri);
  blockImage = await createImageAsync(block);
  lgPlatformImage = await createImageAsync(images.levels[2].lgPlatform);
  tPlatformImage = await createImageAsync(tPlatform);
  xtPlatformImage = await createImageAsync(xtPlatform);
  flagPoleImage = await createImageAsync(flagPoleSprite);
  const mountains = await createImageAsync(images.levels[2].mountains);
  const mdPlatformImage = await createImageAsync(images.levels[2].mdPlatform);

  flagPole = new GenericObject({
    x: 7680,
    // x: 500,
    y: canvas.height - lgPlatformImage.height - flagPoleImage.height,
    image: flagPoleImage,
  });

  fireFlowers = [
    new FireFlower({
      position: {
        x: 4734 - 28,
        y: 100,
      },
      velocity: {
        x: 0,
        y: 0,
      },
    }),
  ];

  player = new Player();

  const goombaWidth = 43.33;
  goombas = [
    new Goomba({
      // single block goomba
      position: {
        x: 903 + mdPlatformImage.width - goombaWidth,
        y: 100,
      },
      velocity: {
        x: -2,
        y: 0,
      },
      distance: {
        limit: 700,
        traveled: 0,
      },
    }),
    new Goomba({
      // single block goomba
      position: {
        x:
          1878 +
          lgPlatformImage.width +
          155 +
          200 +
          200 +
          200 +
          blockImage.width / 2 -
          goombaWidth / 2,
        y: 100,
      },
      velocity: {
        x: 0,
        y: 0,
      },
      distance: {
        limit: 0,
        traveled: 0,
      },
    }),
    new Goomba({
      position: {
        x: 3831 + lgPlatformImage.width - goombaWidth,
        y: 100,
      },
      velocity: {
        x: -1,
        y: 0,
      },
      distance: {
        limit: lgPlatformImage.width - goombaWidth,
        traveled: 0,
      },
    }),

    new Goomba({
      position: {
        x: 4734,
        y: 100,
      },
      velocity: {
        x: 1,
        y: 0,
      },
      distance: {
        limit: lgPlatformImage.width - goombaWidth,
        traveled: 0,
      },
    }),
  ];
  particles = [];
  platforms = [
    new Platform({
      x: 903 + mdPlatformImage.width + 115,
      y: 300,
      image: blockTriImage,
      block: true,
    }),
    new Platform({
      x: 903 + mdPlatformImage.width + 115 + blockTriImage.width,
      y: 300,
      image: blockTriImage,
      block: true,
    }),
    new Platform({
      x: 1878 + lgPlatformImage.width + 175,
      y: 360,
      image: blockImage,
      block: true,
    }),
    new Platform({
      x: 1878 + lgPlatformImage.width + 155 + 200,
      y: 300,
      image: blockImage,
      block: true,
    }),
    new Platform({
      x: 1878 + lgPlatformImage.width + 155 + 200 + 200,
      y: 330,
      image: blockImage,
      block: true,
    }),
    new Platform({
      x: 1878 + lgPlatformImage.width + 155 + 200 + 200 + 200,
      y: 240,
      image: blockImage,
      block: true,
    }),
    new Platform({
      x: 4734 - mdPlatformImage.width / 2,
      y: canvas.height - lgPlatformImage.height - mdPlatformImage.height,
      image: mdPlatformImage,
    }),
    new Platform({
      x: 5987,
      y: canvas.height - lgPlatformImage.height - mdPlatformImage.height,
      image: mdPlatformImage,
    }),
    new Platform({
      x: 5987,
      y: canvas.height - lgPlatformImage.height - mdPlatformImage.height * 2,
      image: mdPlatformImage,
    }),
    new Platform({
      x: 6787,
      y: canvas.height - lgPlatformImage.height - mdPlatformImage.height,
      image: mdPlatformImage,
    }),
    new Platform({
      x: 6787,
      y: canvas.height - lgPlatformImage.height - mdPlatformImage.height * 2,
      image: mdPlatformImage,
    }),
    new Platform({
      x: 6787,
      y: canvas.height - lgPlatformImage.height - mdPlatformImage.height * 3,
      image: mdPlatformImage,
    }),
  ];
  genericObjects = [
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(images.levels[2].background),
    }),
    new GenericObject({
      x: -1,
      y: canvas.height - mountains.height,
      image: mountains,
    }),
  ];

  scrollOffset = 0;

  const platformsMap = [
    "lg",
    "md",
    "gap",
    "gap",
    "gap",
    "lg",
    "gap",
    "gap",
    "gap",
    "gap",
    "gap",
    "gap",
    "lg",
    "lg",
    "gap",
    "gap",
    "md",
    "gap",
    "gap",
    "md",
    "gap",
    "gap",
    "lg",
  ];

  let platformDistance = 0;

  platformsMap.forEach((symbol) => {
    switch (symbol) {
      case "md":
        platforms.push(
          new Platform({
            x: platformDistance,
            y: canvas.height - mdPlatformImage.height,
            image: mdPlatformImage,
            block: true,
            text: platformDistance,
          })
        );

        platformDistance += mdPlatformImage.width - 3;

        break;
      case "lg":
        platforms.push(
          new Platform({
            x: platformDistance - 2,
            y: canvas.height - lgPlatformImage.height,
            image: lgPlatformImage,
            block: true,
            text: platformDistance,
          })
        );

        platformDistance += lgPlatformImage.width - 3;

        break;

      case "gap":
        platformDistance += 175;

        break;

      case "t":
        platforms.push(
          new Platform({
            x: platformDistance,
            y: canvas.height - tPlatformImage.height,
            image: tPlatformImage,
            block: true,
          })
        );

        platformDistance += tPlatformImage.width - 2;

        break;

      case "xt":
        platforms.push(
          new Platform({
            x: platformDistance,
            y: canvas.height - xtPlatformImage.height,
            image: xtPlatformImage,
            block: true,
            text: platformDistance,
          })
        );

        platformDistance += xtPlatformImage.width - 2;

        break;
    }
  });
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  genericObjects.forEach((genericObject) => {
    genericObject.update();
    genericObject.velocity.x = 0;
  });

  platforms.forEach((platform) => {
    platform.update();
    platform.velocity.x = 0;
  });

  trees.forEach((tree) => {
    tree.update();
    tree.velocity.x = 0;
  });
  kosnice.forEach((kosnica) => {
    kosnica.update();
    kosnica.velocity.x = 0;
  });
  kuce.forEach((kuca) => {
    kuca.update();
    kuca.velocity.x = 0;
  });
  particles.forEach((particle, i) => {
    particle.update();

    if (
      particle.fireball &&
      (particle.position.x - particle.radius >= canvas.width ||
        particle.position.x + particle.radius <= 0)
    )
      setTimeout(() => {
        particles.splice(i, 1);
      }, 0);
  });

  if (flagPole) {
    //flagPole.update();
    flagPole.velocity.x = 0;

    // mario touches flagpole
    // win condition
    // complete level
    if (
      !game.disableUserInput &&
      objectsTouch({
        object1: player,
        object2: flagPole,
      })
    ) {
      audio.completeLevel.play();
      audio.musicLevel1.stop();
      game.disableUserInput = true;
      player.velocity.x = 0;
      player.velocity.y = 0;
      gravity = 0;

      player.currentSprite = player.sprites.stand.right;

      if (player.powerUps.fireFlower)
        player.currentSprite = player.sprites.stand.fireFlower.right;

      // flagpole slide
      setTimeout(() => {
        audio.descend.play();
      }, 200);
      gsap.to(player.position, {
        y: canvas.height - lgPlatformImage.height - player.height,
        duration: 1,
        onComplete() {
          player.currentSprite = player.sprites.run.right;

          if (player.powerUps.fireFlower)
            player.currentSprite = player.sprites.run.fireFlower.right;
        },
      });

      gsap.to(player.position, {
        delay: 1,
        x: canvas.width,
        duration: 2,
        ease: "power1.in",
      });

      // fireworks
      const particleCount = 300;
      const radians = (Math.PI * 2) / particleCount;
      const power = 8;
      let increment = 1;

      const intervalId = setInterval(() => {
        for (let i = 0; i < particleCount; i++) {
          particles.push(
            new Particle({
              position: {
                x: (canvas.width / 4) * increment,
                y: canvas.height / 2,
              },
              velocity: {
                x: Math.cos(radians * i) * power * Math.random(),
                y: Math.sin(radians * i) * power * Math.random(),
              },
              radius: 3 * Math.random(),
              color: `hsl(${Math.random() * 200}, 50%, 50%)`,
              fades: true,
            })
          );
        }

        audio.fireworkBurst.play();
        audio.fireworkWhistle.play();

        if (increment === 3) clearInterval(intervalId);

        increment++;
      }, 1000);

      // switch to the next level
      setTimeout(() => {
        currentLevel++;
        gravity = 1.5;
        selectLevel(currentLevel);
      }, 8000);
    }
  }

  // mario obtains powerup
  fireFlowers.forEach((fireFlower, i) => {
    if (
      objectsTouch({
        object1: player,
        object2: fireFlower,
      })
    ) {
      audio.obtainPowerUp.play();
      //player.powerUps.fireFlower = true;
      setTimeout(() => {
        fireFlowers.splice(i, 1);
      }, 0);
    } else fireFlower.update();
  });
  hedgehoges.forEach((hedgehoge, index) => {
    hedgehoge.update();
  });

  goombas.forEach((goomba, index) => {
    goomba.update();

    // remove goomba on fireball hit
    particles.forEach((particle, particleIndex) => {
      if (
        particle.fireball &&
        particle.position.x + particle.radius >= goomba.position.x &&
        particle.position.y + particle.radius >= goomba.position.y &&
        particle.position.x - particle.radius <=
          goomba.position.x + goomba.width &&
        particle.position.y - particle.radius <=
          goomba.position.y + goomba.height
      ) {
        for (let i = 0; i < 50; i++) {
          particles.push(
            new Particle({
              position: {
                x: goomba.position.x + goomba.width / 2,
                y: goomba.position.y + goomba.height / 2,
              },
              velocity: {
                x: (Math.random() - 0.5) * 7,
                y: (Math.random() - 0.5) * 15,
              },
              radius: Math.random() * 3,
            })
          );
        }
        setTimeout(() => {
          goombas.splice(index, 1);
          particles.splice(particleIndex, 1);
        }, 0);
      }
    });

    // goomba stomp squish / squash
    if (
      collisionTop({
        object1: player,
        object2: goomba,
      })
    ) {
      audio.goombaSquash.play();

      for (let i = 0; i < 50; i++) {
        particles.push(
          new Particle({
            position: {
              x: goomba.position.x + goomba.width / 2,
              y: goomba.position.y + goomba.height / 2,
            },
            velocity: {
              x: (Math.random() - 0.5) * 7,
              y: (Math.random() - 0.5) * 15,
            },
            radius: Math.random() * 3,
          })
        );
      }
      player.velocity.y -= 40;
      setTimeout(() => {
        goombas.splice(index, 1);
      }, 0);
    } else if (
      player.position.x + player.width >= goomba.position.x &&
      player.position.y + player.height >= goomba.position.y &&
      player.position.x <= goomba.position.x + goomba.width
    ) {
      // player hits goomba
      // lose fireflower / lose powerup
      if (player.powerUps.fireFlower) {
        player.invincible = true;
        player.powerUps.fireFlower = false;
        audio.losePowerUp.play();

        setTimeout(() => {
          player.invincible = false;
        }, 1000);
      } else if (!player.invincible) {
        audio.die.play();
        selectLevel(currentLevel);
      }
    }
  });

  player.update();

  if (game.disableUserInput) return;

  // scrolling code starts
  let hitSide = false;
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed;
  } else if (
    (keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
  ) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;

    // scrolling code
    if (keys.right.pressed) {
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];
        platform.velocity.x = -player.speed;

        if (
          platform.block &&
          hitSideOfPlatform({
            object: player,
            platform,
          })
        ) {
          platforms.forEach((platform) => {
            platform.velocity.x = 0;
          });

          hitSide = true;
          break;
        }
      }

      if (!hitSide) {
        scrollOffset += player.speed;

        flagPole.velocity.x = -player.speed;

        trees.forEach((tree) => {
          tree.velocity.x = -player.speed;
        });
        kosnice.forEach((kosnica) => {
          kosnica.velocity.x = -player.speed;
        });
        kuce.forEach((kuca) => {
          kuca.velocity.x = -player.speed;
        });
        genericObjects.forEach((genericObject) => {
          genericObject.velocity.x = -player.speed * 0.66;
        });

        goombas.forEach((goomba) => {
          goomba.position.x -= player.speed;
        });
        hedgehoges.forEach((hedgehoge) => {
          hedgehoge.position.x -= player.speed;
        });

        fireFlowers.forEach((fireFlower) => {
          fireFlower.position.x -= player.speed;
        });

        particles.forEach((particle) => {
          particle.position.x -= player.speed;
        });
      }
    } else if (keys.left.pressed && scrollOffset > 0) {
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];
        platform.velocity.x = player.speed;

        if (
          platform.block &&
          hitSideOfPlatform({
            object: player,
            platform,
          })
        ) {
          platforms.forEach((platform) => {
            platform.velocity.x = 0;
          });

          hitSide = true;
          break;
        }
      }

      if (!hitSide) {
        scrollOffset -= player.speed;

        flagPole.velocity.x = player.speed;

        trees.forEach((tree) => {
          tree.velocity.x = player.speed;
        });
        kosnice.forEach((kosnica) => {
          kosnica.velocity.x = player.speed;
        });
        kuce.forEach((kuca) => {
          kuca.velocity.x = player.speed;
        });
        genericObjects.forEach((genericObject) => {
          genericObject.velocity.x = player.speed * 0.66;
        });

        goombas.forEach((goomba) => {
          goomba.position.x += player.speed;
        });
        hedgehoges.forEach((hedgehoge) => {
          hedgehoge.position.x += player.speed;
        });

        fireFlowers.forEach((fireFlower) => {
          fireFlower.position.x += player.speed;
        });

        particles.forEach((particle) => {
          particle.position.x += player.speed;
        });
      }
    }
  }

  // platform collision detection
  platforms.forEach((platform) => {
    if (
      isOnTopOfPlatform({
        object: player,
        platform,
      })
    ) {
      player.velocity.y = 0;
    }

    if (
      platform.block &&
      hitBottomOfPlatform({
        object: player,
        platform,
      })
    ) {
      player.velocity.y = -player.velocity.y;
    }

    if (
      platform.block &&
      hitSideOfPlatform({
        object: player,
        platform,
      })
    ) {
      player.velocity.x = 0;
    }

    // particles bounce
    particles.forEach((particle, index) => {
      if (
        isOnTopOfPlatformCircle({
          object: particle,
          platform,
        })
      ) {
        const bounce = 0.9;
        particle.velocity.y = -particle.velocity.y * 0.99;

        if (particle.radius - 0.4 < 0) particles.splice(index, 1);
        else particle.radius -= 0.4;
      }

      if (particle.ttl < 0) particles.splice(index, 1);
    });

    goombas.forEach((goomba) => {
      if (
        isOnTopOfPlatform({
          object: goomba,
          platform,
        })
      )
        goomba.velocity.y = 0;
    });

    hedgehoges.forEach((hedgehoge) => {
      if (
        isOnTopOfPlatform({
          object: hedgehoge,
          platform,
        })
      )
        hedgehoge.velocity.y = 0;
    });
    fireFlowers.forEach((fireFlower) => {
      if (
        isOnTopOfPlatform({
          object: fireFlower,
          platform,
        })
      )
        fireFlower.velocity.y = 0;
    });
  });

  // lose condition
  if (player.position.y > canvas.height) {
    audio.die.play();
    selectLevel(currentLevel);
  }

  // sprite switching

  if (player.shooting) {
    player.currentSprite = player.sprites.shoot.fireFlower.right;

    if (lastKey === "left")
      player.currentSprite = player.sprites.shoot.fireFlower.left;

    return;
  }

  // sprite jump
  if (player.velocity.y !== 0) return;

  if (
    keys.right.pressed &&
    lastKey === "right" &&
    player.currentSprite !== player.sprites.run.right
  ) {
    player.currentSprite = player.sprites.run.right;
  } else if (
    keys.left.pressed &&
    lastKey === "left" &&
    player.currentSprite !== player.sprites.run.left
  ) {
    player.currentSprite = player.sprites.run.left;
  } else if (
    !keys.left.pressed &&
    lastKey === "left" &&
    player.currentSprite !== player.sprites.stand.left
  ) {
    player.currentSprite = player.sprites.stand.left;
  } else if (
    !keys.right.pressed &&
    lastKey === "right" &&
    player.currentSprite !== player.sprites.stand.right
  ) {
    player.currentSprite = player.sprites.stand.right;
  }

  // fireflower sprites
  if (!player.powerUps.fireFlower) return;

  if (
    keys.right.pressed &&
    lastKey === "right" &&
    player.currentSprite !== player.sprites.run.fireFlower.right
  ) {
    player.currentSprite = player.sprites.run.fireFlower.right;
  } else if (
    keys.left.pressed &&
    lastKey === "left" &&
    player.currentSprite !== player.sprites.run.fireFlower.left
  ) {
    player.currentSprite = player.sprites.run.fireFlower.left;
  } else if (
    !keys.left.pressed &&
    lastKey === "left" &&
    player.currentSprite !== player.sprites.stand.fireFlower.left
  ) {
    player.currentSprite = player.sprites.stand.fireFlower.left;
  } else if (
    !keys.right.pressed &&
    lastKey === "right" &&
    player.currentSprite !== player.sprites.stand.fireFlower.right
  ) {
    player.currentSprite = player.sprites.stand.fireFlower.right;
  }
} // animation loop ends

selectLevel(1);
// init()
// initLevel2()
animate();
let counter = 0;
addEventListener("keydown", (e) => {
  if (game.disableUserInput) return;
  
  switch (e.keyCode) {
    case 65:
      keys.left.pressed = true;
      lastKey = "left";

      break;

    case 83:
      break;

    case 68:
      keys.right.pressed = true;
      lastKey = "right";

      break;

    case 87:
      counter++;
      if (!e.repeat) {
        
        if (counter <= 2) {
          player.velocity.y -= 22;
        }else{
          counter = 0
        }
        
        audio.fastSimpleChop.play();

        if (lastKey === "right")
          player.currentSprite = player.sprites.jump.right;
        else player.currentSprite = player.sprites.jump.left;

        if (!player.powerUps.fireFlower) break;

        if (lastKey === "right")player.currentSprite = player.sprites.jump.fireFlower.right;
          
        else player.currentSprite = player.sprites.jump.fireFlower.left;
        
        break;
      } else {
        counter = 0
        break;
      }
      
    case 32:
      //if (!player.powerUps.fireFlower) return;

      player.shooting = true;

      setTimeout(() => {
        player.shooting = false;
      }, 100);

      audio.fireFlowerShot.play();

      let velocity = 15;
      if (lastKey === "left") velocity = -velocity;

      particles.push(
        new Particle({
          position: {
            x: player.position.x + player.width / 2,
            y: player.position.y + player.height / 2,
          },
          velocity: {
            x: velocity,
            y: 0,
          },
          radius: 5,
          color: "red",
          fireball: true,
        })
      );
      break;
  }
});

addEventListener("keyup", ({ keyCode }) => {
  if (game.disableUserInput) return;

  switch (keyCode) {
    case 65:
      keys.left.pressed = false;
      break;

    case 83:
      break;

    case 68:
      keys.right.pressed = false;

      break;

    case 87:
      break;
  }
});
export { gravity };
