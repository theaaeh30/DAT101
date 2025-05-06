"use strict";

import { EDirection } from "./snake.mjs";

export const GameBoardSize = { Cols: 24, Rows: 18 };

export const EBoardCellInfoType = { Empty: 0, Snake: 1, Bait: 2 };

export class TBoardCell {
  constructor(aCol, aRow) {
    this.col = aCol;
    this.row = aRow;
  }
}// End off class TBoardCell
//------------------------------------------------------------------------------------------

export class TBoardCellInfo {
  constructor() {
    this.direction = EDirection.Right;
    this.infoType = EBoardCellInfoType.Empty;
  }
}// End off class TBoardCellInfo
//------------------------------------------------------------------------------------------

export class TGameBoard {
  constructor() {
    this.cols = GameBoardSize.Cols;
    this.rows = GameBoardSize.Rows;
    this.gameBoard = [];

    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j < this.cols; j++) {
        row.push(new TBoardCellInfo());
      }
      this.gameBoard.push(row);
    }
  } // End of constructor

  getCell(aRow, aCol) {
    if (aRow < 0 || aRow >= this.rows || aCol < 0 || aCol >= this.cols) {
      return null;
    }
    return this.gameBoard[aRow][aCol];
  } // End of getCell

  draw(context) {
    // Tegn bakgrunn
    context.fillStyle = "#FFD700"; // Bakgrunnsfarge (gull)
    context.fillRect(0, 0, this.cols * 32, this.rows * 32); // Tilpass til brettets størrelse

    // Tegn rammer
    context.strokeStyle = "#008000"; // Rammefarge (grønn)
    context.lineWidth = 4;
    context.strokeRect(0, 0, this.cols * 32, this.rows * 32);

    // Tegn celler (valgfritt, for debugging eller visuell hjelp)
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const cell = this.getCell(row, col);
        if (cell.infoType === EBoardCellInfoType.Snake) {
          context.fillStyle = "#228B22"; // Farge for slangen (grønn)
          context.fillRect(col * 32, row * 32, 32, 32);
        } else if (cell.infoType === EBoardCellInfoType.Bait) {
          context.fillStyle = "#FF4500"; // Farge for agn (oransje)
          context.fillRect(col * 32, row * 32, 32, 32);
        }
      }
    }
  } // End of draw
  
}// End of class TGameBoard
//------------------------------------------------------------------------------------------