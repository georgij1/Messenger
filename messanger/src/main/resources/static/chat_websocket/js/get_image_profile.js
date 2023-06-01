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
            console.log('icon for default')

            let image_profile = document.querySelector('.image_profile')

            console.log('1')
            image_profile.style.background=`url(${item.id_image})` + 'no-repeat'
            image_profile.style.backgroundSize=`100%`
            image_profile.style.width=`34%`
            image_profile.style.borderRadius=`50px`
        }

        else {
            console.log('else is running')
            let image_profile = document.querySelector('.image_profile')
            console.log('1')
            console.log(`url(/AvatarImage/${document.querySelector('.username').textContent}/${item.id_image})`)
            image_profile.style.background=`url(/AvatarImage/${document.querySelector('.username').textContent}/${item.id_image})` + 'no-repeat'
            image_profile.style.backgroundSize=`100%`
            image_profile.style.width=`34%`
            image_profile.style.borderRadius=`50px`
        }
    })));