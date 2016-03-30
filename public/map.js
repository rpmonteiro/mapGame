function Map(latlng, zoom) {
  var mapDiv = document.getElementById('map');

  this.googleMap = new google.maps.Map(mapDiv, {
    center: latlng,
    zoom: zoom
  });

  this.addMarker = function(coordinates, label, title) {
    var marker = new google.maps.Marker({
      position: coordinates,
      map: this.googleMap,
      label: label,
      title: title
    });
    return marker;
  }

  this.bindClick = function() {
    google.maps.event.addListener(this.googleMap, 'click', function(event) {
      coordinates = {lat: event.latLng.lat(), lng: event.latLng.lng()};
      this.addMarker(coordinates);
    }.bind(this));
  }

}