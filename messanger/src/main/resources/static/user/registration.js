let icon_profile = document.querySelector('#ava_profile')
icon_profile.addEventListener('change', () => {
    let name_file = icon_profile.files[0].name
    let type_file = icon_profile.files[0].type
    let list_file = document.querySelector('.icon_profile')
    console.log(name_file)
    console.log(type_file)
    list_file.innerHTML=`
                <div class="name_file">Имя файла - ${name_file}</div>
            `
})