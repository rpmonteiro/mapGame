function initialize() {
  var googleMap;
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
  googleMap = new Map(initialMapCoordinates, initialZoom, mapOptions);
  dragMap = googleMap;
  $(".button-collapse").sideNav({
    menuWidth: 500
  });
  $('select').material_select();
  $('#modal1').openModal();
  $('.modal-trigger').leanModal();
}

window.onload = initialize;





// GameStarts
// map.setOptions({draggable: true});
// var cardPanel = getElementById('card-panel');
// cardPanel.style.visibility = 'visible';
// $('.button-collapse').sideNav('show');
// Get userName


var userName;
var startGameUserName = document.getElementById('setPlayerName');
var userNameButton = document.getElementById('popupButton');
var startGameButton = document.getElementById('startGameButton');

userNameButton.addEventListener('click', function(){
  console.log('userNameButton got clicked');
  userName = document.getElementById('userName').value
  startGameUserName.innerHTML = "Let's do this, " + userName + "!";
  $('.button-collapse').sideNav('show');
})

startGameButton.addEventListener('click', function() {
  $('.button-collapse').sideNav('show');
  document.getElementById('cardPanel').removeAttribute("style");;
  console.log(cardPanel);
  dragMap.setOptions({draggable: true});
})