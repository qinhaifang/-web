
layui.use(['form', 'layer','laydate','tree', 'util','formSelects'], function(){
    var form = layui.form
    ,layer = layui.layer,
    laydate = layui.laydate,
    tree = layui.tree,
    util = layui.util,
    formSelects = layui.formSelects,
    data1 = JSON.parse(localStorage.getItem('area'));
    // var option  = '<option value=""></option><option value="0">写作</option><option value="1" selected="">阅读</option>'
    // $('select[name="pool"]').append(option); 
    tree.render({
        elem: '#tree'
        ,data: data1
        ,showLine: false  //是否开启连接线
        ,click: function(obj){
          console.log(obj.data); //得到当前点击的节点数据
          console.log(obj.state); //得到当前节点的展开状态：open、close、normal
          console.log(obj.elem); //得到当前节点元素
          console.log(obj.data.children); //当前节点下是否有子节点
        }
      });
      form.render('select');
      formSelects.config('tags', {
        keyName: 'title',
        keyVal: 'id',
        keyChildren: 'children'
      }).data('address', 'local', {
        arr: JSON.parse(localStorage.getItem('areas')),
        linkage: true
      }); 
      // formSelects.value('')
    
})  
var height = window.innerHeight-280;
$('.wdbt-list').css('height',height+80+'px')
layui.use(['table','element'], function(){
    var table = layui.table,
    element = layui.element;
    var type = $('.wdbt-list .layui-tab-title .layui-this').attr('data-type')
    var reloadTable = table.render({
        elem: '#wdbtList1'
        ,url:'../../js/wdbt/jsonData.json'
        ,height:height+'px'
        // ,skin: 'line' //行边框风格
        ,even: true //开启隔行背景
        ,data:''
        ,cols: [[
            {field:'id', width:80, title: '年度',align:'center'}
            ,{field:'username', width:'', title: '补贴类型',align:'center'}
            ,{field:'sex', width:120, title: '发放周期',align:'center'}
            ,{field:'city', width:150, title: '申报面积',align:'center'}
            ,{field:'sign', title: '确权面积', width: 100,align:'center'}
            ,{field:'experience', width:150, title: '预算总金额',align:'center'}
            ,{field:'experience', width:150, title: '实际补贴金额',align:'center'}
            ,{field:'score', width:150, title: '已发放金额',align:'center'}
            ,{field:'classify', width:150, title: '未发放金额',align:'center'}
            ,{field:'wealth', width:150, title: '结余金额',align:'center'}
            ,{field:'wealth', width:150, title: '开始时间',align:'center'}
            ,{field:'wealth', width:150, title: '结束时间',align:'center'}
            ,{field:'', width:150, title: '操作',align:'center',toolbar: '#barDesc'}
        ]]
        ,page: true
    });
    element.on('tab(wdbtTab)', function(data){
        type = $('.wdbt-list .layui-tab-title .layui-this').attr('data-type');
        // reloadTable.reload({data:data});
       if(type == 1){
        reloadTable.reload({data:data});
       }else if(type == 2){
          table.render({
            elem: '#wdbtList2'
            ,url:'../../js/wdbt/jsonData.json'
            ,height:height+'px'
            ,data:''
            ,cols: [[
                {field:'id', width:80, title: '年度',align:'center'}
                ,{field:'username', width:'', title: '补贴类型',align:'center'}
                ,{field:'sex', width:120, title: '发放频次',align:'center'}
                ,{field:'city', width:150, title: '预算总金额',align:'center'}
                ,{field:'sign', title: '发放次数', width: 100,align:'center'}
                ,{field:'experience', width:150, title: '实际补贴金额',align:'center'}
                ,{field:'score', width:150, title: '已发放金额',align:'center'}
                ,{field:'classify', width:150, title: '未发放金额',align:'center'}
                ,{field:'wealth', width:150, title: '结余金额',align:'center'}
                ,{field:'', width:150, title: '操作',align:'center',toolbar: '#barDesc'}
            ]]
            ,loading: true
            ,page: true
        });
       }else if(type == 3){
          table.render({
            elem: '#wdbtList3'
            ,url:'../../js/wdbt/jsonData.json'
            ,height:height+'px'
            ,data:''
            ,cols: [[
                {field:'id', width:80, title: '年度',align:'center'}
                ,{field:'username', width:'', title: '补贴类型',align:'center'}
                ,{field:'sex', width:120, title: '发放频次',align:'center'}
                ,{field:'city', width:150, title: '预算总金额',align:'center'}
                ,{field:'sign', title: '发放次数', width: 100,align:'center'}
                ,{field:'experience', width:150, title: '实际补贴金额',align:'center'}
                ,{field:'score', width:150, title: '已发放金额',align:'center'}
                ,{field:'classify', width:150, title: '未发放金额',align:'center'}
                ,{field:'wealth', width:150, title: '结余金额',align:'center'}
                ,{field:'', width:150, title: '操作',align:'center',toolbar: '#barDesc'}
            ]]
            ,loading: true
            ,page: true
        });
       }
    });
    
    table.on('tool(wdbtList)', function(obj){
        var data = obj.data;
        console.log(111,obj)
        if(obj.event === 'detail'){
          layer.msg('查看：'+ data.id + ' 的查看操作');
          layer.open({
            type:2,
            title: '',
            area: ['100%', '100%'],
            content:'../../page/wdbt/desc.html',
            success: function(layero){
                // layero.find('.layui-layer-min').remove();
                // layero.find('.layui-layer-max').remove();
            }
          }) 
        }
        // else if(obj.event === 'del'){
        //     layer.confirm('真的删除行么', function(index){
        //       obj.del();
        //       layer.close(index);
        //     });
        //   } else if(obj.event === 'edit'){
        //     layer.alert('编辑行：<br>'+ JSON.stringify(data))
        //   }
      });
    // 详情table
    table.render({
      elem: '#descTable'
      ,url:'../../js/wdbt/data.json'
      ,type: "GET"
      ,title: '详情数据'
      // ,skin: 'line' //行边框风格
      ,even: true //开启隔行背景
      // ,height:'600px'
      ,totalRow: true
      ,cols: [[
        {field:'id', title:'区域（11个）', width:130, fixed: 'left', unresize: true,totalRowText: '合计'}
        ,{field:'sex', title:'县总数', width:100}
        ,{field:'logins', title:'乡镇总数', width:100, totalRow: true}
        ,{field:'logins', title:'村总数',width:100}
        ,{field:'username', title:'补贴户数(户)', width:130}
        ,{field:'email', title:'申报面积(亩)', width:140}
        ,{field:'experience', title:'流转耕地面积', width:140,totalRow: true}
        ,{field:'city', title:'确权确地实测面积(亩)', width:200}
        ,{field:'ip', title:'“六不补”扣除面积（亩）', width:220}
        ,{field:'joinTime', title:'质量达不到耕种条件面积', width:220}
        ,{field:'joinTime', title:'其他不补面积(亩)', width:180}
        ,{field:'experience',title:'发放金额',width:120},
        ,{field:'experience',title:'完成时间',width:120},
        ,{fixed: 'right', title:'操作', toolbar: '#barDemo', width:110}
      ]]
      ,loading: true
      ,page: true
      ,response: {
        statusCode: 200 //重新规定成功的状态码为 200，table 组件默认为 0
      }
      ,parseData: function(res){ //将原始数据解析成 table 组件所规定的数据
        return {
          "code": res.status, //解析接口状态
          "msg": res.message, //解析提示文本
          "count": res.total, //解析数据长度
          "data": res.rows.item //解析数据列表
        };
      },
      done:function(data){
        $.each(data.data,function(index,item){
          var length = data.data.length;
          if(item.sex == '男'){
            $('.stateBtn').eq(length+index).html('审核').addClass('shenhe').attr('lay-event','shenhe');
          }else if(item.sex == '女'){
            $('.stateBtn').eq(length+index).html('审核通过').addClass('pass').removeClass('shenhe').attr('lay-event','pass');
          }else if(item.sex == ''){
            $('.stateBtn').eq(length+index).html('审核失败').addClass('waring').removeClass('shenhe').attr('lay-event','waring');
          }
        })
      }
    });
    // 审核
    var checkTable = table.render({
      elem: '#checkTable'
      ,url:'../../js/wdbt/jsonData.json'
      ,height:'280px'
      ,even: true
      ,cols: [[
        {type:'checkbox'},
        {field:'id', width:80, title: '序号',align:'center'}
        ,{field:'username', width:'', title: '规则名称',align:'center'}
      ]]
      ,where: {   //入参
        curr:1,
        id:''
      }
      ,even:false
      ,loading: true
      ,page: false
  });
  var arr = [];
  table.on('checkbox(checkTable)', function(obj){
    console.log(obj);
    console.log(obj.checked); //当前是否选中状态
    console.log(obj.data); //选中行的相关数据
    console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
    if(obj.checked){
      if(obj.type == 'all'){
        arr = []
      }else{
        arr.push(obj.data.id)
      }
    }else{
      var index = arr.indexOf(obj.data.id);
      if (index > -1) {
        arr.splice(index, 1);
      }
    }
    console.log(arr)
  });
  table.on('tool(descTable)', function(obj){
    var data = obj.data;
    console.log('校验',obj.data)
    if(obj.event === 'shenhe'){
      checkTable.reload({where:{id:obj.data.id}})
      layer.open({
        type: 1
        ,title:'审核'
        ,offset: type 
        ,scrollbar:false 
        ,id: 'layerDemo'+type //防止重复弹出
        ,area: ['50%', '52%']
        ,content: $('#checkBlock')
        ,btn: '校验'
        ,btnAlign: 'c' //按钮居中
        ,shade: 0.3 //不显示遮罩
        ,yes: function(){
          layer.msg('校验成功',{icon: 1,time: 200000,shade : [0.5 , '#000' , true]})
          layer.closeAll();
        }
      });
    }else if(obj.event === 'pass'){
    } else if(obj.event === 'waring'){
      layer.msg('审核失败')
    }
  });

  // 进度条waring详情 
  var checkTables = table.render({
      elem: '#checkTables'
      ,url:'../../js/wdbt/jsonData.json'
      ,height:'500px'
      // ,skin: 'line' //行边框风格
      ,even: true //开启隔行背景
      ,cols: [[
         {type:'checkbox'}
        ,{field:'id',width:80,title:'序号',align:'center'}
        ,{field:'username',width:'',title:'所属区域',align:'center'}
        ,{field:'username',width:150,title:'预警提醒时间',align:'center'}
        ,{field:'username',width:150,title:'预期时间',align:'center'}
        ,{title:'操作',width:100,toolbar:'#barDemos',align:'center'}
      ]]
      ,where: {   //入参
        curr:1,
        id:''
      }
      ,even:false
      ,loading: true
      ,page: true
  });
  var arrs = [];
  table.on('checkbox(checkTables)', function(obj){
    console.log(obj);
    console.log(obj.checked); //当前是否选中状态
    console.log(obj.data); //选中行的相关数据
    console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
    if(obj.checked){
      if(obj.type == 'all'){
        arrs = []
      }else{
        arrs.push(obj.data.id)
      }
    }else{
      var index = arr.indexOf(obj.data.id);
      if (index > -1) {
        arrs.splice(index, 1);
      }
    }
  });
    
});
var flag = false;
function iconDesc(){
  console.log(flag)
  if(flag){
    $('.tips-box').hide();
    $('.tips-box').css({left:'10%'})
    flag = false;
  }else{
    $('.tips-box').show();
    $('.tips-box').css({left:'10%'})
    flag = true;
  }
}
function desc(){
  layer.open({
    type: 1
    ,title:'核对明细预期预警 - 村统计' 
    ,scrollbar:false 
    ,area: ['80%', '90%']
    ,content: $('#yujinDesc')
    ,shade: 0.3 //不显示遮罩
    ,yes: function(){
      layer.msg('校验成功',{icon: 1,time: 200000,shade : [0.5 , '#000' , true]})
      layer.closeAll();
    }
  });
}
function back(){
  console.log('返回')
}