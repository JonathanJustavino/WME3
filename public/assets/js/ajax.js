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
      properties();
    },
    error:function(countries){
      errorOccured();
    }
  })
);


$('#add_submit').click(function(event){
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
      dataType: 'json',
      success:function(countries){
        fillTable(countries);
      },
      error:function(countries){
        errorOccured();
      }
    })
})


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


function applyTableHeadClasses(){
  var thead = $('#table_head').children();
  for(var i = 0; i < COUNTRY_COLUMN_KEYS.length; i++){
    thead[i].className = COUNTRY_COLUMN_KEYS[i].replace(/ /g, "");
  }
};


function errorOccured(){
  var table = $('table_body');
  var message = $('<tr><td>An Error has occured please try again later.</td></tr>');
};
