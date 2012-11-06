/**
 * 
 */
var cradle = require('cradle');

var host = '192.168.199.128';
var dbName = 'log';

var c = new (cradle.Connection)(host);
var db = c.database(dbName);
db.exists(function(err, exists) {
	if (err) {
		console.log('error', err);
	} else if (exists) {
		console.log('"'+dbName+'" db exists.');
	} else {
		console.log('"'+dbName+'" database does not exists...');
		db.create();
		console.log('..."'+dbName+'" database created.');
		/* populate design documents */
	}
});

c.stats(function(err, stats) {
	if (err) {
		console.log('error', err);
	} else if (stats) {
		console.log('"'+dbName+'" db stats exist.');
		console.log(stats);
	} else {
		console.log('"'+dbName+'" database does not have stats...');
		console.log(stats);
	}
});

function fix( 	){
	
}


//console.log(c.databases());

/*
 * var db = conn.database('starwars');
 * 
 * db.get('vader', function(err, doc) { doc.name; // 'Darth Vader'
 * assert.equal(doc.force, 'dark'); });
 * 
 * db.save('skywalker', { force : 'light', name : 'Luke Skywalker' },
 * function(err, res) { if (err) { // Handle error } else { // Handle success }
 * });
 */