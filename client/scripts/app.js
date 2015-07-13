// YOUR CODE HERE:
var app = {};

app.init = function(){

}; 

app.send = function(message){
  $.ajax({
    type: "POST",
    url: 'https://api.parse.com/1/classes/chatterbox',
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
    url: 'https://api.parse.com/1/classes/chatterbox',
    success: function (data) {
      var results = data.results;
      for(var index = 0; index < results.length; index++){
        app.addMessage(results[index]);
      }

    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to recieve message');
    }

  });
};

app.clearMessages = function() {
  $("#chats").html('');
};

app.addMessage = function(message) {
  $("#chats").append('<div class="chat">'    + '<span class="username">' +message.username+'</span>' +
    ': ' + message.text + '@ ' + message.createdAt       + '</div>');
  //app.addMessage(alert(1))
};




app.fetch();