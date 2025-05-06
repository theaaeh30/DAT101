"use strict";
//------------------------------------------------------------------------------------------
//----------- Import modules, mjs files  ---------------------------------------------------
//------------------------------------------------------------------------------------------
import libSprite from "../../common/libs/libSprite_v2.mjs";
import lib2D from "../../common/libs/lib2d_v2.mjs";
import { GameProps, SheetData, bateIsEaten } from "./game.mjs"
import { TBoardCell, EBoardCellInfoType } from "./gameBoard.mjs";

//------------------------------------------------------------------------------------------
//----------- variables and object ---------------------------------------------------------
//------------------------------------------------------------------------------------------
const ESpriteIndex = {UR: 0, LD: 0, RU: 1, DR: 1, DL: 2, LU: 2, RD: 3, UL: 3, RL: 4, UD: 5};
export const EDirection = { Up: 0, Right: 1, Left: 2, Down: 3 };


//-----------------------------------------------------------------------------------------
//----------- Classes ---------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
class TSnakePart extends libSprite.TSprite {
  constructor(aSpriteCanvas, aSpriteInfo, aBoardCell) {
    const pos = new lib2D.TPoint(aBoardCell.col * aSpriteInfo.width, aBoardCell.row * aSpriteInfo.height);
    super(aSpriteCanvas, aSpriteInfo, pos);
    this.boardCell = aBoardCell;
    let boardCellInfo = GameProps.gameBoard.getCell(aBoardCell.row, aBoardCell.col);
    this.direction = boardCellInfo.direction;
    boardCellInfo.infoType = EBoardCellInfoType.Snake;
    this.index = this.direction;
  }

  update(){
    this.x = this.boardCell.col * this.spi.width;
    this.y = this.boardCell.row * this.spi.height;
  }

} // class TSnakePart


class TSnakeHead extends TSnakePart {
  constructor(aSpriteCanvas, aBoardCell) {
    super(aSpriteCanvas, SheetData.Head, aBoardCell);
    this.newDirection = this.direction;
  }

 setDirection(aDirection) {
    if ((this.direction === EDirection.Right || this.direction === EDirection.Left) && (aDirection === EDirection.Up || aDirection === EDirection.Down)) {
      this.newDirection = aDirection;
    } else if ((this.direction === EDirection.Up || this.direction === EDirection.Down) && (aDirection === EDirection.Right || aDirection === EDirection.Left)) {
      this.newDirection = aDirection;
    }
  }

  update(){
    GameProps.gameBoard.getCell(this.boardCell.row,this.boardCell.col).direction = this.newDirection;
    switch (this.newDirection) {
      case EDirection.Up:
        this.boardCell.row--;
        break;
      case EDirection.Right:
        this.boardCell.col++;
        break;
      case EDirection.Left:
        this.boardCell.col--;
        break;
      case EDirection.Down:
        this.boardCell.row++;
        break;
    }
    this.direction = this.newDirection;
    this.index = this.direction;
    if (this.checkCollision()) {
      return false; // Collision detected, do not continue
    }
    // Update the position of the snake element (subclass)
    super.update();
    //Check if the snake head is on a bait cell
    const boardCellInfo = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
    if(boardCellInfo.infoType === EBoardCellInfoType.Bait) {
      bateIsEaten();
    }else{
      /* Decrease the score if the snake head is not on a bait cell */
    }
    boardCellInfo.infoType = EBoardCellInfoType.Snake; // Set the cell to Snake
    return true; // No collision, continue
  }

  checkCollision() {
    let collision = this.boardCell.row < 0 || this.boardCell.row >= GameProps.gameBoard.rows || this.boardCell.col < 0 || this.boardCell.col >= GameProps.gameBoard.cols;
    if(!collision) {
      const boardCellInfo = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
      collision = boardCellInfo.infoType === EBoardCellInfoType.Snake;
    }
    return collision; // Collision detected
  }
}

class TSnakeBody extends TSnakePart {
  constructor(aSpriteCanvas, aBoardCell) {
    super(aSpriteCanvas, SheetData.Body, aBoardCell);
    this.index = ESpriteIndex.UD; // Standard sprite for vertikal bevegelse
  }

  update() {
    const boardCellInfo = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
    if (!boardCellInfo) return; // Sjekk om posisjonen er gyldig

    // Oppdater sprite basert på retning
    let spriteIndex = ESpriteIndex.UD; // Standard for vertikal bevegelse
    switch (this.direction) {
      case EDirection.Up:
      case EDirection.Down:
        spriteIndex = ESpriteIndex.UD; // Vertikal bevegelse
        break;
      case EDirection.Left:
      case EDirection.Right:
        spriteIndex = ESpriteIndex.RL; // Horisontal bevegelse
        break;
    }

    // Hvis kroppsdelen svinger, oppdater sprite for sving
    if (boardCellInfo.direction !== this.direction) {
      switch (this.direction) {
        case EDirection.Up:
          spriteIndex =
            boardCellInfo.direction === EDirection.Left
              ? ESpriteIndex.UL
              : ESpriteIndex.UR;
          break;
        case EDirection.Down:
          spriteIndex =
            boardCellInfo.direction === EDirection.Left
              ? ESpriteIndex.DL
              : ESpriteIndex.DR;
          break;
        case EDirection.Left:
          spriteIndex =
            boardCellInfo.direction === EDirection.Up
              ? ESpriteIndex.LU
              : ESpriteIndex.LD;
          break;
        case EDirection.Right:
          spriteIndex =
            boardCellInfo.direction === EDirection.Up
              ? ESpriteIndex.RU
              : ESpriteIndex.RD;
          break;
      }
    }

    this.index = spriteIndex; // Oppdater sprite-indeksen
    super.update();
  }

  clone() {
    const newBody = new TSnakeBody(this.spcvs, new TBoardCell(this.boardCell.col, this.boardCell.row));
    newBody.index = this.index;
    newBody.direction = this.direction;
    return newBody;
  }
} // class TSnakeBody


class TSnakeTail extends TSnakePart {
  constructor(aSpriteCanvas, aBoardCell) {
    super(aSpriteCanvas, SheetData.Tail, aBoardCell);
  }

  update(lastBodyPart) {
    if (!lastBodyPart) return; // Hvis det ikke er noen kroppsdeler, gjør ingenting

    // Plasser halen én celle bak den siste kroppsdelen basert på retningen
    this.boardCell = { ...lastBodyPart.boardCell };
    switch (lastBodyPart.direction) {
      case EDirection.Up:
        this.boardCell.row++; // Flytt ned
        this.index = ESpriteIndex.UD; // Vertikal hale
        break;
      case EDirection.Down:
        this.boardCell.row--; // Flytt opp
        this.index = ESpriteIndex.UD; // Vertikal hale
        break;
      case EDirection.Left:
        this.boardCell.col++; // Flytt til høyre
        this.index = ESpriteIndex.RL; // Horisontal hale
        break;
      case EDirection.Right:
        this.boardCell.col--; // Flytt til venstre
        this.index = ESpriteIndex.RL; // Horisontal hale
        break;
    }

    super.update();
  }

  clone() {
    return new TSnakeTail(this.spcvs, new TBoardCell(this.boardCell.col, this.boardCell.row));
  }

} // class TSnakeTail


export class TSnake {
  #isDead = false;
  #head = null;
  #body = null;
  #tail = null;

  constructor(aSpriteCanvas, aBoardCell) {
    this.#head = new TSnakeHead(aSpriteCanvas, aBoardCell);
    let col = aBoardCell.col - 1;
    this.#body = [new TSnakeBody(aSpriteCanvas, new TBoardCell(col, aBoardCell.row))];
    col--;
    this.#tail = new TSnakeTail(aSpriteCanvas, new TBoardCell(col, aBoardCell.row));
  }

  draw() {
    this.#head.draw();
    for (let i = 0; i < this.#body.length; i++) {
      this.#body[i].draw();
    }
    this.#tail.draw();
  }

  grow() {
    // Kopier den siste kroppsdelen eller halen
    const lastPart = this.#body.length > 0 ? this.#body[this.#body.length - 1] : this.#tail;
    const newBodyPart = lastPart.clone();

    // Sett posisjonen og retningen til den nye kroppsdelen
    newBodyPart.boardCell = { ...lastPart.boardCell };
    newBodyPart.direction = lastPart.direction;

    // Legg til den nye kroppsdelen i kroppen
    this.#body.push(newBodyPart);
  }

  update() {
    if (this.#isDead) {
      return false; // Slangen er død, fortsett ikke
    }

    // Lagre posisjonen til hodet før det flyttes
    const previousHeadPosition = { ...this.#head.boardCell };
    const previousHeadDirection = this.#head.direction;

    // Oppdater hodet
    if (!this.#head.update()) {
      this.#isDead = true;
      return false; // Kollisjon oppdaget, fortsett ikke
    }

    // Flytt kroppen bakover
    let previousPosition = previousHeadPosition;
    let previousDirection = previousHeadDirection;
    for (let i = 0; i < this.#body.length; i++) {
      const currentPosition = { ...this.#body[i].boardCell };
      const currentDirection = this.#body[i].direction;

      this.#body[i].boardCell = previousPosition;
      this.#body[i].direction = previousDirection;

      previousPosition = currentPosition;
      previousDirection = currentDirection;
    }

    // Flytt halen til den siste kroppsdelen
    if (this.#body.length > 0) {
      const lastBodyPart = this.#body[this.#body.length - 1];
      this.#tail.update(lastBodyPart); // Oppdater halen basert på den siste kroppsdelen
    }

    // Oppdater alle kroppsdeler
    for (let i = 0; i < this.#body.length; i++) {
      this.#body[i].update();
    }

    return true; // Ingen kollisjon, fortsett
  }

  setDirection(aDirection) {
    this.#head.setDirection(aDirection);
  }
}