// let list_chats = document.querySelectorAll('.list_chats')
// let btn_nav_chat = document.querySelectorAll('.btn_nav_chat')
// let all_chat = document.querySelector('.all_chat')
// let content_all_chat = document.querySelector('.content_all_chat')
// let content_all_my_chat = document.querySelector('.content_all_my_chat')
// let all_my_chat = document.querySelector('.all_my_chat')
//
//
// for (let btn_nav_chat_itter of btn_nav_chat) {
//     btn_nav_chat_itter.addEventListener('click', () => {
//         btn_nav_chat_itter.classList.add('btn_nav_chat_checked')
//     })
// }
//
// let list_my_chats = document.querySelectorAll('.list_my_chats')
// for (let list_my_chat_itter of list_my_chats) {
//     fetch(`/MyChats/${username}`, {
//         headers: new Headers({
//             'Content-Type': 'application/json'
//         }),
//         mode: "cors",
//         method: 'POST'
//     })
//         .then(response => response.json())
//         .then((data) => {
//             data.forEach((item) => {
//                 let list_my_chats = document.querySelector('.list_my_chats')
//                 list_my_chats.innerHTML+=`
//                         <div class="one_chat">
//                             <div class="chat">
//                                 <div class="id">${item.id}</div>
//                                 <div class="image"></div>
//                                 <div class="about_chat">
//                                     <div class="name">${item.name}</div>
//                                 </div>
//                             </div>
//
//                             <div class="tools_start">
//                                 <div class="btn_delete_chat">Удалить чат</div>
//                                 <div class="btn_change_name_chat">Изменить имя чата</div>
//                             </div>
//                         </div>
//                     `
//                 let image_user_1 = document.querySelectorAll('.image');
//                 for (let image_user_new of image_user_1) {
//                     image_user_new.style.background = `url(${item.image_chat})` + 'center no-repeat'
//                     image_user_new.style.backgroundSize = `80%`
//                     image_user_new.style.borderRadius = `50px`
//                     image_user_new.style.height = '60px'
//                     image_user_new.style.boxShadow = '0 0 10px bisque'
//                 }
//
//                 let btn_change_name_chat = document.querySelectorAll('.btn_change_name_chat')
//                 for (let BtnChangeNameChatItter of btn_change_name_chat) {
//                     BtnChangeNameChatItter.addEventListener('click', () => {
//                         let one_chat = document.querySelectorAll('.one_chat')
//                         for (let OneChatItter of one_chat) {
//                             OneChatItter.addEventListener('click', (event) => {
//                                 console.log('edit_message')
//                                 console.log(event.currentTarget.children[0].children[2].children[0].textContent)
//
//                                 let eventIdChat  = event.currentTarget.children[0].children[0].textContent
//
//                                 let input_change_name_chat = document.querySelector('.input_change_name_chat')
//                                 input_change_name_chat.innerHTML=`<input type="text" placeholder="edit_chat" class="change_name_chat" value="${event.currentTarget.children[0].children[2].children[0].textContent}">`
//
//                                 let window_edit_name_chat = document.querySelector('.window_edit_name_chat')
//                                 window_edit_name_chat.classList.add('visible')
//                                 list_my_chats.classList.add('none')
//
//                                 let btn_save_change_name = document.querySelector('.btn_save_change_name')
//                                 btn_save_change_name.addEventListener('click', () => {
//                                     console.log('btn_save_change_name')
//                                     let change_name_chat = document.querySelector('.change_name_chat')
//                                     console.log(change_name_chat.value)
//
//                                     const formData = {
//                                         "NewNameChat": change_name_chat.value
//                                     }
//
//                                     console.log(eventIdChat)
//
//                                     fetch(`/EditNameChat/${eventIdChat}`, {
//                                         headers: new Headers({
//                                             'Content-Type': 'application/json'
//                                         }),
//                                         mode: "cors",
//                                         body: JSON.stringify(formData),
//                                         method: 'POST'
//                                     })
//                                         .then(res => {console.log(res)})
//                                         .then(() => {console.log(formData)})
//                                 })
//
//                                 let btn_cancel_change_name_chat = document.querySelector('.btn_cancel_change_name_chat')
//                                 btn_cancel_change_name_chat.addEventListener('click', () => {
//                                     console.log('btn_cancel_change_name_chat')
//                                     window_edit_name_chat.classList.remove('visible')
//                                     list_my_chats.classList.remove('none')
//                                 })
//                             })
//                         }
//                     })
//                 }
//
//                 let btn_delete_chat = document.querySelectorAll('.btn_delete_chat')
//                 for (let BtnDeleteChatItter of btn_delete_chat) {
//                     BtnDeleteChatItter.addEventListener('click', () => {
//                         let one_chat = document.querySelectorAll('.one_chat')
//                         for (let OneChatItter of one_chat) {
//                             OneChatItter.addEventListener('click', (event) => {
//                                 console.log(event.currentTarget.children[0].children[0].textContent)
//                                 fetch(`/delete_chat/${event.currentTarget.children[0].children[0].textContent}`, {
//                                     headers: new Headers({
//                                         'Content-Type': 'application/json'
//                                     }),
//                                     mode: "cors",
//                                     method: 'DELETE'
//                                 })
//                                     .then(response => console.log(response))
//                             })
//                         }
//                     })
//                 }
//             })
//         })
// }
//
// all_chat.addEventListener('click', () => {
//     content_all_chat.classList.add('visible')
//     content_all_my_chat.classList.remove('visible')
// })
//
// all_my_chat.addEventListener('click', () => {
//     content_all_my_chat.classList.add('visible')
//     content_all_chat.classList.remove('visible')
// })
//
// for (let list_chat_itter of list_chats) {
//     list_chat_itter.addEventListener('click', () => {
//         let tools = document.querySelector('.tools')
//         // tools.classList.add('flex')
//     })
//
//     console.log('ListChats')
//
//     fetch('/list_chats', {
//         headers: new Headers({
//             'Content-Type': 'application/json'
//         }),
//         mode: "cors"
//     })
//         .then(response => response.json())
//         .then((data) => {
//             data.forEach(item => {
//                 console.log(item)
//                 console.log(item.id)
//                 for (let list_chats_itter of list_chats) {
//                     list_chats_itter.innerHTML += `
//                         <div class="chat">
//                             <div class="id">${item.id}</div>
//                             <div class="image"></div>
//                             <div class="about_chat">
//                                 <div class="name">${item.name}</div>
//                             </div>
//                         </div>
//                     `
//                     let image_user_1 = document.querySelectorAll('.image');
//                     for (let image_user_new of image_user_1) {
//                         image_user_new.style.background = `url(${item.image_chat})` + 'center no-repeat'
//                         image_user_new.style.backgroundSize = `80%`
//                         image_user_new.style.borderRadius = `50px`
//                         image_user_new.style.height = '60px'
//                         image_user_new.style.boxShadow = '0 0 10px bisque'
//                     }
//                 }
//
//                 let chat = document.querySelectorAll('.chat')
//                 let body_chat = document.querySelector('.body_chat')
//                 let body_class = document.querySelector('.body')
//                 let body_1_class = document.querySelector('.body_1')
//                 let header = document.querySelector('.header')
//                 let content = document.querySelector('.content')
//
//                 for (let chat_itter of chat) {
//
//                     chat_itter.addEventListener('click', (event) => {
//                         console.log(event.currentTarget.children[0].textContent)
//                         window.open(`chat/${event.currentTarget.children[0].textContent}`, '_self')
//                     })
//
//                     /*
//                     let close_window_2 = document.querySelector('.close_window_2')
//                     close_window_2.addEventListener('click', () => {
//                         let body_chat = document.querySelector('.body_chat')
//                         body_chat.classList.remove('visible')
//                         body_class.classList.remove('none')
//                         body_1_class.classList.remove('none')
//                         header.classList.remove('none')
//                         window.location.reload()
//                         tools.classList.remove('flex')
//                     })
//                      */
//                 }
//
//                 let btn_create_chat = document.querySelector('.btn_create_chat')
//                 btn_create_chat.addEventListener('click', () => {
//                     let body_1_new_1 = document.querySelector('.body_1')
//                     body_1_new_1.classList.remove('none')
//                     let header = document.querySelector('.header')
//                     header.classList.remove('visible')
//                 })
//
//                 let close_window_new = document.querySelector('.close_window_new')
//                 close_window_new.addEventListener('click', () => {
//                     let header = document.querySelector('.header')
//                     header.classList.toggle('visible')
//                     window.location.reload()
//                 })
//
//                 let border_name_chat_1 = document.querySelector('.border_name_chat')
//                 let window_settings_chat = document.querySelector('.window_settings_chat')
//                 let tools = document.querySelector('.tools')
//                 let btn_down_1 = document.querySelector('.btn_down_1')
//                 let close_window_2 = document.querySelector('.close_window_2')
//                 let close_window_3 = document.querySelector('.close_window_3')
//                 let list_chat = document.querySelector('.list_chat')
//                 let height = document.querySelector('.height')
//                 let list_users_open_settings = document.querySelector('.list_users_open_settings')
//                 let image_chat_open_settings = document.querySelector('.image_chat_open_settings')
//
//                 border_name_chat_1.addEventListener('click', () => {
//                     window_settings_chat.classList.add('visible')
//                     // tools.classList.add('none')
//                     btn_down_1.classList.add('none')
//                     border_name_chat_1.classList.add('none')
//                     close_window_2.classList.add('none')
//                     close_window_3.classList.add('visible')
//                     list_chat.classList.add('none')
//                     height.classList.add('none')
//                     console.log(item.owner)
//                     list_users_open_settings.innerHTML=`
//                             <div class="owner_chat">
//                                 <div class="owner">${item.owner}</div>
//                                 <span class="span">Админ</span>
//                             </div>
//                             <div class="users_chat_open_settings">
//                                 <div class="user_chat_open_settings">Пользователей пока нет</div>
//                             </div>
//                         `
//                     image_chat_open_settings.innerHTML=`
//                             <div class="image_chat_open_settings" style="background: url(${item.image_chat}) no-repeat center; width: 100%; height: 45vh; background-size: 90%; box-shadow: 0 0 10px burlywood; border-radius: 100%"></div>
//                         `
//                 })
//
//                 close_window_3.addEventListener('click', () => {
//                     window_settings_chat.classList.remove('visible')
//                     // tools.classList.remove('none')
//                     btn_down_1.classList.remove('none')
//                     border_name_chat_1.classList.remove('none')
//                     close_window_2.classList.remove('none')
//                     close_window_3.classList.remove('visible')
//                     list_chat.classList.remove('none')
//                     height.classList.remove('none')
//                 })
//             })
//         })
//
//     let close_window_new_2 = document.querySelector('.close_window_new')
//     console.log(close_window_new_2)
//     close_window_new_2.addEventListener('click', () => {
//         let body_js = document.querySelector('.body_js')
//         console.log(body_js)
//         body_js.classList.remove('none')
//     })
//
//     let send_message = document.querySelector('.send_message')
//     send_message.addEventListener('click', () => {
//         let input_message = document.querySelector('.input_message')
//         if (input_message.value === '') {
//             console.log('str is empty')
//             input_message.classList.toggle('red')
//         } else {
//             console.log("str isn't empty - " + input_message.value)
//             input_message.classList.remove('red')
//         }
//     })
//
//     let btn_tools_chat = document.querySelector('.btn_tools_chat')
//     let window_add_file = document.querySelector('.window_add_file')
//     let flex_content_chat_top_tools = document.querySelector('.flex_content_chat_top_tools')
//     let list_chat = document.querySelector('.list_chat')
//     let tools = document.querySelector('.tools')
//
//     btn_tools_chat.addEventListener('click', () => {
//         window_add_file.classList.add('flex')
//         flex_content_chat_top_tools.classList.add('none')
//         list_chat.classList.add('none')
//     })
//
//     let btn_close_add_file = document.querySelector('.btn_close_add_file')
//     btn_close_add_file.addEventListener('click', () => {
//         window_add_file.classList.remove('flex')
//         flex_content_chat_top_tools.classList.remove('none')
//         list_chat.classList.remove('none')
//     })}