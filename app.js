// DO NOT CHANGE!
//init app with express, util, body-parser, csv2json
var express = require('express');
var app = express();
var sys = require('util');
var path = require('path');
var bodyParser = require('body-parser');
var Converter = require("csvtojson").Converter;
var jsonFile = {};

//register body-parser to handle json from res / req
app.use( bodyParser.json() );

//register public dir to serve static files (html, css, js)
app.use( express.static( path.join(__dirname, "public") ) );

// END DO NOT CHANGE!


/**************************************************************************
****************************** csv2json *********************************
**************************************************************************/
//Converter Class
var converter = new Converter({});

//end_parsed will be emitted once parsing finished
converter.on("end_parsed", function(jsonArray){
   jsonFile = jsonArray;
  //the parsed jsonArray
  console.log(jsonFile);
});

//read from file
require("fs").createReadStream("./world_data.csv").pipe(converter);


/**************************************************************************
********************** handle HTTP METHODS ***********************
**************************************************************************/
/**
 * returning all items from the jsonFile
 */
app.get('/items', function(req, res){
  res.send(jsonFile);
});

/**
 * searching for a given id in the jsonFile
 */
app.get('/items/:id', function(req, res){
  var id = req.params.id;
  if(id > jsonFile.length){
      res.send('No such id ' + id + ' in database');
  }
  if(id == jsonFile[id-1].id){
    res.send(jsonFile[id-1]);
  }

});


//returning only one country specified by the id




/**************************************************************************
***************************************************************************
**************************************************************************/


// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
