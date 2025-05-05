"use strict";

//-----------------------------------------------------------------------------------------
//----------- Import modules, mjs files  ---------------------------------------------------
//-----------------------------------------------------------------------------------------
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { TGameBoard, GameBoardSize, TBoardCell } from "./gameBoard.mjs";
import { TSnake, EDirection } from "./snake.mjs";
import { TBait } from "./bait.mjs";
import menu from "./menu.mjs";

//-----------------------------------------------------------------------------------------
//----------- variables and object --------------------------------------------------------
//-----------------------------------------------------------------------------------------//

const cvs = document.getElementById("cvs");
const spcvs = new libSprite.TSpriteCanvas(cvs);
let gameSpeed = 4; // Game speed multiplier;
let hndUpdateGame = null;
let score = 0; // Legg til poeng
let baitTimer = Date.now(); // Legg til timer
export const EGameStatus = { Idle: 0, Playing: 1, Pause: 2, GameOver: 3 };

// prettier-ignore
export const SheetData = {
  Head:     { x:   0, y:   0, width:  38, height:  38, count:  4 },
  Body:     { x:   0, y:  38, width:  38, height:  38, count:  6 },
  Tail:     { x:   0, y:  76, width:  38, height:  38, count:  4 },
  Bait:     { x:   0, y: 114, width:  38, height:  38, count:  1 },
  Play:     { x:   0, y: 155, width: 202, height: 202, count: 10 },
  GameOver: { x:   0, y: 647, width: 856, height: 580, count:  1 },
  Home:     { x:  65, y: 995, width: 169, height: 167, count:  1 },
  Retry:    { x: 614, y: 995, width: 169, height: 167, count:  1 },
  Resume:   { x:   0, y: 357, width: 202, height: 202, count: 10 },
  Number:   { x:   0, y: 560, width:  81, height:  86, count: 10 },
};

export const GameProps = {
  gameBoard: null,
  gameStatus: EGameStatus.Idle,
  snake: null,
  bait: null
};

//------------------------------------------------------------------------------------------
//----------- Exported functions -----------------------------------------------------------
//------------------------------------------------------------------------------------------

export function newGame() {
  GameProps.gameBoard = new TGameBoard();
  GameProps.snake = new TSnake(spcvs, new TBoardCell(5, 5)); // Initialize snake with a starting position
  GameProps.bait = new TBait(spcvs); // Initialize bait with a starting position
  gameSpeed = 4; // Reset game speed
  score = 0; // Nullstill poeng
  baitTimer = Date.now(); // Restart timer
  console.log("New game started");
}

export function pauseGame() {
  if (GameProps.gameStatus === EGameStatus.Playing) {
    GameProps.gameStatus = EGameStatus.Pause;
    clearInterval(hndUpdateGame); // Stopp oppdateringsintervall
    console.log("Game paused");
  }
}

export function resumeGame() {
  if (GameProps.gameStatus === EGameStatus.Pause) {
    GameProps.gameStatus = EGameStatus.Playing;
    hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed); // Gjenoppta oppdateringsintervall
    console.log("Game resumed");
  }
}

export function bateIsEaten() {
  console.log("Bait eaten!");
  const timeTaken = (Date.now() - baitTimer) / 1000; // Tid brukt i sekunder
  const earnedPoints = Math.max(100 - timeTaken * 10, 10); // Minst 10 poeng
  score += Math.round(earnedPoints); // Oppdater poeng
  baitTimer = Date.now(); // Restart timer
  console.log("Score:", score);
  GameProps.snake.grow(); // Kall grow for å gjøre slangen større
  GameProps.bait.generateNewBait(); // Generer nytt eple
  increaseGameSpeed(); // Øk hastigheten på spillet
}

//------------------------------------------------------------------------------------------
//----------- functions -------------------------------------------------------------------
//------------------------------------------------------------------------------------------

function loadGame() {
  cvs.width = GameBoardSize.Cols * SheetData.Head.width;
  cvs.height = GameBoardSize.Rows * SheetData.Head.height;

  GameProps.gameStatus = EGameStatus.Playing;

  newGame(); // Sørg for at newGame kalles før spillet starter

  menu.showMenu(); // Vis menyen ved start

  requestAnimationFrame(drawGame);
  console.log("Game canvas is rendering!");
  hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed);
  console.log("Game canvas is updating!");
}

function drawMenu() {
  const playButton = new libSprite.TSprite(spcvs, SheetData.Play, { x: 200, y: 200 });
  playButton.onClick = () => {
    newGame();
    GameProps.gameStatus = EGameStatus.Playing;
  };
  spcvs.addSpriteButton(playButton);
}

function drawGameOver() {
  const gameOverSprite = new libSprite.TSprite(spcvs, SheetData.GameOver, { x: 100, y: 100 });
  spcvs.addSprite(gameOverSprite);

  const retryButton = new libSprite.TSprite(spcvs, SheetData.Retry, { x: 200, y: 300 });
  retryButton.onClick = () => {
    newGame();
  };
  spcvs.addSpriteButton(retryButton);

  const homeButton = new libSprite.TSprite(spcvs, SheetData.Home, { x: 400, y: 300 });
  homeButton.onClick = () => {
    menu.showMenu();
  };
  spcvs.addSpriteButton(homeButton);
}

function drawScore() {
  const ctx = spcvs.context; // Hent canvas-konteksten
  ctx.font = "24px Arial"; // Sett font
  ctx.fillStyle = "#ff6600"; // Sett tekstfarge
  ctx.fillText(`Score: ${score}`, 10, 30); // Tegn teksten på canvas
}

function drawGame() {
  spcvs.clearCanvas();

  switch (GameProps.gameStatus) {
    case EGameStatus.Playing:
      if (GameProps.bait) GameProps.bait.draw();
      if (GameProps.snake) GameProps.snake.draw();
      drawScore(); // Tegn poengsum
      break;
    case EGameStatus.GameOver:
      drawGameOver(); // Tegn "Game Over"-skjerm
      break;
    case EGameStatus.Idle:
      drawMenu(); // Tegn startmeny
      break;
  }

  requestAnimationFrame(drawGame);
}

function updateGame() {
  // Update game logic here
  switch (GameProps.gameStatus) {
    case EGameStatus.Playing:
      if (GameProps.snake && !GameProps.snake.update()) {
        GameProps.gameStatus = EGameStatus.GameOver;
        console.log("Game over!");
      }
      break;
  }
}

function increaseGameSpeed() {
  if (gameSpeed < 20) {
    gameSpeed += 1; // Øk hastigheten med 1
    clearInterval(hndUpdateGame); // Stopp eksisterende oppdateringsintervall
    hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed); // Start nytt intervall med økt hastighet
    console.log("Increased speed to", gameSpeed); // Logg den nye hastigheten
  }
}

//-----------------------------------------------------------------------------------------
//----------- Event handlers --------------------------------------------------------------
//-----------------------------------------------------------------------------------------

function onKeyDown(event) {
  switch (event.key) {
    case "ArrowUp":
      GameProps.snake.setDirection(EDirection.Up);
      break;
    case "ArrowDown":
      GameProps.snake.setDirection(EDirection.Down);
      break;
    case "ArrowLeft":
      GameProps.snake.setDirection(EDirection.Left);
      break;
    case "ArrowRight":
      GameProps.snake.setDirection(EDirection.Right);
      break;
    case " ":
      if (GameProps.gameStatus === EGameStatus.Playing) {
        pauseGame();
      } else if (GameProps.gameStatus === EGameStatus.Pause) {
        resumeGame();
      }
      break;
    default:
      console.log(`Key pressed: "${event.key}"`);
  }
}
//-----------------------------------------------------------------------------------------
//----------- main -----------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

spcvs.loadSpriteSheet("./Media/spriteSheet.png", loadGame);
document.addEventListener("keydown", onKeyDown);