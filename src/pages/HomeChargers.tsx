import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ChargerCard from '@/components/ChargerCard';
import { homeChargers } from '@/data/homeChargers';
import { 
  Search, 
  Filter, 
  AlertTriangle, 
  Zap,
  MapPin
} from 'lucide-react';

const HomeChargers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEmergency, setFilterEmergency] = useState(false);

  const filteredChargers = homeChargers.filter(charger => {
    const matchesSearch = charger.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         charger.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEmergency = filterEmergency ? charger.emergencySupport : true;
    return matchesSearch && matchesEmergency;
  });

  const emergencyCount = homeChargers.filter(c => c.emergencySupport && c.availability === 'Available').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero px-4 py-12 md:py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-emergency/5 blur-3xl" />
        </div>
        
        <div className="container relative mx-auto">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emergency/10 px-4 py-2 text-sm font-medium text-emergency">
              <AlertTriangle className="h-4 w-4" />
              <span>{emergencyCount} Emergency Chargers Available</span>
            </div>
            
            <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Find Home Chargers Near You
            </h1>
            
            <p className="text-muted-foreground">
              Connect with EV owners who share their home chargers. 
              Perfect for emergency charging or convenient local access.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="sticky top-16 z-40 border-b border-border bg-card/95 px-4 py-4 backdrop-blur-xl">
        <div className="container mx-auto">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by owner name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant={filterEmergency ? 'emergency' : 'outline'}
                size="sm"
                onClick={() => setFilterEmergency(!filterEmergency)}
                className="gap-2"
              >
                <AlertTriangle className="h-4 w-4" />
                Emergency Only
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="px-4 py-8">
        <div className="container mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredChargers.length}</span> chargers near you
              </span>
            </div>
            <Badge variant="outline" className="gap-1">
              <Zap className="h-3 w-3" />
              Sorted by distance
            </Badge>
          </div>

          {filteredChargers.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredChargers.map((charger, index) => (
                <ChargerCard key={charger.id} charger={charger} index={index} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">No chargers found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomeChargers;
