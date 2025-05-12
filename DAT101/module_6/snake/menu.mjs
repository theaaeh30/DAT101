"use strict";

import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { EGameStatus, GameProps, SheetData } from "./game.mjs";

export class TMenu {
  #spMenuBoard;
  #spcvs;
  #spPlay;
  #spPause;
  #buttonHome;
  #buttonRestart;
  #spResume;
  #playTrigger = null;
  #homeTrigger = null;
  #restartTrigger = null;
  #resumeTrigger = null;
  #totalScoreNumber;
  #timeScoreNumber;
  #gameOverScoreNumber;
  #currentCountdown = false;

  constructor(aSpriteCanvas) {
    this.#spcvs = aSpriteCanvas;

    // Sett spillstatus til Idle
    GameProps.gameStatus = EGameStatus.Idle;

    // Play-knapp
    const playPos = new lib2D.TPosition(350, 220);
    this.#spPlay = new libSprite.TSpriteButton(aSpriteCanvas, SheetData.Play, playPos);
    this.#spPlay.animateSpeed = 15; // Start blinkingen
    this.#spPlay.onClick = () => {
      if (this.#playTrigger) this.#playTrigger();
      console.log("Play-knappen ble trykket");
    };

    // Resume-knapp
    const resumePos = new lib2D.TPosition(350, 220);
    this.#spResume = new libSprite.TSpriteButton(aSpriteCanvas, SheetData.Resume, resumePos);
    this.#spResume.animateSpeed = 15; // Start blinkingen
    this.#spResume.onClick = () => {
      if (this.#resumeTrigger) this.#resumeTrigger();
      console.log("Resume-knappen ble trykket");
    };

    // Menybrett
    const menuBoardPos = new lib2D.TPosition(25, 50);
    this.#spMenuBoard = new libSprite.TSprite(aSpriteCanvas, SheetData.GameOver, menuBoardPos);

    // Hjem-knapp
    const homePos = new lib2D.TPoint(90, 400);
    const homeShapeSize = { width: 169, height: 167 };
    this.#buttonHome = new libSprite.TSpriteButton(aSpriteCanvas, SheetData.Home, homePos);
    this.#buttonHome.shape.width = homeShapeSize.width;
    this.#buttonHome.shape.height = homeShapeSize.height;
    this.#buttonHome.onClick = () => {
      if (this.#homeTrigger) this.#homeTrigger();
      console.log("Hjem-knappen ble trykket");
    };

    // Restart-knapp
    const restartPos = new lib2D.TPoint(640, 400);
    const restartShapeSize = { width: 169, height: 167 };
    this.#buttonRestart = new libSprite.TSpriteButton(aSpriteCanvas, SheetData.Retry, restartPos);
    this.#buttonRestart.shape.width = restartShapeSize.width;
    this.#buttonRestart.shape.height = restartShapeSize.height;
    this.#buttonRestart.onClick = () => {
      if (this.#restartTrigger) this.#restartTrigger();
      console.log("Restart-knappen ble trykket");
    };

    // Total poengsum
    const totalScorePos = new lib2D.TPoint(10, 80);
    this.#totalScoreNumber = new libSprite.TSpriteNumber(aSpriteCanvas, SheetData.Number, totalScorePos);
    this.#totalScoreNumber.scale = 0.9;
    this.#totalScoreNumber.visible = true;
    this.#totalScoreNumber.value = 0;

    // Tidspoeng
    const timeScorePos = new lib2D.TPoint(14, 10);
    this.#timeScoreNumber = new libSprite.TSpriteNumber(aSpriteCanvas, SheetData.Number, timeScorePos);
    this.#timeScoreNumber.scale = 0.6;
    this.#timeScoreNumber.visible = true;
    this.#timeScoreNumber.value = 0;

    // Poengsum for Game Over
    const gameOverScorePos = new lib2D.TPoint(530, 240); // Juster x til 530 og y til 240 for korrekt plassering
    this.#gameOverScoreNumber = new libSprite.TSpriteNumber(aSpriteCanvas, SheetData.Number, gameOverScorePos);
    this.#gameOverScoreNumber.scale = 0.9; // Juster skalaen hvis nødvendig
    this.#gameOverScoreNumber.visible = false;
  }

  draw() {
    switch (GameProps.gameStatus) {
      case EGameStatus.Idle:
        this.#buttonHome.visible = false;
        this.#buttonRestart.visible = false;
        this.#spResume.visible = false;
        this.#spPlay.visible = true;
        this.#spPlay.draw();
        break;
      case EGameStatus.Playing:
        this.#spPlay.visible = false;
        this.#spResume.visible = false;
        this.#totalScoreNumber.visible = true;
        this.#totalScoreNumber.draw();
        this.#timeScoreNumber.visible = true;
        this.#timeScoreNumber.draw();
        break;
      case EGameStatus.Pause:
        this.#spPlay.visible = false;
        this.#spResume.visible = true;
        this.#spResume.draw();
        this.#totalScoreNumber.visible = true;
        this.#totalScoreNumber.draw();
        this.#timeScoreNumber.visible = true;
        this.#timeScoreNumber.draw();
        break;
      case EGameStatus.GameOver:
        this.#spPlay.visible = false;
        this.#spResume.visible = false;
        this.#spMenuBoard.draw();
        this.#buttonHome.draw();
        this.#buttonHome.visible = true;
        this.#buttonRestart.visible = true;
        this.#buttonRestart.draw();

        this.#gameOverScoreNumber.value = GameProps.totalScore;
        this.#gameOverScoreNumber.visible = true;
        this.#gameOverScoreNumber.draw();
        break;
    }
  }

  showMenu() {
    // Oppdater synligheten til menykomponenter basert på spillstatus
    switch (GameProps.gameStatus) {
      case EGameStatus.Idle:
        this.#spPlay.visible = true;
        this.#spResume.visible = false;
        this.#buttonHome.visible = false;
        this.#buttonRestart.visible = false;
        break;
      case EGameStatus.Playing:
        this.#spPlay.visible = false;
        this.#spResume.visible = false;
        this.#buttonHome.visible = false;
        this.#buttonRestart.visible = false;
        break;
      case EGameStatus.Pause:
        this.#spPlay.visible = false;
        this.#spResume.visible = true;
        this.#buttonHome.visible = false;
        this.#buttonRestart.visible = false;
        break;
      case EGameStatus.GameOver:
        this.#spPlay.visible = false;
        this.#spResume.visible = false;
        this.#buttonHome.visible = true;
        this.#buttonRestart.visible = true;
        break;
    }
  }

  setPlayTrigger(callBack) {
    this.#playTrigger = callBack;
  }

  setHomeTrigger(callBack) {
    this.#homeTrigger = callBack;
  }

  setRestartTrigger(callBack) {
    this.#restartTrigger = callBack;
  }

  setResumeTrigger(callBack) {
    this.#resumeTrigger = callBack;
  }

  updateTotalScore(value) {
    console.log("Oppdaterer total poengsum til:", value);
    this.#totalScoreNumber.value = value; // Oppdater poengsummen som vises
  }

  updateAppleCount(count) {
    console.log("Oppdaterer antall epler til:", count);
    this.#timeScoreNumber.scale = 0.6; // Gjør tallene mindre
    this.#timeScoreNumber.spacing = 10; // Øk mellomrommet mellom tallene
    this.#timeScoreNumber.value = count; // Oppdater antall epler som vises
  }

  reduceTotalScore() {
    if (this.#totalScoreNumber.value > 1) {
      this.#totalScoreNumber.value--;
      console.log("Reduserer total poengsum");
    }
  }

  startBaitCountdown() {
    this.#timeScoreNumber.value = 20;
    if (this.#currentCountdown) return;

    this.#currentCountdown = true;
    let lastTick = Date.now();

    const countdown = () => {
      const now = Date.now();
      const elapsed = now - lastTick;

      /* if (elapsed >= 1000) {
          lastTick = now;
          if (this.#timeScoreNumber.value > 0) {
            this.#timeScoreNumber.value--;
          }
        } */

      if (this.#timeScoreNumber.value > 0 && GameProps.gameStatus === EGameStatus.Playing) {
        requestAnimationFrame(countdown);
      } else {
        this.#currentCountdown = false;
      }
    };

    requestAnimationFrame(countdown);
  }

  updateTimeScore(score) {
    this.#timeScoreNumber.value += score;
  }

  addRemainingSeconds() {
    return this.#timeScoreNumber.value;
  }

  showGameOverScore(score) {
    // Plassering for scoren på "Game Over"-skjermen
    const scorePos = new lib2D.TPoint(400, 300); // Juster posisjonen etter behov
    const scoreDisplay = new libSprite.TSpriteNumber(this.#spcvs, SheetData.Number, scorePos);
    scoreDisplay.scale = 1.5; // Gjør scoren større for bedre synlighet
    scoreDisplay.value = score; // Sett scoren
    scoreDisplay.draw(); // Tegn scoren på skjermen
  }
}

export default TMenu;