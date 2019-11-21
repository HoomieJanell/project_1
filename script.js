$(document).ready(function () {
  var apiKey = "eWIxuDJ59JLKMebO";
  var areaID;
  var queryURL = "https://api.songkick.com/api/3.0/search/locations.json?location=clientip" + "&apikey=" + apiKey + "&per_page=1&page=1";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    areaID = response.resultsPage.results.location[0].metroArea.id;
    // console.log(response);
    // console.log(areaID);
    queryURL = "https://api.songkick.com/api/3.0/metro_areas/" + areaID + "/calendar.json?apikey=" + apiKey + "&per_page=5";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      // console.log(response);
      // console.log(areaID);
      for (i = 0; i < response.resultsPage.results.event.length; i++) {
        var date = moment((response.resultsPage.results.event[i].start.date).replace(/-/g, '')).format("MMM Do YY");
        var title = response.resultsPage.results.event[i].performance[0].displayName;
        var subtitle = response.resultsPage.results.event[i].venue.displayName;
        $(".title" + i).text(title);
        $(".sub" + i).text(subtitle);
        $(".date" + i).text(date);
      }
    })
  })
});
