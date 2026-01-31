// OpenCharger API Configuration
export const OPENCHARGER_CONFIG = {
  API_KEY: import.meta.env.VITE_OPENCHARGER_API_KEY || (() => { throw new Error('VITE_OPENCHARGER_API_KEY is not set') })(),
  API_BASE: import.meta.env.VITE_OPENCHARGER_API_BASE || 'https://api.openchargemap.io/v3',
  
  // API Endpoints
  endpoints: {
    chargepoints: '/poi',
    search: '/poi',
    details: '/poi/{id}',
  },

  // Search parameters
  searchParams: {
    latitude: 'latitude',
    longitude: 'longitude',
    distance: 'distance',
    distanceunit: 'distanceunit', // km or mi
    maxresults: 'maxresults',
  },
};

// Fetch chargepoints from OpenCharger API
export const fetchChargepointsFromOpenCharger = async (
  latitude: number,
  longitude: number,
  radiusKm: number = 50
) => {
  try {
    const url = new URL(
      `${OPENCHARGER_CONFIG.API_BASE}${OPENCHARGER_CONFIG.endpoints.search}`
    );
    
    url.searchParams.append('latitude', latitude.toString());
    url.searchParams.append('longitude', longitude.toString());
    url.searchParams.append('distance', radiusKm.toString());
    url.searchParams.append('distanceunit', 'km');
    url.searchParams.append('maxresults', '100');
    url.searchParams.append('key', OPENCHARGER_CONFIG.API_KEY);

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`OpenCharger API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from OpenCharger API:', error);
    throw error;
  }
};

// Get charger details from OpenCharger API
export const getChargerDetailsFromOpenCharger = async (chargepointId: string) => {
  try {
    const url = new URL(
      `${OPENCHARGER_CONFIG.API_BASE}${OPENCHARGER_CONFIG.endpoints.details.replace('{id}', chargepointId)}`
    );
    
    url.searchParams.append('key', OPENCHARGER_CONFIG.API_KEY);

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`OpenCharger API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching charger details from OpenCharger API:', error);
    throw error;
  }
};

// Search chargepoints by filters
export const searchChargepointsOpenCharger = async (filters: {
  latitude?: number;
  longitude?: number;
  distance?: number;
  operatorId?: number;
  countryCode?: string;
  minPower?: number;
  connectorType?: string;
}) => {
  try {
    const url = new URL(
      `${OPENCHARGER_CONFIG.API_BASE}${OPENCHARGER_CONFIG.endpoints.search}`
    );

    if (filters.latitude) url.searchParams.append('latitude', filters.latitude.toString());
    if (filters.longitude) url.searchParams.append('longitude', filters.longitude.toString());
    if (filters.distance) url.searchParams.append('distance', filters.distance.toString());
    if (filters.operatorId) url.searchParams.append('operatorid', filters.operatorId.toString());
    if (filters.countryCode) url.searchParams.append('countrycode', filters.countryCode);
    if (filters.minPower) url.searchParams.append('minpower', filters.minPower.toString());
    if (filters.connectorType) url.searchParams.append('connectortype', filters.connectorType);

    url.searchParams.append('maxresults', '100');
    url.searchParams.append('key', OPENCHARGER_CONFIG.API_KEY);

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`OpenCharger API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching OpenCharger API:', error);
    throw error;
  }
};

export default OPENCHARGER_CONFIG;
