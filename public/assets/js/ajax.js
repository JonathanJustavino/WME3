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
      applyTableHeadClasses();
    },
    error:function(data){
      errorOccured();
    }
  })
);

$(document).ready(
  properties()
);

$('#add_submit').click(function(event){
  event.preventDefault()
  var id = $('country_filter_id').val();
  console.log(id);
  // $.ajax({
  //   type: 'GET',
  //   url: '/items' ,
  //   success:function(data){
  //     console.log(id);
  //   },
  //   error:function(data){
  //     console.log('nee');
  //   }
  // })
})

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


function showProperties(){
  var propValue = $('#prop_selection').val().replace(/ /g, "");
  var column = $('.' + propValue)
  for(var i = 0; i < column.length; i++){
    $(column[i]).show();
  }
};

function hideProperties(){
  var propValue = $('#prop_selection').val().replace(/ /g, "");
  var column = $('.' + propValue)
  for(var i = 0; i < column.length; i++){
    $(column[i]).hide();
  }
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
      var td = $('<td>' + value + '</td>').addClass(columnName.replace(/ /g, ""));
      tr.append(td);
    }
    table.append(tr);
  }
}

function applyTableHeadClasses(){
  var thead = $('#table_head').children();
  for(var i = 0; i < COUNTRY_COLUMN_KEYS.length; i++){
    thead[i].className = COUNTRY_COLUMN_KEYS[i].replace(/ /g, "");
  }
}

function errorOccured(){
  var table = $('table_body');
  var message = $('<tr><td>An Error has occured please try again later.</td></tr>');
}
