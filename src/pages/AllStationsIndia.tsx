import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import ChargerCard from '@/components/ChargerCard';
import IndiaEVMap from '@/components/IndiaEVMap';
import { evStationsAPI, HomeCharger } from '@/services/evStationsAPI';
import {
  Search,
  Filter,
  MapPin,
  Zap,
  ChevronRight,
  LayoutGrid,
  LayoutList,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

const AllStationsIndia = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCity, setFilterCity] = useState<string | null>(null);
  const [filterChargerType, setFilterChargerType] = useState<string | null>(null);
  const [filterAvailability, setFilterAvailability] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('map');
  const [stations, setStations] = useState<HomeCharger[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStation, setSelectedStation] = useState<HomeCharger | null>(null);

  // Fetch real EV station data
  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to fetch from Open Charge Map API
        const response = await evStationsAPI.getStationsInIndia(1, 500);

        if (response.data && response.data.length > 0) {
          const transformedStations = evStationsAPI.transformStationData(response.data);
          setStations(transformedStations);
        } else {
          // Fallback to mock data if API fails
          console.warn('API returned no data, using mock data');
          setError('Unable to load real-time data. Showing sample data.');
          // Import mock data as fallback
          const { homeChargers } = await import('@/data/homeChargers');
          setStations(homeChargers);
        }
      } catch (err) {
        console.error('Error fetching stations:', err);
        setError('Failed to load charging stations. Showing sample data.');

        // Fallback to mock data
        try {
          const { homeChargers } = await import('@/data/homeChargers');
          setStations(homeChargers);
        } catch (mockErr) {
          console.error('Failed to load mock data:', mockErr);
          setStations([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  // Get unique cities and sort them
  const cities = useMemo(() => {
    const uniqueCities = [...new Set(stations.map(c => c.city))];
    return uniqueCities.sort();
  }, [stations]);

  const statsByCity = useMemo(() => {
    const stats: Record<string, { total: number; available: number; emergency: number }> = {};
    stations.forEach(charger => {
      if (!stats[charger.city]) {
        stats[charger.city] = { total: 0, available: 0, emergency: 0 };
      }
      stats[charger.city].total++;
      if (charger.availability === 'Available') stats[charger.city].available++;
      if (charger.emergencySupport) stats[charger.city].emergency++;
    });
    return stats;
  }, [stations]);

  // Filter chargers
  const filteredChargers = useMemo(() => {
    return stations.filter(charger => {
      const matchesSearch =
        charger.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        charger.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        charger.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCity = filterCity ? charger.city === filterCity : true;
      const matchesChargerType = filterChargerType ? charger.chargerType === filterChargerType : true;
      const matchesAvailability = filterAvailability ? charger.availability === filterAvailability : true;

      return matchesSearch && matchesCity && matchesChargerType && matchesAvailability;
    });
  }, [stations, searchQuery, filterCity, filterChargerType, filterAvailability]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero px-4 py-12 md:py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="container relative mx-auto">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <MapPin className="h-4 w-4" />
              <span>All EV Charging Stations Across India</span>
            </div>

            <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Find EV Chargers All Across <span className="text-gradient">India</span>
            </h1>

            <p className="text-muted-foreground">
              Browse through {loading ? '...' : stations.length} charging stations across {cities.length} major Indian cities
              {error && <span className="text-amber-600 ml-2">• {error}</span>}
            </p>

            {!loading && (
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.reload()}
                  className="gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh Data
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="px-4 py-8">
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-foreground">Charging Network Coverage</h2>
            {loading ? (
              <div className="grid gap-4 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="border-border bg-gradient-card shadow-card">
                    <CardContent className="py-6">
                      <div className="text-center">
                        <div className="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-border bg-gradient-card shadow-card">
                  <CardContent className="py-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{stations.length}</div>
                      <p className="text-sm text-muted-foreground mt-2">Total Charging Stations</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border bg-gradient-card shadow-card">
                  <CardContent className="py-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-success">
                        {stations.filter(c => c.availability === 'Available').length}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Currently Available</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border bg-gradient-card shadow-card">
                  <CardContent className="py-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emergency">
                        {stations.filter(c => c.emergencySupport).length}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Emergency Support</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="px-4 py-8 border-t border-border">
        <div className="container mx-auto">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by charger owner name, location, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid gap-3 md:grid-cols-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">City</label>
                <select
                  value={filterCity || ''}
                  onChange={(e) => setFilterCity(e.target.value || null)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>
                      {city} ({statsByCity[city]?.total || 0})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Charger Type</label>
                <select
                  value={filterChargerType || ''}
                  onChange={(e) => setFilterChargerType(e.target.value || null)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                >
                  <option value="">All Types</option>
                  <option value="Normal">Normal (AC)</option>
                  <option value="Fast">Fast (DC)</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Availability</label>
                <select
                  value={filterAvailability || ''}
                  onChange={(e) => setFilterAvailability(e.target.value || null)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                >
                  <option value="">All Status</option>
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">View Mode</label>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'map' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('map')}
                  >
                    <MapPin className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchQuery || filterCity || filterChargerType || filterAvailability) && (
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <Badge variant="outline" className="gap-1">
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery('')} className="text-xs">✕</button>
                  </Badge>
                )}
                {filterCity && (
                  <Badge variant="outline" className="gap-1">
                    City: {filterCity}
                    <button onClick={() => setFilterCity(null)} className="text-xs">✕</button>
                  </Badge>
                )}
                {filterChargerType && (
                  <Badge variant="outline" className="gap-1">
                    Type: {filterChargerType}
                    <button onClick={() => setFilterChargerType(null)} className="text-xs">✕</button>
                  </Badge>
                )}
                {filterAvailability && (
                  <Badge variant="outline" className="gap-1">
                    Status: {filterAvailability}
                    <button onClick={() => setFilterAvailability(null)} className="text-xs">✕</button>
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* City Overview Cards */}
      {!filterCity && !searchQuery && !filterChargerType && !filterAvailability && (
        <section className="px-4 py-8 border-t border-border bg-secondary/20">
          <div className="container mx-auto">
            <h2 className="mb-4 text-2xl font-bold text-foreground">Browse by City</h2>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {cities.map(city => {
                const stats = statsByCity[city];
                return (
                  <Card
                    key={city}
                    className="border-border bg-gradient-card shadow-card cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setFilterCity(city)}
                  >
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{city}</h3>
                          <p className="text-sm text-muted-foreground">
                            {stats.total} station{stats.total !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="mb-1 block">
                            {stats.available} Available
                          </Badge>
                          <Badge variant="outline" className="text-emergency border-emergency/20">
                            {stats.emergency} Emergency
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      <section className="px-4 py-8">
        <div className="container mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredChargers.length}</span> of{' '}
                <span className="font-semibold text-foreground">{stations.length}</span> stations
                {loading && <span className="ml-2 text-blue-600">• Loading...</span>}
              </span>
            </div>
            <Badge variant="outline" className="gap-1">
              <Zap className="h-3 w-3" />
              Real-time data
            </Badge>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading EV charging stations...</p>
              </div>
            </div>
          ) : error && stations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <AlertCircle className="h-16 w-16 text-amber-500 mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Unable to Load Data</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          ) : (
            <>
              {viewMode === 'map' && (
                <div className="mb-6">
                  <IndiaEVMap
                    stations={filteredChargers}
                    onStationClick={setSelectedStation}
                    className="w-full"
                  />
                </div>
              )}

              {filteredChargers.length > 0 ? (
                <>
                  {viewMode === 'grid' ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {filteredChargers.map((charger, index) => (
                        <ChargerCard key={charger.id} charger={charger} index={index} />
                      ))}
                    </div>
                  ) : viewMode === 'list' ? (
                    <div className="space-y-3">
                      {filteredChargers.map((charger) => (
                        <Card key={charger.id} className="border-border bg-gradient-card shadow-card hover:shadow-lg transition-shadow">
                          <CardContent className="py-4">
                            <div className="flex items-start gap-4">
                              <Avatar className="h-12 w-12 border-2 border-primary/20">
                                <AvatarImage src={charger.profilePic} alt={charger.ownerName} />
                                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                  {getInitials(charger.ownerName)}
                                </AvatarFallback>
                              </Avatar>

                              <div className="flex-1">
                                <div className="flex items-center justify-between gap-4">
                                  <div>
                                    <h3 className="font-semibold text-foreground">{charger.ownerName}</h3>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                      <MapPin className="h-3.5 w-3.5" />
                                      {charger.location}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-lg font-bold text-primary">₹{charger.pricePerHour}/hr</div>
                                    <Badge
                                      variant="outline"
                                      className={
                                        charger.availability === 'Available'
                                          ? 'bg-success/10 text-success border-success/20'
                                          : charger.availability === 'Busy'
                                            ? 'bg-warning/10 text-warning border-warning/20'
                                            : 'bg-muted text-muted-foreground'
                                      }
                                    >
                                      {charger.availability}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="mt-2 grid grid-cols-3 gap-3">
                                  <div>
                                    <p className="text-xs text-muted-foreground">Power</p>
                                    <p className="font-semibold text-foreground">{charger.powerOutput}kW {charger.chargerType}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">Rating</p>
                                    <p className="font-semibold text-foreground">⭐ {charger.rating.toFixed(1)}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">City</p>
                                    <p className="font-semibold text-foreground">{charger.city}</p>
                                  </div>
                                </div>
                              </div>

                              <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">No stations found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setFilterCity(null);
                      setFilterChargerType(null);
                      setFilterAvailability(null);
                    }}
                    className="mt-4"
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllStationsIndia;
