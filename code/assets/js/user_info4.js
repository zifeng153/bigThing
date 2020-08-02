$(function (){

    let form = layui.form
    let layer = layui.layer

    form.verify({

        nickname: function (value) {
            
            if(value.length > 6) {

                return '昵称长度需在1~6个字符之间！'
            }
        }
    })

    initInfo()
    // 初始化用户的基本信息
    function initInfo() {

        $.ajax({
            url:'/my/userinfo',
            type:'get',
       
            success: function(res){
        
                if(res.status !== 0){

                    return layer.msg('获取数据失败')
                }
              console.log('获取数据成功')
                
              console.log(res);
                // 用form.val()为表单快速赋值
              form.val('formUserInfo',res.data)
            }
        });
    }

    // 给重置按钮绑定事件
    $('#btnRest').on('click',function (e) {

        e.preventDefault()
        initInfo()
    })


    // 提交表单数据给后台
    $('.layui-form').submit(function(e) {

        e.preventDefault();
    $.ajax({
        url:'/my/userinfo',
        type:'post',
     
        data:$('.layui-form').serialize(),
        success: function(res){
            
            if(res.status !== 0) {
                return  layer.msg('更新失败')
            }
            layer.msg('更新成功')



            // 调用index4中的getUserInfo()，对头像部分进行重新渲染
        
            window.parent.getUserInfo()
        
        
        }
    });

    })


})