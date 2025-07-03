let $vid = $("<video>");
let vid = $vid[0];

let sawTime = 0;

if(now_page == pageinfo.length) $("#toolbar>.pop-next").addClass('last');

function setVideo(src) {
    vid.src = src;
    vid.volume = $.cookie('edcplayer_volume') || 1;
    vid.muted = $.cookie('edcplayer_muted')==1;
    if(vid.muted) $('.btn-mute').addClass('on');
    vid.autoplay = false;
    $("#content-wrapper").append($vid);
    $("#content-wrapper").append($vid);
}

$vid.on("loadedmetadata", function () {
    duration = Math.floor(vid.duration*100)/100 || 0;
    m = '0' + Math.floor(duration / 60); m = m.slice(-2);
    s = '0' + Math.floor(duration % 60); s = s.slice(-2);
    $(".duration").text(m + ':' + s);
    
    $("#toolbar>.timebar-wrapper>.timebar").slider({
        min: 0, max: duration*100,
        slide: function (e, ui) {
            if(!skipable && sawTime <= ui.value/100) return false;
            vid.currentTime = ui.value/100;
            timeupdate();
        }
    });
    if(duration>0) $play = $("<p>").addClass("firstplay")
    .css({
        position:'absolute', top:'', bottom:'4px',
        left:'75px', right:'', margin:'auto',
        width:'144px', height:'51px',
        background:'url(../common/img/btn_play2.png) no-repeat',
        cursor:'pointer', 'z-index': 90
    })
    .on('click', function(){$("#con-wrapper").remove();})
    .on('click', function(){vid.play()})
    .appendTo($("#content-wrapper"));
});
$vid.on("play playing pause", updateButtons);
setInterval(timeupdate,10);

$vid.on("ended", function () {
    vid.pause();
    if(!currinfo.ishtml) end_effect();
});
$vid.on("volumechange", function () {
    vid.muted = vid.volume == 0;
    $.cookie('edcplayer_volume', vid.volume);
    $.cookie('edcplayer_muted', vid.muted?1:0);
    $(".vol-range").width(vid.volume*100+'%');/*소리 드레그 관련 1*/
    effect_snd.volume = vid.volume;
    effect_snd.muted = vid.muted;
    vid.muted ? $(".btn-mute").addClass('on') : $(".btn-mute").removeClass('on');
});

latest = 0;
function timeupdate() {
    /* 부드러운 시간바를 위해 1/100초마다 갱신 */
    currTime = Math.floor(vid.currentTime*100)/100;
    if(currTime == latest) return;
    m = '0' + Math.floor(currTime / 60); m = m.slice(-2);
    s = '0' + Math.floor(currTime % 60); s = s.slice(-2);
    $(".currtime").text(m + ':' + s);

    $('.time-range').width(currTime/duration*100+'%');
    $('.timebar').slider('value', vid.currentTime*100);

    if(currInteract) interactive(currTime);

    if(vid.currentTime < vid.duration) $("#toolbar .pop-next").removeClass('on');

    sawTime = Math.max(sawTime,currTime);
    latest = currTime;
}

function updateButtons() {
    $(".firstplay").length?$(".firstplay").remove():'';
    vid.paused?($(".btn-play").removeClass("on"),$(".btn-pause").addClass("on")):($(".btn-play").addClass("on"),$(".btn-pause").removeClass("on"));
    // vid.paused?$("#toolbar>.btn-play").removeClass("on"):$("#toolbar>.btn-play").addClass("on");
}