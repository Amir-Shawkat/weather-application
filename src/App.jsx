import { useState , useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ErrorMessage from "./components/ErrorMessage";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";


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

  const fetchWeatherByLocation = async (lat, lon) => {
    try {
      setLoading(true);
      setError(false);

      const response = await fetch(
        `${API_URL}&lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Location not found");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      console.error(err.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByLocation(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);
  return (
    <div className="card fade-in">
      <SearchBar
        city={city}
        setCity={setCity}
        onSearch={() => checkWeather(city)}
      />

      {loading && <Loader />}
      {error && <ErrorMessage />}
      {weather && !error && <WeatherCard data={weather} />}
    </div>
  );
}


