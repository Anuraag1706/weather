const API_KEY = '376f16d35427801aa548321f42db952c'; // Replace with your OpenWeatherMap API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function fetchWeather() {
    const searchInput = document.querySelector('.search').value;
    const cityName = searchInput.trim() || 'New York'; // Default to New York if input is empty
    try {
        const response = await fetch(`${API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        updateWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function updateWeather(data) {
    // Extract necessary information from API response
    const { name, sys, main, weather, wind } = data;
    const iconCode = weather[0].icon;
    const temp = Math.round(main.temp);
    const condition = weather[0].main.toLowerCase();
    const windSpeed = wind.speed;
    const location = `${name}, ${sys.country}`;

    // Format date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
    const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    // Update the HTML
    document.querySelector('.weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.querySelector('.temperature p').textContent = `${temp}°C`;
    document.querySelector('.location p').textContent = location;
    document.querySelector('.date p').textContent = formattedDate;
    // document.querySelector('.time p').textContent = formattedTime;
    document.querySelector('.condition p').textContent = capitalize(condition);
    document.querySelector('.windspeed p').textContent = `${windSpeed} mph`;

    // Update background color based on condition
    updateBackgroundColor(condition);
}

function updateBackgroundColor(condition) {
    const body = document.body;
    let backgroundColor;

    switch (condition) {
        case 'mist':
            backgroundColor = '#d3d3d3'; // Light gray for mist
            break;
        case 'sunny':
            backgroundColor = '#ffcc00'; // Yellow shade for sunny
            break;
        case 'rain':
        case 'rainy':
            backgroundColor = '#87ceeb'; // Sky blue for rain
            break;
        case 'snow':
        case 'snowy':
            backgroundColor = '#4682b4'; // Deeper blue for snow
            break;
        default:
            backgroundColor = '#003973'; // Default blue for other conditions
            break;
    }

    body.style.backgroundColor = backgroundColor;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Initial fetch for default city
fetchWeather();
