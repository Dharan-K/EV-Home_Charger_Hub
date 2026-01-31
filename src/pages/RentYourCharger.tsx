import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Zap, 
  Home, 
  IndianRupee, 
  Clock, 
  MapPin,
  User,
  AlertTriangle,
  CheckCircle2,
  Shield,
  Users,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';

const RentYourCharger = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    location: '',
    chargerType: 'Normal',
    powerOutput: '',
    pricePerHour: '',
    timeSlots: [] as string[],
    emergencySupport: false
  });

  const timeSlotOptions = [
    '6:00 AM - 9:00 AM',
    '9:00 AM - 12:00 PM',
    '12:00 PM - 3:00 PM',
    '3:00 PM - 6:00 PM',
    '6:00 PM - 9:00 PM',
    '9:00 PM - 12:00 AM',
    '24/7 Available'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Charger listing submitted successfully!', {
      description: 'Your home charger will be reviewed and listed within 24 hours.'
    });
  };

  const benefits = [
    {
      icon: IndianRupee,
      title: 'Earn Extra Income',
      description: 'Make money from your idle home charger when you\'re not using it.'
    },
    {
      icon: Users,
      title: 'Help Fellow EV Owners',
      description: 'Be part of a community supporting the EV revolution in India.'
    },
    {
      icon: Shield,
      title: 'Safe & Insured',
      description: 'All transactions are secured with insurance coverage.'
    },
    {
      icon: TrendingUp,
      title: 'Flexible Scheduling',
      description: 'You control when your charger is available for sharing.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero px-4 py-12 md:py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        </div>
        
        <div className="container relative mx-auto">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <Home className="h-4 w-4" />
              <span>Share Your Charger, Earn Rewards</span>
            </div>
            
            <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              List Your Home Charger
            </h1>
            
            <p className="text-muted-foreground">
              Turn your home EV charger into a source of income. 
              Help fellow EV owners while earning money when you're not charging.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form Section */}
          <div className="lg:col-span-3">
            <Card className="border-border bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Charger Details
                </CardTitle>
                <CardDescription>
                  Fill in the details about your home charger to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Owner Name */}
                  <div className="space-y-2">
                    <Label htmlFor="ownerName" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Owner Name
                    </Label>
                    <Input
                      id="ownerName"
                      placeholder="Enter your full name"
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      House Location
                    </Label>
                    <Input
                      id="location"
                      placeholder="Enter your complete address"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>

                  {/* Charger Type */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      Charger Type
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, chargerType: 'Normal' })}
                        className={`rounded-xl border-2 p-4 text-left transition-all ${
                          formData.chargerType === 'Normal'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="mb-2 font-semibold text-foreground">Normal</div>
                        <div className="text-sm text-muted-foreground">AC Charging (3.3 - 22 kW)</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, chargerType: 'Fast' })}
                        className={`rounded-xl border-2 p-4 text-left transition-all ${
                          formData.chargerType === 'Fast'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="mb-2 font-semibold text-foreground">Fast</div>
                        <div className="text-sm text-muted-foreground">DC Fast Charging (25+ kW)</div>
                      </button>
                    </div>
                  </div>

                  {/* Power Output */}
                  <div className="space-y-2">
                    <Label htmlFor="powerOutput" className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      Power Output (kW)
                    </Label>
                    <Input
                      id="powerOutput"
                      type="number"
                      placeholder="e.g., 7.4, 22, 50"
                      value={formData.powerOutput}
                      onChange={(e) => setFormData({ ...formData, powerOutput: e.target.value })}
                    />
                  </div>

                  {/* Price per Hour */}
                  <div className="space-y-2">
                    <Label htmlFor="pricePerHour" className="flex items-center gap-2">
                      <IndianRupee className="h-4 w-4 text-primary" />
                      Price per Hour (₹)
                    </Label>
                    <Input
                      id="pricePerHour"
                      type="number"
                      placeholder="e.g., 80, 150, 250"
                      value={formData.pricePerHour}
                      onChange={(e) => setFormData({ ...formData, pricePerHour: e.target.value })}
                    />
                  </div>

                  {/* Available Time Slots */}
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Available Time Slots
                    </Label>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                      {timeSlotOptions.map((slot) => (
                        <label
                          key={slot}
                          className={`flex cursor-pointer items-center gap-2 rounded-lg border-2 p-3 text-sm transition-all ${
                            formData.timeSlots.includes(slot)
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <Checkbox
                            checked={formData.timeSlots.includes(slot)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({ ...formData, timeSlots: [...formData.timeSlots, slot] });
                              } else {
                                setFormData({ 
                                  ...formData, 
                                  timeSlots: formData.timeSlots.filter((s) => s !== slot) 
                                });
                              }
                            }}
                          />
                          <span className="text-foreground">{slot}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Emergency Support */}
                  <div className="rounded-xl border-2 border-emergency/20 bg-emergency/5 p-4">
                    <label className="flex cursor-pointer items-start gap-3">
                      <Checkbox
                        checked={formData.emergencySupport}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, emergencySupport: checked as boolean })
                        }
                        className="mt-1"
                      />
                      <div>
                        <div className="flex items-center gap-2 font-medium text-foreground">
                          <AlertTriangle className="h-4 w-4 text-emergency" />
                          Enable Emergency Support
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Allow stranded EV owners to request charging during emergencies. 
                          You'll receive priority notifications and earn bonus rewards.
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" variant="hero" size="lg" className="w-full gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Submit Charger Listing
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Sidebar */}
          <div className="space-y-6 lg:col-span-2">
            <Card className="border-border bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Why List Your Charger?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div 
                      key={index} 
                      className="flex items-start gap-3 rounded-lg bg-secondary/50 p-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{benefit.title}</div>
                        <div className="text-sm text-muted-foreground">{benefit.description}</div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Earnings Estimate */}
            <Card className="border-primary/20 bg-primary/5 shadow-card">
              <CardContent className="py-6">
                <div className="mb-4 text-center">
                  <div className="text-sm text-muted-foreground">Potential Monthly Earnings</div>
                  <div className="text-4xl font-bold text-primary">₹8,000+</div>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Average charges/month</span>
                    <span className="font-medium text-foreground">40-60</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average earning/charge</span>
                    <span className="font-medium text-foreground">₹150-200</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badge */}
            <div className="flex items-center gap-3 rounded-xl border border-success/20 bg-success/5 p-4">
              <Shield className="h-8 w-8 text-success" />
              <div>
                <div className="font-medium text-foreground">100% Secure</div>
                <div className="text-sm text-muted-foreground">
                  All listings are verified and insured
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentYourCharger;
