/*
 * @Author:  
 * @Date: 2018-11-14 09:01:47 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-22 15:59:02
 */
<template>
  <div class="slide">
    <div class="slideNav">
      <div></div>
      <el-tree
        :data="arrData"
        :props="defaultProps"
       
        :default-checked-keys="active"
        ref="tree"
        @node-click="handleNodeClick"
        node-key="id"
        @check="handleNodeClick"
      ></el-tree>
    </div>
  </div>
</template>
<script>
import Configport from '../assets/js/address'

var IP = Configport.netUrl
export default {
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      }
      // active:[]
    }
  },
  computed: {
    // 接受从后台返回来的数据
    arrData() {
      return this.$store.state.treeData
    },
    //选中的节点数组
    active() {
      let arr = []
      arr.push(this.$store.state.currentId)
      return arr;
    }
  },
  mounted() {},
  methods: {
    handleNodeClick(data) {
      this.$store.dispatch('setCurrent', data)
    
    }
  }
}
</script>
<style lang="less" scoped>
.slide {
  background: #253242;
  position: relative;
  height: 100%;
  .slideSearch {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10px;
    .el-input {
      width: 96%;
      margin: auto;
    }
  }
  .el-tree {
    background: #253242;
    color: #fff;
    font-size: 16px;
    padding-top: 10px;
  }
  // .el-tree-node__content:hover {
  //   background: rgba(0, 0, 0, 0);
  // }
}
</style>