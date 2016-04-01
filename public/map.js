function Map(latlng, zoom, options) {
  console.log("map object created");

  var mapDiv = document.getElementById('map');

  this.marker = null;
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

}//Map constructor end

Map.prototype = {
  addMarker: function(location) {
    if (this.marker) {
      this.marker.setPosition(location);
      return this.marker.position;
    }
    else {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.googleMap
      });
      return this.marker.position;
    }
  },
  addTargetMarker: function(location){
      targetMarker = new google.maps.Marker({
        position: location,
        map: this.googleMap,
        visible: false
      });
    return targetMarker.position;
  }
};//prototype methods definition end