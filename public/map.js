function Map(latlng, zoom, options) {
  var marker;
  var mapDiv = document.getElementById('map');

  this.googleMap = new google.maps.Map(mapDiv, {
    center: latlng,
    zoom: zoom,
    options: options,
    draggable:false,
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

  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng);
  });

  function addMarker(location) {
    if (marker) {
      marker.setPosition(location);
    } else {
      marker = new google.maps.Marker({
        position: location,
        map: map
      });
    }
  }


  // this.guessMarker = function() {
  //   google.maps.event.addListener(map, 'click', function(event) {
  //     console.log('I got clicked');
  //     var coordinates = {
  //       lat: event.latLng.lat(),
  //       lng: event.latLng.lng()
  //     }

  //     this.marker = new google.maps.Marker({
  //       position: coordinates,
  //       map: this.map
  //     })
  //   }.bind(this))
  // }

  // map.setOptions({draggable: false});

}