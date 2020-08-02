$(function (){

    let layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)



    // 为上传按钮绑定点击事件,模拟input被点击
    $('#btnChooseImage').on('click',function (){

        $('#file').click()
    })


// 为input框创建change事件
$('#file').on('change',function(e){

   // 获取选取的集合
let fileList = e.target.files
// 如果长度为零，则提醒客户选择文件
if(fileList.length == 0) {

    return layer.msg('请选择图片')
}

  // 1. 拿到用户选择的文件
  var file = e.target.files[0]
  // 2. 将文件，转化为路径
  var imgURL = URL.createObjectURL(file)
  // 3. 重新初始化裁剪区域
  $image
    .cropper('destroy') // 销毁旧的裁剪区域
    .attr('src', imgURL) // 重新设置图片路径
    .cropper(options) // 重新初始化裁剪区域
})

    // 为确定按钮帮定点击事件
    $('#btnDownload').on('click',function (){


        var dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')

    // 发起请求，将头像传至服务器重新渲染

    $.ajax({
        url:'/my/update/avatar',
        type:'POST',
    
        data:{
            avatar:dataURL
        },
        success: function(res){
            
            if(res.status !== 0) {

              return  layer.msg('头像上传失败')
            }

            layer.msg('头像上传成功')
            window.parent.getUserInfo()
        }

        // 重新渲染头像
        
    });


    })



})

    


