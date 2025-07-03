let interact = [];
interact[0] = [{
    show:0, hide:0, pause:0,
    top:0, left:0, width:100, height:30,
    onclick:function () {
        vid.pause();
        vid.currentTime = $(this).data('hide');

        window.open('');
    }
}];

interact[8] = [{
    show:50, hide:54, pause:0,
    top:503, left:458, width:270, height:40,
    onclick:function () {
        vid.pause();
        vid.currentTime = $(this).data('hide');

        window.open('./download/03_08.zip');
    }
}];

interact[9] = [{
    show:101, hide:110, pause:0,
    top:428, left:397, width:387, height:40,
    onclick:function () {
        vid.pause();
        vid.currentTime = $(this).data('hide');

        window.open('./download/03_09.zip');
    }
}];

interact[10] = [{
    show:45, hide:52, pause:0,
    top:509, left:360, width:407, height:40,
    onclick:function () {
        vid.pause();
        vid.currentTime = $(this).data('hide');

        window.open('./download/03_10_1.zip');
    }
},
{
    show:120, hide:130, pause:0,
    top:320, left:633, width:301, height:40,
    onclick:function () {
        vid.pause();
        vid.currentTime = $(this).data('hide');

        window.open('./download/03_10_2.zip');
    }
}];

interact[13] = [{
    show:35, hide:44, pause:0,
    top:522, left:502, width:267, height:40,
    onclick:function () {
        vid.pause();
        vid.currentTime = $(this).data('hide');

        window.open('./download/03_13.zip');
    }
}];


interact[17] = [{
    show:103, hide:129, pause:0,
    top:310, left:470, width:339, height:40,
    onclick:function () {
        vid.pause();
        vid.currentTime = $(this).data('hide');

        window.open('./download/03_17.zip');
    }
}];

/*interact[2] = [{
    show:6, hide:7, pause:-1,
    top:486, left:786, width:102, height:32,
    onclick:function () {
        vid.pause();

        $tmp = $("<div style='width:100%;height:100%'>").css({position:'absolute',background:'url(img/t.png)'});
        $btn = $("<p>").css({position:'absolute',top:124,left:825,width:23,height:23,background:'url(../common/img/toolbar/btn_close.png)'}).on('click',function(){$(this).parent().remove()});
        $("#content-wrapper").append($tmp.append($btn));
    }
}];*/

const currInteract = interact[now_page];