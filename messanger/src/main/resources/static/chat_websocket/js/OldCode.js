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
                    let item_id_user = item.id
                    let DateLong = new Date().toLocaleDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
                    let DateShort = new Date().getHours() + ':' + new Date().getMinutes()

                    let ErrorConnect = document.querySelector('.ErrorConnect')
                    ErrorConnect.classList.remove('block')

                    let chatMessage  = {
                        sender: item_id_user,
                        content: messageInput.value,
                        chat_id: IdChat.textContent,
                        TimeStampShort: DateShort,
                        TimeStampLong: DateLong,
                        type: 'CHAT'
                    };

                    stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
                    messageInput.value = '';
                    let list_chat = document.querySelector('.list_chat')
                    let MessageNullDiv = document.querySelector('.MessageNullDiv')
                    MessageNullDiv.classList.add('none')
                    let UsernameNew = document.querySelector('.username').textContent

                    fetch('/image_profile',{
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        }),
                        mode: "cors"
                    })
                        .then(response => response.json())
                        .then((data) => (data.forEach((item) => {
                            console.log(event)
                            list_chat.innerHTML += `
                                <div class="MessageMain">
                                    <div class="ImageProfileMessage1"></div>
                                    <div class="message">
                                        <div class="ItemUsername">${UsernameNew}</div>
                                            <div class="text">${chatMessage.content}</div>
                                            
                                            <div class="id">${item.id}</div>
                                            
                                            <div class="tools_message">
                                                <div class="delete_message"></div>
                                                <div class="edit_message"></div>
                                                <div class="share_message"></div>
                                            </div>
                                                                                        
                                            <div class="ToolsTick">
                                                <div class="ReadMessage">Прочитано</div>
                                                <div class="GetMessage">Получено</div>
                                            </div>
                                            
                                            <div title="${chatMessage.TimeStampLong}" class="TimeStampShort">${chatMessage.TimeStampShort}</div>
                                    </div>
                                </div>
                            `
                            let ImageProfileMessage1 = document.querySelectorAll('.ImageProfileMessage1')

                            for (let ImageProfileMessageItter1 of ImageProfileMessage1) {
                                ImageProfileMessageItter1.style.background=`url(${item.image})` + 'no-repeat center'
                                ImageProfileMessageItter1.style.backgroundSize='45px'
                            }

                            let message = document.querySelectorAll('.message')

                            for (let MessageItter of message) {
                                MessageItter.addEventListener('click', (event) => {
                                    event.currentTarget.children[3].classList.toggle('flex')
                                    event.currentTarget.children[4].classList.toggle('flex')

                                    let EventText = event.currentTarget.children[1].textContent

                                    let delete_message = document.querySelectorAll('.delete_message')

                                    for (let delete_message_itter of delete_message) {
                                        delete_message_itter.addEventListener('click', () => {
                                            fetch(`/delete_message/${event.currentTarget.children[2].children[0].textContent}`, {
                                                method: 'delete',
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                mode: "cors"
                                            })
                                                .then(res => {
                                                    alert('Сообщение - ' + item.content + ' успешно удалено')
                                                    window.location.reload()
                                                })
                                        })
                                    }

                                    for (let ShareMessageItter of document.querySelectorAll('.share_message')) {
                                        ShareMessageItter.addEventListener('click', () => {
                                            window.open(`/share/${EventText}`, '_self')
                                        })
                                    }
                                })
                            }
                        })));

                })
            })
    }
    event.preventDefault();
}

messageForm.addEventListener('submit', sendMessage, true)