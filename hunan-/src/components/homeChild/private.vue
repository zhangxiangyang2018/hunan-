<template>
  <!-- 私有文件 -->

  <div class="file">
    <div class="loading" v-if="isuploading">
      <span>
        正在拼命上传中......
        <i class="el-icon-loading"></i>
      </span>
    </div>
    <div class="fileContent">
      <i class="el-icon-arrow-left backBtn" v-if="backState" @click="goBack()">返回上一级</i>
      <div class="content">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          class="addFloder"
          v-if="backState&&userType!='ADMIN'"
          @click="addFloder()"
        >新增</el-button>

        <el-input style="width: 200px;" placeholder="请输入文件名称" clearable v-model.trim="keyWords"></el-input>
        <el-button type="primary" @click="search()">搜索</el-button>
        <div class="floder">
          <div
            class="eachFile"
            v-for="(item,index)   in   children"
            :key="index"
            @contextmenu.prevent="contextmenu(index,item)"
            :style="item.name==crtlName?curr:''"
            @click="ctrlClick(item)"
            @dblclick="knockLi(item)"
          >
            <img :src="item.type == 0 ? floder : file">
            <div
              :title="item.name"
              class="name"
              style=" overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        line-height: 23px;
        max-height: 46px;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;"
            >{{item.name}}</div>
            <!-- 右击展示 -->
            <ul
              class="contextmenu"
              v-if="item.id==contextId&&contextId==ctrlId"
              @mouseleave="hideMenu()"
            >
              <li v-if="item.type==1" @click="seeAttr(item)">属性</li>
              <li style="position:relative" v-if="item.type==0">
                <span style=" margin-right: 5px;">上传</span>
                <input
                  type="file"
                  style=" position: absolute;left: 0;top: 0;opacity: 0"
                  @change="fileUpload(item.id)"
                >
              </li>
              <li @click="downLoad(item)" v-if="item.type==1">下载</li>
              <li @click="update(item)" v-if="userType!='ADMIN'">修改</li>
              <li @click="del(item)" v-if="userType!='ADMIN'">删除</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="新增文件夹" :visible.sync="isAdd" width="40%">
      <el-form :model="add" label-width="120px">
        <el-form-item label="文件夹名称:">
          <el-input v-model="add.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSure()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 属性列表 -->
    <el-dialog title="文件属性" :visible.sync="isAttribute" width="40%">
      <el-table :data="attrData" style="width: 100%">
        <el-table-column prop="fileName" label="文件名"></el-table-column>
        <el-table-column prop="fileSize" label="文件大小"></el-table-column>
        <el-table-column prop="fileUpTime" label="上传时间"></el-table-column>
      </el-table>
    </el-dialog>

    <!-- 修改名称 -->
    <div>
      <el-dialog title="修改名称" :visible.sync="isUpdate" width="30%">
        <el-input placeholder="请输入内容" v-model="updateName" clearable></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isUpdate= false">取 消</el-button>
          <el-button type="primary" @click="submitUpdate()">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 引入   floder.png
import floderImage from '../../assets/images/floder.png'
//  引入 filePic.png
import fileImage from '../../assets/images/filePic.png'
import axios from 'axios'

import host from '@/utils/env'
export default {
  data() {
    return {
      isUpdate: false, // 修改框显示
      updateName: '', // 修改名称
      updateObj: {}, //修改的对象

      isuploading: false, // 正在上传中状态
      attrData: [], //  文件属性
      isAttribute: false, // 属性列表显示
      keyWords: '', // 搜索关键字
      isAdd: false, //新增弹出层
      add: {
        name: ''
      },

      arr: [],
      curr: {
        background: 'rgba(48, 118, 204, 0.2)',
        border: '1px solid #1d96e3'
      },
      props1: {
        label: 'name'
      },
      backState: false, // 返回上一级的按钮显示状态
      crtlName: '', // 单机获取文件的名称
      ctrlId: '', //  单击的id
      fileIndex: null, //右击获取当前点击文件的下标
      floder: floderImage, //文件夹
      file: fileImage, // 文件
      treeData: [], //生成树形结构
      parentId: 0, // 父id
      children: [], // 点击展示的chilren
      isParent: false, // 是否为顶层
      parentItem: {},
      contextId: null, // 右击的id
      menuArr: [], // 平级树初始化变量
      storeTree: [] // 公共树
    }
  },
  computed: {
    active() {
      return this.$store.state.current
    }
  },
  watch: {
    active() {
      let that = this

      that.backState = true
      function getArray(data, id) {
        for (var i in data) {
          if (data[i].id == id && data[i].type == '0') {
            that.parentId = data[i].parentId
            that.children = data[i].children

            that.parentItem = data[i]
            break
          } else {
            getArray(data[i].children, id)
          }
        }
      }
      getArray(this.treeData, this.active.id)
    }
  },
  created() {},
  mounted() {
    this.init()
  },
  computed: {
    active() {
      return this.$store.state.current
    },
    userId() {
      return this.$store.state.userId
    },
     userType(){
       return this.$store.state.userType
    }
  },

  methods: {
    //修改模态框显示
    update(item) {
      this.updateName = ''
      this.updateName = item.name
      this.isUpdate = true
      this.updateObj = {}
      this.updateObj = {
        parentId: item.parentId,
        id: item.id
      }
    },
    // 修改名称提交
    submitUpdate() {
      let that = this
      this.updateObj.name = this.updateName
      this.$httpPost('public/update', this.updateObj).then(function(res) {
        if (res.data.code == 1) {
          that.$message({
            message: res.data.message,
            type: 'success',
            duration: 1000
          })
          that.init()
          that.isUpdate = false
        }

        if (res.data.code == 0) {
          that.$message({
            message: res.data.message,
            type: 'error',
            duration: 1000
          })

          that.isUpdate = false
        }
      })
    },
    del(item) {
      let that = this
      let params = {
        id: item.id,
        isDir: item.type == 0 ? 'yes' : 'no'
      }
      if (item.istop == 'top') {
        that.$message({
          message: '顶级节点不能删除',
          type: 'warning',
          duration: 1000
        })
      } else {
        that
          .$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          })
          .then(() => {
            that.$httpPost('public/del', params).then(function(res) {
              if (res.data.code == 0) {
                that.$message({
                  message: res.data.message,
                  type: 'success',
                  duration: 1000
                })
                that.init()
              }

              if (res.data.code == -1) {
                that.$message({
                  message: res.data.message,
                  type: 'error',
                  duration: 1000
                })
                // that.init();
              }
            })
          })
          .catch(() => {
            that.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    },
    seeAttr(item) {
      let that = this
      this.isAttribute = true
      let params = {
        path: item.path,
        index: item.type
      }
      this.$httpPost('private/meta', params).then(function(res) {
        if (res.data.code == 0) {
          that.attrData = []
          that.attrData.push(res.data.data)
        }
      })
    },
    //下载文件
    downLoad(item) {
      var link = document.createElement('a')
      link.setAttribute('download', '')
      link.href =
        host +
        '/obsController/downloadFile?fname=' +
        item.name +
        '&fpath=' +
        item.path
      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
    },

    fileUpload(id, ev) {
      let that = this
      that.isuploading = true

      var e = ev || window.event

      var form = new FormData() // FormData 对象
      form.append('files', e.currentTarget.files[0]) // 文件对象
      form.append('id', id)
      form.append(
        'uploader',
       this.userId
      )

      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      this.$httpUpload('private/upload', form, config)
        .then(res => {
          that.isuploading = false
          if (res.data.code == 0) {
            that.$message({
              message: '上传成功',
              type: 'success'
            })
            that.backState = false
            that.init()
          }

          if (res.data.code == 1) {
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
        .catch(res => {
          that.isuploading = false
          that.$message({
            message: '网络中断',
            type: 'error'
          })
        })
    },
    //搜索
    search() {
      let that = this
      let params =
        'keyWord=' +
        this.keyWords +
        '&ower=' +
        this.userId
      if (this.keyWords.length) {
        this.$httpGet('private/search', params).then(function(res) {
          if (res.data.code == 0) {
            that.children = res.data.data
            that.backState = false
          }
        })
      }
    },
    //新增文件夹
    addFloder() {
      this.add.name = ''
      this.isAdd = true
    },
    // 新增确定
    addSure() {
      let that = this
      // var result = JSON.parse(window.sessionStorage.getItem('userInfor'))
      //console.log(this.parentItem)
      let params = {
        filePath: this.parentItem.path,
        parentId: this.parentItem.id,
        fileName: this.add.name,

        ower: this.userId
      }
      //  let params = {
      //   filePath: "F:/数据中心/快快快",
      //   parentId: 0,
      //   fileName: "快快快",

      //   ower: result.userId
      // }
      //console.log(  params)
      this.$httpPost('private/add', params).then(function(res) {
        if (res.data.code == 0) {
          that.init()
          that.isAdd = false
          that.backState = false
        }
      })
    },

    //树形结构扁平转化
    flatten(menus) {
      this.menuArr = []
      let menuArr = this.menuArr
      function spread(menus) {
        for (var i = 0; i < menus.length; i++) {
          let menu = menus[i]
          if (menu.children) {
            spread(menu.children)
            delete menu.children
          }
          menuArr.push(menu)
        }

        return menuArr
      }

      spread(menus)
    },

    //平级结构转化成树形结构
    toTree(data) {
      // 删除 所有 children,以防止多次调用
      data.forEach(function(item) {
        delete item.children
      })

      // 将数据存储为 以 id 为 KEY 的 map 索引数据列
      var map = {}
      data.forEach(function(item) {
        map[item.id] = item
      })

      var val = []
      data.forEach(function(item) {
        // 以当前遍历项，的pid,去map对象中找到索引的id
        var parent = map[item.parentId]

        // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
          ;(parent.children || (parent.children = [])).push(item)
        } else {
          //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
          val.push(item)
        }
      })
      return val
    },
    //首次进来获取最外层
    init() {
      // //深拷贝原对象

      let that = this
      that.$store.dispatch('setTree', [])
      let params = {
        ower: this.userId
      }
      //  console.log(JSON.parse(sessionStorage.getItem("userInfor")).userId)
      this.$httpPost('private/fileTree', params).then(function(res) {
        if (res.data.code == 200) {
          that.treeData = []
          that.treeData = res.data.data
          if (that.treeData.length == 0) {
            that.children = []
            return
          }
          if (Object.keys(that.parentItem).length == 0) {
            that.children = that.treeData
          } else {
            that.backState = true
            function getArray(data, id) {
              for (var i in data) {
                if (data[i].id == id) {
                  that.children = data[i].children
                  break
                } else {
                  getArray(data[i].children, id)
                }
              }
            }
            getArray(that.treeData, that.parentItem.id)
          }

          let arr = JSON.parse(JSON.stringify(that.treeData))
          that.flatten(arr)
          let memu = that.menuArr
          for (var i = 0; i < memu.length; i++) {
            if (memu[i].type == 1) {
              that.menuArr.splice(i--, 1)
            }
          }
          let tree = that.toTree(that.menuArr)

          that.$store.dispatch('setTree', tree)
        }
      })
    },
    // 右击显示菜单
    contextmenu(index, item) {
      this.contextId = item.id
    },
    //  左击选中样式
    ctrlClick(item) {
      this.crtlName = item.name
      this.ctrlId = item.id
    },
    // 鼠标悬浮隐藏菜单
    hideMenu() {
      this.ctrlId = null
      this.contextId = null
      this.crtlName = ''
    },
    //双击展开子菜单
    knockLi(item) {
      let that = this

      //首先保存每次点击的id 为下一次返回上级别做id  存储工作
      that.backState = true

      function getArray(data, id) {
        for (var i in data) {
          if (data[i].id == id && data[i].type == '0') {
            that.children = data[i].children

            that.parentId = data[i].parentId
            that.parentItem = data[i]
            break
          } else {
            getArray(data[i].children, id)
          }
        }
      }
      getArray(this.treeData, item.id)
    },
    // 返回上一级
    goBack() {
      let that = this

      console.log(that.parentId)
      function getArray(data, id) {
        // 监测是否为顶级目录如果是则展示最原始的循环数据将返回上一级的按钮隐藏掉
        if (that.parentItem.istop == 'top') {
          that.children = that.treeData
          that.backState = false
          return
        }
        for (var i in data) {
          if (data[i].id == id && data[i].type == '0') {
            that.parentId = data[i].parentId
            that.children = data[i].children
            //记录当前点击id作为返回上一级的parentId

            that.parentItem = data[i]
            break
          } else {
            getArray(data[i].children, id)
          }
        }
      }
      getArray(this.treeData, this.parentId)
    }
  }
}
</script>

<style lang="less">
.file {
  .loading {
    position: fixed;
    width: 100%;
    height: 100%;
    text-align: left;
    z-index: 2000;
    span {
      position: absolute;

      display: block;
      width: 100%;
      top: 3%;
      text-align: center;
      left: 30%;
      transform: translateX(-50%);
    }
  }
  .curr {
    background: rgba(48, 118, 204, 0.2);
    border: 1px solid #1d96e3;
  }

  width: 100%;
  height: 100%;

  .fileContent {
    display: block;
    width: 100%;
    background: #fff;
    border-radius: 10px;
    height: 100%;
    -webkit-box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    position: relative;
    min-height: 100px;
    overflow-y: scroll;
    .backBtn {
      margin: 30px;

      left: 30px;
      position: absolute;
    }

    .backBtn:hover {
      cursor: pointer;
    }

    .content {
      position: relative;
      top: 60px;

      .floder {
        height: 20px;
        margin-top: 60px;
        padding: 0 30px;
        text-align: left;

        .eachFile {
          width: 14%;
          height: 140px;
          margin: 15px;
          display: inline-block;
          padding: 20px 0;

          position: relative;
          text-align: center;
          position: relative;

          img {
            width: 60%;
            min-width: 60px;
            max-width: 120px;
          }

          .name {
            min-height: 30px;
            line-height: 30px;
          }

          .contextmenu {
            margin: 0;
            background: #fff;
            width: 100px;
            z-index: 100;
            position: absolute;
            left: 80px;
            top: 60px;
            list-style-type: none;
            padding: 5px 0;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 400;
            color: #333;
            box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);

            li {
              list-style: none;
              height: 30px;
              line-height: 30px;
            }

            li:hover {
              background: #ddd;
              cursor: pointer;
            }
          }
        }

        .eachFile:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
