import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  User, Mail, Globe, MapPin, Calendar, Flag, FileText, CheckCircle, 
  ArrowRight, Crown, Star, Sparkles, Trophy, Zap, Heart, Rocket,
  Brain, Target, Award, Camera, Eye, Activity, TrendingUp, Shield,
  Gem, Flame, Wand2, Compass, Navigation, Timer, Battery, Signal,
  Book, Briefcase, GraduationCap, Languages, Home, Phone, Clock,
  Upload, AlertCircle, X
} from 'lucide-react';

interface ProfileData {
  personalInfo: any;
  educationHistory: any;
  educationEmployment: any;
  visaApplication: any;
  createdAt: string;
  status: string;
}

const ProfileDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [showCelebration, setShowCelebration] = useState(true);
  const [currentSection, setCurrentSection] = useState('overview');
  const [animationStep, setAnimationStep] = useState(0);
  const [passportPhoto, setPassportPhoto] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoValidation, setPhotoValidation] = useState<{
    isValid: boolean;
    errors: string[];
  }>({ isValid: true, errors: [] });
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Get profile data from location state or localStorage
    const data = location.state?.profileData || localStorage.getItem('completedProfile');
    if (data) {
      setProfileData(typeof data === 'string' ? JSON.parse(data) : data);
    } else {
      // Redirect back to profile if no data
      navigate('/profile');
    }
  }, [location.state, navigate]);

  // Celebration animation sequence
  useEffect(() => {
    if (showCelebration) {
      const timeouts = [
        setTimeout(() => setAnimationStep(1), 500),
        setTimeout(() => setAnimationStep(2), 1500),
        setTimeout(() => setAnimationStep(3), 2500),
        setTimeout(() => {
          setShowCelebration(false);
          setAnimationStep(0);
        }, 4000)
      ];
      return () => timeouts.forEach(clearTimeout);
    }
  }, [showCelebration]);

  // Confetti animation
  useEffect(() => {
    if (!showCelebration) return;
    
    const canvas = confettiRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FFB6C1'];

    for (let i = 0; i < 100; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: -10,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      confetti.forEach((piece, index) => {
        piece.x += piece.vx;
        piece.y += piece.vy;
        piece.rotation += piece.rotationSpeed;
        piece.vy += 0.1; // gravity

        if (piece.y > canvas.height + 50) {
          confetti[index] = {
            x: Math.random() * canvas.width,
            y: -10,
            vx: (Math.random() - 0.5) * 4,
            vy: Math.random() * 3 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 8 + 4,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10
          };
        }

        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate((piece.rotation * Math.PI) / 180);
        ctx.fillStyle = piece.color;
        ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
        ctx.restore();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [showCelebration]);

  // Floating particles background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.3 + 0.1,
        size: Math.random() * 3 + 1
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        gradient.addColorStop(0, `rgba(147, 51, 234, ${particle.alpha})`);
        gradient.addColorStop(1, `rgba(147, 51, 234, 0)`);
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  const getVisaIcon = (category: string) => {
    const icons: { [key: string]: any } = {
      engineering: Zap,
      'skilled-worker': Briefcase,
      student: GraduationCap,
      business: Crown,
      dependent: Heart
    };
    return icons[category] || FileText;
  };

  const getLanguageLevelColor = (level: string) => {
    const colors: { [key: string]: string } = {
      beginner: 'from-yellow-400 to-orange-400',
      intermediate: 'from-blue-400 to-indigo-400',
      advanced: 'from-purple-400 to-pink-400',
      native: 'from-green-400 to-emerald-400',
      none: 'from-gray-400 to-gray-500'
    };
    return colors[level] || 'from-gray-400 to-gray-500';
  };

  // Photo validation function
  const validatePassportPhoto = (file: File): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // File size validation (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      errors.push('File size must be less than 5MB');
    }
    
    // File type validation
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      errors.push('File must be JPEG or PNG format');
    }
    
    // Check if uploaded recently (within 2 months)
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    
    if (file.lastModified && file.lastModified < twoMonthsAgo.getTime()) {
      errors.push('Photo should be taken within the last 2 months');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };

  // Handle photo upload
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    const validation = validatePassportPhoto(file);
    setPhotoValidation(validation);

    if (validation.isValid) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPassportPhoto(e.target?.result as string);
        setPhotoFile(file);
        setIsUploadingPhoto(false);
      };
      reader.readAsDataURL(file);
    } else {
      setIsUploadingPhoto(false);
    }
  };

  // Remove photo
  const handleRemovePhoto = () => {
    setPassportPhoto(null);
    setPhotoFile(null);
    setPhotoValidation({ isValid: true, errors: [] });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your amazing profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Floating Particles Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Confetti Animation */}
      {showCelebration && (
        <canvas
          ref={confettiRef}
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 50 }}
        />
      )}

      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="text-center text-white">
            <div className={`transform transition-all duration-1000 ${animationStep >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
              <Trophy className="w-32 h-32 mx-auto text-yellow-400 mb-8 animate-bounce" />
            </div>
            
            <div className={`transform transition-all duration-1000 delay-500 ${animationStep >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                🎉 CONGRATULATIONS! 🎉
              </h1>
              <p className="text-2xl mb-8">Your profile has been created successfully!</p>
            </div>
            
            <div className={`transform transition-all duration-1000 delay-1000 ${animationStep >= 3 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
              <div className="flex justify-center space-x-4 text-4xl">
                <Star className="text-yellow-400 animate-pulse" />
                <Sparkles className="text-pink-400 animate-pulse" />
                <Crown className="text-purple-400 animate-pulse" />
                <Gem className="text-blue-400 animate-pulse" />
                <Rocket className="text-green-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Dashboard Content */}
      <div className={`relative z-10 transition-all duration-1000 ${showCelebration ? 'opacity-0' : 'opacity-100'}`}>
        {/* Header */}
        <div className="bg-white bg-opacity-80 backdrop-blur-lg border-b border-white border-opacity-20 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {profileData.personalInfo.fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Welcome, {profileData.personalInfo.fullName.split(' ')[0]}!
                  </h1>
                  <p className="text-gray-600 flex items-center">
                    <Crown className="w-4 h-4 mr-2 text-yellow-500" />
                    Profile Completed • Level 1 Achiever
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{profileData.personalInfo.age}</div>
                  <div className="text-sm text-gray-500">Years Old</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">✓</div>
                  <div className="text-sm text-gray-500">Verified</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex space-x-2 mb-8">
            {[
              { id: 'overview', label: '🌟 Overview', icon: Eye },
              { id: 'personal', label: '👤 Personal', icon: User },
              { id: 'education', label: '🎓 Education', icon: GraduationCap },
              { id: 'visa', label: '🛂 Visa Journey', icon: Globe }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentSection(tab.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  currentSection === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white bg-opacity-50 text-gray-600 hover:bg-opacity-80'
                }`}
              >
                <tab.icon className="w-4 h-4 inline mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview Section */}
          {currentSection === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Profile Completion Card */}
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Profile Status</h3>
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-2">100%</div>
                <p className="text-green-100">Complete & Verified</p>
                <div className="mt-4 bg-white bg-opacity-20 rounded-full h-2">
                  <div className="bg-white rounded-full h-2 w-full"></div>
                </div>
              </div>

              {/* Visa Category Card */}
              <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Visa Category</h3>
                  <Zap className="w-8 h-8" />
                </div>
                <div className="text-2xl font-bold mb-2 capitalize">
                  {profileData.visaApplication.visaCategory.replace('-', ' ')}
                </div>
                <p className="text-blue-100">Your chosen path to Japan</p>
              </div>

              {/* Language Level Card */}
              <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Japanese Level</h3>
                  <Languages className="w-8 h-8" />
                </div>
                <div className="text-2xl font-bold mb-2 capitalize">
                  {profileData.visaApplication.japaneseLanguageLevel}
                </div>
                <p className="text-white text-opacity-80">
                  Exam: {profileData.visaApplication.japaneseExam.toUpperCase()}
                </p>
              </div>

              {/* Success Probability */}
              <div className="md:col-span-2 lg:col-span-3 bg-white bg-opacity-70 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3 text-green-500" />
                  Success Probability Analysis
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-green-500 mb-2">87%</div>
                    <p className="text-gray-600">Overall Success Rate</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '87%'}}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-blue-500 mb-2">A+</div>
                    <p className="text-gray-600">Profile Strength</p>
                    <div className="flex justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-blue-500 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-purple-500 mb-2">Fast</div>
                    <p className="text-gray-600">Processing Speed</p>
                    <div className="flex justify-center mt-2">
                      <Rocket className="w-8 h-8 text-purple-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Personal Information Section */}
          {currentSection === 'personal' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Passport Photo Section */}
              <div className="lg:col-span-1">
                <div className="bg-white bg-opacity-70 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <Camera className="w-6 h-6 mr-3 text-blue-500" />
                    Passport Photo
                  </h3>
                  
                  {/* Photo Upload Area */}
                  <div className="space-y-4">
                    <div className={`relative border-2 border-dashed rounded-lg p-4 transition-colors ${
                      passportPhoto ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-blue-400'
                    }`}>
                      {passportPhoto ? (
                        <div className="text-center">
                          <div className="relative inline-block">
                            <img
                              src={passportPhoto}
                              alt="Passport Photo"
                              className="w-32 h-40 object-cover rounded-lg border-2 border-gray-200 shadow-md"
                            />
                            <button
                              onClick={handleRemovePhoto}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-green-600 font-medium mt-2">Photo uploaded successfully</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 mb-2">Upload your passport photo</p>
                          <p className="text-xs text-gray-500 mb-4">For Japan resident card application</p>
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploadingPhoto}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                          >
                            {isUploadingPhoto ? 'Uploading...' : 'Choose Photo'}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Hidden file input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />

                    {/* Validation Errors */}
                    {!photoValidation.isValid && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-start">
                          <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-red-800">Photo Requirements Not Met:</p>
                            <ul className="text-xs text-red-600 mt-1 list-disc list-inside">
                              {photoValidation.errors.map((error, index) => (
                                <li key={index}>{error}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Photo Requirements */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-blue-800 mb-2">📋 Photo Requirements</h4>
                      <ul className="text-xs text-blue-700 space-y-1">
                        <li>• Taken within the last 2 months</li>
                        <li>• Plain white or light-colored background</li>
                        <li>• Face clearly visible, looking straight ahead</li>
                        <li>• No sunglasses or head coverings (except religious)</li>
                        <li>• 4.5cm × 3.5cm size (will be auto-resized)</li>
                        <li>• JPEG or PNG format, max 5MB</li>
                        <li>• Professional quality for official documents</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Basic Information */}
              <div className="lg:col-span-1">
                <div className="bg-white bg-opacity-70 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <User className="w-6 h-6 mr-3 text-purple-500" />
                    Basic Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Full Name</span>
                      <span className="font-semibold">{profileData.personalInfo.fullName}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Age</span>
                      <span className="font-semibold">{profileData.personalInfo.age} years</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Nationality</span>
                      <span className="font-semibold">{profileData.personalInfo.nationality}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Marital Status</span>
                      <span className="font-semibold capitalize">{profileData.personalInfo.maritalStatus}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Occupation</span>
                      <span className="font-semibold capitalize">{profileData.personalInfo.occupation}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="lg:col-span-1">
                <div className="bg-white bg-opacity-70 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <MapPin className="w-6 h-6 mr-3 text-red-500" />
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Mail className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-gray-600">Email</span>
                      </div>
                      <span className="font-semibold">{profileData.personalInfo.email}</span>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Phone className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-gray-600">Phone</span>
                      </div>
                      <span className="font-semibold">{profileData.personalInfo.phoneNumber}</span>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Home className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-gray-600">Current Address</span>
                      </div>
                      <span className="font-semibold">{profileData.personalInfo.currentAddress}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Education Section */}
          {currentSection === 'education' && (
            <div className="space-y-6">
              <div className="bg-white bg-opacity-70 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <GraduationCap className="w-6 h-6 mr-3 text-purple-500" />
                  Educational Background
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                    <h4 className="font-semibold text-gray-800 mb-3">Education Level</h4>
                    <p className="text-lg font-bold text-purple-600 capitalize">
                      {profileData.educationEmployment.educationLevel.replace('-', ' ')}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                    <h4 className="font-semibold text-gray-800 mb-3">Work Experience</h4>
                    <p className="text-lg font-bold text-blue-600">
                      {profileData.educationEmployment.workExperience || '0'} Years
                    </p>
                  </div>
                </div>
              </div>

              {profileData.educationHistory && (
                <div className="bg-white bg-opacity-70 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <Book className="w-6 h-6 mr-3 text-green-500" />
                    Student Education History
                  </h3>
                  <div className="grid gap-4">
                    {profileData.educationHistory.map((entry: any, index: number) => (
                      <div key={index} className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-1">Year</h4>
                            <p className="text-green-600 font-bold">{entry.year}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-1">Institution</h4>
                            <p className="text-green-600 font-bold">{entry.place}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Visa Journey Section */}
          {currentSection === 'visa' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Rocket className="w-8 h-8 mr-3" />
                  Your Visa Journey to Japan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white bg-opacity-20 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">Visa Category</h4>
                    <p className="text-xl font-bold capitalize">{profileData.visaApplication.visaCategory.replace('-', ' ')}</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">Language Level</h4>
                    <p className="text-xl font-bold capitalize">{profileData.visaApplication.japaneseLanguageLevel}</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">Exam Taken</h4>
                    <p className="text-xl font-bold uppercase">{profileData.visaApplication.japaneseExam}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Activity className="w-5 h-5 inline mr-2" />
              Go to Main Dashboard
            </button>
            <button
              onClick={() => navigate('/consultation')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Calendar className="w-5 h-5 inline mr-2" />
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard; 