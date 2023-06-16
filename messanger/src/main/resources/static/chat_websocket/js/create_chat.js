let btn_create_chat = document.querySelector('.btn_create_chat')
let window_create_chat = document.querySelector('.window_create_chat');
let body_new = document.querySelector('.body')
let body_1 = document.querySelector('.body_1')
let close_window = document.querySelector('.close_window')
let list_users = document.querySelector('.list_users')
let users = [];

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

fetch('/all_users', {
        headers: new Headers({
            'Content-Type': 'application/json'
            }),
            mode: "cors"
        })
        .then(response => response.json())
        .then((data) => {data.forEach(item => {
            console.log(item)
            if (item.id_image === 'DefaultAva') {
                list_users.innerHTML+=`
                    <div class="user" id="user">
                        <div class="user_image" style="background: url('/image/settings/icon_profile.png') no-repeat; background-size: 71px; height: 60px; width: 70px"><p>/image/settings/icon_profile.png</p></div>
                        <div class="name">${item.username}</div>
                    </div>
                `
            }

            else {
                list_users.innerHTML+=`
                    <div class="user" id="user">
                        <div class="user_image" style="background: url(/AvatarImage/${item.username}/${item.id_image}) no-repeat; background-size: 71px; height: 60px; width: 70px"><p>/AvatarImage/${item.username}/${item.id_image}</p></div>
                        <div class="name">${item.username}</div>
                    </div>
                `
            }

            let user = document.querySelectorAll('.user')

            console.log('user - ', user)

            for (let user_itter of user) {
                user_itter.addEventListener('click', () => {
                    console.log(user_itter)
                    user_itter.classList.toggle('tick')

                    console.log(user_itter.childNodes)

                    const user = user_itter.childNodes[3].textContent;
                    const image = user_itter.childNodes[1].textContent;

                    let is_exists = -1;

                    for (let i = 0; i < users.length; ++i) {
                        if (users[i].user === user) {
                            is_exists = i;
                            break;
                        }
                    }

                    (is_exists === -1 ? users.push({user: user, image: image}) : users.splice(is_exists, 1))
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

    console.log('data create on default from new Date()')

    if (new Date().getMonth() === 1 || new Date().getMonth() === 2 || new Date().getMonth() === 3 || new Date().getMonth() === 4 || new Date().getMonth() === 5 || new Date().getMonth() === 6 || new Date().getMonth() === 7 || new Date().getMonth() === 8 || new Date().getMonth() === 9) {
        const formData = {
            "name_chat": name_chat_div.value,
            "desc_chat": desc_chat.value,
            "user_chat": users.map(item => item.user),
            "type": "group_chat",
            "owner": username_1,
            "ImageUser": users.map(item => item.image),
            "time_creator": new Date().getDay() + '.0' + new Date().getMonth() + '.' + new Date().getFullYear() + ' ' + new Date().getHours() + ':' + new Date().getMinutes()
        }

        if (formData.name_chat !== '' && formData.desc_chat !== '') {
            fetch('/create_chat', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then((res) => {
                    console.log(res.status)

                    if (res.status === 200) {
                        console.log('ok')

                        document.querySelector('.success_create_chat').classList.add('block')

                        setTimeout(() => {
                            document.querySelector('.success_create_chat').classList.remove('block')
                            window.location.reload()
                        }, 1000)
                    }

                    else if (res.status === 500) {
                        console.log('this chat is exist')

                        document.querySelector('.name_chat_exist').classList.add('block')

                        setTimeout(() => {
                            document.querySelector('.name_chat_exist').classList.remove('block')
                        }, 1000)
                    }

                    else {
                        console.log('we are unknown response')
                    }
                })
        }

        else {
            console.log('valid is not access')
        }

        console.log(formData)
    }

    else {
        const formData = {
            "name_chat": name_chat_div.value,
            "desc_chat": desc_chat.value,
            "user_chat": users.map(item => item.user),
            "type": "group_chat",
            "owner": username_1,
            "ImageUser": users.map(item => item.image),
            "time_creator": new Date().getDay() + '.' + new Date().getMonth() + '.' + new Date().getFullYear() + new Date().getHours() + ':' + new Date().getMinutes()
        }

        if (formData.name_chat !== '' && formData.desc_chat !== '') {
            fetch('/create_chat', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(() => {console.log(formData)})
            // .then(() => {window.location.reload()})
        }

        else {
            console.log('valid is not access')
        }

        console.log(formData)
    }
})