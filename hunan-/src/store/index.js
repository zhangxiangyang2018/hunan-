/*
 * @Author:  
 * @Date: 2018-11-14 13:49:06 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-04 14:21:16
 */
import Vue from 'vue'
import Vuex from 'vuex'
import {
  getUser,
  setUser,
  removeUser,
  getUserType,
  setUserType,
  removeUserType
} from '@/utils/auth'
Vue.use(Vuex)

const store = new Vuex.Store({
  // strict: true,
  state: {
    userId:  getUser(), //  角色id 1.代表普通用户 0.代表admin 管理员
    treeData: [], // 树形结构数据
    current: {}, // 当前 选中的 树形节点
    userType:getUserType(),
    Admin:'abcdefg'
  },

  mutations: {

    getUserId: (state, id) => {
      state.userId = id
    },
    getTree: (state, tree) => {
      state.treeData = tree
    },
    getCurrent: (state, obj) => {
      state.current = obj
    },
    getUserType:(state, type) => {
      state.userType = type
    }
  },
  actions: {
    setUserType: ({
      commit
    }, type) => {
      commit('getUserType', type)
      setUserType(type)
    },
    // 设置用户角色做浏览器缓存持久化
    setUserId: ({
      commit
    }, id) => {
      commit('getUserId', id)
      setUser(id)
    },
    setTree: ({
      commit
    }, treeData) => {
      commit("getTree", treeData)
    },
    setCurrent: ({
      commit
    }, obj) => {
      commit("getCurrent", obj)
    },
     // 登录退出操作
     LogOut: ({
      commit
    }) => {
     
      commit('getUserId', null);
      removeUser()
      removeUserType()
      window.sessionStorage.clear()
    },
  }
})
export default store
