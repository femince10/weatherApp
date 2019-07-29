window.addEventListener('load', () => {
let long;
let lat;
let temperatureDescription = document.querySelector('.temperature-description');

let temperatureDegree = document.querySelector('.temperature');
const temperatureSpan = document.querySelector('.temperature span');

let locationTimezone = document.querySelector('.location-timezone');
let temperatureSection = document.querySelector('.temperature-section')
if(navigator.geolocation){navigator.geolocation.getCurrentPosition(position => {
    long = position.coords.longitude;
    lat = position.coords.latitude;
    
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

    fetch(api)
    .then(response => {
        return response.json();
                    
    })

    .then(data => {
        console.log(data);
        const {temperature, summary, icon } = data.currently;
        //Set DOM Element from the API
        temperatureDegree.textContent = temperature;
        temperatureDescription.textContent = summary;
        locationTimezone.textContent = data.timezone;
        //Formula for Celsius
        let Celsius = (temperature - 32) * (5 / 9);

        //set icon
        setIcons(icon, document.querySelector('.icon'));

        //Change temperature to Celsius/Farenheit 
        temperatureSection.addEventListener('click', () => {
            if(temperatureSpan.textContent === "F"){
               temperatureSpan.textContent = "C";
               temperatureDegree.textContent = Math.floor(Celsius);
            } else{
                temperatureSpan.textContent = "F";
            }
        });
    });
});


}

function setIcons(icon, iconID){
    const skyIcons = new skyIcons({color: 'white'});
    const currentIcon = icon.replace(/-/g,"_").upperCase();
    skyIcons.play();
    return skyIcons.set(iconID, SkyIcons[currentIcon]);

}
});
