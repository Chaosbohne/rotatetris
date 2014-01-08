$(document).ready(function() {
  var url = document.URL;
  $('#currentUrl').html('<h4>Open <a href="' + url + '">' + url + '</a></h4>');
});