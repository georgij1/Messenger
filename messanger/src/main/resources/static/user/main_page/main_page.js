let BtnLinkRegistration = document.querySelector('.BtnLinkRegistration')
let BtnLinkAuthorization = document.querySelector('.BtnLinkAuthorization')

BtnLinkRegistration.addEventListener('click', () => {
    window.open('/registration', '_self')
})

BtnLinkAuthorization.addEventListener('click', () => {
    window.open('/login', '_self')
})