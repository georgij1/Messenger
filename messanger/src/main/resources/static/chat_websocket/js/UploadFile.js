let BtnSendFile = document.querySelector('.BtnSendFile')

BtnSendFile.addEventListener('click', () => {
    let file = document.querySelector('.file')

    let DateLong = new Date().toLocaleDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
    let DateShort = new Date().getHours() + ':' + new Date().getMinutes()

    let ChatID = document.querySelector('.IdChat').textContent
    let ChatSender = document.querySelector('.IdUser').textContent

    let formData = new FormData()
    formData.append('file', file.files[0])
    formData.append('TimeStampShort', DateShort)
    formData.append('TimeStampLong', DateLong)
    formData.append('ChatID', ChatID)
    formData.append('ChatSender', ChatSender)

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
    // window.location.reload()
})