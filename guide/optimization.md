---
description: 提高游戏帧率。
---

# 客户端优化指南
游戏内按F3查看自己的FPS `FPS越高游戏越流畅`
![如图显示我目前的FPS为408](../.gitbook/images/residence/FPS)

## 在Minecraft游戏中的措施
游戏内按Esc打开游戏菜单，进行设置
### 选项 - 视频设置
* 渲染距离：6-8个区块,还卡可以更低
`越低能见度越小(服务器有限制视距)`
* 图像品质：流畅
* 平滑光照：关 
* 最大帧率：无限制
* 垂直同步：关
* 视角摇晃：关
* 粒子效果：最少
* Mipmap级别：调低/关
`这会降低远景的清晰程度`
* 全屏：关
关闭全屏时，可以让Minecraft在屏幕上进行更少的加载，让游戏运行得快一些。
如果电脑拥有更好的显卡，开启全屏时，这会让GPU把更多的资源用于处理Minecraft。
* 游戏中，远离玩家和实体较多的地方
### 使用优化MOD(模组)
待写...

## 在Minecraft游戏外的措施
* 在游戏启动器中为Minecraft分配更多的内存
* 打开`Windows任务管理器` → `详细信息`→ 找到`javaw.exe`（Minecraft程序）
  右键点击它并设置它的优先级为`高` ！不是实时！
* 把屏幕分辨率调小（在半个屏幕大小的窗口中游玩Minecraft）

未完待续...