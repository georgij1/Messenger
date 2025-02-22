class BtnAdminEditNameChat {
    EditNameChat() {
        document.querySelector('.BtnEditNameChat').addEventListener('click', () => {
            console.log(document.querySelector('.BtnEditNameChat'))

            document.querySelector('.ListMessage').classList.add('none')

            document.querySelector('.FlexGroup').classList.add('none')

            document.querySelector('.text_in_edit').classList.add('block')

            document.querySelector('.height').classList.add('none')

            document.querySelector('.window_change_chat_name').classList.add('flex')

            document.querySelector('.window_change_chat_name').innerHTML+=`
                    <div class="close_edit_name_chat edit_chat_name_left"></div>
                    
                    <input type="text" class="InputChangeName" placeholder="Введите новое название чата" value="${document.querySelector('.NameChatItem').textContent}">
                    
                    <div class="tools_edit_name_chat">
                        <input type="button" class="InputBtnSaveChangeNameChat" value="Сохранить">                
                    </div>
                `

            for (let CloseEditNameChat of document.querySelectorAll('.close_edit_name_chat')) {
                CloseEditNameChat.addEventListener('click', () => {
                    window.location.reload()
                })
            }

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
                    .catch((err) => {
                        console.log('error with post EditNameChat/id')
                        console.log(err)

                        document.querySelector('.status_change_name_chat').classList.add('block')
                        document.querySelector('.status_change_name_chat').innerHTML+=`
                            <div class="title_status">Ошибка</div>
                        `

                        document.querySelector('.name_chat_min_window').innerText=`${document.querySelector('.name_chat_min_window').textContent}`
                        document.querySelector('.border_name_chat').innerText=`${document.querySelector('.border_name_chat').textContent}`

                        setTimeout(function () {
                            document.querySelector('.status_change_name_chat').classList.remove('block')
                            document.querySelector('.status_change_name_chat').removeChild(document.querySelector('.title_status'))
                            document.querySelector('.window_change_chat_name').classList.remove('flex')
                        }, 1000)

                        document.querySelector('.BorderNameChat').textContent=`${document.querySelector('.BorderNameChat').textContent}`
                    })
                    .then(() => {console.log(formData)})
                    .catch((err) => {
                        console.log('error with post EditNameChat/id')
                        console.log(err)

                        document.querySelector('.status_change_name_chat').classList.add('block')
                        document.querySelector('.status_change_name_chat').innerHTML+=`
                            <div class="title_status">Ошибка</div>
                        `

                        document.querySelector('.name_chat_min_window').innerText=`${document.querySelector('.name_chat_min_window').textContent}`
                        document.querySelector('.border_name_chat').innerText=`${document.querySelector('.border_name_chat').textContent}`

                        setTimeout(function () {
                            document.querySelector('.status_change_name_chat').classList.remove('block')
                            document.querySelector('.status_change_name_chat').removeChild(document.querySelector('.title_status'))
                            document.querySelector('.window_change_chat_name').classList.remove('flex')
                        }, 1000)

                        document.querySelector('.BorderNameChat').textContent=`${document.querySelector('.BorderNameChat').textContent}`
                    })
                    .then(() => {
                        document.querySelector('.status_change_name_chat').classList.add('block')
                        document.querySelector('.status_change_name_chat').innerHTML+=`
                            <div class="title_status">Имя чата изменено</div>
                        `

                        document.querySelector('.name_chat_min_window').innerText=`${formData.NewNameChat}`
                        document.querySelector('.border_name_chat').innerText=`${formData.NewNameChat}`

                        setTimeout(function () {
                            document.querySelector('.status_change_name_chat').classList.remove('block')
                            document.querySelector('.status_change_name_chat').removeChild(document.querySelector('.title_status'))
                            document.querySelector('.window_change_chat_name').classList.remove('flex')
                        }, 1000)

                        document.querySelector('.BorderNameChat').textContent=`${formData.NewNameChat}`
                    })
                    .then(() => {
                        window.open('/websocket_chat', '_self')
                    })
            })
        })
    }

    constructor() {
        this.EditNameChat()
    }
}