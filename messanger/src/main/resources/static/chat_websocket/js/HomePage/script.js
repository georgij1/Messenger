let list_chats_new = document.querySelector('.list_chats')
let btn_up = document.querySelector('.btn_up')
let delete_account = document.querySelector('.delete_account')
let min_size_window = document.querySelectorAll('.min_size_window')
let header = document.querySelectorAll('.header')
let body_class = document.querySelectorAll('.body')
let flex_content = document.querySelectorAll('.flex-content')

fetch(`/AvatarImage/${document.querySelector('.username').textContent}`,{
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: "cors"
})
    .then(response => response.json())
    .then((data) => (data.forEach((item) => {
        if (item.id_image === '/image/settings/icon_profile.png') {
            console.log('icon for default')

            let image_profile = document.querySelector('.image_profile')

            console.log('1')
            image_profile.style.background=`url(${item.id_image})` + 'no-repeat'
            image_profile.style.backgroundSize=`100%`
            image_profile.style.width=`34%`
            image_profile.style.borderRadius=`50px`
        }

        else {
            console.log('else is running')
            let image_profile = document.querySelector('.image_profile')
            console.log('1')
            console.log(`url(/AvatarImage/${document.querySelector('.username').textContent}/${item.id_image})`)
            image_profile.style.background=`url(/AvatarImage/${document.querySelector('.username').textContent}/${item.id_image})` + 'no-repeat'
            image_profile.style.backgroundSize=`100%`
            image_profile.style.width=`34%`
            image_profile.style.borderRadius=`50px`
        }
    })));


btn_up.addEventListener('click', () => {
    btn_up.classList.toggle('round')
    delete_account.classList.toggle('block')
})

let flex = document.querySelector('.flex')
let buttons_nav_chats = document.querySelector('.content')
let h1 = document.querySelectorAll('h1')

for (let min_size_windo of min_size_window) {
    min_size_windo.addEventListener('click', () => {
        for (let head of header) {
            for (let H1Itter of h1) {
                H1Itter.classList.remove('h1HeaderOpened')
            }
            buttons_nav_chats.classList.remove('ButtonsNavChatsHeaderOpened')
            document.querySelector('.window_find_chat').classList.remove('window_find_chat_header_open')
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
            body_1.classList.remove('none')
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
            buttons_nav_chats.classList.add('ButtonsNavChatsHeaderOpened')
            document.querySelector('.window_find_chat').classList.add('window_find_chat_header_open')
            head.classList.toggle('visible')
            menu.classList.toggle('none')
            for (let H1Itter of h1) {
                H1Itter.classList.add('h1HeaderOpened')
            }
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
            body_1.classList.toggle('none')
            list_chats_new.classList.toggle('header_list_chats')
            let chat = document.querySelectorAll('.chat')
            for (let chat_all of chat) {
                chat_all.classList.toggle('chat_burger_open')
            }
        }
    })
}

let username1 = document.querySelectorAll('.username')
for (let UserNameItter of username1) {
    UserNameItter.addEventListener('click', (event) => {
        console.log(event.currentTarget.textContent)
        window.open(`/AccountPage/${event.currentTarget.textContent}`, '_self')
    })
}