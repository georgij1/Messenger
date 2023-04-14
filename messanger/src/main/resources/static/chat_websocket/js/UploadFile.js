let BtnSendFile = document.querySelector('.BtnSendFile')

BtnSendFile.addEventListener('click', () => {
    let file = document.querySelector('.file')

    let formData = new FormData()
    formData.append('file', file.files[0])

    const Form = {
        "file": formData
    }

    console.log(Form.file)
    console.log(file.files[0])

    let request = new XMLHttpRequest();
    request.open("POST", "/upload");
    request.send(formData);
})