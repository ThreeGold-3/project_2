$(function () {
  let form = layui.form
  let layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samePwd: function (value) {
        if ($('[name=oldPwd]').val() === value) {
          return '两次密码不能一样'
        }
      },
      rePwd: function (value) {

        if ($('[name=newPwd]').val() !== value) {
          return '两次密码不一样'
        }
      },
  })

    //发起重置密码
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url:'/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0 ){
                    return layer.msg('获取用户信息失败')
                }
                layer.msg('更新用户信息成功')
                //并且清空表单
                $('.layui-form')[0].reset()
            },
        })
})
})
