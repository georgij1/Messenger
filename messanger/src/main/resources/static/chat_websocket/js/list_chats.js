let list_chats = document.querySelector('.list_chats')
console.log(list_chats)
fetch('/list_chats', {
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: "cors"
})
    .then(response => response.json())
    .then((data) => {data.forEach(item => {
        list_chats.innerHTML+=`
            <div class="chat">
                <div class="id">${item.id}</div>
                <div class="about_chat">
                    <div class="name">Название: ${item.name}</div>
                    <div class="desc_chat">Описание: ${item.desc_chat}</div>
                </div>
            </div>
        `
        let chat = document.querySelectorAll('.chat')
        let body_chat = document.querySelector('.body_chat')
        let body_class = document.querySelector('.body')
        let body_1_class = document.querySelector('.body_1')
        let header = document.querySelector('.header')
        let content = document.querySelector('.content')
        for (let chat_itter of chat) {
            chat_itter.addEventListener('click', (event) => {
                body_chat.classList.toggle('visible')
                body_class.classList.toggle('none')
                body_1_class.classList.toggle('none')
                console.log("ItemName - " + item.name)
                let border_name_chat = document.querySelector('.border_name_chat')
                border_name_chat.innerText=event.currentTarget.children[1].children[0].textContent
                header.classList.toggle('none')
                console.log(event.currentTarget.children[1].children[0].textContent)
                console.log("event - "+event.currentTarget.children[0].textContent)
                // console.log(event)
                let chat_id_var = event.currentTarget.children[0].textContent
                let list_chat = document.querySelector('.list_chat')
                chat_itter.addEventListener('click', connect())
                function sendMessage(event) {
                    let messageInput = document.querySelector('.form-control');
                    let messageContent = messageInput.value.trim();

                    const formData = {
                        "username": document.querySelector('.username').textContent
                    }

                    if (messageContent && stompClient) {
                        fetch('/username', {
                            method: 'POST',
                            headers: new Headers({
                                'Content-Type': 'application/json'
                            }),
                            body: JSON.stringify(formData),
                            mode: "cors"
                        })
                            .then(response => response.json())
                            .then((data) => {data.forEach(item => {
                                console.log("websocket id - " + item.id)
                                let item_id_user = item.id
                                console.log(new Date().toLocaleDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds())
                                let Date_new = new Date().toLocaleDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
                                let chatMessage = {
                                    sender: item_id_user,
                                    content: messageInput.value,
                                    chat_id: chat_id_var,
                                    TimeStamp: Date_new,
                                    type: 'CHAT'
                                };
                                console.log(chatMessage.TimeStamp)
                                console.log(messageInput.value)
                                stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
                                messageInput.value = '';
                                let list_chat = document.querySelector('.list_chat')
                                list_chat.innerHTML+=`
                            <div class="message">
                                <div class="text">${chatMessage.content}</div>
                                <div class="text">${chatMessage.TimeStamp}</div>
                                
                                <div class="tools_message">
                                    <div class="delete_message"></div>
                                    <div class="edit_message"></div>
                                    <div class="share_message"></div>
                                </div>
                            </div>`
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
                                            .catch(err => {console.log(err)})
                                            .then(res => {
                                                console.log(res)
                                                console.log(item.id)
                                                alert('Сообщение - ' + item.content + ' успешно удалено')
                                                // window.location.reload()
                                            })
                                        // stompClient.send(`/app/chat.deleteMessage/${formData.id}`, {}, JSON.stringify(chatMessage));
                                    })
                                }
                            })})
                    }
                    event.preventDefault();
                }

                messageForm.addEventListener('submit', sendMessage, true)

                fetch('/all_message', {
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    mode: "cors"
                })
                    .then((response) => {
                        response.json().then(res => console.log(res.forEach(item => {
                            console.log(item.text)
                            list_chat.innerHTML+=
                                `
                                    <div class="message">
                                        <div class="text">${item.text}</div>
                                        <div class="timestamp">${item.time_stamp}</div>
    
                                        <div class="tools_message">
                                            <div class="delete_message"></div>
                                            <div class="edit_message"></div>
                                            <div class="share_message"></div>
                                        </div>
                                    </div>
                                `
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
                                        .catch(err => {console.log(err)})
                                        .then(res => {
                                            console.log(res)
                                            alert('Сообщение - ' + item.text + ' успешно удалено')
                                            window.location.reload()
                                        })
                                })
                            }
                        })))
                    })
            })

            let close_window_2 = document.querySelector('.close_window_2')
            close_window_2.addEventListener('click', () => {
                let body_chat = document.querySelector('.body_chat')
                body_chat.classList.remove('visible')
                body_class.classList.remove('none')
                body_1_class.classList.remove('none')
                header.classList.remove('none')
            })
        }

        let btn_create_chat = document.querySelector('.btn_create_chat')
        btn_create_chat.addEventListener('click', () => {
            let body_1_new_1 = document.querySelector('.body_1')
            body_1_new_1.classList.remove('none')
            let header = document.querySelector('.header')
            header.classList.remove('visible')
        })

        let close_window_new = document.querySelector('.close_window_new')
        close_window_new.addEventListener('click', () => {
            let header = document.querySelector('.header')
            header.classList.toggle('visible')
        })
    })})

let close_window_new_2 = document.querySelector('.close_window_new')
console.log(close_window_new_2)
close_window_new_2.addEventListener('click', () => {
    let body_js = document.querySelector('.body_js')
    console.log(body_js)
    body_js.classList.remove('none')
})

let send_message = document.querySelector('.send_message')
send_message.addEventListener('click', () => {
    let input_message = document.querySelector('.input_message')
    if (input_message.value === '') {
        console.log('str is empty')
        input_message.classList.toggle('red')
    }

    else {
        console.log("str isn't empty - " + input_message.value)
        input_message.classList.remove('red')
    }
})