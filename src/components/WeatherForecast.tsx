import React from 'react';
import { motion } from 'framer-motion';
import { ForecastData } from '../types/weather';

interface WeatherForecastProps {
  forecast: ForecastData;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => {
  const dailyForecast = forecast.list.filter((item, index) => index % 8 === 0);

  return (
    <div className="mt-8">
      <h3 className="text-gray-400 mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-5 gap-2">
        {dailyForecast.map((day, index) => (
          <motion.div
            key={day.dt_txt}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-3 bg-gray-800 bg-opacity-50 rounded-lg"
          >
            <div className="text-sm text-gray-400">
              {new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
              className="w-10 h-10 mx-auto"
            />
            <div className="text-lg font-light">
              {Math.round(day.main.temp)}°
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default WeatherForecast;