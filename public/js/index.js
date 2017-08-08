var socket = io();

function scrollToBottom() {
  //Selectors
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');
  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lsatMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lsatMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }

};

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  var formatedTime = moment(message.createdAt).format('DD MMM YYYY - k:mm');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formatedTime
  });

  $('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
  var formatedTime = moment(message.createdAt).format('DD MMM YYYY - k:mm');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formatedTime
  });

  $('#messages').append(html);
  scrollToBottom();
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

  $.post(googleGeoApi, function(data) {
    socket.emit('createLocationMessage',
      {
        latitude: data.location.lat,
        longitude: data.location.lng
      });

      // console.log(data.location.lat, data.location.lng);
  });
});
