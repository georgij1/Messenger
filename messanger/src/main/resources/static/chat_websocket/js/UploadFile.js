let formElem = document.querySelector('#formElem')
console.log(formElem)

formElem.onsubmit = () => {
    console.log('run')
    const Form = {
        "file": new FormData(formElem)
    }

    fetch('/upload', {
        method: 'POST',
        body: Form,
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors"
    })
        .then(res => {res.json().then(r => r)})
};