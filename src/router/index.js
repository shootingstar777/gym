import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views//user/Login.vue')
  },
  {
    path: '/adminHome',
    component: () => import('../views/user/adminHome.vue'),
    children: [
      {
        path:'/',
        redirect: '/userManage'
      },
      {
        path: '/userManage',
        name: '用户管理',
        component: () => import('../views/manage/userManage.vue')
      },
      {
        path: '/passManage',
        name: '通过申请',
        component: () => import('../views/manage/passManage.vue')
      },
      {
        path: '/postManage',
        name: '论坛管理',
        component: () => import('../views/manage/postManage.vue')
      },
      {
        path: '/allPass',
        name: '所有申请',
        component: () => import('../views/manage/allPass.vue')
      },
    ]
  },
  {
    path: '/home',
    component: () => import('../views/user/Home.vue'),
    children: [{
        path: '/',
        redirect: '/detail',
      },
      {
        path: '/detail',
        name: 'detail',
        component: () => import('../views/apply/detail.vue')
      },
      {
        path: '/basketball',
        name: '篮球场地申请',
        component: () => import('../views/apply/basketball.vue')
      },
      {
        path: '/badminton',
        name: '羽毛球场地申请',
        component: () => import('../views/apply/badminton.vue')
      },
      {
        path: '/postHome',
        component: () => import('../views/posts/PostHome.vue'),
        children: [{
            path: '/',
            redirect: '/post',
          }, {
            path: '/personal',
            component: () => import('../views/posts/Personal.vue')
          },
          {
            path: '/myPost',
            component: () => import('../views/posts/MyPost.vue')
          }, {
            path: '/post',
            component: () => import('../views/posts/Post.vue')
          }
        ]
      }

    ]
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!window.sessionStorage.getItem('token') && to.path !== '/login') {
    next('/login')
    return;
  }
  if (window.sessionStorage.getItem('token') && to.path == '/login') {
    sessionStorage.removeItem('token')
    return;
  } 
  if (to.path == from.path) {
    return;
  }
  next()
})

export default router