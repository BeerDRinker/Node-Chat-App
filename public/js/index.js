var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  // console.log('newMessage', message);
  var formatedTime = moment(message.createdAt).format('DD MMM YYYY - k:mm');
  var li = $('<li></li>');
  li.text(`${message.from}: (${formatedTime}): ${message.text}`);

  $('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');
  var formatedTime = moment(message.createdAt).format('DD MMM YYYY - k:mm');

  li.text(`${message.from} (${formatedTime}): `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = $('[name=message]');

  socket.emit("createMessage", {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
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
