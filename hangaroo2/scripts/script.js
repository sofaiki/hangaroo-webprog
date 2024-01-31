const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;
const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
};

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word; 
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
};

const gameOver = (isVictory) => {
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    const randomIndex = Math.floor(Math.random() * 3);
    const imageFileName = isVictory ? `victory-${randomIndex}` : `lost-${randomIndex}`;
    gameModal.querySelector("img").src = `images/${imageFileName}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'You Win!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
};

const initGame = (button, clickedLetter) => {
    if (button.disabled) {
        return;
    }

    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
        handleCorrectGuess(); 

    } else {
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
        handleIncorrectGuess(); 
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
};

let score = 0;

function updateScore() {
    const scoreElements = document.querySelectorAll('.score');
    scoreElements.forEach(element => {
        element.textContent = score;
    });
}

function handleCorrectGuess() {
    score += 5; 
    updateScore();
}

function handleIncorrectGuess() {
    score -= 2; 
    updateScore();
}

let hintsLeft = 3; 

const hintButton = document.querySelector(".hint-button");
const hintThreshold = 50; 

hintButton.addEventListener("click", () => {
    if (score >= hintThreshold) {
        let unrevealedLetters = currentWord.split('').filter(letter => !correctLetters.includes(letter));
        if (unrevealedLetters.length > 0) {
            const remainingUnrevealedLetters = unrevealedLetters.filter(letter => !correctLetters.includes(letter));

            if (remainingUnrevealedLetters.length > 0) {
                const randomIndex = Math.floor(Math.random() * remainingUnrevealedLetters.length);
                const hintedLetter = remainingUnrevealedLetters[randomIndex];

                currentWord.split('').forEach((letter, index) => {
                    if (letter === hintedLetter) {
                        correctLetters.push(letter);
                        wordDisplay.querySelectorAll("li")[index].innerText = letter;
                        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
                    }
                });

                score -= hintThreshold;
                updateScore();

                hintsLeft--;
                document.querySelector(".hint-count").textContent = hintsLeft;

                const buttons = keyboardDiv.querySelectorAll("button");
                buttons.forEach(button => {
                    if (button.innerText === hintedLetter) {
                        button.disabled = true;
                    }
                });
            } else {
                alert("No unrevealed letters left!");
            }
        } else {
            alert("No unrevealed letters left!");
        }
    } else {
        alert(`You need at least ${hintThreshold} points to use a hint.`);
    }
});

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

document.addEventListener('DOMContentLoaded', function() {
    function getWordsByDifficulty(difficulty) {
        return wordList.filter(wordObj => wordObj.difficulty === difficulty);
    }

    document.querySelectorAll('.difficulty').forEach(function(button) {
        button.addEventListener('click', function() {
            var difficulty = this.getAttribute('data-level');
            startGame(difficulty);
        });
    });

    function startGame(difficulty) {
        document.querySelector('.start-page').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
        var words = getWordsByDifficulty(difficulty);
        initializeHangmanGame(words);
    }

    function initializeHangmanGame(words) {
        var selectedWord = words[Math.floor(Math.random() * words.length)].word;
        console.log("Selected Word:", selectedWord);
    }
});