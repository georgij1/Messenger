const FormDataUsername_1 = {
    "username_from_sent": document.querySelector('.username').textContent
}
let ListCancelRequest = document.querySelector('.ListCancelRequest')
console.log(ListCancelRequest)

fetch('/rings/CancelRequestAccessChat', {
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: "cors",
    method: 'POST',
    body: JSON.stringify(FormDataUsername_1)
})
    .then(res => res.json())
    .then(data => data.forEach(item => {
        console.log(item)
        console.log(item)
        ListCancelRequest.innerHTML+=`
            <div class="RequestAccess">
                <div class="IdRequest">${item.id}</div>
                <div class="TextMessage">Ваш запрос на вступление в чат ${item.chat_name} был отклонён</div>
                <div class="Info">${item.usernamefromsent}</div>
                <div class="Info">${item.chat_name}</div>
                <div class="Info">${item.usernametosent}</div>
            </div>
        `
    }))