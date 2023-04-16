let BtnSendFile = document.querySelector('.BtnSendFile')

BtnSendFile.addEventListener('click', () => {
    let file = document.querySelector('.file')

    let formData = new FormData()
    formData.append('file', file.files[0])

    let DateLong = new Date().toLocaleDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
    let DateShort = new Date().getHours() + ':' + new Date().getMinutes()

    const Form = {
        "file": formData,
        "TimeStampShort": DateShort,
        "TimeStampLong":DateLong
    }

    console.log(Form)

    console.log(Form.file)
    console.log(file.files[0])

    let request = new XMLHttpRequest();
    request.open("POST", "/upload");
    request.send(formData);
})