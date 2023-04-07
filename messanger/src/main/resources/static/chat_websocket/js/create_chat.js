let btn_create_chat = document.querySelector('.btn_create_chat')
let window_create_chat = document.querySelector('.window_create_chat');
let body_new = document.querySelector('.body')
let body_1 = document.querySelector('.body_1')
let close_window = document.querySelector('.close_window')
let header_id_dom = document.querySelector('#header')
let user_chat = []

btn_create_chat.addEventListener('click', () => {
    window_create_chat.classList.toggle('visible')
    body_new.classList.remove('body')
    body_1.classList.toggle('visible')
    body_new.classList.toggle('none')
    close_window.classList.remove('none')
})

close_window.addEventListener('click', () => {
    close_window.classList.toggle('none')
    window_create_chat.classList.remove('visible')
    body_new.classList.remove('none')
    body_1.classList.remove('visible')
    body_new.classList.toggle('body')
    body_new.classList.remove('none')
})

let list_users = document.querySelector('.list_users')

fetch('/all_users', {
        headers: new Headers({
            'Content-Type': 'application/json'
            }),
            mode: "cors"
        })
        .then(response => response.json())
        .then((data) => {data.forEach(item => {
            console.log(item)
            list_users.innerHTML+=`
                <div class="user" id="user">
                    <!--<div class="id"></div>-->
                    <div class="user_image" style="background: url(${item.image}) no-repeat; background-size: 71px; height: 60px; width: 70px"></div>
                    <div class="name">${item.username}</div>
                </div>
            `
            let user = document.querySelectorAll('.user')

            for (let user_itter of user) {
                user_itter.addEventListener('click', () => {
                    user_itter.classList.toggle('tick')
                    let user_div_id = document.querySelectorAll('#user')
                    for (let user_div_id_itter of user_div_id) {
                        if (user_div_id_itter.classList.contains("tick")) {
                            console.log(user_div_id_itter.classList.contains("tick"))
                            user_chat.push(user_itter.childNodes[5].textContent)
                            console.log(user_itter.childNodes[5].textContent)
                        }
                    }
                })
            }
    })})

let create_chat = document.querySelector('.create_chat')
let user = document.querySelectorAll('.user')
console.log(user)

create_chat.addEventListener('click', () => {
    let name_chat_div = document.querySelector('.name_chat_div')
    let desc_chat = document.querySelector('.desc_chat_1')
    console.log(desc_chat)
    let user = document.querySelectorAll('.user')

    for (let user_itter of user) {
        console.log('user')
    }

    let username_1 = document.querySelector('.username').textContent

    const formData = {
        "name_chat": name_chat_div.value,
        "desc_chat": desc_chat.value,
        "user_chat": user_chat,
        "type": "group_chat",
        "owner": username_1,
        // "chat_id": "",
        "role_id_admin": "",
        "role_id_user": ""
    }

    fetch('/create_chat', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(() => {console.log(formData)})
        .then(() => {alert("Чат с названием - " + formData.name_chat + " создан")})
        // .then(() => {window.location.reload()})

    console.log(formData)
})