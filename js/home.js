var flag = false;
function iconDesc(type){
  console.log(flag,type)
  if(flag){
    $('.tips-box').hide();
    if(type == 'a'){
        $('.tips-box').css({left:'2%'})
    }else if(type == 'b'){
        $('.tips-box').css({left:'10%'})
    }else if(type == 'c'){
        $('.tips-box').css({left:'16%'})
    }
    flag = false;
  }else{
    $('.tips-box').show();
    if(type == 'a'){
        $('.tips-box').css({left:'2%'})
    }else if(type == 'b'){
        $('.tips-box').css({left:'10%'})
    }else if(type == 'c'){
        $('.tips-box').css({left:'16%'})
    }
    flag = true;
  }
}