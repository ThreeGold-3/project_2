$(function() {
    getUserInfo()

    let layer = layui.layer
    $('#btnLogout').on('click',function(){
        //提示用户确认退出
        layer.confirm('is not?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 1、清空本地存储的token
            localStorage.removeItem('token')
            // 2、重新跳转登陆页面
            location.href = '/login.html'
            //关闭confirm询问框
            layer.close(index);
          });
    })
})

function getUserInfo() {
    $.ajax ({
        method: 'GET',
        url: '/my/userinfo',
        headers : {
            Authorization: localStorage.getItem('token') || ''
        },
        success:function (res) {
            if (res.status !==0 ) {
                return layui.layer.msg('获取失败')
            }
            renderAvatar(res.data)
        },
        // complete: function(res) {
        //     // 在complete回调函数中，可以使用res.responseJSON 拿到服务器响应的数据
        //     if (res.responseJSON.status ===1 && res.responseJSON.message ==='身份认证失败！') {
        //         //强制清空token
        //         localStorage.removeItem('token')
        //         //强制跳转到登陆页
        //         location.href = '/login.html'
                
        //     }
        // }
    })
}

//渲染用户头像
function renderAvatar (user) {
        let name = user.nickname || user.username
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src',user.user_pic).show()
            $('.text-avatar').hide()

        } else {
            $('.layui-nav-img').hide
            let first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()

        }
}