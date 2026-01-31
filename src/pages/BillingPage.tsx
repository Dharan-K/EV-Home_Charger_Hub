import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { homeChargers } from '@/data/homeChargers';
import {
  CreditCard,
  Clock,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

interface ChargingSession {
  chargerId: string;
  chargerOwner: string;
  location: string;
  pricePerHour: number;
  estimatedHours: number;
  totalCost: number;
  timestamp: string;
}

const BillingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const chargerId = searchParams.get('chargerId');

  const charger = homeChargers.find((c) => c.id === chargerId);
  const [estimatedHours, setEstimatedHours] = useState(2);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!charger) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-md mx-auto mt-8">
          <Card>
            <CardContent className="pt-8 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-gray-700 mb-4">Charger not found</p>
              <Button
                onClick={() => navigate('/home-chargers')}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Back to Chargers
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const totalCost = charger.pricePerHour * estimatedHours;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!cardNumber || !cardName || !cardExpiry || !cardCVV) {
      alert('Please fill in all card details');
      return;
    }

    if (cardNumber.replace(/\s/g, '').length !== 16) {
      alert('Card number must be 16 digits');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setPaymentSuccess(true);

      // Store charging session
      const session: ChargingSession = {
        chargerId: charger.id,
        chargerOwner: charger.ownerName,
        location: charger.location,
        pricePerHour: charger.pricePerHour,
        estimatedHours,
        totalCost,
        timestamp: new Date().toISOString(),
      };

      // Store in localStorage
      localStorage.setItem('chargingSession', JSON.stringify(session));

      // Redirect to verification page after 2 seconds
      setTimeout(() => {
        navigate('/charging-verification');
      }, 2000);
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Billing & Payment</h1>
          <p className="text-gray-600">Complete your payment to book this charger</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Charger Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-2xl">📍</span> Charger Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Owner</p>
                <p className="text-lg font-semibold text-gray-900">
                  {charger.ownerName}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="text-gray-900">{charger.location}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Charger Type</p>
                  <Badge variant="secondary" className="mt-1">
                    {charger.chargerType}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Power Output</p>
                  <p className="font-semibold text-gray-900">
                    {charger.powerOutput}kW
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 mb-2">Price</p>
                <p className="text-3xl font-bold text-green-600">
                  ₹{charger.pricePerHour}
                  <span className="text-base text-gray-600 font-normal">/hour</span>
                </p>
              </div>

              <Badge className="w-full justify-center py-2 bg-green-100 text-green-800 hover:bg-green-100">
                <CheckCircle className="h-4 w-4 mr-2" />
                Safety Inspected & Community Verified
              </Badge>
            </CardContent>
          </Card>

          {/* Payment Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              {!paymentSuccess ? (
                <form onSubmit={handlePayment} className="space-y-4">
                  {/* Booking Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="inline h-4 w-4 mr-2" />
                      Estimated Charging Hours
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="12"
                      value={estimatedHours}
                      onChange={(e) => setEstimatedHours(parseInt(e.target.value) || 1)}
                      className="border-green-300"
                    />
                  </div>

                  {/* Cost Breakdown */}
                  <div className="bg-green-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        ₹{charger.pricePerHour} × {estimatedHours} hour
                        {estimatedHours > 1 ? 's' : ''}
                      </span>
                      <span className="font-semibold text-gray-900">
                        ₹{(charger.pricePerHour * estimatedHours).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-green-200 pt-2">
                      <span className="text-gray-600">GST (18%)</span>
                      <span className="font-semibold text-gray-900">
                        ₹{(totalCost * 0.18).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t border-green-300 pt-2 mt-2">
                      <span>Total Amount</span>
                      <span className="text-green-600">₹{(totalCost * 1.18).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <CreditCard className="inline h-4 w-4 mr-2" />
                      Card Number
                    </label>
                    <Input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(formatCardNumber(e.target.value))
                      }
                      maxLength={19}
                      className="border-green-300 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="border-green-300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <Input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) =>
                          setCardExpiry(formatExpiry(e.target.value))
                        }
                        maxLength={5}
                        className="border-green-300 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <Input
                        type="password"
                        placeholder="123"
                        value={cardCVV}
                        onChange={(e) =>
                          setCardCVV(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))
                        }
                        maxLength={4}
                        className="border-green-300"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 text-lg"
                  >
                    {isProcessing ? 'Processing Payment...' : 'Pay & Confirm'}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/home-chargers')}
                    className="w-full border-green-300 text-green-700 hover:bg-green-50"
                  >
                    Cancel
                  </Button>
                </form>
              ) : (
                <div className="space-y-4 text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
                  <div>
                    <p className="text-xl font-semibold text-gray-900 mb-2">
                      Payment Successful!
                    </p>
                    <p className="text-gray-600 mb-4">
                      Generating your verification QR code...
                    </p>
                  </div>
                  <div className="animate-pulse bg-green-100 h-2 rounded-full"></div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        {!paymentSuccess && (
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <p className="text-sm text-blue-900">
                <strong>Test Card Details:</strong> Use 4532 1234 5678 9010 with any future
                expiry date and any 3-digit CVV for testing.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BillingPage;
