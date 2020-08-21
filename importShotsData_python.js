const NBA = require("nba");
const fs = require('fs');

var args = process.argv;

var name = "";
var season = "";
var req = {};

for ( var i = 2; i < args.length; i ++ ){
	if( args[i].match(/[0-9]{4}\-[0-9]{2}/g) ){
		season = args[i];
	} else {
		name = args[i];
	}
}

if(name != ""){
	console.log("Finding player: " + name);
	req['PlayerID'] = NBA.findPlayer(name).playerId;
} else {
	console.log("Fetching all shots for all players");
}

if(season != ""){
	console.log("Finding season: " + season);
	req['Season'] = season;
} else {
	console.log("Finding all seasons");
}

NBA.stats.shots(req).then((shot) => {
fs.writeFile("./shotData/" + name.replace(/\s+/g, '') + season + "Shots" + Date.now() + '.json', JSON.stringify(shot), function(err) {
	if (err) return console.log(err);
	console.log("did the thing");
})
});