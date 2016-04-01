var Game = function(map, difficulty, countriesData){

  console.log("game object created");
  this.countries = countriesData;
  this.mapObject = map
  this.score = 0;
  this.targetCity = "Paris"
  this.targetCountry = "France"
  this.targetLatLng;
  this.kmOffTarget;
  this.difficulty = difficulty || "easy";
  this.filteredCountries;
  console.log(this.difficulty);

  //initial filtered arrau
  this.filteredCountries = this.filterByDifficulty(this.difficulty);
  this.getTargetPlace();


}//Game constructor end
Game.prototype = {
  getTargetPlace: function(){
    var randomIndexValue = Math.floor(Math.random() * (this.filteredCountries.length))
    this.targetCity = this.filteredCountries[randomIndexValue].capital;
    this.targetCountry = this.filteredCountries[randomIndexValue].name;
    this.getTargetLatLng();
  },
  getTargetLatLng: function(){
    var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + this.targetCity + "%20" + this.targetCountry;
    var request = new XMLHttpRequest;
    request.open("GET", url);
    request.send();
    request.onload = function(){
      if (request.status === 200){
        console.log("co-ords gmaps api GET successful");
        response = JSON.parse(request.responseText);
        console.log(response);
        console.log(response.results[0].geometry.location);
        this.targetLatLng = this.mapObject.addTargetMarker(response.results[0].geometry.location);
      }; // if request status 200 end
    }.bind(this); // request.onload end
  },
  calcDistance: function(clickedLatLng){
    console.log("target", this.targetLatLng);
    console.log("clicked position:", clickedLatLng);
    var metresAway = google.maps.geometry.spherical.computeDistanceBetween(this.targetLatLng, clickedLatLng);
    console.log(metresAway/1000, "km from target");
    this.kmOffTarget = (metresAway / 1000);
    return this.kmOffTarget;
  },
  updateDifficulty: function(newDifficulty){
    this.difficulty = newDifficulty;
    console.log(this.difficulty);
    this.filteredCountries = this.filterByDifficulty(this.difficulty);
    this.getTargetPlace();
  },
  filterByDifficulty: function(difficulty){
    this.countries.sort(function(a, b){
      return a.population - b.population;
    });
    populationsArray = this.countries.map(function(curr, i){
      return curr.population
    }.bind(this));

    var getPercentile = function(arrayOfNums, percent){
      var index = Math.ceil(arrayOfNums.length * (percent/100))
      percentile = arrayOfNums[index];
      return percentile;
    }

    var sixtySixthPercentile = getPercentile(populationsArray,  66);
    var thirtyThirdPercentile = getPercentile(populationsArray, 33);

    var easyArray = [];
    for (var i = 0; i < this.countries.length; i++){
      if (this.countries[i].population >= sixtySixthPercentile){
        easyArray.push(this.countries[i]);
      };
    };

    var mediumArray = [];
    for (var i = 0; i < this.countries.length; i++){
      if (this.countries[i].population < sixtySixthPercentile && this.countries[i].population > thirtyThirdPercentile){
        mediumArray.push(this.countries[i]);
      };
    };

    var hardArray = [];
    for (var i = 0; i < this.countries.length; i++){
      if (this.countries[i].population < thirtyThirdPercentile){
        hardArray.push(this.countries[i]);
      };
    };

    difficultyFilterObject = {
      easy: easyArray,
      medium: mediumArray,
      hard: hardArray
    };
    return difficultyFilterObject[difficulty];
  }
};//prototype methods definition end