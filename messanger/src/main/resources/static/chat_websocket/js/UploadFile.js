let BtnSendFile = document.querySelector('.BtnSendFile')

BtnSendFile.addEventListener('click', () => {
    let file = document.querySelector('.file')

    for (let FileItter of file.files) {
        console.log(FileItter)
        if (FileItter.type === "image/png" || FileItter.type === "image/jpeg" || FileItter.type === "image/gif") {
            let DateLong = new Date().toLocaleDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
            let DateShort = new Date().getHours() + ':' + new Date().getMinutes()

            let ChatID = document.querySelector('.IdChat').textContent
            let ChatSender = document.querySelector('.IdUser').textContent
            let PlaceHolderImage = document.querySelector('.PlaceHolderImageInput').value

            console.log(PlaceHolderImage)

            let formData = new FormData()
            formData.append('file', file.files[0])
            formData.append('time_stamp_short', DateShort)
            formData.append('time_stamp_long', DateLong)
            formData.append('chat_id', ChatID)
            formData.append('sender_id', ChatSender)
            formData.append('text', PlaceHolderImage)

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
        }

        else {
            alert('Извините загрузка такого файла пока не доступна')
        }
    }
})