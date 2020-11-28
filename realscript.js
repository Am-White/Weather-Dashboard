//Start Timer when Start button is pressed 
//FIX THIS!! TIME-LEFT NOT DEFINED --
//WHEN timer hits 0 THEN quiz ends and results are displayed

const timeLeftDisplay = document.querySelector('#time-left');
const startBtn = document.querySelector('#start_quiz');
timeLeft = 6;
const welcomePage = document.querySelector('#welcome');
const questionsEl = document.querySelector('#question-container');
let questionIndex = 0;
const questionText = document.querySelector('#question');
const answersEl = document.querySelectorAll('.answer');
const answerContainer = document.querySelector('#answer');


startBtn.addEventListener('click', startGame);
answerContainer.addEventListener('click', checkAnswer);



//WHEN button is clicken
//THEN welcome section clears and Questions appear with options

//WHEN answer is cliked
//THEN answers are stored and section reloads with new set of questions
            
//WHEN all questions are answered
//THEN section will display results and input for name

//WHEN name is entered and submitted
//Name is stored in local storage: link to a high scores page



//questions that will be asked
const questions = [
    {
        'q' : 'What is 2+2?',
        'a' : ['cat', 'dog','4','why'],
        'cAnswer' : 2
    },
    {
        'q' : 'Is the sky blue?',
        'a' : ['no','the sky is orange', 'yes','why'],
        'cAnswer' : 2
    },
    {
        'q' : 'Are humans intelligent?',
        'a' : ['probably','sometimes', 'no','why'],
        'cAnswer' : 1
    },
    {
        'q' : 'The saying is (who, ___, where and why',
        'a' : ['dinosaur','dr.Manhattan','whiskey', 'what'],
        'cAnswer' : 3
    },
    {
        'q' : 'Van Gogh cut off what ear?',
        'a' : ['left','fake news','right','both'],
        'cAnswer' : 0
    },
    {
        'q' : 'How long can a Wood Frog hold its pee?',
        'a' : ['8hours','40hours','8months','1year'],
        'cAnswer' : 2
    },  
    {
        'q' : 'There is a dog who is a decorated war hero, what is his name?',
        'a' : ['Chance','Fido','Max','Rags'],
        'cAnswer' : 3
    },
]

function countDown () {
    setInterval(function() {
        
        if(timeLeft === 0 || questions.length < 6) {
            clearInterval(timeLeftDisplay);
            endQuiz();
        }
        
        timeLeftDisplay.innerHTML = timeLeft
        timeLeft -= 1
    }, 1000)
};

let savedScores= [];

//JSON for high-scores

function startGame () {
    countDown(); 
    questionsEl.classList.remove('hidden-page');
    welcomePage.classList.add('hidden-page');
    renderQuestion();
}

function renderQuestion () {
    console.log(questions[questionIndex]);
    questionText.textContent = questions[questionIndex].q;
    for (let i = 0; i<answersEl.length; i++) {
        answersEl[i].textContent = questions[questionIndex].a[i];
    }
}


const response = document.querySelector('#response');

function checkAnswer(event) {
    console.log(event);
    if (event.target.matches("button")) {
        //console.log(event.target.dataset.index);
        const currentIndex = event.target.dataset.index;
        if (currentIndex == questions[questionIndex].cAnswer) 
        {
        console.log("correct");
            response.textContent = 'correct';
            response.style.color = 'green';
            score++;
            console.log(score);

        } else {
            response.textContent = 'incorrect';
            response.style.color = 'red';
            console.log("incorrect");
        } 
        questionIndex++;
        renderQuestion();

    } 
}


//
let finalScore;
const yourScore = document.querySelector('#score');
const finishPage = document.querySelector('#submit-name');

const endQuiz = function () {
    timeLeftDisplay.classList.add('class', 'display:none');
    questionsEl.classList.add('hidden-page');
    finishPage.classList.remove('hidden-page');
    yourScore.textContent = score;
}

//
const highScores = document.querySelector('#end-scores');
const submitBtn = document.querySelector('#submit-score');
const displayScoresDisplay = document.querySelector('#past-scores');

let displayScores = function() {
    let score = 0;
    while (score < savedScores.length) {
        const localStoredScores = localStorage.getItem('score' + score);
        //console.log(localStoredScores);
        let allScores = document.createElement('h2');
        let newScore = 'Player Name: ' + JSON.parse(localStoredScores).currentName + '------- Score: ' + JSON.parse(localStoredScores).savedScores;
        allScores.textContent = newScore;
        displayScoresDisplay.append(allScores);
        //console.log(newScore);
        score++;
    };
};

submitBtn.addEventListener('click', function(event) {
    event.preventDefault();
    highScores.classList.remove('hidden-page');
    finishPage.classList.add('hidden-page');

    const userName = document.querySelector('#user-name');
    let currentName = userName.value;
    let savedScoreEl = {currentName, finalScore};
    savedScores.push(savedScoreEl);

    let i = 0;
    while (i < savedScores.length) {
        localStorage.setItem('score' + i, JSON.stringify(savedScores[i]));
        i++;
    };
    displayScores();
});

//
const returnBtn = document.querySelector('#return');

returnBtn.addEventListener('click', function() {
    score = 0;
    finalScore = '';
    userName = '';
    timeLeft = 6;
    finishPage.classList.add('hidden-page');
    highScores.classList.add('hidden-page');
    welcomePage.classList.remove('hidden-page');
});

//clear button
const clearBtn = document.querySelector('#reset');

clearBtn.addEventListener('click', function() {
    localStorage.clear();
});

//timer to stop when it hits 0
//save past scores and names
//when return everything resets to 0: questions and timer doesn't start
//if all of the questions are answered then = endQuiz