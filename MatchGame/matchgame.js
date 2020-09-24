/* Instructions:
   You will create a matching game that uses DOM elements and event listeners. You will need to write a script that listens for certain keystrokes and reveals an animal when the coordinating key is pressed. If two of the same animal cards are revealed you should alert the winner and reset the game. The HTML and CSS have been provided for you. You will only need to write the javascript portion. */

document.querySelector(".key").addEventListener("click", function () {
  console.log("key pressed");
  document.querySelector(".word").style.display = "block";
  return;
});
