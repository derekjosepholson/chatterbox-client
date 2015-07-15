// YOUR CODE HERE:

// main app object, server property specifies the url to send GET and POST requests
var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  rooms: {},
  roomname: '',
  friends: {}
};

// functionality is TBA
app.init = function(){

}; 

app.send = function(message){
  $.ajax({
    type: "POST",
    url: app.server,
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent' + JSON.stringify(data));
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }

  });

};

app.fetch = function(){
  $.ajax({
    type: "GET",
    url: app.server,
    success: function (data) {
      app.clearMessages();
      var results = data.results;
      app.roomList(results);
      for(var index = 0; index < results.length; index++){
        if(results[index].roomname === app.roomname && app.roomname !== '') {
          app.addMessage(results[index]);
        }
        // console.log(results[index].roomname);
      }
      //after we added our data, try and use jquery here
      app.addFriend();
      $('.chat .username').on('click',function(){
        app.addFriend();
        if(!app.friends.hasOwnProperty($(this).html())){
          console.log($(this).html());
          app.friends[$(this).html()] = $(this).html();
        }else{
          delete app.friends[$(this).html()];
        }
      });  //only place we can access all we need  
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message');
    }

  });
};

//this function parses through data from the server and generates a hash map of all room names
app.roomList = function(results){
  for(var index = 0; index < results.length; index++ ){
    if(typeof app.rooms[results[index].roomname] === 'undefined'){ //not in the rooms
      app.rooms[results[index].roomname] = true;
      app.addRoom(results[index].roomname);
    }
  }
};

app.addRoom = function(roomName){
  //use jQuery to select #roomSelect and append a option element with desired room name
  roomName = app.escapeHtml(roomName);
  $("#roomSelect").append('<option>'+ roomName + '</option>');
};

app.clearMessages = function() {
  $("#chats").html('');
};

app.addMessage = function(message) {
  message.username = app.escapeHtml(message.username);
  message.text = app.escapeHtml(message.text);
  $("#chats").append('<div class="chat">'    + '<span class="username">' +message.username+'</span>' +
    ': ' + '<span class="'+message.username+'">' + message.text + '</span> </div>');
};

app.escapeHtml = function(unsafe) {
  if(unsafe !== null && unsafe !== undefined){

    return unsafe  
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
    }
};

app.handleSubmit = function(event){
  event.preventDefault();
  console.log("Submit was pressed");
  var roomname = $('#roomSelect').val();
  if (roomname !=="Select a chat room:" && roomname !=="Create New Room") {
    var text = $('#message').val();
    var username = window.location.search.split('').splice(10).join('');
    var message = {
      username: username,
      text: text,
      roomname: roomname
      };
    console.log(message);
    app.send(message);
  }else if(roomname ==="Create New Room"){
    var newRoomName = $('#message').val();
    if(typeof app.rooms[newRoomName] === 'undefined'){ //not in the rooms, so add it
      app.rooms[newRoomName] = true;
      app.addRoom(newRoomName);
    }
  }
};

app.addFriend = function(){ //makes friends bold
  for(var key in app.friends){
    $('.'+key).css('font-weight','bold');
  }
};

// return !!unsafe ? case1 : case2;

app.fetch();
setInterval(app.fetch, 1000);


$(document).ready(function(){

  $('#send .submit').on('click', function(event){
    app.handleSubmit(event);
  });

  $('#send .submit').on('submit', function(){
    $(this).trigger('click');
  });

  $('#roomSelect').on('change', function(){
    if($(this).val() === 'Create New Room'){
      $('#message').attr('placeholder', 'Type here to create room');
       app.roomname = '';
    }else if($(this).val() !== 'Select a chat room:'){
      app.roomname = $(this).val();
      $('#message').attr('placeholder', 'Enter chat message here');
    }else{ //don't show any messages on page
      $('#message').attr('placeholder', '');
      app.roomname = '';
    }
  });
  
  $('.chat .username').on('click',function(){alert(1);});
  //console.log($('.chat'));  // <-- bad because elements are not loaded yet

});



