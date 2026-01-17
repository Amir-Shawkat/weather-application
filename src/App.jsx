import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ErrorMessage from "./components/ErrorMessage";
import WeatherCard from "./components/WeatherCard";


const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


export default function App() {
 
  const [city , setCity] = useState("");
  const [weather , setWeather] = useState(null);
  const [error , setError] = useState(false);
  const [loading , setLoading] = useState(false);

  const checkWeather = async (cityName) => {
  if (!cityName.trim()) return;

  try {
    setLoading(true);
    setError(false);

    const response = await fetch(
      `${API_URL}${cityName}&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    setWeather(data);
    setCity("")
  } catch (err) {
    console.error(err.message);
    setError(true);        // ✅ This controls UI
    setWeather(null);     // hide weather
  } finally {
    setLoading(false);
    
  }
};



  return (
    <div className="card fade-in">
      <SearchBar
        city={city}
        setCity={setCity}
        onSearch={() => checkWeather(city)}
      />

      {loading && <p className="loading">Loading...</p>}
      {error && <ErrorMessage />}
      {weather && !error && <WeatherCard data={weather} />}
    </div>
  );
}


