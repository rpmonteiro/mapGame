window.onload = function() {
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
  //map settings end here - map constructed with other vital variables, after element selection and event listeners in the following section

  var startGameUserName = document.getElementById('setPlayerName');
  var userNameButton = document.getElementById('popupButton');
  var startGameButton = document.getElementById('startGameButton');
  var submitAnswerButton = document.getElementById('submitAnswer');
  var gameOverMessage = document.getElementById('gameOverMessage');
  var finalResultMessage = document.getElementById('finalResultMessage');
  var cardPanel = document.getElementById('cardPanel');

  var userName = "Player"

  userNameButton.addEventListener('click', function(){
    console.log('userNameButton got clicked');
    userName = document.getElementById('userName').value
    startGameUserName.innerHTML = "Let's do this, " + userName + "!";
    $('.button-collapse').sideNav('show');
  });

  submitAnswerButton.addEventListener('click', function() {
    console.log(userName);
    gameOverMessage.innerText = "Congratulations, " + userName + "! You suck.";
    finalResultMessage.innerText = "Your guess was so, so far away... exactly " + Math.floor(game.kmOffTarget) + " km. Buy yourself a little globe and study it.";
  });

  startGameButton.addEventListener('click', function() {
    console.log("startGame button clicked");
    $('.button-collapse').sideNav('show');
    cardPanel.removeAttribute("style");
    document.getElementById('gameText').innerText = "Find the capital of " + game.targetCountry + " - " + game.targetCity;
  });

  $(".button-collapse").sideNav({
    menuWidth: 500
  });
  $('select').material_select();
  $('#modal1').openModal();
  $('.modal-trigger').leanModal();
  // html element selection & listeners end

  var mapObject = new Map(initialMapCoordinates, initialZoom, mapOptions);

  var countries = JSON.parse(localStorage.getItem("countries_data"));

  var initGame = function(){
    var game = new Game(mapObject, "easy" , countries);
    return game;
  }

  var game;

  if (countries){
    console.log("localStorage countries data found");
    game = initGame();
  };

  if (!countries){
    console.log("local countries not found");
    var url = "http://restcountries.eu/rest/v1";
    var request = new XMLHttpRequest;
    request.open("GET", url);
    request.send();
    request.onload = function(){
      if (request.status === 200){
        console.log("api GET successful");
        countries = JSON.parse(request.responseText);
        localStorage.setItem("countries_data", JSON.stringify(countries));
        game = initGame();
      };
    };
  };

  if (game && countries && mapObject){
    console.log("vital vars created successfully");
  };

  var difficultyDropDown = document.getElementById("difficulty-drop-down");

  difficultyDropDown.onchange = function(e){
    game.updateDifficulty(this.value);
    console.log(this.value);
  };

  google.maps.event.addListener(mapObject.googleMap, 'click', function(event) {
    console.log("clicked map");
    mapObject.addMarker(event.latLng);
    game.calcDistance(event.latLng);
    submitAnswerButton.disabled = false;
      // game.kmOffTarget = game.checkDistance(mapObject.addMarker(event.latLng));
    })

  google.maps.event.addListenerOnce(mapObject.googleMap, 'idle', function(){
    //runs when map fully loaded and goes to idle state
    console.log("google map loaded");
  });


};// window.onload