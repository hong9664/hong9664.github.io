let interact = [];
interact[0] = [
  {
    show: 0,
    hide: 0,
    pause: 0,
    top: 0,
    left: 0,
    width: 100,
    height: 30,
    onclick: function () {
      vid.pause();
      vid.currentTime = $(this).data("hide");

      window.open("");
    },
  },
];

/*interact[5] = [{
    show:230, hide:237, pause:0,
    top:488, left:537, width:222, height:50,
    onclick:function () {
        vid.pause();
        vid.currentTime = $(this).data('hide');

        window.open('./download/01_05.zip');
    }
}];*/

interact[7] = [
  {
    show: 119,
    hide: 122,
    pause: 0,
    top: 457,
    left: 620,
    width: 240,
    height: 40,
    onclick: function () {
      vid.pause();
      vid.currentTime = $(this).data("hide");

      window.open("./download/01_07.zip");
    },
  },
];

interact[8] = [
  {
    show: 41,
    hide: 49,
    pause: 0,
    top: 494,
    left: 407,
    width: 337,
    height: 40,
    onclick: function () {
      vid.pause();
      vid.currentTime = $(this).data("hide");

      window.open("./download/01_08.zip");
    },
  },
];

interact[9] = [
  {
    show: 515,
    hide: 531,
    pause: 0,
    top: 494,
    left: 463,
    width: 231,
    height: 40,
    onclick: function () {
      vid.pause();
      vid.currentTime = $(this).data("hide");

      window.open("./download/01_09_02.zip");
    },
  },
];

/*interact[9] = [{
    show:341, hide:351, pause:0,
    top:523, left:427, width:337, height:40,
    onclick:function () {
        vid.pause();
        vid.currentTime = $(this).data('hide');

        window.open('./download/01_09_01.zip');
    }
},
{
    show:519, hide:534, pause:0,
    top:494, left:463, width:231, height:40,
    onclick:function () {
        vid.pause();
        vid.currentTime = $(this).data('hide');

        window.open('./download/01_09_02.zip');
    }
}];*/

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
