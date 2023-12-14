//Functions for customization
document.addEventListener("keypress", function(event) {
    if (event.key === '=') {
        changeBackgroundColor();
    }
});
function changeBackgroundColor() {
var userInput = window.prompt("Enter your favorite hockey team's main color:", "");
if (userInput !== null && userInput.trim() !== "") {
    document.body.style.backgroundColor = userInput;
    var bgColor = document.body.style.backgroundColor;
    localStorage.setItem("backColor", bgColor);
} else {
    alert("No background color because you failed to be creative.");
}
}

document.addEventListener("DOMContentLoaded", function () {
    var bkColor = localStorage.getItem("backColor");
    if(document.body.style.backgroundColor != null){
        document.body.style.backgroundColor = bkColor;
    }

});

//Functions for page redirection and getting data to other pages
document.getElementById("playerButton").addEventListener("click", function() {
    var playerName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;

    localStorage.setItem("pName", playerName);
    localStorage.setItem("lName", lastName);
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";

    window.location.href = "player.html"; 
});

document.getElementById("teamButton").addEventListener("click", function() {
    var teamName = document.getElementById("teamName").value;

    var bgColor = document.body.style.backgroundColor;
    localStorage.setItem("backColor", bgColor);

    localStorage.setItem("tName", teamName);
    document.getElementById("teamName").value = "";
    window.location.href = "team.html";
});
