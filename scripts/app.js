// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var monthly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

$(document).ready(function() {
  console.log("Let's get coding!");
  // CODE IN HERE!
    $.ajax({
      method: "GET",
      url: weekly_quakes_endpoint,
      data: $("form").serialize(),
      success: onSuccess,
      error: onError
    });

    function onSuccess(json) {
      var currentTime = Date.now();

      for (var i=0; i<json.features.length; i++) {
        var timeDiff = Math.ceil((currentTime - json.features[i].properties.time)/60/60/1000);
        $("#info").append('<p>'+json.features[i].properties.title.split(" of ")[1]+" -- "+timeDiff+" hrs ago"+'</p>');

      // json.data.forEach(function(title,i)) {
      //   $(".quake_titles").append($("<h2>"+'+json.features[i].properties.title+'</h2>');

    }
};
    function onError(xhr, status, errorThrown) {
      alert("Sorry, there was a problem!");
      console.log("Error: " + errorThrown);
      console.log("Status: " + status);
      console.dir(xhr);
    }

    $.ajax({
      method: "GET",
      url: weekly_quakes_endpoint,
      data: $("form").serialize(),
      success: initMap,
      error: onError
    });

    var map;
    function initMap(json) {
          map = new google.maps.Map(document.getElementById('map'), {
            zoom: 2,
            center: new google.maps.LatLng(2.8, -187.3),
          // zoom: coords[2],
          // center: new google.maps.LatLng(coords[0], coords[1]),
          mapTypeId: 'terrain'
        });


      var icon = {
            url: 'images/earthquake.png',
            scaledSize: new google.maps.Size(20, 20),
        }

      for (var i=0; i<json.features.length; i++) {
        var coords = json.features[i].geometry.coordinates;
        var latLng = new google.maps.LatLng(coords[1],coords[0]);
        var marker = new google.maps.Marker({
          position: latLng,
          icon: icon,
          map: map
        });
      }

    };
  })
