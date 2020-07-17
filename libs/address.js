/**
 * Created by qin on 2019/3/1.
 */
//function getSelectValue() {   //获取省市县/区在area.js配置的地区编码
//    var province = document.getElementById("province").value;
//    var city = document.getElementById("city").value;
//    var area = document.getElementById("area").value;
//
//
//    alert(province.split('_', 1));
//    alert(city.split('_', 1));
//    alert(area);
//}
//初始数据
var areaData = JSON.parse(localStorage.getItem('areas'));
var $form;
var form;
var $;
layui.use(['jquery', 'form'], function() {
    $ = layui.jquery;
    form = layui.form;
    $form = $('form');
    loadProvince();
});
//加载省数据   '_' + areaData[i].mallCityList.length + '_' + i +
function loadProvince() {
    var proHtml = '';
    for (var i = 0; i < areaData.length; i++) {
        proHtml += '<option value="' + areaData[i].provinceCode + '_' + areaData[i].mallCityList.length + '_' + i +'_'+areaData[i].provinceName+'">' + areaData[i].provinceName + '</option>';
    }
//初始化省数据
    $form.find('select[name=province]').append(proHtml);
    form.render();
    form.on('select(province)', function(data) {
        $form.find('select[name=area]').html('<option value="">请选择县/区</option>').parent().hide();
        var value = data.value;
        var d = value.split('_');
        var code = d[0];
        var count = d[1];
        var index = d[2];
        if (count > 0) {
            loadCity(areaData[index].mallCityList);
        } else {
            $form.find('select[name=city]').parent().hide();
        }
    });
}
//加载市数据   '_' + citys[i].mallAreaList.length + '_' + i +
function loadCity(citys) {
    var cityHtml = '';
    cityHtml += '<option value="">请选择</option>';
    for (var i = 0; i < citys.length; i++) {
        cityHtml += '<option value="' + citys[i].cityCode + '_' + citys[i].mallAreaList.length + '_' + i +'_'+citys[i].cityName+'">' + citys[i].cityName + '</option>';
    }
    $form.find('select[name=city]').html(cityHtml).parent().show();
    form.render();
    form.on('select(city)', function(data) {
        var value = data.value;
        var d = value.split('_');
        var code = d[0];
        var count = d[1];
        var index = d[2];
        if (count > 0) {
            loadArea(citys[index].mallAreaList);
        } else {
            $form.find('select[name=area]').parent().hide();

        }
    });
}
//加载县/区数据
function loadArea(areas) {
    var areaHtml = '';
    areaHtml += '<option value="">请选择</option>'
    for (var i = 0; i < areas.length; i++) {
        areaHtml += '<option value="' + areas[i].areaCode + '_'+ areas[i].areaName +'">' + areas[i].areaName + '</option>';
    }
    $form.find('select[name=area]').html(areaHtml).parent().show();
    form.render();
    form.on('select(area)', function(data) {
    });
}
