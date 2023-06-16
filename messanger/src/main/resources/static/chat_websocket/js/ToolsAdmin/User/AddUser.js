class AddUser {
    method_add_user () {
        document.querySelector('.AddUser').addEventListener('click', () => {
            console.log('click')
            document.querySelector('.WindowAddUsersPanel').classList.add('block')
            document.querySelector('.ListMessage').classList.add('none')
            document.querySelector('.FlexGroup').classList.add('none')
            document.querySelector('.height').classList.add('none')
            document.querySelector('.close_window_4_panel').classList.add('block')
            document.querySelector('.tools').classList.add('none')
            document.querySelector('.body_chat').classList.add('none')

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
                            document.querySelector('.ListUsersAddNewUserChatPanel').innerHTML+=`
                                <div class="user">
                                    <div class="user_image" style="background: url(/image/settings/icon_profile.png) no-repeat; background-size: 71px; height: 60px; width: 70px"><p>/image/settings/icon_profile.png</p></div>
                                    <div class="name">${item.username}</div>
                                    
                                    <div class="click_choice"></div>
                                </div>
                            `
                        }

                        else if (item.username !== document.querySelector('.UserChatName').textContent) {
                            document.querySelector('.ListUsersAddNewUserChatPanel').innerHTML+=`
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
                            document.querySelector('.ListUsersAddNewUserChatPanel').innerHTML+=`
                                <div class="user">
                                    <div class="user_image" style="background: url(/image/settings/icon_profile.png) no-repeat; background-size: 71px; height: 60px; width: 70px"><p>/image/settings/icon_profile.png</p></div>
                                    <div class="name">${item.username}</div>
                                    
                                    <div class="click_choice"></div>
                                </div>
                            `
                        }

                        else if (item.username !== document.querySelector('.UserChatName').textContent) {
                            document.querySelector('.ListUsersAddNewUserChatPanel').innerHTML+=`
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
        })
    }

    constructor() {
        this.method_add_user()
    }
}