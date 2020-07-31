$(function(){

    // 设置点击去注册的事件
    $('#link-reg').on('click',function(){

        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 设置点击去登录事件
    $('#link-login').on('click',function(){

        $('.login-box').show();
        $('.reg-box').hide();
    });


    // 获取layui的form表单
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify()函数来自定义验证规则
    form.verify({
        // 自定义名称为pwd的检验规则
        pwd: [/^[\S]{6,12}$/ ,'密码必须6到12位，且不能出现空格'],

        //   检验两次密码不一致规则
        repwd:function(value){
            // 通过形参获取密码确认框的值

            // 获取密码框的值
            var pwd = $('.reg-box [name=password]').val();

            if ( value!==pwd  ){

                return '两次密码不一致'

            }

        }
    });

    // 注册表单的监听事件
    $('#form-reg').on('submit',function(e){

        e.preventDefault();
    // 发起数据请求
    var data = {
        username:$('#form-reg [name = username]').val(),
        password:$('#form-reg [name = password]').val()
    }
$.post('/api/reguser',data,
function(res){
    if (res.status !== 0){

       return layer.msg('注册失败');
    }
        layer.msg('注册成功');
    
    // 模拟点击行为
    $('#link-login').click()
})
    })


    
// 登录表单的监听事件
$('#form-login').submit(function(e) {

    e.preventDefault();
    // 发起ajax请求
    $.ajax({
        url:'/api/login',
        method:'POST',
        data:$(this).serialize(),
        success: function(res){

            if (res.status !== 0){
                return layer.msg('登录失败');
            }
            layer.msg('登录成功'); 
            // 登录成功后将token的值存入本地

            localStorage.setItem('token',res.token)

           location.href = '/index4.html'
        }
    })
})
})

