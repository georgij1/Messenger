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

document.querySelector('.IconOpenList').addEventListener('click', () => {
    document.querySelector('.UsersChat').classList.toggle('block')
    document.querySelector('.chats').classList.toggle('flex')
    document.querySelector('.ListMessage').classList.toggle('flex')
    document.querySelector('body').classList.toggle('no_scroll')
    document.querySelector('.list_chat').classList.toggle('OverflowScroll')
    document.querySelector('.PermissionDenied').classList.remove('visible')
    document.querySelector('.list_chat').classList.remove('none')
})

fetch('/list_chats', {
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: "cors"
})
    .then(res => res.json())
    .then(data => data.forEach(item => {
        document.querySelector('.chats').innerHTML+=`
            <div class="Chat">
                <div class="ImageChatChat"><p>${item.image_chat}</p></div>
                <div class="NameChat">${item.name}</div>
                <div class="IdChat">${item.id}</div>
                <div class="OwnerChat">${item.owner}</div>
            </div>
        `

        for (let ImageChatChatItter of document.querySelectorAll('.ImageChatChat')) {
            ImageChatChatItter.style.background=`url(${item.image_chat}) no-repeat center`
            ImageChatChatItter.style.backgroundSize='90%'
            ImageChatChatItter.style.boxShadow='0 0 10px burlywood'
            ImageChatChatItter.style.borderRadius='100%'
        }

        for (let ChatItter of document.querySelectorAll('.Chat')) {
            ChatItter.addEventListener('click', (event) => {
                document.querySelector('.list_chat').classList.add('none')

                console.log(event.currentTarget.children[2].textContent)

                console.log(event.currentTarget.children[0].textContent)

                let UsernameNew = document.querySelector('.username').textContent
                console.log(UsernameNew)
                let ChatName = event.currentTarget.children[1].textContent
                let AdminChat = event.currentTarget.children[3].textContent

                console.log(AdminChat)
                console.log(event.currentTarget)

                const formData = {
                    "NameChat": event.currentTarget.children[1].textContent,
                    "username": UsernameNew
                }

                let IDChat = event.currentTarget.children[2].textContent
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

                        if (item.status === "success") {
                            console.log("success")
                            console.log(event.currentTarget)
                            window.open(`/chat/${IDChat}#BottomPage`, '_self')
                            PermissionDenied.classList.remove('visible')
                            console.log(`/chat/${IDChat}#BottomPage`)
                        }

                        else {
                            PermissionDenied.classList.add('visible')
                        }
                    })))
            })
        }
    }))



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

            document.querySelector('.BorderImageChat').style.background=`url(${item.image_chat}) no-repeat center`
            document.querySelector('.BorderImageChat').style.backgroundSize='100%'
            document.querySelector('.BorderImageChat').style.borderRadius='100%'
            document.querySelector('.BorderImageChat').innerHTML=`<p class="ItemImageChat">${item.image_chat}</p>`

            document.querySelector('.BorderImageChat').addEventListener('click', (event) => {
                console.log(event.currentTarget.children[0].textContent)
            })

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
                        console.log(item)

                        if (item.status === 'Не в сети') {
                            document.querySelector('.UsersChat').innerHTML+=`
                                <div class="User">
                                    <div class="ImageUser">
                                        <div class="ImageProfile"><p>${item.image_user}</p></div>                                    
                                        <div class="NotInLife"></div>
                                    </div>
                                    
                                    <div class="UseName">${item.name}</div>
                                </div>
                            `
                        }

                        else {
                            document.querySelector('.UsersChat').innerHTML+=`
                                <div class="User">
                                    <div class="ImageUser">
                                        <div class="ImageProfile"><p>${item.image_user}</p></div>                                    
                                        <div class="InLife"></div>
                                    </div>
                                    
                                    <div class="UseName">${item.name}</div>
                                </div>
                            `
                        }

                        for (let UserItter of document.querySelectorAll('.User')) {
                            UserItter.addEventListener('click', (event) => {
                                console.log(event.currentTarget.children[1].textContent)
                                window.open(`/chat/AccountPage/${event.currentTarget.children[1].textContent}`, '_self')
                            })
                        }

                        for (let ImageProfileItter of document.querySelectorAll('.ImageProfile')) {
                            ImageProfileItter.style.background=`url(${item.image_user}) no-repeat center`
                            ImageProfileItter.style.backgroundSize='90%'
                            ImageProfileItter.style.boxShadow='0 0 10px burlywood'
                            ImageProfileItter.style.borderRadius='100%'
                            ImageProfileItter.innerHTML=`<p class="ItemImageChat">${item.image_chat}</p>`
                        }



                        if (res === 'null') {
                            list_users_open_settings.innerHTML=`Пользователей нет`
                        }

                        if (item.name !== username.textContent) {
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
                            
                            <div title="${item.time_stamp_long}" class="TimeStampShort">${item.time_stamp_short}</div>
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
    
                            <div title="${item.time_stamp_long}" class="TimeStampShort">${item.time_stamp_short}</div>
    
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
                                // .then(() => window.location.reload())
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
                    let EventImageIdDelete = event.currentTarget[1]
                    let EventImageIdDeleteDesc = event.currentTarget.children[4]
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
                        console.log(EventImageIdDeleteDesc)
                        DeleteMessageImageItter.addEventListener('click', () => {
                            fetch(`/files/tools/delete/${EventImageIdDeleteDesc.textContent}`, {
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                mode: "cors",
                                method: 'DELETE'
                            })
                                .then(res => res.json())
                                // .then(() => window.location.reload())
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
                                    window.location.reload()
                                })
                        })
                    }

                    const edit_message = document.querySelectorAll('.edit_message')
                    const window_edit_message = document.querySelector('.window_edit_message')
                    const cancel_edit_message = document.querySelector('.cancel_edit_message')

                    for (let edit_message_itter of edit_message) {
                        edit_message_itter.addEventListener('click', () => {
                            document.querySelector('.close_window_2').classList.add('none')
                            document.querySelector('.IconOpenList').classList.add('none')
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
                                document.querySelector('.close_window_2').classList.remove('none')
                                document.querySelector('.IconOpenList').classList.remove('none')
                                document.querySelector('.cancel_edit_message').classList.remove('block')
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
    document.querySelector('.close_window').classList.add('none')
    document.querySelector('.IconOpenList').classList.add('none')
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
        .then(res => res.json())
        .then(data => data.forEach(item => {
            if (item.text === null || item.text === '') {
                ListUploadedImage.innerHTML+=`
                    <div class="Border">
                        <img class="link_image" src="/files/${IdChat.textContent}/${item.id_image}" alt="Фото из чата" title="${item.text}">                    
                        <div class="FilePathText">/files/${IdChat.textContent}/${item.id_image}</div>
                    </div>
                `
            }

            else {
                ListUploadedImage.innerHTML+=`
                    <div class="Border">
                        <img class="link_image" src="/files/${IdChat.textContent}/${item.id_image}" alt="Фото из чата" title="${item.text}">
                        <div class="FilePathText">/files/${IdChat.textContent}/${item.id_image}</div>
                        <div class="PlaceHolderBlock">${item.text}</div>
                    </div>
                `
            }

            let Border = document.querySelectorAll('.Border')
            for (let LinkImage of Border) {
                LinkImage.addEventListener('click', (event) => {
                    console.log(event.currentTarget.children[1].textContent)
                    window.open(`${event.currentTarget.children[1].textContent}`, '_self')
                })
            }
        }))

    fetch(`/files/count/${IdChat.textContent}`, {
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors"
    })
        .then(res => res.json())
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

        console.log(Math.fround(CountMB))
        console.log(CountMB)

        if (Math.fround(CountMB) > 3) {
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
    document.querySelector('.close_window').classList.remove('none')
    document.querySelector('.IconOpenList').classList.remove('none')
    window_add_file.classList.remove('flex')
    list_chat.classList.remove('none')
    flex_content_chat_top_tools.classList.remove('none')
    height.classList.remove('none')
    tools.classList.remove('none')
})

border_name_chat.addEventListener('click', () => {
    document.querySelector('.ToolChat').classList.add('none')
    document.querySelector('.FlexGroup').classList.remove('flex')
    document.querySelector('.UsersChat').classList.add('none')
    document.querySelector('.chats').classList.add('none')
    document.querySelector('.close_window_2').classList.add('none')
    window_settings_chat.classList.add('visible')
    list_chat.classList.add('none')
    flex_content_chat_top_tools.classList.add('none')
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
                console.log(item)
                if (item.username !== document.querySelector('.username').textContent) {
                    document.querySelector('.ListUsersAddNewUserChat').innerHTML+=`
                        <div class="user" id="user">
                            <div class="user_image" style="background: url(${item.image}) no-repeat; background-size: 71px; height: 60px; width: 70px"><p>${item.image}</p></div>
                            <div class="name">${item.username}</div>
                        </div>
                    `
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
                console.log("DataLength - " + data.length)

                if (data.length === null) {
                    document.querySelector('.ListUsersEdit').innerHTML += `
                        <p>Пользователей нет</p>
                    `
                }

                else if (item.name !== document.querySelector('.UserChatName').textContent) {
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

let users = [];

document.querySelector('.BorderImageChat').addEventListener('click', () => {
    document.querySelector('.ToolChat').classList.add('none')
    document.querySelector('.FlexGroup').classList.remove('flex')
    document.querySelector('.UsersChat').classList.add('none')
    document.querySelector('.chats').classList.add('none')
    document.querySelector('.close_window_2').classList.add('none')
    window_settings_chat.classList.add('visible')
    list_chat.classList.add('none')
    flex_content_chat_top_tools.classList.add('none')
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
                console.log(item)
                if (item.username !== document.querySelector('.username').textContent) {
                    document.querySelector('.ListUsersAddNewUserChat').innerHTML+=`
                        <div class="user">
                            <div class="user_image" style="background: url(${item.image}) no-repeat; background-size: 71px; height: 60px; width: 70px"><p>${item.image}</p></div>
                            <div class="name">${item.username}</div>
                        </div>
                    `
                }

                let user = document.querySelectorAll('.user')
                for (let UserItter of user) {
                    console.log(UserItter)
                    UserItter.addEventListener('click', (event) => {

                        UserItter.classList.toggle('tick')

                        const user = event.target.querySelector('.name').textContent;
                        const image = event.target.querySelector('p').textContent

                        let is_exists = -1;

                        for (let i = 0; i < users.length; ++i) {
                            if (users[i].user === user) {
                                is_exists = i;
                                break;
                            }
                        }

                        (is_exists === -1 ? users.push({user: user, image: image}) : users.splice(is_exists, 1))

                        // не то
                        //let NameUser = event.currentTarget.children[1].textContent
                        //let chat_name = document.querySelector('.border_name_chat').textContent
                        //let image_user = event.currentTarget.children[0].children[0].textContent

                        let AddSaveBtnUserChat = document.querySelector('.AddSaveBtnUserChat')
                        AddSaveBtnUserChat.classList.add('block')
                        AddSaveBtnUserChat.addEventListener('click', (event) => {
                            // console.log(event.currentTarget)

                            let FormData = {
                                "name": document.querySelector('.border_name_chat').textContent,
                                "image_user": users.map(item => item.image),
                                "chat_name": users.map(item => item.user)
                            }

                            console.log(FormData)

                            fetch('/AddUserChatAdmin', {
                                headers: new Headers({
                                    'Content-Type': 'application/json'
                                }),
                                mode: "cors",
                                method: "POST",
                                body: JSON.stringify(FormData)
                            })
                                .then(res => res)
                            // .then(() => alert('Пользователь / пользователи добавлены'))
                            // .then(() => window.location.reload())
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
                console.log("DataLength - " + data.length)

                if (data.length === null) {
                    document.querySelector('.ListUsersEdit').innerHTML += `
                        <p>Пользователей нет</p>
                    `
                }

                else if (item.name !== document.querySelector('.UserChatName').textContent) {
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
    document.querySelector('.ToolChat').classList.remove('none')
    document.querySelector('.FlexGroup').classList.add('flex')
    document.querySelector('.UsersChat').classList.remove('none')
    document.querySelector('.chats').classList.remove('none')
    document.querySelector('.close_window_2').classList.remove('none')
    window_settings_chat.classList.remove('visible')
    list_chat.classList.remove('none')
    flex_content_chat_top_tools.classList.remove('none')
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

        ErrorConnect.classList.remove('flex')
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
                <div class="MessageRealTime">
                    <div class="ItemUsername">${JSON.parse(payload.body).sender}</div>
                    
                    <div class="id">${JSON.parse(payload.body).idmessage}</div>
                    
                    <div class="TextRealTime">${JSON.parse(payload.body).content}</div>
                    
                    <div class="tools_message">
                        <div class="delete_message"></div>
                        <div class="edit_message"></div>
                        <div class="share_message"></div>
                    </div>
                        
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

            let Text = event.currentTarget.children[2]

            console.log(event.currentTarget.children[2])
            console.log(event.currentTarget.children[3])

            let EventIdMessage = event.currentTarget.children[1]

            event.currentTarget.children[3].classList.toggle('flex')

            event.currentTarget.children[3].classList.toggle('flex')

            let EventEdit = event.currentTarget.children

            for (let ShareMessageItter of document.querySelectorAll('.share_message')) {
                ShareMessageItter.addEventListener('click', () => {
                    console.log(Text)
                    window.open(`/share/TextMessage/${Text.textContent}`, '_self')
                })
            }

            for (let BtnDeleteMessage of document.querySelectorAll('.delete_message')) {
                BtnDeleteMessage.addEventListener('click', () => {
                    console.log('delete message')
                    let chatMessage  = {
                        IDMessage: EventIdMessage.textContent
                    };

                    stompClient.send("/app/chat.deleteMessage", {}, JSON.stringify(chatMessage));
                })
            }

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
                            window.location.reload()
                        })
                })
            }
        })
    }

    for (let MessageItterRealTime of document.querySelectorAll('.MessageRealTime')) {
        MessageItterRealTime.addEventListener('click', (event) => {
            console.log(MessageItterRealTime)

            let Text = event.currentTarget.children[2]

            console.log(event.currentTarget.children[2])
            console.log(event.currentTarget.children[3])

            let EventIdMessage = event.currentTarget.children[1]

            event.currentTarget.children[3].classList.toggle('flex')

            let EventEdit = event.currentTarget.children

            for (let ShareMessageItter of document.querySelectorAll('.share_message')) {
                ShareMessageItter.addEventListener('click', () => {
                    console.log(Text)
                    window.open(`/share/TextMessage/${Text.textContent}`, '_self')
                })
            }

            for (let EditMessageItter of document.querySelectorAll('.edit_message')) {
                EditMessageItter.addEventListener('click', () => {
                    document.querySelector('.close_window_2').classList.add('none')
                    document.querySelector('.IconOpenList').classList.add('none')
                    height.classList.add('none')
                    list_chat.classList.add('none')
                    flex_content_chat_top_tools.classList.add('none')
                    document.querySelector('.window_edit_message').classList.add('flex')
                    document.querySelector('.cancel_edit_message').classList.add('block')
                    tools.classList.add('none')

                    document.querySelector('.window_edit_message').innerHTML=`
                                <textarea class="input_edit_message" name="message">${Text.textContent}</textarea>
                                <input type="submit" class="save_edit_message" value="Сохранить">
                            `

                    const save_edit_message = document.querySelector('.save_edit_message')
                    const input_edit_message = document.querySelector('.input_edit_message')

                    document.querySelector('.cancel_edit_message').addEventListener('click', () => {
                        document.querySelector('.window_edit_message').classList.remove('flex')
                        list_chat.classList.remove('none')
                        flex_content_chat_top_tools.classList.remove('none')
                        height.classList.remove('none')
                        tools.classList.remove('none')
                        document.querySelector('.close_window_2').classList.remove('none')
                        document.querySelector('.IconOpenList').classList.remove('none')
                        document.querySelector('.cancel_edit_message').classList.remove('block')
                    })

                    save_edit_message.addEventListener('click', () => {
                        document.querySelector('.window_edit_message').classList.remove('flex')
                        list_chat.classList.remove('none')
                        flex_content_chat_top_tools.classList.remove('none')

                        const formData = {
                            "message": input_edit_message.value
                        }

                        if (input_edit_message.value.length > 0) {
                            fetch(`/edit_message/${EventIdMessage.textContent}`, {
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

            document.querySelector('.cancel_edit_message').addEventListener('click', () => {
                document.querySelector('.list_chat').classList.remove('none')
                document.querySelector('.tools').classList.remove('none')
                document.querySelector('.border_name_chat').classList.remove('none')
                document.querySelector('.close_window_2').classList.remove('none')
                document.querySelector('.cancel_edit_message').classList.remove('block')
                document.querySelector('.height').classList.remove('none')
                document.querySelector('.window_edit_message').classList.remove('flex')
                document.querySelector('.close_window_2').classList.remove('none')
                document.querySelector('.IconOpenList').classList.remove('none')
                document.querySelector('.cancel_edit_message').classList.remove('block')
            })

            event.currentTarget.children[3].children[0].addEventListener('click', () => {
                console.log('delete message')
                let chatMessage  = {
                    IDMessage: EventIdMessage.textContent
                };

                stompClient.send("/app/chat.deleteMessage", {}, JSON.stringify(chatMessage));
            })

            let IdDeleteMessage = event.currentTarget.children[1]
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
                            window.location.reload()
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
        ErrorConnect.classList.remove('flex')
        UsernameP.appendChild(messageEventSender)
        PBlockTextOnline.appendChild(messageEventInvite)
        messageAreaNew.appendChild(messageElement);
        messageAreaNew.scrollMarginBottom = messageAreaNew.scrollHeight;
        // let EventInvite = document.querySelector('.event-message')
        // EventInvite.innerHTML+=`
        //     <div class="EventInvite">
        //         <p>${message.sender} онлайн</p>
        //     </div>
        // `
    }

    // else if (message.type === 'LEAVE') {
    //     messageElement.classList.add('event-message');
    //     ErrorConnect.classList.remove('flex')
    //     messageElement.appendChild(textElementLogOut)
    //     messageAreaNew.appendChild(messageElement);
    //     messageAreaNew.scrollMarginBottom = messageAreaNew.scrollHeight;
    //     let EventLogOut = document.querySelector('.EventLogOut')
    //     EventLogOut.innerHTML=`${message.sender} офлайн`
    // }

    else if (message.type === 'SEND') {
        ErrorConnect.classList.remove('flex')
    }

    else if (message.type === 'Whoops! Lost connection to http://localhost:8080/ws') {
        ErrorConnect.classList.add('flex')
    }

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

                    let GetMonth
                    let NewDateGetHours = new Date().getHours()

                    if (new Date().getMonth() +1 === 1) {
                        GetMonth = 'Январь'
                    }

                    else if (new Date().getMonth() +1 === 2) {
                        GetMonth = 'Февраль'
                    }

                    else if (new Date().getMonth() +1 === 3) {
                        GetMonth = 'Март'
                    }

                    else if (new Date().getMonth() +1 === 4) {
                        GetMonth = 'Апрель'
                    }

                    else if (new Date().getMonth() +1 === 5) {
                        GetMonth = 'Май'
                    }

                    else if (new Date().getMonth() +1 === 6) {
                        GetMonth = 'Июнь'
                    }

                    else if (new Date().getMonth() +1 === 7) {
                        GetMonth = 'Июль'
                    }

                    else if (new Date().getMonth() +1 === 8) {
                        GetMonth = 'Август'
                    }

                    else if (new Date().getMonth() +1 === 9) {
                        GetMonth = 'Сентябрь'
                    }

                    else if (new Date().getMonth() +1 === 10) {
                        GetMonth = 'Октябрь'
                    }

                    else if (new Date().getMonth() +1 === 11) {
                        GetMonth = 'Ноябрь'
                    }

                    else if (new Date().getMonth() +1 === 12) {
                        GetMonth = 'Декабрь'
                    }

                    else {
                        GetMonth = 'Какие-то проблемы с месяцем'
                    }

                    let GetSeconds

                    if (new Date().getSeconds() === 0) {
                        let NewDateGetSeconds = new Date().getMinutes()
                        if (NewDateGetSeconds.length > 1) {
                            GetSeconds = new Date().getSeconds()
                        }

                        else {
                            GetSeconds = new Date().getSeconds() + '0'
                        }
                    }

                    else if (new Date().getSeconds() === 1) {
                        let NewDateGetSeconds = new Date().getMinutes()
                        if (NewDateGetSeconds.length > 1) {
                            GetSeconds = new Date().getSeconds()
                        }

                        else {
                            GetSeconds = new Date().getSeconds() + '0'
                        }
                    }

                    else if (new Date().getSeconds() === 2) {
                        let NewDateGetSeconds = new Date().getMinutes()
                        if (NewDateGetSeconds.length > 1) {
                            GetSeconds = new Date().getSeconds()
                        }

                        else {
                            GetSeconds = new Date().getSeconds() + '0'
                        }
                    }

                    else if (new Date().getSeconds() === 3) {
                        let NewDateGetSeconds = new Date().getMinutes()
                        if (NewDateGetSeconds.length > 1) {
                            GetSeconds = new Date().getSeconds()
                        }

                        else {
                            GetSeconds = new Date().getSeconds() + '0'
                        }
                    }

                    else if (new Date().getSeconds() === 4) {
                        let NewDateGetSeconds = new Date().getMinutes()
                        if (NewDateGetSeconds.length > 1) {
                            GetSeconds = new Date().getSeconds()
                        }

                        else {
                            GetSeconds = new Date().getSeconds() + '0'
                        }
                    }

                    else if (new Date().getSeconds() === 5) {
                        let NewDateGetSeconds = new Date().getMinutes()
                        if (NewDateGetSeconds.length > 1) {
                            GetSeconds = new Date().getSeconds()
                        }

                        else {
                            GetSeconds = new Date().getSeconds() + '0'
                        }
                    }

                    else {
                        GetSeconds = new Date().getSeconds()
                    }

                    let GetMinutes

                    if (new Date().getMinutes() === 0) {
                        let NewDateGetMinutes = new Date().getMinutes()
                        if (NewDateGetMinutes.length > 1) {
                            GetMinutes = new Date().getMinutes()
                        }

                        else {
                            GetMinutes = new Date().getMinutes() + '0'
                        }
                    }

                    else if (new Date().getMinutes() === 1) {
                        let NewDateGetMinutes = new Date().getMinutes()
                        if (NewDateGetMinutes.length > 1) {
                            GetMinutes = new Date().getMinutes()
                        }

                        else {
                            GetMinutes = new Date().getMinutes() + '0'
                        }
                    }

                    else if (new Date().getMinutes() === 2) {
                        let NewDateGetMinutes = new Date().getMinutes()
                        if (NewDateGetMinutes.length > 1) {
                            GetMinutes = new Date().getMinutes()
                        }

                        else {
                            GetMinutes = new Date().getMinutes() + '0'
                        }
                    }

                    else if (new Date().getMinutes() === 3) {
                        let NewDateGetMinutes = new Date().getMinutes()
                        if (NewDateGetMinutes.length > 1) {
                            GetMinutes = new Date().getMinutes()
                        }

                        else {
                            GetMinutes = new Date().getMinutes() + '0'
                        }
                    }

                    else if (new Date().getMinutes() === 4) {
                        let NewDateGetMinutes = new Date().getMinutes()
                        if (NewDateGetMinutes.length > 1) {
                            GetMinutes = new Date().getMinutes()
                        }

                        else {
                            GetMinutes = new Date().getMinutes() + '0'
                        }
                    }

                    else if (new Date().getMinutes() === 5) {
                        let NewDateGetMinutes = new Date().getMinutes()

                        if (NewDateGetMinutes.length > 1) {
                            GetMinutes = new Date().getMinutes()
                        }

                        else {
                            GetMinutes = new Date().getMinutes() + '0'
                        }
                    }

                    else {
                        GetMinutes = new Date().getMinutes()
                    }

                    let GetHours

                    if (new Date().getHours() === 0) {
                        if (NewDateGetHours.length > 1) {
                            GetHours = new Date().getHours()
                        }

                        else {
                            GetHours = new Date().getHours() + '0'
                        }
                    }

                    else if (new Date().getHours() === 1) {
                        if (NewDateGetHours.length > 1) {
                            GetHours = new Date().getHours()
                        }

                        else {
                            GetHours = new Date().getHours() + '0'
                        }
                    }

                    else if (new Date().getHours() === 2) {
                        if (NewDateGetHours.length > 1) {
                            GetHours = new Date().getHours()
                        }

                        else {
                            GetHours = new Date().getHours() + '0'
                        }
                    }

                    else if (new Date().getHours() === 3) {
                        if (NewDateGetHours.length > 1) {
                            GetHours = new Date().getHours()
                        }

                        else {
                            GetHours = new Date().getHours() + '0'
                        }
                    }

                    else if (new Date().getHours() === 4) {
                        if (NewDateGetHours.length > 1) {
                            GetHours = new Date().getHours()
                        }

                        else {
                            GetHours = new Date().getHours() + '0'
                        }
                    }

                    else if (new Date().getHours() === 5) {
                        if (NewDateGetHours.length > 1) {
                            GetHours = new Date().getHours()
                        }

                        else {
                            GetHours = new Date().getHours() + '0'
                        }
                    }

                    else {
                        GetHours = new Date().getHours()
                    }

                    // let DateLong = new Date().getDate() + ' ' + GetMonth + ' ' + new Date().getFullYear() + 'г.' + GetHours + ':' + GetMinutes + ':' + GetSeconds
                    // let DateShort = GetHours + ':' + GetMinutes;

                    let DateLong = new Date().getDate() + ' ' + GetMonth + ' ' + new Date().getFullYear() + 'г.' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
                    let DateShort = new Date().getHours() + ':' + new Date().getMinutes();

                    let ErrorConnect = document.querySelector('.ErrorConnect')
                    ErrorConnect.classList.remove('flex')

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

                    for (let MessageItter of document.querySelectorAll('.message')) {
                        MessageItter.addEventListener('click', () => {
                            console.log(MessageItter)
                        })
                    }
                })
            })
    }
    event.preventDefault();
}

messageForm.addEventListener('submit', sendMessage, true)

function ErrorSocket() {
    fetch('/connect', {
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        method: 'GET'
    })
        .catch(() => ErrorConnect.classList.add('flex'))
        .then(res => res.json())
        .catch(() => console.log(`json isn't valid`))
        .then(data => (item => {
            console.log(item.ok)
            if (item === 'ok') {
                ErrorConnect.classList.remove('flex')
                console.log('connect to server is success')
            }
        }))
}

connect()
ErrorSocket()

document.addEventListener("visibilitychange", function(){
    if (document.hidden){
        console.log('Вкладка не активна');
        fetch(`/status/offline/${document.querySelector('.username').textContent}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),

            mode: "cors"
        })
            .then(res => console.log(res.json()))
            .then(data => console.log(data))
    }

    else {
        console.log('Вкладка активна');
        fetch(`/status/online/${document.querySelector('.username').textContent}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),

            mode: "cors"
        })
            .then(res => console.log(res.json()))
            .then(data => console.log(data))
    }
})

window.addEventListener("visibilitychange", function(){
    if (window.hidden){
        console.log('Окно не активно');
        fetch(`/status/offline/${document.querySelector('.username').textContent}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),

            mode: "cors"
        })
            .then(res => console.log(res.json()))
            .then(data => console.log(data))
    }

    // else {
    //     console.log('Окно активно');
    //     fetch(`/status/online/${document.querySelector('.username').textContent}`, {
    //         headers: new Headers({
    //             'Content-Type': 'application/json'
    //         }),
    //
    //         mode: "cors"
    //     })
    //         .then(res => console.log(res.json()))
    //         .then((data) => console.log(data))
    // }
})