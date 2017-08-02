var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');

  li.text(`${message.from} `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit("createMessage", {
    from: 'User',
    text: $('[name=message]').val()
  }, function () {

  });
});

// GEOLOCATION

var locationButton = $('#send-location');

locationButton.on('click', function() {

  var googleGeoApi = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDRi9xZ7uZqeyvcJCOPKdDVwdhl3st365g';

  $.post(googleGeoApi, function (data) {

      socket.emit('createLocationMessage',
        {
          latitude: data.location.lat,
          longitude: data.location.lng
        });

  });
});
