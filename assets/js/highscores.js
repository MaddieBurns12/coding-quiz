var highScores = document.querySelector("#high-scores");
var returnBtn = document.querySelector("#return");

var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);
scoresUl = document.createElement("ul");


if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials.toUpperCase() + " scored " + allScores[i].score + " seconds";
        createLi.setAttribute("id", "score-li")
        scoresUl.appendChild(createLi);
        highScores.appendChild(scoresUl)
    }
}

returnBtn.addEventListener("click", function () {
    window.location.replace("./index.html");
})