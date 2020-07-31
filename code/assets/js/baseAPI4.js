// 发起数据请求前，请求数据的配置会优先经过$.ajaxPrefilter()这个函数
$.ajaxPrefilter(function(options){

    options.url = 'http://ajax.frontend.itheima.net' + options.url

    console.log(options.url);
})