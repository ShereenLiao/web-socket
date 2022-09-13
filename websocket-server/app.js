const ws = require('nodejs-websocket')
const TYPE = {
    MSG: 2,
    LEAVE: 1,
    ENTER: 0
}
/*
messgae:
type: type of msg 0: enter the room, 1: leave the room, 2: chatting,
msg: the content of message,
time: 
*/
let count = 0
const PORT = 3000
//每次只要有用户连接，函数就会被执行，会给当前用户创建一个connect 对象
const server = ws.createServer(connect => {

    console.log("有用户连接上" + PORT)
    count++
    connect.userName = count

    //1. 告诉所有人，有人加入了聊天室
    //浏览器只能传播string类型，所以要json.stringify
    broadcast(JSON.stringify({
        user: connect.userName,
        type: TYPE.ENTER,
        msg: `${connect.userName}  进入了聊天室`,
        time: new Date().toLocaleDateString()
    }))

    connect.on('text', data =>{
        //2. 当我们接受到某个人的用户信息时，告诉所有用户，发送的消息内容是什么
        broadcast(JSON.stringify({
            user: connect.userName,
            type: TYPE.MSG,
            msg: data,
            time: new Date().toLocaleDateString()
        }))
    })

    //只要websocket连接断开了，close事件就会触发
    connect.on('close', ()=>{
        //3. 告诉所有用户，有人离开了聊天室
        --count;
        broadcast(JSON.stringify({
            user: connect.userName,
            type: TYPE.LEAVE,
            msg: `${connect.userName}  退出了聊天室`,
            time: new Date().toLocaleDateString()
        }))
        console.log("用户退出了聊天室" + PORT)
    })

    connect.on('error', ()=>{
        console.log('用户连接异常')
    })
})

server.listen(PORT, ()=>{
    console.log("websocket connected" + PORT)
})


function broadcast(msg){
    server.connections.forEach(item =>{
        item.send(msg)
    })
}