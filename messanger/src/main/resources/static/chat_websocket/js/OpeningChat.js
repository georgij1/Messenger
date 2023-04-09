let IdChat = document.querySelector('.IdChat')
console.log(IdChat.textContent)
let list_chat = document.querySelector('.list_chat')
let border_name_chat = document.querySelector('.border_name_chat')
let title = document.querySelector('.title')
let image_chat_open_settings = document.querySelector('.image_chat_open_settings')
let list_users_open_settings = document.querySelector('.list_users_open_settings')
let admin_chat = document.querySelector('.admin_chat')

fetch(`/ChatName/${IdChat.textContent}`, {
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    method: "POST",
    mode: "cors"
})
    .then((response) => {
        response.json().then(res => res.forEach(item => {
            border_name_chat.innerText=`${item.name}`
            title.innerText=`${item.name}`
            list_users_open_settings.innerText=`Список пользователей пуст`
            image_chat_open_settings.innerHTML=`
             <div class="image_chat_open_settings" style="background: url(${item.image_chat}) no-repeat center; width: 100%; height: 45vh; background-size: 90%; box-shadow: 0 0 10px burlywood; border-radius: 100%"></div>
            `
            admin_chat.innerText=`${item.owner}`
        }))})

fetch(`/chats/${IdChat.textContent}`, {
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    method: "POST",
    mode: "cors"
})
    .then((response) => {
        response.json().then(res => console.log(res.forEach(item => {
            console.log(item.text)
            connect()
            list_chat.innerHTML +=
                `
                                     <div class="message">
                                         <div class="id">${item.id}</div>
                                         <div class="text">${item.text}</div>
                                         <div class="timestamp">${item.time_stamp}</div>

                                         <div class="tools_message">
                                             <div class="delete_message"></div>
                                             <div class="edit_message"></div>
                                             <div class="share_message"></div>
                                         </div>
                                     </div>
                                 `
            let edit_message = document.querySelectorAll('.edit_message')
            let window_edit_message = document.querySelector('.window_edit_message')
            for (let edit_message_itter of edit_message) {
                edit_message_itter.addEventListener('click', () => {
                    console.log(edit_message)
                    console.log(item)
                    list_chat.classList.add('none')
                    flex_content_chat_top_tools.classList.add('none')
                    window_edit_message.classList.add('flex')
                    window_edit_message.innerHTML=`
                     <input class="input_edit_message" value="${item.text}" name="message">
                     <input type="button" class="save_edit_message" value="Сохранить">
                     <input type="button" class="cancel_edit_message" value="Закрыть">
                     `
                    let save_edit_message = document.querySelector('.save_edit_message')
                    let input_edit_message = document.querySelector('.input_edit_message')
                    let cancel_edit_message = document.querySelector('.cancel_edit_message')

                    cancel_edit_message.addEventListener('click', () => {
                        window_edit_message.classList.remove('flex')
                        list_chat.classList.remove('none')
                        flex_content_chat_top_tools.classList.remove('none')
                    })

                    save_edit_message.addEventListener('click', () => {
                        console.log('id message')
                        console.log(item.id)
                        console.log('text message')
                        console.log(item.text)
                        console.log('input_edit_message.value')
                        console.log(input_edit_message.value)
                        window_edit_message.classList.remove('flex')
                        list_chat.classList.remove('none')
                        flex_content_chat_top_tools.classList.remove('none')

                        const formData = {
                            "message": input_edit_message.value
                        }

                        fetch(`/edit_message/${item.id}`, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(formData)
                        })
                            .then(res => {console.log(res)})
                            .then(() => {
                                console.log(item.text)
                                window.location.reload()
                            })
                    })
                })
            }

            let delete_message = document.querySelectorAll('.delete_message')
            console.log(delete_message)
            for (let delete_message_itter of delete_message) {
                delete_message_itter.addEventListener('click', () => {
                    console.log(delete_message)
                    console.log(item.id)
                    fetch(`/delete_message/${item.id}`, {
                        method: 'delete',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        mode: "cors"
                    })
                        .catch(err => {
                            console.log(err)
                        })
                        .then(res => {
                            console.log(res)
                            alert('Сообщение - ' + item.text + ' успешно удалено')
                            window.location.reload()
                        })
                })
            }

            let share_message = document.querySelectorAll('.share_message')
            console.log('share_message')
            console.log(share_message)
            for (let share_message_itter of share_message) {
                console.log('share_content')
                console.log(item.text)
                share_message_itter.addEventListener('click', () => {
                    window.open(`/share/${item.text}`, '_self')
                })
            }
        })))
    })

let btn_tools_chat = document.querySelector('.btn_tools_chat')
let window_add_file = document.querySelector('.window_add_file')
let flex_content_chat_top_tools = document.querySelector('.flex_content_chat_top_tools')
let btn_close_add_file = document.querySelector('.btn_close_add_file')

btn_tools_chat.addEventListener('click', () => {
    window_add_file.classList.add('flex')
    list_chat.classList.add('none')
    flex_content_chat_top_tools.classList.add('none')
    height.classList.add('none')
})

btn_close_add_file.addEventListener('click', () => {
    window_add_file.classList.remove('flex')
    list_chat.classList.remove('none')
    flex_content_chat_top_tools.classList.remove('none')
    height.classList.remove('none')
})

let window_settings_chat = document.querySelector('.window_settings_chat')
let btn_down_1 = document.querySelector('.btn_down_1')
let tools = document.querySelector('.tools')
let height = document.querySelector('.height')

border_name_chat.addEventListener('click', () => {
    window_settings_chat.classList.add('visible')
    list_chat.classList.add('none')
    flex_content_chat_top_tools.classList.add('none')
    btn_down_1.classList.add('none')
    tools.classList.add('none')
    height.classList.add('none')
})

let close_window_3 = document.querySelector('.close_window_3')
close_window_3.addEventListener('click', () => {
    window_settings_chat.classList.remove('visible')
    list_chat.classList.remove('none')
    flex_content_chat_top_tools.classList.remove('none')
    btn_down_1.classList.remove('none')
    tools.classList.remove('none')
    height.classList.remove('none')
})

let send_message = document.querySelector('.send_message')
send_message.addEventListener('click', () => {
    let input_message = document.querySelector('.input_message')
    if (input_message.value === '') {
        console.log('str is empty')
        input_message.classList.toggle('red')
    } else {
        console.log("str isn't empty - " + input_message.value)
        input_message.classList.remove('red')
    }
})

let list_link_chat = document.querySelector('.list_link_chat')
list_link_chat.innerHTML=`<a href="${document.referrer}">${document.referrer}</a>`