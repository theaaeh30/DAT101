"use strict";

import { resumeGame, pauseGame, newGame } from "./game.mjs";

export class Menu {
  constructor() {
    this.menuElement = document.createElement("div");
    this.menuElement.id = "menu";
    this.menuElement.style.position = "absolute";
    this.menuElement.style.top = "50%";
    this.menuElement.style.left = "50%";
    this.menuElement.style.transform = "translate(-50%, -50%)";
    this.menuElement.style.display = "none";
    this.menuElement.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    this.menuElement.style.padding = "20px";
    this.menuElement.style.borderRadius = "10px";
    this.menuElement.style.textAlign = "center";
    document.body.appendChild(this.menuElement);
  }

  addButton(label, onClick) {
    const button = document.createElement("button");
    button.textContent = label;
    button.style.margin = "10px";
    button.style.padding = "10px 20px";
    button.style.fontSize = "16px";
    button.addEventListener("click", onClick);
    this.menuElement.appendChild(button);
  }

  showMenu() {
    this.menuElement.style.display = "block";
  }

  hideMenu() {
    this.menuElement.style.display = "none";
  }
}

// Opprett menyen og legg til knapper
const menu = new Menu();

menu.addButton("Resume Game", () => {
  resumeGame();
  menu.hideMenu();
});

menu.addButton("Pause Game", () => {
  pauseGame();
});

menu.addButton("New Game", () => {
  newGame();
  menu.hideMenu();
});

export default menu;

