var page = {

    /* 此方法在第一次显示窗体前发生 */
    onLoad:function(event){
        console.log("the event is ");
        console.dir(event);
        this.wifiInfo = event;
        this.setData({label1 : "请输入" + this.wifiInfo.ssid + "的密码"});


    },

    /* 此方法展示窗体前发生 */
    onShow:function(event){

    },

    /* 此方法关闭窗体前发生 */
    onExit:function(event){

    },

    onText:function(event){
        this.wifiInfo.password = event.detail.value;
        
    },

    onBtn:function(event){
        if(typeof(this.wifiInfo.password) != undefined)//有值
        {
            var obj = {ssid : this.wifiInfo.ssid,bssid : this.wifiInfo.bssid,password : this.wifiInfo.password};
            pm.navigateBack({value : obj});
        } 
        else
        {
            pm.navigateBack();
        }
        
    },
};

Page(page);

page = 0;
