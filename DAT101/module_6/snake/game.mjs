"use strict";

//-----------------------------------------------------------------------------------------
//----------- Import modules, mjs files  ---------------------------------------------------
//-----------------------------------------------------------------------------------------
import libSprite from "../../common/libs/libSprite_v2.mjs";
import lib2D from "../../common/libs/lib2d_v2.mjs";
import { TGameBoard, GameBoardSize, TBoardCell } from "./gameBoard.mjs";
import { TSnake, EDirection } from "./snake.mjs";
import { TBait } from "./bait.mjs";
import TMenu from "./menu.mjs";

//-----------------------------------------------------------------------------------------
//----------- variables and object ---------------------------------------------------------
const cvs = document.getElementById("cvs");
const spcvs = new libSprite.TSpriteCanvas(cvs);
let gameSpeed = 4; // Game speed multiplier
let hndUpdateGame = null;
export const EGameStatus = { Idle: 0, Playing: 1, Pause: 2, GameOver: 3 };

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
  bait: null,
  menu: null,
  totalScore: 0,
  baitSpawnTime: null,
  appleCount: 0, // Legg til en egenskap for antall epler spist
};

//------------------------------------------------------------------------------------------
//----------- Exported functions -----------------------------------------------------------

export function newGame() {
  if (hndUpdateGame) clearInterval(hndUpdateGame); // Clear the previous game interval
  GameProps.gameBoard = new TGameBoard();
  GameProps.snake = new TSnake(spcvs, new TBoardCell(5, 5)); // Initialize snake with a starting position
  GameProps.bait = new TBait(spcvs); // Initialize bait with a starting position
  gameSpeed = 4; // Reset game speed
  hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed); // Update game every 1000ms / gameSpeed
  GameProps.totalScore = 0; // Reset total score
  GameProps.appleCount = 0; // Reset apple count
  GameProps.menu.updateTotalScore(0); // Update the score on the menu
  GameProps.menu.updateAppleCount(0); // Reset apple count display
  GameProps.menu.showMenu(); // Oppdater menyen
}

export function baitIsEaten() {
  GameProps.bait.baitIsEaten(); // Flytt logikken til bait.mjs
  increaseGameSpeed(); // Øk spillhastigheten
}

//------------------------------------------------------------------------------------------
//----------- functions -------------------------------------------------------------------

function loadGame() {
  cvs.width = GameBoardSize.Cols * SheetData.Head.width;
  cvs.height = GameBoardSize.Rows * SheetData.Head.height;

  GameProps.gameStatus = EGameStatus.Idle; // Set game status to Idle

  // Opprett menyen
  GameProps.menu = new TMenu(spcvs);
  GameProps.menu.setPlayTrigger(() => {
    newGame(); // Start a new game
    GameProps.gameStatus = EGameStatus.Playing; // Set game status to Playing
  });
  GameProps.menu.setHomeTrigger(() => {
    GameProps.gameBoard = null; // Clear the game board
    GameProps.snake = null; // Clear the snake
    GameProps.bait = null; // Clear the bait
    GameProps.gameStatus = EGameStatus.Idle; // Set game status to Idle
    GameProps.menu.showMenu(); // Oppdater menyen
  });
  GameProps.menu.setRestartTrigger(() => {
    newGame(); // Restart the game
    GameProps.gameStatus = EGameStatus.Playing; // Set game status to Playing
  });
  GameProps.menu.setResumeTrigger(() => {
    GameProps.gameStatus = EGameStatus.Playing; // Set game status to Playing
    hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed); // Restart the game update interval
  });

  requestAnimationFrame(drawGame); // Start the game loop
  hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed); // Update game every 1000ms / gameSpeed
  console.log("Game canvas is rendering!");
  console.log("Game canvas is updating!");
}

function drawGame() {
  spcvs.clearCanvas();
  switch (GameProps.gameStatus) {
    case EGameStatus.Idle:
      GameProps.menu.draw();
      break;
    case EGameStatus.Playing:
      GameProps.bait.draw();
      GameProps.snake.draw();
      GameProps.menu.draw();
      break;
    case EGameStatus.Pause:
      GameProps.bait.draw();
      GameProps.snake.draw();
      GameProps.menu.draw();
      break;
    case EGameStatus.GameOver:
      GameProps.menu.draw();
      break;
  }
  requestAnimationFrame(drawGame);
}

function updateGame() {
  if (GameProps.gameStatus === EGameStatus.Playing) {
    if (!GameProps.snake.update()) {
      GameProps.gameStatus = EGameStatus.GameOver;
      GameProps.menu.showMenu(); // Oppdater menyen ved Game Over
      console.log("Game over!");
      GameProps.menu.showGameOverScore(GameProps.totalScore); // Vis scoren på "Game Over"-skjermen
    }
  }
}

function increaseGameSpeed() {
  gameSpeed += 0.5;
  clearInterval(hndUpdateGame); // Clear the previous game interval
  hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed); // Update game every 1000ms / gameSpeed
  console.log("Increase game speed!");
}

//-----------------------------------------------------------------------------------------
//----------- Event handlers --------------------------------------------------------------

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
        GameProps.gameStatus = EGameStatus.Pause;
        clearInterval(hndUpdateGame); // Stop the game update interval
        GameProps.menu.showMenu(); // Oppdater menyen
        console.log("Game paused!");
      } else if (GameProps.gameStatus === EGameStatus.Pause) {
        GameProps.gameStatus = EGameStatus.Playing;
        hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed); // Restart the game update interval
        console.log("Game resumed!");
      }
      break;
    default:
      console.log(`Key pressed: "${event.key}"`);
  }
}

//-----------------------------------------------------------------------------------------
//----------- main -----------------------------------------------------------------------

spcvs.loadSpriteSheet("./Media/spriteSheet.png", loadGame);
document.addEventListener("keydown", onKeyDown);