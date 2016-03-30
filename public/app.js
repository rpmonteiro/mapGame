function initialize() {
  var styles = [{
    'stylers': [{
      'visibility': 'off'
    }]
    }, {
    'featureType': 'landscape',
    'stylers': [{
      'visibility': 'on'
    }, {
      'color': '#f3f4f4'
    }]
    }, {
    'featureType': 'water',
    'stylers': [{
      'visibility': 'on'
    }, {
      'color': '#81D4FA'
    }]
    }, {
    'elementType': 'labels',
    'stylers': [{
      'visibility': 'off'
    }]
    }, {
    'featureType': 'landscape.man_made',
    'elementType': 'geometry',
    'stylers': [{
      'weight': 0.9
    }, {
      'visibility': 'off'
    }]
  }];

  var mapOptions = {
    disableDefaultUI: true,
    styles: styles
  };

  var initialZoom = 3;
  var initialMapCoordinates = {lat: 38.470794, lng: 6.679688};
  var map = new Map(initialMapCoordinates, initialZoom, mapOptions);
  $(".button-collapse").sideNav({
    menuWidth: 500
  });
}

window.onload = initialize;

$('select').material_select();
$('#modal1').openModal();
$('.modal-trigger').leanModal();
