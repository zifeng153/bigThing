$(function (){

    let form = layui.form
    let layer = layui.layer

    // 给密码框设置校验规则
    form.verify({

    pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,

        // nickname: function (value) {
            
        //     if(value.length > 6 && value.length < 12) {

        //         return '昵称长度需在6到12个字符之间！'
        //     }
    
        samePwd:function(value) {

            if (value === $('[name=oldPwd]').val()) {

                return '新旧密码不能相同'
            }
        },

        resPwd: function(value) {

            if(value !== $('[name=newPwd]').val()) {

                return '两次密码不一致'
            }
        }


    })

    // 发起表单修改密码请求
       $('.layui-form').on('submit',function (e){

        e.preventDefault(

            $.ajax({
                url:'/my/updatepwd',
                type:'POST',
        
                data:$(this).serialize(),
                success: function(res){
                    
                    if(res.status !== 0) {

                        return layer.msg('密码更改失败')
                    }
                    layer.msg('密码更改成功')

                    // 表单的重置
                    $('.layui-form')[0].rest()
                }
            })
        )
    })                                                                                                                                                                                 
})