// Example: Using OpenCharger API in your components

import { useEffect, useState } from 'react';
import {
  fetchChargepointsFromOpenCharger,
  getChargerDetailsFromOpenCharger,
  searchChargepointsOpenCharger,
  OPENCHARGER_CONFIG
} from '@/lib/opencharger';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// ==========================================
// Example 1: Search Chargepoints by Location
// ==========================================
export const SearchChargepointsByLocation = () => {
  const [chargepoints, setChargepoints] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const searchNearby = async () => {
    setLoading(true);
    try {
      // Search within 50km of Bangalore
      const data = await fetchChargepointsFromOpenCharger(
        12.9716,  // Bangalore latitude
        77.5946,  // Bangalore longitude
        50        // 50 km radius
      );
      setChargepoints(data);
      console.log('Found chargepoints:', data);
    } catch (error) {
      console.error('Error searching chargepoints:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Nearby Chargepoints</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={searchNearby} disabled={loading}>
          {loading ? 'Searching...' : 'Search Chargepoints near Bangalore'}
        </Button>
        <div className="mt-4">
          {chargepoints.length > 0 && (
            <p>Found {chargepoints.length} chargepoints</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Example 2: Get Charger Details
// ==========================================
export const GetChargerDetails = ({ chargerId }: { chargerId: string }) => {
  const [charger, setCharger] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await getChargerDetailsFromOpenCharger(chargerId);
        setCharger(data);
        console.log('Charger details:', data);
      } catch (error) {
        console.error('Error fetching charger:', error);
      } finally {
        setLoading(false);
      }
    };

    if (chargerId) {
      fetchDetails();
    }
  }, [chargerId]);

  if (loading) return <div>Loading charger details...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Charger Details</CardTitle>
      </CardHeader>
      <CardContent>
        {charger ? (
          <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
            {JSON.stringify(charger, null, 2)}
          </pre>
        ) : (
          <p>No charger found</p>
        )}
      </CardContent>
    </Card>
  );
};

// ==========================================
// Example 3: Advanced Search with Filters
// ==========================================
export const AdvancedChargerSearch = () => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const performSearch = async () => {
    setLoading(true);
    try {
      const data = await searchChargepointsOpenCharger({
        latitude: 28.7041,      // Delhi
        longitude: 77.1025,
        distance: 30,           // 30 km radius
        minPower: 22,           // At least 22 kW
        countryCode: 'IN',      // India
      });
      setResults(data);
      console.log('Search results:', data);
    } catch (error) {
      console.error('Error performing search:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Charger Search</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <p>Search filters:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Location: Delhi, India (28.7041, 77.1025)</li>
            <li>Radius: 30 km</li>
            <li>Minimum Power: 22 kW</li>
            <li>Country: India (IN)</li>
          </ul>
        </div>
        <Button onClick={performSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Perform Advanced Search'}
        </Button>
        {results.length > 0 && (
          <p className="text-sm">Found {results.length} matching chargepoints</p>
        )}
      </CardContent>
    </Card>
  );
};

// ==========================================
// Example 4: Display API Configuration
// ==========================================
export const ApiConfigDisplay = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>OpenCharger API Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm font-mono">
          <div className="bg-gray-100 p-3 rounded">
            <p><strong>API Key:</strong></p>
            <p className="text-xs text-gray-600">{OPENCHARGER_CONFIG.API_KEY}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded">
            <p><strong>API Base URL:</strong></p>
            <p className="text-xs text-gray-600">{OPENCHARGER_CONFIG.API_BASE}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded">
            <p><strong>Available Endpoints:</strong></p>
            <ul className="text-xs text-gray-600 mt-2 space-y-1">
              <li>• Chargepoints: {OPENCHARGER_CONFIG.endpoints.chargepoints}</li>
              <li>• Search: {OPENCHARGER_CONFIG.endpoints.search}</li>
              <li>• Details: {OPENCHARGER_CONFIG.endpoints.details}</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// ==========================================
// Example 5: Complete Implementation
// ==========================================
export const CompleteChargerViewer = () => {
  const [chargepoints, setChargepoints] = useState<any[]>([]);
  const [selectedCharger, setSelectedCharger] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const loadChargepoints = async () => {
    setLoading(true);
    try {
      const data = await fetchChargepointsFromOpenCharger(
        19.076,   // Mumbai
        72.8777,
        25        // 25 km radius
      );
      setChargepoints(data);
      if (data.length > 0) {
        setSelectedCharger(data[0]);
      }
    } catch (error) {
      console.error('Error loading chargepoints:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={loadChargepoints} disabled={loading}>
        {loading ? 'Loading...' : 'Load Chargepoints near Mumbai'}
      </Button>

      {chargepoints.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">
                Chargepoints ({chargepoints.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {chargepoints.map((cp, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedCharger(cp)}
                    className={`w-full text-left p-2 rounded border ${
                      selectedCharger === cp
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <p className="font-semibold text-sm">
                      {cp.AddressInfo?.Title || `Charger ${idx + 1}`}
                    </p>
                    <p className="text-xs text-gray-600">
                      {cp.AddressInfo?.Town}
                    </p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedCharger && (
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-semibold">
                      {selectedCharger.AddressInfo?.Title}
                    </p>
                    <p className="text-gray-600">
                      {selectedCharger.AddressInfo?.AddressLine1}
                    </p>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-gray-600">
                      Lat: {selectedCharger.AddressInfo?.Latitude.toFixed(4)}
                      , Lng: {selectedCharger.AddressInfo?.Longitude.toFixed(4)}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

// ==========================================
// How to use these examples:
// ==========================================
/*

1. Import any example into your component:
   import { SearchChargepointsByLocation } from '@/examples/opencharger-examples';

2. Use in your component:
   export default function MyPage() {
     return <SearchChargepointsByLocation />;
   }

3. Check browser console to see API responses

4. All functions automatically use your configured API key from .env.local

5. CORS is handled automatically by the OpenCharger API

6. For production, consider:
   - Adding error handling UI
   - Implementing loading states with skeletons
   - Caching API responses
   - Implementing pagination for large result sets
   - Adding map clustering for many chargepoints

*/
