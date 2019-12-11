# 柿饼派游戏机

基于柿饼派的游戏主机，目前主要是柿饼派使用wifi通信 作为客户端 用来控制基于RT-Thread  rt-robot 软件包小车,小车主控板使用潘多拉板子。

# 实现功能

- 通过扫码柿饼派上支付二维码，获得授权，才能进入小车游戏控制界面；

- 柿饼派连接指定wifi，并以socket 客户端，连接指定小车；

- 通过柿饼派对小车进行前进后退等操作;

- 将小车采集的相关信息显示在游戏主机上；

- 几个小车可以互动共同完成游戏任务。

  

# 软件框架说明

![软件框架](./car/stm32l475-atk-pandora/docs/软件框架.png)

1. 柿饼派使用 wifi 控件 及net 控件 作为client 连接 server 端的小车;
2. 小车主控板为潘多拉板子，使用rt-robot 软件包控制小车地盘电机；
3. 小车通信使用rt-thread SAL 组件 作为server 端 接收 柿饼派发送的控制命令，进行响应。

# 软件包使用说明

主要介绍项目中使用到的软件包，也包括测试的一些软件包，比如二维码软件包。使用的软件包如下 : qrcode，rt-robot,cJSON,TCP server,

## 1.qrcode 二维码软件包

最终可用于在潘多拉的LCD 上显示 车辆信息，类似与共享单车上的二维码，基于此二维码进行相关控车操作。目前只是测试代码。

- 对于二维码大小的控制，清晰度是否可识别还有待测试。

[qrcode 软件包地址]( https://github.com/RT-Thread-packages/qrcode )

##  2.rt-robot 软件包

主要用于小车控制。目前代码中是开环四轮驱动，未实现闭环。

[rt-robot软件包地址](https://github.com/RT-Thread-packages/rt-robot)

## 3.cJSON

[cJSON软件包地址](https://github.com/RT-Thread-packages/cJSON)

[cJSON 带例子说明](https://github.com/DaveGamble/cJSON)

## 4.TCP server

[TCP server 软件包地址](https://github.com/Guozhanxin/tcpserver)

***注意***

1. tcpserver_sample.c 中 导出命令要有分号。下载的软件包中没有，导致无法导出命令。




`MSH_CMD_EXPORT(tcpserver, server start);` 

`MSH_CMD_EXPORT(tcpserver_stop, tcpserver stop);`

2.程序中需要知道 网卡的IP信息，来作为服务器的IP，那如何在程序中获取已连接WiFi 的ip 地址？

可通过如下函数：**通过名称w0获取网卡对象**

'struct netdev ***netdev_get_by_name**(**const** **char** *name);'

![station information](.\car\stm32l475-atk-pandora\docs\ipinfo.png)













# 演示效果

## 1.qrcode

![qrcode](./car/stm32l475-atk-pandora/docs/qrcode.png)

## 2.柿饼控制界面

![柿饼UI1](./car/stm32l475-atk-pandora/docs/wifi柿饼配置.png)

![pi socket](.\car\stm32l475-atk-pandora\docs\pisocket.png)

![piui](.\car\stm32l475-atk-pandora\docs\piui.png)





## 3.小车跑起来

[car](.\car\stm32l475-atk-pandora\docs\car.mp4)

- 只是自己跑起来，还么有联动起来。

## 4.TCP server

这个软件包还是非常不错的。直接可以来作为服务端来使用。

![server](./car/stm32l475-atk-pandora/docs/tcpserver.png)

![client](./car/stm32l475-atk-pandora/docs/client.png)



电脑连接小车可以正常：

![pc run](.\car\stm32l475-atk-pandora\docs\pc run.png)



柿饼派 连接 小车就不行：

解决办法：服务器收到命令后，不用返回数据。就可以。

![pi run error](.\car\stm32l475-atk-pandora\docs\pi run error.png)

正常OK 

![OK](.\car\stm32l475-atk-pandora\docs\OK.png)



## 各组件集成起来

[car run ](.\car\stm32l475-atk-pandora\docs\car run.mp4)

遇到的问题：

1. 柿饼派作为客户端连接pc 没问题，但连接小车的化，有时候会出现柿饼派闪退，最后解决办法就是，服务器收到数据不回复。

   

      case TCPSERVER_EVENT_RECV:
           ret = tcpserver_recv(client, buf, 1024, -1);
           if (ret > 0)
           {
   					  if(memcmp(buf,"run",3) == 0)
   						{
   							rt_kprintf("\n start run \n");
   							run();
   						}
   						else if (memcmp(buf,"back",4) == 0)
   						{
   					    rt_kprintf("\n start back \n");	
   									back();						
   						}
   						else if(memcmp(buf,"left",4) == 0)
   						{
   							rt_kprintf("\n start left \n");
   							left();
   						}
   						else if (memcmp(buf,"right",4) == 0)
   						{
   					    rt_kprintf("\n start right \n");	
   							right();
   						}
   						else if (memcmp(buf,"stop",4) == 0)
   						{
   						   rt_kprintf("\n start stop \n");	
   							stop();
   						}
               //ret = tcpserver_send(client, buf, ret, 0);
           }
           break;

   

# 代码地址

[game console](https://github.com/XiaojieFan/game_console)



# 代码目录结构

```
.
|-- README.md                       // 说明
|-- car                            // 小车控制及通信代码
|-- wifiControler                  // 柿饼派js 代码

```