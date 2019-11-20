$(document).ready(function(){

    var lat;
    var lng;
    // getLocation();
    // function getLocation() {
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(showPosition);
    //     } else { 
    //       x.innerHTML = "Geolocation is not supported by this browser.";
    //     }
    //   }
      
      // function showPosition(position) {
      //   lat = position.coords.latitude;
      //   lng = position.coords.longitude;
      //   console.log(lat);
      //   console.log(lng);

      // }
      var apiKey = "eWIxuDJ59JLKMebO";
      var areaID;

      // var queryURL = "https://api.songkick.com/api/3.0/search/locations.json?location=geo:"+lat+","+lng+"&apikey="+apiKey;
      var queryURL = "https://api.songkick.com/api/3.0/search/locations.json?location=clientip"+"&apikey="+apiKey+"&per_page=1&page=1";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        areaID = response.resultsPage.results.location[0].metroArea.id;
        console.log(areaID);
        queryURL = "https://api.songkick.com/api/3.0/metro_areas/" + areaID + "/calendar.json?apikey=" + apiKey+"&per_page=5";
        $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function(response){
          console.log(response);
          console.log(areaID);
          for(i=0;i < response.resultsPage.results.event.length; i++){
            $(".title"+i).text(response.resultsPage.results.event[i].performance[0].displayName);
            $(".sub"+i).text(response.resultsPage.results.event[i].venue.displayName);

          }
      })
    
    })
    // queryURL = "https://api.songkick.com/api/3.0/metro_areas/9179/calendar.json?apikey=eWIxuDJ59JLKMebO";
  //   $.getJSON("https://api.ipify.org/?format=json", function(e) {
  //     console.log(e.ip);
  //     var ip = e.ip;
  // });
});
