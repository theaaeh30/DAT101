"use strict";
import lib2d from "../../common/libs/lib2d.mjs";
import libSound from "../../common/libs/libSound.mjs";
import libSprite from "../../common/libs/libSprite.mjs";
import THero from "./hero.mjs";
import TObstacle from "./obstacle.mjs";
import { TBait } from "./bait.mjs";
import { TMenu } from "./menu.mjs";

//--------------- Objects and Variables ----------------------------------//
const chkMuteSound = document.getElementById("chkMuteSound");
const rbDayNight = document.getElementsByName("rbDayNight");
const cvs = document.getElementById("cvs");
const spcvs = new libSprite.TSpriteCanvas(cvs);

// prettier-ignore
export const SpriteInfoList = {
  hero1:        { x:    0, y: 545, width:   34, height:  24, count:  4 },
  hero2:        { x:    0, y: 569, width:   34, height:  24, count:  4 },
  hero3:        { x:    0, y: 593, width:   34, height:  24, count:  4 },
  obstacle:     { x:    0, y:   0, width:   52, height: 320, count:  4 },
  background:   { x:  246, y:   0, width:  576, height: 512, count:  2 },
  flappyBird:   { x:    0, y: 330, width:  178, height:  50, count:  1 },
  ground:       { x:  246, y: 512, width: 1152, height: 114, count:  1 },
  numberSmall:  { x:  681, y: 635, width:   14, height:  20, count: 10 },
  numberBig:    { x:  422, y: 635, width:   24, height:  36, count: 10 },
  buttonPlay:   { x: 1183, y: 635, width:  104, height:  58, count:  1 },
  gameOver:     { x:    0, y: 384, width:  226, height: 114, count:  1 },
  infoText:     { x:    0, y: 630, width:  200, height:  55, count:  2 },
  food:         { x:    0, y: 696, width:   70, height:  65, count: 34 },
  medal:        { x:  985, y: 635, width:   44, height:  44, count:  4 },
};

export const EGameStatus = { idle: 0, getReady: 1, playing: 2, gameOver: 3 };

export const GameProps = {
  soundMuted: false,
  dayTime: true,
  speed: 1,
  status: EGameStatus.idle, 
  background: null,
  ground: null,
  hero: null,
  obstacles: [],
  obstacleSpawnerStarted: false,
  baits: [],
  menu: null,
  score: 0,
  bestScore: 0,
  sounds: {countDown: null, food: null, gameOver: null, dead: null, running: null},
};

let countdownSoundPlayed = false;
//--------------- Functions ----------------------------------------------//

function playSound(aSound) {
  if (!GameProps.soundMuted) {
    aSound.stop(); // Stop any sound that's currently playing
    aSound.play(); // Play the sound again
  } else {
    aSound.pause();
  }
}

function loadGame() {
  console.log("Game ready to load");

  // Last sprite-sheet og andre nødvendigheter
  cvs.width = SpriteInfoList.background.width;
  cvs.height = SpriteInfoList.background.height;

  let pos = new lib2d.TPosition(0, 0);
  GameProps.background = new libSprite.TSprite(spcvs, SpriteInfoList.background, pos);
  pos.y = cvs.height - SpriteInfoList.ground.height;
  GameProps.ground = new libSprite.TSprite(spcvs, SpriteInfoList.ground, pos);
  pos.x = 100;
  pos.y = 100;
  GameProps.hero = new THero(spcvs, SpriteInfoList.hero1, pos);

  GameProps.menu = new TMenu(spcvs);

  // Laster lyder
  GameProps.sounds.running = new libSound.TSoundFile("./Media/running.mp3");
  GameProps.sounds.heroIsDead = new libSound.TSoundFile("./Media/heroIsDead.mp3");
  GameProps.sounds.gameOver = new libSound.TSoundFile("./Media/gameOver.mp3");
  GameProps.sounds.flap = new libSound.TSoundFile("./Media/flap.mp3");
  GameProps.sounds.countDown = new libSound.TSoundFile("./Media/countDown.mp3"); // Sørg for at lyden er lastet
  GameProps.sounds.food = new libSound.TSoundFile("./Media/food.mp3");

  requestAnimationFrame(drawGame);
  setInterval(animateGame, 10);
}


function drawGame() {
  spcvs.clearCanvas();
  GameProps.background.draw();
  drawBait();
  drawObstacles();
  GameProps.ground.draw();
  GameProps.hero.draw();
  GameProps.menu.draw();
  requestAnimationFrame(drawGame);
}

function drawObstacles() {
  for (let i = 0; i < GameProps.obstacles.length; i++) {
    const obstacle = GameProps.obstacles[i];
    obstacle.draw();
  }
}

function drawBait() {
  // Ensure all baits are drawn
  for (let i = 0; i < GameProps.baits.length; i++) {
    const bait = GameProps.baits[i];
    bait.draw();
  }
}

let gameOverSoundPlayed = false; 
let fallingAfterDeath = false; 
let heroDeathSoundPlayed = false; 

function animateGame() {
  switch (GameProps.status) {
    case EGameStatus.getReady:
      // Spill av nedtellingslyd hvis den ikke allerede er spilt
      if (!countdownSoundPlayed) {
        playSound(GameProps.sounds.countDown); // Spiller nedtellingslyden
        countdownSoundPlayed = true; // Sørger for at lyden bare spilles en gang
      }

      // Etter nedtellingen, endre status til å starte spillet
      setTimeout(() => {
        GameProps.status = EGameStatus.playing; 
        if (!GameProps.obstacleSpawnerStarted) {
          spawnObstacle();
          GameProps.obstacleSpawnerStarted = true;
        }
        
        countdownSoundPlayed = false; 
      }, 3000);
      break;

    case EGameStatus.playing:
      // Spill logikk for 'playing' her
      if (GameProps.hero.isDead) {
        if (!heroDeathSoundPlayed) {
          console.log("Playing hero death sound");
          playSound(GameProps.sounds.heroIsDead);
          heroDeathSoundPlayed = true;
        }

        // Start falling animation after hero's death
        if (!fallingAfterDeath) {
          fallingAfterDeath = true;
          GameProps.hero.animateSpeed = 0;
        }

        if (GameProps.hero.posY < GameProps.ground.posY) {
          GameProps.hero.posY += 2;
          GameProps.hero.update();
        } else {
          GameProps.hero.posY = GameProps.ground.posY;
          GameProps.hero.update();
          setTimeout(() => {
            GameProps.status = EGameStatus.gameOver;
          }, 200);
        }

        updateBaits();
        return;
      }

      GameProps.ground.translate(-GameProps.speed, 0);
      if (GameProps.ground.posX <= -SpriteInfoList.background.width) {
        GameProps.ground.posX = 0;
      }

      GameProps.hero.update();

      let delObstacleIndex = -1;

      // Update obstacles
      for (let i = 0; i < GameProps.obstacles.length; i++) {
        const obstacle = GameProps.obstacles[i];
        obstacle.update();
        if (obstacle.right < GameProps.hero.left && !obstacle.hasPassed) {
          GameProps.menu.incScore(20);
          console.log("Score: " + GameProps.score);
          obstacle.hasPassed = true;
        }
        if (obstacle.posX < -100) {
          delObstacleIndex = i;
        }
      }

      if (delObstacleIndex >= 0) {
        GameProps.obstacles.splice(delObstacleIndex, 1);
      }

      updateBaits();
      break;

    case EGameStatus.gameOver:
      if (!gameOverSoundPlayed) {
        playSound(GameProps.sounds.gameOver);
        gameOverSoundPlayed = true;
      }
      updateBaits();
      break;

    case EGameStatus.idle:
      heroDeathSoundPlayed = false;
      GameProps.hero.updateIdle();
      break;
  }
}

function updateBaits() {
  let delBaitIndex = -1;
  const posHero = GameProps.hero.getCenter();

  for (let i = 0; i < GameProps.baits.length; i++) {
    const bait = GameProps.baits[i];
    bait.update();

    const posBait = bait.getCenter();
    const dist = posHero.distanceToPoint(posBait);

    console.log(`Bait ${i}: distanse til helt = ${dist}`); // 👈 Debug

    if (dist < 15) {
      delBaitIndex = i;
    }
  }

  if (delBaitIndex >= 0) {
    console.log("Bait spist");
    GameProps.baits.splice(delBaitIndex, 1);
    GameProps.menu.incScore(10);
    playSound(GameProps.sounds.food);
  }
}


function spawnObstacle() {
  const obstacle = new TObstacle(spcvs, SpriteInfoList.obstacle);
  GameProps.obstacles.push(obstacle);
  //Spawn a new obstacle in 2-7 seconds
  if (GameProps.status === EGameStatus.playing) {
    const seconds = Math.ceil(Math.random() * 5) + 2;
    setTimeout(spawnObstacle, seconds * 1000);
  }
}

function spawnBait() {
  // Ensure a minimum number of baits are always visible
  const minimumBaits = 5; // Minimum number of baits on the screen
  const currentBaits = GameProps.baits.length;

  if (currentBaits < minimumBaits) {
    const baitsToSpawn = minimumBaits - currentBaits; // Calculate how many baits to spawn
    for (let i = 0; i < baitsToSpawn; i++) {
      const pos = new lib2d.TPosition(
        SpriteInfoList.background.width + Math.random() * 200, // Random X position slightly off-screen
        Math.random() * (cvs.height - 150) // Random height within canvas
      );
      const bait = new TBait(spcvs, SpriteInfoList.food, pos);
      GameProps.baits.push(bait);
    }
  }

  // Continue spawning baits at regular intervals
  if (GameProps.status === EGameStatus.playing) {
    setTimeout(spawnBait, 500); // Spawn baits every 0.5 seconds
  }
}


export function startGame() {
  GameProps.status = EGameStatus.getReady; // Sett status til 'getReady' for å starte nedtellingen
  if (GameProps.status !== EGameStatus.getReady) {
    countdownSoundPlayed = false; // Nullstill nedtelling flagget
  }
  // Start spillet og resett nødvendige variabler
  GameProps.hero = new THero(spcvs, SpriteInfoList.hero1, new lib2d.TPosition(100, 100));
  GameProps.obstacles = [];
  GameProps.baits = [];
  GameProps.menu.reset();
  GameProps.obstacleSpawnerStarted = false;

  // Start opp nedtellingslyden
  spawnBait();
  // Eventuelt spill lyder for spillet som begynner (running lyden)
  GameProps.sounds.running.play();
}

//--------------- Event Handlers -----------------------------------------//

function setSoundOnOff() {
  if (chkMuteSound.checked) {
    GameProps.soundMuted = true;
    console.log("Sound muted");
  } else {
    GameProps.soundMuted = false;
    console.log("Sound on");
  }
} // end of setSoundOnOff

function setDayNight() {
  GameProps.dayTime = rbDayNight[0].checked;
  if (GameProps.dayTime) {
    GameProps.background.changeSprite(SpriteInfoList.background.day);
  } else {
    GameProps.background.changeSprite(SpriteInfoList.background.night);
  }
  console.log(GameProps.dayTime ? "Day time" : "Night time");
}

function onKeyDown(aEvent) {
  switch (aEvent.code) {
    case "Space":
      if (!GameProps.hero.isDead) {
        GameProps.hero.flap(); // Flap the hero
        playSound(GameProps.sounds.flap); // Play the flap sound repeatedly
      }
      break;
  }
}

//--------------- Main Code ----------------------------------------------//
chkMuteSound.addEventListener("change", setSoundOnOff);
rbDayNight[0].addEventListener("change", setDayNight);
rbDayNight[1].addEventListener("change", setDayNight);

// Load the sprite sheet
spcvs.loadSpriteSheet("./Media/FlappyBirdSprites.png", loadGame);
document.addEventListener("keydown", onKeyDown);
