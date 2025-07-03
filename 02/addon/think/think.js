$("#think-wrapper>.btn-pro,#think-wrapper>.pop-pro>.btn-close").on('click', function() {
    Opinion_List(now_page) 
    alert("다른사람의견보기입니다.");
});
$("#think-wrapper>.btn-save").on('click', function() {
    intxt = $("#think-wrapper>textarea")[0].value;
    if(intxt.trim() != "") {
        Opinion_Reg(now_page,intxt);
        // popup_opinion_list(isChasiNum);
        alert("저장되었습니다.");
    } else {
        alert("내용을 입력하세요.");
    }
});
$("#think-wrapper>.pop-pro>.pro").mCustomScrollbar({
    scrollInertia: 300,
    scrollEasing: "linear",
    mouseWheel: {
        preventDefault: true,
        scrollAmount: 25
    }
});