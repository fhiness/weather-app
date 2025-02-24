"use client";
import React from "react";

function MainComponent() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/integrations/weather-by-city/weather/${encodeURIComponent(city)}`
      );
      const data = await response.json();

      if (response.ok && data?.current) {
        setWeather(data);
        setError(null);
      } else {
        setError("City not found");
        setWeather(null);
      }
    } catch (err) {
      setError("Failed to fetch weather data");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const weatherData = weather?.current;

  return (
    <div className="min-h-screen bg-[#1E293B] p-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 font-montserrat text-white">
          Fhiness Weather App
        </h1>

        <div className="bg-[#334155] rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              name="city"
              placeholder="Search for a city..."
              className="flex-1 px-4 py-3 rounded-xl bg-[#1E293B] text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && fetchWeather()}
            />
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors"
              disabled={loading}
              onClick={fetchWeather}
            >
              <i className="fas fa-search mr-2"></i>
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {error && (
            <div className="mt-4 text-red-400 text-center bg-[#1E293B] p-3 rounded-xl">
              <i className="fas fa-exclamation-circle mr-2"></i>
              {error}
            </div>
          )}

          {!weatherData && !error && (
            <div className="mt-8 text-center text-gray-400">
              <i className="fas fa-cloud text-6xl mb-4"></i>
              <p>Enter a city name to get weather information</p>
            </div>
          )}

          {weatherData && (
            <div className="mt-8 text-white">
              <div className="text-center">
                <h2 className="text-5xl font-light mb-4">
                  {weatherData.temp_c}°C
                </h2>
                <p className="text-xl text-gray-300 mb-6">
                  {weatherData.condition.text}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1E293B] p-4 rounded-xl">
                  <i className="fas fa-wind text-blue-400 text-xl"></i>
                  <p className="mt-2 text-gray-300">Wind Speed</p>
                  <p className="text-lg">{weatherData.wind_kph} km/h</p>
                </div>
                <div className="bg-[#1E293B] p-4 rounded-xl">
                  <i className="fas fa-tint text-blue-400 text-xl"></i>
                  <p className="mt-2 text-gray-300">Humidity</p>
                  <p className="text-lg">{weatherData.humidity}%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainComponent;