var appState = {
  NASA_BASE_URL: 'https://api.nasa.gov/planetary/apod',
  dataArr: [{
    "date": "2017-02-09",
    "explanation": "Peering from the shadows, the Saturn-facing hemisphere of tantalizing inner moon Enceladus poses in this Cassini spacecraft image. North is up in the dramatic scene captured last November as Cassini's camera was pointed in a nearly sunward direction about 130,000 kilometers from the moon's bright crescent. In fact, the distant world reflects over 90 percent of the sunlight it receives, giving its surface about the same reflectivity as fresh snow. A mere 500 kilometers in diameter, Enceladus is a surprisingly active moon. Data collected during Cassini's flybys and years of images have revealed the presence of remarkable south polar geysers and a possible global ocean of liquid water beneath an icy crust.",
    "hdurl": "http://apod.nasa.gov/apod/image/1702/PIA20522enceladus.jpg",
    "media_type": "image",
    "service_version": "v1",
    "title": "Crescent Enceladus",
    "url": "http://apod.nasa.gov/apod/image/1702/PIA20522enceladusC.jpg"
    }],
  datePicker: true,
  submitButton: true,
  infoButton: false,
  newDate: false,
  title: true
};

function getNasaData(searchTerm, callback) {
  var query = {
    api_key: 'V5am4SFkNFMjACvm9UjIvNOQSOIIfktcKIeoIUp5',
    date: searchTerm //input: YYYY-MM-DD
  };
  $.getJSON(appState.NASA_BASE_URL, query, callback);
}



function addData(state, data) {
  state.dataArr[0] = data;
  console.log(state.dataArr);
}

function titleState(state) {
  state.title = !state.title;
}
function datePickerState(state) {
  state.datePicker = !state.datePicker;
}
function infoButtonState(state) {
  state.infoButton = !state.infoButton;
}
function newDateState(state) {
  state.newDate = !state.newDate;
}
function submitButtonState(state) {
  state.submitButton = !state.submitButton;
}


function moreInfo(state, element) {
  var infoHtml = '<p class="information">' + state.dataArr[0].explanation + '</p>';
  element.append(infoHtml);
}



function renderState(state, element) {
  element.css('background', 'url("'+state.dataArr[0].url+'")' + 'no-repeat center center fixed');
  element.css('background-size', 'cover');
  if (!state.infoButton) {
    $('.infoButton').show();
  } else {
    $('.infoButton').hide();
  }
  if (state.submitButton) {
    $('.submitButton').show();
  } else {
    $('.submitButton').hide();
  }
  if (state.datePicker) {
    $('.inputBox').show();
  } else {
    $('.inputBox').hide();
  }
  if (state.newDate) {
    $('.infoButton').show();
  } else {
    $('.infoButton').hide();
  }
}



function callbackFunc(data) {
  addData(appState, data);
  renderState(appState, $('html'));
}


$(function eventHandler(){
  renderState(appState, $('html'));
  $('form').submit(function(e) {
    e.preventDefault();
    var date = $('#date-input').val();
    getNasaData(date, callbackFunc);
    $('.title').hide();
    infoButtonState(appState);
    submitButtonState(appState);
    datePickerState(appState)
  });
  $('.infoButton').click(function(event) {
     moreInfo(appState, $('.info'));
     infoButtonState(appState);
     newDateState(appState);
     console.log(appState.infoButton);
     renderState(appState, $('html'));
  });
});













/*
1)




*/
