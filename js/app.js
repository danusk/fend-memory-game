/*
 * Create a list that holds all of your cards
 */
let deck = document.querySelector(".deck");
let cards = [...deck.getElementsByClassName("card")];
let openCards = [];

const restart = document.querySelector(".restart");
restart.addEventListener("click", restartGame);

const minutesDisplay = document.querySelector(".minutes");
const secondsDisplay = document.querySelector(".seconds");
const stars = document.querySelector(".stars");

let seconds = 0;
let minutes = 0;
let moves = 0;
let matches = 0;
let time = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card"s HTML to the page
 */
 function displayCards() {
    // shuffle card list
    cards = shuffle(cards);

    // clear deck
    deck.innerHTML = "";

    // add shuffled cards to deck
    cards.forEach(function(card) {
        card.classList.remove("open", "show", "match");
        deck.appendChild(card);
        card.addEventListener("click", function(event) {
            onClick(event);
    });
 });
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card"s symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card"s symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function checkMatch() {
    // check if current card matches last added open card
    // if they match, add match class
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        matches++;
        openCards[0].classList.add("match");
        openCards[1].classList.add("match");
        openCards = [];
    } else {
        // if they don't match, remove show and open classes
        setTimeout(function() {
            openCards[0].classList.remove("show", "open");
            openCards[1].classList.remove("show", "open");
            openCards = [];
        }, 600);
    }
}

function onClick(event) {
    // on click, open/show card
    // check match if there are 2 cards in openCards

    if (moves === 0) {
        startTimer();
    }

    // checks for double clicks
    if (!(event.target.classList.contains("open"))) {
        // fix for clicking on icon
        if (event.target.tagName === 'I') {
            return;
        }
        event.target.classList.add("show", "open");
        openCards.push(event.target);
    }

    if (openCards.length === 2) {
        const movesCount = document.querySelector(".moves");
        moves++;
        movesCount.innerHTML = moves;
        checkMatch();
    }

    checkWin();
    starRating();
}

function checkWin() {
    if (matches === 8) {
        const modal = document.querySelector(".modal");
        const finalTime = document.querySelector(".final-time");
        const finalScore = document.querySelector(".final-score");
        const close = document.querySelector(".close");
        const timer = document.querySelector(".timer");

        finalTime.innerHTML = `${minutesDisplay.innerHTML}:${secondsDisplay.innerHTML}`;
        timer.innerHTML = finalTime.innerHTML;
        finalScore.appendChild(stars);
        modal.style.display = "block";

        close.addEventListener("click", function() {
            modal.style.display = "none";
        });
    }
}

function setTimer() {
    seconds++;
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }

    minutesDisplay.innerHTML = padTimer(minutes);
    secondsDisplay.innerHTML = padTimer(seconds);
}

function padTimer(num) {
    // add leading zeroes to minutes and seconds on timer
    num += "";
    if (num.length < 2) {
        num = "0" + num;
    }
    return num;
}

function startTimer() {
    clearInterval(time);
    time = setInterval(setTimer, 1000);
}

function starRating() {
    if (moves === 24) {
        stars.removeChild(stars.childNodes[0]);
    }
    if (moves === 32) {
        stars.removeChild(stars.childNodes[0]);
    }
}

function restartGame() {
    displayCards();
}

restartGame();

