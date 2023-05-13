let IdChat = document.querySelector('.IdChat')
let list_chat = document.querySelector('.list_chat')
let border_name_chat = document.querySelector('.border_name_chat')
let title = document.querySelector('.title')
let image_chat_open_settings = document.querySelector('.image_chat_open_settings')
let list_users_open_settings = document.querySelector('.list_users_open_settings')
let admin_chat = document.querySelector('.admin_chat')
let window_settings_chat = document.querySelector('.window_settings_chat')
let btn_down_1 = document.querySelector('.btn_down_1')
let tools = document.querySelector('.tools')
let height = document.querySelector('.height')
let close_window_3 = document.querySelector('.close_window_3')
let btn_tools_chat = document.querySelector('.btn_tools_chat')
let window_add_file = document.querySelector('.window_add_file')
let flex_content_chat_top_tools = document.querySelector('.flex_content_chat_top_tools')
let btn_close_add_file = document.querySelector('.btn_close_add_file')
let ListUploadedImage = document.querySelector('.ListUploadedImage')
let send_message = document.querySelector('.send_message')
let messageForm = document.querySelector('#messageForm');
let messageAreaNew = document.querySelector('.list_chat');
let stompClient = null;
let username = document.querySelector('.username').textContent
let input_message = document.querySelector('.input_message')
let ToolsAdmin = document.querySelector('.ToolsAdmin')
let ErrorConnect = document.querySelector('.ErrorConnect')

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

            document.querySelector('.BorderNameChat').innerText=`${item.name}`
            document.querySelector('.BorderDescriptionChat').innerText=`${item.desc_chat}`

            image_chat_open_settings.style.background=`url(${item.image_chat}) no-repeat center`
            image_chat_open_settings.style.backgroundSize='90%'
            image_chat_open_settings.style.boxShadow='0 0 10px burlywood'
            image_chat_open_settings.style.borderRadius='100%'

            admin_chat.innerHTML+=`
                <div class="UserChat" style="background: url(${item.image_chat}) no-repeat; background-size: 71px; height: 60px; width: 70px"></div>
                <div class="UserChat UserChatName">${item.owner}</div>
            `

            for (let AdminChatItter of document.querySelectorAll('.admin_chat')) {
                AdminChatItter.addEventListener('click', (event) => {
                    console.log(event.currentTarget.children[1].textContent)
                     window.open(`/chat/AccountPage/${event.currentTarget.children[1].textContent}`, '_self')
                })
            }

            fetch(`/Find/${item.name}`, {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                method: "POST",
                mode: "cors"
            })

                .then((response) => {
                    response.json().then(res => (res.forEach(item => {
                        if (res === 'null') {
                            list_users_open_settings.innerHTML=`Пользователей нет`
                        }

                        if (item.name !== username) {
                            list_users_open_settings.innerHTML+=`
                                <div class="UserDiv">
                                    <div class="UserChat" style="background: url(${item.image_user}) no-repeat; background-size: 71px; height: 60px; width: 70px"></div>
                                    <div class="UserChat UserChatNew">${item.name}</div>
                                </div>
                            `
                        }
                        for (let UserDivItter of document.querySelectorAll('.UserDiv')) {
                            UserDivItter.addEventListener('click', (event) => {
                                window.open(`AccountPage/${event.currentTarget.children[1].textContent}`, '_self')
                            })
                        }
                    })))
        })}))})

fetch(`/chats/${IdChat.textContent}`, {
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    method: "POST",
    mode: "cors"
})
    .then((response) => {
        response.json().then(res => (res.forEach(item => {
            const MessageNullDiv = document.querySelector('.MessageNullDiv')
            MessageNullDiv.classList.add('none')

            if (item.id_image === "TextMessage" && item.read === false && item.username === document.querySelector('.username').textContent) {
                list_chat.innerHTML += `
                    <div class="MessageMain">
                        <div class="ImageProfileMessage">
                            <p>${item.username}</p>
                        </div>
                        
                        <div class="message">
                        
                            <div class="ItemUsername">${item.username}</div>
                            
                            <div class="id">${item.id_message}</div>
                            <div class="text" title="Скопировать текст">${item.text}</div>
    
                            <div class="tools_message">
                                <div class="delete_message"></div>
                                <div class="edit_message"></div>
                                <div class="share_message"></div>
                            </div>
                                                     
                            <div class="BlockTicketTimeStamp">                        
                                <div title="${item.time_stamp_long}" class="TimeStampShort">${item.time_stamp_short}</div>
                                <div class="TickAsRead"></div>
                            </div>
                        </div>
                    </div>
                `
            }

            else if (item.id_image === "TextMessage" && item.read === false) {
                list_chat.innerHTML += `
                    <div class="MessageMain">
                        <div class="ImageProfileMessage">
                            <p>${item.username}</p>
                        </div>
                        
                        <div class="message">
                        
                            <div class="ItemUsername">${item.username}</div>
                            
                            <div class="id">${item.id_message}</div>
                            <div class="text" title="Скопировать текст">${item.text}</div>
    
                            <div class="tools_message">
                                <div class="share_message"></div>
                            </div>
                            
                            <div class="ToolsTick">
                                <div class="ReadMessage">Прочитано</div>
                            </div>
                        </div>
                    </div>
                `
            }

            else if (item.id_image === "TextMessage" && item.read === true && item.username === document.querySelector('.username').textContent) {
                list_chat.innerHTML += `
                    <div class="MessageMain">
                        <div class="ImageProfileMessage">
                            <p>${item.username}</p>
                        </div>
                        
                        <div class="message">
                        
                            <div class="ItemUsername">${item.username}</div>
                            
                            <div class="id">${item.id_message}</div>
                            <div class="text" title="Скопировать текст">${item.text}</div>
    
                            <div class="tools_message">
                                <div class="delete_message"></div>
                                <div class="edit_message"></div>
                                <div class="share_message"></div>
                            </div>
                                                     
                            <div class="BlockTicketTimeStamp">                        
                                <div title="${item.time_stamp_long}" class="TimeStampShort">${item.time_stamp_short}</div>
                                
                                <div class="BlockTwoTickets">
                                    <div class="TickAsRead"></div>
                                    <div class="TickAsRead TickAsReadTwoTicket"></div>                                
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }

            else if (item.id_image === "TextMessage" && item.read === true) {
                list_chat.innerHTML += `
                    <div class="MessageMain">
                        <div class="ImageProfileMessage">
                            <p>${item.username}</p>
                        </div>
                        
                        <div class="message">
                        
                            <div class="ItemUsername">${item.username}</div>
                            
                            <div class="id">${item.id_message}</div>
                            <div class="text" title="Скопировать текст">${item.text}</div>
    
                            <div class="tools_message">
                                <div class="share_message"></div>
                            </div>
                        </div>
                    </div>
                `
            }

            else if (item.text === null && item.read === false && item.username === document.querySelector('.username').textContent) {
                console.log('item.text === null && item.read === false')
                list_chat.innerHTML +=
                    `
                        <div class="MessageMain">
                            <div class="ImageProfileMessage imageProfileMessage__1" style="padding: 25px; height: 0"><p>${item.username}</p></div>
                            <div class="ImageBorder">
                            <div class="ItemUsername">${item.username}</div>
                            <div class="ImageChat_1">
                                <img class="ImageChat" src="/files/${IdChat.textContent}/${item.id_image}" alt="">
                                <div class="UrlImageChat">/files/${IdChat.textContent}/${item.id_image}</div>
                            </div>
                        
                            <div class="tools_message">
                                <div class="delete_message_image"></div>
                            </div>
                            
                            <div class="IdMessage">${item.id_message}</div>
                            
                            <div class="BlockTicketTimeStamp">                        
                                <div title="${item.time_stamp_long}" class="TimeStampShort">${item.time_stamp_short}</div>
                                <div class="TickAsRead"></div>
                            </div>
                            </div>
                        </div>
                    `
            }

            else if (item.text === null && item.read === false) {
                console.log('item.text === null && item.read === false')
                list_chat.innerHTML +=
                    `
                        <div class="MessageMain">
                            <div class="ImageProfileMessage imageProfileMessage__1" style="padding: 25px; height: 0"><p>${item.username}</p></div>
                            
                            <div class="ImageBorder">
                                <div class="ItemUsername">${item.username}</div>
                                
                                <div class="ImageChat_1">
                                    <img class="ImageChat" src="/files/${IdChat.textContent}/${item.id_image}" alt="">
                                    <div class="UrlImageChat">/files/${IdChat.textContent}/${item.id_image}</div>
                                </div>
                            
                                <div class="ToolsTick">
                                    <div class="ReadMessageImage">Прочитано</div>
                                </div>
                            
                                <div class="IdMessage">${item.id_message}</div>
                                
                                <div title="${item.time_stamp_long}" class="TimeStampShort">${item.time_stamp_short}</div>
                            </div>
                        </div>
                    `
            }

            else if (item.text === null && item.read === true && item.username === document.querySelector('.username').textContent) {
                console.log('item.text === null && item.read === false')
                list_chat.innerHTML +=
                    `
                        <div class="MessageMain">
                            <div class="ImageProfileMessage imageProfileMessage__1" style="padding: 25px; height: 0"><p>${item.username}</p></div>
                            <div class="ImageBorder">
                                <div class="ItemUsername">${item.username}</div>
                                
                                <div class="ImageChat_1">
                                    <img class="ImageChat" src="/files/${IdChat.textContent}/${item.id_image}" alt="">
                                    <div class="UrlImageChat">/files/${IdChat.textContent}/${item.id_image}</div>
                                </div>
                            
                                <div class="tools_message">
                                    <div class="delete_message_image"></div>
                                </div>
                               
                                <div class="IdMessage">${item.id_message}</div>
                                
                                <div class="BlockTicketTimeStamp">                        
                                    <div title="${item.time_stamp_long}" class="TimeStampShort">${item.time_stamp_short}</div>
                                    
                                    <div class="BlockTwoTickets">
                                        <div class="TickAsRead"></div>
                                        <div class="TickAsRead TickAsReadTwoTicket"></div>                                
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
            }

            else if (item.text === null && item.read === true) {
                console.log('item.text === null && item.read === false')
                list_chat.innerHTML +=
                    `
                        <div class="MessageMain">
                            <div class="ImageProfileMessage imageProfileMessage__1" style="padding: 25px; height: 0"><p>${item.username}</p></div>
                            
                            <div class="ImageBorder">
                                <div class="ItemUsername">${item.username}</div>
                                
                                <div class="ImageChat_1">
                                    <img class="ImageChat" src="/files/${IdChat.textContent}/${item.id_image}" alt="">
                                    <div class="UrlImageChat">/files/${IdChat.textContent}/${item.id_image}</div>
                                </div>
                                
                                <div class="ToolsTick">
                                    <div class="ReadMessageImage">Прочитано</div>
                                </div>
                               
                                <div class="IdMessage">${item.id_message}</div>
                                
                                <div title="${item.time_stamp_long}" class="TimeStampShort">${item.time_stamp_short}</div>
                            </div>
                        </div>
                    `
            }

            else if (item.text != null && item.read === false && item.username === document.querySelector('.username').textContent) {
                console.log('item.text != null && item.read === false')
                list_chat.innerHTML +=
                    `
                        <div class="MessageMainImageDesc">
                            <div class="ImageProfileMessage imageProfileMessage__1" style="padding: 25px; height: 0"><p>${item.username}</p></div>
                            
                            <div class="ImageBorderImageDesc">
                                <div class="ItemUsername">${item.username}</div>

                                <div class="ImageChat_1">
                                    <img class="ImageChat" src="/files/${IdChat.textContent}/${item.id_image}" alt="">
                                    <div class="UrlImageChat">/files/${IdChat.textContent}/${item.id_image}</div>
                                </div>
                            
                                <div class="TextImage">${item.text}</div>
                            
                                <div class="tools_message">
                                    <div class="delete_message_image"></div>
                                </div>
                                
                                <div class="IdMessage">${item.id_message}</div>
                                
                                <div class="BlockTicketTimeStamp">                        
                                    <div title="${item.time_stamp_long}" class="TimeStampShort">${item.time_stamp_short}</div>
                                    <div class="TickAsRead"></div>
                                </div>
                            </div>
                        </div>
                    `
            }

            else if (item.text != null && item.read === false) {
                console.log('item.text != null && item.read === false')
                list_chat.innerHTML +=
                    `
                        <div class="MessageMainImageDesc">
                            <div class="ImageProfileMessage imageProfileMessage__1" style="padding: 25px; height: 0"><p>${item.username}</p></div>
                            <div class="ImageBorderImageDesc">
                                <div class="ItemUsername">${item.username}</div>

                                <div class="ImageChat_1">
                                    <img class="ImageChat" src="/files/${IdChat.textContent}/${item.id_image}" alt="">
                                    <div class="UrlImageChat">/files/${IdChat.textContent}/${item.id_image}</div>
                                </div>
                            
                                <div class="TextImage">${item.text}</div>
                                
                                <div class="ToolsTick">
                                    <div class="ReadMessageImage">Прочитано</div>
                                </div>
                                
                                <div class="IdMessage">${item.id_message}</div>
                                
                                <div title="${item.time_stamp_long}" class="TimeStampShort">${item.time_stamp_short}</div>
                            </div>
                        </div>
                    `
            }

            else if (item.text != null && item.read === true && item.username === document.querySelector('.username').textContent) {
                console.log('item.text !== null')
                list_chat.innerHTML +=
                    `
                        <div class="MessageMainImageDesc">
                            <div class="ImageProfileMessage imageProfileMessage__1" style="padding: 25px; height: 0"><p>${item.username}</p></div>
                            <div class="ImageBorderImageDesc">
                            <div class="ItemUsername">${item.username}</div>
                            <div class="ImageChat_1">
                                <img class="ImageChat" src="/files/${IdChat.textContent}/${item.id_image}" alt="">
                                <div class="UrlImageChat">/files/${IdChat.textContent}/${item.id_image}</div>
                            </div>
                            
                            <div class="TextImage">${item.text}</div>
                        
                            <div class="tools_message">
                                <div class="delete_message_image"></div>
                            </div>
                            
                            <div class="IdMessage">${item.id_message}</div>
                            
                            <div class="BlockTicketTimeStamp">                        
                                <div title="${item.time_stamp_long}" class="TimeStampShort">${item.time_stamp_short}</div>
                                
                                <div class="BlockTwoTickets">
                                    <div class="TickAsRead"></div>
                                    <div class="TickAsRead TickAsReadTwoTicket"></div>                                
                                </div>
                            </div>
                        </div>
                    `
            }

            else if (item.text != null && item.read === true) {
                console.log('item.text !== null')
                list_chat.innerHTML +=
                    `
                        <div class="MessageMainImageDesc">
                            <div class="ImageProfileMessage imageProfileMessage__1" style="padding: 25px; height: 0"><p>${item.username}</p></div>
                            <div class="ImageBorderImageDesc">
                            <div class="ItemUsername">${item.username}</div>
                            <div class="ImageChat_1">
                                <img class="ImageChat" src="/files/${IdChat.textContent}/${item.id_image}" alt="">
                                <div class="UrlImageChat">/files/${IdChat.textContent}/${item.id_image}</div>
                            </div>
                            
                            <div class="TextImage">${item.text}</div>
                            
                            <div class="ToolsTick">
                                <div class="ReadMessageImage">Прочитано</div>
                            </div>
                            
                            <div class="IdMessage">${item.id_message}</div>
                            
                            <div title="${item.time_stamp_long}" class="TimeStampShort">${item.time_stamp_short}</div>
                        </div>
                    `
            }

            for (let MessageImageItter of document.querySelectorAll('.ImageBorder')) {
                MessageImageItter.addEventListener('click', (event) => {
                    let EventImageId = event.currentTarget.children[4]
                    let EventImageIdDelete = event.currentTarget.children[3]
                    let EventIdLinkImage = event.currentTarget.children[1].children[1].textContent
                    for (let ReadMessageImageItter of document.querySelectorAll('.ReadMessageImage')) {
                        ReadMessageImageItter.addEventListener('click', () => {
                            console.log(EventImageId.textContent)
                            fetch(`read/${EventImageId.textContent}`, {
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                mode: "cors",
                                method: 'POST'
                            })
                                .then(res => res.json())
                        })
                    }

                    for (let DeleteMessageImageItter of document.querySelectorAll('.delete_message_image')) {
                        console.log(EventImageIdDelete)
                        DeleteMessageImageItter.addEventListener('click', () => {
                            fetch(`/files/tools/delete/${EventImageIdDelete.textContent}`, {
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                mode: "cors",
                                method: 'DELETE'
                            })
                                .then(res => res.json())
                                .then(() => window.location.reload())
                        })
                    }

                    for (let ShareMessageImage of document.querySelectorAll('.share_message_image')) {
                        ShareMessageImage.addEventListener('click', () => {
                            console.log(ShareMessageImage)
                            console.log(EventIdLinkImage)
                            window.open(`/share/ImageMessage${EventIdLinkImage}`)
                        })
                    }
                })
            }

            for (let MessageImageItter of document.querySelectorAll('.ImageBorderImageDesc')) {
                MessageImageItter.addEventListener('click', (event) => {
                    let EventImageId = event.currentTarget.children[4]
                    let EventImageIdDelete = event.currentTarget.children[3]
                    let EventIdLinkImage = event.currentTarget.children[1].children[1].textContent
                    for (let ReadMessageImageItter of document.querySelectorAll('.ReadMessageImage')) {
                        ReadMessageImageItter.addEventListener('click', () => {
                            console.log(EventImageId.textContent)
                            fetch(`read/${EventImageId.textContent}`, {
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                mode: "cors",
                                method: 'POST'
                            })
                                .then(res => res.json())
                        })
                    }

                    for (let DeleteMessageImageItter of document.querySelectorAll('.delete_message_image')) {
                        console.log(EventImageIdDelete)
                        DeleteMessageImageItter.addEventListener('click', () => {
                            fetch(`/files/tools/delete/${EventImageIdDelete.textContent}`, {
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                mode: "cors",
                                method: 'DELETE'
                            })
                                .then(res => res.json())
                                .then(() => window.location.reload())
                        })
                    }

                    for (let ShareMessageImage of document.querySelectorAll('.share_message_image')) {
                        ShareMessageImage.addEventListener('click', () => {
                            console.log(ShareMessageImage)
                            console.log(EventIdLinkImage)
                            window.open(`/share/ImageMessage${EventIdLinkImage}`)
                        })
                    }
                })
            }

            let ImageChat = document.querySelectorAll('.ImageChat_1')

            for (let ImageBorderItter of document.querySelectorAll('.ImageBorder')) {
                ImageBorderItter.addEventListener('click', (event) => {
                    event.currentTarget.children[2].classList.toggle('flex')
                    event.currentTarget.children[3].classList.toggle('flex')
                    ImageBorderItter.classList.toggle('ImageBorderClick')
                })
            }

            for (let ImageBorderItter of document.querySelectorAll('.ImageBorderImageDesc')) {
                ImageBorderItter.addEventListener('click', (event) => {
                    event.currentTarget.children[3].classList.toggle('flex')
                    ImageBorderItter.classList.toggle('ImageBorderClick')
                    console.log(event.currentTarget)
                })
            }

            for (let ImageChatItter of ImageChat) {
                ImageChatItter.addEventListener('click', (event) => {
                    window.open(event.currentTarget.children[1].textContent, '_self')
                })
            }

            for (let ImageProfileMessageItter of document.querySelectorAll('.ImageProfileMessage')) {
                ImageProfileMessageItter.addEventListener('click', (event) => {
                    window.open(`AccountPage/${event.currentTarget.children[0].textContent}`, '_self')
                })
            }

            for (let message of document.querySelectorAll('.message')) {
                message.addEventListener('click', (event) => {
                    event.currentTarget.children[3].classList.toggle('flex')
                    event.currentTarget.children[4].classList.toggle('flex')

                    let EventIDMessage = event.currentTarget.children[1]
                    let EventText = event.currentTarget.children[2]

                    for (let ShareMessageItter of document.querySelectorAll('.share_message')) {
                        ShareMessageItter.addEventListener('click', () => {
                            window.open(`/share/TextMessage/${EventText.textContent}`, '_self')
                            console.log(EventText)
                        })
                    }

                    let delete_message = document.querySelectorAll('.delete_message')
                    for (let delete_message_itter of delete_message) {
                        delete_message_itter.addEventListener('click', () => {
                            fetch(`/delete_message/${EventIDMessage.textContent}`, {
                                method: 'delete',
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                mode: "cors"
                            })
                                .then(() => {
                                    alert('Сообщение - ' + item.text + ' успешно удалено')
                                    // window.location.reload()
                                })
                        })
                    }

                    const edit_message = document.querySelectorAll('.edit_message')
                    const window_edit_message = document.querySelector('.window_edit_message')
                    const cancel_edit_message = document.querySelector('.cancel_edit_message')

                    for (let edit_message_itter of edit_message) {
                        edit_message_itter.addEventListener('click', () => {
                            height.classList.add('none')
                            list_chat.classList.add('none')
                            flex_content_chat_top_tools.classList.add('none')
                            window_edit_message.classList.add('flex')
                            cancel_edit_message.classList.add('block')
                            tools.classList.add('none')

                            window_edit_message.innerHTML=`
                                <textarea class="input_edit_message" name="message">${EventText.textContent}</textarea>
                                <input type="submit" class="save_edit_message" value="Сохранить">
                            `

                            const save_edit_message = document.querySelector('.save_edit_message')
                            const input_edit_message = document.querySelector('.input_edit_message')

                            cancel_edit_message.addEventListener('click', () => {
                                window_edit_message.classList.remove('flex')
                                list_chat.classList.remove('none')
                                flex_content_chat_top_tools.classList.remove('none')
                                height.classList.remove('none')
                                tools.classList.remove('none')
                            })

                            save_edit_message.addEventListener('click', () => {
                                window_edit_message.classList.remove('flex')
                                list_chat.classList.remove('none')
                                flex_content_chat_top_tools.classList.remove('none')

                                const formData = {
                                    "message": input_edit_message.value
                                }

                                if (input_edit_message.value.length > 0 && input_edit_message.value !== item.text) {
                                    fetch(`/edit_message/${EventIDMessage.textContent}`, {
                                        method: 'POST',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(formData)
                                    })
                                        .then(() => {
                                            window.location.reload()
                                        })
                                }

                                else {
                                    alert('Сообщение не обновлено так как оно пустое или такой же контент')
                                }
                            })
                        })
                    }

                    for (let ReadMessageItter of document.querySelectorAll('.ReadMessage')) {
                        ReadMessageItter.addEventListener('click', () => {
                            console.log(EventIDMessage)
                            fetch(`read/${EventIDMessage.textContent}`, {
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                mode: "cors",
                                method: 'POST'
                            })
                                .then(res => res.json())
                        })
                    }
                })
            }

            let text = document.querySelectorAll('.text')

            for (let TextItter of text) {
                TextItter.addEventListener('click', () => {
                    function copyTextToClipboard(text) {
                        const textArea = document.createElement("textarea");
                        textArea.className = 'textArea'

                        textArea.value = text;
                        document.body.appendChild(textArea);
                        textArea.select();

                        try {
                            const successful = document.execCommand('copy');
                            const msg = successful ? 'Успешно' : 'Не успешно';
                            alert('Текст скопирован - ' + msg)
                        }

                        catch (err) {
                            console.log('Что - то пошло не так с копированием');
                        }

                        document.body.removeChild(textArea);
                    }

                    copyTextToClipboard(`${TextItter.textContent}`);

                    for (let ToolsMessageItter of document.querySelectorAll('.tools_message')) {
                        ToolsMessageItter.classList.remove('flex')
                    }

                    for (let ToolsTickItter of document.querySelectorAll('.ToolsTick')) {
                        ToolsTickItter.classList.remove('flex')
                    }
                })
            }

            let ItemUsername = document.querySelectorAll('.ItemUsername')
            for (let ItemUsernameItter of ItemUsername) {
                ItemUsernameItter.addEventListener('click', (event) => {
                    window.open(`AccountPage/${event.currentTarget.textContent}`, '_self')
                })
            }

            for (let ImageProfileMessageItter of document.querySelectorAll('.ImageProfileMessage')) {
                ImageProfileMessageItter.style.background=`url(${item.image})` + 'no-repeat center'
                ImageProfileMessageItter.style.backgroundSize='40px'
            }
        })))

        if (list_chat.clientHeight === 0) {
            // btn_down_1.classList.add('none')
            list_chat.innerHTML=`
                <div class="MessageNullDiv">
                    <div class="MessageListNull">
                        <div class="TextNullInfo">Сообщений нет начните общаться первым</div>
                        <div class="ImageMessageNull"></div>
                    </div>
                </div>
            `
        }
    })

btn_tools_chat.addEventListener('click', () => {
    window_add_file.classList.add('flex')
    list_chat.classList.add('none')
    flex_content_chat_top_tools.classList.add('none')
    height.classList.add('none')
    tools.classList.add('none')

    console.log(IdChat)

    fetch(`/files/limit/${IdChat.textContent}`, {
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors"
    })
        // .catch(() => console.log('Ошибка в файлах'))
        .then(res => res.json())
        // .catch(() => console.log('Не возможно распарить json'))
        .then(data => data.forEach(item => {
            if (item.text === null || item.text === '') {
                ListUploadedImage.innerHTML+=`
                    <div class="Border">
                        <img class="link_image" src="/files/${IdChat.textContent}/${item.id_image}" alt="Фото из чата" title="${item.text}">                    
                    </div>
                `
            }

            else {
                ListUploadedImage.innerHTML+=`
                    <img class="link_image" src="/files/${IdChat.textContent}/${item.id_image}" alt="Фото из чата" title="${item.text}">
                    <div class="PlaceHolderBlock">${item.text}</div>
                `
            }

            let link_image = document.querySelectorAll('.link_image')
            for (let LinkImage of link_image) {
                LinkImage.addEventListener('click', (event) => {
                    console.log(event.currentTarget)
                    // window.open(`/${LinkImage.textContent}`, '_self')
                })
            }
        }))

    fetch(`/files/count/${IdChat.textContent}`, {
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors"
    })
        // .catch(() => console.log('Ошибка в файлах'))
        .then(res => res.json())
        // .catch(() => console.log('Не возможно распарить json'))
        .then(data => data.forEach(item => {
            console.log(item)
            let CountFilesChat = document.querySelector('.CountFilesChat')
            CountFilesChat.innerHTML=`${item.count}`
        }))
})

let file = document.querySelector('.file')
let NameFile = document.querySelector('.NameFile')
let SizeFile = document.querySelector('.size')
let TypeFile = document.querySelector('.type')
let LastModifiedDate = document.querySelector('.lastModifiedDate')
let BorderOptionFile = document.querySelectorAll('.BorderOptionFile')
let WarningSizeFile = document.querySelector('.WarningSizeFile')

file.onchange = () => {
    for (let FilesItter of file.files) {
        for (let BorderOptionFileItter of BorderOptionFile) {
            BorderOptionFileItter.classList.add('flex')
        }
        WarningSizeFile.classList.add('block')
        console.log(FilesItter)
        NameFile.innerHTML=`${FilesItter.name}`
        let CountMB = FilesItter.size/1024/1024
        if (Math.round(CountMB) > 3) {
            SizeFile.innerHTML=`Размер файла слишком большой`
        }

        else {
            SizeFile.innerHTML=`Размер файла имеет допустимую норму`
        }
        TypeFile.innerHTML=`${FilesItter.type}`
        LastModifiedDate.innerHTML=`${FilesItter.lastModifiedDate}`
        console.log(Math.round(CountMB))
        console.log(CountMB)
    }
}

btn_close_add_file.addEventListener('click', () => {
    window_add_file.classList.remove('flex')
    list_chat.classList.remove('none')
    flex_content_chat_top_tools.classList.remove('none')
    height.classList.remove('none')
    tools.classList.remove('none')
})

border_name_chat.addEventListener('click', () => {
    window_settings_chat.classList.add('visible')
    list_chat.classList.add('none')
    flex_content_chat_top_tools.classList.add('none')
    // btn_down_1.classList.add('none')
    tools.classList.add('none')
    height.classList.add('none')
    let admin_chat = document.querySelector('.UserChatName').textContent

    console.log(admin_chat)
    console.log(username)

    if (admin_chat === document.querySelector('.username').textContent) {
        ToolsAdmin.classList.add('flex')
        console.log(admin_chat)
        console.log(username)
        console.log('if')
    }

    else {
        console.log('else')
        ToolsAdmin.classList.remove('flex')
    }

    let WindowAddUsers = document.querySelector('.WindowAddUsers')
    let WindowEditListUser = document.querySelector('.WindowEditListUser')
    let CloseWindow4 = document.querySelector('.close_window_4')
    let CloseWindow5 = document.querySelector('.close_window_5')

    document.querySelector('.AddUsersBtn').addEventListener('click', () => {
        CloseWindow4.classList.add('block')
        window_settings_chat.classList.add('none')
        WindowAddUsers.classList.add('block')
        document.querySelector('.image_settings_open').classList.add('none')
        document.querySelector('.H1BlockAdminChat').classList.add('none')
        document.querySelector('.admin_chat').classList.add('none')
        document.querySelector('.H1BlockUsersChat').classList.add('none')
        document.querySelector('.ListUsersChat').classList.add('none')
        document.querySelector('.close_window_3').classList.add('none')
        document.querySelector('.H1BlockLinkChat').classList.add('none')
        document.querySelector('.list_link_chat').classList.add('none')

        fetch('/all_users', {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: "cors"
        })
            .then(response => response.json())
            .then((data) => {data.forEach(item => {
                for (let UserChatNewItter of document.querySelectorAll('.UserChatNew')) {
                    if (item.username !== document.querySelector('.username').textContent && item.username !== UserChatNewItter.textContent) {
                        document.querySelector('.ListUsersAddNewUserChat').innerHTML+=`
                        <div class="user" id="user">
                            <!--<div class="id"></div>-->
                            <div class="user_image" style="background: url(${item.image}) no-repeat; background-size: 71px; height: 60px; width: 70px"><p>${item.image}</p></div>
                            <div class="name">${item.username}</div>
                        </div>
                    `
                    }
                }

                let user = document.querySelectorAll('.user')
                for (let UserItter of user) {
                    UserItter.addEventListener('click', (event) => {
                        let NameUser = event.currentTarget.children[1].textContent
                        let chat_name = document.querySelector('.border_name_chat').textContent
                        let image_user = event.currentTarget.children[0].children[0].textContent
                        let AddSaveBtnUserChat = document.querySelector('.AddSaveBtnUserChat')
                        AddSaveBtnUserChat.classList.add('block')
                        AddSaveBtnUserChat.addEventListener('click', () => {
                            let FormData = {
                                "name": NameUser,
                                "image_user": image_user,
                                "chat_name": chat_name
                            }
                            fetch('/AddUserChatAdmin', {
                                headers: new Headers({
                                    'Content-Type': 'application/json'
                                }),
                                mode: "cors",
                                method: "POST",
                                body: JSON.stringify(FormData)
                            })
                                .then(() => alert('Пользователь / пользователи добавлены'))
                                .then(() => window.location.reload())
                        })
                    })
                }
            })})
    })

    document.querySelector('.EditChatUser').addEventListener('click', () => {
        CloseWindow5.classList.add('block')
        WindowEditListUser.classList.add('block')
        window_settings_chat.classList.add('none')
        document.querySelector('.close_window_3').classList.add('none')
        document.querySelector('.image_settings_open').classList.add('none')
        document.querySelector('.H1BlockAdminChat').classList.add('none')
        document.querySelector('.admin_chat').classList.add('none')
        document.querySelector('.H1BlockUsersChat').classList.add('none')
        document.querySelector('.ListUsersChat').classList.add('none')
        document.querySelector('.H1BlockLinkChat').classList.add('none')
        document.querySelector('.list_link_chat').classList.add('none')
        let chat_name = document.querySelector('.border_name_chat').textContent
        fetch(`/Find/${chat_name}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: "cors",
            method: 'POST'
        })
            .then(response => response.json())
            .then((data) => {data.forEach(item => {
                if (item.name !== document.querySelector('.UserChatName').textContent) {
                    document.querySelector('.ListUsersEdit').innerHTML += `
                        <div class="Username">
                            <div class="user" id="user">
                                <div class="id">${item.id}</div>
                                <div class="user_image" style="background: url(${item.image_user}) no-repeat; background-size: 71px; height: 60px; width: 70px"><p>${item.image}</p></div>
                                <div class="name">${item.name}</div>
                            </div>
                            
                            <div class="DeleteBtn">Удалить</div>
                        </div>
                    `
                }

                let DeleteBtn = document.querySelectorAll('.DeleteBtn')
                for (let DeleteBtnItter of DeleteBtn) {
                    DeleteBtnItter.addEventListener('click', () => {
                        let Username = document.querySelectorAll('.Username')
                        for (let UsernameItter of Username) {
                            UsernameItter.addEventListener('click', (event) => {
                                fetch(`/DeleteUser/${event.currentTarget.children[0].children[0].textContent}`, {
                                    headers: new Headers({
                                        'Content-Type': 'application/json'
                                    }),
                                    mode: "cors",
                                    method: 'DELETE'
                                })
                                    .then(() => alert('Пользователь удалён из чата'))
                                    .then(() => window.location.reload())
                            })
                        }
                    })
                }
            })})
    })

    CloseWindow4.addEventListener('click', () => {
        window.location.reload()
    })

    CloseWindow5.addEventListener('click', () => {
        window.location.reload()
    })
})

close_window_3.addEventListener('click', () => {
    window_settings_chat.classList.remove('visible')
    list_chat.classList.remove('none')
    flex_content_chat_top_tools.classList.remove('none')
    // btn_down_1.classList.remove('none')
    tools.classList.remove('none')
    height.classList.remove('none')
    ToolsAdmin.classList.remove('flex')
})

send_message.addEventListener('click', () => {
    if (input_message.value === '') {
        input_message.classList.remove('red')
    }

    else {
        input_message.classList.remove('red')
    }
})

send_message.addEventListener('input', () => {
    if (input_message.value.length > 0) {
        input_message.classList.remove('red')
    }

    else {
        input_message.classList.add('red')
    }
})

let list_link_chat = document.querySelector('.list_link_chat')
list_link_chat.innerHTML=`
    <div class="LinkChat"><p class="TextLink">${document.location.href}</p></div>
    <div class="CopyBtnChat">Скопировать ссылку на чат</div>
`

let LinkChat = document.querySelector('.LinkChat')
LinkChat.addEventListener('click', () => {
    if (LinkChat.textContent === document.location.href) {
        alert('Вы уже на это странице')
    }

    else {
        window.open(`${document.location.href}`)
    }
})

let CopyBtnChat = document.querySelector('.CopyBtnChat')
CopyBtnChat.addEventListener('click', () => {
    function copyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.className = 'textArea'

        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'Успешно' : 'Не успешно';
            alert('Текст скопирован - ' + msg)
        }

        catch (err) {
            alert('Что - то пошло не так')
        }

        document.body.removeChild(textArea);
    }

    copyTextToClipboard(`${document.querySelector('.TextLink').textContent}`);
})

function connect() {
    username = document.querySelector('.username').textContent;

    if (username) {
        let socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, ErrorSocket);

        ErrorConnect.classList.remove('block')
    }
}

function onConnected() {
    stompClient.subscribe('/topic/public', onMessageReceived);

    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    )
}

function onMessageReceived(payload) {

    let message = JSON.parse(payload.body);

    console.log(payload.body)
    console.log(JSON.parse(payload.body).sender)

    if (JSON.parse(payload.body).content !== null) {
        list_chat.innerHTML += `
        <div class="MessageMain">
            <div class="ImageProfileMessage1"><p>${JSON.parse(payload.body).sender}</p></div>
                <div class="message">
                    <div class="ItemUsername">${JSON.parse(payload.body).sender}</div>
                    <div class="text">${JSON.parse(payload.body).content}</div>
                        
                    <div class="id">IdMessage</div>
                        
<!--                    <div class="tools_message">-->
<!--                        <div class="delete_message"></div>-->
<!--                        <div class="edit_message"></div>-->
<!--                        <div class="share_message"></div>-->
<!--                    </div>-->
                                                                    
<!--                    <div class="ToolsTick">-->
<!--                        <div class="ReadMessage">Прочитано</div>-->
<!--                        <div class="GetMessage">Получено</div>-->
<!--                    </div>-->
                        
                    <div title="${JSON.parse(payload.body).TimeStampLong}" class="TimeStampShort">${JSON.parse(payload.body).TimeStampShort}</div>
            </div>
        </div>
        `
    }

    let ImageProfileMessage1 = document.querySelectorAll('.ImageProfileMessage1')

    for (let ImageProfileMessageItter1 of ImageProfileMessage1) {
        ImageProfileMessageItter1.style.background=`url(${JSON.parse(payload.body).image})` + 'no-repeat center'
        ImageProfileMessageItter1.style.backgroundSize='45px'
        ImageProfileMessageItter1.addEventListener('click', (event) => {
            console.log(event.currentTarget.children[0].textContent)
            window.open(`/chat/AccountPage/${event.currentTarget.children[0].textContent}`, '_self')
        })
    }

    for (let ItemUsernameItter of document.querySelectorAll('.ItemUsername')) {
        ItemUsernameItter.addEventListener('click', (event) => {
            console.log(event.currentTarget.textContent)
            window.open(`/chat/AccountPage/${event.currentTarget.textContent}`, '_self')
        })
    }

    let MessageChat = document.querySelectorAll('.message')

    for (let MessageItter of MessageChat) {
        MessageItter.addEventListener('click', (event) => {
            console.log(MessageItter)

            let IdDeleteMessage = event.currentTarget
            let delete_message = document.querySelectorAll('.delete_message')

            for (let delete_message_itter of delete_message) {
                delete_message_itter.addEventListener('click', () => {
                    console.log(delete_message_itter)
                    console.log(IdDeleteMessage)
                    fetch(`/delete_message/${IdDeleteMessage.textContent}`, {
                        method: 'delete',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        mode: "cors"
                    })
                        .then(() => {
                            alert('Сообщение - ' + JSON.parse(payload.body).content + ' успешно удалено')
                            // window.location.reload()
                        })
                })
            }
        })
    }

    let messageElement = document.createElement('li')
    let textElementInvite = document.createElement('p')
    let textElementLogOut = document.createElement('p')
    let textChat = document.createElement('p')
    let UsernameP = document.createElement('p')
    let PBlockTextOnline = document.createElement('p')

    textElementInvite.className='EventInvite'
    textElementLogOut.className='EventLogOut'

    textChat.className='TextChat'
    UsernameP.className='UserNameEventLink'

    if (message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.EventInviteSender = message.sender;
        message.EventInvite = 'онлайн';
        let messageEventInvite = document.createTextNode(message.EventInvite)
        let messageEventSender = document.createTextNode(message.EventInviteSender)
        ErrorConnect.classList.remove('block')
        UsernameP.appendChild(messageEventSender)
        PBlockTextOnline.appendChild(messageEventInvite)
        messageAreaNew.appendChild(messageElement);
        messageAreaNew.scrollMarginBottom = messageAreaNew.scrollHeight;
        let EventInvite = document.querySelector('.event-message')
        EventInvite.innerHTML+=`
            <div class="EventInvite">
                <p>${message.sender} онлайн</p>
            </div>
        `
    }

    else if (message.type === 'LEAVE') {
        // let messageEventLogout = document.createTextNode(message.EventLogout)
        messageElement.classList.add('event-message');
        // message.EventLogout = message.sender + 'офлайн';
        ErrorConnect.classList.remove('block')
        messageElement.appendChild(textElementLogOut)
        // textElementLogOut.appendChild(messageEventLogout)
        messageAreaNew.appendChild(messageElement);
        messageAreaNew.scrollMarginBottom = messageAreaNew.scrollHeight;
        let EventLogOut = document.querySelector('.EventLogOut')
        EventLogOut.innerHTML=`${message.sender} офлайн`
    }

    else if (message.type === 'SEND') {
        ErrorConnect.classList.remove('block')
    }

    else if (message.type === 'Whoops! Lost connection to http://localhost:8080/ws') {
        ErrorConnect.classList.add('block')
    }

    // else {
    //     // textChat.appendChild(TextChat)
    //     messageElement.appendChild(textChat);
    //     messageAreaNew.appendChild(messageElement);
    //     messageAreaNew.scrollMarginBottom = messageAreaNew.scrollHeight;
    // }

    let UserNameEventLink = document.querySelectorAll('.UserNameEventLink')

    for (let UserNameEventLinkItter of UserNameEventLink) {
        UserNameEventLinkItter.addEventListener('click', (event) => {
            window.open(`AccountPage/${event.currentTarget.textContent}`, '_self')
        })
    }

    ErrorSocket()
}

function sendMessage (event) {
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
                    let MessageNullDiv = document.querySelector('.MessageNullDiv')
                    MessageNullDiv.classList.add('none')

                    /*

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
                    */
                })
            })
    }
    event.preventDefault();
}

messageForm.addEventListener('submit', sendMessage, true)

function ErrorSocket() {
    console.log('may be ok')
    // fetch('/connect', {
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     mode: "cors",
    //     method: 'GET'
    // })
    //     .catch(() => ErrorConnect.classList.add('block'))
    //     .then(res => res.json())
    //     .then(data => data.forEach(item => {
    //         console.log(item)
    //         if (item === 'ok') {
    //             ErrorConnect.classList.remove('block')
    //             console.log('connect to server is success')
    //         }
    //     }))
}

connect()
ErrorSocket()