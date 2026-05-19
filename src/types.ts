export interface Activity {
  time: string;
  description: string;
  location?: string;
  category?: 'food' | 'sightseeing' | 'travel' | 'checkin' | 'shopping' | 'leisure';
  mapQuery?: string; // Google Maps arama sorgusu
  activityImage?: string; // Özel bir görsel URL'si
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Day {
  date: string;
  dayName: string;
  title: string;
  activities: Activity[];
}

export interface City {
  id: string;
  name: string;
  hotel: string;
  dates: string;
  days: Day[];
  imageUrl: string;
  color: string;
  info?: {
    weather: string;
    currency: string;
    transport: string;
    timezone: string;
  };
}

export interface Itinerary {
  title: string;
  dates: string;
  cities: City[];
}
