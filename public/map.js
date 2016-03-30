function Map(latlng, zoom, options) {
  var mapDiv = document.getElementById('map');

  this.googleMap = new google.maps.Map(mapDiv, {
    center: latlng,
    zoom: zoom,
    options: options,
    mapTypeId: google.maps.MapTypeId.SATELLITE
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

  var strictBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(85, -180),           // top left corner of map
    new google.maps.LatLng(-85, 180)            // bottom right corner
  );

}