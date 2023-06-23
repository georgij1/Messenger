let IdChat = document.querySelector('.IdChat')
let list_chat = document.querySelector('.list_chat')
let border_name_chat = document.querySelector('.border_name_chat')
let image_chat_open_settings = document.querySelector('.image_chat_open_settings')
let admin_chat = document.querySelector('.admin_chat')
let window_settings_chat = document.querySelector('.window_settings_chat')
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
    document.querySelector('.name_chat_min_window').classList.toggle('block')
    document.querySelector('.desc_chat_min_window').classList.toggle('block')
    document.querySelector('.ImageCount').classList.toggle('flex')
    document.querySelector('.ToolChat').classList.toggle('block')
    document.querySelector('.time_creator_info').classList.toggle('none')
})

document.querySelector('.ImageCount').addEventListener('click', () => {
    document.querySelector('.ListMessage').classList.remove('flex')
    document.querySelector('.ListMessage').classList.add('none')
    document.querySelector('.WindowStorageImage').classList.add('block')
    document.querySelector('.close_window_2').classList.add('none')
    document.querySelector('.close_window_storage_image').classList.add('block')

    fetch(`/files/${document.querySelector('.IdChat').textContent}`, {
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors"
    })
        .then(res => res.json())
        .then(data => data.forEach(item => {
            document.querySelector('.list_images').innerHTML+=`
                <div class="image_from_chat">
                    <img src="/files/${document.querySelector('.IdChat').textContent}/${item.id_image_message}" alt="a">                
                    <p class="ImagePath">/files/${document.querySelector('.IdChat').textContent}/${item.id_image_message}</p>
                </div>
            `

            for (let ListImagesItter of document.querySelectorAll('.image_from_chat')) {
                ListImagesItter.addEventListener('click', (event) => {
                    console.log(event.currentTarget.querySelector('.ImagePath').textContent)
                    window.open(`${event.currentTarget.querySelector('.ImagePath').textContent}`, '_self')
                })
            }
        }))
})

document.querySelector('.close_window_storage_image').addEventListener('click', () => {
    document.querySelector('.ListMessage').classList.add('flex')
    document.querySelector('.ListMessage').classList.remove('none')
    document.querySelector('.WindowStorageImage').classList.remove('block')
    document.querySelector('.close_window_2').classList.remove('none')
    document.querySelector('.close_window_storage_image').classList.remove('block')
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
            ImageChatChatItter.style.background=`url(/${item.image_chat}) no-repeat center`
            ImageChatChatItter.style.backgroundSize='90%'
            ImageChatChatItter.style.boxShadow='0 0 10px burlywood'
            ImageChatChatItter.style.borderRadius='100%'
        }

        for (let ChatItter of document.querySelectorAll('.Chat')) {
            ChatItter.addEventListener('click', (event) => {
                console.log(event.currentTarget)
                window.open(`/chat/${event.currentTarget.querySelector('.IdChat').textContent}/${document.querySelector('.username').textContent}/${event.currentTarget.querySelector('.NameChat').textContent}`, '_self')
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
            document.querySelector('.InfoMessage').innerHTML = `
                <div class="time_creator_info">Чат создан ${item.time_creator}</div>
            `

            border_name_chat.innerText = `${item.name}`

            document.querySelector('.title').innerText = `${item.name}`

            document.querySelector('.AboutChat').innerHTML += `
                <div class="name_chat_min_window">${item.name}</div>
                <div class="desc_chat_min_window">${item.desc_chat}</div>
            `

            if (document.querySelector('.username').textContent === item.owner) {
                document.querySelector('.BorderNameChat').innerHTML = `
                    <div class="NameChatItem">${item.name}</div>
                    <div class="edit_chat_name_item"></div>
                `

                document.querySelector('.BorderDescriptionChat').innerHTML = `
                    <div class="DescChatItem">${item.desc_chat}</div>
                    <div class="edit_desc_chat_item"></div>
                `
            }

            else {
                document.querySelector('.BorderNameChat').innerHTML = `
                    <div class="NameChatItem">${item.name}</div>
                `

                document.querySelector('.BorderDescriptionChat').innerHTML = `
                    <div class="DescChatItem">${item.desc_chat}</div>
                `
            }

            image_chat_open_settings.style.background = `url(/${item.image_chat}) no-repeat center`
            image_chat_open_settings.style.backgroundSize = '90%'
            image_chat_open_settings.style.boxShadow = '0 0 10px burlywood'
            image_chat_open_settings.style.borderRadius = '100%'

            document.querySelector('.BorderImageChat').style.background = `url(/${item.image_chat}) no-repeat center`
            document.querySelector('.BorderImageChat').style.backgroundSize = '100%'
            document.querySelector('.BorderImageChat').style.borderRadius = '100%'
            document.querySelector('.BorderImageChat').innerHTML = `<p class="ItemImageChat">${item.image_chat}</p>`

            document.querySelector('.BorderImageChat').addEventListener('click', (event) => {
                console.log(event.currentTarget.children[0].textContent)
            })

            admin_chat.innerHTML += `
                <div class="UserChat image_user_chat_admin" style="background: url(/${item.image_chat}) no-repeat; background-size: 71px;"></div>
                <div class="UserChat UserChatName">${item.owner}</div>
                <div class="admin_this">Админ</div>
            `

            console.log('username - ', document.querySelector('.username').textContent)
            console.log('UserChatName - ', document.querySelector('.UserChatName').textContent)

            new AdminPanel()

            for (let AdminChatItter of document.querySelectorAll('.admin_chat')) {
                AdminChatItter.addEventListener('click', (event) => {
                    console.log(event.currentTarget.children[1].textContent)
                    window.open(`/chat/AccountPage/${event.currentTarget.children[1].textContent}`, '_self')
                })
            }
        }))})

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

            console.log(item)

            if (item.id_image_message === "TextMessage" && item.read === false && item.username === document.querySelector('.username').textContent) {
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

            else if (item.id_image_message === "TextMessage" && item.read === false) {
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
                            
                            <div title="${item.time_stamp_long}" class="TimeStampShort">${item.time_stamp_short}</div>
                        </div>
                    </div>
                `
            }

            else if (item.id_image_message === "TextMessage" && item.read === true && item.username === document.querySelector('.username').textContent) {
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

            else if (item.id_image_message === "TextMessage" && item.read === true) {
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
                                <img class="ImageChat" src="/files/${IdChat.textContent}/${item.id_image_message}" alt="">
                                <div class="UrlImageChat">/files/${IdChat.textContent}/${item.id_image_message}</div>
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
                                    <img class="ImageChat" src="/files/${IdChat.textContent}/${item.id_image_message}" alt="">
                                    <div class="UrlImageChat">/files/${IdChat.textContent}/${item.id_image_message}</div>
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
                                    <img class="ImageChat" src="/files/${IdChat.textContent}/${item.id_image_message}" alt="">
                                    <div class="UrlImageChat">/files/${IdChat.textContent}/${item.id_image_message}</div>
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
                                    <img class="ImageChat" src="/files/${IdChat.textContent}/${item.id_image_message}" alt="">
                                    <div class="UrlImageChat">/files/${IdChat.textContent}/${item.id_image_message}</div>
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
                                    <img class="ImageChat" src="/files/${IdChat.textContent}/${item.id_image_message}" alt="">
                                    <div class="UrlImageChat">/files/${IdChat.textContent}/${item.id_image_message}</div>
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
                                    <img class="ImageChat" src="/files/${IdChat.textContent}/${item.id_image_message}" alt="">
                                    <div class="UrlImageChat">/files/${IdChat.textContent}/${item.id_image_message}</div>
                                </div>
                            
                                <div class="TextImage">${item.text}</div>
                                
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
                                <img class="ImageChat" src="/files/${IdChat.textContent}/${item.id_image_message}" alt="">
                                <div class="UrlImageChat">/files/${IdChat.textContent}/${item.id_image_message}</div>
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
                                <img class="ImageChat" src="/files/${IdChat.textContent}/${item.id_image_message}" alt="">
                                <div class="UrlImageChat">/files/${IdChat.textContent}/${item.id_image_message}</div>
                            </div>
                            
                            <div class="TextImage">${item.text}</div>
                            
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

                let visibleImageMessage = (target) => {
                    let targetPosition = {
                        top: window.pageYOffset + target.getBoundingClientRect().top,
                        left: window.pageXOffset + target.getBoundingClientRect().left,
                        right: window.pageXOffset + target.getBoundingClientRect().right,
                        bottom: window.pageYOffset + target.getBoundingClientRect().bottom
                    }

                    let getWindowPosition = {
                        top: window.pageYOffset,
                        left: window.pageXOffset,
                        right: window.pageXOffset + document.documentElement.clientWidth,
                        bottom: window.pageYOffset + document.documentElement.clientHeight
                    }

                    if (targetPosition.bottom > getWindowPosition.top && // Если позиция нижней части элемента больше позиции верхней чаcти окна, то элемент виден сверху
                        targetPosition.top < getWindowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чаcти окна, то элемент виден снизу
                        targetPosition.right > getWindowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
                        targetPosition.left < getWindowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чаcти окна, то элемент виден справа
                        // Если элемент полностью видно, то запускаем следующий код
                        // console.clear();
                        console.log(target.querySelector('.IdMessage').textContent);

                        console.log(target.querySelector('.ItemUsername').textContent)

                        console.log(target.querySelector('.ItemUsername').textContent === document.querySelector('.username').textContent)

                        if (target.querySelector('.ItemUsername').textContent === document.querySelector('.username').textContent) {
                            console.log('Вы владелец этого сообщения вы не можете его прочитать')
                        }

                        else {
                            console.log('fetch as read image message')
                            fetch(`/chat/read/${target.querySelector('.IdMessage').textContent}`, {
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                mode: "cors",
                                method: 'POST'
                            })
                                .then(res => res.json())
                                .then(data => data.forEach(item => {
                                    console.log(item)
                                }))
                        }
                    }

                    else {
                        // Если элемент не видно, то запускаем этот код
                        // console.clear();
                        console.log('Элемент не видно')
                    }
                }

                visibleImageMessage(ImageBorderItter)

                window.addEventListener('scroll', () => {
                    visibleImageMessage(ImageBorderItter)
                })
            }

            for (let ImageChatItter of ImageChat) {
                ImageChatItter.addEventListener('click', (event) => {
                    window.open(event.currentTarget.children[1].textContent, '_self')
                })
            }

            for (let ImageProfileMessageItter of document.querySelectorAll('.ImageProfileMessage')) {
                ImageProfileMessageItter.addEventListener('click', (event) => {
                    window.open(`/chat/AccountPage/${event.currentTarget.children[0].textContent}`, '_self')
                })
            }

            for (let message of document.querySelectorAll('.message')) {
                console.log(message)

                let visibleTextMessage = (target) => {
                    let targetPosition = {
                        top: window.pageYOffset + target.getBoundingClientRect().top,
                        left: window.pageXOffset + target.getBoundingClientRect().left,
                        right: window.pageXOffset + target.getBoundingClientRect().right,
                        bottom: window.pageYOffset + target.getBoundingClientRect().bottom
                    }

                    let getWindowPosition = {
                        top: window.pageYOffset,
                        left: window.pageXOffset,
                        right: window.pageXOffset + document.documentElement.clientWidth,
                        bottom: window.pageYOffset + document.documentElement.clientHeight
                    }

                    if (targetPosition.bottom > getWindowPosition.top && // Если позиция нижней части элемента больше позиции верхней чаcти окна, то элемент виден сверху
                        targetPosition.top < getWindowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чаcти окна, то элемент виден снизу
                        targetPosition.right > getWindowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
                        targetPosition.left < getWindowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чаcти окна, то элемент виден справа
                        // Если элемент полностью видно, то запускаем следующий код
                        // console.clear();
                        console.log(target.querySelector('.id').textContent);

                        if (target.querySelector('.ItemUsername').textContent === document.querySelector('.username').textContent) {
                            console.log('Вы владелец этого сообщения вы не можете его прочитать')
                        }

                        else {
                            fetch(`/chat/read/${target.querySelector('.id').textContent}`, {
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                mode: "cors",
                                method: 'POST'
                            })
                                .then(res => res.json())
                                .then(data => data.forEach(item => {
                                    console.log(item)
                                }))
                        }
                    }

                    else {
                        // Если элемент не видно, то запускаем этот код
                        // console.clear();
                        console.log('Мы не видим элемент')
                    }
                }

                window.addEventListener('scroll', function() {
                    visibleTextMessage(message)
                });

                window.addEventListener('scrollend', function() {
                    console.log('end scroll')
                });

                visibleTextMessage(message)

                message.addEventListener('click', (event) => {
                    message.classList.toggle('message_click')

                    console.log(message)

                    event.currentTarget.children[3].classList.toggle('flex')
                    event.currentTarget.children[4].classList.toggle('flex')

                    let EventIDMessage = event.currentTarget.children[1]
                    let EventText = event.currentTarget.children[2]
                    let EventTimeStamp = event.currentTarget.querySelector('.TimeStampShort')

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

                            document.querySelector('.time_creator_info').classList.add('none')

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
                                document.querySelector('.time_creator_info').classList.remove('none')
                            })

                            save_edit_message.addEventListener('click', () => {
                                console.log('save edit click')
                                window_edit_message.classList.remove('flex')
                                list_chat.classList.remove('none')
                                flex_content_chat_top_tools.classList.remove('none')
                                document.querySelector('.time_creator_info').classList.add('none')

                                let MonthString
                                let MonthInt = new Date().getMonth() + 1

                                if (MonthInt === 1) {
                                    MonthString = 'Января'
                                    console.log('Января')
                                }

                                else if (MonthInt === 2) {
                                    MonthString = 'Февраля'
                                    console.log('Февраля')
                                }

                                else if (MonthInt === 3) {
                                    MonthString = 'Марта'
                                    console.log('Марта')
                                }

                                else if (MonthInt === 4) {
                                    MonthString = 'Апреля'
                                    console.log('Апреля')
                                }

                                else if (MonthInt === 5) {
                                    MonthString = 'Мая'
                                    console.log('Мая')
                                }

                                else if (MonthInt === 6) {
                                    MonthString = 'Июня'
                                    console.log('Июня')
                                }

                                else if (MonthInt === 7) {
                                    MonthString = 'Июля'
                                    console.log('Июля')
                                }

                                else if (MonthInt === 8) {
                                    MonthString = 'Августа'
                                    console.log('Августа')
                                }

                                else if (MonthInt === 9) {
                                    MonthString = 'Сентября'
                                    console.log('Сентября')
                                }

                                else if (MonthInt === 10) {
                                    MonthString = 'Октября'
                                    console.log('Октября')
                                }

                                else if (MonthInt === 11) {
                                    MonthString = 'Ноября'
                                    console.log('Ноября')
                                }

                                else if (MonthInt === 12) {
                                    MonthString = 'Декабря'
                                    console.log('Декабря')
                                }

                                let DateLong = new Date().getDate() + ' ' + MonthString + ' ' + new Date().getFullYear() + 'г.' + ' ' + new Date().getHours() + ':' + new Date().getMinutes()+ ':' + new Date().getSeconds()
                                let DateShort = new Date().getHours() + ':' + new Date().getMinutes()

                                const formData = {
                                    "message": input_edit_message.value,
                                    "time_stamp_short": DateShort,
                                    "time_stamp_long": DateLong
                                }

                                if (input_edit_message.value.length > 0 && input_edit_message.value !== item.text) {
                                    console.log('if on check length of input')
                                    fetch(`/edit_message/${EventIDMessage.textContent}`, {
                                        method: 'POST',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(formData)
                                    })
                                        .then(() => {
                                            console.log('edit is running')
                                            document.querySelector('.cancel_edit_message').classList.remove('block')
                                            document.querySelector('.tools').classList.remove('none')
                                            document.querySelector('.time_creator_info').classList.remove('none')

                                            window_edit_message.classList.remove('flex')
                                            list_chat.classList.remove('none')
                                            flex_content_chat_top_tools.classList.remove('none')
                                            height.classList.remove('none')
                                            tools.classList.remove('none')
                                            document.querySelector('.close_window_2').classList.remove('none')
                                            EventText.textContent = formData.message
                                            EventTimeStamp.textContent = new Date().getHours() + ':' + new Date().getMinutes()
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
                console.log('click on text message')
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
                if (item.id_image === 'DefaultAva') {
                    console.log('if is running')
                    ImageProfileMessageItter.style.background=`url(/image/settings/icon_profile.png)` + 'no-repeat center'
                    ImageProfileMessageItter.style.backgroundSize='40px'
                }

                else {
                    console.log('else')
                    ImageProfileMessageItter.style.background=`url(/AvatarImage/${document.querySelector('.ItemUsername').textContent}/${item.id_image})` + 'no-repeat center'
                    ImageProfileMessageItter.style.backgroundSize='40px'
                }
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
    document.querySelector('.time_creator_info').classList.add('none')
    document.querySelector('.ListMessage').classList.remove('flex')
    document.querySelector('.ListMessage').classList.add('none')
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
                        <img class="link_image" src="/files/${IdChat.textContent}/${item.id_image_message}" alt="Фото из чата" title="${item.text}">                    
                        <div class="FilePathText">/files/${IdChat.textContent}/${item.id_image_message}</div>
                    </div>
                `
            }

            else {
                ListUploadedImage.innerHTML+=`
                    <div class="Border">
                        <img class="link_image" src="/files/${IdChat.textContent}/${item.id_image_message}" alt="Фото из чата" title="${item.text}">
                        <div class="FilePathText">/files/${IdChat.textContent}/${item.id_image_message}</div>
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

        document.querySelector('.LabelFileInput').classList.add('none')
        document.querySelector('.CountFilesChatBorder').classList.add('flex')
        document.querySelector('.PlaceHolderBlock').classList.add('flex')
        document.querySelector('.BtnSendFile').classList.add('block')

        console.log(FilesItter)
        NameFile.innerHTML=`${FilesItter.name}`

        let CountMB = FilesItter.size/1024/1024

        console.log(Math.fround(CountMB))
        console.log(CountMB)

        if (Math.fround(CountMB) > 3) {
            SizeFile.innerHTML=`Размер файла слишком большой`
            document.querySelector('.WarningSizeFile').classList.add('block')
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
    document.querySelector('.time_creator_info').classList.remove('none')
    document.querySelector('.close_window').classList.remove('none')
    document.querySelector('.IconOpenList').classList.remove('none')
    window_add_file.classList.remove('flex')
    list_chat.classList.remove('none')
    flex_content_chat_top_tools.classList.remove('none')
    height.classList.remove('none')
    tools.classList.remove('none')
    document.querySelector('.ListMessage').classList.remove('none')
})

let users = [];

document.querySelector('.flex_content_chat_top_tools').addEventListener('click', () => {
    document.querySelector('.time_creator_info').classList.add('none')
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

        console.log(document.querySelector('.BtnEditNameChat'))
        console.log(document.querySelector('.BtnEditDescChat'))

        document.querySelector('.BtnEditNameChat').innerHTML=`
            <div class="ChangeNameChat">Изменить название чата</div>
        `

        document.querySelector('.BtnEditDescChat').innerHTML=`
            <div class="ChangeDescChat">Изменить описание чата</div>
        `

        document.querySelector('.ChangeDescChat').addEventListener('click', () => {
            console.log('open window edit desc chat')

            document.querySelector('.window_change_desc_chat').classList.add('flex')

            document.querySelector('.window_change_desc_chat').innerHTML+=`
                <input type="text" class="InputChangeName" placeholder="Введите новое название чата" value="${document.querySelector('.BorderDescriptionChat').textContent}">
                
                <div class="tools_edit_name_chat">
                    <input type="button" class="InputBtnSaveChangeNameChat" value="Сохранить">                
                    <div class="close_edit_name_chat"></div>
                </div>
            `

            document.querySelector('.close_edit_name_chat').addEventListener('click', () => {
                window.location.reload()
            })

            document.querySelector('.InputBtnSaveChangeNameChat').addEventListener('click', () => {
                console.log('saved change of desc chat')

                console.log(document.querySelector('.InputChangeName').value)

                let formData = {
                    "NewNameDescChat": document.querySelector('.InputChangeName').value
                }

                let id = document.querySelector('.IdChat').textContent

                fetch(`/EditDescChat/${id}`,  {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                    .then(() => {console.log(formData)})
                    .then(() => {
                        document.querySelector('.status_change_desc_chat').classList.add('block')
                        document.querySelector('.status_change_desc_chat').innerHTML+=`
                            <div class="title_status">Имя чата изменено</div>
                        `
                        setTimeout(function () {
                            document.querySelector('.status_change_desc_chat').classList.remove('block')
                            document.querySelector('.status_change_desc_chat').removeChild(document.querySelector('.title_status'))
                            document.querySelector('.window_change_desc_chat').classList.remove('flex')
                        }, 1000)

                        document.querySelector('.BorderDescriptionChat').textContent=`${formData.NewNameDescChat}`
                    })
            })
        })

        document.querySelector('.edit_desc_chat_item').addEventListener('click', () => {
            document.querySelector('.close_window_3').classList.add('none')
            document.querySelector('.image_settings_open').classList.add('none')
            document.querySelector('.ListUsersChat').classList.add('none')
            document.querySelector('.list_link_chat').classList.add('none')
            document.querySelector('.text_in_edit').classList.add('block')

            console.log('open window edit desc chat')

            document.querySelector('.window_change_desc_chat').classList.add('flex')

            document.querySelector('.window_change_desc_chat').innerHTML+=`
                <input type="text" class="InputChangeName" placeholder="Введите новое описание чата" value="${document.querySelector('.DescChatItem').textContent}">
                
                <div class="tools_edit_name_chat">
                    <input type="button" class="InputBtnSaveChangeNameChat" value="Сохранить">                
                    <div class="close_edit_name_chat"></div>
                </div>
            `

            document.querySelector('.close_edit_name_chat').addEventListener('click', () => {
               window.location.reload()
            })

            document.querySelector('.InputBtnSaveChangeNameChat').addEventListener('click', () => {
                console.log('saved change of desc chat')
                console.log(document.querySelector('.InputChangeName').value)

                let formData = {
                    "NewNameDescChat": document.querySelector('.InputChangeName').value
                }

                let id = document.querySelector('.IdChat').textContent

                fetch(`/EditDescChat/${id}`,  {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                    .then(() => {console.log(formData)})
                    .then(() => {
                        document.querySelector('.status_change_desc_chat').classList.add('block')
                        document.querySelector('.status_change_desc_chat').innerHTML+=`
                            <div class="title_status">Имя чата изменено</div>
                        `
                        setTimeout(function () {
                            document.querySelector('.status_change_desc_chat').classList.remove('block')
                            document.querySelector('.window_change_desc_chat').classList.remove('flex')
                        }, 1000)

                        document.querySelector('.DescChatItem').textContent=`${formData.NewNameDescChat}`
                        document.querySelector('.desc_chat_min_window').textContent=`${formData.NewNameDescChat}`
                    })
            })
        })

        document.querySelector('.ChangeNameChat').addEventListener('click', () => {
            console.log('open window edit chat name')

            document.querySelector('.window_change_chat_name').classList.add('flex')

            document.querySelector('.window_change_chat_name').innerHTML+=`
                <input type="text" class="InputChangeName" placeholder="Введите новое название чата" value="${document.querySelector('.BorderNameChat').textContent}">
                
                <div class="tools_edit_name_chat">
                    <input type="button" class="InputBtnSaveChangeNameChat" value="Сохранить">                
                    <div class="close_edit_name_chat"></div>
                </div>
            `

            document.querySelector('.close_edit_name_chat').addEventListener('click', () => {
                window.location.reload()
            })

            document.querySelector('.InputBtnSaveChangeNameChat').addEventListener('click', () => {
                console.log('save changed name chat')

                let formData = {
                    "NewNameChat": document.querySelector('.InputChangeName').value
                }

                let id = document.querySelector('.IdChat').textContent

                fetch(`/EditNameChat/${id}`,  {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                    .then(() => {console.log(formData)})
                    .then(() => {
                        document.querySelector('.status_change_name_chat').classList.add('block')
                        document.querySelector('.status_change_name_chat').innerHTML+=`
                            <div class="title_status">Имя чата изменено</div>
                        `
                        setTimeout(function () {
                            document.querySelector('.status_change_name_chat').classList.remove('block')
                            document.querySelector('.window_change_chat_name').classList.remove('flex')
                        }, 1000)

                        document.querySelector('.BorderNameChat').textContent=`${formData.NewNameChat}`
                    })
            })
        })

        document.querySelector('.edit_chat_name_item').addEventListener('click', () => {
            document.querySelector('.AdminPanel').classList.add('none')

            document.querySelector('.close_window_3').classList.add('none')

            document.querySelector('.image_settings_open').classList.add('none')

            document.querySelector('.ListUsersChat').classList.add('none')

            document.querySelector('.list_link_chat').classList.add('none')

            document.querySelector('.text_in_edit').classList.add('block')

            console.log('open window edit chat name')

            document.querySelector('.window_change_chat_name').classList.add('flex')

            document.querySelector('.window_change_chat_name').innerHTML+=`
                <input type="text" class="InputChangeName" placeholder="Введите новое название чата" value="${document.querySelector('.NameChatItem').textContent}">
                
                <div class="tools_edit_name_chat">
                    <input type="button" class="InputBtnSaveChangeNameChat" value="Сохранить">                
                    <div class="close_edit_name_chat"></div>
                </div>
            `

            document.querySelector('.close_edit_name_chat').addEventListener('click', () => {
                window.location.reload()
            })

            document.querySelector('.InputBtnSaveChangeNameChat').addEventListener('click', () => {
                console.log('save changed name chat')

                let formData = {
                    "NewNameChat": document.querySelector('.InputChangeName').value
                }

                let id = document.querySelector('.IdChat').textContent

                fetch(`/EditNameChat/${id}`,  {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                    .then(res => {
                        if (res.status === 200) {
                            document.querySelector('.success_update_name_chat').classList.add('block')

                            setTimeout(() => {
                                document.querySelector('.window_change_chat_name').classList.remove('flex')
                                document.querySelector('.success_update_name_chat').classList.add('block')
                            }, 1000)

                            window.open('/websocket_chat', '_self')
                        }

                        else if (res.status === 400) {
                            console.log('this name chat is exist')
                            document.querySelector('.chat_name_exist').classList.add('block')

                            setTimeout(() => {
                                document.querySelector('.chat_name_exist').classList.remove('block')
                            }, 1000)
                        }

                        else {
                            console.log('we had error with edit by name chat')
                            document.querySelector('.problem_update_name_chat').classList.add('block')

                            setTimeout(() => {
                                document.querySelector('.problem_update_name_chat').classList.remove('block')
                            }, 1000)
                        }
                    })
            })
        })

        document.querySelector('.tools_add_user').innerHTML+=`
            <div class="AddUsersBtn">
                <div class="image_add_user"></div>
            </div>
            
            <div class="EditChatUser">
                <div class="image_delete_user"></div>
            </div>
        `

        ToolsAdmin.innerHTML+=`           
            <div class="DeleteChatFlex">
                <div class="image_delete_chat"></div>
                <div class="DeleteChat">Удалить чат</div>
            </div>
        `
    }

    else {
        console.log('else')
        ToolsAdmin.classList.add('flex')
        ToolsAdmin.innerHTML+=`
            <div class="LogOutChat">Покинуть чат</div>
        `
    }

    if (document.querySelector('.LogOutChat') === null) {
        console.log('you are admin')
    }

    else {
        document.querySelector('.LogOutChat').addEventListener('click', () => {
            console.log('this user logout - ', document.querySelector('.username').textContent)
            console.log('this chat - ', document.querySelector('.NameChatItem').textContent)
            fetch(`/DeleteUser/${document.querySelector('.username').textContent}/${document.querySelector('.NameChatItem').textContent}`, {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                mode: "cors",
                method: 'DELETE'
            })
                .then((res) => console.log(res))
                .then(() => window.open('/websocket_chat', '_self'))
        })
    }

    if (document.querySelector('.DeleteChat') === null) {
        console.log('you are not admin')
    }

    else {
        document.querySelector('.DeleteChat').addEventListener('click', () => {
            console.log('click on delete chat')
            fetch(`/delete_chat/${document.querySelector('.IdChat').textContent}/${document.querySelector('.IdChat').textContent}`, {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                mode: "cors",
                method: 'DELETE'
            })
                .then((res) => console.log(res))
                .then(() => window.location.reload())
        })
    }

    let WindowAddUsers = document.querySelector('.WindowAddUsers')
    let WindowEditListUser = document.querySelector('.WindowEditListUser')
    let CloseWindow4 = document.querySelector('.close_window_4')
    let CloseWindow5 = document.querySelector('.close_window_5')

    if (document.querySelector('.AddUsersBtn') === null) {
        console.log('you are not admin')
    }

    else {
        document.querySelector('.AddUsersBtn').addEventListener('click', () => {
            document.querySelector('.ListUsersChat').classList.add('none')
            document.querySelector('.list_link_chat').classList.add('none')
            CloseWindow4.classList.add('block')
            window_settings_chat.classList.add('none')
            WindowAddUsers.classList.add('block')
            document.querySelector('.image_settings_open').classList.add('none')
            document.querySelector('.admin_chat').classList.add('none')
            document.querySelector('.ListUsersChat').classList.add('none')
            document.querySelector('.close_window_3').classList.add('none')
            document.querySelector('.list_link_chat').classList.add('none')
        })
    }

    if (document.querySelector('.EditChatUser') === null) {
        console.log('you are not admin')
    }

    else {
        document.querySelector('.EditChatUser').addEventListener('click', () => {
            CloseWindow5.classList.add('block')
            WindowEditListUser.classList.add('block')
            window_settings_chat.classList.add('none')
            document.querySelector('.close_window_3').classList.add('none')
            document.querySelector('.image_settings_open').classList.add('none')
            document.querySelector('.admin_chat').classList.add('none')
            document.querySelector('.ListUsersChat').classList.add('none')
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
                                <div class="user_delete" id="user">
                                    <div class="id">${item.id}</div>
                                    <div class="user_image" style="background: url(${item.image_user}) no-repeat; background-size: 71px; height: 60px; width: 70px"><p>${item.image}</p></div>
                                    <div class="name">${item.name}</div>
                                    <div class="DeleteBtn"></div>
                                </div>
                            </div>
                        `
                    }

                    for (let DeleteBtnItter of document.querySelectorAll('.DeleteBtn')) {
                        DeleteBtnItter.addEventListener('click', (event) => {
                            console.log("DeleteBtn - ", event.currentTarget)
                            for (let Username of document.querySelectorAll('.Username')) {
                                Username.addEventListener('click', (event) => {
                                    console.log("UserName - ", event.currentTarget)

                                    console.log(event.currentTarget.querySelector('.user_delete').querySelector('.name'))

                                    let FormDeleteUser = {
                                        "username": event.currentTarget.querySelector('.user_delete').querySelector('.name').textContent,
                                        "chat_name": document.querySelector('.border_name_chat').textContent
                                    }

                                    console.log(FormDeleteUser)

                                    fetch('/DeleteUser/chat', {
                                        headers: new Headers({
                                            'Content-Type': 'application/json'
                                        }),
                                        mode: "cors",
                                        method: 'delete',
                                        body: JSON.stringify(FormDeleteUser)
                                    })
                                        .then(res => {
                                            console.log(res.status)

                                            if (res.status === 200) {
                                                console.log('success delete this user')

                                                document.querySelector('.user_delete_chat').classList.add('block')
                                                Username.querySelector('.user_delete').classList.add('delete_this')

                                                setTimeout(() => {
                                                    document.querySelector('.user_delete_chat').classList.remove('block')
                                                }, 1000)
                                            }

                                            else if (res.status === 400) {
                                                console.log('user is not exists in chat before delete')
                                                document.querySelector('.user_not_exist_chat').classList.add('block')

                                                setTimeout(() => {
                                                    document.querySelector('.user_not_exist_chat').classList.remove('block')
                                                }, 1000)
                                            }

                                            else {
                                                console.log('we had another problems')
                                                document.querySelector('.problem_delete_user').classList.add('block')

                                                setTimeout(() => {
                                                    document.querySelector('.problem_delete_user').classList.remove('block')
                                                }, 1000)
                                            }
                                        })
                                })
                            }
                        })
                    }
                })})
        })
    }

    CloseWindow4.addEventListener('click', () => {
        window.location.reload()
    })

    CloseWindow5.addEventListener('click', () => {
        window.location.reload()
    })
})

close_window_3.addEventListener('click', () => {
    window.location.reload()
})

document.querySelector('.close_window_4_panel').addEventListener('click', () => {
    window.location.reload()
})

send_message.addEventListener('click', () => {
    if (input_message.value.length === 0) {
        input_message.classList.add('red')
    }

    else if (input_message.value.length > 0) {
        input_message.classList.remove('red')
    }

    else {
        input_message.classList.add('red')
    }

    input_message.addEventListener('input', () => {
        if (input_message.value.length === 0) {
            input_message.classList.add('red')
        }

        else if (input_message.value.length > 0) {
            input_message.classList.remove('red')
        }

        else {
            input_message.classList.add('red')
        }
    })
})

document.querySelector('.list_link_chat').innerHTML=`
    <div class="LinkChat">
        <p class="TextLink">${document.location.href}</p>
    </div>
    
    <div class="CopyBtnChat">Скопировать ссылку на чат</div>
`

document.querySelector('.TextLink').addEventListener('click', () => {
    if (document.querySelector('.TextLink').textContent === document.location.href) {
        document.querySelector('.MessageInfo').classList.add('block')
        setTimeout(function () {
            document.querySelector('.MessageInfo').classList.remove('block')
        }, 1000)
    }

    else {
        window.open(`${document.location.href}`)
    }
})

document.querySelector('.CopyBtnChat').addEventListener('click', () => {
    function copyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.className = 'textArea'

        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            // const msg = successful ? 'Успешно' : 'Не успешно';
            document.querySelector('.MessageInfoCopyText').classList.add('block')

            if (successful === true) {
                document.querySelector('.StatusCopy').innerText+=`Скопировано`
            }

            else {
                document.querySelector('.StatusCopy').innerText+=`При копировании произошла ошибка`
            }

            setTimeout(function () {
                document.querySelector('.MessageInfoCopyText').classList.remove('block')
                document.querySelector('.StatusCopy').textContent=''
            }, 1000)
        }

        catch (err) {
            console.log(err)
            document.querySelector('.MessageWarningCopyText').classList.add('block')
            document.querySelector('.StatusCopyWarning').innerText+=`Что-то пошло не так`

            setTimeout(function () {
                document.querySelector('.MessageWarningCopyText').classList.remove('block')
                document.querySelector('.StatusCopyWarning').remove()
            }, 1000)
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

        stompClient.connect({}, onConnected, new ErrorSocket());

        ErrorConnect.classList.remove('flex')
    }
}

function onConnected() {
    stompClient.subscribe('/topic/public', onMessageReceived);

    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    )

    let name_chat = {
        NameChat: document.querySelector('.NameChatItem').textContent
    }

    stompClient.send("/app/statusUser", {}, JSON.stringify(name_chat))
}

function onMessageReceived(payload) {

    let message = JSON.parse(payload.body);
    console.log(JSON.parse(payload.body))
    console.log(document.querySelector('.UsersChat'))

    if (JSON.parse(payload.body).list_ONOFLineUser) {
        for (let status_user of JSON.parse(payload.body).list_ONOFLineUser) {
            console.log(status_user.status)

            if (status_user.status === 'Не в сети') {
                document.querySelector('.UsersChat').innerHTML+=`
                    <div class="User">
                        <div class="ImageUser">
                            <div class="ImageProfile" style="background: url(${status_user.image_user}) no-repeat center; background-size: 71px;"><p>${status_user.image_user}</p></div>                                    
                            <div class="NotInLife"></div>
                        </div>
                    
                        <div class="UseName">${status_user.name}</div>
                    </div>
                `

                document.querySelector('.list_users_open_settings').innerHTML+=`
                        <div class="User">
                            <div class="ImageUser">
                                <div class="ImageProfile" style="background: url(${status_user.image_user}) no-repeat center; background-size: 71px;"><p>${status_user.image_user}</p></div>                                    
                                <div class="NotInLife"></div>
                            </div>
                    
                            <div class="UseName">${status_user.name}</div>
                        </div>
                `
            }

            else if (status_user.status === 'В сети') {
                document.querySelector('.UsersChat').innerHTML+=`
                    <div class="User">
                        <div class="ImageUser">
                            <div class="ImageProfile" style="background: url(${status_user.image_user}) no-repeat center; background-size: 71px;"><p>${status_user.image_user}</p></div>                                    
                            <div class="InLife"></div>
                        </div>
                        
                        <div class="UseName">${status_user.name}</div>
                    </div>
                `

                document.querySelector('.list_users_open_settings').innerHTML+=`
                    <div class="User">
                        <div class="ImageUser">
                            <div class="ImageProfile" style="background: url(${status_user.image_user}) no-repeat center; background-size: 71px;"><p>${status_user.image_user}</p></div>                                    
                            <div class="InLife"></div>
                        </div>
                        
                        <div class="UseName">${status_user.name}</div>
                    </div>
                `
            }

            console.log(status_user.status)

            for (let user_div of document.querySelectorAll('.User')) {
                user_div.addEventListener('click', (event) => {
                    window.open(`/chat/AccountPage/${event.currentTarget.querySelector('.UseName').textContent}`, '_self')
                })
            }
        }
    }

    else {
        console.log('list_ONOFLineUser')
    }

    if (JSON.parse(payload.body).content !== null
        &&
        JSON.parse(payload.body).content !== undefined
    ) {
        if (JSON.parse(payload.body).getMessage === "true") {
            list_chat.innerHTML += `
        <div class="MessageMain">
            <div class="ImageProfileMessage1"><p>${JSON.parse(payload.body).sender}</p></div>
                <div class="message">
                    <div class="ItemUsername">${JSON.parse(payload.body).sender}</div>
                    
                    <div class="id">${JSON.parse(payload.body).idmessage}</div>
                    
                    <div class="text">${JSON.parse(payload.body).content}</div>
                    
                    <div class="tools_message">
                        <div class="delete_message"></div>
                        <div class="edit_message"></div>
                        <div class="share_message"></div>
                    </div>
                        
                    <div class="BlockTicketTimeStamp">                        
                        <div title="${JSON.parse(payload.body).TimeStampLong}" class="TimeStampShort">${JSON.parse(payload.body).TimeStampShort}</div>
                        <div class="TickAsRead"></div>
                    </div>
            </div>
        </div>
        `
        }

        else {
            list_chat.innerHTML += `
        <div class="MessageMain">
            <div class="ImageProfileMessage1"><p>${JSON.parse(payload.body).sender}</p></div>
                <div class="message">
                    <div class="ItemUsername">${JSON.parse(payload.body).sender}</div>
                    
                    <div class="id">${JSON.parse(payload.body).idmessage}</div>
                    
                    <div class="text">${JSON.parse(payload.body).content}</div>
                    
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

        for (let MessageItter of document.querySelectorAll('.message')) {
            MessageItter.addEventListener('click', (event) => {
                console.log(MessageItter.querySelector('.tools_message').classList.toggle('flex'))

                let Text = event.currentTarget.querySelector('.text')

                let EventIdMessage = event.currentTarget.querySelector('.id')

                event.currentTarget.querySelector('.tools_message').classList.toggle('flex')

                console.log(event.currentTarget)
                console.log(event.currentTarget.querySelector('.tools_message').classList.toggle('flex'))
                console.log(event.currentTarget.querySelector('.tools_message'))

                for (let ShareMessageItter of document.querySelectorAll('.share_message')) {
                    ShareMessageItter.addEventListener('click', () => {
                        console.log(Text)
                        window.open(`/share/TextMessage/${Text.textContent}`, '_self')
                    })
                }

                let IdDeleteMessage = event.currentTarget.querySelector('.id')
                let delete_message = document.querySelectorAll('.delete_message')
                let EventText = event.currentTarget.querySelector('.text')
                let EventTimeStamp = event.currentTarget.querySelector('.TimeStampShort')

                console.log(IdDeleteMessage)

                for (let edit_message_itter of document.querySelectorAll('.edit_message')) {
                    edit_message_itter.addEventListener('click', () => {
                        document.querySelector('.close_window_2').classList.add('none')
                        document.querySelector('.IconOpenList').classList.add('none')
                        height.classList.add('none')
                        list_chat.classList.add('none')
                        flex_content_chat_top_tools.classList.add('none')
                        document.querySelector('.window_edit_message').classList.add('flex')
                        document.querySelector('.cancel_edit_message').classList.add('block')
                        tools.classList.add('none')

                        document.querySelector('.time_creator_info').classList.add('none')

                        document.querySelector('.window_edit_message').innerHTML=`
                            <textarea class="input_edit_message" name="message">${EventText.textContent}</textarea>
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
                            document.querySelector('.time_creator_info').classList.remove('none')
                        })

                        save_edit_message.addEventListener('click', () => {
                            console.log('save edit click')
                            document.querySelector('.window_edit_message').classList.remove('flex')
                            list_chat.classList.remove('none')
                            flex_content_chat_top_tools.classList.remove('none')
                            document.querySelector('.time_creator_info').classList.add('none')

                            let MonthString
                            let MonthInt = new Date().getMonth() + 1

                            if (MonthInt === 1) {
                                MonthString = 'Января'
                                console.log('Января')
                            }

                            else if (MonthInt === 2) {
                                MonthString = 'Февраля'
                                console.log('Февраля')
                            }

                            else if (MonthInt === 3) {
                                MonthString = 'Марта'
                                console.log('Марта')
                            }

                            else if (MonthInt === 4) {
                                MonthString = 'Апреля'
                                console.log('Апреля')
                            }

                            else if (MonthInt === 5) {
                                MonthString = 'Мая'
                                console.log('Мая')
                            }

                            else if (MonthInt === 6) {
                                MonthString = 'Июня'
                                console.log('Июня')
                            }

                            else if (MonthInt === 7) {
                                MonthString = 'Июля'
                                console.log('Июля')
                            }

                            else if (MonthInt === 8) {
                                MonthString = 'Августа'
                                console.log('Августа')
                            }

                            else if (MonthInt === 9) {
                                MonthString = 'Сентября'
                                console.log('Сентября')
                            }

                            else if (MonthInt === 10) {
                                MonthString = 'Октября'
                                console.log('Октября')
                            }

                            else if (MonthInt === 11) {
                                MonthString = 'Ноября'
                                console.log('Ноября')
                            }

                            else if (MonthInt === 12) {
                                MonthString = 'Декабря'
                                console.log('Декабря')
                            }

                            let DateLong = new Date().getDate() + ' ' + MonthString + ' ' + new Date().getFullYear() + 'г.' + ' ' + new Date().getHours() + ':' + new Date().getMinutes()+ ':' + new Date().getSeconds()
                            let DateShort = new Date().getHours() + ':' + new Date().getMinutes()

                            const formData = {
                                "message": input_edit_message.value,
                                "time_stamp_short": DateShort,
                                "time_stamp_long": DateLong
                            }

                            if (input_edit_message.value.length > 0) {
                                console.log('if on check length of input')
                                fetch(`/edit_message/${EventIdMessage.textContent}`, {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(formData)
                                })
                                    .then(() => {
                                        console.log('edit is running')
                                        document.querySelector('.cancel_edit_message').classList.remove('block')
                                        document.querySelector('.tools').classList.remove('none')
                                        document.querySelector('.time_creator_info').classList.remove('none')

                                        document.querySelector('.window_edit_message').classList.remove('flex')
                                        list_chat.classList.remove('none')
                                        flex_content_chat_top_tools.classList.remove('none')
                                        height.classList.remove('none')
                                        tools.classList.remove('none')
                                        document.querySelector('.close_window_2').classList.remove('none')
                                        EventText.textContent = formData.message
                                        EventTimeStamp.textContent = new Date().getHours() + ':' + new Date().getMinutes()
                                    })
                            }

                            else {
                                alert('Сообщение не обновлено так как оно пустое или такой же контент')
                            }
                        })
                    })
                }


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
    }

    else {
        console.log('message is null')
    }

    let ImageProfileMessage1 = document.querySelectorAll('.ImageProfileMessage1')

    for (let ImageProfileMessageItter1 of ImageProfileMessage1) {
        if (JSON.parse(payload.body).image === 'DefaultAva') {
            ImageProfileMessageItter1.style.background=`url(/image/settings/icon_profile.png)` + 'no-repeat center'
            ImageProfileMessageItter1.style.backgroundSize='45px'
        }

        else {
            ImageProfileMessageItter1.style.background=`url(/AvatarImage/${JSON.parse(payload.body).sender}/${JSON.parse(payload.body).image})` + 'no-repeat center'
            ImageProfileMessageItter1.style.backgroundSize='45px'
        }

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

    if (message.type === 'JOIN') {
        ErrorConnect.classList.remove('flex')
        messageAreaNew.scrollMarginBottom = messageAreaNew.scrollHeight;
    }

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

    new ErrorSocket()
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
                    if (new Date().getMonth() +1 === 1) {
                        GetMonth = 'Января'
                    }
                    else if (new Date().getMonth() +1 === 2) {
                        GetMonth = 'Февраля'
                    }
                    else if (new Date().getMonth() +1 === 3) {
                        GetMonth = 'Марта'
                    }
                    else if (new Date().getMonth() +1 === 4) {
                        GetMonth = 'Апреля'
                    }
                    else if (new Date().getMonth() +1 === 5) {
                        GetMonth = 'Мая'
                    }
                    else if (new Date().getMonth() +1 === 6) {
                        GetMonth = 'Июня'
                    }
                    else if (new Date().getMonth() +1 === 7) {
                        GetMonth = 'Июля'
                    }
                    else if (new Date().getMonth() +1 === 8) {
                        GetMonth = 'Августа'
                    }
                    else if (new Date().getMonth() +1 === 9) {
                        GetMonth = 'Сентября'
                    }
                    else if (new Date().getMonth() +1 === 10) {
                        GetMonth = 'Октября'
                    }
                    else if (new Date().getMonth() +1 === 11) {
                        GetMonth = 'Ноября'
                    }
                    else if (new Date().getMonth() +1 === 12) {
                        GetMonth = 'Декабря'
                    }
                    else {
                        GetMonth = 'Какие-то проблемы с месяцем'
                    }
                    let DateLong = new Date().getDate() + ' ' + GetMonth + ' ' + new Date().getFullYear() + 'г.' + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
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
                })
            })
    }
    event.preventDefault();
}

messageForm.addEventListener('submit', sendMessage, true)

connect()

new ErrorSocket()

fetch('/all_users', {
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: "cors"
})
    .then(response => response.json())
    .then((data) => {data.forEach(item => {
        console.log(item)

        if (document.querySelector('.UserChatName') !== null) {
            if (item.id_image === 'DefaultAva' && item.username !== document.querySelector('.UserChatName').textContent) {
                document.querySelector('.ListUsersAddNewUserChat').innerHTML+=`
                <div class="user">
                    <div class="user_image" style="background: url(/image/settings/icon_profile.png) no-repeat; background-size: 71px; height: 60px; width: 70px"><p>/image/settings/icon_profile.png</p></div>
                    <div class="name">${item.username}</div>
                    
                    <div class="click_choice"></div>
                </div>
            `
            }

            else if (item.username !== document.querySelector('.UserChatName').textContent) {
                document.querySelector('.ListUsersAddNewUserChat').innerHTML+=`
                <div class="user">
                    <div class="user_image" style="background: url('/AvatarImage/${item.username}/${item.id_image}') no-repeat; background-size: 71px; height: 60px; width: 70px"><p>/AvatarImage/${item.username}/${item.id_image}</p></div>
                    <div class="name">${item.username}</div>
                   
                    <div class="click_choice"></div>
                </div>
            `
            }
        }

        else {
            if (item.id_image === 'DefaultAva' && item.username) {
                document.querySelector('.ListUsersAddNewUserChat').innerHTML+=`
                <div class="user">
                    <div class="user_image" style="background: url(/image/settings/icon_profile.png) no-repeat; background-size: 71px; height: 60px; width: 70px"><p>/image/settings/icon_profile.png</p></div>
                    <div class="name">${item.username}</div>
                    
                    <div class="click_choice"></div>
                </div>
            `
            }

            else if (item.username !== document.querySelector('.UserChatName').textContent) {
                document.querySelector('.ListUsersAddNewUserChat').innerHTML+=`
                <div class="user">
                    <div class="user_image" style="background: url('/AvatarImage/${item.username}/${item.id_image}') no-repeat; background-size: 71px; height: 60px; width: 70px"><p>/AvatarImage/${item.username}/${item.id_image}</p></div>
                    <div class="name">${item.username}</div>
                   
                    <div class="click_choice"></div>
                </div>
            `
            }
        }
    })})
    .then(() => {
        for (let UserItter of document.querySelectorAll('.user')) {
                UserItter.addEventListener('click', (event) => {
                    let FormData = {
                        "chat_name": document.querySelector('.border_name_chat').textContent,
                        "image_user": event.currentTarget.querySelector('p').textContent,
                        "name": event.currentTarget.querySelector('.name').textContent
                    }

                    console.log(event.currentTarget)

                    console.log(event.currentTarget.querySelector('.name'))

                    const user = event.currentTarget.querySelector('.name').textContent;
                    const image = event.currentTarget.querySelector('p').textContent

                    console.log("user - ", user)
                    console.log("image - ", image)

                    fetch('/AddUserChatAdmin', {
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        }),
                        mode: "cors",
                        method: "POST",
                        body: JSON.stringify(FormData)
                    })
                        .then(res => {
                            console.log(res)
                            console.log(res.status)

                            const standard_time = 1000

                            if (res.status === 201) {
                                console.log('this user equals to admin')
                                UserItter.classList.remove('tick')
                                document.querySelector('.user_add_chat').classList.remove('block')
                                document.querySelector('.user_add_exists').classList.remove('block')
                                document.querySelector('.admin_add_exists').classList.add('block')

                                setTimeout(() => {
                                    document.querySelector('.admin_add_exists').classList.remove('block')
                                }, standard_time)
                            }

                            else if (res.status === 400) {
                                console.log('this user is yet added to chat')
                                UserItter.classList.remove('tick')
                                document.querySelector('.user_add_chat').classList.remove('block')
                                document.querySelector('.user_add_exists').classList.add('block')
                                document.querySelector('.admin_add_exists').classList.remove('block')

                                setTimeout(() => {
                                    document.querySelector('.user_add_exists').classList.remove('block')
                                }, standard_time)
                            }

                            else if (res.status === 200) {
                                console.log('user is created')
                                document.querySelector('.user_add_chat').classList.add('block')
                                document.querySelector('.user_add_exists').classList.remove('block')
                                document.querySelector('.admin_add_exists').classList.remove('block')

                                UserItter.classList.toggle('tick')

                                setTimeout(function () {
                                    document.querySelector('.user_add_chat').classList.remove('block')
                                }, standard_time)
                            }
                        })
                    })
            }
    })