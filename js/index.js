$(function(){
    // 获取cookie中的nickname内容
    const nickname = getCookie('nickname');

    if(nickname){
        $('.off').addClass('hide');
        $('.on').text(`欢迎您！${nickname}`).removeClass('hide');
        
    }else{
        $('.off').removeClass('hide');
        $('on').addClass('hide');
        $('.back').addClass('exit');
    }

})

