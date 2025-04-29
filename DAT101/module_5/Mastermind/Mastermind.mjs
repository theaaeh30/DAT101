"use strict";

//--------------------------------------------------------------------------------------------------------------------
//------ Imports
//--------------------------------------------------------------------------------------------------------------------
import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { TColorPicker, generateSecretCode, initializeGameRounds } from "./ColorPicker.mjs";
import MastermindBoard from "./MastermindBoard.mjs";
import { TMenu } from "./menu.mjs";


//--------------------------------------------------------------------------------------------------------------------
//------ Variables, Constants and Objects
//--------------------------------------------------------------------------------------------------------------------

// prettier-ignore
export const SpriteInfoList = {
  Board:              { x: 640, y:   0, width: 441, height: 640, count: 1 },
  ButtonNewGame:      { x:   0, y:  45, width: 160, height:  45, count: 4 },
  ButtonCheckAnswer:  { x:   0, y:   0, width: 160, height:  45, count: 4 },
  ButtonCheat:        { x:   0, y: 139, width:  75, height:  49, count: 4 },
  PanelHideAnswer:    { x:   0, y:  90, width: 186, height:  49, count: 1 },
  ColorPicker:        { x:   0, y: 200, width:  34, height:  34, count: 8 },
  ColorHint:          { x:   0, y: 250, width:  19, height:  18, count: 3 },
};

const cvs = document.getElementById("cvs");
const spcvs = new libSprite.TSpriteCanvas(cvs);

//Add all you game objects here
export const GameProps = {
  board: null,
  colorPickers:[],
  snapTo:{
    positions: MastermindBoard.ColorAnswer.Row1,
    distance: 20
  },
  computerAnswers: [],
  roundIndicator: null,
  menu: null,
  playerAnswers: [null, null, null, null],
  answerHintRow: MastermindBoard.AnswerHint.Row1,
  checkAnswerButton: null,
}


//--------------------------------------------------------------------------------------------------------------------
//------ Functions
//--------------------------------------------------------------------------------------------------------------------

export function newGame() {
  // Reset all color pickers and player answers
  for (let i = 0; i < GameProps.colorPickers.length; i++) {
    const colorPicker = GameProps.colorPickers[i];
    spcvs.removeSpriteButton(colorPicker);
  }
  GameProps.colorPickers = [];
  const ColorKeys = Object.keys(MastermindBoard.ColorPicker);

  // Initialize snapTo.positions to avoid null errors
  GameProps.snapTo.positions = MastermindBoard.ColorAnswer.Row1;

  // Move the round indicator to the first row
  moveRoundIndicator();

  // Instantiate and place color pickers
  for (let i = 0; i < ColorKeys.length; i++) {
    const colorName = ColorKeys[i]; // Color name
    const colorPicker = new TColorPicker(spcvs, SpriteInfoList.ColorPicker, colorName, i);
    GameProps.colorPickers.push(colorPicker);
  }

  generateComputerAnswer();
}

function drawGame(){
  spcvs.clearCanvas();
  // Draw the game board first as the base layer
  GameProps.board.draw();

  //Draw all game objects here, remember to think about the draw order (layers in PhotoShop for example!)
  for(let i = 0; i < GameProps.computerAnswers.length; i++){
    const computerAnswer = GameProps.computerAnswers[i];
    computerAnswer.draw();
  }
  
  GameProps.roundIndicator.draw();

  GameProps.menu.draw();

  for(let i = 0; i < GameProps.colorPickers.length; i++){
    const colorPicker = GameProps.colorPickers[i];
    colorPicker.draw();
  }

  requestAnimationFrame(drawGame);
}

function generateComputerAnswer() {
  // Reset secret code colors
  GameProps.secretCodeColors = [];

  // Generate 4 random colors for the secret code
  for (let i = 0; i < 4; i++) {
    const colorIndex = Math.floor(Math.random() * SpriteInfoList.ColorPicker.count);
    const pos = MastermindBoard.ComputerAnswer[i];
    const sprite = new libSprite.TSprite(spcvs, SpriteInfoList.ColorPicker, pos);
    sprite.index = colorIndex;
    GameProps.computerAnswers.push(sprite);

    // Store the color index in secretCodeColors
    GameProps.secretCodeColors.push(colorIndex);
  }
}

export function moveRoundIndicator(){
  const pos = GameProps.snapTo.positions[0];
  GameProps.roundIndicator.x = pos.x - 84;
  GameProps.roundIndicator.y = pos.y + 7;
}

export function initializeButtons(spcvs, spriteInfoList, boardPositions) {
  // Create "Cheat" button
  const cheatButton = new libSprite.TSpriteButtonHaptic(
    spcvs,
    spriteInfoList.ButtonCheat,
    boardPositions.ButtonCheat
  );
  cheatButton.onClick = () => {
    if (GameProps.toggleCheat) {
      GameProps.toggleCheat();
    }
  };
  spcvs.addSpriteButton(cheatButton);

  // Create "New Game" button
  const newGameButton = new libSprite.TSpriteButtonHaptic(
    spcvs,
    spriteInfoList.ButtonNewGame,
    boardPositions.ButtonNewGame
  );
  newGameButton.onClick = () => {
    startNewGame(spcvs, spriteInfoList, boardPositions);
  };
  spcvs.addSpriteButton(newGameButton);

  // Create "Check Answer" button
  const checkAnswerButton = new libSprite.TSpriteButtonHaptic(
    spcvs,
    spriteInfoList.ButtonCheckAnswer,
    boardPositions.ButtonCheckAnswer
  );
  checkAnswerButton.onClick = () => {
    if (isCurrentRowComplete()) {
      checkPlayerAnswer();
    }
  };
  spcvs.addSpriteButton(checkAnswerButton);

  GameProps.checkAnswerButton = checkAnswerButton;
}

// Function to start a new game
function startNewGame(spcvs, spriteInfoList, boardPositions) {
  // Reset game state
  GameProps.colorPickers = [];
  GameProps.playerAnswers = Array(4).fill(null);
  GameProps.secretCode = [];
  GameProps.computerAnswers = []; // Reset computer answers
  GameProps.activeRowIndex = 0;

  // Generate a new secret code
  const panelHideAnswer = new libSprite.TSprite(spcvs, spriteInfoList.PanelHideAnswer, boardPositions.PanelHideAnswer);
  panelHideAnswer.visible = true;
  spcvs.addSpriteObject(panelHideAnswer); // Correct method for adding non-interactive sprites
  GameProps.panelHideAnswer = panelHideAnswer; // Store the panel in GameProps
  generateComputerAnswer(); // Generate the secret code

  // Initialize rounds and set GameProps.nextRound
  const colorAnswerPositions = boardPositions.ColorAnswer;
  const colorHintSpriteInfo = spriteInfoList.ColorHint;
  initializeGameRounds(spcvs, colorAnswerPositions, colorHintSpriteInfo);

  // Reset the "Check Answer" button state
  GameProps.checkAnswerButton.setActive(false); // Use the correct method
}

// Function to check if the current row is complete
function isCurrentRowComplete() {
  return GameProps.playerAnswers.every(answer => answer !== null);
}

// Function to check the player's answer
function checkPlayerAnswer() {
  if (!GameProps.secretCodeColors || GameProps.secretCodeColors.length === 0) {
    console.error("Secret code is not initialized.");
    return;
  }

  const playerAnswers = GameProps.playerAnswers.map(picker => picker.getColor());
  const secretCode = [...GameProps.secretCodeColors]; // Copy to avoid modifying the original
  const hintPositions = MastermindBoard.AnswerHint[`Row${GameProps.activeRowIndex + 1}`];

  let blackPins = 0;
  let whitePins = 0;

  // Step 1: Count black pins (correct color in the correct position)
  const matchedIndices = [];
  playerAnswers.forEach((color, index) => {
    if (color === secretCode[index]) {
      blackPins++;
      matchedIndices.push(index);
      secretCode[index] = null; // Mark as matched
    }
  });

  // Step 2: Count white pins (correct color in the wrong position)
  playerAnswers.forEach((color, index) => {
    if (!matchedIndices.includes(index) && secretCode.includes(color)) {
      whitePins++;
      secretCode[secretCode.indexOf(color)] = null; // Mark as matched
    }
  });

  // Step 3: Display hint pins
  const pins = [];
  for (let i = 0; i < blackPins; i++) {
    const pin = new libSprite.TSprite(spcvs, SpriteInfoList.ColorHint, hintPositions[i]);
    pin.index = 1; // Black pin
    spcvs.addSprite(pin);
    pins.push(pin);
  }
  for (let i = 0; i < whitePins; i++) {
    const pin = new libSprite.TSprite(spcvs, SpriteInfoList.ColorHint, hintPositions[blackPins + i]);
    pin.index = 0; // White pin
    spcvs.addSprite(pin);
    pins.push(pin);
  }

  console.log(`Black Pins: ${blackPins}, White Pins: ${whitePins}`);

  // Step 4: Check for win condition
  if (blackPins === 4) {
    console.log("You win!");
    revealAnswerPanel();
    disableInteractions();
    return;
  }

  // Step 5: Move to the next round or check for loss condition
  if (GameProps.nextRound) {
    GameProps.nextRound();
  } else {
    console.error("GameProps.nextRound is not defined.");
  }

  if (GameProps.activeRowIndex >= 9) {
    console.log("Game Over! You lose.");
    revealAnswerPanel();
    disableInteractions();
  }

  // Disable "Check Answer" button until the next row is ready
  GameProps.checkAnswerButton.setActive(false); // Use the correct method
}

// Function to reveal the panel hiding the computer's answer
function revealAnswerPanel() {
  const panelHideAnswer = GameProps.panelHideAnswer;
  if (panelHideAnswer) {
    panelHideAnswer.visible = false; // Reveal the panel
  }
}

// Function to disable further interactions
function disableInteractions() {
  GameProps.colorPickers.forEach(picker => picker.setEnabled(false)); // Disable all color pickers
  GameProps.checkAnswerButton.setEnabled(false); // Disable the "Check Answer" button
  GameProps.menu.setEnabled(false); // Disable the menu if applicable
}

//--------------------------------------------------------------------------------------------------------------------
//------ Event Handlers
//--------------------------------------------------------------------------------------------------------------------

//loadGame runs once when the sprite sheet is loaded
function loadGame() {
  //Set canvas with and height to match the sprite sheet
  cvs.width = SpriteInfoList.Board.width;
  cvs.height = SpriteInfoList.Board.height;
  spcvs.updateBoundsRect();
  let pos = new lib2D.TPoint(0, 0);
  GameProps.board = new libSprite.TSprite(spcvs, SpriteInfoList.Board, pos);

  pos = GameProps.snapTo.positions[0];
  GameProps.roundIndicator = new libSprite.TSprite(spcvs, SpriteInfoList.ColorHint, pos);
  GameProps.roundIndicator.index = 2;
  moveRoundIndicator();

  GameProps.menu = new TMenu(spcvs);

  initializeButtons(spcvs, SpriteInfoList, MastermindBoard);

  newGame();
  requestAnimationFrame(drawGame); // Start the animation loop
}


//--------------------------------------------------------------------------------------------------------------------
//------ Main Code
//--------------------------------------------------------------------------------------------------------------------


spcvs.loadSpriteSheet("./Media/SpriteSheet.png", loadGame);
window.addEventListener("resize", spcvs.updateBoundsRect.bind(spcvs));