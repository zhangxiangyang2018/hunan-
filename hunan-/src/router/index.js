/*
 * @Author:  
 * @Date: 2018-11-14 13:49:15 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-04 13:56:05
 */
import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home' //主页

import file from '@/components/homeChild/file' //文件展示

import subscribe from '@/components/homeChild/subscribe' //订阅控制
import private1 from '@/components/homeChild/private' //私有文件控制

import login from '@/components/homeChild/login'

Vue.use(Router)
export default new Router({
  routes: [
    { path:'/',
   
    redirect: '/home'},
    // {
    // path:'/login',
    // component:login
    // },
    {
      path:'/home',
      component:home,
      redirect: '/home/file',
      children:[
         {
        path:'file',
        component:file
       },{
        path:'private',
        component:private1
       },
       {
        path:'subscribe',
        component:subscribe
       }
        
      ]
    }
   ]
})
