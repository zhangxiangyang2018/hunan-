function UpladFile( ) { 
    var filObj = document.getElementById("file").files[0]
    var url = 'http://192.168.5.28:8091/obsController/uploadFile'
    var   form = new  FormData()
    form.append('file',filObj)
    xhr = new XMLHttpRequest();
    xhr.open("post",url,true)
    xhr.onload= uploadComplete
    xhr.onerror =  uploadFailed 
    xhr.upload.onprogress=  progressFunction
    xhr.upload.onloadstart =  function(){
        ot =  new Date().getTime() ;// 
        oloaded= 0
    }

   xhr.send(form)



 }

 function uploadComplete (evt){
     var data = JSON.parse(evt.target.responseText)
     if(data.success) {
        
     }
 }


 function uploadFailed(evt)(
     alert("上传失败")
 )


 function cancleUploadFile(){
    xhr.abort()
 }

 function  progressFunction( ) {
    var progressBar = document.getElementById("progressBar");
    var percentageDiv = document.getElementById("percentage");
    //   event.taotal 是需要传输的总字节 ，event.loaded 是已经传输的字节
    if(evt.lengthComputable) {
        progressBar.max = evt.total;
        personalbar.value = evt.loaded;
        percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100) + "%";
    }
     var time  =  document.getElementById("time");
     var nt = new Date().getTime(); //获取当前时间
     var perload =  evt.loaded- oloaded;
     oloaded = evt.loaded;
     
 }