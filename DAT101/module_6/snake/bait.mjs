"use strict";
//-----------------------------------------------------------------------------------------
//----------- Import modules, mjs files  ---------------------------------------------------
//-----------------------------------------------------------------------------------------
import libSprite from "../../common/libs/libSprite_v2.mjs";
import lib2D from "../../common/libs/lib2d_v2.mjs";
import { GameProps, SheetData } from "./game.mjs";
import { TBoardCell, EBoardCellInfoType } from "./gameBoard.mjs";

//------------------------------------------------------------------------------------------
//----------- Classes ---------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

export class TBait extends libSprite.TSprite {
  #boardCell = null;
  constructor(aSpriteCanvas) {
    const pos = new lib2D.TPoint(0, 0);
    super(aSpriteCanvas, SheetData.Bait, pos);
    this.#boardCell = new TBoardCell(0, 0);
    this.update();
  } // End of constructor

  update() {
    // Flytt agnet til en tilfeldig tom celle på spillbrettet
    do {
      this.#boardCell.col = Math.floor(Math.random() * GameProps.gameBoard.cols);
      this.#boardCell.row = Math.floor(Math.random() * GameProps.gameBoard.rows);
    } while (
      GameProps.gameBoard.getCell(this.#boardCell.row, this.#boardCell.col).infoType !== EBoardCellInfoType.Empty
    );

    this.x = this.#boardCell.col * this.spi.width;
    this.y = this.#boardCell.row * this.spi.height;

    // Oppdater celletypen til Bait
    GameProps.gameBoard.getCell(this.#boardCell.row, this.#boardCell.col).infoType = EBoardCellInfoType.Bait;

    // Start nedtelling for agnet
    if (GameProps.menu && GameProps.menu.startBaitCountdown) {
      GameProps.menu.startBaitCountdown();
    }

    this.spawnTime = Date.now(); // Registrer tidspunktet agnet dukker opp
  } // End of update

  static getRandomEmptyCell() {
    let emptyCell;
    do {
      const row = Math.floor(Math.random() * GameProps.gameBoard.rows);
      const col = Math.floor(Math.random() * GameProps.gameBoard.cols);
      const cell = GameProps.gameBoard.getCell(row, col);
      if (cell.infoType === EBoardCellInfoType.Empty) {
        emptyCell = new TBoardCell(col, row);
      }
    } while (!emptyCell);
    return emptyCell;
  } // End of getRandomEmptyCell

  generateNewBait() {
    const randomCell = TBait.getRandomEmptyCell();
    this.#boardCell = randomCell;
    this.x = randomCell.col * this.spi.width; // Oppdater x-posisjon
    this.y = randomCell.row * this.spi.height; // Oppdater y-posisjon
    GameProps.gameBoard.getCell(randomCell.row, randomCell.col).infoType = EBoardCellInfoType.Bait;
  } // End of generateNewBait

  baitIsEaten() {
    console.log("Bait eaten!");
    GameProps.snake.addSnakePart(); // Legg til en ny kroppsdel til slangen
    this.update(); // Flytt agnet til en ny posisjon

    // Oppdater antall epler spist
    GameProps.appleCount += 1; // Øk antall epler med 1
    console.log("Apple count incremented to:", GameProps.appleCount);
    GameProps.menu.updateAppleCount(GameProps.appleCount); // Oppdater visningen av antall epler

    // Oppdater poengsum med en tilfeldig verdi mellom 2 og 7
    const scoreIncrement = Math.floor(Math.random() * 6) + 2; // Tilfeldig verdi mellom 2 og 7
    GameProps.totalScore += scoreIncrement;
    console.log("Score incremented by:", scoreIncrement, "New total score:", GameProps.totalScore);
    GameProps.menu.updateTotalScore(GameProps.totalScore); // Oppdater visningen av poengsummen
  } // End of baitIsEaten
}