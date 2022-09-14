const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");


app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs')
//express 处理静态资源
//assign public as the static resources root
app.use(express.static(path.join(__dirname, 'public')));

const users = []; //record users

app.get("/", function (req, res) {
  res.render('index');
});

app.get("/chat", function (req, res) {
  res.render('chat');
});

//Whenever someone connects this gets executed
//socket.emit : 触发某个事情
//socket.on: register an event
io.on("connection", function (socket) {
  console.log("A user connected");

  //Whenever someone disconnects this piece of code executed
  //para1: event name
  //para2: data retrieved
  socket.on("disconnect", function () {
    console.log('a user leave the chat room');
  });

  socket.on("login", (data) => {
    if(users.find(user => user.username === data.username)){
      //user already login
      socket.emit("loginError", {msg: "login fail"});
      console.log(`${data.username} login fail`)
    }
    else{
      const id = uuidv4();
      const user = {id, ...data};
      users.push(user);
      socket.emit('redirect', {dest:`/chat`, userNumber:users.length, user});
      console.log(`${data.username} login success`)
      //broadcast to all users that one user has login, and the number of users
      //io.emit: broadcase to all users
      io.emit('addUser', {user, userNumber:users.length});
    }
  });
});

http.listen(3000, function () {
  console.log("listening on *:3000");
});
