
// we need to install socket.io in node with
// npm install --save socket.io


var socket = io();
console.log('the socket is')
console.dir(socket)

socket.on('chat message', function(msg){
     $('#chatarea').append($('<li>').text(msg));
   });

socket.on('numusers',function(msg){
  usernames.html(msg)
})



console.log('inside chat.js')

const chatinput = document.getElementById('chatinput')

chatinput.addEventListener('keypress',function(event){
  //console.dir(event)
  if (event.charCode==13){
    console.log("they hit return")
    const input = chatinput.value
    const un = document.getElementById('userName')
    const userName = un.innerText
    console.log("they entered: "+input)
    const chatMessage = "> "+userName+": "+ input
    socket.emit('chat message', chatMessage);

    chatinput.value = ""
  }
})

const userbutton = $("#showusers")
const usernames = $("#usernames")

userbutton.click(function(event){
  console.log("user clicked on the button!")
  usernames.html("they clicked!")
  socket.emit("nombres de users","")

})
