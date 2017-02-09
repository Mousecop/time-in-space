var appState = {
  NASA_BASE_URL: 'https://api.nasa.gov/planetary/apod',
  data: [],
  mainInfo: true,
};
var NASA_BASE_URL = 'https://api.nasa.gov/planetary/apod';

function getNasaData(searchTerm, callback) {
  var query = {
    api_key: 'V5am4SFkNFMjACvm9UjIvNOQSOIIfktcKIeoIUp5',
    date: searchTerm //input: YYYY-MM-DD
  };
  $.getJSON(appState.NASA_BASE_URL, query, callback);
}

function callbackFunc(data) {
  console.log(data);
}

getNasaData("2013-03-23", callbackFunc);













/*
1)




*/
