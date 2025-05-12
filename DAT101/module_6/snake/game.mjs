"use strict";

//-----------------------------------------------------------------------------------------
//----------- Importer moduler og mjs-filer ------------------------------------------------
//-----------------------------------------------------------------------------------------
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { TGameBoard, GameBoardSize, TBoardCell } from "./gameBoard.mjs";
import { TSnake, EDirection } from "./snake.mjs";
import { TBait } from "./bait.mjs";
import TMenu from "./menu.mjs";

//-----------------------------------------------------------------------------------------
//----------- Variabler og objekter -------------------------------------------------------
//-----------------------------------------------------------------------------------------
const cvs = document.getElementById("cvs");
const spcvs = new libSprite.TSpriteCanvas(cvs);
let gameSpeed = 4; // Spillhastighetsmultiplikator
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
//----------- Eksporterte funksjoner -------------------------------------------------------

export function newGame() {
  if (hndUpdateGame) clearInterval(hndUpdateGame); // Stopp forrige spillintervall
  GameProps.gameBoard = new TGameBoard();
  GameProps.snake = new TSnake(spcvs, new TBoardCell(5, 5)); // Initialiser slangen med en startposisjon
  GameProps.bait = new TBait(spcvs); // Initialiser agnet med en startposisjon
  gameSpeed = 4; // Tilbakestill spillhastigheten
  hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed); // Oppdater spillet hvert 1000ms / spillhastighet
  GameProps.totalScore = 0; // Tilbakestill total poengsum
  GameProps.appleCount = 0; // Tilbakestill antall epler
  GameProps.menu.updateTotalScore(0); // Oppdater poengsummen i menyen
  GameProps.menu.updateAppleCount(0); // Tilbakestill visningen av antall epler
  GameProps.menu.showMenu(); // Oppdater menyen
}

export function baitIsEaten() {
  GameProps.bait.baitIsEaten(); // Flytt logikken til bait.mjs
  increaseGameSpeed(); // Øk spillhastigheten
}

//------------------------------------------------------------------------------------------
//----------- Funksjoner -------------------------------------------------------------------

function loadGame() {
  cvs.width = GameBoardSize.Cols * SheetData.Head.width;
  cvs.height = GameBoardSize.Rows * SheetData.Head.height;

  GameProps.gameStatus = EGameStatus.Idle; // Sett spillstatus til Idle

  // Opprett menyen
  GameProps.menu = new TMenu(spcvs);
  GameProps.menu.setPlayTrigger(() => {
    newGame(); // Start et nytt spill
    GameProps.gameStatus = EGameStatus.Playing; // Sett spillstatus til Playing
  });
  GameProps.menu.setHomeTrigger(() => {
    GameProps.gameBoard = null; // Fjern spillbrettet
    GameProps.snake = null; // Fjern slangen
    GameProps.bait = null; // Fjern agnet
    GameProps.gameStatus = EGameStatus.Idle; // Sett spillstatus til Idle
    GameProps.menu.showMenu(); // Oppdater menyen
  });
  GameProps.menu.setRestartTrigger(() => {
    newGame(); // Start spillet på nytt
    GameProps.gameStatus = EGameStatus.Playing; // Sett spillstatus til Playing
  });
  GameProps.menu.setResumeTrigger(() => {
    GameProps.gameStatus = EGameStatus.Playing; // Sett spillstatus til Playing
    hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed); // Start spilloppdateringsintervall på nytt
  });

  requestAnimationFrame(drawGame); // Start spill-løkken
  hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed); // Oppdater spillet hvert 1000ms / spillhastighet
  console.log("Spillcanvaset rendrer!");
  console.log("Spillcanvaset oppdateres!");
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
      console.log("Spillet er over!");
      GameProps.menu.showGameOverScore(GameProps.totalScore); // Vis poengsummen på "Game Over"-skjermen
    }
  }
}

function increaseGameSpeed() {
  gameSpeed += 0.5;
  clearInterval(hndUpdateGame); // Stopp forrige spillintervall
  hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed); // Oppdater spillet hvert 1000ms / spillhastighet
  console.log("Øk spillhastigheten!");
}

//-----------------------------------------------------------------------------------------
//----------- Hendelsesbehandlere ---------------------------------------------------------

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
        clearInterval(hndUpdateGame); // Stopp spilloppdateringsintervall
        GameProps.menu.showMenu(); // Oppdater menyen
        console.log("Spillet er satt på pause!");
      } else if (GameProps.gameStatus === EGameStatus.Pause) {
        GameProps.gameStatus = EGameStatus.Playing;
        hndUpdateGame = setInterval(updateGame, 1000 / gameSpeed); // Start spilloppdateringsintervall på nytt
        console.log("Spillet er gjenopptatt!");
      }
      break;
    default:
      console.log(`Tast trykket: "${event.key}"`);
  }
}

//-----------------------------------------------------------------------------------------
//----------- Hovedprogram ----------------------------------------------------------------

spcvs.loadSpriteSheet("./Media/spriteSheet.png", loadGame);
document.addEventListener("keydown", onKeyDown);