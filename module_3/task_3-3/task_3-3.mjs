"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

function printNorwegianDate() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    printOut(today.toLocaleDateString('no-NB', options));
}

printNorwegianDate();

printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function getTodayDateInNorwegian() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('no-NB', options);
    printOut(` Dagens dato: ${formattedDate}`);
    return today;
}

function daysUntil2XKORelease() {
    const releaseDate = new Date('2025-05-14');
    const today = getTodayDateInNorwegian();

    const diffInTime = releaseDate - today;
    const daysLeft = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

    if (daysLeft > 0) {
        printOut(` Kun ${daysLeft} dager igjen til 2XKO-slippet! Gjør deg klar for kampene! `);
    } else if (daysLeft === 0) {
        PrintOut(` I DAG er den store dagen! 2XKO lanseres nå! La kampene begynne! `);
    } else {
        printOut(` 2XKO ble lansert for ${Math.abs(daysLeft)} dager siden. Har du allerede kjempet?`);
    }
}

daysUntil2XKORelease();



printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function circelProperties (radius){
    const diameter = 2 * radius;
    const circumference = 2 * Math.PI * radius;
    const area = Math.PI * Math.pow (radius, 2);

    printOut ("Diameter: "+ diameter);
    printOut ("Circumference: " + circumference.toFixed(2));
    printOut ("Area: " + area.toFixed(2));

}
circelProperties(5);


printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function calculateRectangleProperties(rectangle){
    const width= rectangle.width;
    const height= rectangle.height;

    const circumference = 2 * (width + " height " + height);
    const area = width * height;

    printOut ( "width " + width + " height " + height);

    printOut ("circumference " + circumference.toFixed(2));
    printOut (" Arena: " + area.toFixed(2));

}
const rectangle = { width: 4, height: 3 };
calculateRectangleProperties(rectangle);



printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

function convertTemperature (value, type) {
    let celsius, fahrenheit, kelvin;

    if (type.toLowerCase() === "celsius") {
        celsius = value;
        fahrenheit= Math.round((celsius * 9/ 5)+ 32);
        kelvin= Math.round(celsius + 273.15);
    
    } else if (type.toLowerCase() === "fahrenheit") {
        fahrenheit = value;
        celsius = Math.round((fahrenheit - 32) * 5/9);
        kelvin = Math.round(celsius + 273.15);
    
    }  else if (type.toLowerCase() === "kelvin") {
        kelvin= value;
        celsius = Math.round(kelvin - 273.15);
        fahrenheit= Math.floor((celsius * 9 / 5)+ 32);
    } 
    
    printOut( "Convert " + value + " " + type);
    printOut ("Celsius = " + celsius);
    printOut("fahrenheit = " + fahrenheit);
    printOut ("kelvin = " + kelvin);   

   printOut("");
}
  

convertTemperature(47,"Celsius");
convertTemperature(100 ,"Fahrenheit");
convertTemperature(300 ,"Kelvin");




printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

function calculateNetPrice(gross, vatGroup){

    const vatRates ={

        normal: 25,
        food: 15,
        hotel: 10,
        transport: 10,
        cinema: 10
        
};

vatGroup = vatGroup.toLowerCase();

if (vatGroup in vatRates){
    const vat = vatRates[vatGroup];
    const netPrice = (100 * gross) / (vat + 100);
    return netPrice.toFixed(2);

} else {
    /*printOut("Unknown VAT group!");*/
    return NaN;
    }

}
let netPrice;

netPrice= calculateNetPrice(100, "normal");
printOut (" 100 is "+ netPrice +" without tax");

netPrice = calculateNetPrice (150, "food");
printOut (" 150 is " + netPrice + " without tax");

netPrice = calculateNetPrice(50, "hotel");
printOut (" 50 is " + netPrice + " without tax");

netPrice= calculateNetPrice(100, "textile");
if (isNaN(netPrice)){
    printOut(" Textile is unknown tax-group");

}


printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

function calculate(speed, distance, time) {
    let missingCount= 0;

    if (speed === undefined) {
        missingCount++;
    }
    if (distance === undefined) {
        missingCount++;
    }
    if (time === undefined || isNaN(Number(time))) {
        missingCount++;
    }
    if (missingCount > 1) {
        return {speed: undefined, distance: undefined, time: NaN };
    }
    if (typeof time === "string") {
        time = Number(time);
    }
    if (speed === undefined && distance !== undefined && time !== undefined){
        speed = distance / time;

    }else if (distance === undefined && speed !== undefined && time !== undefined){
        distance = speed * time;

    }else if (time === undefined && speed !== undefined && distance !== undefined){
        time= distance / speed;

        
        }
        return {speed, distance, time};

    }
    let result1 = calculate(75,120,2);
    printOut("Speed = " + result1.speed + "km/h");
    printOut("Distance = " + result1.distance + " km");
    printOut("Time = " + result1.time.toFixed(2) + " h");

    printOut("")

    let result2 = calculate(75,120,2);
    printOut("Speed = " + result2.speed + "km/h");
    printOut("Distance = " + result2.distance + " km");
    printOut("Time = " + result2.time.toFixed(2) + " h");

    printOut("")

    let result3 = calculate(undefined, 50, undefined);
    printOut("Speed = " + result3.speed + " km/h");
    printOut("Distance = " + (result3.distance !== undefined ? result3.distance : " 50 ") + " km ");

    if (isNaN(result3.time)){
        printOut(" Time = Nan h");
    } else{
        printOut("Time = " + result3.time.toFixed(2) + " h");
    }


printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

function adjustText(text, maxSize, char, insertBefore){
    while (text.length < maxSize){
        if (insertBefore){
            text=char+text;
        } else {
            text=text + char;
        }
    }
    return text.slice(0,maxSize);

}

let tekst = "This is a text";
let maxLengde = 560;
let tegn = "&nbsp;";
let leggtilforan = false;

let venstrejustert = adjustText(tekst,maxLengde,tegn,leggtilforan);
printOut("« " + venstrejustert + " » " );

let høyrejustert = adjustText(tekst, maxLengde, tegn, true);
printOut("« " + høyrejustert + " »" );



printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function printMathExpressions(lines){
    let currentNumber = 1;

    let totalLength = 100;

    for(let i= 1; i <= lines; i++){
        let leftNumbers = [];
        let rightNumbers = [];

        for (let j=0; j< i + 1; j++){
            leftNumbers.push(currentNumber);
            currentNumber++;
        }

        for (let j=0; j < i; j++){
            rightNumbers.push(currentNumber);
            currentNumber++;
        }

        let leftString = leftNumbers.join(" ");
        let rightString = rightNumbers.join(" ");

        const equalSignPosition = Math.floor(totalLength / 2);

        let leftPadded = leftString.padEnd(equalSignPosition - 2, " ");
        let rightPadded = rightString.padStart(totalLength - equalSignPosition - 2, " ");

        let resultString = leftPadded + "= " + rightPadded;
        printOut(resultString.replace(/ /g, "\u00A0"))


    }
    printOut(" Mathematics is fun! ")
}
printMathExpressions(7);


/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function factorial(n){
    if (n === 0 || n=== 1){
        return 1;
    } else{
        return n * factorial(n - 1);

    }
}
let number = 9;
let result = factorial(number);
printOut("Factorial (" + number + ") is " + result);


