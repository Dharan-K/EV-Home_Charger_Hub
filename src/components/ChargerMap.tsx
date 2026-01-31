import { useEffect, useRef } from 'react';
import { HomeCharger } from '@/data/homeChargers';
import { Zap } from 'lucide-react';
import { OPENCHARGER_CONFIG } from '@/lib/opencharger';

interface ChargerMapProps {
  charger: HomeCharger;
  className?: string;
}

declare global {
  interface Window {
    L: any;
  }
}

const ChargerMap = ({ charger, className = '' }: ChargerMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const scriptLoaded = useRef(false);

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

  const initMap = () => {
    if (!mapContainer.current || !window.L) return;

    if (map.current) {
      map.current.remove();
    }

    map.current = window.L.map(mapContainer.current).setView(
      [charger.latitude, charger.longitude],
      14
    );

    // Add OpenStreetMap tiles
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Powered by <a href="https://openchargemap.org">OpenCharger</a>',
      maxZoom: 19,
      opacity: 0.9,
    }).addTo(map.current);

    // Add custom marker for the charger
    const markerHtml = `
      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-lg border-2 border-white">
        <svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
          <polyline points="13 2 13 9 20 9"></polyline>
          <path d="M9 15v2m3-2v2m3-2v2"></path>
        </svg>
      </div>
    `;

    const customIcon = window.L.divIcon({
      html: markerHtml,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20],
    });

    const marker = window.L.marker([charger.latitude, charger.longitude], {
      icon: customIcon,
    }).addTo(map.current);

    // Create popup with charger details
    const popupContent = `
      <div class="w-48 p-3">
        <h3 class="font-semibold text-sm mb-1">${charger.ownerName}</h3>
        <p class="text-xs text-gray-600 mb-2">${charger.location}</p>
        <div class="space-y-1 text-xs">
          <p><span class="font-medium">Power:</span> ${charger.powerOutput}kW (${charger.chargerType})</p>
          <p><span class="font-medium">Price:</span> ₹${charger.pricePerHour}/hr</p>
          <p><span class="font-medium">Status:</span> <span class="font-medium text-green-600">${charger.availability}</span></p>
        </div>
        <div class="mt-2 text-xs text-gray-500 border-t pt-2">
          <p><strong>OpenCharger API</strong></p>
          <p class="text-gray-400 text-xs mt-1">Lat: ${charger.latitude.toFixed(4)}, Lng: ${charger.longitude.toFixed(4)}</p>
          <p class="text-gray-400 text-xs">API Key: ${OPENCHARGER_CONFIG.API_KEY.substring(0, 8)}...</p>
        </div>
      </div>
    `;

    marker.bindPopup(popupContent, {
      maxWidth: 250,
      className: 'custom-popup',
    });

    // Open popup by default
    marker.openPopup();
  };

  return (
    <>
      <style>{`
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
        .leaflet-popup-tip {
          background-color: white;
          border: 1px solid #e5e7eb;
        }
      `}</style>
      <div
        ref={mapContainer}
        className={`relative w-full rounded-xl border border-border overflow-hidden bg-muted ${className}`}
        style={{ minHeight: '400px' }}
      >
        {!scriptLoaded.current && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary/50 z-10">
            <div className="text-center space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">Loading OpenCharger Map...</p>
              <p className="text-xs text-muted-foreground">
                Location: {charger.latitude.toFixed(4)}, {charger.longitude.toFixed(4)}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChargerMap;
