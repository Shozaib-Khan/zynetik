import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import { useWeather } from './hooks/useWeather';
import SearchHistory from './components/SearchHistory';
import WeatherDisplay from './components/WeatherDisplay';
import Loader from './components/Loader';

function App() {
  const { isDark, toggleTheme } = useTheme();
  const {
    city,
    setCity,
    weather,
    forecast,
    loading,
    error,
    history,
    getWeather
  } = useWeather();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      getWeather(city.trim());
    }
  };

  const bgImage = isDark 
    ? 'https://images.unsplash.com/photo-1505533321630-975218a5f66f?auto=format&fit=crop&q=80'
    : 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&q=80';

  return (
    <div 
      className={`min-h-screen bg-cover bg-center bg-no-repeat ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className={`min-h-screen ${isDark ? 'bg-black/40' : 'bg-white/40'} flex items-center justify-center p-4`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`w-full max-w-lg ${isDark ? 'bg-gray-900/80' : 'bg-white/80'} rounded-lg overflow-hidden backdrop-blur-sm`}
        >
          <div className="flex justify-end p-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-700/50">
              {isDark ? <Sun className="text-white" /> : <Moon className="text-gray-800" />}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="px-4 pb-4">
            <div className="relative">
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Enter city name"
                className={`w-full px-4 py-3 rounded-lg focus:outline-none ${
                  isDark 
                    ? 'bg-gray-800/40 text-white placeholder:text-gray-400' 
                    : 'bg-gray-100 text-gray-900 placeholder:text-gray-500'
                }`}
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                🔍
              </button>
            </div>
          </form>

          <SearchHistory history={history} onSelect={getWeather} />

          {loading && <Loader />}
          {error && <div className="text-center p-8 text-red-400">{error}</div>}
          {weather && !loading && !error && (
            <WeatherDisplay 
              weather={weather} 
              forecast={forecast} 
              onRefresh={() => getWeather(weather.name)} 
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default App;