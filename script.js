"use strict";
const quizQuestions = [
    // HTML Quiz Questions
    {
        category: "HTML",
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Text Markup Leveler"],
        answer: 0,
    },
    {
        category: "HTML",
        question: "Which tag is used to define an image in HTML?",
        options: ["<img>", "<image>", "<picture>", "<photo>"],
        answer: 0,
    },
    {
        category: "HTML",
        question: "What is the correct HTML element for the largest heading?",
        options: ["<h1>", "<h6>", "<head>", "<heading>"],
        answer: 0,
    },
    {
        category: "HTML",
        question: "What is the purpose of the alt attribute in the img tag?",
        options: ["It defines the alignment of the image.", "It specifies an alternative text for the image.", "It sets the background color of the image.", "It defines the size of the image."],
        answer: 1,
    },
    {
        category: "HTML",
        question: "Which HTML element is used to link an external JavaScript file?",
        options: ["<js>", "<script>", "<javascript>", "<link>"],
        answer: 1,
    },

    // CSS Quiz Questions
    {
        category: "CSS",
        question: "What does CSS stand for?",
        options: ["Colorful Style Sheets", "Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets"],
        answer: 2,
    },
    {
        category: "CSS",
        question: "Which property is used to change the background color in CSS?",
        options: ["background-color", "color", "bgcolor", "background-style"],
        answer: 0,
    },
    {
        category: "CSS",
        question: "What does the 'box-sizing' property do in CSS?",
        options: ["It specifies the margin of an element.", "It adjusts the height of an element.", "It controls the size of the border box.", "It changes the display of an element."],
        answer: 2,
    },
    {
        category: "CSS",
        question: "Which CSS property is used to control the text size?",
        options: ["font-size", "text-size", "text-style", "font-style"],
        answer: 0,
    },
    {
        category: "CSS",
        question: "What is the correct CSS syntax for selecting an element with id 'myElement'?",
        options: ["#myElement", ".myElement", "element#myElement", "myElement"],
        answer: 0,
    },

    // JavaScript Quiz Questions
    {
        category: "JavaScript",
        question: "What is JavaScript primarily used for?",
        options: ["Styling web pages", "Creating databases", "Making web pages interactive", "Defining the structure of a web page"],
        answer: 2,
    },
    {
        category: "JavaScript",
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["let", "variable", "var", "int"],
        answer: 2,
    },
    {
        category: "JavaScript",
        question: "What method is used to add an element to the end of an array in JavaScript?",
        options: ["push()", "append()", "addElement()", "attach()"],
        answer: 0,
    },
    {
        category: "JavaScript",
        question: "Which operator is used to compare both value and type in JavaScript?",
        options: ["==", "===", "=", "!="],
        answer: 1,
    },
    {
        category: "JavaScript",
        question: "What is the purpose of the 'addEventListener' method in JavaScript?",
        options: ["To include external scripts", "To attach event handlers to elements", "To create loops", "To style web pages"],
        answer: 1,
    },
];
let highscore = document.getElementsByClassName("highscore");
let highscoreNumber = document.getElementById("highscore");
let timer = document.getElementsByClassName("timer");
let timeLeft = document.getElementById("timeLeft");
let intro = document.querySelector(".intro");
let startBtn = document.getElementById("start-button");
let quizDiv = document.getElementById("quiz-div");
let quizWrapper = document.getElementById("quiz-wrapper");
let currentQuestion = document.getElementById("question");
let answer = document.getElementById("answer");
let submitBtn = document.getElementById("submit");
let skipBtn = document.getElementById("skip-button");
let nextBtn = document.getElementById("next");
let result = document.getElementById("result")

const option1Input = document.getElementById('option1');
const option2Input = document.getElementById('option2');
const option3Input = document.getElementById('option3');
const option4Input = document.getElementById('option4');

const option1Label = document.querySelector('label[for="option1"]');
const option2Label = document.querySelector('label[for="option2"]');
const option3Label = document.querySelector('label[for="option3"]');
const option4Label = document.querySelector('label[for="option4"]');




let questionIndex = 0;
let score = 0
//staring the quiz and rendering the first question
function startQuiz() {
    intro.classList.add("hidden");
    quizDiv.classList.remove("hidden")
    quizWrapper.classList.remove("hidden")

    setTimeout(() => {
        intro.style.transitionDuration = "1s";
        quizDiv.style.transitionDuration = "1s";
    }, 0)
    showQuestion(questionIndex)
    startTimer();
}
//rendering the question
function showQuestion(questionIndex) {
    currentQuestion.innerText = quizQuestions[questionIndex].question;
    option1Label.innerText = quizQuestions[questionIndex].options[0];
    option2Label.innerText = quizQuestions[questionIndex].options[1];
    option3Label.innerText = quizQuestions[questionIndex].options[2];
    option4Label.innerText = quizQuestions[questionIndex].options[3];
    showTime()
    //questionIndex++;
}
//submitting the answer
submitBtn.addEventListener('click', (e) => {
    let selectedOption = document.querySelector("input[name='option']:checked");
    if (selectedOption !== null && !isNaN(selectedOption.value)) {
        let selectedValue = parseInt(selectedOption.value);
        let correctAnswer = quizQuestions[questionIndex].answer;
        clearInterval(interval)
        skipBtn.style.display = "none";
        if (correctAnswer === selectedValue) {
            answer.style.display = "block"
            answer.innerText = "Correct";
            score += 2;
            highscoreCalculation(score)
        } else {
            score--;
            highscoreCalculation(score);
            answer.style.display = "block";
            answer.innerText = `Incorrect, Correct answer is ${quizQuestions[questionIndex].options[correctAnswer]}`;
        }

        submitBtn.style.display = "none";

        if (questionIndex < quizQuestions.length - 1) {
            nextBtn.style.display = "block";
        }
    } else {
        alert("select a value");
        console.log("Invalid selectedValue:", selectedOption);
    }

});

//Skipping The answer
skipBtn.addEventListener('click', () => {
    let radioOptions = document.querySelectorAll("input[name='option']");
    radioOptions.forEach(radio => {
        radio.checked = false;
    });

    questionIndex++;
    skipBtn.style.display = "none";
    if (questionIndex < quizQuestions.length) {
        answer.style.display = "none";
        showQuestion(questionIndex);
        updateTimerDisplay(counter,"black");
        answer.innerText = "";
        submitBtn.style.display = "block";
        nextBtn.style.display = 'none';
    } else {
        result.style.display = "block"
        result.innerText = "Quiz completed!";
    }
});

//after submitting button to render next question
nextBtn.addEventListener('click', (e) => {
    // Reset radio buttons for the current question
    let radioOptions = document.querySelectorAll("input[name='option']");
    radioOptions.forEach(radio => {
        radio.checked = false;
    });

    questionIndex++;
    skipBtn.style.display = "none";
    if (questionIndex < quizQuestions.length) {
        answer.style.display = "none";
        showQuestion(questionIndex);
        answer.innerText = "";
        submitBtn.style.display = "block";
        nextBtn.style.display = 'none';
    } else {
        result.style.display = "block"
        result.innerText = "Quiz completed!";
    }
});
//calculating high score
function highscoreCalculation(score) {
    highscoreNumber.innerText = score;
}

let counter = 5;
//Timer calculation 
function showTime() {
    timeLeft.innerText = counter;
    changeTime(counter);
}
let interval; //made interval global so that submitBtn can access it 
function changeTime(counter) {

    interval = setInterval(() => {
        counter--;
        timeLeft.innerText = counter + "s";
        if (counter < 10) {
            timeLeft.innerText = "0" + counter + "s";
        }
        if (counter === 0) {
            updateTimerDisplay(0, "red");
            skipBtn.style.display = "block";
            submitBtn.style.display = "none";
            clearInterval(interval)
        }
    }, 1000)
}


function updateTimerDisplay(counter, color ) {
    timeLeft.innerText = counter + "s";
    timer[0].style.color = color;
}