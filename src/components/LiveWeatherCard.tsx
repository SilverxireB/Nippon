import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, CloudLightning, CloudSnow } from 'lucide-react';

interface WeatherData {
  temperature: number;
  condition: string;
  icon: React.ReactNode;
  high: number;
  low: number;
}

interface LiveWeatherCardProps {
  cityName: string;
}

const CITY_COORDS: Record<string, { lat: number; lon: number }> = {
  'Osaka': { lat: 34.6937, lon: 135.5023 },
  'Kyoto': { lat: 35.0116, lon: 135.7681 },
  'Tokyo': { lat: 35.6762, lon: 139.6503 },
};

const getWeatherIcon = (code: number) => {
  if (code === 0) return <Sun className="w-8 h-8 text-amber-500" />;
  if (code <= 3) return <Cloud className="w-8 h-8 text-blue-400" />;
  if (code <= 48) return <Cloud className="w-8 h-8 text-gray-400" />;
  if (code <= 67) return <CloudRain className="w-8 h-8 text-blue-600" />;
  if (code <= 77) return <CloudSnow className="w-8 h-8 text-blue-200" />;
  if (code <= 82) return <CloudRain className="w-8 h-8 text-blue-700" />;
  if (code <= 99) return <CloudLightning className="w-8 h-8 text-purple-600" />;
  return <Cloud className="w-8 h-8 text-gray-400" />;
};

const getWeatherText = (code: number) => {
  if (code === 0) return "Açık Gökyüzü";
  if (code <= 3) return "Parçalı Bulutlu";
  if (code <= 48) return "Sisli / Puslu";
  if (code <= 67) return "Yağmurlu";
  if (code <= 77) return "Kar Yağışlı";
  if (code <= 82) return "Sağanak Yağış";
  if (code <= 99) return "Fırtınalı";
  return "Bilinmiyor";
};

export const LiveWeatherCard: React.FC<LiveWeatherCardProps> = ({ cityName }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const coords = CITY_COORDS[cityName] || CITY_COORDS['Tokyo'];
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Asia%2FTokyo`
        );
        const data = await response.json();
        
        setWeather({
          temperature: Math.round(data.current_weather.temperature),
          condition: getWeatherText(data.current_weather.weathercode),
          icon: getWeatherIcon(data.current_weather.weathercode),
          high: Math.round(data.daily.temperature_2m_max[0]),
          low: Math.round(data.daily.temperature_2m_min[0]),
        });
      } catch (error) {
        console.error('Weather fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000); // 10 minutes
    return () => clearInterval(interval);
  }, [cityName]);

  if (loading) {
    return (
      <div className="bg-white/95 backdrop-blur-xl p-5 rounded-[24px] border border-gray-100 shadow-sm animate-pulse">
        <div className="h-4 w-20 bg-gray-100 rounded mb-4"></div>
        <div className="h-8 w-24 bg-gray-100 rounded"></div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="bg-white p-3 sm:p-4 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md h-full relative overflow-hidden group">
      <div className="relative z-10 flex flex-col h-full justify-between">
        <p className="text-[8px] font-black text-red-600 uppercase tracking-widest mb-1">HAVA DURUMU</p>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="shrink-0 scale-75 sm:scale-100">
            {weather.icon}
          </div>
          <div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl sm:text-2xl font-black text-gray-900 leading-none">{weather.temperature}</span>
              <span className="text-xs font-black text-gray-300 leading-none">°C</span>
            </div>
            <p className="text-[7px] sm:text-[8px] font-bold text-gray-400 uppercase tracking-tight leading-none mt-1">{weather.condition}</p>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2 pt-2 border-t border-gray-50">
          <span className="text-[7px] font-black text-red-400 uppercase tracking-tighter">{weather.high}° MAX</span>
          <span className="text-[7px] font-black text-blue-400 uppercase tracking-tighter">{weather.low}° MIN</span>
        </div>
      </div>
    </div>
  );
};
