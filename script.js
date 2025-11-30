'use strict';

const name0El = document.getElementById('name--0');
const name1El = document.getElementById('name--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');

// Input fields for names (added selection for these)
const playerNameInput0 = document.getElementById('playerName0');
const playerNameInput1 = document.getElementById('playerName1');

//Buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnStart = document.querySelector('.btn--start');

let scores, currentScore, activePlayer, playing;

//Switching the player Functionality
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

const init = function (isNewGameBtn = false) {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');

    // **MODIFICATION:** Logic for New Game button click
    if (isNewGameBtn) {
        // Reset name display to default names
        name0El.textContent = 'Player 1';
        name1El.textContent = 'Player 2';

        // Clear input fields and show them again
        playerNameInput0.value = '';
        playerNameInput1.value = '';
        playerNameInput0.classList.remove('hidden');
        playerNameInput1.classList.remove('hidden');
        btnStart.classList.remove('hidden');

        // Hide game buttons until names are set and 'Start Game' is clicked
        btnRoll.classList.add('hidden');
        btnHold.classList.add('hidden');
    }
}

btnStart.addEventListener('click', function () {
    const playerName0 = playerNameInput0.value || 'Player 1';
    const playerName1 = playerNameInput1.value || 'Player 2';

    if(playerName0.toLowerCase() === playerName1.toLowerCase()){
        alert('Player names cannot be the same. Please choose unique names!');
        return;
    }

    name0El.textContent = playerName0;
    name1El.textContent = playerName1;

    playerNameInput0.classList.add('hidden');
    playerNameInput1.classList.add('hidden');
    btnStart.classList.add('hidden');

    //Show game buttons
    btnRoll.classList.remove('hidden');
    btnHold.classList.remove('hidden');

    // Reset game when names are set
    init();
});

//Rolling Dice Fuctionality
btnRoll.addEventListener('click', function () {
    if (playing) {

        //1. Generating the random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2. Display the dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //3. Check for rolled 1: if true, switch to next player
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            //Switch to next player
            switchPlayer();
        }
    }
})

//Holding the current score
btnHold.addEventListener('click', function () {
    if (playing) {
        //1. Current current score to active player
        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //2. Check score is euals to 100 and let finish the game
        //Finish the game
        if (scores[activePlayer] >= 30) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');

            // Hide buttons when game is over
            btnRoll.classList.add('hidden');
            btnHold.classList.add('hidden');
        }
        else {
            //Switch to next player
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click', function () {
    init(true);
});

init();
