import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  MapPin, 
  Users, 
  Shield, 
  Clock, 
  ChevronRight,
  AlertTriangle,
  Home
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Find Nearby Stations',
      description: 'Locate public and private charging stations near your location instantly.'
    },
    {
      icon: Users,
      title: 'Peer-to-Peer Sharing',
      description: 'Rent your home charger to other EV owners or find home chargers in emergencies.'
    },
    {
      icon: Shield,
      title: 'Verified Chargers',
      description: 'All chargers are verified for safety and rated by the community.'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Access charging stations anytime with real-time availability updates.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero px-4 py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        </div>
        
        <div className="container relative mx-auto">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <Zap className="h-4 w-4" />
              <span>India's First P2P EV Charging Network</span>
            </div>
            
            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl">
              Find Charging Stations.{' '}
              <span className="text-gradient">Share Your Charger.</span>
            </h1>
            
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Never run out of charge again. Find public stations or tap into our 
              community network of home chargers for emergency charging needs.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/home-chargers">
                <Button variant="hero" size="xl" className="w-full gap-2 sm:w-auto">
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Charging
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/rent-your-charger">
                <Button variant="outline" size="xl" className="w-full gap-2 sm:w-auto">
                  <Home className="h-5 w-5" />
                  List Your Charger
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: '5,000+', label: 'Charging Stations' },
              { value: '2,500+', label: 'Home Chargers' },
              { value: '50,000+', label: 'Active Users' },
              { value: '98%', label: 'Satisfaction Rate' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="animate-fade-in text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl font-bold text-primary md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Why Choose EVCharge?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Join the revolution in EV charging. Our platform connects EV owners 
              with charging solutions, anywhere, anytime.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="animate-fade-in group rounded-2xl border border-border bg-gradient-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency CTA Section */}
      <section className="relative overflow-hidden px-4 py-16">
        <div className="absolute inset-0 bg-gradient-emergency opacity-5" />
        <div className="container relative mx-auto">
          <div className="mx-auto max-w-3xl rounded-3xl border border-emergency/20 bg-card p-8 text-center shadow-lg md:p-12">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-emergency/10 p-4">
              <AlertTriangle className="h-8 w-8 text-emergency" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
              Running Low on Charge?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
              Find emergency home chargers near you. Our community of EV owners 
              is ready to help you get back on the road.
            </p>
            <Link to="/home-chargers">
              <Button variant="emergency" size="xl" className="gap-2">
                <Zap className="h-5 w-5" />
                Find Emergency Charging Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 py-12">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                EV<span className="text-gradient">Charge</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 EVCharge. Powering India's EV Revolution.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
