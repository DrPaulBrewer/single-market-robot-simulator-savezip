/* Copyright 2016 Paul Brewer, Economic and Financial Technology Consulting LLC */
/* This file is open source software.  The MIT License applies to this software. */

/* jshint browserify:true,jquery:true,esnext:true,eqeqeq:true,undef:true,lastsemic:true,strict:true,unused:true */

const JSzip = require('jszip');
const Study = require('single-market-robot-simulator-study');
const saveAs = require('filesaver.js-npm')
  .saveAs;

// see http://stackoverflow.com/a/7220510/103081 by http://stackoverflow.com/users/27862/user123444555621 for pretty printed stringify

module.exports = function savezip(_obj) {
  "use strict";
  var config = _obj.config,
    sims = _obj.sims,
    download = _obj.download;
  if ((!config) || !(Array.isArray(sims)))
    throw new Error("single-market-robot-simulator-savezip: no config or sims to save");
  var stamp = Study.myDateStamp();
  var zip = new JSzip();
  config.zipfileName = stamp;
  config.zipfileDate = Date.now();
  zip.folder(stamp)
    .file("config.json", JSON.stringify(config, null, 2));
  sims.forEach(function (sim, i) {
    var folder = zip.folder(stamp)
      .folder(Study.pad(i));
    var logs = sim.logs;
    var logNames = Object.keys(logs);
    logNames.forEach(function (L) {
      folder.file(L + ".csv", logs[L].toString());
    });
    delete sim.logs;
    folder.file("sim.json", JSON.stringify(sim.config, null, 2));
    sim.logs = logs;
  });
  return (zip
    .generateAsync({ type: "blob", compression: "DEFLATE" })
    .then(function (blob) {
      if (download) saveAs(blob, stamp + ".zip");
      return blob;
    })
  );
};
