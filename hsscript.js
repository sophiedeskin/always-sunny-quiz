var scoreInput = document.querySelector("#score-text");
var scoreForm = document.querySelector("#score-form");
var scoreList = document.querySelector("#score-list");
var scoreCountSpan = document.querySelector("#score-count");

var score = [];


function renderScores() {

  scoreList.innerHTML = "";
  scoreCountSpan.textContent = score.length;
  

  for (var i = 0; i < score.length; i++) {
    var score = score[i];

    var li = document.createElement("li");
    li.textContent = score;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Complete ✔️";

    li.appendChild(button);
    scoreList.appendChild(li);
  }
}


function init() {
 
  var storedScore = JSON.parse(localStorage.getItem("scores"));
 
  if (storedScore !== null) {
    score = storedScore;
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
  scoreInput.value = "";
 

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
