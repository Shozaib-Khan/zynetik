export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
}

export interface ForecastData {
  list: Array<{
    dt_txt: string;
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
  }>;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}