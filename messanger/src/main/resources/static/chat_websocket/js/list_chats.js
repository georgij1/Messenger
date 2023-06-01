let list_chats = document.querySelectorAll('.list_chats')
let btn_nav_chat = document.querySelectorAll('.btn_nav_chat')
let all_chat = document.querySelector('.all_chat')
let content_all_chat = document.querySelector('.content_all_chat')
let content_all_my_chat = document.querySelector('.content_all_my_chat')
let all_my_chat = document.querySelector('.all_my_chat')


for (let btn_nav_chat_itter of btn_nav_chat) {
    btn_nav_chat_itter.addEventListener('click', () => {
        btn_nav_chat_itter.classList.add('btn_nav_chat_checked')
    })
}

let list_my_chats = document.querySelectorAll('.list_my_chats')
for (let list_my_chat_itter of list_my_chats) {
    let username = document.querySelector('.username').textContent
    fetch(`/MyChats/${username}`, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        mode: "cors",
        method: 'POST'
    })
        .then(response => response.json())
        .then((data) => {
            data.forEach((item) => {
                let list_my_chats = document.querySelector('.list_my_chats')
                list_my_chats.innerHTML+=`
                        <div class="one_chat">
                            <div class="chat">
                                <div class="id">${item.id}</div>
                                <div class="image"></div>
                                <div class="about_chat">
                                    <div class="name">${item.name}</div>
                                </div>
                            </div>
                        </div>
                    `
                let image_user_1 = document.querySelectorAll('.image');
                for (let image_user_new of image_user_1) {
                    image_user_new.style.background = `url(${item.image_chat})` + 'center no-repeat'
                    image_user_new.style.backgroundSize = `80%`
                    image_user_new.style.borderRadius = `50px`
                    image_user_new.style.height = '60px'
                    image_user_new.style.boxShadow = '0 0 10px bisque'
                }

                let btn_change_name_chat = document.querySelectorAll('.btn_change_name_chat')
                for (let BtnChangeNameChatItter of btn_change_name_chat) {
                    BtnChangeNameChatItter.addEventListener('click', () => {
                        let one_chat = document.querySelectorAll('.one_chat')
                        for (let OneChatItter of one_chat) {
                            OneChatItter.addEventListener('click', (event) => {
                                console.log('edit_message')
                                console.log(event.currentTarget.children[0].children[2].children[0].textContent)

                                let eventIdChat  = event.currentTarget.children[0].children[0].textContent

                                let input_change_name_chat = document.querySelector('.input_change_name_chat')
                                input_change_name_chat.innerHTML=`<input type="text" placeholder="edit_chat" class="change_name_chat" value="${event.currentTarget.children[0].children[2].children[0].textContent}">`

                                let window_edit_name_chat = document.querySelector('.window_edit_name_chat')
                                window_edit_name_chat.classList.add('visible')
                                list_my_chats.classList.add('none')

                                let btn_save_change_name = document.querySelector('.btn_save_change_name')
                                btn_save_change_name.addEventListener('click', () => {
                                    console.log('btn_save_change_name')
                                    let change_name_chat = document.querySelector('.change_name_chat')
                                    console.log(change_name_chat.value)

                                    const formData = {
                                        "NewNameChat": change_name_chat.value
                                    }

                                    console.log(eventIdChat)

                                    fetch(`/EditNameChat/${eventIdChat}`, {
                                        headers: new Headers({
                                            'Content-Type': 'application/json'
                                        }),
                                        mode: "cors",
                                        body: JSON.stringify(formData),
                                        method: 'POST'
                                    })
                                        .then(res => {console.log(res)})
                                        .then(() => {console.log(formData)})
                                })

                                let btn_cancel_change_name_chat = document.querySelector('.btn_cancel_change_name_chat')
                                btn_cancel_change_name_chat.addEventListener('click', () => {
                                    console.log('btn_cancel_change_name_chat')
                                    window_edit_name_chat.classList.remove('visible')
                                    list_my_chats.classList.remove('none')
                                })
                            })
                        }
                    })
                }

                let btn_delete_chat = document.querySelectorAll('.btn_delete_chat')
                for (let BtnDeleteChatItter of btn_delete_chat) {
                    BtnDeleteChatItter.addEventListener('click', () => {
                        let one_chat = document.querySelectorAll('.one_chat')
                        for (let OneChatItter of one_chat) {
                            OneChatItter.addEventListener('click', (event) => {
                                console.log(event.currentTarget.children[0].children[0].textContent)
                                fetch(`/delete_chat/${event.currentTarget.children[0].children[0].textContent}/${event.currentTarget.children[0].children[0].textContent}`, {
                                    headers: new Headers({
                                        'Content-Type': 'application/json'
                                    }),
                                    mode: "cors",
                                    method: 'DELETE'
                                })
                                    .then(response => console.log(response))
                            })
                        }
                    })
                }
            })
        })
}

for (let list_chat_itter of list_chats) {
    fetch('/list_chats', {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        mode: "cors"
    })
    .then(response => response.json())
    .then((data) => {
        data.forEach(item => {
            for (let list_chats_itter of list_chats) {
                list_chats_itter.innerHTML += `
                        <div class="chat">
                            <div class="id">${item.id}</div>
                            <div class="image"></div>
                            <div class="name">${item.name}</div>
                            <div class="owner">${item.owner}</div>
                        </div>
                    `
                let image_user_1 = document.querySelectorAll('.image');
                for (let image_user_new of image_user_1) {
                    image_user_new.style.background = `url(${item.image_chat})` + 'center no-repeat'
                    image_user_new.style.backgroundSize = `80%`
                    image_user_new.style.borderRadius = `50px`
                    image_user_new.style.height = '60px'
                    image_user_new.style.boxShadow = '0 0 10px bisque'
                }
            }

            let chat = document.querySelectorAll('.chat')

            for (let chat_itter of chat) {
                chat_itter.addEventListener('click', (event) => {
                    console.log(event.currentTarget.children[0].textContent)
                    console.log(event.currentTarget.children[2].textContent)

                    let UsernameNew = document.querySelector('.username').textContent
                    console.log(UsernameNew)
                    let ChatName = event.currentTarget.children[2].textContent
                    let AdminChat = event.currentTarget.children[3].textContent
                    console.log(AdminChat)
                    console.log(event.currentTarget)

                    const formData = {
                        "NameChat": event.currentTarget.children[2].textContent,
                        "username": UsernameNew
                    }

                    let IDChat = event.currentTarget.children[0].textContent
                    console.log(IDChat)

                    fetch(`/Access`, {
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        }),
                        mode: "cors",
                        method: 'POST',
                        body: JSON.stringify(formData)
                    })
                        .then(response => response.json())
                        .then(data => (data.forEach(item => {
                            console.log(item.status)
                            let PermissionDenied = document.querySelector('.PermissionDenied')
                            let list_chats = document.querySelector('.list_chats')
                            let CloseWindowPermissionDenied = document.querySelector('.CloseWindowPermissionDenied')
                            let flex_content = document.querySelector('.flex-content')
                            let content_all_chat = document.querySelector('.content_all_chat')
                            let buttons_nav_chats = document.querySelector('.buttons_nav_chats')
                            let BtnSendAccess = document.querySelector('.BtnSendAccess')
                            document.querySelector('.burger_menu').classList.add('none')

                            if (item.status === "success") {
                                console.log("success")
                                console.log(event.currentTarget)
                                // console.log(event.currentTarget.querySelector('.name'))
                                console.log(event.target)
                                console.log(event.target.querySelector('.name'))
                                console.log(event.target.children[0])

                                if (event.currentTarget === null) {
                                    console.log('this method not working')
                                    window.open(`/chat/${IDChat}/${document.querySelector('.username').textContent}/${event.target.textContent}#BottomPage`, '_self')
                                }

                                else {
                                    window.open(`/chat/${IDChat}/${document.querySelector('.username').textContent}/${event.target.querySelector('.name').textContent}#BottomPage`, '_self')
                                }

                                PermissionDenied.classList.remove('visible')
                                list_chats.classList.remove('none')
                                flex_content.classList.remove('none')
                                content_all_chat.classList.remove('none')
                                buttons_nav_chats.classList.remove('none')
                            }

                            else {
                                PermissionDenied.classList.add('visible')
                                list_chats.classList.add('none')
                                CloseWindowPermissionDenied.classList.add('visible')
                                flex_content.classList.add('none')
                                content_all_chat.classList.add('none')
                                content_all_chat.classList.remove('visible')
                                buttons_nav_chats.classList.add('none')
                            }

                            CloseWindowPermissionDenied.addEventListener('click', () => {
                                window.location.reload()
                            })

                            let ListAccess = document.querySelector('.ListAccess')

                            BtnSendAccess.addEventListener('click', () => {
                                console.log(ChatName)
                                ListAccess.innerHTML=`
                                    <div class="AccessToSent">Вы отправили за прос на вступление в чат ${ChatName}</div>
                                `

                                const formDataSendAccess = {
                                    "UsernameSentOfferAccess": UsernameNew,
                                    "chat_name": ChatName,
                                    "UsernameOwnerChat": AdminChat
                                }

                                fetch('/UserPostAccessChat', {
                                    headers: new Headers({
                                        'Content-Type': 'application/json'
                                    }),
                                    mode: "cors",
                                    method: 'POST',
                                    body: JSON.stringify(formDataSendAccess)
                                })
                                    .then(res => console.log(res))
                            })
                        })))
                })
            }

            let btn_create_chat = document.querySelector('.btn_create_chat')
            btn_create_chat.addEventListener('click', () => {
                let body_1_new_1 = document.querySelector('.body_1')
                body_1_new_1.classList.remove('none')
                let header = document.querySelector('.header')
                header.classList.remove('visible')
            })
        })
    })
}

document.querySelector('.Find').addEventListener('click', () => {
    document.querySelector('.window_find_chat').classList.add('flex')
    document.querySelector('.list_chats').classList.add('none')
    document.querySelector('.buttons_nav_chats').classList.add('none')
    document.querySelector('.flex-content').classList.add('none')
    document.querySelector('.burger_menu').classList.add('none')
    document.querySelector('.close_window_find_chat').classList.add('block')
})

document.querySelector('.filter').addEventListener('click', () => {
    console.log('open window filter list chat')
    document.querySelector('.window_filter_chat').classList.add('flex')
    document.querySelector('.list_chats').classList.add('none')
    document.querySelector('.buttons_nav_chats').classList.add('none')
    document.querySelector('.flex-content').classList.add('none')
    document.querySelector('.burger_menu').classList.add('none')
    document.querySelector('.close_window_filter_chat').classList.add('block')
})

document.querySelector('.close_window_filter_chat').addEventListener('click', () => {
    document.querySelector('.window_filter_chat').classList.remove('flex')
    document.querySelector('.list_chats').classList.remove('none')
    document.querySelector('.buttons_nav_chats').classList.remove('none')
    document.querySelector('.flex-content').classList.remove('none')
    document.querySelector('.burger_menu').classList.remove('none')
    document.querySelector('.close_window_filter_chat').classList.remove('block')
})

document.querySelector('.ToggleLabel').addEventListener('click', () => {
    console.log(document.querySelector('.ToggleLabel').checked)
    console.log(document.querySelector('#symbols').checked)

    if (document.querySelector('#symbols').checked === false) {
        console.log('tools filter by name click ob input checked is checked')
    }
})

document.querySelector('.label_length').addEventListener('click', () => {
    console.log(document.querySelector('.ToggleLabel').checked)
    console.log(document.querySelector('#symbols').checked)

    if (document.querySelector('#symbols').checked === false) {
        console.log('tools filter by name click ob label is checked')
    }
})

document.querySelector('.ToggleLabel').addEventListener('click', () => {
    console.log(document.querySelector('.ToggleLabel').checked)
    console.log(document.querySelector('#number').checked)

    if (document.querySelector('#number').checked === false) {
        console.log('tools filter by date click ob input checked is checked')
    }
})

document.querySelector('.label_length').addEventListener('click', () => {
    console.log(document.querySelector('.ToggleLabel').checked)
    console.log(document.querySelector('#number').checked)

    if (document.querySelector('#number').checked === false) {
        console.log('tools filter by date click ob label is checked')
    }
})

let i = 0

document.querySelector('.btn_search').addEventListener('click', () => {
    console.log(document.querySelector('.InputSearch').value)
    i++
    console.log("i - ", i)
    fetch(`find/by/NameChat/${document.querySelector('.InputSearch').value}`, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        mode: "cors"
    })
        .then((res) => res.json())
        .then(data => data.forEach(item => {
            console.log(item)
            document.querySelector('.list_found_chat').innerHTML+=`
                <div class="FoundChat">
                    <div class="chat_id">${item.id}</div>
                    <img src="${item.image_chat}" class="chat_image" alt="ImageChat">
                    <div class="chat_name">${item.name}</div>
                </div>
            `

            for (let FoundChatItter of document.querySelectorAll('.FoundChat')) {
                FoundChatItter.addEventListener('click', (event) => {
                    console.log(event.currentTarget.querySelector('.chat_id'))
                    window.open(`/chat/${event.currentTarget.querySelector('.chat_id').textContent}/${document.querySelector('.username').textContent}/${event.currentTarget.querySelector('.chat_name').textContent}#BottomPage`, '_self')
                })
            }
        }))
})

document.querySelector('.close_window_find_chat').addEventListener('click', () => {
    document.querySelector('.window_find_chat').classList.remove('flex')
    document.querySelector('.list_chats').classList.remove('none')
    document.querySelector('.buttons_nav_chats').classList.remove('none')
    document.querySelector('.flex-content').classList.remove('none')
    document.querySelector('.burger_menu').classList.remove('none')
    document.querySelector('.close_window_find_chat').classList.remove('block')
})