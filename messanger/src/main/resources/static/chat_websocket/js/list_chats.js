let list_chats = document.querySelectorAll('.list_chats')
let btn_nav_chat = document.querySelectorAll('.btn_nav_chat')
let list_my_chats = document.querySelectorAll('.list_my_chats')

for (let btn_nav_chat_itter of btn_nav_chat) {
    btn_nav_chat_itter.addEventListener('click', () => {
        btn_nav_chat_itter.classList.add('btn_nav_chat_checked')
    })
}

for (let list_my_chat_itter of list_my_chats) {
    let username = document.querySelector('.username').textContent
    fetch(`/MyChats/${username}`, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        mode: "cors",
        method: 'POST'
    })
        .then(response => response.json())
        .then((data) => {
            data.forEach((item) => {
                let list_my_chats = document.querySelector('.list_my_chats')
                list_my_chats.innerHTML+=`
                        <div class="one_chat">
                            <div class="chat">
                                <div class="id">${item.id}</div>
                                <div class="image"></div>
                                <div class="about_chat">
                                    <div class="name">${item.name}</div>
                                </div>
                            </div>
                        </div>
                    `
                let image_user_1 = document.querySelectorAll('.image');
                for (let image_user_new of image_user_1) {
                    image_user_new.style.background = `url(${item.image_chat})` + 'center no-repeat'
                    image_user_new.style.backgroundSize = `80%`
                    image_user_new.style.borderRadius = `50px`
                    image_user_new.style.height = '60px'
                    image_user_new.style.boxShadow = '0 0 10px bisque'
                }

                let btn_change_name_chat = document.querySelectorAll('.btn_change_name_chat')
                for (let BtnChangeNameChatItter of btn_change_name_chat) {
                    BtnChangeNameChatItter.addEventListener('click', () => {
                        let one_chat = document.querySelectorAll('.one_chat')
                        for (let OneChatItter of one_chat) {
                            OneChatItter.addEventListener('click', (event) => {
                                console.log('edit_message')
                                console.log(event.currentTarget.children[0].children[2].children[0].textContent)

                                let eventIdChat  = event.currentTarget.children[0].children[0].textContent

                                let input_change_name_chat = document.querySelector('.input_change_name_chat')
                                input_change_name_chat.innerHTML=`<input type="text" placeholder="edit_chat" class="change_name_chat" value="${event.currentTarget.children[0].children[2].children[0].textContent}">`

                                let window_edit_name_chat = document.querySelector('.window_edit_name_chat')
                                window_edit_name_chat.classList.add('visible')
                                list_my_chats.classList.add('none')

                                let btn_save_change_name = document.querySelector('.btn_save_change_name')
                                btn_save_change_name.addEventListener('click', () => {
                                    console.log('btn_save_change_name')
                                    let change_name_chat = document.querySelector('.change_name_chat')
                                    console.log(change_name_chat.value)

                                    const formData = {
                                        "NewNameChat": change_name_chat.value
                                    }

                                    console.log(eventIdChat)

                                    fetch(`/EditNameChat/${eventIdChat}`, {
                                        headers: new Headers({
                                            'Content-Type': 'application/json'
                                        }),
                                        mode: "cors",
                                        body: JSON.stringify(formData),
                                        method: 'POST'
                                    })
                                        .then(res => {console.log(res)})
                                        .then(() => {console.log(formData)})
                                })

                                let btn_cancel_change_name_chat = document.querySelector('.btn_cancel_change_name_chat')
                                btn_cancel_change_name_chat.addEventListener('click', () => {
                                    console.log('btn_cancel_change_name_chat')
                                    window_edit_name_chat.classList.remove('visible')
                                    list_my_chats.classList.remove('none')
                                })
                            })
                        }
                    })
                }

                let btn_delete_chat = document.querySelectorAll('.btn_delete_chat')
                for (let BtnDeleteChatItter of btn_delete_chat) {
                    BtnDeleteChatItter.addEventListener('click', () => {
                        let one_chat = document.querySelectorAll('.one_chat')
                        for (let OneChatItter of one_chat) {
                            OneChatItter.addEventListener('click', (event) => {
                                console.log(event.currentTarget.children[0].children[0].textContent)
                                fetch(`/delete_chat/${event.currentTarget.children[0].children[0].textContent}/${event.currentTarget.children[0].children[0].textContent}`, {
                                    headers: new Headers({
                                        'Content-Type': 'application/json'
                                    }),
                                    mode: "cors",
                                    method: 'DELETE'
                                })
                                    .then(response => console.log(response))
                            })
                        }
                    })
                }
            })
        })
}

for (let list_chat_itter of list_chats) {
    fetch('/list_chats', {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        mode: "cors"
    })
    .then(response => response.json())
    .then((data) => {
        data.forEach(item => {
            for (let list_chats_itter of list_chats) {
                list_chats_itter.innerHTML += `
                    <div class="chat">
                        <div class="id">${item.id}</div>
                        <div class="image"></div>
                        <div class="name">${item.name}</div>
                        <div class="owner">${item.owner}</div>
                    </div>
                `

                for (let image_user_new of document.querySelectorAll('.image')) {
                    image_user_new.style.background = `url(${item.image_chat})` + 'center no-repeat'
                    image_user_new.style.backgroundSize = `80%`
                    image_user_new.style.borderRadius = `50px`
                    image_user_new.style.height = '60px'
                    image_user_new.style.boxShadow = '0 0 10px bisque'
                }
            }

            for (let chat_itter of document.querySelectorAll('.chat')) {
                chat_itter.addEventListener('click', (event) => {
                    console.log(event.currentTarget)
                    window.open(`/chat/${event.currentTarget.querySelector('.id').textContent}/${document.querySelector('.username').textContent}/${event.currentTarget.querySelector('.name').textContent}`, '_self')
                })
            }

            document.querySelector('.btn_create_chat').addEventListener('click', () => {
                let body_1_new_1 = document.querySelector('.body_1')
                body_1_new_1.classList.remove('none')
                let header = document.querySelector('.header')
                header.classList.remove('visible')
            })
        })
    })
}

let i = 0

document.querySelector('.btn_search').addEventListener('click', () => {
    console.log(document.querySelector('.InputSearch').value)
    i++
    console.log("i - ", i)

    if (document.querySelector('.InputSearch').value.length > 0) {
        document.querySelector('.InputSearch').classList.remove('value_null')
        fetch(`find/by/NameChat/${document.querySelector('.username').textContent}/${document.querySelector('.InputSearch').value}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: "cors"
        })
            .then((res) => res.json())
            .then(data => data.forEach(item => {
                console.log(item)

                if (item.exists === false) {
                    for (let ChatIter of document.querySelectorAll('.chat')) {
                        document.querySelector('.list_chats').removeChild(ChatIter)
                    }

                    for (let NotFoundQuery of document.querySelectorAll('.NotFoundQuery')) {
                        document.querySelector('.list_chats').removeChild(NotFoundQuery)
                    }

                    document.querySelector('.list_chats').innerHTML+=`
                        <div class="NotFoundQuery">
                            <div class="NotFoundChat">Чат не найден</div>
                        </div>
                    `
                }

                else {
                    for (let ChatIter of document.querySelectorAll('.chat')) {
                        document.querySelector('.list_chats').removeChild(ChatIter)
                    }

                    document.querySelector('.list_chats').innerHTML+=`
                        <div class="FoundChatDiv">
                            <div class="FoundChat">
                                <div class="chat_id">${item.id}</div>
                                <div class="chat_image"></div>
                                <div class="chat_name">${item.name}</div>
                            </div>
                        </div>
                    `

                    for (let image_user_new of document.querySelectorAll('.chat_image')) {
                        image_user_new.style.background = `url(${item.image_chat})` + 'center no-repeat'
                        image_user_new.style.backgroundSize = `80%`
                        image_user_new.style.borderRadius = `50px`
                        image_user_new.style.height = '60px'
                        image_user_new.style.boxShadow = '0 0 10px bisque'
                    }
                }

                for (let FoundChatItter of document.querySelectorAll('.FoundChat')) {
                    FoundChatItter.addEventListener('click', (event) => {
                        console.log(event.currentTarget.querySelector('.chat_id'))
                        window.open(`/chat/${event.currentTarget.querySelector('.chat_id').textContent}/${document.querySelector('.username').textContent}/${event.currentTarget.querySelector('.chat_name').textContent}#BottomPage`, '_self')
                    })
                }
            }))
    }

    else {
        document.querySelector('.InputSearch').classList.add('value_null')
    }
})

let CountPaginationOffset = 0
let CountPaginationLimit = 10

fetch(`find/history_query/${document.querySelector('.username').textContent}/pagination/offset/${CountPaginationOffset}/limit/${CountPaginationLimit}`, {
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: "cors"
})
    .then((res) => res.json())
    .then(data => data.forEach(item => {
        console.log(item)

        document.querySelector('.exists_query').innerHTML+=`
            <div class="old_query">
                <div class="query_exist_id">${item.id}</div>            
                <div class="query_exist">${item.query}</div>            
            </div>
        `

        for (let query_exist of document.querySelectorAll('.query_exist')) {
            query_exist.addEventListener('click', (event) => {
                console.log('click')
                console.log(event.currentTarget.textContent)
                document.querySelector('.InputSearch').value = event.currentTarget.textContent
            })
        }

        document.querySelector('.visible_more').classList.add('block')
        document.querySelector('.clear_history').classList.add('block')

        console.log(document.querySelector('.window_create_chat').classList.contains('visible'))
    }))

let click = 0

document.querySelector('.visible_more').addEventListener('click', () => {
    click++

    CountPaginationOffset+=10

    console.log("CountPaginationLimit - ", CountPaginationLimit)

    console.log("CountPaginationOffset - ", CountPaginationOffset)

    fetch(`find/history_query/${document.querySelector('.username').textContent}/pagination/offset/${CountPaginationOffset}/limit/${CountPaginationLimit}`, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        mode: "cors"
    })
        .then((res) => res.json())
        .then(data => data.forEach(item => {
            console.log(item)

            document.querySelector('.exists_query').innerHTML+=`
                <div class="new_query query_history_new">
                    <div class="query_exist_id">${item.id}</div>            
                    <div class="query_exist">${item.query}</div>            
                </div>
            `

            for (let query_exist of document.querySelectorAll('.query_exist')) {
                query_exist.addEventListener('click', (event) => {
                    console.log('click')
                    document.querySelector('.InputSearch').value = event.currentTarget.textContent
                })
            }

        }))
})

document.querySelector('.InputSearch').addEventListener('input', () => {
    console.log(document.querySelector('.InputSearch').value.length)
    if (document.querySelector('.InputSearch').value.length === 0) {
        for (let NotFoundQuery of document.querySelectorAll('.NotFoundQuery')) {
            document.querySelector('.list_chats').removeChild(NotFoundQuery)
        }

        for (let list_chat_itter of list_chats) {
            fetch('/list_chats', {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                mode: "cors"
            })
                .then(response => response.json())
                .then((data) => {
                    data.forEach(item => {
                        for (let list_chats_itter of list_chats) {
                            list_chats_itter.innerHTML += `
                         <div class="chat">
                             <div class="id">${item.id}</div>
                             <div class="image"></div>
                             <div class="name">${item.name}</div>
                             <div class="owner">${item.owner}</div>
                         </div>
                    `
                            let image_user_1 = document.querySelectorAll('.image');
                            for (let image_user_new of image_user_1) {
                                image_user_new.style.background = `url(${item.image_chat})` + 'center no-repeat'
                                image_user_new.style.backgroundSize = `80%`
                                image_user_new.style.borderRadius = `50px`
                                image_user_new.style.height = '60px'
                                image_user_new.style.boxShadow = '0 0 10px bisque'
                            }
                        }

                        let chat = document.querySelectorAll('.chat')

                        for (let chat_itter of chat) {
                            chat_itter.addEventListener('click', (event) => {
                                window.open(`/chat/${event.currentTarget.querySelector('.chat_id').textContent}/${document.querySelector('.username').textContent}/${event.currentTarget.querySelector('.chat_name').textContent}`, '_self')
                            })
                        }

                        let btn_create_chat = document.querySelector('.btn_create_chat')
                        btn_create_chat.addEventListener('click', () => {
                            let body_1_new_1 = document.querySelector('.body_1')
                            body_1_new_1.classList.remove('none')
                            let header = document.querySelector('.header')
                            header.classList.remove('visible')
                        })
                    })
                })
        }
    }
})

document.querySelector('.a_i').addEventListener('click', () => {
    console.log('a_i')
    document.querySelector('.a_i').classList.toggle('filter_name_click')
    document.querySelector('.i_a').classList.remove('filter_name_click')
    document.querySelector('.time_sort').classList.remove('filter_name_click')

    for (let chat_itter of document.querySelectorAll('.chat')) {
        document.querySelector('.list_chats').removeChild(chat_itter)
    }

    if (document.querySelector('.a_i').classList.contains('filter_name_click') && document.querySelector('.i_a').classList.contains('filter_name_click') && document.querySelector('.time_sort').classList.contains('filter_name_click')) {
        for (let chat_itter of document.querySelectorAll('.chat')) {
            document.querySelector('.list_chats').removeChild(chat_itter)
        }
        console.log('a_i and i_a and time_sort contains filter_name_click')
        document.querySelector('.list_chats').innerHTML+=`
            <div class="a_i_chats_sort">Список чатов</div>
        `
        for (let a_i_chats_no_sort of document.querySelectorAll('.a_i_chats_no_sort')) {
            document.querySelector('.list_chats').removeChild(a_i_chats_no_sort)
        }
    }

    else {
        fetch('/filter/asc/order/name', {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: "cors"
        })
            .then(res => res.json())
            .then(data => data.forEach(item => {
                console.log(item)
                document.querySelector('.list_chats').innerHTML+=`
                    <div class="a_i_chats_no_sort">
                        <div class="chat">
                            <div class="id">${item.id}</div>
                            <div class="image"></div>
                            <div class="name">${item.name}</div>
                            <div class="owner">${item.owner}</div>
                        </div>
                    </div>
                `

                document.querySelector('.a_i').classList.add('none')
                document.querySelector('.cancel_sort_a_i').classList.add('block')

                for (let image of document.querySelectorAll('.image')) {
                    image.style.background = `url(${item.image_chat})` + 'center no-repeat'
                    image.style.backgroundSize = `80%`
                    image.style.borderRadius = `50px`
                    image.style.height = '60px'
                    image.style.boxShadow = '0 0 10px bisque'
                }

                if (document.querySelector('.chat') !== null && document.querySelector('.a_i_chats_no_sort') === null) {
                    for (let chat_itter of document.querySelectorAll('.chat')) {
                        document.querySelector('.list_chats').removeChild(chat_itter)
                    }
                }

                for (let chat_itter of document.querySelectorAll('.chat')) {
                    chat_itter.addEventListener('click', (event) => {
                        window.open(`/chat/${event.currentTarget.querySelector('.id').textContent}/${document.querySelector('.username').textContent}/${event.currentTarget.querySelector('.name').textContent}`, '_self')
                    })
                }
            }))

        for (let a_i_chats_sort of document.querySelectorAll('.a_i_chats_sort')) {
            document.querySelector('.list_chats').removeChild(a_i_chats_sort)
        }

    }
})

document.querySelector('.cancel_sort_a_i').addEventListener('click', () => {
    if (document.querySelector('.chat') !== null && document.querySelector('.a_i_chats_no_sort') === null) {
        for (let chat_itter of document.querySelectorAll('.chat')) {
            document.querySelector('.list_chats').removeChild(chat_itter)
        }
    }
    document.querySelector('.a_i').classList.remove('none')
    document.querySelector('.cancel_sort_a_i').classList.remove('block')
    document.querySelector('.cancel_sort_a_i').classList.add('none')

    for (let a_i_chats_no_sort of document.querySelectorAll('.a_i_chats_no_sort')) {
        document.querySelector('.list_chats').removeChild(a_i_chats_no_sort)
    }

    if (document.querySelector('.list_chats').clientHeight === 0) {
        for (let chats of document.querySelectorAll('.chat')) {
            document.querySelector('.list_chats').removeChild(chats)
        }

        for (let list_chat_itter of list_chats) {
            fetch('/list_chats', {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                mode: "cors"
            })
                .then(response => response.json())
                .then((data) => {
                    data.forEach(item => {
                        for (let list_chats_itter of list_chats) {
                            list_chats_itter.innerHTML += `
                         <div class="chat">
                             <div class="id">${item.id}</div>
                             <div class="image"></div>
                             <div class="name">${item.name}</div>
                             <div class="owner">${item.owner}</div>
                         </div>
                     `
                            let image_user_1 = document.querySelectorAll('.image');
                            for (let image_user_new of image_user_1) {
                                image_user_new.style.background = `url(${item.image_chat})` + 'center no-repeat'
                                image_user_new.style.backgroundSize = `80%`
                                image_user_new.style.borderRadius = `50px`
                                image_user_new.style.height = '60px'
                                image_user_new.style.boxShadow = '0 0 10px bisque'
                            }
                        }

                        let chat = document.querySelectorAll('.chat')

                        for (let chat_itter of chat) {
                            chat_itter.addEventListener('click', (event) => {
                                window.open(`/chat/${event.currentTarget.querySelector('.id').textContent}/${document.querySelector('.username').textContent}/${event.currentTarget.querySelector('.name').textContent}`, '_self')
                            })
                        }

                        let btn_create_chat = document.querySelector('.btn_create_chat')
                        btn_create_chat.addEventListener('click', () => {
                            let body_1_new_1 = document.querySelector('.body_1')
                            body_1_new_1.classList.remove('none')
                            let header = document.querySelector('.header')
                            header.classList.remove('visible')
                            document.querySelector('.body_1').classList.add('body_window_create_chat')
                        })
                    })
                })
        }

        console.log('clientHeight is null')
    }

    else {
        console.log('list_chats is not null')
    }
})

document.querySelector('.i_a').addEventListener('click', () => {
    console.log('i_a')
    document.querySelector('.a_i').classList.remove('filter_name_click')
    document.querySelector('.i_a').classList.toggle('filter_name_click')
    document.querySelector('.time_sort').classList.remove('filter_name_click')

    for (let chat_itter of document.querySelectorAll('.chat')) {
        document.querySelector('.list_chats').removeChild(chat_itter)
    }

    if (document.querySelector('.a_i').classList.contains('filter_name_click') && document.querySelector('.i_a').classList.contains('filter_name_click') && document.querySelector('.time_sort').classList.contains('filter_name_click')) {
        console.log('a_i and i_a and time_sort contains filter_name_click')
    }

    else {
        fetch('/filter/desc/order/name', {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: "cors"
        })
            .then(res => res.json())
            .then(data => data.forEach(item => {
                console.log(item)
                document.querySelector('.list_chats').innerHTML+=`
                    <div class="a_i_chats_no_sort">
                        <div class="chat">
                            <div class="id">${item.id}</div>
                            <div class="image"></div>
                            <div class="name">${item.name}</div>
                            <div class="owner">${item.owner}</div>
                        </div>
                    </div>
                `

                for (let chat_itter of document.querySelectorAll('.chat')) {
                    chat_itter.addEventListener('click', (event) => {
                        window.open(`/chat/${event.currentTarget.querySelector('.id').textContent}/${document.querySelector('.username').textContent}/${event.currentTarget.querySelector('.name').textContent}`, '_self')
                    })
                }

                document.querySelector('.i_a').classList.add('none')
                document.querySelector('.cancel_sort_i_a').classList.add('block')

                for (let image of document.querySelectorAll('.image')) {
                    image.style.background = `url(${item.image_chat})` + 'center no-repeat'
                    image.style.backgroundSize = `80%`
                    image.style.borderRadius = `50px`
                    image.style.height = '60px'
                    image.style.boxShadow = '0 0 10px bisque'
                }
            }))
    }
})

document.querySelector('.cancel_sort_i_a').addEventListener('click', () => {
    if (document.querySelector('.chat') !== null && document.querySelector('.a_i_chats_no_sort') === null) {
        for (let chat_itter of document.querySelectorAll('.chat')) {
            document.querySelector('.list_chats').removeChild(chat_itter)
        }
    }
    document.querySelector('.i_a').classList.remove('none')
    document.querySelector('.cancel_sort_i_a').classList.remove('block')
    document.querySelector('.cancel_sort_i_a').classList.add('none')

    for (let a_i_chats_no_sort of document.querySelectorAll('.a_i_chats_no_sort')) {
        document.querySelector('.list_chats').removeChild(a_i_chats_no_sort)
    }

    if (document.querySelector('.list_chats').clientHeight === 0) {
        for (let chats of document.querySelectorAll('.chat')) {
            document.querySelector('.list_chats').removeChild(chats)
        }

        for (let list_chat_itter of list_chats) {
            fetch('/list_chats', {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                mode: "cors"
            })
                .then(response => response.json())
                .then((data) => {
                    data.forEach(item => {
                        for (let list_chats_itter of list_chats) {
                            list_chats_itter.innerHTML += `
                         <div class="chat">
                             <div class="id">${item.id}</div>
                             <div class="image"></div>
                             <div class="name">${item.name}</div>
                             <div class="owner">${item.owner}</div>
                         </div>
                     `
                            let image_user_1 = document.querySelectorAll('.image');
                            for (let image_user_new of image_user_1) {
                                image_user_new.style.background = `url(${item.image_chat})` + 'center no-repeat'
                                image_user_new.style.backgroundSize = `80%`
                                image_user_new.style.borderRadius = `50px`
                                image_user_new.style.height = '60px'
                                image_user_new.style.boxShadow = '0 0 10px bisque'
                            }
                        }

                        let chat = document.querySelectorAll('.chat')

                        for (let chat_itter of document.querySelectorAll('.chat')) {
                            chat_itter.addEventListener('click', (event) => {
                                window.open(`/chat/${event.currentTarget.querySelector('.id').textContent}/${document.querySelector('.username').textContent}/${event.currentTarget.querySelector('.name').textContent}`, '_self')
                            })
                        }

                        let btn_create_chat = document.querySelector('.btn_create_chat')
                        btn_create_chat.addEventListener('click', () => {
                            let body_1_new_1 = document.querySelector('.body_1')
                            body_1_new_1.classList.remove('none')
                            let header = document.querySelector('.header')
                            header.classList.remove('visible')
                        })
                    })
                })
        }

        console.log('clientHeight is null')
    }

    else {
        console.log('list_chats is not null')
    }
})

document.querySelector('.time_sort').addEventListener('click', () => {
    console.log('time_sort')
    document.querySelector('.a_i').classList.remove('filter_name_click')
    document.querySelector('.i_a').classList.remove('filter_name_click')
    document.querySelector('.time_sort').classList.toggle('filter_name_click')

    for (let chat_itter of document.querySelectorAll('.chat')) {
        document.querySelector('.list_chats').removeChild(chat_itter)
    }

    if (document.querySelector('.a_i').classList.contains('filter_name_click') && document.querySelector('.i_a').classList.contains('filter_name_click') && document.querySelector('.time_sort').classList.contains('filter_name_click')) {
        console.log('a_i and i_a and time_sort contains filter_name_click')
    }

    else {
        for (let time_sort_chats of document.querySelectorAll('.time_sort_chats')) {
            document.querySelector('.list_chats').removeChild(time_sort_chats)
        }

        fetch(`/filter/time/order/time`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: "cors"
        })
            .then(res => res.json())
            .then(data => data.forEach(item => {
                console.log(item, ' - item')
                document.querySelector('.list_chats').innerHTML+=`
                    <div class="time_chats_no_sort">
                        <div class="chat">
                            <div class="id">${item.id}</div>
                            <div class="image"></div>
                            <div class="name">${item.name}</div>
                            <div class="owner">${item.owner}</div>
                        </div>
                    </div>
                `

                for (let chat_itter of document.querySelectorAll('.chat')) {
                    chat_itter.addEventListener('click', (event) => {
                        window.open(`/chat/${event.currentTarget.querySelector('.id').textContent}/${document.querySelector('.username').textContent}/${event.currentTarget.querySelector('.name').textContent}`, '_self')
                    })
                }

                for (let image of document.querySelectorAll('.image')) {
                    image.style.background = `url(${item.image_chat})` + 'center no-repeat'
                    image.style.backgroundSize = `80%`
                    image.style.borderRadius = `50px`
                    image.style.height = '60px'
                    image.style.boxShadow = '0 0 10px bisque'
                }

                document.querySelector('.time_sort').classList.add('none')
                document.querySelector('.cancel_time_sort').classList.add('block')
            }))
    }
})

document.querySelector('.cancel_time_sort').addEventListener('click', () => {
    for (let time_chats_no_sort of document.querySelectorAll('.time_chats_no_sort')) {
        document.querySelector('.list_chats').removeChild(time_chats_no_sort)
    }

    document.querySelector('.time_sort').classList.remove('none')
    document.querySelector('.cancel_time_sort').classList.remove('block')

    if (document.querySelector('.list_chats').clientHeight === 0) {
        for (let chats of document.querySelectorAll('.chat')) {
            document.querySelector('.list_chats').removeChild(chats)
        }

        for (let list_chat_itter of list_chats) {
            fetch('/list_chats', {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                mode: "cors"
            })
                .then(response => response.json())
                .then((data) => {
                    data.forEach(item => {
                        for (let list_chats_itter of list_chats) {
                            list_chats_itter.innerHTML += `
                         <div class="chat">
                             <div class="id">${item.id}</div>
                             <div class="image"></div>
                             <div class="name">${item.name}</div>
                             <div class="owner">${item.owner}</div>
                         </div>
                     `
                            let image_user_1 = document.querySelectorAll('.image');
                            for (let image_user_new of image_user_1) {
                                image_user_new.style.background = `url(${item.image_chat})` + 'center no-repeat'
                                image_user_new.style.backgroundSize = `80%`
                                image_user_new.style.borderRadius = `50px`
                                image_user_new.style.height = '60px'
                                image_user_new.style.boxShadow = '0 0 10px bisque'
                            }
                        }

                        let chat = document.querySelectorAll('.chat')

                        for (let chat_itter of document.querySelectorAll('.chat')) {
                            chat_itter.addEventListener('click', (event) => {
                                window.open(`/chat/${event.currentTarget.querySelector('.id').textContent}/${document.querySelector('.username').textContent}/${event.currentTarget.querySelector('.name').textContent}`, '_self')
                            })
                        }

                        let btn_create_chat = document.querySelector('.btn_create_chat')
                        btn_create_chat.addEventListener('click', () => {
                            let body_1_new_1 = document.querySelector('.body_1')
                            body_1_new_1.classList.remove('none')
                            let header = document.querySelector('.header')
                            header.classList.remove('visible')
                        })
                    })
                })
        }

        console.log('clientHeight is null')
    }

    else {
        console.log('list_chats is not null')
    }
})

document.querySelector('.clear_history').addEventListener('click', () => {
    fetch(`/clear/query/history/${document.querySelector('.username').textContent}`, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        mode: "cors",
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => data.forEach(item => {
            console.log(item)
        }))
})

document.querySelector('.close_window_new').addEventListener('click', () => {
    window.location.reload()
})

fetch(`/last_commit_date`, {
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: "cors",
    method: 'GET'
})
    .then(res => {
        res.text().then(data => {
            console.log(data)
            document.querySelector('.last_committed_date').innerHTML=`
                ${data}
            `
        })
    })

document.querySelector('.name_chat_div').addEventListener('input', (event) => {
    console.log(event.currentTarget.value)

    if (event.currentTarget.value === '') {
        document.querySelector('.name_chat_div').classList.add('border_red')
    }

    else {
        fetch(`/check_valid/name_chat/${event.currentTarget.value}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: "cors",
            method: 'POST'
        })
            .then(res => {
                console.log(res.status)
                if (res.status === 200) {
                    document.querySelector('.name_chat_div').classList.remove('border_red')
                    document.querySelector('.name_chat_div').classList.add('border_lime')
                }

                else if (res.status === 400) {
                    document.querySelector('.name_chat_div').classList.add('border_red')
                    document.querySelector('.name_chat_div').classList.remove('border_lime')
                }

                else {
                    document.querySelector('.name_chat_div').classList.add('border_red')
                    document.querySelector('.name_chat_div').classList.remove('border_lime')
                }
            })
    }
})