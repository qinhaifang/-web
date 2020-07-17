$(function(){
  $(".layui-nav-child dd").on("click",function(){
      var address =$(this).children('a').attr('_href');
      $(".x-iframe").attr("src",address);
      // $(this).parent().parent().addClass('home_header_active').siblings().removeClass('home_header_active');
  });
  layui.use('laydate', function(){
    var laydate = layui.laydate;
    laydate.render({
      elem: '#homeDate'
      ,position: 'static'
      ,showBottom: false
      ,lang: 'cn'
      ,calendar: true
      ,change: function(value, date){ //监听日期被切换
        // lay('.home-date').html(value);
      }
    });
  }) 
  // 获取时间 
  function time() {
		var nowDate = new Date();
		var year = nowDate.getFullYear();
		var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
		var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
		$(".home-date") .html( year + "年" + month + "月" + date + "日");
  }
  time();
  // table 展示
  function resetBtn(){
    $('input').val('');
  }

  
// --------------------------------------
})

