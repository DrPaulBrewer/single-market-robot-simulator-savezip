single-market-robot-simulator-savezip
======

Saves the configuration and logs of an array of single-market-robot-simulator Simulations, in a zip file using jszip
and filesaver.js-npm.  

Used by robot-trading-webapp

Useful only on the browser.  

On a node.js server, single-market-robot-simulator automatically saves multiple csv files without this module.

## Installation

    npm i single-market-robot-simulator-savezip -S

## Usage

This module exports a single function,

     const saveZip = require('single-market-robot-simulator-savezip');

where

     saveZip({Array of single-market-robot-simulator.Simulation} sims)

returns nothing, and asynchronously exports a .zip file from browser-memory, particularly an array of  multiple `single-market-robot-simulator,Simulation`s
is exported as a .zip file containing a directory for each Simulation, with files for the Simulatin config.json and data logs in .csv format.

## Example (from robot-trading-webapp: main.js)
 
     const saveZip    = require('single-market-robot-simulator-savezip');
     ...
     app.downloadData = function(){
         $('#downloadButton').prop('disabled',true);
	 setTimeout(function(){
              $('#downloadButton').prop('disabled',false);
         }, 60*1000);
         saveZip(sims);
     };
     ...
     $('#downloadButton').click(app.downloadData);

###Copyright

2016 Paul Brewer Economic and Financial Technology Consulting LLC

###License

MIT License

