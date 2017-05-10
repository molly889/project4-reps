$(document).ready(function () {
  // everything goes below this!
$('.error').hide();
  // set up our apiURL and our apiKey - you will want to
  // replace this with your own key
  var apiurl = "https://cors-anywhere.herokuapp.com/http://congress.api.sunlightfoundation.com/legislators/";
  var searchurl = apiurl + 'locate?zip=';

  // create a function for if our ajax call succeeds :) !
  // we use the var functionName = function(){} format
  // this is ALMOST the same as doing
  // function updatePage(resp){}
  // but has some implications with regards to scope
  // http://stackoverflow.com/questions/336859/var-functionname-function-vs-function-functionname

  var updatePage = function updatePage(resp) {
    console.log(resp.results);
    $.each(resp.results, function (key, rep) {
      var printOut = '<div class="representative"><h3>' + rep.first_name + ' ' + rep.last_name + '</h3>';
      printOut += '<ul>';
      printOut += '<li>'+rep.gender+'</li>';
      printOut += '<li>'+rep.oc_email+'</li>';
      printOut += '<li>'+rep.party+'</li>';
      printOut += '<li>'+rep.phone+'</li>';
      printOut += '<li>'+rep.state_name+'</li>';
      printOut += '</ul></div>';
        if (rep.party == "R") {
          $('.rep').append(printOut)
     } else if (rep.party == "D"){
       $('.dem').append(printOut);
        }
    });
  };

  // create a function for if our ajax call fails :( !
  var ajaxFailed = function ajaxFailed(req, status, err) {
    console.log('something went wrong', status, err);
  };

  // set up the ajax options!
  var ajaxOptions = {
    url: apiurl,
    dataType: 'json',
    success: updatePage,
    error: ajaxFailed
  };

  // set up the ajax options!
  var ajaxSearchOptions = {
    url: searchurl,
    dataType: 'json',
    success: updatePage,
    error: ajaxFailed
  };

  $('button').click(function () {
    var searchterm = $('input').val();
    if(searchterm.length == 5) {
        console.log("it is zip");
        $('.error').hide();
    } else {
      console.log("it is not");
      $('.error').show();
    }
    console.log(searchterm);
    $('.content').empty();
    ajaxSearchOptions.url = searchurl + searchterm ;
    $.ajax(ajaxSearchOptions);

  });
  // now, the good stuff!  Run the ajax call!
  $.ajax(ajaxOptions);


  // and above this!  Don't delete anything below here!
});
