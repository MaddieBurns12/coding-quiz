
// create variables
var score = 0
var questionNumber = 0
var currentTime = document.querySelector("#currentTime")
var timer = document.querySelector("#start-quiz")
var quizContent = document.querySelector("#quiz-content")
var mainPage = document.querySelector("#main-page")

var secondsRemaining = 100
var timeInterval = 0
var penalty = 15
var createUl = document.createElement("ul")
var questions = [
    {
    question: "Which language is commonly referred to as the 'backbone' of a website and features elements with tags?",
    choices: ["JavaScript", "CSS", "HTML", "English"],
    answer: "HTML",
    },
    {
    question: "What keyword allows you to store a variable within JavaScript?",
    choices: ["var", "const", "let", "All of these."],
    answer: "All of these.",
    },
    {
    question: "String values must be enclosed within ____ when being assigned to certain variables.",
    choices: ["Commas", "Curly brackets", "Quotes", "Parentheses"],
    answer: "Quotes"
    },
    {
    question: "What keyword selects for an ID within CSS?",
    choices: ["!", "#", ".", "?"],
    answer: "#"
    },
    {
    question: "What does HTML stand for?",
    choices: ["Hypertext Markup Language", "Hot Tamales Make Laughter", "Hotmail Time Mail Language", "Here To Make Links"],
    answer: "Hypertext Markup Language"
    }

];

timer.addEventListener("click", function () {
    if (timeInterval === 0) {
        timeInterval = setInterval(function () {
            secondsRemaining --;
            currentTime.textContent = "Time: " + secondsRemaining;

            if (secondsRemaining <= 0) {
                clearInterval(timeInterval);
                quizDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    runQuestions(questionNumber);
})

function runQuestions(questionNumber) {
    mainPage.innerHTML = "";
    quizContent.innerHTML = "";
    createUl.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionNumber].question;
        var userChoices = questions[questionNumber].choices;
        quizContent.textContent = userQuestion;
    }
    userChoices.forEach(function (newChoice) {
        var answerChoice = document.createElement("li");
        answerChoice.textContent = newChoice;
        answerChoice.setAttribute("id", "choices");
        quizContent.appendChild(createUl);
        createUl.appendChild(answerChoice);
        answerChoice.addEventListener("click", (questionAnswer));
    })
}

function questionAnswer(event) {
    var element = event.target;
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        

        if (element.textContent == questions[questionNumber].answer) {
            score ++;
            createDiv.textContent = "Correct! Great work!";
        } else {
            secondsRemaining = secondsRemaining - penalty;
            createDiv.textContent = "Incorrect! The correct answer is: " + questions[questionNumber].answer;
        }
    }

    questionNumber++; 

    if (questionNumber >= questions.length) {
        quizDone();
        createDiv.textContent = "Well done! You got " + score + " questions out of " + questions.length + " correct!";
    } else {
        runQuestions(questionNumber);
    }
        quizContent.appendChild(createDiv);
}

function quizDone() {
    quizContent.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent= "Quiz finished!"

    quizContent.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    quizContent.appendChild(createP);

    if (secondsRemaining>= 0) {
        var timeRemaining = secondsRemaining;
        var createP2 = document.createElement("p");
        clearInterval(timeInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        quizContent.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials and save your score: "

    quizContent.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");  
    createInput.textContent = "";

    quizContent.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    quizContent.appendChild(createSubmit);

    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;
        if (initials === "") {
            var createError = document.createElement("p");
            createError.innerHTML = "Please enter your initials to proceed!"
            quizContent.appendChild(createError);
        }; 
        if (initials !== "") {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            var allScores = localStorage.getItem("allScores")
            if (allScores === null) {
                allScores = []
            } else {
                allScores = JSON.parse(allScores)
            }
            allScores.push(finalScore);
            var newScores = JSON.stringify(allScores)
            localStorage.setItem("allScores", newScores)
            window.location.replace("./Highscores.html")
        }
    });
}

