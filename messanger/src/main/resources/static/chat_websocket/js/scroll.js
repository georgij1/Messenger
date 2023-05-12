let arrowBottom = document.querySelector('#arrowBottom')

window.onscroll = onScroll

let scroll = 0;

function onScroll() {
    let top = window.pageYOffset;

    arrowBottom.hidden = true

    if (scroll > top) {
        arrowBottom.hidden = true
        btn_down_1.classList.remove('none')
    }

    else if (scroll < top) {
        arrowBottom.hidden = false
        btn_down_1.classList.remove('none')
    }

    if (document.body.clientHeight === Math.round(pageYOffset + 714)) {
        arrowBottom.hidden = true
        console.log('1')
    }

    scroll = top;
}

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

btn_down_1.addEventListener('click', () => {
    btn_down_1.classList.add('none')
    scrollTo(pageXOffset, document.documentElement.scrollHeight);
})

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