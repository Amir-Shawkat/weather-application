
function getWeatherIcon(main){
    if(main === "Clouds") return "/images/clouds.png";
    if(main === "Clear") return "/images/clear.png";
    if(main === "Rain") return "/images/rain.png";
    if(main === "Drizzle") return "/images/drizzle.png";
    if(main === "Mist") return "/images/mist.png";
    if(main === "Snow") return "/images/snow.png";
    return "/images/clouds.png";
}


export default function WeatherCard({ data }) {
    const icon = getWeatherIcon(data.weather[0].main);

    return (
        <div className="weather show">
            <img src={icon} alt="weather" className="weather-icon" />

            <h1>{Math.round(data.main.temp)}°C</h1>

            <div className="feels-like">
                <p>Feels like: {Math.round(data.main.feels_like)}°C</p>
            </div>

            <h2>{data.name}</h2>

            <div className="details">
                <div className="col">
                    <img src="/images/humidity.png" alt="humidity" />
                    <div>
                        <p className="humidity">{data.main.humidity}%</p>
                        <p>Humidity</p>
                    </div>
                </div>

                <div className="col">
                    <img src="/images/wind.png" alt="wind" />
                    <div>
                        <p className="wind">{data.wind.speed} km/h</p>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>
        </div>
    )
}