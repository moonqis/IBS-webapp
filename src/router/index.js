import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/food',
    name: 'food',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/FoodView.vue'),
    children:[{
      path: '/foodlist',
      name: 'foodlist',
      meta: {        //是路由的原数据
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../components/food/foodlist.vue')},
    ]
  },
  {
    path: '/person',
    name: 'person',
    // beforeEnter:(to,from,next)=>{
    //   console.log(store.state.isLogin)
    //          if(store.state.isLogin){
    //            next()
    //          }else{
    //            next("/login")
    //         }
    // },
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/PersonView.vue'),
  },{
    path: '/feed',
    name: 'feed',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/person/feedback.vue'),
  },
  {
    path: '/search',
    name: 'search',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/SearchView.vue'),
  },
  {
    path: '/search_detail',
    name: 'search_detail',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue'),
  },
  {
    path: '/login',
    name: 'login',
 
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/res',
    name: 'res',
 
    component: () => import(/* webpackChunkName: "about" */ '../views/login_add.vue'),
  },
  {
    path: '/collect',
    name: 'collect',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/person/collect.vue'),
  },
  {
    path: '/message',
    name: 'message',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/person/message.vue'),
  },
  {
    path: '/person_detail',
    name: 'person_detail',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/person/person.vue'),
  },
  {
    path: '/person_change',
    name: 'person_change',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/person/change.vue'),
  },
  {
    path: '/help',
    name: 'help',
    meta: {        //是路由的原数据
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/person/help.vue'),
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "about" */ '../views/test.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => { 
  const user = JSON.parse(localStorage.getItem("user"));

  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (user) { // 通过vuex state获取当前的token是否存在    注意token有时效性
      next();//存在就说明登录了，放行
    }
    else {
      next({  //不存在，回退到一个页面，例如登录页面
        path: '/login',
      })
    }
  }
  else {
    next();
  }
})
export default router
