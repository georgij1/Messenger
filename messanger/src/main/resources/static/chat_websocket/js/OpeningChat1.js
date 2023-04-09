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
            .then((data) => {
                data.forEach(item => {
                    console.log(event.currentTarget)
                    console.log("websocket id - " + item.id)
                    let item_id_user = item.id
                    console.log(new Date().toLocaleDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds())
                    let Date_new = new Date().toLocaleDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
                    let chatMessage = {
                        sender: item_id_user,
                        content: messageInput.value,
                        chat_id: IdChat.textContent,
                        TimeStamp: Date_new,
                        type: 'CHAT'
                    };
                    console.log(chatMessage.TimeStamp)
                    console.log(messageInput.value)
                    stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
                    messageInput.value = '';
                    let list_chat = document.querySelector('.list_chat')
                    list_chat.innerHTML += `
                                                    <div class="message">
                                                        <div class="id">${chatMessage.id}</div>
                                                        <div class="text">${chatMessage.content}</div>
                                                        <div class="text">${chatMessage.TimeStamp}</div>

<!--                                                        <div class="tools_message">-->
<!--                                                            <div class="delete_message"></div>-->
<!--                                                            <div class="edit_message"></div>-->
<!--                                                            <div class="share_message"></div>-->
<!--                                                        </div>-->
                                                    </div>
                                                `
                    let delete_message = document.querySelectorAll('.delete_message')
                    console.log(delete_message)
                    for (let delete_message_itter of delete_message) {
                        delete_message_itter.addEventListener('click', () => {
                            console.log(delete_message)
                            console.log(item.id)
                            console.log()
                            fetch(`/delete_message/${event.currentTarget.children[2].children[0].textContent}`, {
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
                                    console.log(event.currentTarget.children[2].children[0].textContent)
                                    alert('Сообщение - ' + item.content + ' успешно удалено')
                                    // window.location.reload()
                                })
                            // stompClient.send(`/app/chat.deleteMessage/${formData.id}`, {}, JSON.stringify(chatMessage));
                        })
                    }
                })
            })
    }
    event.preventDefault();
}

messageForm.addEventListener('submit', sendMessage, true)