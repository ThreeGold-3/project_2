$(function(){

    initArtCateList()

   function initArtCateList () {
    $.ajax({
        method: 'GET',
        url:'/my/article/cates',
        success: function(res) {
            // if(res.status !== 0 ){
            //     return layer.msg('获取用户信息失败')
            // }
          let htmlStr = template('tpl-table' ,res)
          $('tbody').html(htmlStr)
        },
    })
   }
   let indexAdd = null
   //添加类别的点击事件
   $('#btnAddCate').on('click',function () {
    indexAdd = layer.open({
        type:1,
        area: ['500px','250px'],
        title: '添加文章分类'
        ,content: $('#dialog-add').html()
      })
   })

//    通过代理（事件委托？）的方式，为form-add表单绑定事件
   $('body').on('submit' , '#form-add',function(e){
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url:'/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0 ){
                    console.log(res.message)
                    return layer.msg('新增分类失败')
                }
                initArtCateList()
                layer.msg('新增分类成功')
                //根据索引关闭弹出层
                layer.close(indexAdd)
            },
        })
   })

})