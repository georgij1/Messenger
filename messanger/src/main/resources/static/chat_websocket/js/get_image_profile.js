fetch('/image_profile',{
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: "cors"
})
    .then(response => response.json())
    .then((data) => console.log(data.forEach((item) => {
        console.log(item.image)
        let image_profile = document.querySelectorAll('.image_profile')
        for (let image_profile_1 of image_profile) {
            image_profile_1.style.background=`url(${item.image})` + 'no-repeat'
            image_profile_1.style.backgroundSize=`100%`
            // image_profile_1.style.height=`100%`
            image_profile_1.style.width=`34%`
            image_profile_1.style.borderRadius=`50px`
            // image_profile_1.innerHTML=`<div style="background: url(${item.image}) no-repeat; background-size: 71px; height: 60px; width: 70px; margin-left: -18px">`
        }
    })));

// element.style {
//     background: url("../image/settings/icon_profile.png") no-repeat;
//     width: 34%;
//     border-radius: 50px;
//     background-size: 100%;
// }