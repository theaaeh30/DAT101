"use strict"
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { SpriteInfoList, GameProps, EGameStatus, startGame } from "./BrickBreaker.mjs";
import lib2d from "../../common/libs/lib2d_v2.mjs";

export class TMenu {
    
  #spMenuBoard;
  #spcvs;
  #spStart
  #spPlay
  #spPause
  #spHome
  #spRestart
  #spPauseIkon
  #activeSprite;
  #blinkInterval;   
  #blinkFrame = 0; 
  constructor(aSpriteCanvas) {
    this.#spcvs = aSpriteCanvas; // Opprett menybrettet
    /* 
    Bruk denne koden for jukse litt og starte spillet direkte 
    i en annen status enn EGameStatus.idle
    */
    GameProps.status = EGameStatus.idle;
    const pos = new lib2d.TPosition(160, 90);
    this.#spMenuBoard = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.Menu, pos);
    
    //Play
    const playPos = new lib2d.TPosition(550, 550);
    this.#spPlay = new libSprite.TSpriteButton(aSpriteCanvas, SpriteInfoList.Buttons, playPos);
    this.#spPlay.index = 3; 
    this.#spPlay.onClick = () => {
      console.log("Play-knappen ble trykket!");
      this.startCountdown(); }
    
    //Home button
    const homePos = new lib2d.TPosition(650, 550);
    this.#spHome = new libSprite.TSpriteButton(aSpriteCanvas, SpriteInfoList.Buttons, homePos);
    this.#spHome.index = 1; 
    this.#spHome.onClick = () => {
      console.log("Home-knappen ble trykket!");}

    //Pause button
    const pausePos = new lib2d.TPosition(550, 425);
    this.#spPause = new libSprite.TSpriteButton(aSpriteCanvas, SpriteInfoList.Buttons, pausePos);
    this.#spPause.index = 2; 
    this.#spPause.onClick = () => {
      console.log("Pause-knappen ble trykket!");}
     

    //Restart button
    const restartPos = new lib2d.TPosition(450, 550);
    this.#spRestart = new libSprite.TSpriteButton(aSpriteCanvas, SpriteInfoList.Buttons, restartPos);
    this.#spRestart.index = 0; 
    this.#spRestart.onClick = () => {
      console.log("Restart-knappen ble trykket!");}

    //Start button
    const startPos = new lib2d.TPosition(500, 400);
    this.#spStart = new libSprite.TSpriteButton(aSpriteCanvas, SpriteInfoList.StartBtn, startPos);
    this.#spStart.index = 0; //Start button
    this.#spStart.onClick = () => {
      this.stopBlinking();     // Stopp blinkingen
      this.startBlinking();
      console.log("Start-knappen ble trykket, spillet starter nå.");
      startGame();             // Kall startGame for å starte spillet
    };
    
    this.#activeSprite = null; //Vi har ingen aktive sprite enda, når musen er over en sprite setter vi denne til den aktive sprite
    
    // Start blinkingen én gang når menyen opprettes
    this.startBlinking();
  
  }


  draw() {
    switch (GameProps.status) {
       case EGameStatus.idle:
        this.#spStart.draw();
        break;
      case EGameStatus.pause:
        this.#spMenuBoard.draw();
        this.#spPause.draw();
        this.#spPlay.draw();
        this.#spHome.draw();
        this.#spRestart.draw();
        break;
      case EGameStatus.gameOver:
        this.#spMenuBoard.draw();
        break;
      case EGameStatus.playing:
       
        break;
    }
  } // end of draw         
  
  #onMouseMove = (aEvent) => {
    const pos = this.#spcvs.getMousePos(aEvent);
    if (this.#spStart.shape.isPositionInside(pos)) {
      this.#spcvs.canvas.style.cursor = "pointer";
      this.#activeSprite = this.#spStart;
    } else {
      this.#spcvs.canvas.style.cursor = "default";
      this.#activeSprite = null;
    }
  };
  
  #onClick = () => {
    if (this.#activeSprite === this.#spStart) {
      console.log("Start-knappen ble klikket, spillet starter nå.");
      // Direkte start av spillet
      startGame();
    }
  };
  
 

   // Metode for å starte blinkingen ved å oppdatere sprite-index
   startBlinking() {
    // Unngå å starte flere blink-intervaller
    if (!this.#blinkInterval) {
      this.#blinkInterval = setInterval(() => {
        this.#blinkFrame = (this.#blinkFrame + 1) % 5; // Loop gjennom 0,1,2,3,4
        this.#spStart.index = this.#blinkFrame;
      }, 100); // Endret intervallet til 5000 ms for saktere blinking
    }
  }

  // Stopper blinkingen
  stopBlinking() {
    if (this.#blinkInterval) {
      clearInterval(this.#blinkInterval);
      this.#blinkInterval = null;
      // Etter stopp, sett knappen til en bestemt frame, f.eks. 0
      this.#spStart.index = 0;
    }
  }
}


  
  /*unction animateSprite(){
  spriteCanvas.clearCanvas();
  spriteCanvas.drawSprite(spi, 100, 100, spIndex);
  spIndex++;
  if(spIndex >= spi.count){
    spIndex = 0;
  }
}
  */
