import React from 'react';
import { RefreshCw } from 'lucide-react';
import { WeatherData, ForecastData } from '../types/weather';
import WeatherForecast from './WeatherForecast';
import { useTheme } from '../context/ThemeContext';

type Props = {
  weather: WeatherData;
  forecast: ForecastData | null;
  onRefresh: () => void;
}

const WeatherDisplay = ({ weather, forecast, onRefresh }: Props) => {
  const { isDark } = useTheme();
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const mutedColor = isDark ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`p-8 ${textColor}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <div className="text-6xl font-light">
            {Math.round(weather.main.temp)}°
          </div>
          <div className="text-3xl">{weather.name}</div>
        </div>
        <button
          onClick={onRefresh}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          <RefreshCw className={textColor} />
        </button>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className={mutedColor}>Humidity</div>
          <div className="text-xl mt-1">{weather.main.humidity}%</div>
        </div>
        <div className="text-center">
          <div className={mutedColor}>Pressure</div>
          <div className="text-xl mt-1">{weather.main.pressure}</div>
        </div>
        <div className="text-center">
          <div className={mutedColor}>Wind</div>
          <div className="text-xl mt-1">{weather.wind.speed} m/s</div>
        </div>
      </div>

      {forecast && <WeatherForecast forecast={forecast} />}
    </div>
  );
}

export default WeatherDisplay;