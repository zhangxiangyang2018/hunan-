import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {
  Message
} from 'element-ui'
import {
  getUserType
} from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {

   NProgress.start();
  // // 已经登录了则用户名缓存
  if ( getUserType()) {
  
    
     NProgress.done()
   

    next();
  } else {
    Message({
      message: "请登录",
      type: 'error',
      duration: 1000
    })
    NProgress.done()
   
  }

})


router.afterEach(() => {
  NProgress.done() // 结束Progress
})
