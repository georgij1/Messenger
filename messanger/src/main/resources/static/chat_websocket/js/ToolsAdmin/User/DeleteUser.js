class DeleteUser {
    method_delete_user () {
        document.querySelector('.DeleteUser').addEventListener('click', () => {
            document.querySelector('.ListMessage').classList.add('none')
            document.querySelector('.FlexGroup').classList.add('none')
            document.querySelector('.height').classList.add('none')
            document.querySelector('.tools').classList.add('none')
            document.querySelector('.WindowEditListUser').classList.add('block')
            document.querySelector('.close_window_5').classList.add('block')

            document.querySelector('.close_window_5').addEventListener('click', () => {
                window.location.reload()
            })

            fetch(`/Find/${document.querySelector('.border_name_chat').textContent}`, {
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

    constructor() {
        this.method_delete_user()
    }
}