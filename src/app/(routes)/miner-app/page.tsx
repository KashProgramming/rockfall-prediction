"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Camera, MapPin, Bell, Phone, AlertTriangle, Home, User, Settings, Send, Shield, CheckCircle } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
}

interface Alert {
  id: string;
  zone: string;
  zoneHi: string;
  zoneMr: string;
  risk: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  messageHi: string;
  messageMr: string;
  time: string;
  location?: Location;
}

interface Mine {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
}

interface Translations {
  en: { [key: string]: string };
  hi: { [key: string]: string };
  mr: { [key: string]: string };
}

const translations: Translations = {
  en: {
    appTitle: "Mine Safety Alert",
    selectMine: "Select Mine",
    phoneNumber: "Phone Number",
    enterOtp: "Enter OTP",
    login: "Login",
    sendOtp: "Send OTP",
    verifyOtp: "Verify OTP",
    home: "Home",
    alerts: "Alerts",
    profile: "Profile",
    settings: "Settings",
    safetyStatus: "Safety Status",
    currentLocation: "Current Location",
    enableLocation: "Enable Location",
    reportIncident: "Report Incident",
    takePhoto: "Take Photo",
    emergencyContact: "Emergency Contact",
    riskLevels: "Risk Levels",
    low: "Low",
    medium: "Medium",
    high: "High",
    critical: "Critical",
    noAlerts: "No active alerts",
    locationEnabled: "Location Enabled",
    locationDisabled: "Location Disabled",
    photoTaken: "Photo with location sent successfully",
    language: "Language",
    english: "English",
    hindi: "हिंदी",
    marathi: "मराठी",
    logout: "Logout",
    welcome: "Welcome",
    stayAlert: "Stay Alert, Stay Safe",
    crack: "Crack Detected",
    reportCrack: "Report Crack",
    sendReport: "Send Report",
    description: "Description",
    optional: "(Optional)"
  },
  hi: {
    appTitle: "खान सुरक्षा अलर्ट",
    selectMine: "खान चुनें",
    phoneNumber: "फ़ोन नंबर",
    enterOtp: "OTP दर्ज करें",
    login: "लॉगिन",
    sendOtp: "OTP भेजें",
    verifyOtp: "OTP सत्यापित करें",
    home: "होम",
    alerts: "अलर्ट",
    profile: "प्रोफ़ाइल",
    settings: "सेटिंग्स",
    safetyStatus: "सुरक्षा स्थिति",
    currentLocation: "वर्तमान स्थान",
    enableLocation: "स्थान सक्षम करें",
    reportIncident: "घटना रिपोर्ट करें",
    takePhoto: "फोटो लें",
    emergencyContact: "आपातकालीन संपर्क",
    riskLevels: "जोखिम स्तर",
    low: "कम",
    medium: "मध्यम",
    high: "उच्च",
    critical: "गंभीर",
    noAlerts: "कोई सक्रिय अलर्ट नहीं",
    locationEnabled: "स्थान सक्षम",
    locationDisabled: "स्थान अक्षम",
    photoTaken: "स्थान के साथ फोटो सफलतापूर्वक भेजी गई",
    language: "भाषा",
    english: "English",
    hindi: "हिंदी",
    marathi: "मराठी",
    logout: "लॉगआउट",
    welcome: "स्वागत है",
    stayAlert: "सचेत रहें, सुरक्षित रहें",
    crack: "दरार का पता चला",
    reportCrack: "दरार रिपोर्ट करें",
    sendReport: "रिपोर्ट भेजें",
    description: "विवरण",
    optional: "(वैकल्पिक)"
  },
  mr: {
    appTitle: "खाण सुरक्षा सतर्कता",
    selectMine: "खाण निवडा",
    phoneNumber: "फोन नंबर",
    enterOtp: "OTP टाका",
    login: "लॉगिन",
    sendOtp: "OTP पाठवा",
    verifyOtp: "OTP सत्यापित करा",
    home: "होम",
    alerts: "अलर्ट",
    profile: "प्रोफाइल",
    settings: "सेटिंग्स",
    safetyStatus: "सुरक्षा स्थिती",
    currentLocation: "सध्याचे स्थान",
    enableLocation: "स्थान सक्षम करा",
    reportIncident: "घटना नोंदवा",
    takePhoto: "फोटो घ्या",
    emergencyContact: "आपत्कालीन संपर्क",
    riskLevels: "जोखीम पातळ्या",
    low: "कमी",
    medium: "मध्यम",
    high: "उच्च",
    critical: "गंभीर",
    noAlerts: "कोणतेही सक्रिय अलर्ट नाहीत",
    locationEnabled: "स्थान सक्षम",
    locationDisabled: "स्थान अक्षम",
    photoTaken: "स्थानासह फोटो यशस्वीरित्या पाठवला",
    language: "भाषा",
    english: "English",
    hindi: "हिंदी",
    marathi: "मराठी",
    logout: "लॉगआउट",
    welcome: "स्वागत आहे",
    stayAlert: "सतर्क रहा, सुरक्षित रहा",
    crack: "भेगा आढळली",
    reportCrack: "भेगा नोंदवा",
    sendReport: "अहवाल पाठवा",
    description: "वर्णन",
    optional: "(पर्यायी)"
  }
};

const mines: Mine[] = [
  { id: '1', name: 'Raipur Coal Mine', nameHi: 'रायपुर कोल माइन', nameMr: 'रायपूर कोळसा खाण' },
  { id: '2', name: 'Jharia Coal Mine', nameHi: 'झरिया कोल माइन', nameMr: 'झरिया कोळसा खाण' },
  { id: '3', name: 'Singareni Mine', nameHi: 'सिंगरेनी माइन', nameMr: 'सिंगरेनी खाण' }
];

const mockAlerts: Alert[] = [
  {
    id: '1',
    zone: 'Zone A-04',
    zoneHi: 'क्षेत्र ए-04',
    zoneMr: 'क्षेत्र ए-04',
    risk: 'high',
    message: 'Slope instability detected. Avoid area immediately.',
    messageHi: 'ढलान अस्थिरता का पता चला। तुरंत क्षेत्र से बचें।',
    messageMr: 'उतार अस्थिरता आढळली. ताबडतोब क्षेत्र टाळा.',
    time: '2 min ago',
    location: { lat: 23.7748, lng: 86.4324 }
  },
  {
    id: '2',
    zone: 'Zone B-12',
    zoneHi: 'क्षेत्र बी-12',
    zoneMr: 'क्षेत्र बी-12',
    risk: 'medium',
    message: 'Increased vibrations detected.',
    messageHi: 'बढ़े हुए कंपन का पता चला।',
    messageMr: 'वाढलेले कंपन आढळले.',
    time: '15 min ago'
  },
  {
    id: '3',
    zone: 'Zone C-08',
    zoneHi: 'क्षेत्र सी-08',
    zoneMr: 'क्षेत्र सी-08',
    risk: 'low',
    message: 'Normal monitoring parameters.',
    messageHi: 'सामान्य निगरानी मापदंड।',
    messageMr: 'सामान्य निरीक्षण पॅरामीटर्स.',
    time: '1 hour ago'
  }
];

const MinerSafetyApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'otp' | 'dashboard'>('login');
  const [selectedMine, setSelectedMine] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'home' | 'alerts' | 'profile' | 'settings'>('home');
  const [language, setLanguage] = useState<'en' | 'hi' | 'mr'>('en');
  const [locationEnabled, setLocationEnabled] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [alerts] = useState<Alert[]>(mockAlerts);
  const [showPhotoModal, setShowPhotoModal] = useState<boolean>(false);
  const [reportDescription, setReportDescription] = useState<string>('');
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [photoLocation, setPhotoLocation] = useState<Location | null>(null);
  const [isCapturingPhoto, setIsCapturingPhoto] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const t = translations[language];

  const sendOtp = () => {
    if (phoneNumber.length === 10 && selectedMine) {
      setCurrentScreen('otp');
      // Mock OTP send - in real app, send actual OTP
    }
  };

  const verifyOtp = () => {
    if (otp === '1234') { // Mock OTP verification
      setCurrentScreen('dashboard');
    }
  };

  const enableLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationEnabled(true);
        },
        (error) => {
          console.error('Location error:', error);
          // Mock location for demo
          setCurrentLocation({ lat: 23.7748, lng: 86.4324 });
          setLocationEnabled(true);
        }
      );
    } else {
      // Mock location for demo
      setCurrentLocation({ lat: 23.7748, lng: 86.4324 });
      setLocationEnabled(true);
    }
  };

  const getMineName = (mine: Mine) => {
    switch (language) {
      case 'hi': return mine.nameHi;
      case 'mr': return mine.nameMr;
      default: return mine.name;
    }
  };

  const startCamera = async () => {
    try {
      setIsCapturingPhoto(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Camera access error:', error);
      alert('Cannot access camera. Please allow camera permission.');
      setIsCapturingPhoto(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCapturingPhoto(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Get current location for geotagging
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              setPhotoLocation(location);
              
              // Convert canvas to base64
              const photoDataUrl = canvas.toDataURL('image/jpeg', 0.8);
              setCapturedPhoto(photoDataUrl);
              stopCamera();
            },
            (error) => {
              console.error('Location error:', error);
              // Use current location if available, otherwise mock
              setPhotoLocation(currentLocation || { lat: 23.7748, lng: 86.4324 });
              const photoDataUrl = canvas.toDataURL('image/jpeg', 0.8);
              setCapturedPhoto(photoDataUrl);
              stopCamera();
            }
          );
        } else {
          setPhotoLocation(currentLocation || { lat: 23.7748, lng: 86.4324 });
          const photoDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setCapturedPhoto(photoDataUrl);
          stopCamera();
        }
      }
    }
  };

  const submitReport = () => {
    if (capturedPhoto && photoLocation) {
      // Create geotagged photo report
      const reportData = {
        photo: capturedPhoto,
        location: photoLocation,
        description: reportDescription,
        timestamp: new Date().toISOString(),
        zone: selectedMine
      };
      
      // Simulate report submission
      console.log('Report submitted:', reportData);
      alert(`${t.photoTaken}\n📍 ${photoLocation.lat.toFixed(6)}, ${photoLocation.lng.toFixed(6)}`);
      
      // Reset form
      setCapturedPhoto(null);
      setPhotoLocation(null);
      setReportDescription('');
      setShowPhotoModal(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-500 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-500 bg-gray-50 border-gray-200';
    }
  };

  const getZoneName = (alert: Alert) => {
    switch (language) {
      case 'hi': return alert.zoneHi;
      case 'mr': return alert.zoneMr;
      default: return alert.zone;
    }
  };

  const getAlertMessage = (alert: Alert) => {
    switch (language) {
      case 'hi': return alert.messageHi;
      case 'mr': return alert.messageMr;
      default: return alert.message;
    }
  };

  if (currentScreen === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-800 flex items-center justify-center p-4 text-black">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
          <div className="text-center mb-8">
            <Shield className="mx-auto h-16 w-16 text-blue-600 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">{t.appTitle}</h1>
          </div>

          {/* Language Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.language}</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'hi' | 'mr')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="en">{t.english}</option>
              <option value="hi">{t.hindi}</option>
              <option value="mr">{t.marathi}</option>
            </select>
          </div>

          {/* Mine Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.selectMine}</label>
            <select
              value={selectedMine}
              onChange={(e) => setSelectedMine(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">{t.selectMine}</option>
              {mines.map((mine) => (
                <option key={mine.id} value={mine.id}>{getMineName(mine)}</option>
              ))}
            </select>
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.phoneNumber}</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                +91
              </span>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="flex-1 p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="9876543210"
                maxLength={10}
              />
            </div>
          </div>

          <button
            onClick={sendOtp}
            disabled={!selectedMine || phoneNumber.length !== 10}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            {t.sendOtp}
          </button>
        </div>
      </div>
    );
  }

  if (currentScreen === 'otp') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
          <div className="text-center mb-8">
            <Shield className="mx-auto h-16 w-16 text-blue-600 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">{t.enterOtp}</h1>
            <p className="text-gray-600 mt-2">OTP: 1234 {t.optional}</p>
          </div>

          <div className="mb-6">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-2xl tracking-widest text-black"
              placeholder="****"
              maxLength={4}
            />
          </div>

          <button
            onClick={verifyOtp}
            disabled={otp.length !== 4}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors mb-4"
          >
            {t.verifyOtp}
          </button>

          <button
            onClick={() => setCurrentScreen('login')}
            className="w-full text-blue-600 py-2 text-sm"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">{t.appTitle}</h1>
          <div className="flex items-center space-x-2">
            <Bell className="h-6 w-6" />
            <span className="bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {alerts.filter(a => a.risk === 'high' || a.risk === 'critical').length}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-20">
        {activeTab === 'home' && (
          <div>
            <div className="bg-white rounded-lg p-4 mb-4 shadow">
              <h2 className="text-lg font-semibold mb-2 text-black">{t.welcome}</h2>
              <p className="text-gray-600 mb-4">{t.stayAlert}</p>
              
              {/* Safety Status */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${locationEnabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    <MapPin className="h-4 w-4 mr-1" />
                    {locationEnabled ? t.locationEnabled : t.locationDisabled}
                  </div>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    <Shield className="h-4 w-4 mr-1" />
                    {t.safetyStatus}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={enableLocation}
                  disabled={locationEnabled}
                  className="bg-blue-500 text-white p-3 rounded-lg flex flex-col items-center disabled:bg-gray-400"
                >
                  <MapPin className="h-6 w-6 mb-1" />
                  <span className="text-sm">{t.enableLocation}</span>
                </button>
                
                <button
                  onClick={() => setShowPhotoModal(true)}
                  className="bg-green-500 text-white p-3 rounded-lg flex flex-col items-center"
                >
                  <Camera className="h-6 w-6 mb-1" />
                  <span className="text-sm">{t.reportCrack}</span>
                </button>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-red-800">{t.emergencyContact}</h3>
                  <p className="text-red-600">108 / 102</p>
                </div>
                <Phone className="h-8 w-8 text-red-600" />
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="font-semibold mb-3 text-black">{t.alerts}</h3>
              {alerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className={`border rounded-lg p-3 mb-2 ${getRiskColor(alert.risk)}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{getZoneName(alert)}</span>
                    <span className="text-xs">{alert.time}</span>
                  </div>
                  <p className="text-sm">{getAlertMessage(alert)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-black">{t.alerts}</h2>
            {alerts.length > 0 ? alerts.map((alert) => (
              <div key={alert.id} className={`border rounded-lg p-4 mb-4 ${getRiskColor(alert.risk)}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    <span className="font-semibold">{getZoneName(alert)}</span>
                  </div>
                  <span className="text-xs uppercase font-medium">{t[alert.risk as keyof typeof t]}</span>
                </div>
                <p className="mb-2">{getAlertMessage(alert)}</p>
                <div className="flex items-center justify-between text-sm">
                  <span>{alert.time}</span>
                  {alert.location && (
                    <span>📍 {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}</span>
                  )}
                </div>
              </div>
            )) : (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <p className="text-gray-600">{t.noAlerts}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-black">{t.settings}</h2>
            
            <div className="bg-white rounded-lg p-4 mb-4 shadow">
              <h3 className="font-semibold mb-3 text-black">{t.language}</h3>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'hi' | 'mr')}
                className="w-full p-3 border border-gray-300 rounded-lg text-black"
              >
                <option value="en">{t.english}</option>
                <option value="hi">{t.hindi}</option>
                <option value="mr">{t.marathi}</option>
              </select>
            </div>

            <button
              onClick={() => setCurrentScreen('login')}
              className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold"
            >
              {t.logout}
            </button>
          </div>
        )}
      </div>

      {/* Photo Report Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">{t.reportCrack}</h3>
            
            {!isCapturingPhoto && !capturedPhoto && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.description} {t.optional}
                  </label>
                  <textarea
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                    rows={3}
                    placeholder="Describe what you see..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={startCamera}
                    disabled={!locationEnabled}
                    className="bg-blue-500 text-white p-3 rounded-lg disabled:bg-gray-400 flex items-center justify-center"
                  >
                    <Camera className="h-5 w-5 mr-1" />
                    {t.takePhoto}
                  </button>
                  
                  <button
                    onClick={() => setShowPhotoModal(false)}
                    className="bg-gray-500 text-white p-3 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>

                {!locationEnabled && (
                  <p className="text-sm text-red-600 mt-2 text-center">
                    Please enable location first
                  </p>
                )}
              </>
            )}

            {/* Camera View */}
            {isCapturingPhoto && (
              <div className="text-center">
                <video
                  ref={videoRef}
                  className="w-full rounded-lg mb-4 max-h-64 object-cover"
                  playsInline
                  muted
                />
                <canvas ref={canvasRef} className="hidden" />
                
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={capturePhoto}
                    className="bg-green-500 text-white p-3 rounded-lg flex items-center justify-center"
                  >
                    <Camera className="h-5 w-5 mr-1" />
                    Capture
                  </button>
                  
                  <button
                    onClick={stopCamera}
                    className="bg-red-500 text-white p-3 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Photo Preview */}
            {capturedPhoto && (
              <div className="text-center">
                <img
                  src={capturedPhoto}
                  alt="Captured"
                  className="w-full rounded-lg mb-4 max-h-64 object-cover"
                />
                
                {photoLocation && (
                  <div className="bg-gray-100 p-3 rounded-lg mb-4 text-sm">
                    <div className="flex items-center justify-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      📍 {photoLocation.lat.toFixed(6)}, {photoLocation.lng.toFixed(6)}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Location automatically tagged
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={submitReport}
                    className="bg-green-500 text-white p-3 rounded-lg flex items-center justify-center"
                  >
                    <Send className="h-5 w-5 mr-1" />
                    {t.sendReport}
                  </button>
                  
                  <button
                    onClick={() => {
                      setCapturedPhoto(null);
                      setPhotoLocation(null);
                    }}
                    className="bg-gray-500 text-white p-3 rounded-lg"
                  >
                    Retake
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
        <div className="grid grid-cols-4 gap-1">
          {[
            { key: 'home', icon: Home, label: t.home },
            { key: 'alerts', icon: Bell, label: t.alerts },
            { key: 'profile', icon: User, label: t.profile },
            { key: 'settings', icon: Settings, label: t.settings }
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`p-2 rounded-lg flex flex-col items-center ${
                activeTab === key ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MinerSafetyApp;