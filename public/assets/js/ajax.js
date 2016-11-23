//alert("No ajax calls implemented ;)");

var COUNTRY_COLUMN_KEYS = [
  'id',
  'name',
  'birth rate per 1000',
  'cell phones per 100',
  'children per woman',
  'electricity consumption per capita',
  'internet user per 100'
 ]

$(document).ready(
  $.ajax({
    type: 'GET',
    url: '/items',
    success:function(countries){
      fillTable(countries);
    },
    error:function(data){
      console.log('nee');
    }
  })
);


$('#add_submit').click(function(event){
  event.preventDefault()

  var id;
  $.ajax({
    type: 'GET',
    url: '/items' ,
    success:function(data){
      console.log(data);
    },
    error:function(data){
      console.log('nee');
    }
  })
})


function showProperties(){
  alert('showing the properties');
};

function hideProperties(){
  alert('hiding the properties');
};

function addCountry(){
  alert('added the country');
};

function deleteCountry(){
  alert('deleted the country');
};

function fillTable(countries){
  var table = $('#table_body');
  table.empty();
  for (var rowidx = 0; rowidx < countries.length; rowidx++) {
    var tr = $('<tr>');
    for(var colidx = 0; colidx < COUNTRY_COLUMN_KEYS.length; colidx++){
      var columnName = COUNTRY_COLUMN_KEYS[colidx];
      var country = countries[rowidx];
      var value = country[columnName];
      tr.append('<td>' + value + '</td>')
    }
    table.append(tr);
  }
}
