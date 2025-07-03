let currimg = 1;
$("#summary-wrapper>.btn-download").on('click', function() {
    tmp1 = (tmp='0'+currChasi,tmp.slice(-2));
    tmp2 = (tmp='0'+now_page,tmp.slice(-2));
    window.open('download/'+tmp1+'_'+tmp2+'.zip');
});
for(i=1;i<=img_count;i++) $("#summary-wrapper>.page-wrapper>.paginator").append("<li>");
show_summary(currimg);

$("#summary-wrapper>.page-wrapper>.btn-prev").on('click', function() {
    show_summary(currimg-1);
});
$("#summary-wrapper>.page-wrapper>.btn-next").on('click', function() {
    show_summary(currimg+1);
});
$("#summary-wrapper>.page-wrapper>.paginator>li").on('click', function() {
    show_summary($(this).index()+1);
});
function show_summary(num) { //num번쨰 이미지 보여주기
    if(1<=num && num<=img_count) {
        currimg = num;
        $("#summary-wrapper>img").attr('src','img/'+img_prefix+(tmp='0'+currimg,tmp.slice(-2)+'.png'));
        $($("#summary-wrapper>.page-wrapper>.paginator>li").removeClass('active')[currimg-1]).addClass('active');
    }
}