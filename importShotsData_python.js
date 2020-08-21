/*
	Retrieve shots data from stats.nba.com API
	Generate request from command line arguments
	Example calls:
	  - `node importShotsData_python.js "James Harden" 2017-18`
	  - `node importShotsData_python.js 2019-20`
	  - `node importShotsData_python.js "Patty Mills"`
*/


const NBA = require("nba");
const fs = require('fs');

var args = process.argv;

var name = "";
var season = "";
var req = {};

// Process arguments
for ( var i = 2; i < args.length; i ++ ){
	if( args[i].match(/[0-9]{4}\-[0-9]{2}/g) ){
		season = args[i];
	} else {
		name = args[i];
	}
}

if(name != ""){
	req['PlayerID'] = NBA.findPlayer(name).playerId;
}

req['Season'] = season;

var fileName = "./shotData/" + name.replace(/\s+/g, '') + season + "Shots" + Date.now() + '.json';

// Make API call
NBA.stats.shots(req).then((shot) => {
fs.writeFile(fileName, JSON.stringify(shot), function(err) {
	if (err) return console.log(err);
})
});

console.log(fileName);