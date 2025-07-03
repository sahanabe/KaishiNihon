import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight,
  ChevronLeft,
  User,
  Shield,
  GraduationCap,
  Camera,
  Calendar,
  DollarSign,
  FileText,
  Upload,
  Video,
  Award,
  Globe,
  Clock,
  Languages,
  BookOpen,
  CheckCircle,
  X,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Download,
  Star,
  Verified,
  Building,
  Phone,
  Mail,
  MapPin,
  Flag,
  Users,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Plus,
  Minus,
  Search,
  Filter,
  AlertCircle,
  Lock,
  Unlock,
  CreditCard,
  Banknote
} from 'lucide-react';

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  currentCountry: string;
  currentCity: string;
  timezone: string;
  profilePhoto: File | null;
  
  // Professional Information
  teachingExperience: number;
  nativeLanguages: string[];
  teachingLanguages: string[];
  specializations: string[];
  currentOccupation: string;
  workplaceOrganization: string;
  
  // Credentials & Education
  educationLevel: string;
  universitiesDegrees: Array<{
    institution: string;
    degree: string;
    field: string;
    graduationYear: string;
    verified: boolean;
  }>;
  certifications: Array<{
    name: string;
    issuingOrganization: string;
    issueDate: string;
    expiryDate: string;
    credentialId: string;
    verified: boolean;
  }>;
  languageProficiencyTests: Array<{
    language: string;
    testName: string;
    level: string;
    score: string;
    testDate: string;
    verified: boolean;
  }>;
  
  // Documents
  governmentId: File | null;
  educationCertificates: File[];
  languageCertificates: File[];
  backgroundCheck: File | null;
  professionalReferences: Array<{
  name: string;
    position: string;
    organization: string;
    email: string;
    phone: string;
    relationship: string;
  }>;
  
  // Video & Media
  introductionVideo: File | null;
  teachingDemo: File | null;
  portfolioImages: File[];
  
  // Teaching Preferences
  subjectAreas: string[];
  studentLevels: string[];
  classTypes: string[];
  maxStudentsPerClass: number;
  teachingMethods: string[];
  
  // Availability & Pricing
  availability: {
    [key: string]: { start: string; end: string; available: boolean }[];
  };
  hourlyRate: number;
  currency: string;
  packageDeals: Array<{
    name: string;
    sessions: number;
    price: number;
    description: string;
  }>;
  
  // Platform Setup
  bankingDetails: {
    accountHolder: string;
    bankName: string;
    accountNumber: string;
    routingNumber: string;
    swift: string;
  };
  socialMediaProfiles: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    youtube: string;
    personalWebsite: string;
  };
  
  // Additional
  bio: string;
  teachingPhilosophy: string;
  whyTeachJapanese: string;
  targetStudentDescription: string;
  achievements: string[];
  hobbiesInterests: string[];
}

const steps = [
  { id: 1, title: 'Welcome', description: 'Get started', icon: User },
  { id: 2, title: 'Personal Info', description: 'Basic details', icon: User },
  { id: 3, title: 'Verification', description: 'Identity check', icon: Shield },
  { id: 4, title: 'Education', description: 'Credentials', icon: GraduationCap },
  { id: 5, title: 'Experience', description: 'Teaching background', icon: Award },
  { id: 6, title: 'Documents', description: 'Upload files', icon: FileText },
  { id: 7, title: 'Video Profile', description: 'Introduction', icon: Camera },
  { id: 8, title: 'Teaching Demo', description: 'Show skills', icon: Video },
  { id: 9, title: 'Specialization', description: 'Subject areas', icon: BookOpen },
  { id: 10, title: 'Availability', description: 'Schedule setup', icon: Calendar },
  { id: 11, title: 'Pricing', description: 'Set rates', icon: DollarSign },
  { id: 12, title: 'Platform Setup', description: 'Final details', icon: Globe },
  { id: 13, title: 'Review', description: 'Submit application', icon: CheckCircle }
];

const BecomeLecturer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    currentCountry: '',
    currentCity: '',
    timezone: '',
    profilePhoto: null,
    teachingExperience: 0,
    nativeLanguages: [],
    teachingLanguages: [],
    specializations: [],
    currentOccupation: '',
    workplaceOrganization: '',
    educationLevel: '',
    universitiesDegrees: [],
    certifications: [],
    languageProficiencyTests: [],
    governmentId: null,
    educationCertificates: [],
    languageCertificates: [],
    backgroundCheck: null,
    professionalReferences: [],
    introductionVideo: null,
    teachingDemo: null,
    portfolioImages: [],
    subjectAreas: [],
    studentLevels: [],
    classTypes: [],
    maxStudentsPerClass: 10,
    teachingMethods: [],
    availability: {},
    hourlyRate: 0,
    currency: 'JPY',
    packageDeals: [],
    bankingDetails: {
      accountHolder: '',
      bankName: '',
      accountNumber: '',
      routingNumber: '',
      swift: ''
    },
    socialMediaProfiles: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
      youtube: '',
      personalWebsite: ''
    },
    bio: '',
    teachingPhilosophy: '',
    whyTeachJapanese: '',
    targetStudentDescription: '',
    achievements: [],
    hobbiesInterests: []
  });

  const [isRecording, setIsRecording] = useState(false);
  const [recordingType, setRecordingType] = useState<'intro' | 'demo' | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (field: string, files: FileList | File) => {
    if (files instanceof FileList) {
      updateFormData(field, Array.from(files));
    } else {
      updateFormData(field, files);
    }
  };

  // Video recording functions
  const startRecording = async (type: 'intro' | 'demo') => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const file = new File([blob], `${type}-video.webm`, { type: 'video/webm' });
        
        if (type === 'intro') {
          updateFormData('introductionVideo', file);
        } else {
          updateFormData('teachingDemo', file);
        }
      };
      
      setRecordingType(type);
      setIsRecording(true);
      mediaRecorder.start();
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setRecordingType(null);
      
      // Stop all tracks
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Progress Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
                ← Back to Home
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Become a Lecturer</h1>
                <p className="text-gray-600">Step {currentStep} of {steps.length}</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {Math.round((currentStep / steps.length) * 100)}% Complete
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {steps.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              const StepIcon = step.icon;
              
              return (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                      : isCompleted 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-500'
                  }`}>
                    <StepIcon className="w-4 h-4" />
                    <span className="text-sm font-medium whitespace-nowrap">{step.title}</span>
                    {isCompleted && <CheckCircle className="w-4 h-4" />}
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-gray-400 mx-1 flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Step Content */}
          <div className="p-8">
            {currentStep === 1 && (
              <WelcomeStep nextStep={nextStep} />
            )}
            {currentStep === 2 && (
              <PersonalInfoStep 
                formData={formData} 
                updateFormData={updateFormData}
                handleFileUpload={handleFileUpload}
              />
            )}
            {currentStep === 3 && (
              <VerificationStep 
                formData={formData} 
                updateFormData={updateFormData}
                handleFileUpload={handleFileUpload}
              />
            )}
            {currentStep === 4 && (
              <EducationStep 
                formData={formData} 
                updateFormData={updateFormData}
                handleFileUpload={handleFileUpload}
              />
            )}
            {currentStep === 5 && (
              <ExperienceStep 
                formData={formData} 
                updateFormData={updateFormData}
              />
            )}
            {currentStep === 6 && (
              <DocumentsStep 
                formData={formData} 
                updateFormData={updateFormData}
                handleFileUpload={handleFileUpload}
              />
            )}
            {currentStep === 7 && (
              <VideoProfileStep 
                formData={formData} 
                isRecording={isRecording}
                recordingType={recordingType}
                startRecording={startRecording}
                stopRecording={stopRecording}
                videoRef={videoRef}
              />
            )}
            {currentStep === 8 && (
              <TeachingDemoStep 
                formData={formData} 
                isRecording={isRecording}
                recordingType={recordingType}
                startRecording={startRecording}
                stopRecording={stopRecording}
                videoRef={videoRef}
              />
            )}
            {currentStep === 9 && (
              <SpecializationStep 
                formData={formData} 
                updateFormData={updateFormData}
              />
            )}
            {currentStep === 10 && (
              <AvailabilityStep 
                formData={formData} 
                updateFormData={updateFormData}
              />
            )}
            {currentStep === 11 && (
              <PricingStep 
                formData={formData} 
                updateFormData={updateFormData}
              />
            )}
            {currentStep === 12 && (
              <PlatformSetupStep 
                formData={formData} 
                updateFormData={updateFormData}
              />
            )}
            {currentStep === 13 && (
              <ReviewStep 
                formData={formData}
              />
            )}
          </div>

          {/* Navigation */}
          {currentStep > 1 && (
            <div className="bg-gray-50 px-8 py-6 flex justify-between items-center">
              <button
                onClick={prevStep}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>
              
              <button
                onClick={nextStep}
                className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>Continue</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
                    </div>
                  </div>
  );
};

// Step Components
const WelcomeStep: React.FC<{ nextStep: () => void }> = ({ nextStep }) => {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to KaishiNihon Lecturer Platform
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          Join our elite community of Japanese language educators and share your expertise with students worldwide.
        </p>
                </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-xl">
          <Globe className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Global Reach</h3>
          <p className="text-gray-600 text-sm">Teach students from around the world and build an international reputation.</p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl">
          <DollarSign className="w-8 h-8 text-green-600 mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Competitive Earnings</h3>
          <p className="text-gray-600 text-sm">Set your own rates and earn competitive income doing what you love.</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-xl">
          <Award className="w-8 h-8 text-purple-600 mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Professional Growth</h3>
          <p className="text-gray-600 text-sm">Access professional development resources and grow your teaching career.</p>
                  </div>
                </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h4 className="font-semibold text-yellow-800 mb-2">📋 Application Process Overview</h4>
        <p className="text-yellow-700 text-sm mb-4">
          Our comprehensive verification process ensures quality education for all students. Here's what to expect:
        </p>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
                  <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Identity & Background Verification</span>
                  </div>
                  <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Education & Certification Review</span>
                  </div>
                  <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Teaching Experience Validation</span>
                  </div>
                </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Video Introduction & Teaching Demo</span>
                </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Professional References Check</span>
              </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Platform Training & Onboarding</span>
            </div>
          </div>
        </div>
      </div>

              <button
        onClick={nextStep}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
              >
        Start My Application
              </button>
    </div>
  );
};

const PersonalInfoStep: React.FC<{
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
  handleFileUpload: (field: string, files: FileList | File) => void;
}> = ({ formData, updateFormData, handleFileUpload }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Personal Information</h2>
        <p className="text-gray-600">Let's start with your basic information. All fields are required for verification.</p>
            </div>

      <div className="space-y-6">
        {/* Profile Photo */}
        <div className="bg-blue-50 p-6 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-4">Profile Photo</h3>
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              {formData.profilePhoto ? (
                <img 
                  src={URL.createObjectURL(formData.profilePhoto)} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-8 h-8 text-gray-400" />
              )}
                    </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files && handleFileUpload('profilePhoto', e.target.files[0])}
                className="hidden"
                id="profile-photo"
              />
              <label
                htmlFor="profile-photo"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
              >
                Upload Photo
              </label>
              <p className="text-sm text-gray-500 mt-2">Professional headshot recommended (JPG, PNG, max 5MB)</p>
                  </div>
                </div>
              </div>

        {/* Name */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => updateFormData('firstName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your first name"
            />
                </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => updateFormData('lastName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your last name"
            />
                </div>
              </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
                    </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
                </div>
              </div>

        {/* Date of Birth and Nationality */}
        <div className="grid md:grid-cols-3 gap-6">
                        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
                        </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nationality *</label>
            <select
              value={formData.nationality}
              onChange={(e) => updateFormData('nationality', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select nationality</option>
              <option value="Japanese">Japanese</option>
              <option value="American">American</option>
              <option value="British">British</option>
              <option value="Canadian">Canadian</option>
              <option value="Australian">Australian</option>
              <option value="Brazilian">Brazilian</option>
              <option value="Sri Lankan">Sri Lankan</option>
              <option value="Other">Other</option>
            </select>
                      </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone *</label>
            <select
              value={formData.timezone}
              onChange={(e) => updateFormData('timezone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select timezone</option>
              <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
              <option value="America/Sao_Paulo">America/Sao_Paulo (BRT)</option>
              <option value="Australia/Sydney">Australia/Sydney (AEST)</option>
            </select>
                        </div>
                      </div>

        {/* Current Location */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Country *</label>
            <input
              type="text"
              value={formData.currentCountry}
              onChange={(e) => updateFormData('currentCountry', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Country where you currently reside"
            />
                        </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current City *</label>
            <input
              type="text"
              value={formData.currentCity}
              onChange={(e) => updateFormData('currentCity', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="City where you currently reside"
            />
                      </div>
                    </div>
                </div>
              </div>
  );
};

const VerificationStep: React.FC<{
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
  handleFileUpload: (field: string, files: FileList | File) => void;
}> = ({ formData, updateFormData, handleFileUpload }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Identity Verification</h2>
        <p className="text-gray-600">
          We need to verify your identity to ensure the safety and trust of our platform.
        </p>
                  </div>

      <div className="space-y-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-yellow-600 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">Why we need verification</h3>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• Ensure the safety of our student community</li>
                <li>• Maintain high-quality educational standards</li>
                <li>• Comply with international teaching regulations</li>
                <li>• Build trust between lecturers and students</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Government ID Upload */}
        <div className="bg-blue-50 p-6 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Government-Issued ID
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Upload a clear photo of your passport, driver's license, or national ID card.
          </p>
          
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center">
            {formData.governmentId ? (
              <div className="flex items-center justify-center space-x-3">
                <FileText className="w-6 h-6 text-green-600" />
                <span className="text-green-600 font-medium">{formData.governmentId.name}</span>
                <button
                  onClick={() => updateFormData('governmentId', null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div>
                <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => e.target.files && handleFileUpload('governmentId', e.target.files[0])}
                  className="hidden"
                  id="government-id"
                />
                <label
                  htmlFor="government-id"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors inline-block"
                >
                  Upload ID Document
                </label>
                <p className="text-gray-500 text-xs mt-2">JPG, PNG, or PDF • Max 10MB</p>
              </div>
            )}
          </div>
        </div>

        {/* Background Check */}
        <div className="bg-green-50 p-6 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Background Check (Optional but Recommended)
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Upload a recent background check or criminal record clearance certificate to boost your credibility.
          </p>
          
          <div className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center">
            {formData.backgroundCheck ? (
              <div className="flex items-center justify-center space-x-3">
                <FileText className="w-6 h-6 text-green-600" />
                <span className="text-green-600 font-medium">{formData.backgroundCheck.name}</span>
                <button
                  onClick={() => updateFormData('backgroundCheck', null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div>
                <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => e.target.files && handleFileUpload('backgroundCheck', e.target.files[0])}
                  className="hidden"
                  id="background-check"
                />
                <label
                  htmlFor="background-check"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition-colors inline-block"
                >
                  Upload Background Check
                </label>
                <p className="text-gray-500 text-xs mt-2">JPG, PNG, or PDF • Max 10MB</p>
              </div>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Lock className="w-6 h-6 text-gray-600 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Data Security</h3>
              <p className="text-gray-600 text-sm">
                All uploaded documents are encrypted and stored securely. Your personal information is protected 
                according to international data protection standards and will only be used for verification purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EducationStep: React.FC<{
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
  handleFileUpload: (field: string, files: FileList | File) => void;
}> = ({ formData, updateFormData, handleFileUpload }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Education & Credentials</h2>
        <p className="text-gray-600">Share your educational background and professional certifications.</p>
      </div>

      <div className="space-y-6">
        {/* Education Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Highest Education Level *</label>
          <select
            value={formData.educationLevel}
            onChange={(e) => updateFormData('educationLevel', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select education level</option>
            <option value="High School">High School</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="PhD">PhD</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Education Certificates Upload */}
        <div className="bg-blue-50 p-6 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-4">Education Certificates</h3>
          <p className="text-gray-600 text-sm mb-4">Upload your degree certificates and transcripts.</p>
          
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <input
              type="file"
              multiple
              accept="image/*,.pdf"
              onChange={(e) => e.target.files && handleFileUpload('educationCertificates', e.target.files)}
              className="hidden"
              id="education-certificates"
            />
            <label
              htmlFor="education-certificates"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors inline-block"
            >
              Upload Certificates
            </label>
            <p className="text-gray-500 text-xs mt-2">JPG, PNG, or PDF • Max 10MB each</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExperienceStep: React.FC<{
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
}> = ({ formData, updateFormData }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Teaching Experience</h2>
        <p className="text-gray-600">Tell us about your teaching background and expertise.</p>
      </div>

      <div className="space-y-6">
        {/* Teaching Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Years of Teaching Experience *</label>
          <input
            type="number"
            min="0"
            value={formData.teachingExperience}
            onChange={(e) => updateFormData('teachingExperience', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter number of years"
          />
        </div>

        {/* Current Occupation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Occupation</label>
          <input
            type="text"
            value={formData.currentOccupation}
            onChange={(e) => updateFormData('currentOccupation', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Teacher, Professor, Language Instructor"
          />
        </div>

        {/* Workplace Organization */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Workplace/Organization</label>
          <input
            type="text"
            value={formData.workplaceOrganization}
            onChange={(e) => updateFormData('workplaceOrganization', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., University of Tokyo, ABC Language School"
          />
        </div>
      </div>
    </div>
  );
};

const DocumentsStep: React.FC<{
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
  handleFileUpload: (field: string, files: FileList | File) => void;
}> = ({ formData, updateFormData, handleFileUpload }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Document Upload</h2>
        <p className="text-gray-600">Upload your supporting documents and certificates.</p>
      </div>

      <div className="space-y-6">
        {/* Language Certificates */}
        <div className="bg-blue-50 p-6 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-4">Language Proficiency Certificates</h3>
          <p className="text-gray-600 text-sm mb-4">Upload your JLPT, CEFR, or other language proficiency certificates.</p>
          
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <input
              type="file"
              multiple
              accept="image/*,.pdf"
              onChange={(e) => e.target.files && handleFileUpload('languageCertificates', e.target.files)}
              className="hidden"
              id="language-certificates"
            />
            <label
              htmlFor="language-certificates"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors inline-block"
            >
              Upload Language Certificates
            </label>
            <p className="text-gray-500 text-xs mt-2">JPG, PNG, or PDF • Max 10MB each</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoProfileStep: React.FC<{
  formData: FormData;
  isRecording: boolean;
  recordingType: 'intro' | 'demo' | null;
  startRecording: (type: 'intro' | 'demo') => void;
  stopRecording: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}> = ({ formData, isRecording, recordingType, startRecording, stopRecording, videoRef }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Video Introduction</h2>
        <p className="text-gray-600">Record a brief introduction video to help students get to know you.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 p-6 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-4">Record Your Introduction</h3>
          <p className="text-gray-600 text-sm mb-4">
            Introduce yourself, your teaching experience, and why you love teaching Japanese.
          </p>
          
          <div className="text-center">
            <video
              ref={videoRef}
              className="w-full max-w-md mx-auto mb-4 rounded-lg"
              autoPlay
              muted
            />
            
            <div className="flex justify-center space-x-4">
              {!isRecording ? (
                <button
                  onClick={() => startRecording('intro')}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                >
                  <Camera className="w-5 h-5" />
                  <span>Start Recording</span>
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                >
                  <Pause className="w-5 h-5" />
                  <span>Stop Recording</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeachingDemoStep: React.FC<{
  formData: FormData;
  isRecording: boolean;
  recordingType: 'intro' | 'demo' | null;
  startRecording: (type: 'intro' | 'demo') => void;
  stopRecording: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}> = ({ formData, isRecording, recordingType, startRecording, stopRecording, videoRef }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Teaching Demo</h2>
        <p className="text-gray-600">Record a short teaching demonstration to showcase your skills.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-green-50 p-6 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-4">Record Your Teaching Demo</h3>
          <p className="text-gray-600 text-sm mb-4">
            Demonstrate a brief lesson (5-10 minutes) on any Japanese topic of your choice.
          </p>
          
          <div className="text-center">
            <video
              ref={videoRef}
              className="w-full max-w-md mx-auto mb-4 rounded-lg"
              autoPlay
              muted
            />
            
            <div className="flex justify-center space-x-4">
              {!isRecording ? (
                <button
                  onClick={() => startRecording('demo')}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Video className="w-5 h-5" />
                  <span>Start Demo Recording</span>
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                >
                  <Pause className="w-5 h-5" />
                  <span>Stop Recording</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpecializationStep: React.FC<{
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
}> = ({ formData, updateFormData }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Teaching Specializations</h2>
        <p className="text-gray-600">Define your areas of expertise and teaching preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Subject Areas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject Areas *</label>
          <div className="grid grid-cols-2 gap-3">
            {['Grammar', 'Vocabulary', 'Kanji', 'Speaking', 'Listening', 'Reading', 'Writing', 'JLPT Preparation'].map((subject) => (
              <label key={subject} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.subjectAreas.includes(subject)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateFormData('subjectAreas', [...formData.subjectAreas, subject]);
                    } else {
                      updateFormData('subjectAreas', formData.subjectAreas.filter(s => s !== subject));
                    }
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{subject}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Student Levels */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Student Levels *</label>
          <div className="grid grid-cols-2 gap-3">
            {['Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Native Level'].map((level) => (
              <label key={level} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.studentLevels.includes(level)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateFormData('studentLevels', [...formData.studentLevels, level]);
                    } else {
                      updateFormData('studentLevels', formData.studentLevels.filter(s => s !== level));
                    }
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{level}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AvailabilityStep: React.FC<{
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
}> = ({ formData, updateFormData }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Teaching Availability</h2>
        <p className="text-gray-600">Set your weekly teaching schedule and availability.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 p-6 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-4">Weekly Schedule</h3>
          <p className="text-gray-600 text-sm mb-4">
            Select the time slots when you're available for teaching.
          </p>
          
          <div className="grid gap-4">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <div key={day} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">{day}</h4>
                <div className="grid grid-cols-3 gap-2">
                  {['Morning', 'Afternoon', 'Evening'].map((time) => (
                    <label key={time} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{time}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PricingStep: React.FC<{
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
}> = ({ formData, updateFormData }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing & Packages</h2>
        <p className="text-gray-600">Set your hourly rate and create package deals for students.</p>
      </div>

      <div className="space-y-6">
        {/* Hourly Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate (JPY) *</label>
          <input
            type="number"
            min="0"
            value={formData.hourlyRate}
            onChange={(e) => updateFormData('hourlyRate', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your hourly rate in JPY"
          />
        </div>

        {/* Currency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
          <select
            value={formData.currency}
            onChange={(e) => updateFormData('currency', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="JPY">Japanese Yen (¥)</option>
            <option value="USD">US Dollar ($)</option>
            <option value="EUR">Euro (€)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const PlatformSetupStep: React.FC<{
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
}> = ({ formData, updateFormData }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Setup</h2>
        <p className="text-gray-600">Configure your account settings and payment information.</p>
      </div>

      <div className="space-y-6">
        {/* Banking Details */}
        <div className="bg-blue-50 p-6 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-4">Banking Information</h3>
          <p className="text-gray-600 text-sm mb-4">
            Provide your banking details for receiving payments from students.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Holder Name</label>
              <input
                type="text"
                value={formData.bankingDetails.accountHolder}
                onChange={(e) => updateFormData('bankingDetails', { ...formData.bankingDetails, accountHolder: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Account holder name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
              <input
                type="text"
                value={formData.bankingDetails.bankName}
                onChange={(e) => updateFormData('bankingDetails', { ...formData.bankingDetails, bankName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Bank name"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewStep: React.FC<{
  formData: FormData;
}> = ({ formData }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Review Your Application</h2>
        <p className="text-gray-600">Please review all the information before submitting your application.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-green-800">Application Complete</h3>
          </div>
          <p className="text-green-700 text-sm">
            Your application has been completed successfully. Please review all information before submitting.
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-4">Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
            </div>
            <div>
              <p><strong>Nationality:</strong> {formData.nationality}</p>
              <p><strong>Location:</strong> {formData.currentCity}, {formData.currentCountry}</p>
              <p><strong>Timezone:</strong> {formData.timezone}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default BecomeLecturer; 