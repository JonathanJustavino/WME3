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
  // console.log(jsonFile);
  console.log('parsed csv');
});

//read from file
require("fs").createReadStream("./world_data.csv").pipe(converter);


/**************************************************************************
********************** handle HTTP METHODS ********************************
**************************************************************************/

/*******************************Get Requests*******************************/

/**
 * returning all items from the jsonFile
 * @type {GET}
 */
app.get('/items', function(req, res){
  res.send(jsonFile);
});

/**
 * get request with an id
 * @type {GET}
 */
app.get('/items/:id', function(req, res){
  var id = req.params.id;
  if(id > jsonFile.length){
      res.send('No such id: ' + id + ' in database');
  }
  if(id == jsonFile[id-1].id){
    res.send(jsonFile[id-1]);
  }
});

/**
 * get request for a range between two ids
 * @type {GET}
 */
app.get('/items/:id1/:id2', function(req, res){
    var id1 = req.params.id1;
    var id2 = req.params.id2;

    if(id1 > jsonFile.length || id2 > jsonFile.length || parseInt(req.params.id1) > parseInt(req.params.id2)){
      res.send({status: 'Range not possible!'});
      return;
    }

    var items = [];
    for(var i = 0; i < jsonFile.length; i++){
      var fileID = jsonFile[i].id;
      if(id1 <= fileID && id2 >= fileID){
        items.push(jsonFile[i]);
      }
    }
    res.send(items);
});

/**
 * get request for all properties
 * @type {GET}
 */
app.get('/properties', function(req, res){
  var props = [];
  for (var key in jsonFile[0]) {
    if (jsonFile[0].hasOwnProperty(key)) {
      props.push(key);
    }
  }
  res.send(props);
});


/**
 * get request for the n-th property
 * @type {GET}
 */
app.get('/properties/:num', function(req, res){
  var props = [];
  for (var key in jsonFile[0]) {
    if (jsonFile[0].hasOwnProperty(key)) {
      props.push(key);
    }

  }
  if(req.params.num > props.length){
    res.send('No such property available!');
  }
  res.send(props[req.params.num]);
});


/******************************Post Requests******************************/
/**
 * post request for adding a country
 * @type {POST}
 */
app.post('/items', function(req, res){
  req.body.id = getMaxID() + 1;
  console.log(req.body);
  jsonFile.push(req.body);
  res.send({status: 'Added country ' + req.body.name + ' to list'});
});

/**
 * retrieving the highest id from the country
 * @return {maxID}
 */
function getMaxID(){
  var maxID = 0;
  for(var i = 0; i < jsonFile.length; i++){
    if(jsonFile[i].id > maxID){
      maxID = jsonFile[i].id;
    }
  }
  return maxID;
}

/*****************************Delete Requests*****************************/

/**
 * Deletes the last element of the array
 * @type {DELETE}
 */
app.delete('/items', function(req, res){
  var deleted = jsonFile.pop();
  res.status(200).send('Deleted last country: ' + deleted.name + '!');
});

/**
 * Deleting an element by the id
 * @type {DELETE}
 */
app.delete('/items/:id', function(req, res){
  var id = parseInt(req.params.id);
  if(id > jsonFile.length || jsonFile[id-1].id !== id){
    res.send({status: 'No such id ' + id + ' in database'});
    return;
  }
  for(var i = 0; i < jsonFile.length; i++){
    if(id === jsonFile[i].id){
      jsonFile.splice(i, 1);
    }
  }
  res.send({status: 'Item ' + id + ' deleted successfully'});

});





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
