var Game = function(targetCity){
  this.score = 0
  this.targetCity = targetCity || "Paris"
  this.targetCountry
  this.targetLatLng
  this.kmOffTarget
}

Game.prototype.getTargetLatLng = function(){
  var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + this.targetCity + "%20" + this.targetCountry;
  var request = new XMLHttpRequest;
  request.open("GET", url);
  request.send();
  request.onload = function(){
    if (request.status === 200){
      console.log("api GET successful");
      response = JSON.parse(request.responseText);
      this.targetLatLng = addTargetMarker(response.results[0].geometry.location);
    }; // if request status 200 end
  }.bind(this);
};


Game.prototype.checkDistance = function(clickedLatLng){
  console.log(this.targetLatLng);
  console.log(clickedLatLng);
  var metresAway = google.maps.geometry.spherical.computeDistanceBetween(this.targetLatLng, clickedLatLng);
  console.log(metresAway/1000, "km from target");
  this.kmOffTarget = (metresAway / 1000)
  return kmOffTarget;
}

// var game = new Game;

// place1 = {lat: 44, lng: 44};
// place2 = {lat: 46, lng: 46};

// kmAway = game.checkDistance(place1, place2);

// console.log(kmAway);

// maps.googleapis.com/maps/api/geocode/json?address=CityName

// object.results[0].geometry.location