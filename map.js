function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        var x = document.getElementById("location");
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    var x = document.getElementById("location");
    // x.innerHTML = "Latitude: " + position.coords.latitude + 
    // "<br>Longitude: " + position.coords.longitude; 
    var latlon = position.coords.latitude + "," + position.coords.longitude;
    $("#map1").attr("w-latlong", latlon);

    $.ajax({
        type: "GET",
        url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlon + "&location_type=ROOFTOP&result_type=street_address&key=AIzaSyBn_L8TbQJ4cs6XmivU1duYOgX-ojkDK1c",
        dataType: "json",
        success: function(json) {
            console.log(json);
            var c = json.results[0].address_components[3].long_name;
            $("#map1").attr("w-city", c);
            console.log(c);

        }

    })


    // $.ajax({
    //   type:"GET",
    //   url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=ngKYGjzcV2SX5MIxtwyrTztf3GCREITJ&latlong="+latlon,
    //   async:true,
    //   dataType: "json",
    //   success: function(json) {
    //               console.log(json);
    //               var e = document.getElementById("events");
    //               e.innerHTML = json.page.totalElements + " events found.";
    //               showEvents(json);
    //               initMap(position, json);
    //            },
    //   error: function(xhr, status, err) {
    //               console.log(err);
    //            }
    // });

}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}


function showEvents(json) {
  for(var i=0; i<json.page.size; i++) {
    $("#events").append("<p>"+json._embedded.events[i].name+"</p>");
  }
}


function initMap(position, json) {
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    center: {lat: position.coords.latitude, lng: position.coords.longitude},
    zoom: 10
  });
  for(var i=0; i<json.page.size; i++) {
    addMarker(map, json._embedded.events[i]);
  }
}

function addMarker(map, event) {
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
    map: map
  });
  marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
  console.log(marker);
}




getLocation();