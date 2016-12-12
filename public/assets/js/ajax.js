/**
 * Country Table Identifier
 * @type {Array}
 */
var COUNTRY_COLUMN_KEYS = [
  'id',
  'name',
  'birth rate per 1000',
  'cell phones per 100',
  'children per woman',
  'electricity consumption per capita',
  'internet user per 100'
 ]

/**
 * Default Method for initial website call
 */
$(document).ready(
  loadAllCountries
);

/**
 * filtering the countries for a specific id
 * or for an id range
 * @type {countries}
 */
$('#filter_submit').click(function(event){
  event.preventDefault()
  var id = $('#country_filter_id')[0].value;
  var idRange = $('#country_filter_range')[0].value.split('-');
  if(id.length === 0 && idRange.length === 0){
    alert('Nothing happened');
    return;
  }
  if(id.length !== 0){
    $.ajax({
      type: 'GET',
      url: '/items/' + id,
      success:function(countries){
        fillTable([countries]);
      },
      error:function(countries){
        errorOccured();
      }
    })
    return;
  }
  $.ajax({
      type: 'GET',
      url: '/items/' + idRange[0] + '/' + idRange[1],
      success:function(countries){
        fillTable(countries);
      },
      error:function(countries){
        errorOccured;
      }
  })
})

/**
 * adding a country to the table
 * @type {[type]}
 */
$('#add_submit').click(function(event){
  event.preventDefault();
  var name = $('#country_name').val();
  var birthRate = parseFloat($('#country_birth').val());
  var cellphone = parseFloat($('#country_cellphone').val());
  var country = {
    "name": name,
    "birth rate per 1000": birthRate,
    "cell phones per 100": cellphone,
    "children per woman": Math.random() * 2000,
    "electricity consumption per capita": Math.random() * 2000,
    "gdp_per_capita": Math.random() * 2000,
    "gdp_per_capita_growth": Math.random() * 2000,
    "inflation annual": Math.random() * 2000,
    "internet user per 100": Math.random() * 2000,
    "life expectancy": Math.random() * 2000,
    "military expenditure percent of gdp": Math.random() * 2000,
    "gps_lat": Math.random() * 2000,
    "gps_long": Math.random() * 2000
  }
  console.log(birthRate);
  $.ajax({
    type: 'POST',
    url: '/items',
    data: JSON.stringify(country),
    contentType: "application/json; charset=utf-8",
    success:function(countries){
      console.log(country);
      loadAllCountries();
    },
    error:function(){
      console.log('didnt work');
    }
  })
})

/**
 * returning all properties
 * @return {properties}
 */
function properties(){
  $.ajax({
    type: 'GET',
    url: '/properties',
    success:function(properties){
      var select = $('#prop_selection');
      select.empty();
      for (var i = 0; i < properties.length; i++) {
          var element = $('<option>' + properties[i] + '</option>');
          select.append(element);
        }
      }
  })
}

/**
 * making the the table columns visible via css
 * @return {void}
 */
function showProperties(){
  var propValue = $('#prop_selection').val().replace(/ /g, "");
  var column = $('.' + propValue)
  for(var i = 0; i < column.length; i++){
    $(column[i]).show();
  }
};

/**
 * making the the table columns invisible via css
 * @return {void}
 */
function hideProperties(){
  var propValue = $('#prop_selection').val().replace(/ /g, "");
  var column = $('.' + propValue)
  for(var i = 0; i < column.length; i++){
    $(column[i]).hide();
  }
};

/**
 * adding a country
 */
function addCountry(){
  var name = $('#country_name').val();
  var brithRate = $('#country_birth').val();
  var cellphone = $('#country_cellphone').val();

  $.ajax({
    type: 'POST',
    url: '/items',
    data: {"name": name, "brithRate": birthRate, "cellphone": cellphone},
    success:function(countries){
      console.log(data);
      // fillTable(countries);
    },
    error:function(){

    }
  })
};

/**
 * removing the last country
 * or a country specified by its id
 * @type {void}
 */
$('#rm_submit').click(function(event){
  event.preventDefault();
  var countryID = $('#country_delete_id').val();
  var request = '/items'
  if(countryID.length !== 0){
    request += '/' + countryID
    console.log(request);
  }
  $.ajax({
    type: 'DELETE',
    url: request,
    success:function(res){
      loadAllCountries();
    },
    error:function(res){
      errorOccured();
    }
  })
})

/**
 * loading all countries via ajax
 * @return {countries}
 */
function loadAllCountries(){
  $.ajax({
    type: 'GET',
    url: '/items',
    success:function(countries){
      fillTable(countries);
      applyTableHeadClasses();
      properties();
    },
    error:function(countries){
      errorOccured();
    }
  })
}

/**
 * filling the html table with countries
 * @param  {json} countries [the countries which should be displayed]
 * @return {void}
 */
function fillTable(countries){
  var table = $('#table_body');
  table.empty();
  for (var rowidx = 0; rowidx < countries.length; rowidx++) {
    var tr = $('<tr>');
    for(var colidx = 0; colidx < COUNTRY_COLUMN_KEYS.length; colidx++){
      var columnName = COUNTRY_COLUMN_KEYS[colidx];
      var country = countries[rowidx];
      var value = country[columnName];
      var td = $('<td>' + value + '</td>').addClass(columnName.replace(/ /g, ""));
      tr.append(td);
    }
    table.append(tr);
  }
};

/**
 * applying css classes from the json properties
 * @return {void}
 */
function applyTableHeadClasses(){
  var thead = $('#table_head').children();
  for(var i = 0; i < COUNTRY_COLUMN_KEYS.length; i++){
    thead[i].className = COUNTRY_COLUMN_KEYS[i].replace(/ /g, "");
  }
};

/**
 * error function for ajax
 */
function errorOccured(){
  var table = $('table_body');
  var message = $('<tr><td>An Error has occured please try again later.</td></tr>');
};
