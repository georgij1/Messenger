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
                    let DateLong = new Date().toLocaleDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
                    let DateShort = new Date().getHours() + ':' + new Date().getMinutes()

                    let chatMessage  = {
                        sender: item_id_user,
                        content: messageInput.value,
                        chat_id: IdChat.textContent,
                        TimeStampShort: DateShort,
                        TimeStampLong: DateLong,
                        type: 'CHAT'
                    };

                    console.log(chatMessage.TimeStampShort)
                    console.log(chatMessage.TimeStampLong)
                    console.log(messageInput.value)
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
                        .then((data) => console.log(data.forEach((item) => {
                            let ItemImageMessage = item.image
                            list_chat.innerHTML += `
                        <div class="MessageMain">
                            <div class="ImageProfileMessage1"></div>
                            <div class="message">
                            <div class="ItemUsername">${UsernameNew}</div>
                            <div class="id">1</div>
                            <div class="text">${chatMessage.content}</div>
    
<!--                            <div class="tools_message">-->
<!--                                <div class="delete_message"></div>-->
<!--                                <div class="edit_message"></div>-->
<!--                                <div class="share_message"></div>-->
<!--                            </div>-->
                             
                            <div title="${chatMessage.TimeStampLong}" class="TimeStampShort">${chatMessage.TimeStampShort}</div>
                         </div>
                        </div>
<!--                                                    <div class="message">-->
<!--                                                        <div class="id">${chatMessage.id}</div>-->
<!--                                                        <div class="text">${chatMessage.content}</div>-->
<!--                                                        <div title="${chatMessage.TimeStampLong}" class="TimeStampShort">${chatMessage.TimeStampShort}</div>-->

<!--                                                        <div class="tools_message">-->
<!--                                                            <div class="delete_message"></div>-->
<!--                                                            <div class="edit_message"></div>-->
<!--                                                            <div class="share_message"></div>-->
<!--                                                        </div>-->
<!--                                                    </div>-->
                                                `
                            let ImageProfileMessage1 = document.querySelectorAll('.ImageProfileMessage1')

                            for (let ImageProfileMessageItter1 of ImageProfileMessage1) {
                                ImageProfileMessageItter1.style.background=`url(${item.image})` + 'no-repeat'
                                ImageProfileMessageItter1.style.backgroundSize='100px'
                            }
                        })));
                    let delete_message = document.querySelectorAll('.delete_message')
                    console.log(delete_message)
                    for (let delete_message_itter of delete_message) {
                        delete_message_itter.addEventListener('click', () => {
                            console.log(delete_message)
                            console.log(item.id)
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
                                    window.location.reload()
                                })
                        })
                    }
                })
            })
    }
    event.preventDefault();
}

messageForm.addEventListener('submit', sendMessage, true)

fetch('/ImageChat', {
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: 'cors',
    method: 'POST'
})
    .then(res => res.json())
    .then(data => data.forEach(item => {
        console.log("/files/"+item.id)
        let url = "/files/"+item.id
        let list_chat = document.querySelector('.list_chat')
        list_chat.innerHTML+=`
            <div class="ImageBorder">
                <img class="ImageChat" src="${url}" alt="">
                <div class="TimeStampShort" title="${item.time_stamp_long}">${item.time_stamp_short}</div>
            </div>
        `
        if (list_chat.clientHeight === 0) {
            btn_down_1.classList.add('none')
            list_chat.innerHTML=`
        <div class="MessageNullDiv">
            <div class="MessageListNull">
                <div class="text">Сообщений нет начните общаться первым</div>
                <div class="ImageMessageNull"></div>
            </div>
        </div>
    `
            let MessageNullDiv = document.querySelector('.MessageNullDiv')
            MessageNullDiv.classList.remove('none')
        }

        else {
            btn_down_1.classList.remove('none')
            let MessageNullDiv = document.querySelector('.MessageNullDiv')
            MessageNullDiv.classList.add('none')
        }
    }))