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

    if (document.body.clientHeight === screen.height-6) {
        arrowBottom.hidden = true
        console.log('1')
    }

    document.addEventListener('scroll', (event) => {
        // console.log('Позиция x относительно документа', event.pageX)
        // console.log('Позиция y относительно документа', event.pageY)

        // console.log('Позиция x относительно экрана', event.clientX)
        // console.log('Позиция y относительно экрана', event.clientY)
        // console.log("pageYOffset - ", pageYOffset)
    }, false)

    scroll = top;

    // общая ширина/высота
    // console.log( screen.width + ' x ' + screen.height);

    // доступная ширина/высота (за вычетом таскбара и т.п.)
    // console.log(screen.availWidth + ' x ' + screen.availHeight);

    // есть и ряд других свойств screen (см. документацию)

    // console.log(document.body.clientHeight, " - document.body.clientHeight")
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