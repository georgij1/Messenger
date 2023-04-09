// body_chat.classList.toggle('visible')
// body_class.classList.toggle('none')
// body_1_class.classList.toggle('none')
// console.log("ItemName - " + item.name)
// let border_name_chat = document.querySelector('.border_name_chat')
// border_name_chat.innerText = event.currentTarget.children[2].children[0].textContent
// header.classList.toggle('none')
// let chat_id_var = event.currentTarget.children[0].textContent
// console.log("chat_id_var - " + chat_id_var)
// let list_chat = document.querySelector('.list_chat')
// chat_itter.addEventListener('click', connect())
//
// function sendMessage(event) {
//     let messageInput = document.querySelector('.form-control');
//     let messageContent = messageInput.value.trim();
//
//     const formData = {
//         "username": document.querySelector('.username').textContent
//     }
//
//     if (messageContent && stompClient) {
//         fetch('/username', {
//             method: 'POST',
//             headers: new Headers({
//                 'Content-Type': 'application/json'
//             }),
//             body: JSON.stringify(formData),
//             mode: "cors"
//         })
//             .then(response => response.json())
//             .then((data) => {
//                 data.forEach(item => {
//                     console.log(event.currentTarget)
//                     console.log("websocket id - " + item.id)
//                     let item_id_user = item.id
//                     console.log(new Date().toLocaleDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds())
//                     let Date_new = new Date().toLocaleDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
//                     let chatMessage = {
//                         sender: item_id_user,
//                         content: messageInput.value,
//                         chat_id: chat_id_var,
//                         TimeStamp: Date_new,
//                         type: 'CHAT'
//                     };
//                     console.log(chatMessage.TimeStamp)
//                     console.log(messageInput.value)
//                     stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
//                     messageInput.value = '';
//                     let list_chat = document.querySelector('.list_chat')
//                     list_chat.innerHTML += `
//                                                     <div class="message">
//                                                         <div class="id">${chatMessage.id}</div>
//                                                         <div class="text">${chatMessage.content}</div>
//                                                         <div class="text">${chatMessage.TimeStamp}</div>
//
// <!--                                                        <div class="tools_message">-->
// <!--                                                            <div class="delete_message"></div>-->
// <!--                                                            <div class="edit_message"></div>-->
// <!--                                                            <div class="share_message"></div>-->
// <!--                                                        </div>-->
//                                                     </div>
//                                                 `
//                     let delete_message = document.querySelectorAll('.delete_message')
//                     console.log(delete_message)
//                     for (let delete_message_itter of delete_message) {
//                         delete_message_itter.addEventListener('click', () => {
//                             console.log(delete_message)
//                             console.log(item.id)
//                             console.log()
//                             fetch(`/delete_message/${event.currentTarget.children[2].children[0].textContent}`, {
//                                 method: 'delete',
//                                 headers: {
//                                     "Content-Type": "application/json"
//                                 },
//                                 mode: "cors"
//                             })
//                                 .catch(err => {
//                                     console.log(err)
//                                 })
//                                 .then(res => {
//                                     console.log(res)
//                                     console.log(event.currentTarget.children[2].children[0].textContent)
//                                     alert('Сообщение - ' + item.content + ' успешно удалено')
//                                     // window.location.reload()
//                                 })
//                             // stompClient.send(`/app/chat.deleteMessage/${formData.id}`, {}, JSON.stringify(chatMessage));
//                         })
//                     }
//                 })
//             })
//     }
//     event.preventDefault();
// }
//
// messageForm.addEventListener('submit', sendMessage, true)
//
// // console.log(event.currentTarget.children[1].children[0].textContent)
// // console.log(event.currentTarget.children[0].textContent)
//
// console.log(event.currentTarget.children[0])
// console.log(item.id)
// fetch(`/chats/${event.currentTarget.children[0].textContent}`, {
//     headers: new Headers({
//         'Content-Type': 'application/json'
//     }),
//     method: "POST",
//     mode: "cors"
// })
//     .then((response) => {
//         response.json().then(res => console.log(res.forEach(item => {
//             console.log(item.text)
//             list_chat.innerHTML +=
//                 `
//                                     <div class="message">
//                                         <div class="id">${item.id}</div>
//                                         <div class="text">${item.text}</div>
//                                         <div class="timestamp">${item.time_stamp}</div>
//
//                                         <div class="tools_message">
//                                             <div class="delete_message"></div>
//                                             <div class="edit_message"></div>
//                                             <div class="share_message"></div>
//                                         </div>
//                                     </div>
//                                 `
//             let edit_message = document.querySelectorAll('.edit_message')
//             let window_edit_message = document.querySelector('.window_edit_message')
//             for (let edit_message_itter of edit_message) {
//                 edit_message_itter.addEventListener('click', () => {
//                     console.log(edit_message)
//                     console.log(item)
//                     window_edit_message.classList.add('flex')
//                     window_edit_message.innerHTML=`
//                                                         <input class="input_edit_message" value="${item.text}" name="message">
//                                                         <input type="button" class="save_edit_message" value="Сохранить">
//                                                         <input type="button" class="cancel_edit_message" value="Закрыть">
//                                                 `
//                     let save_edit_message = document.querySelector('.save_edit_message')
//                     let input_edit_message = document.querySelector('.input_edit_message')
//                     let cancel_edit_message = document.querySelector('.cancel_edit_message')
//
//                     cancel_edit_message.addEventListener('click', () => {
//                         window_edit_message.classList.remove('flex')
//                     })
//
//                     save_edit_message.addEventListener('click', () => {
//                         console.log('id message')
//                         console.log(item.id)
//                         console.log('text message')
//                         console.log(item.text)
//                         console.log('input_edit_message.value')
//                         console.log(input_edit_message.value)
//                         window_edit_message.classList.remove('flex')
//
//                         const formData = {
//                             "message": input_edit_message.value
//                         }
//
//                         fetch(`/edit_message/${item.id}`, {
//                             method: 'POST',
//                             headers: {
//                                 'Accept': 'application/json',
//                                 'Content-Type': 'application/json'
//                             },
//                             body: JSON.stringify(formData)
//                         })
//                             .then(res => {console.log(res)})
//                             .then(() => {
//                                 console.log(item.text)
//                                 window.location.reload()
//                             })
//                     })
//                 })
//             }
//
//             let delete_message = document.querySelectorAll('.delete_message')
//             console.log(delete_message)
//             for (let delete_message_itter of delete_message) {
//                 delete_message_itter.addEventListener('click', () => {
//                     console.log(delete_message)
//                     console.log(item.id)
//                     fetch(`/delete_message/${item.id}`, {
//                         method: 'delete',
//                         headers: {
//                             "Content-Type": "application/json"
//                         },
//                         mode: "cors"
//                     })
//                         .catch(err => {
//                             console.log(err)
//                         })
//                         .then(res => {
//                             console.log(res)
//                             alert('Сообщение - ' + item.text + ' успешно удалено')
//                             window.location.reload()
//                         })
//                 })
//             }
//
//             let share_message = document.querySelectorAll('.share_message')
//             console.log('share_message')
//             console.log(share_message)
//             for (let share_message_itter of share_message) {
//                 console.log('share_content')
//                 console.log(item.text)
//                 share_message_itter.addEventListener('click', () => {
//                     window.open(`share/${item.text}`)
//                 })
//             }
//         })))
//     })