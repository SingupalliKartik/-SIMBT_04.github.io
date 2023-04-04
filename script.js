const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const name = document.querySelector('#name');
const bg=document.body;

const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const Precipitation = document.getElementById('Precipitation');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');


async function checkWeather(city) {
    const api_key = "7b6d5692dd490f31d7144e3f898e2084";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());


    if (weather_data.cod === `404`) {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        bg.style.backgroundColor="#b9b9b9"
        // bg.style.backgroundImage =" url(images/l.jpeg)";
        // bg.style.backgroundPosition = "top"
        return;
    }
    if ((weather_data.dt)-(weather_data.sys.sunrise)<14800) {
    bg.style.backgroundImage =" url(images/m.jpg)";
    
} else if((weather_data.sys.sunset)-(weather_data.dt)<4800) {
    bg.style.backgroundImage =" url(images/n.jpg)";
}
else{
    bg.style.backgroundImage =" url(images/e.jpg)";
}

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

    name.innerHTML = `${weather_data.name}`;
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    Precipitation.innerHTML = `${weather_data.sys.type}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;


    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "images\\clouds.png";
            break;
        case 'Clear':
            weather_img.src = "images\\clear.png";
            break;
        case 'Rain':
            weather_img.src = "images\\rain.png";
            break;
        case 'Mist':
            weather_img.src = "images\\mist.png";
            break;
        case 'Snow':
            weather_img.src = "images\\snow.png";
            break;
        case 'Drizzle':
            weather_img.src = "images\\dirzzle.png";
            break;

    }



    console.log(weather_data);
}


searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});