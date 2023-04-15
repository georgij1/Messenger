let RequestChat = document.querySelector('.RequestChat')
let BtnGetSendAccessOffer = document.querySelector('.BtnGetSendAccessOffer')
let BtnGetSendAccessOfferCheck = document.querySelector('.BtnGetSendAccessOfferCheck')
let MessageMessanger = document.querySelector('.MessageMessanger')
let EventCalendar = document.querySelector('.EventCalendar')
let ContentAllRequestChat = document.querySelector('.ContentAllRequestChat')
let CloseWindowRequest = document.querySelector('.CloseWindowRequest')
let AllRequest = document.querySelector('.AllRequest')
let BtnHeader = document.querySelector('.BtnHeader')
let ContentSentRequestChat = document.querySelector('.ContentSentRequestChat')
let ContentCheckRequestChat = document.querySelector('.ContentCheckRequestChat')
let ContentMessageFromChat = document.querySelector('.ContentMessageFromChat')
let ContentEventMessage = document.querySelector('.ContentEventMessage')
let ListRequest = document.querySelector('.ListRequest')
let burger_menu_1 = document.querySelector('.burger_menu')

RequestChat.addEventListener('click', () => {
    BtnGetSendAccessOfferCheck.classList.add('block')
    BtnGetSendAccessOffer.classList.add('block')
    RequestChat.classList.add('none')
    MessageMessanger.classList.add('none')
    EventCalendar.classList.add('none')
    CloseWindowRequest.classList.add('block')
    AllRequest.classList.add('block')
    ContentAllRequestChat.classList.add('block')
    ContentSentRequestChat.classList.remove('block')
    ContentCheckRequestChat.classList.remove('block')
    ContentMessageFromChat.classList.remove('block')

    const FormDataUsername = {
        "username_from_sent": document.querySelector('.username').textContent
    }

    fetch('/rings/AllRequestAccessChat', {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        mode: "cors",
        method: 'POST',
        body: JSON.stringify(FormDataUsername)
    })
        .then(res => res.json())
        .then(data => data.forEach(item => {
            console.log(item)
            ListRequest.innerHTML+=`
                <div class="RequestAccess">
                    <div class="IdRequest">${item.id}</div>
                    <div class="TextMessage">Вы отправили запрос на вступление в чат ${item.chat_name}</div>
                    <div class="Info">${item.usernamefromsent}</div>
                    <div class="Info">${item.chat_name}</div>
                    <div class="Info">${item.usernametosent}</div>
                </div>
                
                <div class="BtnDeleteRequest">Удалить запрос</div>
            `
        }))

    let CloseWindowRequestId = document.querySelector('#CloseWindowRequest')
    if (CloseWindowRequestId.classList.contains("block")) {
        burger_menu_1.classList.add('none')
    }

    else {
        burger_menu_1.classList.remove('none')
    }
})

CloseWindowRequest.addEventListener('click', () => {
    BtnGetSendAccessOfferCheck.classList.remove('block')
    BtnGetSendAccessOffer.classList.remove('block')
    RequestChat.classList.remove('none')
    MessageMessanger.classList.remove('none')
    EventCalendar.classList.remove('none')
    CloseWindowRequest.classList.remove('block')
    AllRequest.classList.remove('block')
    BtnHeader.classList.remove('none')
    ContentAllRequestChat.classList.remove('block')
    ContentSentRequestChat.classList.remove('block')
    ContentCheckRequestChat.classList.remove('block')
    ContentMessageFromChat.classList.remove('block')
    ContentEventMessage.classList.remove('block')
    burger_menu_1.classList.remove('none')
})

MessageMessanger.addEventListener('click', () => {
    BtnHeader.classList.add('none')
    CloseWindowRequest.classList.add('block')
    ContentMessageFromChat.classList.add('block')
    let CloseWindowRequestId = document.querySelector('#CloseWindowRequest')
    if (CloseWindowRequestId.classList.contains("block")) {
        burger_menu_1.classList.add('none')
    }

    else {
        burger_menu_1.classList.remove('none')
    }
})

EventCalendar.addEventListener('click', () => {
    BtnHeader.classList.add('none')
    CloseWindowRequest.classList.add('block')
    ContentEventMessage.classList.add('block')
    let CloseWindowRequestId = document.querySelector('#CloseWindowRequest')
    if (CloseWindowRequestId.classList.contains("block")) {
        burger_menu_1.classList.add('none')
    }

    else {
        burger_menu_1.classList.remove('none')
    }
})

AllRequest.addEventListener('click', () => {
    ContentAllRequestChat.classList.add('block')
    ContentSentRequestChat.classList.remove('block')
    ContentCheckRequestChat.classList.remove('block')
})

BtnGetSendAccessOffer.addEventListener('click', () => {
    ContentAllRequestChat.classList.remove('block')
    ContentSentRequestChat.classList.add('block')
    ContentCheckRequestChat.classList.remove('block')
})

BtnGetSendAccessOfferCheck.addEventListener('click', () => {
    ContentAllRequestChat.classList.remove('block')
    ContentSentRequestChat.classList.remove('block')
    ContentCheckRequestChat.classList.add('block')
})