var appState = { // Application state object
    NASA_BASE_URL: 'https://api.nasa.gov/planetary/apod',
    dataArr: [{
        // Starting object pulled from the API from 02/09/2017
        // To have an image for initial render.
        "date": "2017-02-09",
        "explanation": "Peering from the shadows, the Saturn-facing hemisphere of tantalizing inner moon Enceladus poses in this Cassini spacecraft image. North is up in the dramatic scene captured last November as Cassini's camera was pointed in a nearly sunward direction about 130,000 kilometers from the moon's bright crescent. In fact, the distant world reflects over 90 percent of the sunlight it receives, giving its surface about the same reflectivity as fresh snow. A mere 500 kilometers in diameter, Enceladus is a surprisingly active moon. Data collected during Cassini's flybys and years of images have revealed the presence of remarkable south polar geysers and a possible global ocean of liquid water beneath an icy crust.",
        "hdurl": "http://apod.nasa.gov/apod/image/1702/PIA20522enceladus.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "Crescent Enceladus",
        "url": "http://apod.nasa.gov/apod/image/1702/PIA20522enceladusC.jpg"
    }],
    // Keys for page elements to manage state.
    datePicker: true,
    submitButton: true,
    infoButton: false,
    newDate: false
};
// Submit query to API - called from $(function eventHandler()
// at the submit handler.
function getNasaData(searchTerm, callback) {
    var query = {
        api_key: 'V5am4SFkNFMjACvm9UjIvNOQSOIIfktcKIeoIUp5',
        date: searchTerm //input: YYYY-MM-DD
    };
    $.getJSON(appState.NASA_BASE_URL, query, callback);
}
// getJSON Callback function.
function callbackFunc(data) {
    appState.dataArr[0] = data;
    renderState(appState, $('html'));
}
// Compare user selcted date to alert if a future date or a date prior to
// earliest archive image was selected.
function dateCompare(date) {
  var selectedDate = date.slice(0,4) + date.slice(5,7) + date.slice(8);
  var today = new Date();
  // getMonth and getDate return an int - need to pad a '0' for single digit
  // months and days.
  var currentMonth = ('0' + (today.getMonth()+1).toString()).slice(-2);
  var currentDay = ( '0' + today.getDate().toString()).slice(-2);
  var currentDate = today.getFullYear().toString() + currentMonth + currentDay;
  if (selectedDate > currentDate) {
    return 0; // Return 0 triggers a future date alert
  } else if (selectedDate < 19950617) {
    return 1; // Return 1 triggers a date prior to archive start date alert
  } else {
    return 2; // Return 2 allows normal processing
  }
}
// Modify application state keys - true / false - called from event handlers.
function modKeyState(key) {
    appState[key] = !appState[key];
}
// Check the true/false state of application state keys to show or hide elements
// Called from renderState function.
function checkState(key) {
    appState[key] ? $('.' + key).show() : $('.' + key).hide();
}
// Adds photo description information to the page
function moreInfo(state, element) {
    var infoHtml = '<p class="information">' + state.dataArr[0].explanation + '</p>';
    element.append(infoHtml);
}
// Renders the DOM depending on application state
function renderState(state, element) {
    element.css('background', 'url("' + state.dataArr[0].url + '")' + 'no-repeat center center fixed');
    element.css('background-size', 'cover');
    checkState('infoButton');
    checkState('datePicker');
    checkState('submitButton');
    checkState('newDate');
}
// Event handlers
$(function eventHandler() {
    renderState(appState, $('html'));
    // Submit button handler
    $('form').submit(function(e) {
        e.preventDefault();
        var date = $('#date-input').val();
        var comparedDates = dateCompare(date);
        if (comparedDates === 0) {
          alert('You cannot select a date in the future');
        } else if (comparedDates === 1) {
          alert('There are no APODs before 6/17/1995')
        } else {
          getNasaData(date, callbackFunc);
          $('.title').hide(); // Hide page title
          // Change the true/false state of app state keys
          modKeyState('infoButton');
          modKeyState('submitButton');
          modKeyState('datePicker');
        }
    });
    // Show Info button handler
    $('.infoButton').click(function(event) {
        moreInfo(appState, $('.info')); // Call funtion to display photo description
        // Change the true/false state of app state keys
        modKeyState('infoButton');
        modKeyState('newDate');
        renderState(appState, $('html'));
    });
    // New Date button handler
    $('.newDate').click(function(event) {
<<<<<<< HEAD
        // Change the true/false state of app state keys
        modKeyState('newDate');
        modKeyState('datePicker');
        modKeyState('submitButton');
        renderState(appState, $('html'));
        $('p').remove('.information'); // Remove photo description
||||||| merged common ancestors
        modKeyState('newDate');
        modKeyState('datePicker');
        modKeyState('submitButton');
        renderState(appState, $('html'));
        $('p').remove('.information');
=======
      $('.info').slideUp('slow');
      $('.info').slideDown('slow');
      modKeyState('newDate');
      modKeyState('datePicker');
      modKeyState('submitButton');
      renderState(appState, $('html'));
      $('p').remove('.information');

>>>>>>> d5dc8327216afeaaf97b649932fd03593e89f5c1
    });
});



/*
Maybe how we can implement slideshow?
$(document).ready(function() {
    var _intervalId;

    function fadeInLastImg()
    {
        var backImg = $('.container img:first');
        backImg.hide();
        backImg.remove();
        $('.container' ).append( backImg );
        backImg.fadeIn()
    };

    _intervalId = setInterval( function() {
        fadeInLastImg();
    }, 1000 );

});
credit: http://stackoverflow.com/questions/13026963/loop-through-images
 */
