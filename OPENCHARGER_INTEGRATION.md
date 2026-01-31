# OpenCharger API Integration

This project now includes integration with the **OpenCharger API** for displaying interactive maps with charger locations.

## Configuration

### API Key
The OpenCharger API key is configured in the `.env.local` file:

```env
VITE_OPENCHARGER_API_KEY=your_api_key_here
VITE_OPENCHARGER_API_BASE=https://api.openchargemap.io/v3
```

### Files Modified

1. **New Components**
   - `src/components/ChargerMap.tsx` - Interactive map component using Leaflet
   - `src/lib/opencharger.ts` - OpenCharger API utilities and configuration

2. **Updated Files**
   - `src/pages/ChargerDetails.tsx` - Integrated ChargerMap component
   - `.env.local` - Added API configuration variables

## Features

### ChargerMap Component
- **Interactive Map**: Displays charger location on an interactive Leaflet map
- **Custom Markers**: Beautiful EV charger icons on the map
- **Location Popup**: Shows charger details when clicking the marker
- **Responsive**: Works on all screen sizes
- **OpenStreetMap**: Uses free OpenStreetMap tiles for map display

### API Utilities
The `opencharger.ts` file provides functions for:
- `fetchChargepointsFromOpenCharger()` - Search chargepoints by location
- `getChargerDetailsFromOpenCharger()` - Get details of a specific charger
- `searchChargepointsOpenCharger()` - Advanced search with filters

## Map Display

When viewing charger details at `/home-chargers/:id`, an interactive map is displayed showing:
- Charger location with a custom EV charger marker
- Charger owner name
- Location address
- Power output and charger type
- Pricing
- Availability status
- Latitude and longitude coordinates

## Usage Example

```tsx
import ChargerMap from '@/components/ChargerMap';
import { HomeCharger } from '@/data/homeChargers';

const MyComponent = ({ charger }: { charger: HomeCharger }) => {
  return <ChargerMap charger={charger} />;
};
```

## OpenCharger API Documentation

For more information about the OpenCharger API, visit:
- Website: https://openchargemap.org
- API Docs: https://openchargemap.io/api

## Technologies Used

- **Leaflet**: Open-source JavaScript library for interactive maps
- **OpenStreetMap**: Free map tiles provider
- **OpenCharger API**: Charger location and details API
- **React**: Component framework
- **TypeScript**: Type safety

## Future Enhancements

- [ ] Integrate real charger data from OpenCharger API
- [ ] Add multiple chargers to map view
- [ ] Implement charger search by location
- [ ] Add directions/routing integration
- [ ] Display charger availability in real-time
- [ ] Show charger photos and reviews
