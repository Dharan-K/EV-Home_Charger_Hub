export interface EVStation {
  id: number;
  uuid: string;
  name: string;
  address: {
    title: string;
    address_line_1: string;
    address_line_2?: string;
    town: string;
    state_or_province: string;
    postcode: string;
    country_id: number;
    country: {
      id: number;
      iso_code: string;
      title: string;
    };
    latitude: number;
    longitude: number;
  };
  connections: Array<{
    id: number;
    connection_type_id: number;
    connection_type: {
      id: number;
      title: string;
      formal_name?: string;
    };
    status_type_id: number;
    status_type: {
      id: number;
      title: string;
      is_operational: boolean;
    };
    level_id: number;
    level: {
      id: number;
      title: string;
      comments: string;
    };
    power_kw: number;
    current_type_id: number;
    current_type: {
      id: number;
      title: string;
      description: string;
    };
    quantity: number;
  }>;
  status_type_id: number;
  status_type: {
    id: number;
    title: string;
    is_operational: boolean;
  };
  operator_id?: number;
  operator?: {
    id: number;
    title: string;
    website_url?: string;
  };
  usage_type_id: number;
  usage_type: {
    id: number;
    title: string;
    is_pay_at_location: boolean;
    is_membership_required: boolean;
    is_access_key_required: boolean;
  };
  date_last_status_update: string;
}

export interface EVStationsResponse {
  data: EVStation[];
  status_code: number;
  status_message: string;
  timestamp: string;
  is_error: boolean;
  total_count: number;
  results_per_page: number;
  current_page: number;
}

class EVStationsAPI {
  private baseURL = 'https://api.openchargemap.io/v3';
  private apiKey = 'your-openchargemap-api-key'; // You'll need to get this from Open Charge Map

  async getStationsInIndia(
    page = 1,
    limit = 100,
    includeUserComments = false
  ): Promise<EVStationsResponse> {
    try {
      const params = new URLSearchParams({
        countrycode: 'IN', // India
        maxresults: limit.toString(),
        compact: 'true',
        verbose: 'false',
        includecomments: includeUserComments.toString(),
      });

      const response = await fetch(`${this.baseURL}/poi/?${params}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: EVStationsResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching EV stations:', error);
      throw error;
    }
  }

  async getStationsByBounds(
    swLat: number,
    swLng: number,
    neLat: number,
    neLng: number,
    maxResults = 500
  ): Promise<EVStationsResponse> {
    try {
      const params = new URLSearchParams({
        boundingbox: `(${swLat},${swLng}),(${neLat},${neLng})`,
        maxresults: maxResults.toString(),
        compact: 'true',
        verbose: 'false',
      });

      const response = await fetch(`${this.baseURL}/poi/?${params}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: EVStationsResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching EV stations by bounds:', error);
      throw error;
    }
  }

  // Transform Open Charge Map data to our format
  transformStationData(stations: EVStation[]): HomeCharger[] {
    return stations.map((station, index) => {
      const connection = station.connections[0] || {};
      const isOperational = station.status_type?.is_operational ?? false;
      const powerKw = connection.power_kw || 22;
      const isFastCharger = powerKw >= 50;

      return {
        id: station.id.toString(),
        ownerName: station.operator?.title || station.name || 'Unknown Operator',
        profilePic: `https://api.dicebear.com/7.x/avataaars/svg?seed=${station.id}`,
        location: station.address?.title || `${station.address?.address_line_1 || ''}, ${station.address?.town || ''}`,
        city: station.address?.town || 'Unknown City',
        latitude: station.address?.latitude || 0,
        longitude: station.address?.longitude || 0,
        chargerType: isFastCharger ? 'Fast' : 'Normal',
        powerOutput: powerKw,
        pricePerHour: isFastCharger ? Math.round(powerKw * 6) : Math.round(powerKw * 4), // Estimated pricing
        availability: isOperational ? 'Available' : 'Offline',
        emergencySupport: false, // Open Charge Map doesn't provide this info
        availableSlots: ['24/7 Available'], // Default assumption
        rating: 4.0 + Math.random() * 1.0, // Random rating between 4.0-5.0
        totalCharges: Math.floor(Math.random() * 500) + 50, // Random total charges
      };
    });
  }
}

export const evStationsAPI = new EVStationsAPI();

// Re-export the HomeCharger interface for compatibility
export interface HomeCharger {
  id: string;
  ownerName: string;
  profilePic: string;
  location: string;
  city: string;
  latitude: number;
  longitude: number;
  chargerType: 'Normal' | 'Fast';
  powerOutput: number;
  pricePerHour: number;
  availability: 'Available' | 'Busy' | 'Offline';
  emergencySupport: boolean;
  availableSlots: string[];
  rating: number;
  totalCharges: number;
}