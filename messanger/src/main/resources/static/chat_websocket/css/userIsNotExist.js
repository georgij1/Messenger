document.querySelector('.invite_chat').addEventListener('click', () => {
    document.querySelector('.see_info_admin').classList.add('flex')
    document.querySelector('.see_info_admin1').classList.add('block')

    document.querySelector('.invite_chat').classList.add('none')
    document.querySelector('.NotValidUrl').classList.add('none')
    document.querySelector('.info_admin_div').classList.add('flex')
})

document.querySelector('.btn_send_access').addEventListener('click', () => {
    console.log("IdChat - ", document.querySelector('.IdChat').textContent)
    console.log("who_invite - ", document.querySelector('.who_invite').textContent)
    console.log("ChatName - ", document.querySelector('.ChatName').textContent)

    if (document.querySelector('.input_info_admin').value === '') {
        console.log("info from input for admin - ", "Пользователь не предоставил ни какой информации")

        let form = {
            "UsernameSentOfferAccess": document.querySelector('.who_invite').textContent,
            "chat_name": document.querySelector('.ChatName').textContent,
            "UsernameOwnerChat": document.querySelector('.owner_chat').textContent,
            "InfoAboutUserForAdmin": 'Пользователь не предоставил ни какой информации'
        }

        fetch(`/UserPostAccessChat`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: "cors",
            body: JSON.stringify(form)
        })
            .then(res => {
                if (res.status === 200) {
                    document.querySelector('.request_invite_success_sent').classList.add('block')

                    setTimeout(() => {
                        document.querySelector('.request_invite_success_sent').classList.remove('block')
                        window.open('/websocket_chat', '_self')
                    }, 1000)
                }

                else if (res.status === 404) {
                    document.querySelector('.error_invite_success_sent').classList.add('block')

                    setTimeout(() => {
                        document.querySelector('.error_invite_success_sent').classList.remove('block')
                        window.open('/websocket_chat', '_self')
                    }, 1000)
                }

                else {
                    document.querySelector('.error_be').classList.add('block')

                    setTimeout(() => {
                        document.querySelector('.error_be').classList.remove('block')
                        window.open('/websocket_chat', '_self')
                    }, 1000)
                }
            })
    }

    else {
        document.querySelector('.input_info_admin').value

        let form = {
            "UsernameSentOfferAccess": document.querySelector('.who_invite').textContent,
            "chat_name": document.querySelector('.ChatName').textContent,
            "UsernameOwnerChat": 'Владелец чата',
            "InfoAboutUserForAdmin": document.querySelector('.input_info_admin').value
        }

        fetch(`/UserPostAccessChat`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: "cors",
            body: JSON.stringify(form)
        })
            .then(res => {
                if (res.status === 200) {
                    document.querySelector('.request_invite_success_sent').classList.add('block')

                    setTimeout(() => {
                        document.querySelector('.request_invite_success_sent').classList.remove('block')
                        window.open('/websocket_chat', '_self')
                    }, 1000)
                }

                else if (res.status === 404) {
                    document.querySelector('.error_invite_success_sent').classList.add('block')

                    setTimeout(() => {
                        document.querySelector('.error_invite_success_sent').classList.remove('block')
                        window.open('/websocket_chat', '_self')
                    }, 1000)
                }

                else {
                    document.querySelector('.error_be').classList.add('block')

                    setTimeout(() => {
                        document.querySelector('.error_be').classList.remove('block')
                        window.open('/websocket_chat', '_self')
                    }, 1000)
                }
            })
    }
})

document.querySelector('.close_usersIsNotExists').addEventListener('click', () => {
    window.history.go(-1)
})