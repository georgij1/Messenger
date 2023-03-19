let btn_delete_account = document.querySelectorAll('.btn_delete_account')
console.log(btn_delete_account)
for (let btn_delete_Accounts of btn_delete_account) {
    btn_delete_Accounts.addEventListener('click', () => {
        fetch(`/user/id`, {
     method: 'get',
     headers: {
         "Content-Type": "application/json"
     },
     mode: "cors"
})
    .then(response => response.json())
    .then((data) => (data.forEach((item) => {
        console.log(item.id)
        console.log(item.id)
        fetch(`/delete_user/${item.id}`, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors"
        })
            .catch(err => {console.log(err)})
            .then(res => {
                console.log(res)
            })
    })))
    })
}