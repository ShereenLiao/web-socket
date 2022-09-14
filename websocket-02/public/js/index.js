/*
聊天室的主要功能
*/


/*
1.链接socket 链接服务
 */
var socket = io("http://localhost:3000");


/*
2.选择头像
*/
const checkboxes = document.querySelectorAll(".check");
checkboxes.forEach((box) => {
  box.addEventListener("click", (event) => {
    box.parentElement.classList.add("now");
    checkboxes.forEach((item) => {
      if (item !== box) {
        item.checked = false;
        item.parentElement.classList.remove("now");
      }
    });
  });
});

/*
 * user login: get username and avatar
 */
const submit_btn = document.querySelector("button");
submit_btn.addEventListener("click", (event) => {
  var username = document.getElementById("username").value;
  var avatar = document.querySelector(".now label img").getAttribute("src");
  socket.emit("login", { username: username, avatar: avatar });
});


socket.on('loginError', data =>{
    alert(data.msg)
})

// socket.on('addUser', data=>{
//     console.log('one user add in');
// })

socket.on('redirect', (data)=>{
    //需要redirect 聊天窗口
    console.log(data)
    window.location.href = data.dest;
})

