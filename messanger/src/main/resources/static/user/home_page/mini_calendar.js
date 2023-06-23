console.log('1')

fetch(`/AvatarImage/${document.querySelector('.username').textContent}`,{
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: "cors"
})
    .then(response => response.json())
    .catch(() => console.log(`json on avatar isn't valid`))
    .then((data) => (data.forEach((item) => {
        console.log(data)
        if (item.id_image === '/image/settings/icon_profile.png') {
            console.log('icon for default')

            let image_profile = document.querySelectorAll('.image_profile')

            for (let image_profile_1 of image_profile) {
                console.log('1')
                image_profile_1.style.background=`url(${item.id_image})` + 'no-repeat'
                image_profile_1.style.backgroundSize=`100%`
                image_profile_1.style.width=`34%`
                image_profile_1.style.borderRadius=`50px`
            }
        }

        else {
            console.log('else is running')
            let image_profile = document.querySelectorAll('.image_profile')
            for (let image_profile_1 of image_profile) {
                console.log('1')
                image_profile_1.style.background=`url(/AvatarImage/${document.querySelector('.username').textContent}/${item.id_image})` + 'no-repeat'
                image_profile_1.style.backgroundSize=`100%`
                image_profile_1.style.width=`34%`
                image_profile_1.style.borderRadius=`50px`
            }
        }
    })));

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