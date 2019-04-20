

import host from '@/utils/env'
export default {
    user: {
		login: host + '/obsController/login', //  登陆
	
    },
    
    // 共有文件模块
    public:{
        fileTree:host+'/obsController/getTreePublic',// 共有文件树形结构
        add:host+'/obsController/crateFolder',// 创建共有文件件
        search:host+'/obsController/selectFilePublic',//  文件搜索
        upload:host+'/obsController/uploadFile',//  上传文件
        downLoad:host+'/obsController/downloadFile',// 下载文件
        meta:host+'/obsController/attribute',//文件属性
        subscribe:host+'/obsController/addSubscribe',// 订阅文件
        update:host+'/obsController/rename',//修改名称
        del:host+'/obsController/deleteFile',// 删除文件夹
         
    }

    ,//私有文件模块
    private:{
        fileTree:host+'/obsController/getTreePrivate',// 共有文件树形结构
        add:host+'/obsController/crateFolder',// 创建共有文件件
        search:host+'/obsController/selectFilePrivate',//  文件搜索
        upload:host+'/obsController/uploadFile',//  上传文件
        downLoad:host+'/obsController/downloadFile',// 下载文件
        meta:host+'/obsController/attribute',//文件属性
        subscribe:host+'/obsController/addSubscribe'// 订阅文件
    },

    //订阅文件
    subscribe:{
        fileTree:host+'/obsController/getTreeSubscribe', // 订阅文件列表
        search:host+'/obsController/selectFileSubscribe',//  文件搜索
        cancel:host+'/obsController/cancelSubscribe', // 取消订阅
        upload:host+'/obsController/uploadFile',//  上传文件
    }
   ,

     host

}

