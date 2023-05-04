$(document).ready(function () {
    let monthNames = ["Январь", "Февраль", "Март", "Апреля", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    let dayNames = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

    let newDate = new Date();
    newDate.setDate(newDate.getDate());

    setInterval( function() {
        let hours = new Date().getHours();
        $(".hour").html(( hours < 10 ? "0" : "" ) + hours);
        let seconds = new Date().getSeconds();
        $(".second").html((seconds < 10 ? "0" : "" ) + seconds);
        let minutes = new Date().getMinutes();
        $(".minute").html((minutes < 10 ? "0" : "" ) + minutes);

        $(".month span,.month2 span").text(monthNames[newDate.getMonth()]);
        $(".date span,.date2 span").text(newDate.getDate());
        $(".day span,.day2 span").text(dayNames[newDate.getDay()]);
        $(".year span").html(newDate.getFullYear());
    }, 1000);

    $(".outer").on({
        mousedown:function(){
            $(".dribbble").css("opacity","1");
        },
        mouseup:function(){
            $(".dribbble").css("opacity","0");
        }
    });
});