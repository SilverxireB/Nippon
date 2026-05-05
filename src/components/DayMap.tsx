import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { Activity } from '../types';

// Fix for leaflet icons in React
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

interface DayMapProps {
  activities: Activity[];
}

const RecenterMap: React.FC<{ coords: [number, number][] }> = ({ coords }) => {
  const map = useMap();
  React.useEffect(() => {
    if (coords.length > 0) {
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [coords, map]);
  return null;
};

export const DayMap: React.FC<DayMapProps> = ({ activities }) => {
  const filteredActivities = activities
    .map((a, originalIdx) => ({ ...a, originalIdx }))
    .filter(a => a.coordinates);
  
  if (filteredActivities.length === 0) return null;

  const points: [number, number][] = filteredActivities.map(a => [a.coordinates!.lat, a.coordinates!.lng]);

  const createNumberedIcon = (number: number) => {
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] border-2 border-white shadow-md active:scale-95 transition-transform">${number}</div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  };

  return (
    <div className="w-full h-[300px] rounded-[32px] overflow-hidden mb-10 border border-gray-100 shadow-sm relative z-10">
      <MapContainer 
        center={points[0]} 
        zoom={13} 
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MarkerClusterGroup
          chunkedLoading
          spiderfyOnMaxZoom={true}
          showCoverageOnHover={false}
          maxClusterRadius={20} // Smaller radius so they cluster only when very close
        >
          {filteredActivities.map((activity, idx) => (
            <Marker 
              key={idx} 
              position={[activity.coordinates!.lat, activity.coordinates!.lng]}
              icon={createNumberedIcon(idx + 1)}
            >
              <Popup>
                <div className="font-sans p-1">
                  <p className="font-black text-xs mb-1 uppercase tracking-wider text-red-600">NOKTASI {idx + 1}</p>
                  <p className="font-bold text-sm mb-1 text-gray-900">{activity.description}</p>
                  <p className="text-[10px] font-medium text-gray-500 uppercase">{activity.time}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

        <Polyline 
          positions={points} 
          pathOptions={{ color: '#ef4444', weight: 3, opacity: 0.6, dashArray: '10, 10' }} 
        />
        <RecenterMap coords={points} />
      </MapContainer>
    </div>
  );
};
