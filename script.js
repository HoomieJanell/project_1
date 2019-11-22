$(document).ready(function () {
 //Start 5 day
  // var apiKey = "eWIxuDJ59JLKMebO";
  // var areaID;
  // var queryURL = "https://api.songkick.com/api/3.0/search/locations.json?location=clientip" + "&apikey=" + apiKey + "&per_page=1&page=1";
  // $.ajax({
  //   url: queryURL,
  //   method: "GET"
  // }).then(function (response) {
  //   areaID = response.resultsPage.results.location[0].metroArea.id;
  //   // console.log(response);
  //   // console.log(areaID);
  //   queryURL = "https://api.songkick.com/api/3.0/metro_areas/" + areaID + "/calendar.json?apikey=" + apiKey + "&per_page=5";
  //   $.ajax({
  //     url: queryURL,
  //     method: "GET"
  //   }).then(function (response) {
  //     // console.log(response);
  //     // console.log(areaID);
  //     for (i = 0; i < response.resultsPage.results.event.length; i++) {
  //       var date = moment((response.resultsPage.results.event[i].start.date).replace(/-/g, '')).format("MMM Do YY");
  //       var title = response.resultsPage.results.event[i].performance[0].displayName;
  //       var subtitle = response.resultsPage.results.event[i].venue.displayName;
  //       $(".title" + i).text(title);
  //       $(".sub" + i).text(subtitle);
  //       $(".date" + i).text(date);
  //     }
  //   })
  // })
  //End 5 day
  var urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get('key'));
  searchResults();
function searchResults(keyword){
  var apikey = "ngKYGjzcV2SX5MIxtwyrTztf3GCREITJ"
  $.ajax({
    method:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?keyword="+ keyword + "&city=a  ustin"+"&apikey=" + apikey,
    success: function(response) {
                console.log(response);
                console.log((response._embedded.events).length);
                // Parse the response.
                // Do other things.
                var resultsTitle = $("<h1>").text("Results for: "+ $("#searchbar").val());
                resultsTitle.attr("id", "resultsTitle");
                $("#results").append(resultsTitle);
                for (i = 0; i < (response._embedded.events).length; i++){
                  var result = $("<h1>").text(response._embedded.events[i].name);
                  result.attr("id", "resultRow");
                  $("#results").append(result);
                }
             },
    error: function(xhr, status, err) {
                // This time, we do not end up here!
                var resultsTitle = $("<h1>").text("No Results for: "+ $("#searchbar").val());
                resultsTitle.attr("id", "resultsTitle");
                $("#results").append(resultsTitle);
             }
  });
}
$("#searchbutton").on("click", function(event){
  console.log("cndfsdv");
  console.log(window.location.href)

  if (window.location.href === "file:///C:/Users/jpellow/bootcamp/project_1/results.html"){
    console.log("if")

    var searchTerm = $("#searchbar").val();
    searchResults(searchTerm);
  }
  else{
    console.log("else")
    var searchTerm = $("#searchbar").val();
    event.preventDefault();
    window.location.href = "file:///C:/Users/jpellow/bootcamp/project_1/results.html?key="+searchTerm;
    console.log("dfvsdvsdfv");
    searchResults(searchTerm);
  }

})
});
