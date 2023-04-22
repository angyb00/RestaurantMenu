const findmyLocation = () => {
    const location = document.querySelector('.status');
    const success = (position) => {
        console.log(position)
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const geoAPiUrl = 'https://api.bigdatacloud.net/data/ reverse-geocode-client?latitude=${latitude}$longitude=${longitude}& localityLanguage=en'
        fetch(geoAPiUrl)
        .then(res =>res.json())
        .then(data => {
            location.textContent = data.principalSubdivision
        })
    }
    const error = () =>{
        location.textContent = 'unable to retieve your location';
    }
    navigator.geolocation.getCurrentPosition(success,error);
}
document.querySelector('.find-location').addEventListener('click',findmyLocation);
