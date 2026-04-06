import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Coreages Wiki',
  description: '远古之心服务器百科',
  lang: 'zh-CN',
  ignoreDeadLinks: true,

  srcExclude: ['SUMMARY.md'],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '新手入门', link: '/Newplayer/KnowCoreages/Coreages1' },
      { text: '教程', link: '/guide/tip' },
      { text: '粘液科技', link: '/slimefun/whatslimefun' },
    ],

    sidebar: [
      {
        text: '初入远古之心',
        items: [
          {
            text: '了解远古之心',
            link: '/Newplayer/KnowCoreages/Coreages1',
            items: [
              { text: '服务器玩法', link: '/Newplayer/KnowCoreages/Coreages3' },
              { text: '服务器截图', link: '/Newplayer/KnowCoreages/Coreages4' },
              { text: '远古起源', link: '/Newplayer/KnowCoreages/Coreages2' },
            ]
          },
          { text: '服务器规则和协议', link: '/Newplayer/0' },
          { text: '注册账号', link: '/Newplayer/1' },
          { text: '新手礼包', link: '/Newplayer/2' },
          { text: '货币介绍', link: '/Newplayer/3' },
          { text: '称号/权限组', link: '/Newplayer/4' },
          { text: '正版验证', link: '/Newplayer/zhengban' },
          {
            text: '菜单',
            link: '/Newplayer/MENU/MENU',
            items: [
              {
                text: '传送/世界介绍',
                link: '/Newplayer/MENU/World/WORLDTP',
                items: [
                  { text: '生存世界', link: '/Newplayer/MENU/World/SCworld' },
                  { text: '资源世界', link: '/Newplayer/MENU/World/ZYworld' },
                  { text: '旧世界', link: '/Newplayer/MENU/World/oldworld' },
                ]
              },
              {
                text: '远古商城',
                link: '/Newplayer/MENU/Shop/Shop',
                items: [
                  { text: '权限/VIP商城', link: '/Newplayer/MENU/Shop/VIPShop' },
                  { text: '钥匙商城', link: '/Newplayer/MENU/Shop/yaoshi' },
                  { text: '现金商城', link: '/Newplayer/MENU/Shop/xianjin' },
                  { text: '昵称色彩商城', link: '/Newplayer/MENU/Shop/nick' },
                  { text: '物品商城', link: '/Newplayer/MENU/Shop/wupin' },
                  { text: '生命值商城', link: '/Newplayer/MENU/Shop/shengming' },
                  { text: '无限方块商城', link: '/Newplayer/MENU/Shop/fangkuai' },
                  { text: '远古代币商城', link: '/Newplayer/MENU/Shop/daibi' },
                ]
              },
              {
                text: '玩家贸易',
                link: '/Newplayer/MENU/PlayerShop/Shop',
                items: [
                  { text: '系统商店', link: '/Newplayer/MENU/PlayerShop/s' },
                  { text: '寄售中心', link: '/Newplayer/MENU/PlayerShop/qs' },
                  { text: '箱子商店', link: '/Newplayer/MENU/PlayerShop/chestshop' },
                ]
              },
              { text: '节日礼物', link: '/Newplayer/MENU/gift' },
              { text: '每日签到/礼包', link: '/Newplayer/MENU/DayGT' },
              { text: '聊天管理/称号系统', link: '/Newplayer/MENU/chatadmin' },
              { text: '服务器公共设施', link: '/Newplayer/MENU/spawn' },
            ]
          },
        ]
      },
      {
        text: '教程',
        items: [
          { text: '小提示', link: '/guide/tip' },
          { text: '领地教程', link: '/guide/residence' },
          {
            text: '常用指令',
            link: '/guide/command',
            items: [
              { text: '游戏财产', link: '/guide/1-1' },
              { text: '世界传送', link: '/guide/1-2' },
              { text: '辅助内容', link: '/guide/1-3' },
            ]
          },
          { text: '使用基岩版登录', link: '/guide/geyser' },
          { text: '服务器常见问题', link: '/guide/faq' },
          { text: '关于服务器修改', link: '/guide/serveredit' },
          { text: '客户端优化指南', link: '/guide/optimization' },
          {
            text: 'JAVA版安装教程',
            link: '/JAVAguide/0',
            items: [
              { text: '1.选择并安装启动器', link: '/JAVAguide/1' },
              { text: '2.选择并安装JAVA', link: '/JAVAguide/2' },
              { text: '3.安装游戏', link: '/JAVAguide/3' },
              { text: '4.未完待续', link: '/JAVAguide/4' },
            ]
          },
        ]
      },
      {
        text: 'Slimefun 粘液科技',
        items: [
          { text: '什么是粘液科技', link: '/slimefun/whatslimefun' },
          {
            text: '粘液教程',
            link: '/slimefun/',
            items: [
              { text: '入门基础与多方块结构', link: '/slimefun/1.1' },
              { text: '矿粉与矿锭的获取', link: '/slimefun/1.2' },
              { text: '能源网络', link: '/slimefun/1.4' },
              { text: '货运系统', link: '/slimefun/1.5' },
              { text: '核反应堆的搭建', link: '/slimefun/1.7' },
              {
                text: '附属教程：星际科技',
                link: '/slimefun/Galacifun/space',
                items: [
                  { text: '发射火箭，进入太空', link: '/slimefun/Galacifun/Gospace' },
                  { text: '装备', link: '/slimefun/Galacifun/2' },
                  {
                    text: '星系机器',
                    link: '/slimefun/Galacifun/machine/0',
                    items: [
                      { text: '氧气填充器', link: '/slimefun/Galacifun/machine/1' },
                      { text: '航天服升级模块', link: '/slimefun/Galacifun/machine/2' },
                      { text: '循环压力机', link: '/slimefun/Galacifun/machine/3' },
                      { text: '星系装配台', link: '/slimefun/Galacifun/machine/4' },
                      { text: '空间冷却器', link: '/slimefun/Galacifun/machine/5' },
                      { text: '空间加热器', link: '/slimefun/Galacifun/machine/6' },
                      { text: '离子分散器', link: '/slimefun/Galacifun/machine/7' },
                      { text: '星系天文台', link: '/slimefun/Galacifun/machine/8' },
                      { text: '行星分析仪', link: '/slimefun/Galacifun/machine/9' },
                      { text: '钻石砧', link: '/slimefun/Galacifun/machine/10' },
                      { text: '氧气散播机', link: '/slimefun/Galacifun/machine/11' },
                      { text: '自动门', link: '/slimefun/Galacifun/machine/12' },
                      { text: '试验性力场发生器', link: '/slimefun/Galacifun/machine/13' },
                      { text: '聚变反应堆', link: '/slimefun/Galacifun/machine/14' },
                      { text: '大气收集机', link: '/slimefun/Galacifun/machine/15' },
                      { text: '化学反应器', link: '/slimefun/Galacifun/machine/16' },
                      { text: '电解器', link: '/slimefun/Galacifun/machine/17' },
                      { text: '遗迹搜查机', link: '/slimefun/Galacifun/machine/18' },
                    ]
                  },
                  {
                    text: '星球/天体',
                    link: '/slimefun/Galacifun/celestialboby/0',
                    items: [
                      { text: '地球高空轨道', link: '/slimefun/Galacifun/celestialboby/1' },
                      { text: '月球', link: '/slimefun/Galacifun/celestialboby/2' },
                      { text: '火星', link: '/slimefun/Galacifun/celestialboby/3' },
                      { text: '金星', link: '/slimefun/Galacifun/celestialboby/4' },
                      { text: '木卫一-艾奥', link: '/slimefun/Galacifun/celestialboby/5' },
                      { text: '木卫二', link: '/slimefun/Galacifun/celestialboby/6' },
                      { text: '土卫二', link: '/slimefun/Galacifun/celestialboby/7' },
                      { text: '土卫六-泰坦', link: '/slimefun/Galacifun/celestialboby/8' },
                    ]
                  },
                  { text: '星球环境汇总', link: '/slimefun/Galacifun/5' },
                  { text: '密封环境', link: '/slimefun/Galacifun/6' },
                ]
              },
            ]
          },
        ]
      },
      {
        text: '四季',
        items: [
          { text: '春天', link: '/reason/spring' },
          { text: '夏天', link: '/reason/summer' },
          { text: '秋天', link: '/reason/fall' },
          { text: '冬天', link: '/reason/winter' },
          { text: '温度/日历/时间', link: '/reason/temperature-and-date' },
        ]
      },
      {
        text: '维护日志',
        collapsed: true,
        items: [
          {
            text: '2024',
            collapsed: true,
            items: [
              { text: '2024/2/23', link: '/updatelogs/2024/february/20240223' },
              { text: '2024/2/19', link: '/updatelogs/2024/february/20240219' },
              { text: '2024/1/31', link: '/updatelogs/2024/january/20240131' },
              { text: '2024/1/27', link: '/updatelogs/2024/january/20240127' },
              { text: '2024/1/16', link: '/updatelogs/2024/january/20240116' },
              { text: '2024/1/1', link: '/updatelogs/2024/january/20240101' },
            ]
          },
          {
            text: '2023',
            collapsed: true,
            items: [
              { text: '2023/9/6~7', link: '/updatelogs/2023/september/20230906-07' },
              { text: '2023/7/14 核心升级', link: '/updatelogs/2023/july/20230714' },
              { text: '2023/5/17', link: '/updatelogs/2023/may/20230517' },
              { text: '2023/4/2', link: '/updatelogs/2023/april/20230402' },
              { text: '2023/1/26', link: '/updatelogs/2023/january/20230126' },
              { text: '2023/1/1', link: '/updatelogs/2023/january/20230101' },
            ]
          },
          {
            text: '2022',
            collapsed: true,
            items: [
              { text: '2022/12/29 核心升级', link: '/updatelogs/2022/december/20221229' },
              { text: '2022/12/21', link: '/updatelogs/2022/december/20221221' },
              { text: '2022/8/27', link: '/updatelogs/2022/august/20220827' },
              { text: '2022/8/23', link: '/updatelogs/2022/august/20220823' },
              { text: '2022/8/14', link: '/updatelogs/2022/august/20220814' },
              { text: '2022/8/8', link: '/updatelogs/2022/august/20220808' },
              { text: '2022/7/31 核心升级', link: '/updatelogs/2022/july/20220731' },
              { text: '2022/7/27', link: '/updatelogs/2022/july/20220727' },
              { text: '2022/7/26', link: '/updatelogs/2022/july/20220726' },
              { text: '2022/6/30', link: '/updatelogs/2022/june/20220630' },
              { text: '2022/6/29', link: '/updatelogs/2022/june/20220629' },
              { text: '2022/6/26 核心升级', link: '/updatelogs/2022/june/20220626' },
              { text: '2022/6/13', link: '/updatelogs/2022/june/20220613' },
              { text: '2022/5/23', link: '/updatelogs/2022/may/20220523' },
              { text: '2022/5/15', link: '/updatelogs/2022/may/20220515' },
              { text: '2022/5/12', link: '/updatelogs/2022/may/20220512' },
              { text: '2022/5/9', link: '/updatelogs/2022/may/20220509' },
              { text: '2022/5/5', link: '/updatelogs/2022/may/20220505' },
              { text: '2022/5/3', link: '/updatelogs/2022/may/20220503' },
              { text: '2022/5/2', link: '/updatelogs/2022/may/20220502' },
              { text: '2022/5/1', link: '/updatelogs/2022/may/20220501' },
              { text: '2022/4/29', link: '/updatelogs/2022/april/20220429' },
              { text: '2022/4/26', link: '/updatelogs/2022/april/20220426' },
              { text: '2022/4/25', link: '/updatelogs/2022/april/20220425' },
              { text: '2022/4/21', link: '/updatelogs/2022/april/20220421' },
              { text: '2022/4/17', link: '/updatelogs/2022/april/20220417' },
              { text: '2022/4/11', link: '/updatelogs/2022/april/20220411' },
              { text: '2022/4/7', link: '/updatelogs/2022/april/20220407' },
              { text: '2022/3/24', link: '/updatelogs/2022/march/20220324' },
              { text: '2022/3/21', link: '/updatelogs/2022/march/20220321' },
              { text: '2022/3/16', link: '/updatelogs/2022/march/20220316' },
              { text: '2022/3/15', link: '/updatelogs/2022/march/20220315' },
              { text: '2022/3/10', link: '/updatelogs/2022/march/20220310' },
              { text: '2022/3/4', link: '/updatelogs/2022/march/20220304' },
              { text: '2022/3/1', link: '/updatelogs/2022/march/20220301' },
              { text: '2022/2/24', link: '/updatelogs/2022/february/20220224' },
              { text: '2022/2/21', link: '/updatelogs/2022/february/20220221' },
              { text: '2022/2/20', link: '/updatelogs/2022/february/20220220' },
              { text: '2022/2/18', link: '/updatelogs/2022/february/20220218' },
              { text: '2022/2/15', link: '/updatelogs/2022/february/20220215' },
              { text: '2022/2/13', link: '/updatelogs/2022/february/20220213' },
              { text: '2022/2/7~13 核心升级', link: '/updatelogs/2022/february/20220207' },
              { text: '2022/1/17', link: '/updatelogs/2022/january/20220117' },
            ]
          },
          {
            text: '2021',
            collapsed: true,
            items: [
              { text: '2021/10/24', link: '/updatelogs/2021/october/20211024' },
              { text: '2021/9/22', link: '/updatelogs/2021/september/20210922' },
              { text: '2021/9/13', link: '/updatelogs/2021/september/20210913' },
              { text: '2021/8/26', link: '/updatelogs/2021/august/20210826' },
              { text: '2021/8/4', link: '/updatelogs/2021/august/20210804' },
              { text: '2021/5/4', link: '/updatelogs/2021/may/20210504' },
              { text: '2021/2/20', link: '/updatelogs/2021/february/20210220' },
            ]
          },
          {
            text: '2020',
            collapsed: true,
            items: [
              { text: '2020/8/24', link: '/updatelogs/2020/august/20200824' },
              { text: '2020/7/23', link: '/updatelogs/2020/july/20200723' },
              { text: '2020/4/13', link: '/updatelogs/2020/april/20200413' },
              { text: '2020/3/23', link: '/updatelogs/2020/march/20200323' },
              { text: '2020/3/15', link: '/updatelogs/2020/march/20200315' },
              { text: '2020/3/6', link: '/updatelogs/2020/march/20200306' },
              { text: '2020/3/5', link: '/updatelogs/2020/march/20200305' },
              { text: '2020/3/2', link: '/updatelogs/2020/march/20200302' },
              { text: '2020/2/29', link: '/updatelogs/2020/february/20200229' },
              { text: '2020/2/25', link: '/updatelogs/2020/february/20200225' },
              { text: '2020/2/20', link: '/updatelogs/2020/february/20200220' },
              { text: '2020/2/12', link: '/updatelogs/2020/february/20200212' },
              { text: '2020/2/9', link: '/updatelogs/2020/february/20200209' },
              { text: '2020/2/1', link: '/updatelogs/2020/february/20200201' },
            ]
          },
          {
            text: '2019',
            collapsed: true,
            items: [
              { text: '2019/10/20', link: '/updatelogs/2019/october/20191020' },
              { text: '2019/10/13', link: '/updatelogs/2019/october/20191013' },
              { text: '2019/10/6', link: '/updatelogs/2019/october/20191006' },
              { text: '2019/8/28', link: '/updatelogs/2019/august/20190828' },
              { text: '2019/7/14', link: '/updatelogs/2019/july/20190714' },
              { text: '2019/5/30', link: '/updatelogs/2019/may/20190530' },
              { text: '2019/5/14', link: '/updatelogs/2019/may/20190514' },
              { text: '2019/5/12', link: '/updatelogs/2019/may/20190512' },
              { text: '2019/5/9', link: '/updatelogs/2019/may/20190509' },
              { text: '2019/5/5', link: '/updatelogs/2019/may/20190505' },
              { text: '2019/5/4', link: '/updatelogs/2019/may/20190504' },
              { text: '2019/2/4', link: '/updatelogs/2019/february/20190204' },
              { text: '2019/1/13', link: '/updatelogs/2019/january/20190113' },
            ]
          },
          {
            text: '2018',
            collapsed: true,
            items: [
              { text: '2018/10/26', link: '/updatelogs/2018/october/20181026' },
              { text: '2018/10/22', link: '/updatelogs/2018/october/20181022' },
              { text: '2018/10/3', link: '/updatelogs/2018/october/20181003' },
              { text: '2018/10/1', link: '/updatelogs/2018/october/20181001' },
              { text: '2018/9/30', link: '/updatelogs/2018/september/20180930' },
              { text: '2018/9/26', link: '/updatelogs/2018/september/20180926' },
              { text: '2018/9/24', link: '/updatelogs/2018/september/20180924' },
              { text: '2018/9/23', link: '/updatelogs/2018/september/20180923' },
              { text: '2018/9/21', link: '/updatelogs/2018/september/20180921' },
              { text: '2018/9/16', link: '/updatelogs/2018/september/20180916' },
              { text: '2018/9/10', link: '/updatelogs/2018/september/20180910' },
              { text: '2018/9/8', link: '/updatelogs/2018/september/20180908' },
              { text: '2018/8/27 起源', link: '/updatelogs/2018/august/20180827' },
            ]
          },
          { text: '远古の起源', link: '/updatelogs/about' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ExpertSneeker/CoreagesWiki' }
    ],

    search: {
      provider: 'local'
    },

    outline: {
      label: '页面导航',
      level: [2, 3]
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
  }
})
