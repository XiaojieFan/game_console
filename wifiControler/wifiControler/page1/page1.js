var page = {

    /* 此方法在第一次显示窗体前发生 */
    onLoad:function(event){
        listPage = this;

    },

    /* 此方法展示窗体前发生 */
    onShow:function(event){

    },

    /* 此方法关闭窗体前发生 */
    onExit:function(event){
        listPage = 0;

    },

    onDrag:function(event){
        if(event.detail.value)
        {
            wifiModule.scan();
        }

        
    },
    /*event 就是button1 触发事件 */
    onWifiConnect:function(event){
        if(wifiModule.getConnected())
        {
         console.log("go to connect server");
         pm.navigateTo("page3/page3");                   
        }
        else
        {
            pm.navigateTo({url:"page2/page2",value : event.detail.customProperty});
        }
    },

    onUpdate:function(event){
        wifiModule.connect(event.value);
    }
};

Page(page);

page = 0;
