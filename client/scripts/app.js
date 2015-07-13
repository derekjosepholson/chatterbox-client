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
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }

  });

};
app.fetch = function(){
  $.ajax({
    type: "GET"
  });
};
app.send({
  username: 'Mel Brooks',
  text: 'It\'s good to be the king',
  roomname: 'lobby'
});