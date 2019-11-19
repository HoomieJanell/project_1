$(document).ready(function(){

    var lat;
    var lng;
    getLocation();
    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
          x.innerHTML = "Geolocation is not supported by this browser.";
        }
      }
      
      function showPosition(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        console.log(lat);
        console.log(lng);

      }
      var queryURL = "https://api.songkick.com/api/3.0/search/locations.json?location=geo:"+lat+","+lng+"&apikey="+apiKey
      var apiKey = "eWIxuDJ59JLKMebO";
  
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
    })

});
