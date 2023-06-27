let btn_delete_account_1 = document.querySelector('.btn_delete_account')

fetch(`/MyChats/${document.querySelector('.UserName').textContent}`, {
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: "cors",
    method: 'POST',
})
    .then(response => response.json())
    .then((data) => {
        console.log(data.length)
        data.forEach((item) => {
                console.log(item)
                list_my_chats.innerHTML+=`
                        <div class="one_chat">
                            <div class="chat">
                                <div class="id">${item.id}</div>
                                <div class="image"></div>
                                <div class="about_chat">
                                    <div class="name">${item.name}</div>
                                </div>
                            </div>
                        
                            <div class="tools_start">
                                <div class="btn_delete_chat">Удалить чат</div>
                                <div class="btn_change_name_chat">Изменить имя чата</div>
                            </div>
                        </div>
                    `
                let image_user_1 = document.querySelectorAll('.image');
                for (let image_user_new of image_user_1) {
                    image_user_new.style.background = `url(${item.image_chat})` + 'center no-repeat'
                    image_user_new.style.backgroundSize = `80%`
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
                                input_change_name_chat.innerHTML=`<input type="text" placeholder="edit_chat" class="change_name_chat_input" value="${event.currentTarget.children[0].children[2].children[0].textContent}">`

                                let window_edit_name_chat = document.querySelector('.window_edit_name_chat')
                                window_edit_name_chat.classList.add('block')
                                list_my_chats.classList.add('none')

                                btn_delete_account_1.classList.add('none')

                                let flex = document.querySelectorAll('.flex')
                                for (let FlexItter of flex) {
                                    FlexItter.classList.add('none')
                                }

                                let GroupYorOwn = document.querySelector('.GroupYorOwn')
                                GroupYorOwn.classList.add('none')

                                let close_window = document.querySelector('.close_window')
                                close_window.classList.add('none')

                                let btn_save_change_name = document.querySelector('.btn_save_change_name')
                                btn_save_change_name.addEventListener('click', () => {
                                    console.log('btn_save_change_name')
                                    let change_name_chat = document.querySelector('.change_name_chat_input')
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
                                        .then(() => alert('Имя именно'))
                                })

                                let btn_cancel_change_name_chat = document.querySelector('.btn_cancel_change_name_chat')
                                btn_cancel_change_name_chat.addEventListener('click', () => {
                                    console.log('btn_cancel_change_name_chat')
                                    window_edit_name_chat.classList.remove('block')
                                    btn_delete_account_1.classList.remove('none')
                                    list_my_chats.classList.remove('none')
                                    close_window.classList.remove('none')
                                    let flex = document.querySelectorAll('.flex')
                                    for (let FlexItter of flex) {
                                        FlexItter.classList.remove('none')
                                    }
                                    let GroupYorOwn = document.querySelector('.GroupYorOwn')
                                    GroupYorOwn.classList.remove('none')
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
                                    .then(() => {alert('Чат удалён')})
                            })
                        }
                    })
                }
            })
    })