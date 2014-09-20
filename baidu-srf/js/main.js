window.onresize=function(){
    if($&&$('#item1').length>0){
       resize(); 
    }    
};
var resizeDet=1920/853;
var isFirst=true;
function resize(){
    $.wH=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
    $.wW=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;    
    if($.wW<940){
       $.wW=940;
       $('#item1').width($.wW);
    }
    $('#item1').height($.wH); 
    if($.wW/resizeDet>$.wH){
        $('.banner-img').width($.wW).css({
            'height':'auto',
            'left':0
        });        
    }else if($.wH*resizeDet>$.wW){
        $('.banner-img').height($.wH).css({
            'width':'auto',
            'left':($.wH*1920/853-$.wW)/(-2)
        });
    }
    if(!isFirst){
        $('.submit-panel').center({ against: 'parent' });
    }
    //$( '.b-all' ).center();
}
function getPar(par){
    //获取当前URL
    var local_url = document.location.href;
    //获取要取得的get参数位置
    var get = local_url.indexOf(par +"=");
    if(get == -1){
        return false;  
    }  
    //截取字符串
    var get_par = local_url.slice(par.length + get + 1);   
    //判断截取后的字符串是否还有其他get参数
    var nextPar = get_par.indexOf("&");
    if(nextPar != -1){
        get_par = get_par.slice(0, nextPar);
    }
    return get_par;
}
$(function(){
    resize();
    $('#main').show();
    $('.down-arrow').click(function(e){
        e.preventDefault();
        $.scrollTo($.wH,500);
    });
    $('.history-now').click(function(e){
        e.preventDefault();
    });
    var loaded=false;
    $.scrollTo(0,0,{onAfter:function(){loaded=true; }});
    $('.item').mouseenter(function(){
        $(this).addClass("inview");
    });
    $('.item').mouseleave(function(){
        $(this).removeClass("inview");
    });
    
        
    /*$('.item').bind('inview', function (event, visible, topOrBottomOrBoth) {
        if (visible == true) {
            $(this).addClass("inview");
        }else {
            $(this).removeClass("inview");
        }
    });*/
    $.ajax({
        url:'api/action.php',
        data:{
            a:'getSetting'
        },
        type:'post',
        success:function(d){
            if(d.code){
                
                if(d.data.publish){
                    var dom='<img src="images/banner3.jpg" class="banner-img" />';
                    dom+='<div class="b-all"><a target="_blank" href="'+d.data.download_url+'"><img src="images/u1.png"/></a></div>';
                    $('#item1').prepend(dom);
                    resize();
                    $('.b-all a').click(function(e){
                        //e.preventDefault();
                        var href=location.href;
                        var m=getPar('from');
                        if(m){
                            _hmt.push(['_trackEvent', 'app', 'download', 'ios8 official pc from '+m]);
                        }else{
                            _hmt.push(['_trackEvent', 'app', 'download', 'ios8 official from pc']);
                        }
                        //location.href=$(this).attr('href');                        
                    });
                    $('.history-target').show();                    
                }else{
                    $('.history-target').remove();
                    var dom='<img src="images/banner.jpg" class="banner-img" /><div class="submit-panel"><div class="b-t1">心随指动，自由沟通</div><div class="b-t2">率先支持iOS 8，iPhone 上最好用的中文输入法</div>';
                    dom+='<input type="text" name="email" class="b-input" id="email" /><div class="b-t3">我们将在百度输入法上架后的第一时间通知您</div><a href="#" class="b-t4">通知我</a></div>';
                    $('#item1').prepend(dom);
                    resize();
                    $('.submit-panel').center({ against: 'parent' });
                    isFirst=false;
                    var placeholder="请留下您的邮箱或手机号";
                    $('#email').val(placeholder);
                    $('#email').focusin(function(){
                        if($(this).val()==placeholder){
                            $(this).val('');
                        }
                    });
                    $('#email').focusout(function(){
                        if($.trim($(this).val())==''){
                            $(this).val(placeholder);
                        }                        
                    });                    
                      
                    submit();                    
                }
                $('#weibo').attr('href',shareWeibo(d.data.sharetext));
            }
        }
    });
    $(window).scroll(function(e){
        var top=$(window).scrollTop();
        if(top>=$.wH){
           $('.top').show(); 
        }else{
           $('.top').hide(); 
        }
    });
    $('.top').click(function(e){
        e.preventDefault();
        $.scrollTo(0,300);
    });
    
    $('#weixin').mouseenter(function(){
        $('.qrcode').show();
    });
});
function shareWeibo(title){
    var title = title||"我正在等待@百度手机输入法 iOS 8首发版上架，期待iPhone上最好用的中文输入法！推荐你和我见证~下载地址";   
    var link = "http://srf.baidu.com/ios8"; 
    return 'http://service.weibo.com/share/share.php?url='+encodeURIComponent(link)+'&title='+encodeURIComponent(title+link)+'&searchPic=false&sudaref=srf.baidu.com';    
}
function submit(){
    $('.b-input').keydown(function(){
        $('.b-error').removeClass('b-error');
        $('.b-success').removeClass('b-success');        
    });
    $('.b-t4').click(function(e){
        e.preventDefault();
        var email=$.trim($('.b-input').val());
        var ereg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        var mreg = /^1[3|5|7|8]+\d{9}$/;
        var emailFail=false,mobileFail=false;
        if(email==''|| !ereg.test(email)){          
           emailFail=true;
        }
        if(email.length!=11 || !mreg.test(email)){
            mobileFail=true; 
        }
        if(emailFail&&mobileFail){
            $('.b-input').focus().addClass('b-error');
            return;
        }        
        $('.b-error').removeClass('b-error');
        $('.b-success').removeClass('b-success');
        var d=new Date();
        var date=d.getFullYear()+"-" + (d.getMonth() + 1)+'-'+d.getDate();
        $.ajax({
            url:'api/action.php',
            data:{
                a:'saveHash',
                k:email,
                data:{
                    'create_time':date,
                    'type':emailFail?'mobile':'email'
                }
            },
            type:'post',
            success:function(){
                $('.b-input').addClass('b-success');
            }
        });
    });
}



