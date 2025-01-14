let list_chats_new = document.querySelector('.list_chats')
let btn_up = document.querySelector('.btn_up')
let delete_account = document.querySelector('.delete_account')
let min_size_window = document.querySelectorAll('.min_size_window')
let header = document.querySelectorAll('.header')
let body_class = document.querySelectorAll('.body')
let flex_content = document.querySelectorAll('.flex-content')

fetch('/image_profile',{
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: "cors"
})
    .then(response => response.json())
    .then((data) => (data.forEach((item) => {
        console.log(item.image)
        let image_profile = document.querySelectorAll('.image_profile')
        for (let image_profile_1 of image_profile) {
            image_profile_1.style.background=`url(${item.image})` + 'no-repeat'
            image_profile_1.innerHTML=`<p class="ImageProfilePBlock">${item.image}</p>`
            image_profile_1.style.backgroundSize=`100%`
            // image_profile_1.style.height=`100%`
            image_profile_1.style.width=`34%`
            image_profile_1.style.borderRadius=`50px`
            // image_profile_1.innerHTML=`<div style="background: url(${item.image}) no-repeat; background-size: 71px; height: 60px; width: 70px; margin-left: -18px">`
        }
    })));


btn_up.addEventListener('click', () => {
    btn_up.classList.toggle('round')
    delete_account.classList.toggle('block')
})

let signboard = document.querySelector('.signboard')
let hello = document.querySelector('.hello')
let calendar_btn = document.querySelector('.calendar_btn')
let btn_start_message = document.querySelector('.btn_start_message')
let flex = document.querySelector('.flex')

console.log(hello)

for (let min_size_windo of min_size_window) {
    min_size_windo.addEventListener('click', () => {
        for (let head of header) {
            min_size_windo.classList.toggle('none')
            head.classList.toggle('visible')
            for (let body of body_class) {
                body.classList.remove('max_size_window')
            }
            for (let menu of burger_menu) {
                menu.classList.remove('none')
            }
            for (let contents of document.querySelectorAll('.content')) {
                contents.classList.remove('none_content')
            }
            for (let flex_content_itter of flex_content) {
                flex_content_itter.classList.toggle('flex-content-new')
                flex_content_itter.classList.remove('flex-content-new-burger-open')
            }
            let list_chats = document.querySelector('.list_chats')
            list_chats.classList.remove('header_list_chats_burger_open')
            list_chats_new.classList.remove('header_list_chats')
            let chat = document.querySelectorAll('.chat')
            for (let chat_all of chat) {
                chat_all.classList.remove('chat_burger_open')
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
            for (let contents of document.querySelectorAll('.content')) {
                contents.classList.toggle('none_content')
            }
            for (let flex_content_itter of flex_content) {
                flex_content_itter.classList.toggle('flex-content-new')
                flex_content_itter.classList.toggle('flex-content-new-burger-open')
            }
            let list_chats = document.querySelector('.list_chats')
            list_chats.classList.toggle('header_list_chats_burger_open')
            list_chats_new.classList.toggle('header_list_chats')
            let chat = document.querySelectorAll('.chat')
            for (let chat_all of chat) {
                chat_all.classList.toggle('chat_burger_open')
            }
        }
    })
}