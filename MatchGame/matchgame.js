/* Instructions:
   You will create a matching game that uses DOM elements and event listeners. You will need to write a script that listens for certain keystrokes and reveals an animal when the coordinating key is pressed. If two of the same animal cards are revealed you should alert the winner and reset the game. The HTML and CSS have been provided for you. You will only need to write the javascript portion. */

var cards = document.querySelectorAll(".card");
var previousAnimal,
  count = 0;

cards.forEach(function (card) {
  card.addEventListener("click", function () {
    //reset when 2 cards are revealed
    if (count === 2) {
      resetGame();
      count = 0;
    }
    var animalCard = this.querySelector(".word");
    animalCard.style.display = "block";
    //check if prev card equals current card
    if (animalCard.textContent === previousAnimal) {
      setTimeout(function () {
        alert("Winner!!!!");
        resetGame();
      }, 10);
    }
    //make clicked card as previous card
    previousAnimal = animalCard.textContent;
    count++;
  });
});

document.getElementById("resetBtn").addEventListener("click", resetGame);
document.getElementById("newBtn").addEventListener("click", resetGame);

function resetGame() {
  previousAnimal = 0;
  var animals = document.querySelectorAll(".word");
  animals.forEach((animal) => {
    animal.style.display = "none";
  });
}
