"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/*Use "for" loops to generate two lines on the HTML page. One should count from 1 to 10, and the other
// should count from 10 to 1. Use only two lines to print the rows*/

let r = "";

for (let i=1; i < 11; i++){
    r += i + ",";
}
printOut(r.toString());

let s = "";
for (let t= 10; t >= 1; t--){
    s += t + ",";
}
printOut(s.toString());



printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* *Create a program that can guess a number between 1 and 60. Declare a variable and assign it a value, for
example, 45. Let the computer "guess" by generating a random number. Use a "while" loop and the
"random" function. Keep the "while" loop running as long as the "guessed number" is incorrect. Print the
number once the "while" loop has completed. You do not need to print anything while the "while" loop is in
progress*/

const answerNumber = 45;
let guessNumber;
do {
    guessNumber = Math.ceil(Math.random() * 60 + 1);
}
while(answerNumber !== guessNumber);



printOut(" Tallet er = " + guessNumber.toString());
printOut("");


printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/*Take the program from part 2 and expand it to guess a number between 1 and one million. Print the
number of guesses as well as the number of milliseconds it took to guess the number. HINT: Use the
Date.now() function to measure time */

const targetNumber = 123456;
let guessedNumber;
let guessCount = 0;

const startTime = Date.now();

do{
    guessNumber = Math.floor(Math.random() * 1000000) + 1;
    guessCount++;
} while (guessNumber !== targetNumber);

const endTime = Date.now();
const timeTaken = endTime - startTime;

printOut(" Tallet er " + guessNumber);
printOut(" Datamaskinen brukte " + guessCount + " runder ");
printOut(" og det tok " + timeTaken + " millisek.");

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function isPrime(num){
    if (num < 2) return false;
    for (let i = 2; i<= Math.sqrt(num); i++){
        if(num % i === 0)return false;
    }
    return true;
}
const primesFor = [];
for (let i = 2; i < 200; i++){
    if (isPrime(i)){
        primesFor.push (i);
    }
}
printOut(" Primtall med for-løkke: " + primesFor);
printOut(newLine);

const primesWhile = [];
let i = 2;
while (i < 200){
    if (isPrime(i)){
        primesWhile.push(i);
    }
    i++;
}
printOut (" Primtall med while-løkke: " + primesWhile);


printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

for (let row = 1; row <= 7; row++){
    let linje = " ";
    for ( let col =1; col <= 9; col++){
        linje += " K" + col + "R" + row + "";

    }
    printOut(linje.trim());
}


printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function getGrade(points) {
    const percentage = (points / 236) * 100;
    
    if (percentage >= 89) return " A ";
    if (percentage >= 77) return " B ";
    if (percentage >= 65) return " C ";
    if (percentage >= 53) return " D ";
    if (percentage >= 41) return " E ";
    return " F ";
}

function SimulateSingleGrades(){
    let grades = "";

    const points = Math.floor(Math.random () * 236)+ 1;
    const percentage = (points / 236) * 100;
    const grade = getGrade (points);
    printOut (" Kandidaten fikk " + points + " Poeng som er " + percentage.toFixed(2) + " % og som gir karakter " + grade + " . ");
}

SimulateSingleGrades();
printOut("");


printOut("--- Part 7 ----------------------------------------------------------------------------------------------");

const d1 = Math.ceil(Math.random() * 6);
const d2 = Math.ceil(Math.random() * 6);
const d3 = Math.ceil(Math.random() * 6);
const d4 = Math.ceil(Math.random() * 6);
const d5 = Math.ceil(Math.random() * 6);
const d6 = Math.ceil(Math.random() * 6);

let diceThrow = "";
diceThrow = d1.toString() + ",";
diceThrow = d2.toString() + ",";
diceThrow = d3.toString() + ",";
diceThrow = d4.toString() + ",";
diceThrow = d5.toString() + ",";
diceThrow = d6.toString();

printOut("diceThrow: " + diceThrow);

const count1 = (diceThrow.match(/1/g) || "").length;
const count2 = (diceThrow.match(/2/g) || "").length;
const count3 = (diceThrow.match(/3/g) || "").length;
const count4 = (diceThrow.match(/4/g) || "").length;
const count5 = (diceThrow.match(/5/g) || "").length;
const count6 = (diceThrow.match(/6/g) || "").length;

let diceCount = "";
diceCount += d1.toString() + ",";
diceCount += d2.toString() + ",";
diceCount += d3.toString() + ",";
diceCount += d4.toString() + ",";
diceCount += d5.toString() + ",";
diceCount += d6.toString();
printOut ("Dicecount : " + diceCount)

const equals1 = (diceCount.match(/1/g) || "").length;
const equals6 = (diceCount.match(/6/g) || "").length;
printOut(" Full straight: " + equals6.toString());
printOut(" Yatzy: " + equals6.toString());


if(equals1 === 6){
 printOut("Full straight");
 
}else if(equals6 === 1){
 printOut(" Yatzy!!! ");

}

function rollDice() {
    return [
        Math.ceil(Math.random() * 6),
        Math.ceil(Math.random() * 6),
        Math.ceil(Math.random() * 6),
        Math.ceil(Math.random() * 6),
        Math.ceil(Math.random() * 6),
        Math.ceil(Math.random() * 6)
    ];
}

function countOccurrences(roll) {
    const counts = Array(7).fill(0);
    roll.forEach(num => counts[num]++);
    return counts;
}

function checkThreePairs(counts) {
    return counts.filter(count => count === 2).length === 3;
}

function checkFullHouse(counts) {
    return counts.includes(3) && counts.includes(2);
}

function checkTower(counts) {
    return counts.includes(4) && counts.includes(2);
}

function checkYahtzee(counts) {
    return counts.some(count => count === 6);
}

function simulateThreePairs() {
    let rolls = 0;
    let achieved = false;

    while (!achieved) {
        const rollResult = rollDice();
        const counts = countOccurrences(rollResult);
        rolls++;

        const diceThrow = rollResult.join(", ");
        const hasThreePairs = checkThreePairs(counts);
        
        if (hasThreePairs) {
            achieved = true;
            printOut(diceThrow);
            printOut("3 par "); 
            printOut( "På " + rolls + " kast!");
        }
    }
}



// Start the simulations
simulateThreePairs();


printOut("");
/* Put your code below here!*/
function simulateFullHouse() {
    let rolls = 0;
    let achieved = false;

    while (!achieved) {
        const rollResult = rollDice();
        const counts = countOccurrences(rollResult);
        rolls++;

        const diceThrow = rollResult.join(", ");
        const hasFullHouse = checkFullHouse(counts);
        
        if (hasFullHouse) {
            achieved = true;
            printOut(diceThrow);
            printOut(" Full straight ")
            printOut ("På " + rolls + " kast!");
        }
    }
}


simulateFullHouse();
printOut (" ");

function simulateTower(){
    let rolls = 0;
    let achieved = false;

    while (!achieved){ 
        const rollResult = rollDice();
        const counts = countOccurrences (rollResult);
        rolls++;

        const diceThrow = rollResult.join(",");
        const hasTower = checkTower(counts);

        if (hasTower){
            achieved = true;
            printOut (diceThrow);
            printOut ("Tårn")
            printOut( "På " + rolls + " kast!");
        }
    }
}
simulateTower();



printOut("");
/* Put your code below here!*/

function simulateYahtzee() {
    let rolls = 0;
    let achieved = false;

    while (!achieved) {
        const rollResult = rollDice();
        const counts = countOccurrences(rollResult);
        rolls++;

        const diceThrow = rollResult.join(", ");
        const hasYahtzee = checkYahtzee(counts);
        
        if (hasYahtzee) {
            achieved = true;
            printOut(diceThrow);
            printOut("Yatzy");
            printOut(" På " + rolls + " kast! "); 
        }
    }
}
simulateYahtzee();


/* Task 10*/
printOut("");


