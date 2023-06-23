class EditDescChat {
    EditDescChatBtnClick () {
        document.querySelector('.BtnEditDescChat').addEventListener('click', () => {
            document.querySelector('.FlexGroup').classList.add('none')
            document.querySelector('.ListMessage').classList.add('none')
            console.log(document.querySelector('.BtnEditDescChat'))
            document.querySelector('.window_change_desc_chat').classList.add('flex')
            document.querySelector('.text_in_edit').classList.add('block')
            document.querySelector('.height').classList.add('none')
            document.querySelector('.body_chat').classList.add('none')

            document.querySelector('.window_change_desc_chat').innerHTML+=`
                <div class="close_edit_name_chat edit_chat_name_left"></div>
                
                <input type="text" class="InputChangeName" placeholder="Введите новое название чата" value="${document.querySelector('.DescChatItem').textContent}">
                
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
                    .then(() => {
                        window.location.reload()
                    })
            })
        })
    }

    constructor() {
        this.EditDescChatBtnClick()
    }
}