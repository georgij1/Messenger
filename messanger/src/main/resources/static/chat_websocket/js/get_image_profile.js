fetch('http://localhost:8080/image_profile',{
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
            image_profile_1.innerHTML=`<div style="background: url(${item.image}) no-repeat; background-size: 71px; height: 60px; width: 70px; margin-left: -18px">`
        }
    })));