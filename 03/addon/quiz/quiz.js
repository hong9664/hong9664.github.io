const wrong_count_full = 2; //몇 번 틀리면 답을 보여줄지
let currQuiz = -1;
let $ainput = [];
let wrong_count = 0;
let quiz_score = [];

/* 커스텀 스크롤바 */
$("#quiz-wrapper>#quiz-content>.answer-wrapper>.answer-comment").mCustomScrollbar({
    scrollInertia: 300,
    scrollEasing: "linear",
    mouseWheel: {
        preventDefault: false,
        scrollAmount: 36
    }
});

$(document).ready(function () {
    $ainput[0] = $("#quiz-wrapper>#quiz-content>.ox-wrapper").remove();
    $ainput[1] = $("#quiz-wrapper>#quiz-content>.choice-wrapper").remove();
    $ainput[2] = $("#quiz-wrapper>#quiz-content>.input-wrapper").remove();
});

$("#quiz-wrapper>#quiz-home>.btn-start").on('click', quiz_start);
$("#quiz-wrapper>#quiz-content>.btn-confirm").on('click', quiz_confirm);
$("#quiz-wrapper>#quiz-content>.answer-wrapper>.btn-next").on('click', quiz_next);
$("#quiz-wrapper>#quiz-result>.btn-restart").on('click', function(){$("#quiz-wrapper").scrollTop(0)});

function quiz_start() { //퀴즈 시작버튼 클릭
    effect_play(effect('click'));
    quiz_init();
    $("#quiz-wrapper").scrollTop($("#quiz-wrapper").height() * 1);
    quiz_next();
}

function quiz_next() { //다음문제로
    if(currQuiz < quiz.length-1) quiz_show(currQuiz + 1);
    else quiz_result();
}

function quiz_show(num) { //num번째 문제 보여주기
    if(num>=quiz.length) return;
    currQuiz = num;
    $("#quiz-wrapper>#quiz-content>.quiz-num").removeClass('o x');
    wrong_count = 0;
    $(content + ".quiz-tab").empty();
    for(i=0;i<quiz.length;i++) $(content + ".quiz-tab").append($("<li>").text(i+1));
    $($(content + ".quiz-tab>li")[num]).addClass('active');
    $(content + ".quiz-num").text(num + 1);
    regex = /{([^{}]+)}/;
    $(content + ".quiz-question").html(quiz[num].question.replace(regex, "<span class='highlight'>$1</span>"));
    answer_init();
    $("#quiz-wrapper>#quiz-content").append($ainput[quiz[num].type]);
    if(quiz[num].type == 1) { //객관식
        for (i = 0; i < quiz[num].choice.length; i++) {
            $tmp1 = $('<input type="radio" name="choice" id="choice' + (i + 1) + '">');
            $tmp2 = $('<label for="choice' + (i + 1) + '">').text(quiz[num].choice[i]);
            $ainput[1].append($tmp1, $tmp2);
        }
    }
    $("#quiz-wrapper>#quiz-content>.choice-wrapper").css('top','');
    if(currChasi==8 && num==1) $("#quiz-wrapper>#quiz-content>.choice-wrapper").css('top',230);
    if(currChasi==10 && num==1) $("#quiz-wrapper>#quiz-content>.choice-wrapper").css('top',310);
    if(currChasi==19 && num==2) $("#quiz-wrapper>#quiz-content>.choice-wrapper").css('top',280);
    $("#quiz-content").hide().fadeIn(300);
}

function quiz_confirm() {
    /* 답을 선택했는지(nosel) */
    /* OX */
    if(quiz[currQuiz].type == 0) tmp = $ainput[quiz[currQuiz].type].find('input[type=radio]:checked').index();
    /* 객관식 */
    else if(quiz[currQuiz].type == 1) tmp = $ainput[quiz[currQuiz].type].find('input[type=radio]:checked').index();
    /* 주관식 */
    else if(quiz[currQuiz].type == 2) tmp = $ainput[quiz[currQuiz].type].find('#input-text')[0].value.toLowerCase().replace(/ /gi, "");
    if(tmp == -1 || tmp === "") {
        $("#quiz-wrapper>#quiz-content>.pop").addClass("nosel");
        setTimeout(function () {
            $("#quiz-wrapper>#quiz-content>.pop").removeClass("nosel");
            answer_uncheck();
        }, 1500);
        return false;
    }

    /* 정답 비교하기(wrong) */
    /* OX */
    if(quiz[currQuiz].type == 0) input = !tmp;
    /* 객관식 */
    else if(quiz[currQuiz].type == 1) input = tmp / 2 + 1;
    /* 주관식 */
    else if(quiz[currQuiz].type == 2) input = tmp;
    answer = quiz[currQuiz].answer;
    if(quiz[currQuiz].type == 2) {
        for(i=0;i<answer.length;i++) {
            if(result = input == answer[i].toLowerCase().replace(/ /gi, "")) break;
        }
    } else result = input == answer;

    if(result) { //정답
        effect_play(effect('o'));
        $("#quiz-wrapper>#quiz-content>.quiz-num").addClass('o');
        quiz_score[currQuiz] = true;
        show_answer();
    } else { //오답
        effect_play(effect('x'));
        
        wrong_count++;
        if(wrong_count >= wrong_count_full) {
            quiz_score[currQuiz] = false;
            $("#quiz-wrapper>#quiz-content>.quiz-num").addClass('x');
            show_answer();
        } else {
            $("#quiz-wrapper>#quiz-content>.pop").addClass("wrong");
            setTimeout(function () {
                $("#quiz-wrapper>#quiz-content>.pop").removeClass("wrong");
                answer_uncheck();
            }, 1500);
        }
    }
    function show_answer() {
        /* OX */
        if(quiz[currQuiz].type == 0) $("#quiz-wrapper>#quiz-content>.answer-wrapper>.answer-answer").text(answer?'O':'X');
        /* 객관식 */
        else if(quiz[currQuiz].type == 1) $("#quiz-wrapper>#quiz-content>.answer-wrapper>.answer-answer").text(answer);
        /* 주관식 */
        else if(quiz[currQuiz].type == 2) $("#quiz-wrapper>#quiz-content>.answer-wrapper>.answer-answer").addClass('type2').text(answer);
        $("#quiz-wrapper>#quiz-content>.answer-wrapper>.answer-comment span").html(quiz[currQuiz].comment);
        if(currQuiz >= quiz.length-1) $("#quiz-wrapper>#quiz-content>.answer-wrapper>.btn-next").addClass('last');
        $("#quiz-wrapper>#quiz-content>.answer-wrapper").addClass('on');
    }
}
function quiz_result() {
    $("#quiz-wrapper").scrollTop($("#quiz-wrapper").height() * 2);
    $("#quiz-result").hide().fadeIn(300);
    $("#quiz-wrapper>#quiz-result>.quiz-count").text(quiz.length);
    score = 0;
    for(i=0;i<quiz.length;i++) if(quiz_score[i]) score++;
    $("#quiz-wrapper>#quiz-result>.quiz-score").text(score);
    for(i=0;i<quiz.length;i++) {
        $("#quiz-wrapper>#quiz-result>.quiz-result>thead>tr").append($("<th>").text(""+(i+1)));
        $("#quiz-wrapper>#quiz-result>.quiz-result>tbody>tr").append($("<td>").addClass(quiz_score[i]?'o':'x'));
    }
    end_effect();
}

function quiz_init() { //퀴즈 초기화
    currQuiz = -1;
    $("#quiz-wrapper").scrollTop(0);
    content = "#quiz-wrapper>#quiz-content ";
    $(content + ".quiz-num").text(0);
    $(content + ".quiz-question").empty();
    answer_init();
    $(content + ".answer-comment span").empty();
    $(content + ".answer-wrapper>.btn-next").removeClass('last');
    result = "#quiz-wrapper>#quiz-result ";
    $(result + ".quiz-count," + result + ".quiz-score").text(0);
    $(result + "tr").empty();
}

function answer_init() { //답안 입력 비우기
    answer_uncheck();
    $ainput[0].remove();
    $ainput[1].empty().remove();
    $ainput[2].remove();

    $("#quiz-wrapper>#quiz-content>.pop").removeClass('nosel wrong');

    $("#quiz-wrapper>#quiz-content>.answer-wrapper").removeClass('on');
    $("#quiz-wrapper>#quiz-content>.answer-wrapper>.answer-answer").removeClass('type2').empty();
    $("#quiz-wrapper>#quiz-content>.answer-wrapper>.answer-comment span").empty();
}
function answer_uncheck() {
    $ainput[0].find("input[type=radio]").prop('checked', false);
    $ainput[1].find("input[type=radio]").prop('checked', false);
    $ainput[2].find("#input-text")[0].value = '';
}