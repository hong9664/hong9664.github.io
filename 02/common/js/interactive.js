if(currInteract) {
    for(i=0; i<currInteract.length; i++) {
        ci = currInteract[i];
        ci.show = strToTime(ci.show);
        ci.hide = strToTime(ci.hide);
        ci.pause = strToTime(ci.pause);
        $anchor = $("<p></p>")
            .addClass('interact p'+now_page+' i'+(i+1))
            .data({'show':ci.show, 'hide':ci.hide, 'pause':ci.pause})
            .css({
                position: 'absolute',
                top: ci.top, left: ci.left,
                margin: 0,
                width: ci.width, height: ci.height,
                display: 'none', cursor: 'pointer'
            })
            .appendTo($("#content-wrapper"))
            .on('click', ci.onclick);
    }

    latest_interact = 0;
    function interactive(currTime) {
        currTime = Math.floor(currTime*10)/10;
        if(currTime == latest_interact) return;
        latest_interact = currTime;
        for(i=0; i<currInteract.length; i++) {
            ci = currInteract[i];
            obj = $(".interact.p"+now_page+".i"+(i+1));
            if(ci.show<=currTime && currTime<ci.hide) obj.show(); else obj.hide();
            if(ci.show<=currTime && currTime==ci.pause && currTime<ci.hide) vid.pause();
        }
    }
}