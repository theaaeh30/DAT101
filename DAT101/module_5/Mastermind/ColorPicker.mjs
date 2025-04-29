"use strict";
import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import MastermindBoard from "./MastermindBoard.mjs";
import { GameProps } from "./Mastermind.mjs";

const Positions = MastermindBoard.ColorPicker;

export class TColorPicker extends libSprite.TSpriteDraggable {
  #spcvs;
  #spi;
  #color;
  #snapPos;
  #snapIndex;
  #hasMoved;
  constructor(spcvs, spriteInfo, color, index){
    super(spcvs, spriteInfo,Positions[color]);
    this.index = index;
    this.snapTo = GameProps.snapTo;
    this.#spcvs = spcvs;
    this.#spi = spriteInfo;
    this.#color = color;
    this.#snapPos = null;
    this.#hasMoved = false;
    this.#snapIndex = -1;
  }

  static initializePickers(spcvs, spriteInfo, colors) {
    const pickers = [];
    colors.forEach((color, index) => {
      const picker = new TColorPicker(spcvs, spriteInfo, color, index);
      spcvs.addSpriteButton(picker); // Add picker to the sprite canvas
      pickers.push(picker);
    });
    return pickers;
  }

  onCanDrop(aDropPosition) {
    // Prevent dropping on an occupied snap area
    const snapIndex = GameProps.snapTo.positions.indexOf(aDropPosition);
    return snapIndex !== -1 && GameProps.playerAnswers[snapIndex] === null;
  }

  clone(){
    return new TColorPicker(
      this.#spcvs,
      this.#spi,
      this.#color,
      this.index
    )
  }

  onDrop(aDropPosition) {
    const snapIndex = GameProps.snapTo.positions.indexOf(aDropPosition);

    if (snapIndex !== -1) {
      // Snap to the position if valid
      this.#snapIndex = snapIndex;
      this.#snapPos = new lib2D.TPoint(aDropPosition.x, aDropPosition.y);
      this.x = aDropPosition.x; // Update x position
      this.y = aDropPosition.y; // Update y position

      // Mark the snap area as occupied
      GameProps.snapTo.positions[snapIndex] = null;
      GameProps.playerAnswers[snapIndex] = this;

      // Clone a new picker if dragged from the source
      if (!this.#hasMoved) {
        GameProps.colorPickers.push(this.clone());
      }

      this.#hasMoved = true;
    } else {
      // Return to original position if dropped elsewhere
      this.onCancelDrop();
    }
  }

  onMouseDown() {
    super.onMouseDown();

    // Bring this picker to the top layer
    const index = GameProps.colorPickers.indexOf(this);
    GameProps.colorPickers.splice(index, 1);
    GameProps.colorPickers.push(this);

    // Free the snap area if this picker was placed
    if (this.#snapPos !== null) {
      GameProps.snapTo.positions[this.#snapIndex] = this.#snapPos;
      GameProps.playerAnswers[this.#snapIndex] = null;
      this.#snapPos = null;
    }
  }

  onCancelDrop() {
    if (this.#hasMoved) {
      // If already placed, remove from the snap area and canvas
      const index = GameProps.colorPickers.indexOf(this);
      GameProps.colorPickers.splice(index, 1);
      this.#spcvs.removeSpriteButton(this);
    } else {
      // If dragged from the source, return to original position
      const originalPos = Positions[this.#color];
      this.x = originalPos.x; // Update x position
      this.y = originalPos.y; // Update y position
    }
  }

  getColor() {
    return this.#color;
  }
}

// Function to generate the computer's secret code
export function generateSecretCode(spcvs, spriteInfo, colors, panelHideAnswer) {
  const secretCode = [];
  const chosenColors = [];
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const color = colors[randomIndex];
    chosenColors.push(color);

    const sprite = new libSprite.TSprite(spcvs, spriteInfo, Positions[color]);
    sprite.index = randomIndex; // Store the index for comparison
    sprite.visible = true; // Initially visible but hidden by the panel
    spcvs.addSprite(sprite);
    secretCode.push(sprite);
  }

  // Store the chosen colors for reference
  GameProps.secretCodeColors = chosenColors; // Ensure this is properly set

  // Add functionality to toggle the visibility of the panel
  GameProps.toggleCheat = function () {
    panelHideAnswer.visible = !panelHideAnswer.visible;
  };

  return secretCode;
}

// Function to initialize game rounds
export function initializeGameRounds(spcvs, colorAnswerPositions, colorHintSpriteInfo) {
  const rows = [];
  const roundIndicator = new libSprite.TSprite(spcvs, colorHintSpriteInfo, colorAnswerPositions[0][0]);
  spcvs.addSprite(roundIndicator);

  // Create 10 rows with 4 snap areas each
  for (let i = 0; i < 10; i++) {
    const row = colorAnswerPositions[i].map(pos => new lib2D.TPoint(pos.x, pos.y));
    rows.push(row);
  }

  // Initialize GameProps for rounds
  GameProps.snapTo = { positions: rows[0] }; // Start with the first row
  GameProps.activeRowIndex = 0;
  GameProps.roundIndicator = roundIndicator;

  GameProps.nextRound = function () {
    if (GameProps.activeRowIndex < 9) {
      GameProps.activeRowIndex++;
      GameProps.snapTo.positions = rows[GameProps.activeRowIndex];

      // Update the round indicator position
      const newIndicatorPos = colorAnswerPositions[GameProps.activeRowIndex][0];
      roundIndicator.x = newIndicatorPos.x - 84;
      roundIndicator.y = newIndicatorPos.y + 7;
    } else {
      console.log("No more rounds available.");
    }
  };

  return rows;
}

// Example usage:
// const colors = ["red", "blue", "green", "yellow", "purple", "orange", "white", "black"];
// GameProps.colorPickers = TColorPicker.initializePickers(spriteCanvas, spriteInfo, colors);
// const panelHideAnswer = new libSprite.TSprite(spriteCanvas, spriteInfo, panelPosition);
// panelHideAnswer.visible = true;
// spriteCanvas.addSprite(panelHideAnswer);
// GameProps.secretCode = generateSecretCode(spriteCanvas, spriteInfo, colors, panelHideAnswer);
// GameProps.toggleCheat(); // Call this to toggle the visibility of the panel

// const colorAnswerPositions = MastermindBoard.ColorAnswer; // Array of arrays with snap area positions
// const colorHintSpriteInfo = MastermindBoard.ColorHint; // Sprite info for the round indicator
// const rows = initializeGameRounds(spriteCanvas, colorAnswerPositions, colorHintSpriteInfo);
// GameProps.nextRound(); // Call this to move to the next round