function Map(latlng, zoom, options) {
  console.log("map initialized");

  // var marker;
  var mapDiv = document.getElementById('map');

  this.googleMap = new google.maps.Map(mapDiv, {
    center: latlng,
    zoom: zoom,
    options: options,
    draggable: true,
    mapTypeId: google.maps.MapTypeId.SATELLITE,
  });

  var map = this.googleMap;
  var zoomOutMax = 2;
  var zoomInMax = 6;

  google.maps.event.addListener(map, 'zoom_changed', function () {
    if (map.getZoom() > zoomInMax) map.setZoom(zoomInMax);
  });

  google.maps.event.addListener(map, 'zoom_changed', function () {
    if (map.getZoom() < zoomOutMax) map.setZoom(zoomOutMax);
  });

Map.prototype.addMarker = function(location) {
  if (marker) {
    marker.setPosition(location);
    return marker.position;
  } else {
    marker = new google.maps.Marker({
      position: location,
      map: map
    });
    return marker.position;
  }
}
setTimeout(function(){
  game = startGameOnButtonClick();

  google.maps.event.addListener(map, 'click', function(event) {
    console.log("clicked");
    game.kmOffTarget = game.checkDistance(Map.prototype.addMarker(event.latLng));
  }.bind(this));
}.bind(this), 2000);

var countries = JSON.parse(localStorage.getItem("countries_data"));
var marker = false;


var startGameOnButtonClick = function() {
  var arrayCountryCapitals = [];
  for (var i = 0; i < countries.length; i++){
    arrayCountryCapitals.push({
      country: countries[i].name,
      capital: countries[i].capital
    });
  }
  randomIndexValue = Math.floor(Math.random() * (arrayCountryCapitals.length - 1))
  randomCapital = arrayCountryCapitals[randomIndexValue].capital;
  randomCountry = arrayCountryCapitals[randomIndexValue].country;
  console.log(randomCapital);
  console.log(randomCountry);
  var game = new Game(arrayCountryCapitals[randomIndexValue].capital);
  game.targetCountry = arrayCountryCapitals[randomIndexValue].country;
  game.getTargetLatLng()
  return game;
};

}

var map;

function addTargetMarker (location) {
    targetMarker = new google.maps.Marker({
      position: location,
      map: map,
      visible: false
    });
  return targetMarker.position;
}