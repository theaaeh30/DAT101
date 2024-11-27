"use strict";

const CarTypes = [
  { value: 1, caption: "Aston Martin" },
  { value: 2, caption: "Bentley" },
  { value: 3, caption: "Alfa Romeo" },
  { value: 4, caption: "Ferrari" },
  { value: 5, caption: "Subaru" },
  { value: 6, caption: "Porsche" },
  { value: 7, caption: "Tesla" },
  { value: 8, caption: "Toyota" },
  { value: 9, caption: "Renault" },
  { value: 10, caption: "Peugeot" },
  { value: 11, caption: "Suzuki" },
  { value: 12, caption: "Mitsubishi" },
  { value: 13, caption: "Nissan" },
];

const GirlsNames = ["Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid", "Bjørg", "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth", "Kristin"];

const MovieGenre = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Superhero",
  "Thriller",
  "War",
  "Western",
];

document.getElementById("cmbTask1Calculate").addEventListener("click", cmbTask1CalculateClick);

function cmbTask1CalculateClick() {

    const widthInput = document.getElementById("txtRectWidth");
    const heightInput = document.getElementById("txtRectHeight");
    const outputElement = document.getElementById("txtTask1Output");

    const width = parseFloat(widthInput.value);
    const height = parseFloat(heightInput.value);

    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
        outputElement.textContent = "Please enter valid positive numbers for width and height.";
        return;
    }

    const perimeter = 2 * (width + height);
    const area = width * height;

    outputElement.textContent = `Circumference = ${perimeter}, Area = ${area}`;
}

//--- Part 2 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

const task2Words = [];

document.getElementById("txtTask2Word").addEventListener("keypress", txtTask2WordKeyPress);

function txtTask2WordKeyPress(event) {
    
    if (event.key === "Enter") {
        event.preventDefault();

        const wordInput = document.getElementById("txtTask2Word");
        const outputElement = document.getElementById("txtTask2Output");

        const word = wordInput.value.trim();

        if (word) {
            task2Words.push(word);
        }

        outputElement.textContent = `Number of words = ${task2Words.length}: ${task2Words.join(", ")}`;

        wordInput.value = "";
    }
}

//--- Part 3 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

document.getElementById("cmbTask3CheckAnswer").addEventListener("click", cmbTask3CheckAnswerClick);

function cmbTask3CheckAnswerClick() {
    const checkboxes = document.querySelectorAll("input[name='chkTask3']:checked");
    const outputElement = document.getElementById("txtTask3Output");

    const selectedValues = Array.from(checkboxes).map((checkbox) => checkbox.value);

    if (selectedValues.length > 0) {
        outputElement.textContent = `Selected values: ${selectedValues.join(", ")}`;
    } else {
        outputElement.textContent = "No checkboxes selected.";
    }
}

//--- Part 4 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

const divTask4Cars = document.getElementById("divTask4Cars");
const txtTask4Output = document.getElementById("txtTask4Output");

for (const car of CarTypes) {
  const label = document.createElement("label");
  const radioButton = document.createElement("input");
  
  radioButton.type = "radio";
  radioButton.name = "car";
  radioButton.value = car.caption;
  
  label.textContent = car.caption;
  label.prepend(radioButton);

  radioButton.addEventListener("change", () => {
    txtTask4Output.textContent = `You selected: ${car.caption}`;
  });

  divTask4Cars.appendChild(label);
  divTask4Cars.appendChild(document.createElement("br"));
}


//--- Part 5 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

  const selectTask5Animals = document.getElementById("selectTask5Animals");
  const txtTask5Output = document.getElementById("txtTask5Output");

  selectTask5Animals.addEventListener("change", () => {
    const selectedAnimal = selectTask5Animals.options[selectTask5Animals.selectedIndex].text;
    txtTask5Output.textContent = `You selected: ${selectedAnimal}`;
  });

//--- Part 6 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

const selectTask6Girls = document.getElementById("selectTask6Girls");
const txtTask6Output = document.getElementById("txtTask6Output");

for (const name of GirlsNames) {
  const option = document.createElement("option");
  option.value = name;
  option.textContent = name;
  selectTask6Girls.appendChild(option);
}

selectTask6Girls.addEventListener("change", () => {
  const selectedName = selectTask6Girls.value;
  txtTask6Output.textContent = `You selected: ${selectedName}`;
});

const initialSelectedName = selectTask6Girls.value;
txtTask6Output.textContent = `You selected: ${initialSelectedName}`;

//--- Part 7 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

document.addEventListener("DOMContentLoaded", function() {
  const genreSelect = document.getElementById('selectMovieGenre');
  
  MovieGenre.forEach(genre => {
    let option = document.createElement('option');
    option.value = genre;
    option.textContent = genre;
    genreSelect.appendChild(option);
  });

  document.getElementById('cmbAddMovie').addEventListener('click', function() {
    const movieTitle = document.getElementById('txtMovieTitle').value;
    const movieGenre = document.getElementById('selectMovieGenre').value;
    const movieDirector = document.getElementById('txtMovieDirector').value;
    const movieRate = document.getElementById('txtMovieRate').value;

    const table = document.getElementById('tblMovies');
    
    const row = table.insertRow(-1);
    
    const cellNr = row.insertCell(0);
    const cellTitle = row.insertCell(1);
    const cellGenre = row.insertCell(2);
    const cellDirector = row.insertCell(3);
    const cellRate = row.insertCell(4);
    
    const movieNr = table.rows.length - 1;
    
    cellNr.textContent = movieNr;
    cellTitle.textContent = movieTitle;
    cellGenre.textContent = movieGenre;
    cellDirector.textContent = movieDirector;
    cellRate.textContent = movieRate;
    
    document.getElementById('txtMovieTitle').value = '';
    document.getElementById('txtMovieDirector').value = '';
    document.getElementById('txtMovieRate').value = '5';
  });
});
