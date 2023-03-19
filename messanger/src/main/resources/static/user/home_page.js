fetch('http://localhost:8080/image_profile',{
    headers: new Headers({
    'Content-Type': 'application/json'
}),
    mode: "cors"
})
    .then(response => response.json())
    .then((data) => (data.forEach((item) => {
        let image_profile = document.querySelector('.image_profile')
        image_profile.innerHTML=`<div style="background: url(${item.image}) no-repeat; background-size: 100%; height: 100%; width: 100%; border-radius: 50px;">`
    })));

let btn_up = document.querySelector('.btn_up')
let delete_account = document.querySelector('.delete_account')
btn_up.addEventListener('click', () => {
    btn_up.classList.toggle('round')
    delete_account.classList.toggle('block')
})

let min_size_window = document.querySelectorAll('.min_size_window')
let header = document.querySelectorAll('.header')
let body_class = document.querySelectorAll('.body')

for (let min_size_windo of min_size_window) {
    min_size_windo.addEventListener('click', () => {
        for (let head of header) {
            min_size_windo.classList.toggle('none')
            head.classList.remove('none')
            head.classList.remove('visible')
            for (let body of body_class) {
                body.classList.remove('max_size_window')
            }
            for (let menu of burger_menu) {
                menu.classList.remove('none')
            }
        }
    })
}

let burger_menu = document.querySelectorAll('.burger_menu')
for (let menu of burger_menu) {
    menu.addEventListener('click', () => {
        for (let head of header) {
            head.classList.toggle('visible')
            menu.classList.toggle('none')
            for (let min_size_windows of min_size_window) {
                min_size_windows.classList.remove('none')
            }
            for (let body of body_class) {
                body.classList.toggle('max_size_window')
            }
        }
    })
}