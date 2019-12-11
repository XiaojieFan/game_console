var socketglobal;

var page = {

    /* 此方法在第一次显示窗体前发生 */
    onLoad:function(event){
        console.dir(event);
        var thiz = this;
    },

    /* 此方法展示窗体前发生 */
    onShow:function(event){

    },

    /* 此方法关闭窗体前发生 */
    onExit:function(event){

    },

    onBtn:function(event){
     
     console.dir(event);
     if(event.target.id == "connect")
     {
         console.log("start connect");
       // thiz.socket_action();
        wifiModule.connect({
            ssid:"301",
            password:"qing14551"
        });
        console.log("socket is connected");
   

     }
     else if(event.target.id == "RUN")
     {
         console.log("start RUN");
       socketglobal.write("run",function(){console.log("socket writes successful,starts run");});
     }
     else if(event.target.id == "STOP")
     {
         console.log("start STOP");
       socketglobal.write("stop",function(){console.log("socket writes successful,starts stop");});
     }
     else if(event.target.id == "LEFT")
     {
         console.log("start LEFT");
       socketglobal.write("left",function(){console.log("socket writes successful,starts left");});
     }
     else if(event.target.id == "RIGHT")
     {
         console.log("start RIGHT");
       socketglobal.write("right",function(){console.log("socket writes successful,starts right");});
     }
     else if(event.target.id == "BACK")
     {
         console.log("start BACK");
       socketglobal.write("back",function(){console.log("socket writes successful,starts back");});
     }
    }, 
    socket_action:function(event){
        console.log("enter socket_action");
        /* socket 连接超时*/
        var fun_timeout = function(){
            console.log("socket timeout");
        };
        var fun_data = function(res){
            console.log("read" + res.length + "bytes:" + res.toSting('utf8'));
            console.log("receive some message");
        };
        /*socket 连接成功回调函数*/
        var fun_connect = function(){
            console.log("connect success");
            socketglobal.write("Hello,this is rtt",function(){console.log("socket writes successful,starts trans");});

        };
        var thiz = this;
        var net = require('net');
        socketglobal = new net.Socket();
        socketglobal.on('data',fun_data);
        socketglobal.connect(5000,'192.168.1.101',fun_connect);
       
       
    },
};

Page(page);

page = 0;
