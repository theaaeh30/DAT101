"use strict";

import { resumeGame, pauseGame, newGame } from "./game.mjs";

export class Menu {
  constructor() {
    // Kommenter ut opprettelsen av menyen
    // this.menuElement = document.createElement("div");
    // this.menuElement.id = "menu";
    // this.menuElement.style.position = "absolute";
    // this.menuElement.style.top = "50%";
    // this.menuElement.style.left = "50%";
    // this.menuElement.style.transform = "translate(-50%, -50%)";
    // this.menuElement.style.display = "none";
    // this.menuElement.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    // this.menuElement.style.padding = "20px";
    // this.menuElement.style.borderRadius = "10px";
    // this.menuElement.style.textAlign = "center";
    // document.body.appendChild(this.menuElement);
  }

  addButton(label, onClick) {
    // Kommenter ut knappelogikken
    // const button = document.createElement("button");
    // button.textContent = label;
    // button.style.margin = "10px";
    // button.style.padding = "10px 20px";
    // button.style.fontSize = "16px";
    // button.addEventListener("click", onClick);
    // this.menuElement.appendChild(button);
  }

  showMenu() {
    // Kommenter ut visning av menyen
    // if (this.menuElement) {
    //   this.menuElement.style.display = "block";
    // }
  }

  hideMenu() {
    // Kommenter ut skjuling av menyen
    // if (this.menuElement) {
    //   this.menuElement.style.display = "none";
    // }
  }
}

// Opprett menyen uten å vise den
const menu = new Menu();

// Kommenter ut knappene for nå
// menu.addButton("Resume Game", () => {
//   resumeGame();
//   menu.hideMenu();
// });

// menu.addButton("Pause Game", () => {
//   pauseGame();
// });

// menu.addButton("New Game", () => {
//   newGame();
//   menu.hideMenu();
// });

// Funksjon for å tegne Game Over-skjermen
export function drawGameOverScreen(ctx, canvas, score) {
  // Bakgrunn
  ctx.fillStyle = "#FFD700"; // Gul bakgrunn
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Grønn ramme med mønster
  const frameX = 50, frameY = 100, frameW = canvas.width - 100, frameH = 200;
  ctx.fillStyle = "#2db84d"; // Grønn kant
  ctx.fillRect(frameX - 10, frameY - 10, frameW + 20, frameH + 20);

  // Oransje rute inni ramma
  ctx.fillStyle = "#FFD700"; // Samme som bakgrunn
  ctx.fillRect(frameX, frameY, frameW, frameH);

  // Game Over tekst
  ctx.fillStyle = "#f04d26"; // Rød tekst
  ctx.font = "bold 48px Arial";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", canvas.width / 2, frameY + 60);

  // Score
  ctx.font = "bold 36px Arial";
  ctx.fillText(`SCORE: ${score}`, canvas.width / 2, frameY + 120);

  // Restart-knapp
  ctx.fillStyle = "#2db84d"; // Grønn bakgrunn
  ctx.fillRect(frameX + frameW - 80, frameY + frameH - 70, 60, 60);
  ctx.fillStyle = "#FFD700"; // Gul pil
  ctx.font = "40px Arial";
  ctx.fillText("↻", frameX + frameW - 50, frameY + frameH - 25);

  // Hjem-knapp
  ctx.fillStyle = "#2db84d"; // Grønn bakgrunn
  ctx.fillRect(frameX + 20, frameY + frameH - 70, 60, 60);
  ctx.fillStyle = "#FFD700"; // Gul hus-symbol
  ctx.font = "40px Arial";
  ctx.fillText("⌂", frameX + 50, frameY + frameH - 25);
}

export default menu;

