const gameContainer = document.getElementById("game");
const gameScore = document.getElementById('current-score');
// start screen
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');

// restart the game
const restartBtnDiv = document.querySelector('#restart-game')
const restartBtn = document.querySelector('#restart-game button')

// loading high score from the local storage
let recordInLocalStorage = localStorage.getItem('high-score') ? JSON.parse(localStorage.getItem('high-score')) : 0;
const recordHeading = document.querySelector('.record-heading');
let numScore = document.createElement('b')
numScore.textContent = recordInLocalStorage;
recordHeading.append(numScore);

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let initialScore = 0;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let firstCard = null;
let secondCard = null;
let noDoubleClick = false;
// TODO: Implement this function!
function handleCardClick(event) {
  // to prevent if two cards are processing, the third card can't be load
  if(noDoubleClick=== true){
    return
  }
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  const currentCard = event.target
  if(!firstCard){
    currentCard.style.backgroundColor = event.target.getAttribute('class');
    firstCard = currentCard;
  }
  // Make sure this works only if you click on two different cards — clicking the same card twice shouldn’t count as a match!)
  else if (firstCard === currentCard) {
    return;}
  else{
    noDoubleClick = true
    currentCard.style.backgroundColor = event.target.getAttribute('class');
    secondCard= currentCard;
    setTimeout(() => {
      if (firstCard.className === secondCard.className) {
        firstCard.removeEventListener("click", handleCardClick);
        secondCard.removeEventListener("click", handleCardClick);
        // adding points
        initialScore++;
        gameScore.innerText= initialScore;
        if(initialScore>recordInLocalStorage){
          numScore.textContent=initialScore
          localStorage.setItem('high-score', JSON.stringify(initialScore));}

        if(initialScore === COLORS.length/2){
          restartBtnDiv.style.display = 'block';
        }
      }
      else{
      firstCard.style.backgroundColor = "";
      secondCard.style.backgroundColor = "";}

      firstCard= null;
      secondCard = null;
      noDoubleClick = false
    }, 1000);    
    
  }
}

restartBtn.addEventListener('click', function(event){
  // reload the page
  window.location.reload();
})

// when the DOM loads
startButton.addEventListener("click", startGame);

function startGame() {
  startScreen.style.display = 'none';
  document.getElementById('actual-game').style.display = 'block';
  gameContainer.style.display = 'block';
  initialScore = 0;
  gameScore.innerText = initialScore;
  createDivsForColors(shuffledColors);
}

