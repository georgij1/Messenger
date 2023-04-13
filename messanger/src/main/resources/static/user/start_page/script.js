let InfoPage = document.querySelector('.InfoPage')
let AuthorizationPage = document.querySelector('.AuthorizationPage')
let RegistrationPage = document.querySelector('.RegistrationPage')

InfoPage.addEventListener('click', () => {
    window.open('/main_page', '_self')
})

AuthorizationPage.addEventListener('click', () => {
    window.open('/login', '_self')
})

RegistrationPage.addEventListener('click', () => {
    window.open('/registration', '_self')
})