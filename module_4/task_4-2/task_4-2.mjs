"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Create an array where you hard-code all the numbers from 1 to 20. Use a for loop to "run through" the
array and print all the elements in the array.
○ Hint: Look at the learning outcomes to find the solutions to the task.*/

// Create an array with numbers 1 to 20
let numbers = [
    1, 2, 3, 4, 5, 
    6, 7, 8, 9, 10, 
    11, 12, 13, 14, 15, 
    16, 17, 18, 19, 20
  ];
  
  // for loop to go through the array and print each element
  for (let i = 0; i < numbers.length; i++) {
    printOut(numbers[i].toString());
  }

printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/*Take the array from task 1 and use a built-in method found in the array object to print all the elements with
a custom defined character separating all the elements.
○ Hint: You should be able to do it with just one line of code*/

printOut(numbers.join(" - "));
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/*Create a constant that contains the text "Hei på deg, hvordan har du det?" (Hello there, how are you?)
Take this text and convert it into an array that contains all the words in the text, i.e., each element should
contain only one word from the text. Use a loop to traverse (run through) this array so that you can print
which word number, which index the word is at, and the word itself.*/

const greeting = "Hei på deg, hvordan har du det?";

// Split the text into an array of words
let wordsArray = greeting.split(' ');

// Use a for loop to traverse the array and print each word with its index
for (let i = 0; i < wordsArray.length; i++) {
    printOut(`Word number ${i + 1}, at index ${i}: ${wordsArray[i]}`);
  }

printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/*Create an array with these names: "Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid",
"Bjørg", "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth" and "Kristin".
Then create a function that will remove an element from an array. Let the function have two parameters.
Parameter number one is the array from which you will remove the element, parameter two is the text that
should be removed from the array. Check if the element exists in the array so that you can inform whether
the element exists or not in the array.*/

let nameListGirls = ["Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid",
"Bjørg", "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth", "Kristin"];


// Function to remove an element
function removeElement(array, element) {
    // Check if the element exists in the array
    if (array.includes(element)) {
      // Find the index of the element
      const index = array.indexOf(element);
      // Remove the element if it exists
      array.splice(index, 1);
      printOut(`"${element}" was removed from the array.`);
    } else {
      printOut(`"${element}" does not exist in the array.`);
    }
  }
  
  printOut ("Namelist Girls: " + nameListGirls.toString());
  
  // Example usage:
  removeElement(nameListGirls, "Marit");
  removeElement(nameListGirls, "Jonny");
  printOut("Updated namelist girls: " + nameListGirls);

printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Create a new array with these names: "Jakob", "Lucas", "Emil", "Oskar", "Oliver", "William", "Filip", "Noah",
"Elias", "Isak", "Henrik", "Aksel", "Kasper", "Mathias", "Jonas", "Tobias", "Liam", "Håkon", "Theodor"and
"Magnus" Merge the arrays with girl names and boy names into a new array with all the names.
○ Hint: You can solve this with two lines of code. Remember that an empty array also has
properties and methods*/

let nameListBoys = ["Jakob", "Lucas", "Emil", "Oskar", "Oliver", "William", "Filip", "Noah", "Elias", "Isak", 
    "Henrik", "Aksel", "Kasper", "Mathias", "Jonas", "Tobias", "Liam", "Håkon", "Theodor", "Magnus"];

let allNames = nameListBoys.concat(nameListGirls); // Merge arrays

printOut(allNames.toString());

printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Create a class named TBook.
Let the constructor fill in the three attributes (title, author, and ISBN number). Create a public function
"toString" in the class, it should return a text string that contains the three attributes of the class.
Create an array that contains three instances of the TBook class. Use a loop to print out the books that are
in the list.*/

class TBook {
    // Constructor to initialize the attributes
    constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
    }
  
    // toString function to return a formatted string with the book's details
    toString() {
      return `Title: ${this.title}, Author: ${this.author}, ISBN: ${this.isbn}`;
    }
  }
  
  // Create an array with 3 TBook instances
  const bookList = [
    new TBook("The Great Gatsby", "F. Scott Fitzgerald", "9780743273565"),
    new TBook("1984", "George Orwell", "9780451524935"),
    new TBook("To Kill a Mockingbird", "Harper Lee", "9780061120084")
  ];
  
  // Loop through the array and print out the book details using the toString method
  for (let i = 0; i < bookList.length; i++) {
    printout(bookList[i].toString());
  }
  
  // Implementing the printout function
  function printout(message) {
    printOut(message + "<br>");
  }

printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/*Create a static object. (see PDF)
You can replace the language in the "name" attributes with whatever you want.
Use this function: Object.keys(EWeekDays) to create an array with the "keys" that exist in the
EWeekDays object.
Create a loop that traverses this "key" array and prints all the elements that exist in the EWeekDays object
○ Hint: Use W3Schools as I have shown you, here you see good examples of exactly this!*/



const EWeekDays = {
    WeekDay1: {value: 0x01, name: "Mandag"},
    WeekDay2: {value: 0x02, name: "Tirsdag"},
    WeekDay3: {value: 0x04, name: "Onsdag"},
    WeekDay4: {value: 0x08, name: "Torsdag"},
    WeekDay5: {value: 0x10, name: "Fredag"},
    WeekDay6: {value: 0x20, name: "Lørdag"},
    WeekDay7: {value: 0x40, name: "Søndag"},
    Workdays: {value: 0x01 + 0x02 + 0x04 + 0x08 + 0x10, name: "Arbeidsdager"},
    Weekends: {value: 0x20 + 0x40, name: "Helg"}
};
const keys = Object.keys(EWeekDays);

const output = document.getElementById('output');

printOut("const EWeekDays = {");
keys.forEach((key, index) => {
    const item = EWeekDays[key];
    const formattedValue = `0x${item.value.toString(16).padStart(2, '0')}`; // Convert to hex
    printOut(`    ${key}: { value: ${formattedValue}, name: "${item.name}" }${index < keys.length - 1 ? ',' : ''}`);
});
printOut("};");

/*
keys.forEach(key => {
    const item = EWeekDays[key];
    printOut(`${key}: Value = ${item.value}, Name = ${item.name}`);
});
*/

printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Create an array that contains 35 random numbers from 1 to 20 (inclusive). Sort these arrays in ascending
and descending order. To get full credit for this task, it must be solved with "callback" functions that you
use in the .sort(...) method of this array.*/

// Generate an array with 35 random numbers from 1 to 20
const randomNumbers = Array.from({ length: 35 }, () => Math.floor(Math.random() * 20) + 1);

// original array
printOut("Original Array:" + randomNumbers);

// ascending order
const ascendingOrder = [...randomNumbers].sort((a, b) => a - b);
printOut("Sorted in Ascending Order:" + ascendingOrder);

// descending order
const descendingOrder = [...randomNumbers].sort((a, b) => b - a);
printOut("Sorted in Descending Order:" + descendingOrder);

printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Based on part 8, print out how many times the different numbers occur in the array. First, print the
numbers and their frequency, then print the frequencies and which numbers they correspond to. You must
print the most frequent ones first, and if there are multiple numbers where the frequency is the same, then
it should again be sorted from the smallest to the largest number.*/

function countFrequency(numbers) {
    const frequency = {};
    numbers.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
    });
    return frequency;
}
const frequencyCount = countFrequency(randomNumbers);

// Convert frequency object to an array of entries [number, frequency] for sorting
const sortedNumbersByFrequency = Object.entries(frequencyCount)
    .sort((a, b) => {
        // Sort by frequency descending, then by number ascending if frequencies are equal
        if (b[1] === a[1]) {
            return a[0] - b[0];
        }
        return b[1] - a[1];
    });

// Print the numbers and their frequency
printOut("Numbers and their frequency:");
sortedNumbersByFrequency.forEach(([number, frequency]) => {
    printOut(`Number ${number}: ${frequency} times`);
});

// Group numbers by frequency and sort by most frequent
const groupedByFrequency = {};
sortedNumbersByFrequency.forEach(([number, frequency]) => {
    if (!groupedByFrequency[frequency]) {
        groupedByFrequency[frequency] = [];
    }
    groupedByFrequency[frequency].push(number);
});
// Print the frequencies and corresponding numbers, sorted by most frequent
printOut("\nFrequencies and corresponding numbers (most frequent first):");
Object.entries(groupedByFrequency)
    .sort((a, b) => b[0] - a[0])  // Sort by frequency descending
    .forEach(([frequency, numbers]) => {
        const sortedNumbers = numbers.sort((a, b) => a - b); // Sort numbers in ascending order
        printOut(`Frequency ${frequency}: Numbers ${sortedNumbers.join(', ')}`);
});

printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/*Create an array that contains rows and columns (2 dimensions, 5x9). Start with an empty array. Use "for"
loops to create rows and columns, respectively. In each "cell," create a text that shows which row and
column the "cell" is in. Then create two new sets of "for" loops to print the array itself.
○ Hint: For each round in the loop for the rows, you create a column. And for each round in the
columns, you write the "cell" value.*/

// Step 1: Create a 5x9 2D array
const rows = 5;
const cols = 9;
const grid = [];

// Step 2: Populate the grid with "Row X, Col Y"
for (let i = 0; i < rows; i++) {
    const row = []; // Create a new row
    for (let j = 0; j < cols; j++) {
        row.push(`Row ${i + 1}, Col ${j + 1}`);
    }
    grid.push(row); // Add the populated row to the grid
}

// Step 3: Print the 2D array using nested loops
printOut("2D Array Content:");
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        printOut(grid[i][j]); // Print each cell
    }
}

// Step 4: Optionally, print the entire rows for clarity
printOut("\nFull 2D Array (Row by Row):");
for (let i = 0; i < rows; i++) {
    printOut(grid[i].join(' | ')); // Print each row as a single line
}

printOut(newLine);
