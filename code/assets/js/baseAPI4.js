// 发起数据请求前，请求数据的配置会优先经过$.ajaxPrefilter()这个函数
$.ajaxPrefilter(function(options){

    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // console.log(options.url);
    // 为需要请求头的设置统一的方式
    if(options.url.indexOf('/my/') !== -1) {

        options.headers = {

            Authorization:localStorage.getItem('token' || '')
            }
    }

    // 全局统一挂载complete函数
     options.complete = 
        function (res) {
            console.log(res);

            if (res.responseJSON.status !== 0 &&
                res.responseJSON.message !== "获取用户基本信息成功！") {

                // 清空本地存储的token
                localStorage.removeItem('token')
                // 页面跳转回登录页面

                location.href = '/code/login4.html'

            }
        
     }
})