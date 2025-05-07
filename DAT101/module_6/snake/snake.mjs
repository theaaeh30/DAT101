"use strict";
//------------------------------------------------------------------------------------------
//----------- Import modules, mjs files  ---------------------------------------------------
//------------------------------------------------------------------------------------------
import libSprite from "../../common/libs/libSprite_v2.mjs";
import lib2D from "../../common/libs/lib2d_v2.mjs";
import { GameProps, SheetData, baitIsEaten } from "./game.mjs";
import { TBoardCell, EBoardCellInfoType } from "./gameBoard.mjs";

//------------------------------------------------------------------------------------------
//----------- variables and object ---------------------------------------------------------
const ESpriteIndex = {UR: 0, LD: 0, RU: 1, DR: 1, DL: 2, LU: 2, RD: 3, UL: 3, RL: 4, UD: 5};
export const EDirection = { Up: 0, Right: 1, Left: 2, Down: 3 };
export let baitEaten = false; // Eksporter baitEaten for bruk i andre moduler

export function setBaitEaten(value) {
  baitEaten = value; // Oppdater baitEaten
}

//-----------------------------------------------------------------------------------------
//----------- Classes ---------------------------------------------------------------------
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
      baitIsEaten(); // Rettet skrivefeilen her
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
    this.index = ESpriteIndex.RL; // Standard rett horisontal
  }

  update() {
    let spriteIndex = ESpriteIndex.RL;
    let boardCellInfo;

    switch (this.direction) {
      case EDirection.Up:
        this.boardCell.row--;
        boardCellInfo = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
        if (boardCellInfo.direction !== this.direction) {
          switch (boardCellInfo.direction) {
            case EDirection.Left:
              spriteIndex = ESpriteIndex.UL;
              break;
            case EDirection.Right:
              spriteIndex = ESpriteIndex.UR;
              break;
          }
        } else {
          spriteIndex = ESpriteIndex.UD;
        }
        break;

      case EDirection.Right:
        this.boardCell.col++;
        boardCellInfo = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
        if (boardCellInfo.direction !== this.direction) {
          switch (boardCellInfo.direction) {
            case EDirection.Up:
              spriteIndex = ESpriteIndex.RU;
              break;
            case EDirection.Down:
              spriteIndex = ESpriteIndex.RD;
              break;
          }
        } else {
          spriteIndex = ESpriteIndex.RL;
        }
        break;

      case EDirection.Left:
        this.boardCell.col--;
        boardCellInfo = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
        if (boardCellInfo.direction !== this.direction) {
          switch (boardCellInfo.direction) {
            case EDirection.Up:
              spriteIndex = ESpriteIndex.LU;
              break;
            case EDirection.Down:
              spriteIndex = ESpriteIndex.LD;
              break;
          }
        } else {
          spriteIndex = ESpriteIndex.RL;
        }
        break;

      case EDirection.Down:
        this.boardCell.row++;
        boardCellInfo = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
        if (boardCellInfo.direction !== this.direction) {
          switch (boardCellInfo.direction) {
            case EDirection.Left:
              spriteIndex = ESpriteIndex.DR;
              break;
            case EDirection.Right:
              spriteIndex = ESpriteIndex.DL;
              break;
          }
        } else {
          spriteIndex = ESpriteIndex.UD;
        }
        break;
    }

    this.direction = boardCellInfo.direction;
    this.index = spriteIndex;
    super.update();
  }

  clone() {
    return new TSnakeBody(this.spcvs, new TBoardCell(this.boardCell.col, this.boardCell.row));
  }
}

class TSnakeTail extends TSnakePart {
  constructor(aSpriteCanvas, aBoardCell) {
    super(aSpriteCanvas, SheetData.Tail, aBoardCell);
  }

  update() {
    // Fjern informasjonen om halen fra den nåværende cellen
    let boardCellInfo = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
    boardCellInfo.infoType = EBoardCellInfoType.Empty; // Rydd cellen før halen flyttes
    switch (this.direction) {
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
    // Oppdater retningen og spillbrettet basert på den nye cellen
    boardCellInfo = GameProps.gameBoard.getCell(this.boardCell.row, this.boardCell.col);
    this.direction = boardCellInfo.direction; // Oppdater retningen basert på den nye cellen
    this.index = this.direction; // Oppdater sprite-indeksen
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

  addSnakePart() {
    // Marker den siste kroppsdelen for vekst
    if (this.#body.length > 0) {
      this.#body[this.#body.length - 1].wasGrown = true;
    } else {
      // Hvis kroppen er tom, marker halen for vekst
      this.#tail.wasGrown = true;
    }
  }

  update() {
    if (this.#isDead) {
      return false; // Slangen er død, ikke fortsett
    }

    let lastBodyPart = null; // Lag kopi av siste kroppsdel før den flytter seg
    if (this.#body.length > 0 && this.#body[this.#body.length - 1].wasGrown) {
      lastBodyPart = this.#body[this.#body.length - 1].clone();
    } else if (this.#tail.wasGrown) {
      lastBodyPart = this.#tail.clone();
      this.#tail.wasGrown = false; // Fjern vekstmarkeringen fra halen
    }

    // Oppdater hodet og sjekk for kollisjon
    if (this.#head.update()) {
      // Oppdater kroppsdeler
      for (let i = 0; i < this.#body.length; i++) {
        this.#body[i].update();
      }

      // Hvis slangen vokser, legg til kopi av siste kroppsdel
      if (lastBodyPart) {
        this.#body.push(lastBodyPart);
      } else {
        // Flytt halen videre hvis slangen ikke vokser
        this.#tail.update();
      }

      return true; // Slangen lever
    } else {
      this.#isDead = true;
      return false; // Kollisjon, ikke fortsett
    }
  }

  setDirection(aDirection) {
    this.#head.setDirection(aDirection);
  }
}