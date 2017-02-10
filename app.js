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
    newDate: false
};

function getNasaData(searchTerm, callback) {
    var query = {
        api_key: 'V5am4SFkNFMjACvm9UjIvNOQSOIIfktcKIeoIUp5',
        date: searchTerm //input: YYYY-MM-DD
    };
    $.getJSON(appState.NASA_BASE_URL, query, callback);
}

function callbackFunc(data) {
    appState.dataArr[0] = data;
    renderState(appState, $('html'));
}

function modKeyState(key) {
    appState[key] = !appState[key];
}

function checkState(key) {
    (appState[key]) ? $('.' + key).show() : $('.' + key).hide();
}

function moreInfo(state, element) {
    var infoHtml = '<p class="information">' + state.dataArr[0].explanation + '</p>';
    element.append(infoHtml);
}

function renderState(state, element) {
    element.css('background', 'url("' + state.dataArr[0].url + '")' + 'no-repeat center center fixed');
    element.css('background-size', 'cover');
    checkState('infoButton');
    checkState('datePicker');
    checkState('submitButton');
    checkState('newDate');
}

$(function eventHandler() {
    renderState(appState, $('html'));
    $('form').submit(function(e) {
        e.preventDefault();
        var date = $('#date-input').val();
        getNasaData(date, callbackFunc);
        $('.title').hide();
        modKeyState('infoButton');
        modKeyState('submitButton');
        modKeyState('datePicker');
    });

    $('.infoButton').click(function(event) {
        moreInfo(appState, $('.info'));
        modKeyState('infoButton');
        modKeyState('newDate');
        renderState(appState, $('html'));
    });

    $('.newDate').click(function(event) {
        modKeyState('newDate');
        modKeyState('datePicker');
        modKeyState('submitButton');
        renderState(appState, $('html'));
        $('p').remove('.information');
    });
});
