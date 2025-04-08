import { useState, useEffect } from 'react';
import { WeatherData, ForecastData } from '../types/weather';

export const useWeather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const getWeather = async (cityName: string) => {
    setLoading(true);
    setError('');
    
    try {
      const [weather, forecast] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${import.meta.env.VITE_API_KEY}&units=metric`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${import.meta.env.VITE_API_KEY}&units=metric`)
      ]);
      
      if (!weather.ok || !forecast.ok) {
        throw new Error('City not found');
      }
      
      const [weatherData, forecastData] = await Promise.all([
        weather.json(),
        forecast.json()
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
      
      setHistory(old => {
        const updated = [cityName, ...old.filter(c => c !== cityName)].slice(0, 5);
        localStorage.setItem('history', JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      setError('City not found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  return {
    city,
    setCity,
    weather,
    forecast,
    loading,
    error,
    history,
    getWeather
  };
};