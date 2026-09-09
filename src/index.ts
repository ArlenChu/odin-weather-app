import "./styles.css";

interface CleanWeatherData {
    city: string;
    tempF: number;
    tempC: number;
    feelsLikeF: number;
    feelsLikeC: number;
    humidity: number;
    condition: string;
}

async function getWeather(city: string): Promise<CleanWeatherData> {
    const API_KEY = "KB529L9BXCS63RNTXLGDC5K5Y";

    const fullUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${API_KEY}`

    try {
        const response = await fetch(fullUrl);
        const data = await response.json();

        console.log(data)

        return {
            city: data.address,
            tempF: data.currentConditions.temp,
            tempC: Math.round(((data.currentConditions.temp - 32) * 5) / 9 ),
            feelsLikeF: data.currentConditions.feelslike,
            feelsLikeC: Math.round(((data.currentConditions.feelslike - 32) * 5) / 9 ),
            humidity: data.currentConditions.humidity,
            condition: data.currentConditions.conditions,
        };

    } catch (e) {
        console.error("Failed to fetch weather:", e);
        throw e;
    }
}

let currentWeatherData: CleanWeatherData | null = null;
let currentUnit: 'F' | 'C' = 'F';

const toggleButton = document.getElementById('unit-toggle') as HTMLButtonElement;

toggleButton.addEventListener('click', () => {
    currentUnit = currentUnit === 'F' ? 'C': 'F';
    
    renderWeather();
});

function renderWeather() {
    if (!currentWeatherData) return;

    const cityEl = document.getElementById('display-city')!;
    const feelsEl = document.getElementById('display-feels')!;
    const tempEl = document.getElementById('display-temp')!;
    const condEl = document.getElementById('display-condition')!;
    const humidityEl = document.getElementById('display-humidity')!;

    const feelsLike = currentUnit === 'F' ? currentWeatherData.feelsLikeF : currentWeatherData.feelsLikeC
    const temp = currentUnit === 'F' ? currentWeatherData.tempF : currentWeatherData.tempC

    cityEl.textContent = currentWeatherData.city;
    feelsEl.textContent = `${feelsLike} °${currentUnit}`;
    tempEl.textContent = `${temp} °${currentUnit}`;
    condEl.textContent = currentWeatherData.condition
    humidityEl.textContent = `${currentWeatherData.humidity} %`
}

const form = document.getElementById('search-form') as HTMLFormElement;
const input = document.getElementById('search-input') as HTMLInputElement;

form.addEventListener('submit', async (e: Event) => {
    e.preventDefault()
    const city = input.value.trim().toLowerCase();
    if (!city) return;

    try {
        currentWeatherData = await getWeather(city);
        renderWeather();
        form.reset();
    } catch (e) {
        console.error("Failed to display weather:", e);
        throw e;
    }
});