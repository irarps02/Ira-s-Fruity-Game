const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0; // Track number of matched pairs
const totalPairs = cards.length / 2;
const playAgainButton = document.getElementById('play-again');

function flipCard() {
    if (lockBoard) return; // Prevent clicking if the board is locked
    if (this === firstCard) return; // Prevent double-clicking the same card

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        hasFlippedCard = false;
        secondCard = this;

        checkForMatch();
    }
}

function checkForMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matchedPairs++;

    if (matchedPairs === totalPairs) {
        showPlayAgainButton();
    }
}

function unflipCards() {
    lockBoard = true; // Lock the board to prevent further clicks
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        lockBoard = false; // Unlock the board
    }, 1000);
}

function showPlayAgainButton() {
    playAgainButton.classList.remove('hidden'); // Show the "Play Again" button
}

function resetGame() {
    matchedPairs = 0;
    cards.forEach(card => {
        card.classList.remove('flipped');
        card.addEventListener('click', flipCard);
    });
    shuffleCards();
    playAgainButton.classList.add('hidden'); // Hide the "Play Again" button
}

// Shuffle the cards by reordering the elements
function shuffleCards() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
}

// Start the game by adding event listeners
cards.forEach(card => card.addEventListener('click', flipCard));
playAgainButton.addEventListener('click', resetGame);

shuffleCards(); // Shuffle cards on game start
