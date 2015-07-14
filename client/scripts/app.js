// YOUR CODE HERE:
$(document).ready(function(){
  // main app object, server property specifies the url to send GET and POST requests
  var app = {
    server: 'https://api.parse.com/1/classes/chatterbox',
    rooms: {}
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
          app.addMessage(results[index]);
          // console.log(results[index].roomname);
        }

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
    $("#roomSelect").append('<option>'+ roomName + '</option>');
  };

  app.clearMessages = function() {
    $("#chats").html('');
  };

  app.addMessage = function(message) {
    $("#chats").append('<div class="chat">'    + '<span class="username">' +message.username+'</span>' +
      ': ' + message.text + '@ ' + message.createdAt    + '</div>');
    //app.addMessage(alert(1))
  };

  $('#submit').on('click', function() {
    console.log("Submit was pressed");
  });

    // console.log("click handler functioning");
    // event.preventDefault();
    // var message = {
    //   "username": 'US',
    //   "text": '  loltrtyukaaaaaaaaaaaaaaaaaa',
    //   "roomname": '5chan'
    // }; 
    // app.send(message);
   
  // });

  app.fetch();
  setInterval(app.fetch, 1000);


  
});



