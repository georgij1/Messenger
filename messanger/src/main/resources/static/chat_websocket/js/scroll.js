let arrowTop = document.querySelector('#arrowTop')
let arrowBottom = document.querySelector('#arrowBottom')

function showArrows() {
    // высота окна (клиентской части области просмотра браузера)
    let viewportHeight = document.documentElement.clientHeight;

    // if (pageYOffset < viewportHeight) {
    //     console.log('вверх')
    //     arrowTop.hidden = false;
    // }
    //
    // else {
    //     console.log('убираем кнопку вверх')
    //     arrowTop.hidden = false;
    // }

    // высота HTML-страницы
    let htmlHeight = document.documentElement.scrollHeight;
    // ограничитель по высоте для видимости нижней стрелки
    let heightLimiter = htmlHeight - 2 * viewportHeight;

    if (pageYOffset > heightLimiter) {
        arrowBottom.hidden = true;
        console.log('вниз')
    }

    else {
        arrowBottom.hidden = false;
        console.log('убираем кнопку вниз')
    }

    // console.log(pageYOffset)
}

window.addEventListener("scroll", showArrows);
window.addEventListener("resize", showArrows);

arrowTop.addEventListener('click', () => {
    scrollTo(pageXOffset, 0);
});

arrowBottom.addEventListener('click', () => {
    // высота HTML-страницы
    let htmlHeight = document.documentElement.scrollHeight;

    scrollTo(pageXOffset, htmlHeight);
});