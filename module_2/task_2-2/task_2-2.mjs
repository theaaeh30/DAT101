"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let test = 2+(3*(2-4))*6
printOut(test.toString());
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Konverter 25 m og 34 cm til inches ");
const antallMeter = 25;
const antallCM = 34;
let meterInMillimeter = antallMeter * 1000;
printOut("Meter i mm " + meterInMillimeter );
let CMinMillimeter = antallCM * 10;
printOut("CM i mm "+ CMinMillimeter);
let antallMM = meterInMillimeter + CMinMillimeter;
printOut("Total antall MM " + antallMM);
let MMtoinches = antallMM / 25.4;
printOut("Antall Inches " + MMtoinches.toFixed(2))
printOut(newLine);


printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Convert 3 days, 12 hours, 14 minutes, and 45 seconds to minutes*/

/*
Først må vi finne antall dager det er i disse minuttene
3 * 24 * 60 = 4320 

*/


const secondsInMinute = 60;
const minutesInHour = 60; 
const hoursInDay = 24;
const minutter_totalt= (3 * hoursInDay * minutesInHour) + (12 * minutesInHour) + (14) + (45 / secondsInMinute);
printOut("minutter_totalt= " + minutter_totalt.toString());
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Convert 6,322.52 minutes to days, hours, minutes, and seconds.*/
const numberOfMinutes = 6322.52;
let part4_Calc = numberOfMinutes / (60 * 24);
const part4_days = Math.floor(part4_Calc);
printOut("Days= " + part4_days);

part4_Calc = part4_Calc - part4_days;
part4_Calc = part4_Calc * hoursInDay;
const part4_Hours = Math.floor(part4_Calc);
printOut("Hours = " + part4_Hours);

part4_Calc = part4_Calc - part4_Hours;
part4_Calc = part4_Calc * minutesInHour;
const part4_minutes = Math.floor (part4_Calc);
printOut("Minutes = " + part4_minutes);

part4_Calc = part4_Calc - part4_minutes;
part4_Calc = part4_Calc * secondsInMinute;
const part4_Seconds = Math.floor(part4_Calc);
printOut("Seconds = " + part4_Seconds);

printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Convert 54 dollars to Norwegian kroner, and print the price for both:
NOK to USD and USD to nok.
Use 76 NOK = 8.6 USD as the exchange rate.
The answer must be in whole "kroner" and whole "dollars"
*/

const NOK = 76 / 8.6;
const USD = 8.6 / 76;
let amountUSD = 54;
const amountNOK = Math.round(amountUSD * NOK);
printOut(amountUSD + " dollars is " + amountNOK + " kroner ");
amountUSD = amountNOK * USD;
amountUSD = amountUSD.toFixed();
printOut(amountNOK + " kroner is " + amountUSD + " dollars ");
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/


const tekst= "There is much between heaven and earth that we do not understand"

printOut(tekst.length.toString()+" bokstaver er i hele teksten");

let letter = tekst.charAt(19);
printOut(letter.toString()+" er bokstaven på plass 19");

let letternr2= tekst.slice(35, 44);
printOut(letternr2.toString()+": er bokstavene som starter fra plass 35 og 8 bokstaver utover. ");

let letter3 = tekst.indexOf("earth");
printOut(letter3.toString()+ ": er plassen ordet Earth står i setningen." )
printOut(newLine);



printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

printOut("5 > 3 = " + (5 > 3));

printOut("7 >= 7 " + (7 >= 7));

printOut("\"a\" > \"b\" = " + ("a" > "b"));

printOut(" 1 < \"a\" = " + (1 < "a"));

printOut("\"2500\" < \"abcd\" = " + ("2500" < "abcd"));

printOut("\"arne\" !== \"thomas\" = "+ ("arne" !== "thomas"));

printOut("2 === 5 = " + (2 === 5));

printOut("\"abcd\"  > \"bcd\" =  "+ ("abcd" > "bcd"));
printOut(newLine);



printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

let num1= "254";
parseInt(num1);
printOut(num1);

let num2= "52,23";
parseInt(num2);
printOut(num2);

let num3= "25 kroner";
parseFloat(num3);
printOut(num3);


printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

let r= Math.floor ((Math.random()* 360) + 1);

printOut("This is a randomly generated number between 1 to 360: " + r.toString());

printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");

const Days= 131;
let weeks= Days / 7;
weeks= Math.floor (weeks);
//printOut(weeks.toString());

let dag= Days % 7;
//printOut(dag.toString());

printOut(" There are "+ weeks.toString()+ " weeks and " + dag.toString() + " days ");
