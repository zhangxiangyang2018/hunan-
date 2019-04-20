/*
 * @Author:  
 * @Date: 2018-11-14 09:01:33 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-04 14:32:14
 */
<template>
  <div class="home">
    <el-container class="homeContent">
      <el-header class="homeHeader">
        <router-link to="/home/file">
          <div class="logo">
            <i>
              <img src="@/assets/images/logo.png">
            </i>
            <p>文件资源管理平台</p>
          </div>
        </router-link>

        <div class="homeNav">
          <ul class="homeNavMenu">
            <li
              :class="{active: activePath== item.path}"
              v-for="(item,index)  in navList "
              :key="index"
              class="file"
              @click="goNav(item)"
            >{{item.name}}</li>

            <div class="keyBtn"></div>
            <div class="userWrap" style="margin-left:;color: #588bc6;">
              <img
                class="userIcon"
                src="@/assets/images/user.jpg"
                style="width:30px;position: relative;top:8px;"
                alt>

           
             </div>
          </ul>
        </div>
      </el-header>
      <el-container class="homeBottom">
        <el-aside class="homeSlide">
          <slide></slide>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import slide from './slide.vue' //侧边栏

import Configport from '../assets/js/address'
import $ from 'jquery'
//console.log(Configport.netUrl);
export default {
  components: {
    slide
  },
  data() {
    return {
      activePath: '',
      navList: []
    }
  },
  watch: {
    $route() {
      this.activePath = this.$route.path
    }
  },
  computed: {
    userName() {
      return window.sessionStorage.getItem('userInfor') == undefined
        ? ''
        : JSON.parse(window.sessionStorage.getItem('userInfor')).userName
    },
    userId() {
      return this.$store.state.userId
    },
    userType() {
      return this.$store.state.userType
    }
  },
  methods: {
    // exit() {
    //   this.$store.dispatch('LogOut')
    //   this.$router.push({ path: '/' })
    // },
    goNav(item) {
      this.activePath = item.path
      this.$router.push({ path: item.path })
    }
  },
  mounted() {
    let that = this
    
  

      let params = {
          userId: this.userId,

        }
     this.$httpPost('user/login',params).then(function(res) {
            // alert(1)
     })
    this.activePath = this.$route.path

    // 初始化一级菜单数据显示
    if (this.userType == 'ADMIN') {
      this.navList = [
        {
          name: '共有空间',
          path: '/home/file'
        }
      ]
    } else {
      this.navList = [
        {
          name: '共有空间',
          path: '/home/file'
        },
        {
          name: '私有空间',
          path: '/home/private'
        },
        {
          name: '订阅空间',
          path: '/home/subscribe'
        }
      ]
    }
  },
  beforeDestroy() {}
}
</script>

<style lang="less" scoped>
.home {
  .active {
    font-weight: bold;
    border-bottom: 2px solid #666;
  }
  height: 100%;
  .homeContent {
    height: 100%;
    background: #f5f5fb;
    .homeHeader {
      width: 100%;
      height: 80px !important;
      padding: 0;
      position: relative;
      background: #fff;
      .logo {
        float: left;
        width: 25%;
        height: 80px;
        background: #2a394b;
        line-height: 80px;
        i {
          float: left;
          margin: 0 1% 0 4%;
          width: 8%;

          img {
            width: 100%;
            vertical-align: middle;
          }
        }
        p {
          text-align: left;
          float: left;
          font-size: 18px;
          color: #fff;
          width: 87%;
          line-height: 80px;
          margin: 0 auto 0 0;
        }
      }
      .homeNav {
        float: left;
        width: 75%;
        box-shadow: 5px 2px 8px rgba(0, 0, 0, 0.3);
        .homeNavMenu {
          position: relative;
          text-align: left;
          li {
            list-style: none;
            width: 100px;
            display: inline-block;
            text-align: center;
            // border-bottom:2px solid blue;
          }
          li:hover {
            cursor: pointer;
          }
          .userWrap {
            position: absolute;
            right: 70px;
            top: -15px;
            .userIcon,
            .userName {
              display: inline-block;
            }
          }
          height: 80px;
          line-height: 78px;
          margin: 0 auto;
          a {
            float: left;
            padding-right: 40px;
            height: 78px;

            .home {
              background: url('../../static/img/home.png') no-repeat left center;
            }
            .curr.home {
              background: url('../../static/img/home1.png') no-repeat left
                center;
            }
            .file {
              background: url('../../static/img/file.png') no-repeat left center;
            }
            .curr.file {
              background: url('../../static/img/file1.png') no-repeat left
                center;
            }
            .state {
              background: url('../../static/img/state.png') no-repeat left
                center;
            }
            .curr.state {
              background: url('../../static/img/state1.png') no-repeat left
                center;
            }
            .access {
              background: url('../../static/img/access.png') no-repeat left
                center;
            }
            .curr.access {
              background: url('../../static/img/access1.png') no-repeat left
                center;
            }
          }
          .keyBtn {
            position: absolute;
            left: 320px;

            span {
              float: left;
              padding: 0 40px;
              overflow: hidden;
              height: 78px;
              cursor: pointer;
              .upload-demo {
                float: left;
                width: 64px;
                color: #333;
              }
              b {
                float: right;
                width: 150px;
                line-height: 78px;
                .el-progress {
                  line-height: 78px !important;
                }
              }
              #exportForm {
                float: left;
                width: 64px;
                color: #333;
                a {
                  padding-right: 0;
                }
              }
            }
            .delete {
              background: url('../../static/img/delete.png') no-repeat left
                center;
            }

            .select.delete {
              color: #000;
              background: url('../../static/img/delete1.png') no-repeat left
                center;
            }
            .upload {
              background: url('../../static/img/upload.png') no-repeat 5px
                center;
            }
            .select.upload {
              color: #000;
              background: url('../../static/img/upload1.png') no-repeat 5px
                center;
            }
            .download {
              background: url('../../static/img/download.png') no-repeat left
                center;
            }
            .select.download {
              color: #000;
              background: url('../../static/img/download1.png') no-repeat left
                center;
            }
          }
          .curr {
            color: #000;
            border-bottom: 2px solid #1d96e3;
          }
        }
      }
    }
    .homeBottom {
      height: calc(100% - 80px);
      .homeSlide {
        width: 25% !important;
        height: 100%;
        background: #2a394b;
      }
      .el-main {
        width: 75%;
        // height: calc(100% - 120px);
      }
    }
  }
}
</style>