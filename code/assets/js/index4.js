$(function () {

    getUserInfo()

    // 退出功能进行设置
    $('#btnLogOut').on('click', function () {

        layer.confirm('确认退出登录么?', { icon: 3, title: '提示' },
            function (index) {

                // 清空本地存储的token
                localStorage.removeItem('token')
                // 页面跳转回登录页面

                location.href = '/code/login4.html'



                layer.close(index);
            })
    })
})

// 获取用户的基本数据
var layer = layui.layer

function getUserInfo() {

    $.ajax({
        url: '/my/userinfo',
        type: 'get',

        success: function (res) {

            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            layer.msg(res.message)
            console.log(res);

            renderAvater(res.data)
        }
        // 不论是否登录成功，还会返回一些数据，用complete来接收

       
    })
}

// 获取用户信息
function renderAvater(user) {

    // 设置欢迎文本
    let name = user.nickname || user.username

    $('.welcome').html('欢迎&nbsp;&nbsp' + name)

    // 渲染头像
    if (user.user_pic !== null) {
        // 图片头像
        $('.layui-nav-img').
        attr('src', user.user_pic).show()
        // 文本头像
        $('.text-avatar').hide()

    } else {
        $('.text-avatar').html(name[0].toUpperCase()).show()

        $('.layui-nav-img').hide()
    }
}