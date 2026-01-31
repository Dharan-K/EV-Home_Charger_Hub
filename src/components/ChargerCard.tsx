import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { HomeCharger, getDistanceFromUser } from '@/data/homeChargers';
import { 
  MapPin, 
  Zap, 
  Clock, 
  Star, 
  AlertTriangle,
  Navigation
} from 'lucide-react';

interface ChargerCardProps {
  charger: HomeCharger;
  index: number;
}

const ChargerCard = ({ charger, index }: ChargerCardProps) => {
  const distance = getDistanceFromUser(charger.id);
  
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
    <Card 
      className={`group overflow-hidden border-border bg-gradient-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        charger.emergencySupport ? 'ring-2 ring-emergency/30' : ''
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarImage src={charger.profilePic} alt={charger.ownerName} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {getInitials(charger.ownerName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">{charger.ownerName}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                <span>{charger.rating}</span>
                <span className="mx-1">•</span>
                <span>{charger.totalCharges} charges</span>
              </div>
            </div>
          </div>
          {charger.emergencySupport && (
            <Badge className="bg-gradient-emergency text-emergency-foreground animate-pulse-slow border-0 gap-1">
              <AlertTriangle className="h-3 w-3" />
              Emergency
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pb-4">
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>{charger.location}</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-secondary/50 p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Zap className="h-3.5 w-3.5" />
              <span>Charger Type</span>
            </div>
            <p className="mt-1 font-semibold text-foreground">
              {charger.chargerType} • {charger.powerOutput}kW
            </p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>Price</span>
            </div>
            <p className="mt-1 font-semibold text-primary">
              ₹{charger.pricePerHour}/hr
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className={getAvailabilityColor(charger.availability)}>
            {charger.availability}
          </Badge>
          <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
            <Navigation className="h-3.5 w-3.5" />
            {distance} km away
          </span>
        </div>
      </CardContent>

      <CardFooter className="gap-2 border-t border-border bg-secondary/30 pt-4">
        <Link to={`/home-chargers/${charger.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        <Button 
          variant={charger.emergencySupport ? 'emergency' : 'default'}
          className="flex-1"
        >
          <Navigation className="h-4 w-4" />
          Navigate
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChargerCard;
