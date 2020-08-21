/*
	Retrieve shots data from stats.nba.com API
	Generate request from prompted user input on command line
*/

const NBA = require("nba");
const fs = require('fs');

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Get user input
rl.question("Enter player's name (leave blank to include all players):  ", function(name) {
	rl.question("Enter season in yyyy-yy format, eg. 2019-20 (leave blank to include all seasons):  ", function(season) {
		var req = {};
		if(name != ""){
			console.log("Finding player: " + name);
			req['PlayerID'] = NBA.findPlayer(name).playerId;
		} else {
			console.log("Fetching all shots for all players");
		}

		req['Season'] = season;

		if(season != ""){
			console.log("Finding season: " + season);
		} else {
			console.log("Finding all seasons");
		}

		// Make API call
		NBA.stats.shots({req}).then((shot) => {
		fs.writeFile("./shotData/" + name.replace(/\s+/g, '') + season + "Shots" + Date.now() + '.json', JSON.stringify(shot), function(err) {
			if (err) return console.log(err);
			console.log("did the thing");
		})
	});
		rl.close();
});
});