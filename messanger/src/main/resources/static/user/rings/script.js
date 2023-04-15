let RequestChat = document.querySelector('.RequestChat')
let BtnGetSendAccessOffer = document.querySelector('.BtnGetSendAccessOffer')
let BtnGetSendAccessOfferCheck = document.querySelector('.BtnGetSendAccessOfferCheck')
let MessageMessanger = document.querySelector('.MessageMessanger')
let EventCalendar = document.querySelector('.EventCalendar')
let ContentRequestChat = document.querySelector('.ContentRequestChat')
let CloseWindowRequest = document.querySelector('.CloseWindowRequest')
let AllRequest = document.querySelector('.AllRequest')
let BtnHeader = document.querySelector('.BtnHeader')

RequestChat.addEventListener('click', () => {
    BtnGetSendAccessOfferCheck.classList.add('block')
    BtnGetSendAccessOffer.classList.add('block')
    RequestChat.classList.add('none')
    MessageMessanger.classList.add('none')
    EventCalendar.classList.add('none')
    CloseWindowRequest.classList.add('block')
    AllRequest.classList.add('block')
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
})

MessageMessanger.addEventListener('click', () => {
    BtnHeader.classList.add('none')
    CloseWindowRequest.classList.add('block')
})

EventCalendar.addEventListener('click', () => {
    BtnHeader.classList.add('none')
    CloseWindowRequest.classList.add('block')
})