/*
 * @Author:  
 * @Date: 2018-11-14 09:01:54 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-21 15:28:56
 */
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    // if () {
    //   console.log("eachFile");
    // }
    // }
  }
};
</script>

<style>
body,
html {
  margin: 0 auto;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
.el-checkbox__inner {
  width: 18px !important;
  height: 18px !important;
}
.el-checkbox__inner::after {
  left: 6px !important;
  top: 2px !important;
}
.el-upload--picture-card:hover,
.el-upload:focus {
  color: #333;
  border: none;
}
.el-tree-node__content {
  height: 40px;
}
.el-tree-node__label {
  line-height: 40px;
}
.el-tree-node__content:hover,
 .el-tree-node:focus > .el-tree-node__content {
  background: #32547a !important;
  color: #fff !important;
} 

.el-loading-text {
  color: #333 !important;
  font-size: 26px !important;
}
.el-input__inner {
  border: 1px solid #999 !important;
  color: #333 !important;
}
.el-button--primary {
  background: #588bc6 !important;
  border: none !important;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #eaf2fa !important;
}

.el-button--primary:focus,
.el-button--primary:hover {
  background: #588bc6 !important;
  border: none !important;
}
.el-table td {
  border-bottom: 1px solid #bbb !important;
}
.el-notification {
  cursor: pointer;
}
.el-notification__content {
  color: #000;
  font-size: 18px;
  font-weight: 500;
  margin-top: 0;
}
.el-checkbox {
  display: block;
  line-height: 40px;
  margin-left: 15px !important;
}
</style>


