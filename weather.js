let apiKey = "5f2c45ab4926a68fa8b0300b0618fd5d";

let dynamicBg = document.getElementById("dynamic-bg")

let city = document.getElementById("weather-place");
let temp = document.getElementById("weather-temp");
let climate = document.getElementById("weather-climate");
let icon = document.getElementById("weather-icon");
let humidity = document.getElementById("weather-humidity");
let speed = document.getElementById("weather-speed");
let sensation = document.getElementById("weather-thermalsensation");
let pressure = document.getElementById("weather-pressure");
let cloudliness = document.getElementById("weather-cloudliness");
let visibility = document.getElementById("weather-visibilty");
let localTimeDisplay = document.getElementById("weather-timezone");
let clock;



let cityname = document.getElementById("cityname");
let searchBtn = document.getElementById("search");


async function checkweather(cityName) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

    let response = await fetch(apiUrl);

    if (!response.ok) {
        alert("Location not found! Please enter valid city name.");
        return;
    }
    let data = await response.json();
    updatedashboard(data);

}

searchBtn.addEventListener("click", () => {
    let input = cityname.value;
    checkweather(input);
});

function checklocalWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            console.log(lat, lon);
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

            let response = await fetch(url);
            let data = await response.json();
            updatedashboard(data);
        });
    }
}
checklocalWeather();


function updatedashboard(data) {
    city.innerText = data.name;
    temp.innerText = Math.round(data.main.temp) + "°C";
    climate.innerText = data.weather[0].main;
    humidity.innerText = "Humidity 💧 : " + data.main.humidity + " %";
    speed.innerText = "Wind Speed 💨 : " + Math.round(data.wind.speed) + " m/s";
    sensation.innerText = "Feels Like 🌡️ : " + Math.round(data.main.feels_like) + " °C";
    pressure.innerText = "Pressure ⏲️ : " + data.main.pressure + " hPa";
    cloudliness.innerText = "Cloudliness ☁️ : " + data.clouds.all + " %";
    visibility.innerText = "Visibility 👁️ : " + (data.visibility / 1000) + " Km";


    let condition = data.weather[0].main;

    if (condition === "Clouds") {
        icon.innerText = "☁️";
        dynamicBg.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.2), rgba(15,6,26,0.85)), url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1000')";
    } else if (condition === "Clear") {
        icon.innerText = "☀️";
        dynamicBg.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.1), rgba(15,6,26,0.85)), url('https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=1000')";
    } else if (condition === "Rain") {
        icon.innerText = "🌧️";
        dynamicBg.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.2), rgba(15,6,26,0.85)), url('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1000')";
    } else if (condition === "Thunderstorm") {
        icon.innerText = "⛈️";
        dynamicBg.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.1), rgba(15,6,26,0.85)), url('https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=1000')";
    } else if (condition === "Haze" || condition === "Mist") {
        icon.innerText = "🌫️";
        dynamicBg.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.2), rgba(15,6,26,0.85)), url('https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=1200')";
    }

    //Clock Engine//

    clearInterval(clock);


    let timezoneOffset = data.timezone;

    function updateClock() {

        let d = new Date();

        let utc = d.getTime() + (d.getTimezoneOffset() * 60000);

        let cityTime = new Date(utc + (1000 * timezoneOffset));

        let hours = String(cityTime.getHours()).padStart(2, '0');
        let minutes = String(cityTime.getMinutes()).padStart(2, '0');
        let seconds = String(cityTime.getSeconds()).padStart(2, '0');

        let day = String(cityTime.getDate()).padStart(2, '0');
        let month = String(cityTime.getMonth() + 1).padStart(2, '0');
        let year = String(cityTime.getFullYear());

        localTimeDisplay.innerText = `Date : ${day}:${month}:${year} \n \nLocal Time: ${hours}:${minutes}:${seconds}`;
    }

    updateClock();

    clock = setInterval(updateClock, 1000);
}