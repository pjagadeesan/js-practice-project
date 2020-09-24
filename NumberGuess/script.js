const elements = {
  inputGuess: document.querySelector(".guessField"),
  submitGuess: document.querySelector(".guessSubmit"),
  prevGuesses: document.querySelector(".guesses"),
  remGuess: document.querySelector(".lastResult"),
  result: document.querySelector(".message"),
  resultDiv : document.querySelector('.resultParas'),
  newGameBtn: document.getElementById('newGame')
};

const guess = {
  curGuess: 0,
  remainingGuess: 10,
  prevGuesses: [],
};

const validateInput = () => {
  let isValid = true;
  guess.curGuess = parseInt(elements.inputGuess.value);

  if (isNaN(guess.curGuess)) {
    isValid = false;
    alert("Please enter a valid number!");
  } else if (guess.curGuess <= 0 || guess.curGuess > 100) {
    isValid = false;
    alert("Please enter a number between 1 and 100");
  } else if (guess.remainingGuess < 1) {
    isValid = false;
    elements.result.innerHTML = `<h1> Sorry, You lost! The number was ${guess.randomNum} </h1>`;
    addNewGameBtn();
  }
  return isValid;
};

const updateUI = () => {
    elements.prevGuesses.innerHTML = guess.prevGuesses;
    elements.remGuess.innerHTML = guess.remainingGuess;
};

const addNewGameBtn = () => {
    elements.inputGuess.value = "";
    elements.inputGuess.disabled = true;
    elements.submitGuess.disabled = true;
    elements.newGameBtn.style.visibility = 'visible';
};

const newGame = () => {
    //reset guess object
    guess.randomNum = parseInt(Math.random() * 100 + 1);
    guess.curGuess = 0;
    guess.prevGuesses = [];
    guess.remainingGuess = 10;
    //reset UI elements
    elements.inputGuess.disabled = false;
    elements.submitGuess.disabled = false;
    elements.newGameBtn.style.visibility = 'hidden';
    elements.prevGuesses.innerHTML = '';
    elements.remGuess.innerHTML = guess.remainingGuess; 
    elements.result.innerHTML = ''; 
};

const checkGuess = () => {
    if(guess.curGuess === guess.randomNum){
        elements.result.innerHTML = `<h1> You guessed correctly! </h1>`;
        addNewGameBtn();
    } else if(guess.curGuess < guess.randomNum){
        elements.result.innerHTML = `<h1> Too low! Try again! </h1>`;
    } else if(guess.curGuess > guess.randomNum){
        elements.result.innerHTML = `<h1> Too high! Try again! </h1>`;
    }
};

const guessGame = (e) => {
  e.preventDefault();
  //validate input and remaning guesses
  if (validateInput()) {
    //clear input field
    elements.inputGuess.value = "";
    //update remaining guesses and  push prev guess to guess obj
    guess.remainingGuess--;
    guess.prevGuesses.push(guess.curGuess);
    console.log(guess);
    //update UI
    updateUI();
    //checkGuess and update result
    checkGuess();
  }
};

guess.randomNum = parseInt(Math.random() * 100 + 1);

elements.submitGuess.addEventListener("click", guessGame);
document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
        guessGame(event);
    }
  });

elements.newGameBtn.addEventListener('click', newGame);
