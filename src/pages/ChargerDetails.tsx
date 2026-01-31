import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getChargerById, getDistanceFromUser } from '@/data/homeChargers';
import ChargerMap from '@/components/ChargerMap';
import { 
  ArrowLeft, 
  MapPin, 
  Zap, 
  Clock, 
  Star, 
  AlertTriangle,
  Navigation,
  Phone,
  Mail,
  Shield,
  Calendar,
  IndianRupee,
  User
} from 'lucide-react';

const ChargerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const charger = getChargerById(id || '');
  const distance = getDistanceFromUser(id || '');

  if (!charger) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-foreground">Charger Not Found</h1>
          <Link to="/home-chargers">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home Chargers
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-success/10 text-success border-success/20';
      case 'Busy':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Offline':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-card px-4 py-6">
        <div className="container mx-auto">
          <Link to="/home-chargers">
            <Button variant="ghost" size="sm" className="mb-4 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home Chargers
            </Button>
          </Link>
          
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary/20">
                <AvatarImage src={charger.profilePic} alt={charger.ownerName} />
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                  {getInitials(charger.ownerName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-foreground">{charger.ownerName}</h1>
                  {charger.emergencySupport && (
                    <Badge className="bg-gradient-emergency text-emergency-foreground animate-pulse-slow border-0 gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Emergency Support
                    </Badge>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    {charger.rating} rating
                  </span>
                  <span>•</span>
                  <span>{charger.totalCharges} total charges</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Navigation className="h-4 w-4" />
                    {distance} km away
                  </span>
                </div>
              </div>
            </div>
            
            <Badge variant="outline" className={`text-base ${getAvailabilityColor(charger.availability)}`}>
              {charger.availability}
            </Badge>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Location Card */}
            <Card className="border-border bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-foreground">{charger.location}</p>
                
                {/* OpenCharger Map Component */}
                <ChargerMap charger={charger} />
              </CardContent>
            </Card>

            {/* Charger Specifications */}
            <Card className="border-border bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="h-5 w-5 text-primary" />
                  Charger Specifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-secondary/50 p-4">
                    <div className="mb-2 text-sm text-muted-foreground">Charger Type</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        {charger.chargerType}
                      </Badge>
                      <span className="font-semibold text-foreground">Charging</span>
                    </div>
                  </div>
                  <div className="rounded-xl bg-secondary/50 p-4">
                    <div className="mb-2 text-sm text-muted-foreground">Power Output</div>
                    <div className="text-2xl font-bold text-primary">{charger.powerOutput} kW</div>
                  </div>
                  <div className="rounded-xl bg-secondary/50 p-4">
                    <div className="mb-2 text-sm text-muted-foreground">Estimated Charge Time</div>
                    <div className="font-semibold text-foreground">
                      ~{Math.round(60 / charger.powerOutput * 10)} min for 10 kWh
                    </div>
                  </div>
                  <div className="rounded-xl bg-secondary/50 p-4">
                    <div className="mb-2 text-sm text-muted-foreground">Connector Type</div>
                    <div className="font-semibold text-foreground">
                      {charger.chargerType === 'Fast' ? 'CCS2 / CHAdeMO' : 'Type 2 AC'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Availability Schedule */}
            <Card className="border-border bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  Available Time Slots
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {charger.availableSlots.map((slot, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="bg-success/10 text-success border-success/20 py-2 px-4"
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {slot}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card className={`border-border shadow-card ${charger.emergencySupport ? 'ring-2 ring-emergency/30' : ''}`}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <IndianRupee className="h-5 w-5 text-primary" />
                  Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 text-center">
                  <div className="text-3xl font-bold text-primary">
                    ₹{charger.pricePerHour}
                  </div>
                  <div className="text-sm text-muted-foreground">per hour</div>
                </div>

                <div className="space-y-3">
                  <Button 
                    variant={charger.emergencySupport ? 'emergency' : 'hero'} 
                    size="lg" 
                    className="w-full gap-2"
                    onClick={() => navigate(`/billing?chargerId=${charger.id}`)}
                  >
                    <Zap className="h-5 w-5" />
                    Request Charging
                  </Button>
                  <Button variant="outline" size="lg" className="w-full gap-2">
                    <Navigation className="h-5 w-5" />
                    Navigate to Home
                  </Button>
                </div>

                {charger.emergencySupport && (
                  <div className="rounded-xl border border-emergency/20 bg-emergency/5 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-emergency">
                      <AlertTriangle className="h-4 w-4" />
                      Emergency Charging Available
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      This charger is available for emergency situations. 
                      Priority support for stranded EV owners.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Owner Contact */}
            <Card className="border-border bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="h-5 w-5 text-primary" />
                  Contact Owner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+91 98XXX XXXXX</span>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>Contact via App</span>
                </Button>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <Card className="border-border bg-gradient-card shadow-card">
              <CardContent className="py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                    <Shield className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Verified Charger</div>
                    <div className="text-xs text-muted-foreground">
                      Safety inspected & community verified
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargerDetails;
