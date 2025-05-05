"use strict";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { TGameBoard, GameBoardSize, TBoardCell } from "./gameBoard.mjs";
import { TSnake, EDirection } from "./snake.mjs";
import { TBait } from "./bait.mjs";
import { GameProps } from "./game.mjs";

// Menu class to handle the game menu
export class GameMenu {
    constructor() {
        this.menuElement = document.createElement("div");
        this.menuElement.id = "game-menu";
        this.menuElement.style.position = "absolute";
        this.menuElement.style.top = "50%";
        this.menuElement.style.left = "50%";
        this.menuElement.style.transform = "translate(-50%, -50%)";
        this.menuElement.style.backgroundColor = "#333";
        this.menuElement.style.color = "#fff";
        this.menuElement.style.padding = "20px";
        this.menuElement.style.borderRadius = "10px";
        this.menuElement.style.textAlign = "center";
        this.menuElement.style.display = "none"; // Initially hidden
        document.body.appendChild(this.menuElement);
    }

    showMenu() {
        this.menuElement.style.display = "block";
    }

    hideMenu() {
        this.menuElement.style.display = "none";
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

    addSpriteButton(spriteUrl, width, height, onClick) {
        const button = document.createElement("button");
        button.style.width = `${width}px`;
        button.style.height = `${height}px`;
        button.style.backgroundImage = `url(${spriteUrl})`;
        button.style.backgroundSize = "contain";
        button.style.backgroundRepeat = "no-repeat";
        button.style.border = "none";
        button.style.cursor = "pointer";
        button.addEventListener("click", onClick);
        this.menuElement.appendChild(button);
    }
}

// Example usage
const menu = new GameMenu();

// Add a sprite-based start button
menu.addSpriteButton("spriteSheet.png", 100, 50, () => {
    console.log("Game Started");
    menu.hideMenu();
});

// Add other buttons
menu.addButton("Pause Game", () => {
    console.log("Game Paused");
});
menu.addButton("Resume Game", () => {
    console.log("Game Resumed");
});
menu.addButton("New Game", () => {
    console.log("New Game Started");
});
menu.addButton("Exit", () => {
    console.log("Game Exited");
    menu.hideMenu();
});

// Show the menu when the page loads
window.onload = () => {
    menu.showMenu();
};

