document.addEventListener("DOMContentLoaded", function () {
    var savedName = localStorage.getItem("pName");
    var sLastName = localStorage.getItem("lName");
    var bkColor = localStorage.getItem("backColor");
    document.body.style.backgroundColor = bkColor;
    if (savedName) {
        document.getElementById("pN").textContent = "Player Name: " + savedName + " " + sLastName;
        //localStorage.clear();
        fetchPlayer(savedName, sLastName);
    } else {
        document.getElementById("pN").textContent = "Player Name: Name not found.";
    }
});


// Function to fetch player stats from the server
function fetchPlayer(firstName, lastName) {
    // Make a request to the server
    fetch(`/getPlayerStats?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`)
        .then(response => response.json())
        .then(data => {
            updatePlayerStats(data);
        })
        .catch(error => {
            console.error('Error fetching player stats:', error);
        });
}

// Function to update player stats on the player.html page
function updatePlayerStats(playerStats) {
    //Update Current Season Stats
    document.getElementById("sY").textContent = "Season Year: " + playerStats.SeasonYear;
    document.getElementById("temName").textContent = "Team Name: " + playerStats.Teamname;
    document.getElementById("gP").textContent = "GP: " + playerStats.GP;
    document.getElementById("wins").textContent = "Wins: " + playerStats.Wins;
    document.getElementById("losses").textContent = "Losses: " + playerStats.Losses;
    document.getElementById("oT").textContent = "OT: " + playerStats.OT;
    document.getElementById("pnts").textContent = "Points: " + playerStats.Points;

    // Update other player stats on the page as needed
    document.getElementById("tm").textContent = "Team: " + playerStats.Teamname;
    document.getElementById("pos").textContent = "Position: " + playerStats.Position;
    document.getElementById("jN").textContent = "Jersey Number: " + playerStats.JerseyNumber;
    document.getElementById("age").textContent = "Age: " + playerStats.Age;
    document.getElementById("sal").textContent = "Salary: " + playerStats.Salary;
    document.getElementById("dY").textContent = "Draft Year: " + playerStats.DraftYear;
    document.getElementById("count").textContent = "Country: " + playerStats.Country;

    //Update background to be a photo 
    var abbreviatedTeam = playerStats.Team;
    var imagePNG = abbreviatedTeam.toLowerCase() + ".png";
    var imagePath = 'data/logos/' + imagePNG; 
    document.body.style.backgroundImage = "url('" + imagePath + "')";
    document.body.style.backgroundRepeat = "repeat";
    document.body.style.backgroundPosition = "center center";
}

    


