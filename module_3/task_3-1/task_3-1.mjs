"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1, 2, 3 ----------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Task 1, 2 and 3");

let wakeUpTime = Math.ceil(Math.random() *9);
if (wakeUpTime==7) {
  printOut("I can take the bus to school.");
}
else if (wakeUpTime==8){
  printOut ("I will take the train to school");
}
else {
  printOut ("I will have to take the car to school.")
}

printOut(newLine);

printOut("--- Part 4, 5 --------------------------------------------------------------------------------------------");
let number= Math.floor(Math.random()* 8);

if (number>0){
  printOut ("Its positive");
} 

else if (number==0){
  printOut ("Zero is either positive or negative")
}
else {
  printOut("Its negative");
}

printOut(newLine);

printOut("--- Part 6,7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

let imagesize = Math.floor(Math.random() * 8) + 1;

printOut("task 6 image size is:" + imagesize.toString() + "MP");

if (imagesize>=6){
  printOut ("Image is to large");
}else if (imagesize<=3){

 printOut ("Image is to small");
}else {
  printOut ("Thank you!");
}
printOut(newLine);


printOut("--- Part 8,9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

const monthList= ["January", "February", "Mars", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const noOfMonth = monthList.length;
const monthName = monthList[Math.floor(Math.random()* noOfMonth)];


if (monthName.includes("r")){
 printOut("Month is =" + monthName);
 printOut("You must take vitamin D");
}else {
  printOut("Month  is = " + monthName);
  printOut("You do not need to take vitamin D");
}

if (monthName == "April" ||monthName=="June" ||monthName =="September" ||monthName =="November"){
  printOut("It is 30 days in " + monthName);
  
}else if (monthName == "February"){
  printOut ("It is 28 days in  " + monthName);

}else 
  printOut("It is 31 days in " + monthName);


/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");

if (monthName.includes("March")|| monthName.includes("May")){
  printOut ("The gallery is closed in " + monthName +" ,Sorry");
} else if (monthName.includes("April")){
  printOut ("The gallery is open, use the building next door");
} else {
  printOut ("The gallery is open in " + monthName + " Welcome! ");
}
