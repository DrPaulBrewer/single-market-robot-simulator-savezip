/* Copyright 2016 Paul Brewer, Economic and Financial Technology Consulting LLC */
/* This file is open source software.  The MIT License applies to this software. */

/* jshint browserify:true,jquery:true,esnext:true,eqeqeq:true,undef:true,lastsemic:true,strict:true,unused:true */

const JSzip = require('jszip');
const saveAs = require('filesaver.js-npm').saveAs;

function pad(x){
    "use strict";
    return (x<10)? ("0"+x) : (''+x);
}

function myDateStamp(){
    "use strict";
    var now = Date.now();
    return ( ''+ now.getUTCFullYear() + 
	     pad(now.getUTCMonth() + 1) +
             pad(now.getUTCDate()) +
             'T' + pad(now.getUTCHours()) +
             pad(now.getUTCMinutes())
	   );
}

function letter(n){
    "use strict";
    var A = "A".charCodeAt(0);
    return String.fromCharCode(A+n);
}

function csvString(rows){
    "use strict";
    var s = '';
    var i,l,row;
    for(i=0,l=rows.length;i<l;++i){
	row = rows[i];
	s += row.join(",") + "\n";
    }
    return s;
}

module.exports = function savezip(sims){
    "use strict";
    var stamp = myDateStamp();
    var zip = new JSzip();
    sims.forEach(function(sim, i){
	var folder = zip.folder(stamp).folder(letter(i));
	// see http://stackoverflow.com/a/7220510/103081 by http://stackoverflow.com/users/27862/user123444555621 for pretty printed stringify
	folder.file("config.json", JSON.stringify(sim.config,null,2));
	var logNames = Object.keys(sim.logs);
	logNames.forEach(function(L){
	    folder.file(L+".csv", csvString(sim.logs[L].data));
	});
    });
    (zip
     .generateAsync({type:"blob"})
     .then(function (blob) {
	 saveAs(blob, stamp+".zip");
     })
    );
};
