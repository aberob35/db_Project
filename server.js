const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose(); 

const app = express();
const port = 3000;

const db = new sqlite3.Database('hockeyData.db'); 

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'userInterface.html'));
});

// Retrieve player stats from the database
app.get('/getPlayerStats', (req, res) => {
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;

  const query = 'SELECT * FROM Player JOIN Analytics ON Player.TeamID = Analytics.TeamID WHERE FirstName = ? AND LastName = ?';

  db.get(query, [firstName, lastName], (err, row) => {
      if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else if (row) {
          res.json(row);
      } else {
          res.status(404).json({ error: 'Player not found' });
      }
  });
});

app.get('/getTeamStats', (req, res) => {
  const teamName = req.query.teamName;
  const query = `SELECT * FROM Team LEFT JOIN Season ON Team.TeamID = Season.TeamID LEFT JOIN Captains ON Team.TeamID = Captains.TeamID LEFT JOIN SocialMedia ON Team.TeamID = SocialMedia.TeamID WHERE Team.TeamName = ? AND Captains.Type = 'Captain';`;
  db.get(query, [teamName], (err, row) => {
      if (err) {
          console.error('Error executing team query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else if (row) {
          res.json(row);
      } else {
          res.status(404).json({ error: 'Team not found' });
      }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});