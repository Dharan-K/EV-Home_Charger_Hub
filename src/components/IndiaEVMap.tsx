import { useEffect, useRef, useState } from 'react';
import { HomeCharger } from '@/services/evStationsAPI';
import { Zap, MapPin } from 'lucide-react';

interface IndiaEVMapProps {
  stations: HomeCharger[];
  onStationClick?: (station: HomeCharger) => void;
  className?: string;
}

declare global {
  interface Window {
    L: any;
  }
}

const IndiaEVMap = ({ stations, onStationClick, className = '' }: IndiaEVMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const markers = useRef<any[]>([]);
  const scriptLoaded = useRef(false);
  const [selectedStation, setSelectedStation] = useState<HomeCharger | null>(null);

  useEffect(() => {
    // Load Leaflet CSS
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
    document.head.appendChild(cssLink);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
    script.async = true;
    script.onload = () => {
      scriptLoaded.current = true;
      initMap();
    };
    document.head.appendChild(script);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (scriptLoaded.current && map.current) {
      updateMarkers();
    }
  }, [stations]);

  const initMap = () => {
    if (!mapContainer.current || !window.L) return;

    // Initialize map centered on India
    map.current = window.L.map(mapContainer.current, {
      center: [20.5937, 78.9629], // Center of India
      zoom: 5,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    // Add OpenStreetMap tiles
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Add markers for all stations
    updateMarkers();
  };

  const updateMarkers = () => {
    if (!map.current || !window.L) return;

    // Clear existing markers
    markers.current.forEach(marker => {
      map.current.removeLayer(marker);
    });
    markers.current = [];

    // Add new markers
    stations.forEach((station) => {
      if (station.latitude && station.longitude) {
        const isAvailable = station.availability === 'Available';
        const isFastCharger = station.chargerType === 'Fast';

        // Create custom icon
        const customIcon = window.L.divIcon({
          html: `
            <div class="flex items-center justify-center w-8 h-8 rounded-full border-2 ${
              isAvailable
                ? 'bg-green-500 border-green-600 text-white'
                : 'bg-red-500 border-red-600 text-white'
            } shadow-lg">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
              </svg>
            </div>
          `,
          className: 'custom-ev-marker',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const marker = window.L.marker([station.latitude, station.longitude], {
          icon: customIcon,
        });

        // Create popup content
        const popupContent = `
          <div class="p-3 min-w-[200px]">
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  ${station.ownerName.charAt(0).toUpperCase()}
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-gray-900 text-sm leading-tight">${station.ownerName}</h3>
                <p class="text-xs text-gray-600 mt-1 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                  ${station.location}
                </p>
                <div class="flex items-center gap-2 mt-2">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    isAvailable
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }">
                    ${station.availability}
                  </span>
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    isFastCharger
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }">
                    ${station.chargerType}
                  </span>
                </div>
                <div class="mt-2 text-xs text-gray-600">
                  <div class="flex justify-between">
                    <span>Power:</span>
                    <span class="font-medium">${station.powerOutput}kW</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Price:</span>
                    <span class="font-medium">₹${station.pricePerHour}/hr</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Rating:</span>
                    <span class="font-medium">⭐ ${station.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent, {
          maxWidth: 300,
          className: 'custom-popup',
        });

        // Add click handler
        marker.on('click', () => {
          setSelectedStation(station);
          if (onStationClick) {
            onStationClick(station);
          }
        });

        marker.addTo(map.current);
        markers.current.push(marker);
      }
    });

    // Fit map to show all markers if there are any
    if (stations.length > 0 && markers.current.length > 0) {
      const group = new window.L.featureGroup(markers.current);
      map.current.fitBounds(group.getBounds().pad(0.1));
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div
        ref={mapContainer}
        className="w-full h-full min-h-[400px] rounded-lg border border-border"
        style={{ height: '500px' }}
      />

      {/* Map Legend */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border z-[1000]">
        <h4 className="font-semibold text-sm mb-2 text-gray-900">Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 border-2 border-green-600 rounded-full"></div>
            <span className="text-xs text-gray-700">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 border-2 border-red-600 rounded-full"></div>
            <span className="text-xs text-gray-700">Offline</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Zap className="w-3 h-3" />
            <span>EV Charging Station</span>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      {!scriptLoaded.current && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            <span className="text-sm">Loading map...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndiaEVMap;