let arrowTop = document.querySelector('#arrowTop')
let arrowBottom = document.querySelector('#arrowBottom')

function showArrows() {
    // высота окна (клиентской части области просмотра браузера)
    let viewportHeight = document.documentElement.clientHeight;

    if (pageYOffset < viewportHeight) arrowTop.hidden = true;
    else arrowTop.hidden = false;

    // высота HTML-страницы
    let htmlHeight = document.documentElement.scrollHeight;
    // ограничитель по высоте для видимости нижней стрелки
    let heightLimiter = htmlHeight - 2 * viewportHeight;

    if (pageYOffset > heightLimiter) arrowBottom.hidden = true;
    else arrowBottom.hidden = false;
}

window.addEventListener("scroll", showArrows);
window.addEventListener("resize", showArrows);

arrowTop.addEventListener("click", function() {
    scrollTo(pageXOffset, 0);
});

arrowBottom.addEventListener("click", function() {
    // высота HTML-страницы
    let htmlHeight = document.documentElement.scrollHeight;

    scrollTo(pageXOffset, htmlHeight);
});