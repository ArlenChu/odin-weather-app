async function getWeather(city: string) {
    const API_KEY = "KB529L9BXCS63RNTXLGDC5K5Y";

    const fullUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${API_KEY}`

    try {
        const response = await fetch(fullUrl);
        const data = await response.json()

        console.log(response)

    } catch (e) {
        console.error("Failed to fetch weather:", e);
        throw e;
    }
}

getWeather("london")