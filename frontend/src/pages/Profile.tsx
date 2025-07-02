import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Globe, MapPin, Calendar, Flag, FileText, CheckCircle, ArrowRight, ArrowLeft, Plus, Trash2, Send, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [emailVerification, setEmailVerification] = useState({
    isEmailVerified: false,
    verificationCode: '',
    sentVerificationCode: '',
    isCodeSent: false,
    isVerifying: false
  });
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    birthday: '',
    age: '',
    nationality: '',
    country: '',
    currentAddress: '',
    phoneNumber: '',
    countryCode: '',
    email: state.user?.email || '',
    nationalIdNumber: '',
    hasPassport: '',
    passportNumber: '',
    passportExpiry: '',
    maritalStatus: '',
    occupation: '',
    // Student Education History (conditional fields - array of up to 7 entries)
    educationHistory: [{ year: '', place: '' }],
    // Educational & Employment Background
    education: '',
    senmonGakkouCategory: '',
    workExperience: '',
    employmentHistory: '',
    workplace1Name: '',
    workplace1Year: '',
    workplace2Name: '',
    workplace2Year: '',
    workplace3Name: '',
    workplace3Year: '',
    // Visa Information
    visaCategory: '',
    japaneseLanguageLevel: '',
    japaneseExam: '',
    preferredLocation: '',
    expectedStartDate: ''
  });

  const visaCategories = [
    {
      id: 'engineering',
      name: 'Engineering Visa',
      description: 'For IT professionals, engineers, and technical specialists',
      requirements: 'Bachelor\'s degree in relevant field, 24+ years old',
      ageLimit: 24,
      icon: '🔧'
    },
    {
      id: 'skilled-worker',
      name: 'Skilled Worker Visa',
      description: 'For professionals with specialized skills',
      requirements: 'Relevant work experience and qualifications',
      ageLimit: 18,
      icon: '👷'
    },
    {
      id: 'student',
      name: 'Student Visa',
      description: 'For international students pursuing education',
      requirements: 'Acceptance letter from Japanese institution',
      ageLimit: 16,
      icon: '📚'
    },
    {
      id: 'business',
      name: 'Business Manager Visa',
      description: 'For entrepreneurs and business investors',
      requirements: 'Business plan and sufficient investment capital',
      ageLimit: 21,
      icon: '💼'
    },
    {
      id: 'dependent',
      name: 'Dependent Visa',
      description: 'For family members of visa holders',
      requirements: 'Relationship proof with primary visa holder',
      ageLimit: 0,
      icon: '👨‍👩‍👧‍👦'
    }
  ];

  const calculateAge = (birthday: string): string => {
    if (!birthday) return '';
    
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age.toString();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'birthday') {
      const calculatedAge = calculateAge(value);
      setFormData(prev => ({
        ...prev,
        [name]: value,
        age: calculatedAge
      }));
    } else if (name === 'education') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        senmonGakkouCategory: value === 'senmon-gakkou' ? prev.senmonGakkouCategory : ''
      }));
    } else if (name === 'hasPassport') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        passportNumber: value === 'no' ? '' : prev.passportNumber,
        passportExpiry: value === 'no' ? '' : prev.passportExpiry
      }));
    } else if (name === 'occupation') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        educationHistory: value === 'student' ? prev.educationHistory : [{ year: '', place: '' }]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Prepare profile data for submission
      const profileData = {
        personalInfo: {
          fullName: formData.fullName,
          birthday: formData.birthday,
          age: formData.age,
          nationality: formData.nationality,
          currentCountry: formData.country,
          currentAddress: formData.currentAddress,
          phoneNumber: `${formData.countryCode} ${formData.phoneNumber}`,
          email: formData.email,
          nationalIdNumber: formData.nationalIdNumber,
          hasPassport: formData.hasPassport,
          passportNumber: formData.passportNumber,
          passportExpiry: formData.passportExpiry,
          maritalStatus: formData.maritalStatus,
          occupation: formData.occupation
        },
        educationHistory: formData.occupation === 'student' ? formData.educationHistory : null,
        educationEmployment: {
          educationLevel: formData.education,
          senmonGakkouCategory: formData.senmonGakkouCategory,
          workExperience: formData.workExperience,
          employmentHistory: {
            mostRecent: {
              company: formData.workplace1Name,
              period: formData.workplace1Year
            },
            previous: {
              company: formData.workplace2Name,
              period: formData.workplace2Year
            },
            earlier: {
              company: formData.workplace3Name,
              period: formData.workplace3Year
            },
            additionalDetails: formData.employmentHistory
          }
        },
        visaApplication: {
          visaCategory: formData.visaCategory,
          japaneseLanguageLevel: formData.japaneseLanguageLevel,
          japaneseExam: formData.japaneseExam,
          preferredLocation: formData.preferredLocation,
          expectedStartDate: formData.expectedStartDate
        },
        createdAt: new Date().toISOString(),
        status: 'draft'
      };

      // Here you would typically send to your backend API
      console.log('Creating user profile:', profileData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save to localStorage as backup
      localStorage.setItem('completedProfile', JSON.stringify(profileData));
      
      // Navigate to the amazing ProfileDashboard with profile data
      navigate('/profile-dashboard', { 
        state: { profileData },
        replace: true 
      });
      
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Failed to create profile. Please try again.');
    }
  };

  const isPersonalInfoComplete = () => {
    const basicInfo = formData.fullName && formData.birthday && formData.nationality && 
                     formData.country && formData.currentAddress && formData.phoneNumber && 
                     formData.countryCode && formData.email && formData.nationalIdNumber && 
                     formData.hasPassport && formData.maritalStatus && formData.occupation && 
                     emailVerification.isEmailVerified;
    
    let passportInfo = true;
    if (formData.hasPassport === 'yes') {
      passportInfo = !!(formData.passportNumber && formData.passportExpiry);
    }

    let educationHistoryInfo = true;
    if (formData.occupation === 'student') {
      educationHistoryInfo = formData.educationHistory.every(entry => entry.year.trim() && entry.place.trim());
    }
    
    return basicInfo && passportInfo && educationHistoryInfo;
  };

  const isEducationEmploymentComplete = () => {
    if (formData.education === 'senmon-gakkou') {
      return formData.education && formData.senmonGakkouCategory;
    }
    return formData.education;
  };

  const isVisaSelectionComplete = () => {
    return formData.visaCategory && formData.japaneseLanguageLevel && formData.japaneseExam;
  };

  const isEligibleForEngineering = () => {
    const age = parseInt(formData.age);
    return age >= 24;
  };

  const getAvailableVisaCategories = () => {
    const age = parseInt(formData.age) || 0;
    return visaCategories.filter(visa => age >= visa.ageLimit);
  };

  // Education History Functions for Students
  const addEducationEntry = () => {
    if (formData.educationHistory.length < 7) {
      setFormData(prev => ({
        ...prev,
        educationHistory: [...prev.educationHistory, { year: '', place: '' }]
      }));
    }
  };

  const removeEducationEntry = (index: number) => {
    if (formData.educationHistory.length > 1) {
      setFormData(prev => ({
        ...prev,
        educationHistory: prev.educationHistory.filter((_, i) => i !== index)
      }));
    }
  };

  const handleEducationHistoryChange = (index: number, field: 'year' | 'place', value: string) => {
    setFormData(prev => ({
      ...prev,
      educationHistory: prev.educationHistory.map((entry, i) => 
        i === index ? { ...entry, [field]: value } : entry
      )
    }));
  };

  // Email Verification Functions
  const generateVerificationCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendVerificationCode = async () => {
    if (!formData.email) return;
    
    setEmailVerification(prev => ({ ...prev, isVerifying: true }));
    
    // Generate a 6-digit code
    const code = generateVerificationCode();
    
    try {
      // Simulate API call to send email
      // In real implementation, call your backend API here
      console.log(`Verification code sent to ${formData.email}: ${code}`);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setEmailVerification(prev => ({
        ...prev,
        sentVerificationCode: code,
        isCodeSent: true,
        isVerifying: false
      }));
      
      alert(`Verification code sent to ${formData.email}\nFor demo purposes, the code is: ${code}`);
    } catch (error) {
      console.error('Error sending verification code:', error);
      setEmailVerification(prev => ({ ...prev, isVerifying: false }));
      alert('Failed to send verification code. Please try again.');
    }
  };

  const verifyEmailCode = () => {
    if (emailVerification.verificationCode === emailVerification.sentVerificationCode) {
      setEmailVerification(prev => ({
        ...prev,
        isEmailVerified: true
      }));
      alert('Email verified successfully!');
    } else {
      alert('Invalid verification code. Please try again.');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, email: value }));
    
    // Reset email verification if email changes
    if (emailVerification.isEmailVerified || emailVerification.isCodeSent) {
      setEmailVerification({
        isEmailVerified: false,
        verificationCode: '',
        sentVerificationCode: '',
        isCodeSent: false,
        isVerifying: false
      });
    }
  };

  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailVerification(prev => ({
      ...prev,
      verificationCode: e.target.value
    }));
  };

  return (
    <div className="page-container">
      <div className="section-container py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <User className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Your Profile</h1>
            <p className="text-gray-600">Complete your profile to get personalized visa recommendations</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                  {currentStep > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
                </div>
                <span className="font-medium">Personal Information</span>
              </div>
              
              <ArrowRight className="w-5 h-5 text-gray-400" />
              
              <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                  {currentStep > 2 ? <CheckCircle className="w-5 h-5" /> : '2'}
                </div>
                <span className="font-medium">Education & Employment</span>
              </div>
              
              <ArrowRight className="w-5 h-5 text-gray-400" />
              
              <div className={`flex items-center space-x-2 ${currentStep >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                  {currentStep > 3 ? <CheckCircle className="w-5 h-5" /> : '3'}
                </div>
                <span className="font-medium">Visa Category</span>
              </div>
            </div>
          </div>

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="card">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Personal Information</h2>
                <p className="text-gray-600">Please provide your basic information to get started</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name Same as the Passport *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name exactly as shown on passport"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Birthday *
                  </label>
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleInputChange}
                    className="input-field"
                    min="1924-01-01"
                    max={new Date().toISOString().split('T')[0]}
                    required
                  />
                  {formData.age && (
                    <p className="text-sm text-gray-600 mt-1">
                      Age: <span className="font-medium">{formData.age} years old</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Flag className="w-4 h-4 inline mr-2" />
                    Nationality *
                  </label>
                  <select
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select your nationality</option>
                    <option value="US">American</option>
                    <option value="UK">British</option>
                    <option value="CA">Canadian</option>
                    <option value="AU">Australian</option>
                    <option value="IN">Indian</option>
                    <option value="CN">Chinese</option>
                    <option value="KR">South Korean</option>
                    <option value="TH">Thai</option>
                    <option value="VN">Vietnamese</option>
                    <option value="NP">Nepali</option>
                    <option value="PH">Filipino</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4 inline mr-2" />
                    Current Country of Residence *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select your country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="IN">India</option>
                    <option value="JP">Japan</option>
                    <option value="CN">China</option>
                    <option value="KR">South Korea</option>
                    <option value="TH">Thailand</option>
                    <option value="VN">Vietnam</option>
                    <option value="NP">Nepal</option>
                    <option value="PH">Philippines</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address *
                    {emailVerification.isEmailVerified && (
                      <span className="ml-2 inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </span>
                    )}
                  </label>
                  
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email address"
                        className="input-field flex-1"
                        required
                        disabled={emailVerification.isEmailVerified}
                      />
                      
                      {!emailVerification.isEmailVerified && (
                        <button
                          type="button"
                          onClick={sendVerificationCode}
                          disabled={!formData.email || emailVerification.isVerifying || emailVerification.isCodeSent}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 whitespace-nowrap"
                        >
                          {emailVerification.isVerifying ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>{emailVerification.isCodeSent ? 'Resend Code' : 'Send Code'}</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                    
                    {emailVerification.isCodeSent && !emailVerification.isEmailVerified && (
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Shield className="w-4 h-4 text-blue-600 mr-2" />
                          <span className="text-sm font-medium text-blue-800">
                            Verification code sent to {formData.email}
                          </span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={emailVerification.verificationCode}
                            onChange={handleVerificationCodeChange}
                            placeholder="Enter 6-digit verification code"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            maxLength={6}
                          />
                          <button
                            type="button"
                            onClick={verifyEmailCode}
                            disabled={emailVerification.verificationCode.length !== 6}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Verify
                          </button>
                        </div>
                        
                        <p className="text-xs text-gray-600 mt-2">
                          Didn't receive the code? Wait 60 seconds and click "Resend Code"
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    National Identity Card Number *
                  </label>
                  <input
                    type="text"
                    name="nationalIdNumber"
                    value={formData.nationalIdNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your national ID card number"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Phone Number *
                  </label>
                  <div className="flex space-x-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      className="input-field w-32"
                      required
                    >
                      <option value="">Code</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+1">🇨🇦 +1</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+81">🇯🇵 +81</option>
                      <option value="+86">🇨🇳 +86</option>
                      <option value="+82">🇰🇷 +82</option>
                      <option value="+66">🇹🇭 +66</option>
                      <option value="+84">🇻🇳 +84</option>
                      <option value="+977">🇳🇵 +977</option>
                      <option value="+63">🇵🇭 +63</option>
                      <option value="+49">🇩🇪 +49</option>
                      <option value="+33">🇫🇷 +33</option>
                      <option value="+39">🇮🇹 +39</option>
                      <option value="+34">🇪🇸 +34</option>
                      <option value="+31">🇳🇱 +31</option>
                      <option value="+47">🇳🇴 +47</option>
                      <option value="+46">🇸🇪 +46</option>
                      <option value="+45">🇩🇰 +45</option>
                      <option value="+358">🇫🇮 +358</option>
                      <option value="+7">🇷🇺 +7</option>
                      <option value="+55">🇧🇷 +55</option>
                      <option value="+52">🇲🇽 +52</option>
                      <option value="+54">🇦🇷 +54</option>
                      <option value="+27">🇿🇦 +27</option>
                      <option value="+20">🇪🇬 +20</option>
                      <option value="+234">🇳🇬 +234</option>
                      <option value="+254">🇰🇪 +254</option>
                      <option value="+971">🇦🇪 +971</option>
                      <option value="+966">🇸🇦 +966</option>
                      <option value="+65">🇸🇬 +65</option>
                      <option value="+60">🇲🇾 +60</option>
                      <option value="+62">🇮🇩 +62</option>
                      <option value="+880">🇧🇩 +880</option>
                      <option value="+92">🇵🇰 +92</option>
                      <option value="+98">🇮🇷 +98</option>
                      <option value="+90">🇹🇷 +90</option>
                      <option value="+30">🇬🇷 +30</option>
                      <option value="+351">🇵🇹 +351</option>
                      <option value="+41">🇨🇭 +41</option>
                      <option value="+43">🇦🇹 +43</option>
                      <option value="+32">🇧🇪 +32</option>
                      <option value="+420">🇨🇿 +420</option>
                      <option value="+48">🇵🇱 +48</option>
                      <option value="+36">🇭🇺 +36</option>
                      <option value="+40">🇷🇴 +40</option>
                      <option value="+359">🇧🇬 +359</option>
                      <option value="+385">🇭🇷 +385</option>
                      <option value="+386">🇸🇮 +386</option>
                      <option value="+421">🇸🇰 +421</option>
                      <option value="+370">🇱🇹 +370</option>
                      <option value="+371">🇱🇻 +371</option>
                      <option value="+372">🇪🇪 +372</option>
                    </select>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="input-field flex-1"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Select your country code and enter your phone number without the country code
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Current Address *
                  </label>
                  <textarea
                    name="currentAddress"
                    value={formData.currentAddress}
                    onChange={handleInputChange}
                    placeholder="Enter your current address"
                    className="input-field"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Do you have a passport? *
                  </label>
                  <select
                    name="hasPassport"
                    value={formData.hasPassport}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="yes">Yes, I have a passport</option>
                    <option value="no">No, I don't have a passport yet</option>
                  </select>
                </div>

                {formData.hasPassport === 'yes' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FileText className="w-4 h-4 inline mr-2" />
                        Passport Number *
                      </label>
                      <input
                        type="text"
                        name="passportNumber"
                        value={formData.passportNumber}
                        onChange={handleInputChange}
                        placeholder="Enter your passport number"
                        className="input-field"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Passport Expiry Date *
                      </label>
                      <input
                        type="date"
                        name="passportExpiry"
                        value={formData.passportExpiry}
                        onChange={handleInputChange}
                        className="input-field"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Marital Status *
                  </label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select marital status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                    <option value="separated">Separated</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4 inline mr-2" />
                    Current Occupation *
                  </label>
                  <select
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select your current occupation</option>
                    <option value="student">Student</option>
                    <option value="worker">Worker</option>
                    <option value="business">Business</option>
                  </select>
                </div>

                {/* Education History - Only show for students */}
                {formData.occupation === 'student' && (
                  <div className="md:col-span-2">
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-800">Education History</h3>
                        <div className="text-sm text-gray-600">
                          {formData.educationHistory.length} of 7 entries
                        </div>
                      </div>
                      
                      {formData.educationHistory.map((entry, index) => (
                        <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="text-sm font-medium text-gray-700">
                              Education Entry {index + 1}
                            </h4>
                            {formData.educationHistory.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeEducationEntry(index)}
                                className="text-red-500 hover:text-red-700 p-1"
                                title="Remove this entry"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                Year *
                              </label>
                              <input
                                type="text"
                                value={entry.year}
                                onChange={(e) => handleEducationHistoryChange(index, 'year', e.target.value)}
                                placeholder="e.g., 2020-2024, 2023"
                                className="input-field text-sm"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                <MapPin className="w-3 h-3 inline mr-1" />
                                Place Name *
                              </label>
                              <input
                                type="text"
                                value={entry.place}
                                onChange={(e) => handleEducationHistoryChange(index, 'place', e.target.value)}
                                placeholder="School/University name and location"
                                className="input-field text-sm"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {formData.educationHistory.length < 7 && (
                        <button
                          type="button"
                          onClick={addEducationEntry}
                          className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-2 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Another Education Entry</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={handleNext}
                  disabled={!isPersonalInfoComplete()}
                  className="btn btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Next: Education & Employment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Education & Employment Background */}
          {currentStep === 2 && (
            <div className="card">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Education & Employment Background</h2>
                <p className="text-gray-600">Tell us about your educational background and work experience</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Education Level *
                  </label>
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select education level</option>
                    <option value="high-school">High School</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="phd">PhD</option>
                    <option value="senmon-gakkou">Senmon Gakkou (Vocational School)</option>
                    <option value="japanese-language-school">Japanese Language School</option>
                    <option value="other">Other</option>
                  </select>
                  
                  {/* Senmon Gakkou Category Dropdown */}
                  {formData.education === 'senmon-gakkou' && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Senmon Gakkou Category *
                      </label>
                      <select
                        name="senmonGakkouCategory"
                        value={formData.senmonGakkouCategory}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      >
                        <option value="">Select your category</option>
                        <option value="business-it">Business IT</option>
                        <option value="global-it">Global IT</option>
                        <option value="fashion-design">Fashion Design</option>
                        <option value="motor-mechanics">Motor Mechanics</option>
                        <option value="culinary-arts">Culinary Arts</option>
                        <option value="graphic-design">Graphic Design</option>
                        <option value="hospitality">Hospitality & Tourism</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="beauty-cosmetics">Beauty & Cosmetics</option>
                        <option value="animation-manga">Animation & Manga</option>
                        <option value="music-sound">Music & Sound</option>
                        <option value="architecture">Architecture</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4 inline mr-2" />
                    Work Experience (Years)
                  </label>
                  <input
                    type="number"
                    name="workExperience"
                    value={formData.workExperience}
                    onChange={handleInputChange}
                    placeholder="Years of work experience"
                    className="input-field"
                    min="0"
                    max="50"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    <User className="w-4 h-4 inline mr-2" />
                    Employment History
                  </label>
                  
                  {/* Employment Entry 1 - Most Recent */}
                  <div className="mb-4 p-4 border border-gray-200 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Most Recent Employment</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Workplace/Company Name
                        </label>
                        <input
                          type="text"
                          name="workplace1Name"
                          value={formData.workplace1Name}
                          onChange={handleInputChange}
                          placeholder="Enter company name"
                          className="input-field text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Employment Year/Period
                        </label>
                        <input
                          type="text"
                          name="workplace1Year"
                          value={formData.workplace1Year}
                          onChange={handleInputChange}
                          placeholder="e.g., 2020-2023 or 2023-Present"
                          className="input-field text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Employment Entry 2 - Previous */}
                  <div className="mb-4 p-4 border border-gray-200 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Previous Employment (Optional)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Workplace/Company Name
                        </label>
                        <input
                          type="text"
                          name="workplace2Name"
                          value={formData.workplace2Name}
                          onChange={handleInputChange}
                          placeholder="Enter company name"
                          className="input-field text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Employment Year/Period
                        </label>
                        <input
                          type="text"
                          name="workplace2Year"
                          value={formData.workplace2Year}
                          onChange={handleInputChange}
                          placeholder="e.g., 2018-2020"
                          className="input-field text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Employment Entry 3 - Earlier */}
                  <div className="mb-4 p-4 border border-gray-200 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Earlier Employment (Optional)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Workplace/Company Name
                        </label>
                        <input
                          type="text"
                          name="workplace3Name"
                          value={formData.workplace3Name}
                          onChange={handleInputChange}
                          placeholder="Enter company name"
                          className="input-field text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Employment Year/Period
                        </label>
                        <input
                          type="text"
                          name="workplace3Year"
                          value={formData.workplace3Year}
                          onChange={handleInputChange}
                          placeholder="e.g., 2015-2018"
                          className="input-field text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Details */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Employment Details (Optional)
                    </label>
                    <textarea
                      name="employmentHistory"
                      value={formData.employmentHistory}
                      onChange={handleInputChange}
                      placeholder="Include job titles, responsibilities, achievements, or other relevant details about your work experience"
                      className="input-field"
                      rows={3}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Describe your roles, responsibilities, and any achievements relevant to your visa application
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevious}
                  className="btn btn-outline flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={!isEducationEmploymentComplete()}
                  className="btn btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Next: Visa Category</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Visa Category Selection */}
          {currentStep === 3 && (
            <div className="card">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Choose Your Visa Category</h2>
                <p className="text-gray-600">Select the visa category that best fits your situation</p>
                {formData.age && (
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      <span className="font-medium">Your age:</span> {formData.age} years old
                      {!isEligibleForEngineering() && (
                        <span className="text-red-600 ml-2">
                          (Engineering Visa requires 24+ years old)
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getAvailableVisaCategories().map((visa) => (
                  <div
                    key={visa.id}
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                      formData.visaCategory === visa.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${visa.id === 'engineering' && !isEligibleForEngineering() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => {
                      if (visa.id !== 'engineering' || isEligibleForEngineering()) {
                        setFormData(prev => ({ ...prev, visaCategory: visa.id }));
                      }
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{visa.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2">{visa.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{visa.description}</p>
                        <p className="text-xs text-gray-500">{visa.requirements}</p>
                        {visa.id === 'engineering' && !isEligibleForEngineering() && (
                          <p className="text-red-500 text-xs mt-2 font-medium">
                            Not eligible (requires 24+ years old)
                          </p>
                        )}
                      </div>
                      {formData.visaCategory === visa.id && (
                        <CheckCircle className="w-5 h-5 text-primary-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {formData.visaCategory && (
                <div className="mt-8 space-y-6">
                  {/* Japanese Language Section */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Japanese Language Proficiency</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Globe className="w-4 h-4 inline mr-2" />
                          Japanese Language Level *
                        </label>
                        <select
                          name="japaneseLanguageLevel"
                          value={formData.japaneseLanguageLevel}
                          onChange={handleInputChange}
                          className="input-field"
                          required
                        >
                          <option value="">Select your Japanese level</option>
                          <option value="beginner">Beginner (N5-N4 level)</option>
                          <option value="intermediate">Intermediate (N3-N2 level)</option>
                          <option value="advanced">Advanced (N1 level)</option>
                          <option value="native">Native/Near-Native</option>
                          <option value="none">No Japanese knowledge</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FileText className="w-4 h-4 inline mr-2" />
                          Which Japanese Exam Have You Taken? *
                        </label>
                        <select
                          name="japaneseExam"
                          value={formData.japaneseExam}
                          onChange={handleInputChange}
                          className="input-field"
                          required
                        >
                          <option value="">Select exam type</option>
                          <option value="jlpt">JLPT (Japanese Language Proficiency Test)</option>
                          <option value="nat">NAT-TEST (Nihongo Ability Test)</option>
                          <option value="topj">TopJ (Test of Practical Japanese)</option>
                          <option value="jft">JFT-Basic (Japan Foundation Test for Basic Japanese)</option>
                          <option value="other">Other Japanese exam</option>
                          <option value="none">No exam taken yet</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Location and Date Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Preferred Location in Japan
                      </label>
                      <select
                        name="preferredLocation"
                        value={formData.preferredLocation}
                        onChange={handleInputChange}
                        className="input-field"
                      >
                        <option value="">Select preferred location</option>
                        <option value="tokyo">Tokyo</option>
                        <option value="osaka">Osaka</option>
                        <option value="kyoto">Kyoto</option>
                        <option value="yokohama">Yokohama</option>
                        <option value="nagoya">Nagoya</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Expected Start Date
                      </label>
                      <input
                        type="date"
                        name="expectedStartDate"
                        value={formData.expectedStartDate}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevious}
                  className="btn btn-outline flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={!isVisaSelectionComplete()}
                  className="btn btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Complete Profile</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 