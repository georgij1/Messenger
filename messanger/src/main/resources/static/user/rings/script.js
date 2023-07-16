fetch(`/last_commit_date`, {
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: "cors",
    method: 'GET'
})
    .then(res => {
        res.text().then(data => {
            console.log(data)
            document.querySelector('.last_committed_date').innerHTML=`
                ${data}
            `
        })
    })

fetch(`/rings/AllRequestAccessChat`, {

})