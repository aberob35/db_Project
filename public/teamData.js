document.addEventListener("DOMContentLoaded", function () {
  var savedTeamName = localStorage.getItem("tName");
  var bkColor = localStorage.getItem("backColor");
  document.body.style.backgroundColor = bkColor;

  if (savedTeamName) {
      document.getElementById("tN").textContent = "Team Name: " + savedTeamName;
      fetchTeamStats(savedTeamName);
  } else {
      document.getElementById("tN").textContent = "Team Name: Name not found.";
  }
});

// Function to fetch team stats from the server
function fetchTeamStats(teamName) {
  // Make a request to the server
  fetch(`/getTeamStats?teamName=${encodeURIComponent(teamName)}`)
      .then(response => response.json())
      .then(data => {
          updateTeamStats(data);
      })
      .catch(error => {
          console.error('Error fetching team stats:', error);
      });
}

// Function to update team stats on the team.html page
function updateTeamStats(teamStats) {
  //Update season Statics
  document.getElementById("sN").textContent = "Amount of Seasons Played: " + teamStats.Seasons;
  document.getElementById("wins").textContent = "Total amount of Wins: " + teamStats.Wins;
  document.getElementById("losses").textContent = "Total amount of Losses: " + teamStats.Losses;
  document.getElementById("ties").textContent = "Total amount of Ties: " + teamStats.Ties;
  document.getElementById("oT").textContent = "Total amount of OT: " + teamStats.OTL;
  document.getElementById("pnts").textContent = "Total amount of Points: " + teamStats.Points;
  document.getElementById("pApp").textContent = "Total amount of Playoff Appearances: " + teamStats.PlayoffAppearances;
  document.getElementById("pWins").textContent = "Total amount of Playoff Appearance Wins: " + teamStats.PlayoffWins;
  document.getElementById("pLosses").textContent = "Total amount of Playoff Appearance Losses: " + teamStats.PlayoffLosses;
  document.getElementById("cupWon").textContent = "Total amount of Cups Won: " + teamStats.CupsWon;
  document.getElementById("lyearWon").textContent = "Last Year Team Won Playoffs: " + teamStats.LastYearWon;

  // Update Team Statics
  document.getElementById("city").textContent = "City: " + teamStats.City;
  document.getElementById("country").textContent = "Country: " + teamStats.Country;
  document.getElementById("fDate").textContent = "Found Date: " + teamStats.FoundedDate;
  document.getElementById("aName").textContent = "Arena Name: " + teamStats.ArenaName;
  document.getElementById("conf").textContent = "Confrence: " + teamStats.Conference;
  document.getElementById("tColor").textContent = "Team Color: " + teamStats.TeamColors;
  var imageElement = document.getElementById("myImage");
  var temp = teamStats.Abbreviation;
  var value = temp.toLowerCase()
  var source = "data/logos/"+ value + ".png";
  imageElement.src = source;

  //Update Captain Statics 
  document.getElementById("cN").textContent = "Captain Full Name: " + teamStats.Firstname + " " + teamStats.Lastname;
  document.getElementById("teamNameCap").textContent = "Abbreviated Team Name: " + teamStats.Team;
  document.getElementById("fDateCap").textContent = "Found Date: " + teamStats.FoundedDate;

  //update Links
  document.getElementById("fBook").href = teamStats.Instagram;
  document.getElementById("iG").href = teamStats.Twitter;
  document.getElementById("nhl").href = teamStats.NHL;
}
