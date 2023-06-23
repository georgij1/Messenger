fetch(`/AvatarImage/${document.querySelector('.username').textContent}`,{
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: "cors"
})
    .then(response => response.json())
    .then((data) => (data.forEach((item) => {
        console.log(item)
        if (item.id_image === '/image/settings/icon_profile.png') {
            let image_profile = document.querySelector('.image_profile')

            image_profile.style.background=`url(${item.id_image})` + 'no-repeat'
            image_profile.style.backgroundSize=`100%`
        }

        else {
            let image_profile = document.querySelector('.image_profile')

            image_profile.style.background=`url(/AvatarImage/${document.querySelector('.username').textContent}/${item.id_image})` + 'no-repeat'
            image_profile.style.backgroundSize=`100%`
        }
    })));