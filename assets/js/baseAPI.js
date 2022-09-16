// 每次发起ajax请求先调用这个函数
$.ajaxPrefilter(function (options) {
  options.url = 'http://www.liulongbin.top:3007' + options.url

  //为有权限的接口设置请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
        Authorization: localStorage.getItem('token') || '',
      }
  }
  // 全局统一挂载complete回调函数
  options.complete = function(res) {
    // 在complete回调函数中，可以使用res.responseJSON 拿到服务器响应的数据
    if (res.responseJSON.status ===1 && res.responseJSON.message ==='身份认证失败！') {
        //强制清空token
        localStorage.removeItem('token')
        //强制跳转到登陆页
        location.href = '/login.html'
        
    }
}

})
