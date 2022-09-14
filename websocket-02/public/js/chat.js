/*
1.链接socket 链接服务
 */
var socket = io("http://localhost:3000");

var element = document.querySelector(".message-container");
element.scrollTop = element.scrollHeight;

let open = document.querySelector("#open");
let close = document.querySelector(".close");
let panel = document.querySelector(".contact-detail");

open.onclick = function () {
  gsap.set(panel, {
    display: "block",
    x: 300
  });
  gsap.to(panel, 0.5, { x: 0 });
};

close.onclick = function () {
  gsap.to(panel, 0.5, { x: 320 });
};

// let openList = document.querySelector(".open-message");
// let closeList = document.querySelector(".close-list");
// let list = document.querySelector(".message-list");

// openList.onclick = function () {
//   gsap.set(list, { display: "block", x: -300 });
//   gsap.to(list, 0.5, { x: 0});
// };

// closeList.onclick = function () {
//   gsap.to(list, 0.5, {x: -400});
//   gsap.to(list, 0, {display: "none", delay: 1});
// }

// const msgConatiner = document.getElementsByClassName('message-container');
// msgConatiner[0].style.background="#f3f3f3";
// const msgConatiner2 = document.querySelector('.message-container');
// msgConatiner2.style.background="red";


const nameContainers = document.getElementById('open')
console.log(nameContainers);

/*add user*/
socket.on('addUser', ({user, userNumber}) =>{
    console.log('one user add in')
    // add a system message: the username
    const msgConatiner = document.querySelector('.message-container');
    let systemMsg = document.createElement('div');
    systemMsg.classList.add('system-msg');
    let p = document.createElement('p');
    p.innerText = `${user.username} enter the room.`
    systemMsg.append(p);
    msgConatiner.append(systemMsg);
    
    //update the user number
    const open = document.getElementById('open')
    open.innerText = `ChatRoom(${userNumber})`;

})