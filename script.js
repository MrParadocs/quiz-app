"use strict";
import quizQuestions from './data.js';
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
let resultDiv = document.getElementById("result-div");
let userScore = document.getElementById("user-score");
let resultBtn = document.getElementById("resultBtn");

const option1Label = document.querySelector('label[for="option1"]');
const option2Label = document.querySelector('label[for="option2"]');
const option3Label = document.querySelector('label[for="option3"]');
const option4Label = document.querySelector('label[for="option4"]');




let questionIndex = 0;
let score = 0
//staring the quiz and rendering the first question
function startQuiz() {

}
startBtn.addEventListener('click', (e) => {
    intro.classList.add("hidden");
    quizDiv.classList.remove("hidden")
    quizWrapper.classList.remove("hidden")

    setTimeout(() => {
        intro.style.transitionDuration = "1s";
        quizDiv.style.transitionDuration = "1s";
    }, 0)
    showQuestion(questionIndex)
})
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
        clearInterval(interval);
        skipBtn.style.display = "none";
        if (correctAnswer === selectedValue) {
            answer.style.display = "block";
            answer.innerText = "Correct";
            score += 2;
            highscoreCalculation(score);
        } else {
            score--;
            highscoreCalculation(score);
            answer.style.display = "block";
            answer.innerText = `Incorrect, Correct answer is ${quizQuestions[questionIndex].options[correctAnswer]}`;
        }

        submitBtn.style.display = "none";

        if (questionIndex < quizQuestions.length - 1) {
            nextBtn.style.display = "block";
        } else {
            // Show the "See Your Score" button when submitting the last question
            nextBtn.style.display = "none";
            resultBtn.style.display = "block";
        }
    } else {
        alert("Select an answer.");
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
        updateTimerDisplay(counter, "#D3D3D3");
        answer.innerText = "";
        submitBtn.style.display = "block";
        nextBtn.style.display = 'none';
    } else {
        timeLeft.innerText = "__"
        result.style.display = "block";
        userScore.innerText = score;
        resultBtn.style.display = "block"; // Show the "See Your Score" button when skipping the last question
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

let counter = 15;
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


function updateTimerDisplay(counter, color) {
    timeLeft.innerText = counter + "s";
    timer[0].style.color = color;
}

resultBtn.addEventListener('click', () => {
    timeLeft.innerText = "__"
    quizWrapper.style.display = "none";
    resultDiv.style.display = "block";
    userScore.innerText = score;
});