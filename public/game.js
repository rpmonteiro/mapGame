var Game = function(targetCity){
  this.score = 0;
  this.targetCity = targetCity || "Paris"
  this.targetCountry;
  this.targetLatLng;
  this.kmOffTarget;
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
  }.bind(this); // request.onload end
};


Game.prototype.checkDistance = function(clickedLatLng){
  console.log(this.targetLatLng);
  console.log(clickedLatLng);
  var metresAway = google.maps.geometry.spherical.computeDistanceBetween(this.targetLatLng, clickedLatLng);
  console.log(metresAway/1000, "km from target");
  this.kmOffTarget = (metresAway / 1000);
  return this.kmOffTarget;
}