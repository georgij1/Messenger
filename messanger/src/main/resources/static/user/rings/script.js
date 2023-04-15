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
})

MessageMessanger.addEventListener('click', () => {
    BtnHeader.classList.add('none')
    CloseWindowRequest.classList.add('block')
    ContentMessageFromChat.classList.add('block')
})

EventCalendar.addEventListener('click', () => {
    BtnHeader.classList.add('none')
    CloseWindowRequest.classList.add('block')
    ContentEventMessage.classList.add('block')
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