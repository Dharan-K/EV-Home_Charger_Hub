import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG as QRCode } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Download,
  Copy,
  CheckCircle,
  AlertCircle,
  Home,
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

const ChargingVerification = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<ChargingSession | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [copied2, setCopied2] = useState(false);

  useEffect(() => {
    // Retrieve charging session from localStorage
    const savedSession = localStorage.getItem('chargingSession');
    if (savedSession) {
      const parsedSession = JSON.parse(savedSession);
      setSession(parsedSession);

      // Generate a unique verification code based on charger ID and timestamp
      const code = `CHG-${parsedSession.chargerId.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
      setVerificationCode(code);
    } else {
      // No active session, redirect to home chargers
      setTimeout(() => {
        navigate('/home-chargers');
      }, 2000);
    }
  }, [navigate]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(verificationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyOwnerContact = () => {
    const ownerContact = `Please contact ${session?.chargerOwner} at the charger location: ${session?.location}`;
    navigator.clipboard.writeText(ownerContact);
    setCopied2(true);
    setTimeout(() => setCopied2(false), 2000);
  };

  const handleDownloadQR = () => {
    const qrCode = document.querySelector('canvas');
    if (qrCode) {
      const url = qrCode.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `charging-verification-${verificationCode}.png`;
      link.href = url;
      link.click();
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-8 text-center">
            <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <p className="text-gray-700 mb-4">Redirecting you...</p>
            <div className="animate-pulse bg-green-100 h-2 rounded-full"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const qrValue = JSON.stringify({
    code: verificationCode,
    chargerId: session.chargerId,
    chargerOwner: session.chargerOwner,
    location: session.location,
    timestamp: session.timestamp,
    estimatedHours: session.estimatedHours,
    totalCost: (session.totalCost * 1.18).toFixed(2),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Charging Verified!
          </h1>
          <p className="text-gray-600 text-lg">
            Your payment is confirmed. Use this QR code to verify at the charger
            location.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* QR Code Section */}
          <Card className="flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="text-center">Verification QR Code</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              {/* QR Code */}
              <div className="bg-white p-6 rounded-xl border-4 border-green-200 shadow-lg">
                <QRCode
                  value={qrValue}
                  size={256}
                  level="H"
                  includeMargin={true}
                  fgColor="#16a34a"
                  bgColor="#ffffff"
                />
              </div>

              {/* Verification Code */}
              <div className="w-full">
                <p className="text-sm text-gray-600 mb-2 font-medium">
                  Verification Code
                </p>
                <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg border border-gray-300">
                  <code className="flex-1 font-mono text-sm font-bold text-gray-900">
                    {verificationCode}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCopyCode}
                    className="hover:bg-gray-200"
                  >
                    {copied ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Download Button */}
              <Button
                onClick={handleDownloadQR}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                <Download className="h-4 w-4 mr-2" />
                Download QR Code
              </Button>
            </CardContent>
          </Card>

          {/* Session Details */}
          <div className="space-y-4">
            {/* Charger Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Charger Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Charger Owner</p>
                  <p className="font-semibold text-gray-900">{session.chargerOwner}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="text-gray-900">{session.location}</p>
                </div>

                <Badge className="w-full justify-center py-2 bg-green-100 text-green-800 hover:bg-green-100">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Payment Verified
                </Badge>
              </CardContent>
            </Card>

            {/* Booking Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Charging Duration</p>
                  <p className="font-semibold text-gray-900">
                    {session.estimatedHours} hour
                    {session.estimatedHours > 1 ? 's' : ''}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Price per Hour</p>
                  <p className="font-semibold text-gray-900">₹{session.pricePerHour}</p>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600">Total Amount (incl. GST)</p>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{(session.totalCost * 1.18).toFixed(2)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Booking ID</p>
                  <p className="text-xs font-mono text-gray-600">
                    {new Date(session.timestamp).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg">What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-700">
                <div className="flex gap-3">
                  <span className="font-bold text-blue-600 min-w-fit">1.</span>
                  <p>
                    Show this QR code to the charger owner or scan it at the charging
                    station
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-blue-600 min-w-fit">2.</span>
                  <p>
                    Use the verification code <code className="bg-white px-2 py-1 rounded font-mono text-xs">{verificationCode}</code> if scanning isn't possible
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-blue-600 min-w-fit">3.</span>
                  <p>
                    The charger will be activated for your vehicle for the booked duration
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-blue-600 min-w-fit">4.</span>
                  <p>You can contact the owner using the details below if needed</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Owner */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Charger Owner</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <a href={`tel:+919876543210`} className="flex items-center w-full">
                    <span>📞 Call Owner</span>
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-green-300 text-green-700 hover:bg-green-50"
                  onClick={handleCopyOwnerContact}
                >
                  {copied2 ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Contact Info
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <Button
            onClick={() => navigate('/home-chargers')}
            variant="outline"
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Home Chargers
          </Button>
          <Button
            onClick={() => navigate('/all-stations')}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            View All Stations
          </Button>
        </div>

        {/* Important Note */}
        <Card className="mt-8 bg-amber-50 border-amber-200">
          <CardContent className="pt-6 text-sm text-amber-900">
            <p className="font-semibold mb-2">⚠️ Important</p>
            <ul className="list-disc list-inside space-y-1">
              <li>This QR code is valid for your booked duration only</li>
              <li>
                Keep this page open or download the QR code to show at the charger
              </li>
              <li>The verification code is unique and non-transferable</li>
              <li>Contact the charger owner in case of any issues</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChargingVerification;
