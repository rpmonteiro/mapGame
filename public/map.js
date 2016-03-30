function Map(latlng, zoom, options) {
  var mapDiv = document.getElementById('map');

  this.googleMap = new google.maps.Map(mapDiv, {
    center: latlng,
    zoom: zoom,
    options: options
  });

  this.googleMap.setMapTypeId(google.maps.MapTypeId.SATELLITE);

}