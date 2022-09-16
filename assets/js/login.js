$(function () {
  //点击去注册账号
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  //点击去登陆账号
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  let form = layui.form
  let layer = layui.layer
  // 自定义
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位'],
    repwd: function (value) {
      let pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一样'
      }
    },
  })

  //监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    
    $.post(
      '/api/reguser',
      {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
      },
      function (res) {
        if (res.status !== 0) {
          return console.log(res.message)
        }
        layer.msg('success')
        $('#link_login').click()
      }
    )
    
  })
//监听登陆表单的提交事件
  $('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data : $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('登陆失败')
        }

        layer.msg('success')
        localStorage.setItem('token',res.token)

        location.href = '/index.html'
      }
    })
  })
})
