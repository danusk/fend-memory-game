/*
 * Create a list that holds all of your cards
 */
let deck = document.querySelector('.deck');
let cards = [...deck.getElementsByClassName('card')];

// declare & initialize global variables
let movesCount = document.querySelector('.moves');
let restart = document.querySelector('.restart');
restart.addEventListener('click', restartGame);
let openCards = [];
let moves = 0;
let matches = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function displayCards() {
    // shuffle card list
    cards = shuffle(cards);

    // clear deck
    deck.innerHTML = "";

    // add shuffled cards to deck
    cards.forEach(function(card) {
        card.classList.remove('open', 'show', 'match');
        deck.appendChild(card);
        card.addEventListener('click', onClick);
    });

    return;
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
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function checkMatch() {
    // check if current card matches last added open card
    // if they match, add match class
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        matches++;
        openCards[0].classList.add('match');
        openCards[1].classList.add('match');
        openCards = [];
    } else {
        // if they don't match, remove show and open classes
        setTimeout(function() {
            openCards[0].classList.remove('show', 'open');
            openCards[1].classList.remove('show', 'open');
            openCards = [];
        }, 500);
    }
}

function onClick() {
    event.target.classList.add('show', 'open');
    openCards.push(event.target);
    if (openCards.length === 2) {
        moves++;
        movesCount.innerHTML = moves;
        checkMatch();
    }

    checkWin();
}

function checkWin() {
    // TODO: Make this a modal instead of an alert and add
    // star rating
    if (matches === 8) {
        alert("You have won.");
    }
}

// TODO: Add a timer
// TODO: Add star rating thresholds

function restartGame() {
    // TODO: Restart timer & star rating
    displayCards();
}

function main() {
    displayCards();
}

main();
