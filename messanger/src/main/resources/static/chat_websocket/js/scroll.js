let arrowBottom = document.querySelector('#arrowBottom')

arrowBottom.hidden = true

window.onload = () => {
    let window_load = document.querySelector('.window_load')
    let body_chat = document.querySelector('.body_chat')
    let tools = document.querySelector('.tools')

    if (document.readyState === "complete") {
        console.log('Страница загрузилась');
        body_chat.classList.remove('none')
        tools.classList.remove('none')
        window_load.classList.remove('block')
    }

    else {
        console.log('Загрузка...');
        body_chat.classList.add('none')
        tools.classList.add('none')
        window_load.classList.add('block')
    }
}

arrowBottom.addEventListener('click', () => {
    arrowBottom.hidden = true
    scrollTo(pageXOffset, document.documentElement.scrollHeight);
})

window.onload = function () {
    console.log('1')
    let htmlHeight = document.documentElement.scrollHeight
    console.log(htmlHeight)
    window.scrollTo(pageXOffset, htmlHeight)
}

let htmlHeight = document.documentElement.scrollHeight
console.log(htmlHeight)
window.scrollTo(pageXOffset, htmlHeight)