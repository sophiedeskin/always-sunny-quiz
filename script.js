//locating the start button
var startButton = document.getElementById('start-btn')
//locating the next button
var nextButton = document.getElementById('next-btn')
var highScores = document.getElementById('high-scores')
//locating the question container
var questionContainerElement = document.getElementById('question-container')
//locating our questions
var questionElement = document.getElementById('question')
//locating our answer
var answerButtonsElement = document.getElementById('answer-buttons')
var timeEl = document.querySelector(".time");
//locating where I put my timer
var headerEl = document.getElementById("h2");
//how many sections I want on my timer
var secondsLeft = 60;
//setting both of the below values to undefined
var shuffledQuestions, currentQuestionIndex
var timerInterval;

//arrays stored of questions and answers, the text within answers are objects
var questions = [
    {
      question: 'What is name of the woman Charlie pines after?',
      answers: [
        { text: 'The Waitress', correct: true },
        { text: 'Sweet Dee', correct: false },
        { text: 'Maureen', correct: false },
        { text: 'Gail the Snail', correct: false }
      ]
    },
    {
      question: 'What are the three levels of Chardee McDennis?',
      answers: [
        { text: 'Trivia, Body, Spirit', correct: true },
        { text: 'Art, Truth or Dare, Body', correct: false },
        { text: 'Mind, Body, Spirt', correct: false },
        { text: 'Games, Spirit, Endurance', correct: false }
      ]
    },
    {
        question: 'What was Rickety Crickets job before he met the gang?',
        answers: [
          { text: 'Priest', correct: true },
          { text: 'Janitor', correct: false },
          { text: 'Teacher', correct: false },
          { text: 'Athlete', correct: false }
        ]
      },
      {
        question: 'How do you get out of jail in Chardee Mcdennis?',
        answers: [
          { text: 'Eat the ingrediants of a cake', correct: true },
          { text: 'Cry', correct: false },
          { text: 'Ask for help', correct: false },
          { text: 'Just leave', correct: false }
        ]
      },
      ]



        nextButton.addEventListener('click', () => {
        currentQuestionIndex++
        setNextQuestion()
      })
  
//adding an action to the start button
startButton.addEventListener('click', startGame)
//what will run because we click start:
function startGame() {
    //once we start our game we need to hide our start button
    startButton.classList.add('hide')
    //once our game is started we need a random question below or above 0
    shuffledQuestions = questions.sort(() => (Math.random() > .5) ? 1 : -1);
    //starting on the first question in our shuffled questions array
    currentQuestionIndex = 0
    //we need to remove the content that we marked as hidden orginally to bring forward our actual quiz contained within a container
    questionContainerElement.classList.remove('hide')
    //we don't want the timer to start until the user has pressed the start button, that's we we've contained the interval timer within our start game function
  
          timerInterval = setInterval(function() {
          secondsLeft--;
          timeEl.textContent = secondsLeft + " seconds left";
      
          if(secondsLeft <= 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to create and append image
            sendMessage();
            questionContainerElement.classList.add('hide')
            startButton.classList.remove('hide')
            secondsLeft = 60
          }
      
        }, 1000);
    //setTime();
    //runs the set next question function
    setNextQuestion()
}
//send an alert to the user that they've run out of time
function sendMessage () {
    alert("You've run out of time")
}
function setNextQuestion() {
    //resetting back to our default state everytime we get a new question
    resetState()
    //taking our shuffled questions at the current question index
    showQuestion(shuffledQuestions[currentQuestionIndex])
}
function showQuestion(question) {
    //taking our question element and inputting one of our defined questions
    questionElement.innerText = question.question
    //looping through our questions answers
    question.answers.forEach(answer => {
        //creating our answer buttons
        const button = document.createElement('button')
        //setting the text within the button to one of our answers
        button.innerText = answer.text
        //adding a button class to our answers
        button.classList.add('btn')
        if (answer.correct) {
          //adding a data attribute to our button to get correct answers at the end
          button.dataset.correct = answer.correct
        } 
        //adding an event listener to our button 
        button.addEventListener('click', selectAnswer)
        //apending the actual button to the page
        answerButtonsElement.appendChild(button)
      })
    }
    function resetState() {
        clearStatusClass(document.body)
        //hiding our next button when our next question comes up
        nextButton.classList.add('hide')
        //loop through all the children for our answer button elements
        while (answerButtonsElement.firstChild) {
            //removing answers
            answerButtonsElement.removeChild(answerButtonsElement.firstChild)
        }
      }
      
      function selectAnswer(e) {
          //getting whatever we clicked on
        var selectedButton = e.target
        //checking if our answer was correct
        var correct = selectedButton.dataset.correct
        console.log("selected", correct)
        //seeing whether or not it should actually be set to correct or not
        setStatusClass(document.body, correct)
    
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
          nextButton.classList.remove('hide')
        } else {
          startButton.innerText = 'Restart'
          startButton.classList.remove('hide')
          nextButton.classList.add('hide')
          questionContainerElement.classList.add('hide')
          startButton.classList.remove('hide')
          secondsLeft = 60
          clearInterval(timerInterval);
        }
      }
      //taking an element and whether or not it's correct
      function setStatusClass(element, correct) {
          //clear any status it already has
        clearStatusClass(element)
        //if it is correct we want to add the correct class
        if (correct) {
          element.classList.add('correct')
          score.push("correct");
          console.log(score)
        } else {
          element.classList.add('wrong')
          secondsLeft-=5;
          timeEl.textContent = secondsLeft + " seconds left"; 
        }
      }
      
      function clearStatusClass(element) {
        element.classList.remove('correct')
        element.classList.remove('wrong')
      }
      



var scoreInput = document.querySelector("#score-text");
var scoreForm = document.querySelector("#score-form");
var scoreList = document.querySelector("#score-list");
var scoreCountSpan = document.querySelector("#score-count");
var score = []

function renderScores() {
console.log(score)
  scoreList.innerHTML = "";
  scoreCountSpan.textContent = score;
  

  for (var i = 0; i < score.length; i++) {
    var score = score[i];

    var li = document.createElement("li");
    li.textContent = score;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Congragulations!";

    li.appendChild(button);
    scoreList.appendChild(li);
  }
}


function init() {
 
  var storedScore = JSON.parse(localStorage.getItem("scores"));
 
  if (storedScore !== null) {

  }
  renderScores();
}

function storedScore() {
  localStorage.setItem("score", JSON.stringify(score));
}

scoreForm.addEventListener("submit", function(event) {
  event.preventDefault();
  var scoreText = scoreInput.value.trim();
  if (scoreText === "") {
    return;
  }

  score.push(scoreText);
  scoreInput.value = {};
 

  storedScore();
  renderScores();
});


scoreList.addEventListener("click", function(event) {
  var element = event.target;

  if (element.matches("button") === true) {
    var index = element.parentElement.getAttribute("data-index");
    score.splice(index, 1);

    storedScore();
    renderScores();
  }
});

init();
