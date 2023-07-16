// let EventId = event.currentTarget.children[0].children[1].textContent
// console.log(EventId)
// let ChatName = event.currentTarget.children[0].children[4].textContent
// console.log(ChatName)
// let image_user = document.querySelector('.ImageProfilePBlock').textContent
//
// let WindowAnswerRequest = document.querySelectorAll('.WindowAnswerRequest')
// for (let WindowAnswerRequestItter of WindowAnswerRequest) {
//     WindowAnswerRequestItter.classList.add('flex')
// }
// let BtnSuccessRequest = document.querySelectorAll('.BtnSuccessRequest')
// for (let BtnSuccessRequestItter of BtnSuccessRequest) {
//     BtnSuccessRequestItter.classList.add('none')
// }
//
// let BtnSuccessRequest1 = document.querySelectorAll('.BtnSuccessRequest1')
// let UsernameNew = item.usernamefromsent
//
// for (let BtnSuccessRequest1Itter of BtnSuccessRequest1) {
//     BtnSuccessRequest1Itter.addEventListener('click', () => {
//         console.log('true')
//
//         const FormDataTrueAccess = {
//             "id": EventId,
//             "access": true,
//             "username": UsernameNew,
//             "chat_nane": ChatName,
//             "image_user": image_user
//         }
//
//         console.log(FormDataTrueAccess)
//
//         fetch('/rings/UpdateRequestAccessChatStatus', {
//             headers: new Headers({
//                 'Content-Type': 'application/json'
//             }),
//             mode: "cors",
//             method: 'POST',
//             body: JSON.stringify(FormDataTrueAccess)
//         })
//             .then(() => console.log('run'))
//     })
// }
//
// let BtnDeleteRequest = document.querySelectorAll('.BtnDeleteRequest')
//
// for (let BtnDeleteRequestItter of BtnDeleteRequest) {
//     BtnDeleteRequestItter.addEventListener('click', () => {
//         console.log('false')
//
//         const FormDataTrueAccess = {
//             "id": EventId,
//             "access": false,
//         }
//
//         fetch('/rings/UpdateRequestAccessChatStatus', {
//             headers: new Headers({
//                 'Content-Type': 'application/json'
//             }),
//             mode: "cors",
//             method: 'POST',
//             body: JSON.stringify(FormDataTrueAccess)
//         })
//             .then(() => console.log('run'))
//     })
// }