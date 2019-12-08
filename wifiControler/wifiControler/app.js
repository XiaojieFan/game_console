var wifiModule = 0;
var listPage = 0;

var app = {
page : "page3/page3",

    /* app 加载完成触发该函数 */
    onLaunch:function(){
        wifiModule = pm.createWifi();
        wifiModule.onScanEvent(function(res){
            for(var i=0;i < res.length;i++)
            {
                console.dir(res[i]);
            }
            if(listPage !=0)
            {
                var wifiList = new Array();
                for(var i=0;i < res.length;i++)
                {
                    var item = res[i];
                    var wifiItem = new Object();
                   // if(wifiModule.getConnected() &&(item.bssid == wifiModule.getConnected().bssid))
                   // {
                    //    wifiItem.tick = {value:"wifi_tick.PNG"};                      
                   // }
                    wifiItem.button1 = {id :"wifiBtn"+i,value : item.ssid,customProperty : item};//注意是Property 
                    if(item.secure)
                    {
                        wifiItem.security = {value :"wifi_secure.PNG"};
                    }
                    if(item.strength > -40)
                    {
                        wifiItem.strength = {value :"wifi_strong.PNG"};
                        
                    }
                    else if(item.strength > -80)
                    {
                        wifiItem.strength = {value :"wifi_middle.PNG"};
                    }else{
                        wifiItem.strength = {value :"wifi_weak.PNG"};
                    }
                    wifiList.push(wifiItem);
                }
                listPage.setData({wifiListInfo : {empty : true}});/* 注意是items:wifiList */
                listPage.setData({wifiListInfo :{page : listPage,xml : "Panels/wifiItem",items:wifiList,refresh:true}});

            }
        });
        wifiModule.onConnectEvent(function(res){
            if(res)
            {
                console.log("wifi is connected");
            }else{
                console.log("wifi is not connected");
            }
        });
        wifiModule.onNetworkEvent(function(res){
            if(res)
            {
                console.log("Network is connected");
                //wifiModule.scan();//连接上以后 再次扫描 用来设置tick 标记
               // pm.navigateTo("page3/page3");      
            }
            else
                console.log("Network is connected fail");
                 //console.dir(res);
        });

    },

    /* app 退出触发该函数 */
    onExit:function(){

    },

};

App(app);

app = 0;
