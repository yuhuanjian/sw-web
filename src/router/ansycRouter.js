export default [{
  path: '/overview',
  icon: 'speedometer',
  name: '概览',
  redirect: '/overview/statistics',
  meta: { title: '概览', icon: 'home', breadcrumb: false },
  children: [{
    path: 'statistics',
    name: '概览',
    component: 'statistics/index',
    meta: { title: '概览', icon: 'home', breadcrumb: true }
  }]
},
{
  path: '/order',
  icon: 'speedometer',
  name: '订单',
  redirect: '/order/orderlist/ordermanager',
  meta: { title: '订单', icon: 'feeds', breadcrumb: false },
  children: [{
    path: 'orderlist',
    name: '订单',
    component: 'template',
    redirect: '/order/orderlist/ordermanager',
    meta: { title: '订单', icon: 'feeds', breadcrumb: true },
    children: [{
      path: 'ordermanager',
      name: '订单管理',
      component: 'orderlist/ordermanager',
      meta: { title: '订单管理', icon: 'form' }
    },
    {
      path: 'addorder',
      name: '新增订单',
      hidden: true,
      component: 'orderlist/addorder',
      meta: {
        title: '新增订单',
        icon: 'form',
        activeMenu: '/order/orderlist/ordermanager'
      }
    },
    {
      path: 'editorder',
      name: '订单编辑',
      hidden: true,
      component: 'orderlist/editorder',
      meta: {
        title: '订单编辑',
        icon: 'form',
        activeMenu: '/order/orderlist/ordermanager'
      }
    },
    {
      path: 'orderdetail',
      name: '订单详情',
      hidden: true,
      component: 'orderlist/orderdetail',
      meta: {
        title: '订单详情',
        icon: 'form',
        activeMenu: '/order/orderlist/ordermanager'
      }
    },
    {
      path: 'addsuccess',
      name: '新增成功',
      hidden: true,
      component: 'orderlist/addsuccess',
      meta: {
        title: '新增成功',
        icon: 'form',
        activeMenu: '/order/orderlist/ordermanager'
      }
    }
    ]
  }]
},
{
  path: '/quarantine',
  icon: 'speedometer',
  name: '检疫',
  redirect: '/quarantine/quarantinelist/rootjy',
  meta: { title: '检疫', icon: 'xiakuangxian', breadcrumb: false },
  children: [{
    path: 'quarantinelist',
    icon: 'speedometer',
    name: '检疫',
    component: 'template',
    redirect: '/quarantine/quarantinelist/rootjy',
    meta: { title: '检疫', icon: 'xiakuangxian', breadcrumb: true },
    children: [{
      path: 'rootjy',
      name: '检疫管理',
      component: 'quarantinelist/rootjy',
      meta: { title: '检疫管理', icon: 'xiakuangxian' }
    },
    //   {
    //     'path': 'qualification',
    //     'name': '合格证管理',
    //     component: 'quarantinelist/qualification',
    //     'meta': { title: '合格证管理', icon: 'xiakuangxian' }
    //   },
    {
      path: 'access',
      name: '准入检疫',
      component: 'quarantinelist/access',
      meta: { title: '准入检疫', icon: 'xiakuangxian' }
    },
    {
      path: 'slaughter',
      name: '准宰检疫',
      component: 'quarantinelist/slaughter',
      meta: { title: '准宰检疫', icon: 'folder-fill' }
    },
    {
      path: 'out',
      name: '准出检疫',
      component: 'quarantinelist/out',
      meta: { title: '准出检疫', icon: 'folder-fill' }
    },
    {
      path: 'outXq',
      name: '准出检疫详情',
      hidden: true,
      component: 'quarantinelist/outXq',
      meta: {
        title: '准出检疫详情',
        icon: 'folder-fill',
        activeMenu: '/quarantine/quarantinelist/out'
      }
    },
    {
      path: 'details',
      name: '检疫详情',
      hidden: true,
      component: 'quarantinelist/details',
      meta: {
        title: '检疫详情',
        icon: 'folder-fill',
        activeMenu: '/quarantine/quarantinelist/rootjy'
      }
    },
    {
      path: 'accessXq',
      name: '准入检疫详情',
      hidden: true,
      component: 'quarantinelist/accessXq',
      meta: {
        title: '准入检疫详情',
        icon: 'folder-fill',
        activeMenu: '/quarantine/quarantinelist/access'
      }
    },
    {
      path: 'accessLR',
      name: '准入检疫录入',
      hidden: true,
      component: 'quarantinelist/accessLR',
      meta: {
        title: '准入检疫录入',
        icon: 'folder-fill',
        activeMenu: '/quarantine/quarantinelist/access'
      }
    },
    {
      path: 'slaughterXq',
      name: '准宰检疫详情',
      hidden: true,
      component: 'quarantinelist/slaughterXq',
      meta: {
        title: '准宰检疫详情',
        icon: 'folder-fill',
        activeMenu: '/quarantine/quarantinelist/slaughter'
      }
    },
    {
      path: 'slaughterLR',
      name: '准宰检疫录入',
      hidden: true,
      component: 'quarantinelist/slaughterLR',
      meta: {
        title: '准宰检疫录入',
        icon: 'folder-fill',
        activeMenu: '/quarantine/quarantinelist/slaughter'
      }
    }
    ]
  }]
},
{
  path: '/monitor',
  icon: 'speedometer',
  name: '监控',
  redirect: '/monitor/monitorlist/monitorlog',
  meta: { title: '监控', icon: 'feeds', breadcrumb: false },
  children: [{
    path: 'monitorlist',
    name: '监控',
    component: 'template',
    redirect: '/monitor/monitorlist/monitorlog',
    meta: { title: '监控', icon: 'feeds', breadcrumb: true },
    children: [{
      path: 'monitorlog',
      name: '监控记录',
      component: 'monitorlist/monitorlog',
      meta: { title: '监控记录', icon: 'form' }
    },

    {
      path: 'classification',
      name: '资料分类',
      component: 'monitorlist/classification',
      meta: { title: '资料分类', icon: 'form' },
      children: []
    },
    {
      path: 'classDetails',
      name: '分类详情',
      hidden: true,
      component: 'monitorlist/classDetails',
      meta: {
        title: '分类详情',
        icon: 'form',
        activeMenu: '/monitor/monitorlist/classification'
      }
    }
    ]
  }]
},
{
  path: '/dispatch',
  icon: 'speedometer',
  name: '调度',
  redirect: '/dispatch/dispatchlist/deliver',
  meta: { title: '调度', icon: 'feeds', breadcrumb: false },
  children: [{
    path: 'dispatchlist',
    name: '调度',
    component: 'template',
    redirect: '/dispatch/dispatchlist/deliver',
    meta: { title: '调度', icon: 'feeds', breadcrumb: true },
    children: [{
      path: 'deliver',
      name: '配送调度',
      component: 'dispatchlist/deliver',
      meta: { title: '配送调度', icon: 'form' }
    },
    {
      path: 'butchermanager',
      name: '屠宰单管理',
      component: 'dispatchlist/butchermanager',
      meta: { title: '屠宰单管理', icon: 'form' }
    },
    {
      path: 'detail',
      name: '详情',
      hidden: true,
      component: 'dispatchlist/detail',
      meta: { title: '详情', icon: 'form' }
    }
    ]
  }]
},
{
  path: '/informations',
  icon: 'speedometer',
  name: '资料',
  redirect: '/informations/information/driver',
  meta: { title: '资料', icon: 'home', breadcrumb: false },
  children: [{
    path: 'information',
    name: '资料',
    component: 'template',
    redirect: '/informations/information/driver',
    meta: { title: '资料', icon: 'feeds', breadcrumb: true },
    children: [{
      path: 'driver',
      name: '司机管理',
      component: 'information/driver',
      meta: { title: '司机管理', icon: 'home', breadcrumb: true }
    },
    {
      path: 'wholesaler',
      name: '批发商管理',
      component: 'information/wholesaler',
      meta: { title: '批发商管理', icon: 'home', breadcrumb: true }
    },
    {
      path: 'branch',
      name: '网点机构',
      component: 'information/branch',
      meta: { title: '网点机构', icon: 'home', breadcrumb: true }
    },
    {
      path: 'car',
      name: '车辆管理',
      component: 'information/car',
      meta: { title: '车辆管理', icon: 'home', breadcrumb: true }
    },
    {
      path: 'merchant',
      name: '商户管理',
      component: 'information/merchant',
      meta: { title: '商户管理', icon: 'home', breadcrumb: true }
    },
    {
      path: 'farm',
      name: '养殖场管理',
      component: 'information/farm',
      meta: { title: '养殖场管理', icon: 'home', breadcrumb: true }
    },
    {
      path: 'market',
      name: '市场管理',
      component: 'information/market',
      meta: { title: '市场管理', icon: 'home', breadcrumb: true }
    },
    {
      path: 'route',
      name: '路由管理',
      component: 'information/route',
      meta: { title: '路由管理', icon: 'home', breadcrumb: true }
    }
    ]
  }]
},
{
  path: '/user',
  icon: 'speedometer',
  name: '员工',
  redirect: '/user/admin/userAdmin',
  meta: { title: '员工', icon: 'home', breadcrumb: false },
  children: [{
    path: 'admin',
    name: '员工',
    component: 'template',
    redirect: '/user/admin/userAdmin',
    meta: { title: '员工', icon: 'feeds', breadcrumb: true },
    children: [{
      path: 'userAdmin',
      name: '员工管理',
      component: 'user/userAdmin',
      meta: { title: '员工管理', icon: 'home', breadcrumb: true }
    },
    {
      path: 'roleAdmin',
      name: '角色管理',
      component: 'user/roleAdmin',
      meta: { title: '角色管理', icon: 'home', breadcrumb: true }
    },
    {
      path: 'setRoot',
      name: '设置权限',
      component: 'user/setRoot',
      hidden: true,
      meta: {
        title: '设置权限',
        icon: 'home',
        breadcrumb: true,
        activeMenu: '/user/admin/roleAdmin'
      }
    },
    {
      path: 'lookRoot',
      name: '查看权限',
      component: 'user/lookRoot',
      hidden: true,
      meta: {
        title: '查看权限',
        icon: 'home',
        breadcrumb: true,
        activeMenu: '/user/admin/userAdmin'
      }
    }
    ]
  }]
}
]
