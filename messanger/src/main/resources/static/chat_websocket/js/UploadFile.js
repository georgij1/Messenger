document.querySelector('.BtnSendFile').addEventListener('click', () => {
    let file = document.querySelector('.file')

    for (let FileItter of file.files) {
        console.log(FileItter)
        if (FileItter.type === "image/png" || FileItter.type === "image/jpeg" || FileItter.type === "image/gif") {
            let MonthString
            let MonthInt = new Date().getMonth() + 1

            if (MonthInt === 1) {
                MonthString = 'Января'
                console.log('Января')
            }

            else if (MonthInt === 2) {
                MonthString = 'Февраля'
                console.log('Февраля')
            }

            else if (MonthInt === 3) {
                MonthString = 'Марта'
                console.log('Марта')
            }

            else if (MonthInt === 4) {
                MonthString = 'Апреля'
                console.log('Апреля')
            }

            else if (MonthInt === 5) {
                MonthString = 'Мая'
                console.log('Мая')
            }

            else if (MonthInt === 6) {
                MonthString = 'Июня'
                console.log('Июня')
            }

            else if (MonthInt === 7) {
                MonthString = 'Июля'
                console.log('Июля')
            }

            else if (MonthInt === 8) {
                MonthString = 'Августа'
                console.log('Августа')
            }

            else if (MonthInt === 9) {
                MonthString = 'Сентября'
                console.log('Сентября')
            }

            else if (MonthInt === 10) {
                MonthString = 'Октября'
                console.log('Октября')
            }

            else if (MonthInt === 11) {
                MonthString = 'Ноября'
                console.log('Ноября')
            }

            else if (MonthInt === 12) {
                MonthString = 'Декабря'
                console.log('Декабря')
            }

            if (new Date().getMinutes() === 9) {
                let DateLong = new Date().getDate() + ' ' + MonthString + ' ' + new Date().getFullYear() + 'г.' + ' ' + new Date().getHours() + ':' + '09' + ':' + new Date().getSeconds()
                let DateShort = new Date().getHours() + ':' + '09'
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

                console.log(file.files[0])

                let request = new XMLHttpRequest();
                request.open("POST", "/upload");
                request.send(formData);
                window.location.reload()
            }

            else {
                let DateLong = new Date().getDate() + ' ' + MonthString + ' ' + new Date().getFullYear() + 'г.' + ' ' + new Date().getHours() + ':' + new Date().getMinutes()+ ':' + new Date().getSeconds()
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

                console.log(file.files[0])

                let request = new XMLHttpRequest();
                request.open("POST", "/upload");
                request.send(formData);
                window.location.reload()
            }
        }

        else {
            alert('Извините загрузка такого файла пока не доступна')
        }
    }
})