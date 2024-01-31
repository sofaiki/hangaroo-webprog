document.addEventListener('DOMContentLoaded', function() {
    const wordList = [
           {
               word: "java",
               hint: "What programming language is commonly used for developing Android applications?",
               difficulty: "easy"
           },
           {
               word: "error",
               hint: "What does the term bug refer to in programming",
               difficulty: "easy"
           },
           {
               word: "encoding",
               hint: "What is the process of converting text into a different form, such as Morse code?",
               difficulty: "easy"
           },
           {
               word: "javascript",
               hint: "What programming language is often used for creating dynamic and interactive websites?",
               difficulty: "easy"
           },
           {
               word: "repetition",
               hint: "In programming, what does the term loop refer to?",
               difficulty: "easy"
           },
           {
               word: "function",
               hint: "What word is often abbreviated as Fn on a keyboard?",
               difficulty: "easy"
           },
           {
               word: "python",
               hint: "It is the programming Language with if and else statements.",
               difficulty: "easy"
           },
           {
               word: "declarative",
               hint: "What type of programming paradigm emphasizes defining the desired outcome rather than specifying the sequence of steps to achieve it?",
               difficulty: "easy"
           },
           {
               word: "usb",
               hint: "What is the term for a small, portable storage device that uses flash memory?",
               difficulty: "easy"
           },
           {
               word: "html",
               hint: "What is the file extension for a Hypertext Markup Language file.",
               difficulty: "easy"
           },
       
           {
               word: "git",
               hint: "What is the three-letter name of this uber-popular software among developers?",
               difficulty: "medium"
           },
           {
               word: "compilation",
               hint: "What is the process of converting source code written in a high-level programming language into machine code that can be executed by a computer processor?",
               difficulty: "medium"
           },
           {
               word: "loop",
               hint: "What term is used to describe a programming construct that allows a piece of code to be executed repeatedly based on a specified condition?",
               difficulty: "medium"
           },
           {
               word: "hypertextmarkuplanguage",
               hint: "What does HTML stand for in web development?",
               difficulty: "medium"
           },
           {
               word: "subquery",
               hint: "It is a query that is contained within other queries.",
               difficulty: "medium"
           },
           {
               word: "action",
               hint: "It defines where the form input values will be submitted when yoy click the submit button.",
               difficulty: "medium"
           },
           {
               word: "accessibility",
               hint: "What is the role of the alt attribute in an HTML image tag?",
               difficulty: "medium"
           },
           {
               word: "layering",
               hint: "What is the purpose of the z-index property in CSS?",
               difficulty: "medium"
           },
           {
               word: "driver",
               hint: "What is the term for a small, specialized program that helps the operating system communicate with a specific hardware device?",
               difficulty: "medium"
           },
           {
               word: "avatar",
               hint: "What is the name for a graphical representation of a user on a computer screen?",
               difficulty: "medium"
           },
           
           {
               word: "munich",
               hint: "LiMux was a project for migrating what huge Bavarian city from Windows to Linux?",
               difficulty: "hard"
           },
           {
               word: "integration",
               hint: "What is the role of an API (Application Programming Interface) in software development?",
               difficulty: "hard"
           },
           {
               word: "combinator",
               hint: "It is something that explains the relationship between the selectors.",
               difficulty: "hard"
           },
           {
               word: "antivirus",
               hint: "What type of software helps protect your computer from viruses and malware?",
               difficulty: "hard"
           },
           {
               word: "microsoft",
               hint: "What company developed the Windows operating system?",
               difficulty: "hard"
           },
           {
               word: "ten",
               hint: "How many bits would you have if you added two nibbles and one crumb?",
               difficulty: "hard"
           },
           {
               word: "serial",
               hint: "Which kind of interface is slow because transmits digital information bit by bit over a wire?",
               difficulty: "hard"
           },
           {
               word: "github",
               hint: "What company providing hosting for software development and distributed version control familiar to computer programmers is known for its iconic Octocat (part cat, part octopus) logo?",
               difficulty: "hard"
           },
           {
               word: "password",
               hint: "What is the term for a unique string of characters used for user authentication?",
               difficulty: "hard"
           },
           {
               word: "browser",
               hint: "What is the name for a software application that allows users to browse the World Wide Web?",
               difficulty: "hard"
           },
    ];
 
    let currentDifficulty = "easy";
    let easyQuestions, mediumQuestions, hardQuestions;
 
    function getWordsByDifficulty(difficulty) {
        return wordList.filter(wordObj => wordObj.difficulty === difficulty);
    }
 
    function getNextWordList() {
        switch (currentDifficulty) {
            case "easy":
                return easyQuestions;
            case "medium":
                return mediumQuestions;
            case "hard":
                return hardQuestions;
            default:
                return [];
        }
    }
 
    function getRandomWordFromList(wordList) {
        return wordList[Math.floor(Math.random() * wordList.length)];
    }
 
    function getRandomWord() {
        const words = getNextWordList();
        const { word, hint } = getRandomWordFromList(words);
        currentWord = word;
        document.querySelector(".hint-text b").innerText = hint;
        resetGame();
    }
 
    function setNextDifficulty() {
        const difficultyLevels = ["easy", "medium", "hard"];
        const currentIndex = difficultyLevels.indexOf(currentDifficulty);
        currentDifficulty = difficultyLevels[(currentIndex + 1) % difficultyLevels.length];
    }
    easyQuestions = getWordsByDifficulty("easy");
    mediumQuestions = getWordsByDifficulty("medium");
    hardQuestions = getWordsByDifficulty("hard");
    getRandomWord();

    playAgainBtn.addEventListener("click", function() {
        setNextDifficulty();
        getRandomWord();
    });
});
 