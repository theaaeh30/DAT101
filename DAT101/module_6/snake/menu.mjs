"use strict";

import { resumeGame, pauseGame, newGame } from "./game.mjs";

export class Menu {
  constructor() {
    // ...existing code...
  }

  addButton(label, onClick) {
    // ...existing code...
  }

  showMenu() {
    // Tom metode for å unngå feil
  }

  hideMenu() {
    // Tom metode for å unngå feil
  }
}

// Opprett et tomt menu-objekt for å unngå feil i game.mjs
const menu = new Menu();

export function drawGameOverScreen(ctx, canvas, score) {
  // ...existing code...
}

export default menu;