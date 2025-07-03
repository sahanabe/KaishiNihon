import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  Users,
  MessageCircle,
  Calendar,
  DollarSign,
  Award,
  BookOpen,
  Globe,
  CheckCircle,
  X,
  Send,
  CreditCard,
  PlayCircle,
  Video,
  Monitor,
  Headphones,
  FileText,
  Download,
  Heart,
  Share2,
  Phone,
  Mail,
  Wifi,
  Smartphone,
  Tablet,
  ChevronRight,
  Info,
  Flag,
  GraduationCap,
  Briefcase,
  Zap,
  Target,
  TrendingUp,
  Languages,
  Camera
} from 'lucide-react';

interface LecturerClass {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: number;
  price: string | number;
  maxStudents: number;
  currentStudents: number;
  schedule: string[];
  materials: string[];
  category: string;
  isLive: boolean;
  nextSession?: string;
}

interface OnlineLecturer {
  id: string;
  name: string;
  avatar: string;
  coverImage: string;
  country: string;
  city: string;
  timezone: string;
  languages: string[];
  nativeLanguage: string;
  specialties: string[];
  rating: number;
  totalStudents: number;
  totalReviews: number;
  experience: number;
  hourlyRate: number;
  responseTime: string;
  lessonsCompleted: number;
  bio: string;
  education: string[];
  certifications: string[];
  teachingStyle: string;
  availability: {
    timezone: string;
    schedule: { [key: string]: string[] };
  };
  classes: LecturerClass[];
  features: string[];
  isOnline: boolean;
  joinedDate: string;
  videoIntro?: string;
}

const OnlineClass: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedLanguage, setSelectedLanguage] = useState('All Languages');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLecturer, setSelectedLecturer] = useState<OnlineLecturer | null>(null);
  const [selectedClass, setSelectedClass] = useState<LecturerClass | null>(null);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [message, setMessage] = useState('');

  // Sample online lecturers data from around the world
  const onlineLecturers: OnlineLecturer[] = [
    {
      id: 'sahan-abeysinghe',
      name: 'Sahan Abeysinghe',
      avatar: '/api/placeholder/200/200',
      coverImage: '/api/placeholder/1200/400',
      country: 'Japan',
      city: 'Niigata',
      timezone: 'Asia/Tokyo',
      languages: ['Japanese', 'English', 'Sinhala'],
      nativeLanguage: 'Sinhala',
      specialties: ['Japanese Language', 'Business Japanese', 'Spoken Japanese', 'JLPT Preparation'],
      rating: 5,
      totalStudents: 1250,
      totalReviews: 420,
      experience: 8,
      hourlyRate: 1500,
      responseTime: '< 2 hours',
      lessonsCompleted: 3420,
      bio: 'Japanese language educator based in Niigata, Japan with 8+ years of experience. Specialized in teaching Japanese and Business Japanese in English and Sinhala languages. Holds N1 certification and provides comprehensive language instruction for students worldwide.',
      education: [
        'Master\'s in Japanese Linguistics - University of Tokyo',
        'Bachelor\'s in International Relations - University of Colombo',
        'Teaching Certification - Japan Foundation'
      ],
      certifications: [
        'JLPT N1 Certified',
        'Certified Japanese Language Teacher', 
        'Business Japanese Specialist Certificate',
        'Cultural Exchange Program Graduate'
      ],
      teachingStyle: 'Interactive and student-centered approach with focus on practical application',
      availability: {
        timezone: 'Asia/Tokyo',
        schedule: {
          'Monday': ['9:00-12:00', '18:00-21:00'],
          'Tuesday': ['9:00-12:00', '18:00-21:00'],
          'Wednesday': ['9:00-12:00', '18:00-21:00'],
          'Thursday': ['9:00-12:00', '18:00-21:00'],
          'Friday': ['9:00-12:00', '18:00-21:00'],
          'Saturday': ['14:00-20:00'],
          'Sunday': ['14:00-18:00']
        }
      },
      classes: [
        {
          id: 'jlpt-n5-course',
          title: 'JLPT N5 Full Course',
          description: 'Complete N5 preparation in English and Sinhala - 4 months duration',
          level: 'Beginner',
          duration: 240,
          price: '¥15,000',
          maxStudents: 10,
          currentStudents: 7,
          schedule: ['Monday 19:00', 'Wednesday 19:00', 'Friday 19:00'],
          materials: ['Genki I Textbook', 'Custom Workbook', 'Audio Materials', 'Practice Tests'],
          category: 'JLPT Preparation',
          isLive: true,
          nextSession: 'January 15, 2024 - 19:00 JST'
        },
        {
          id: 'jlpt-n4-course',
          title: 'JLPT N4 Full Course',
          description: 'Complete N4 preparation in English and Sinhala - 4 months duration',
          level: 'Elementary',
          duration: 240,
          price: '¥17,500',
          maxStudents: 8,
          currentStudents: 5,
          schedule: ['Tuesday 18:00', 'Thursday 18:00', 'Saturday 14:00'],
          materials: ['Genki II Textbook', 'Grammar Guide', 'Vocabulary Lists', 'Mock Exams'],
          category: 'JLPT Preparation',
          isLive: true,
          nextSession: 'January 16, 2024 - 18:00 JST'
        },
        {
          id: 'jlpt-n3-course',
          title: 'JLPT N3 Full Course',
          description: 'Complete N3 preparation in English and Sinhala - 5 months duration',
          level: 'Intermediate',
          duration: 300,
          price: '¥25,000',
          maxStudents: 6,
          currentStudents: 4,
          schedule: ['Monday 20:00', 'Wednesday 20:00', 'Friday 20:00'],
          materials: ['Intermediate Textbook', 'Kanji Practice', 'Reading Comprehension', 'Listening Materials'],
          category: 'JLPT Preparation',
          isLive: true,
          nextSession: 'January 17, 2024 - 20:00 JST'
        },
        {
          id: 'jlpt-n2-course',
          title: 'JLPT N2 Full Course',
          description: 'Complete N2 preparation in English and Sinhala - 6 months duration',
          level: 'Upper-Intermediate',
          duration: 360,
          price: '¥40,000',
          maxStudents: 5,
          currentStudents: 3,
          schedule: ['Tuesday 19:00', 'Thursday 19:00', 'Sunday 15:00'],
          materials: ['Advanced Grammar', 'Complex Kanji', 'Business Texts', 'News Articles'],
          category: 'JLPT Preparation',
          isLive: true,
          nextSession: 'January 18, 2024 - 19:00 JST'
        },
        {
          id: 'jlpt-n1-course',
          title: 'JLPT N1 Full Course',
          description: 'Complete N1 preparation in English and Sinhala - 7 months duration',
          level: 'Advanced',
          duration: 420,
          price: '¥50,000',
          maxStudents: 4,
          currentStudents: 2,
          schedule: ['Monday 21:00', 'Wednesday 21:00', 'Saturday 16:00'],
          materials: ['Academic Texts', 'Literary Works', 'Expert Grammar', 'Professional Materials'],
          category: 'JLPT Preparation',
          isLive: true,
          nextSession: 'January 19, 2024 - 21:00 JST'
        },
        {
          id: 'spoken-japanese',
          title: 'Spoken Japanese Mastery',
          description: 'Conversational Japanese practice in English and Sinhala guidance',
          level: 'All Levels',
          duration: 60,
          price: '¥2,000',
          maxStudents: 6,
          currentStudents: 4,
          schedule: ['Daily sessions available'],
          materials: ['Conversation Practice', 'Pronunciation Guide', 'Cultural Context'],
          category: 'Spoken Japanese',
          isLive: true,
          nextSession: 'Daily availability'
        },
        {
          id: 'business-japanese',
          title: 'Business Japanese Mastery',
          description: 'Professional Business Japanese for workplace communication',
          level: 'Intermediate to Advanced',
          duration: 90,
          price: '¥3,000',
          maxStudents: 6,
          currentStudents: 4,
          schedule: ['Tuesday 18:00', 'Thursday 18:00', 'Saturday 17:00'],
          materials: ['Business Keigo', 'Email Templates', 'Meeting Language', 'Presentation Skills'],
          category: 'Business Japanese',
          isLive: true,
          nextSession: 'January 16, 2024 - 18:00 JST'
        },
        {
          id: 'interview-practice',
          title: 'Japanese Interview Practice',
          description: 'Job interview preparation and practice in Japanese with English/Sinhala support',
          level: 'Intermediate to Advanced',
          duration: 60,
          price: '¥2,500',
          maxStudents: 3,
          currentStudents: 2,
          schedule: ['Flexible scheduling', 'One-on-one sessions'],
          materials: ['Interview Questions', 'Resume Templates', 'Mock Interviews', 'Industry Vocabulary'],
          category: 'Interview Preparation',
          isLive: true,
          nextSession: 'Flexible booking available'
        }
      ],
      features: [
        'Interactive video lessons',
        'Personalized feedback',
        'Live Q&A sessions',
        'Mobile app access',
        'Certificate of completion'
      ],
      isOnline: true,
      joinedDate: '2019-03-15',
      videoIntro: '/api/video/sahan-intro'
    }
  ];

  const categories = ['All Categories', 'JLPT Preparation', 'Business Japanese', 'Cultural Japanese', 'Conversational Japanese'];
  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
  const countries = ['All Countries', ...Array.from(new Set(onlineLecturers.map(l => l.country)))];
  const languages = ['All Languages', ...Array.from(new Set(onlineLecturers.flatMap(l => l.languages)))];

  const filteredLecturers = onlineLecturers.filter(lecturer => {
    const matchesCategory = selectedCategory === 'All Categories' || 
                           lecturer.specialties.some(specialty => 
                             specialty.toLowerCase().includes(selectedCategory.toLowerCase().replace(' japanese', '').replace('jlpt preparation', 'jlpt'))
                           );
    const matchesLevel = selectedLevel === 'All Levels' || 
                        lecturer.classes.some(classItem => classItem.level === selectedLevel);
    const matchesLanguage = selectedLanguage === 'All Languages' || 
                           lecturer.languages.includes(selectedLanguage);
    const matchesSearch = lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lecturer.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lecturer.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         lecturer.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesLevel && matchesLanguage && matchesSearch;
  });

  const handleLecturerClick = (lecturer: OnlineLecturer) => {
    setSelectedLecturer(lecturer);
    setShowScheduleModal(true);
  };

  const handleClassClick = (lecturer: OnlineLecturer, classItem: LecturerClass) => {
    setSelectedLecturer(lecturer);
    setSelectedClass(classItem);
    setShowEnrollModal(true);
  };

  const handleMessageClick = (lecturer: OnlineLecturer) => {
    setSelectedLecturer(lecturer);
    setShowMessageModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section with Advanced Search */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 opacity-10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-8 border border-white/30">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Live Online Classes Available 24/7
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Learn Japanese with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 animate-gradient-x"> World-Class Lecturers</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Connect with passionate Japanese language instructors from around the globe. 
              <span className="font-semibold text-yellow-200"> Choose from hundreds of qualified lecturers</span> teaching everything from basic conversation to advanced business Japanese.
            </p>
            
            {/* Advanced Search & Filter Section */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mx-auto max-w-6xl border border-white/20">
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {/* Search Input */}
                <div className="lg:col-span-2 relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search lecturers, countries, specialties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  />
                </div>

                {/* Category Filter */}
                <div className="relative group">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 appearance-none bg-white/80 backdrop-blur-sm cursor-pointer"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
                </div>

                {/* Country Filter */}
                <div className="relative group">
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 appearance-none bg-white/80 backdrop-blur-sm cursor-pointer"
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  <Globe className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
                </div>

                {/* Language Filter */}
                <div className="relative group">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 appearance-none bg-white/80 backdrop-blur-sm cursor-pointer"
                  >
                    {languages.map(language => (
                      <option key={language} value={language}>{language}</option>
                    ))}
                  </select>
                  <Languages className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
                </div>
              </div>

              <div className="flex items-center justify-between text-gray-600">
                <div className="flex items-center space-x-8">
                  <span className="flex items-center bg-blue-50 px-4 py-2 rounded-full">
                    <Users className="h-5 w-5 mr-2 text-blue-600" />
                    <span className="font-semibold text-blue-900">{filteredLecturers.length}</span> lecturers available
                  </span>
                  <span className="flex items-center bg-green-50 px-4 py-2 rounded-full">
                    <Globe className="h-5 w-5 mr-2 text-green-600" />
                    <span className="font-semibold text-green-900">{countries.length - 1}</span> countries
                  </span>
                  <span className="flex items-center bg-purple-50 px-4 py-2 rounded-full">
                    <Wifi className="h-5 w-5 mr-2 text-purple-600" />
                    Online classes 24/7
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Our Expert Lecturers Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Expert Lecturers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from certified Japanese language instructors with years of teaching experience
            </p>
          </div>
        </div>
      </div>

      {/* Lecturers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredLecturers.map((lecturer) => (
            <div key={lecturer.id} className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 h-[700px]">
              {/* Modern Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
              
              {/* Glassmorphism Card Container */}
              <div className="relative h-full p-10 flex flex-col backdrop-blur-sm bg-white/80 border border-white/20 overflow-y-auto">
                {/* Header Section */}
                <div className="flex items-start justify-between mb-8">
                  {/* Profile Image */}
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-white shadow-lg">
                      <img
                        src={lecturer.avatar}
                        alt={lecturer.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    {lecturer.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-2 border-white shadow-lg">
                        <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Status Badges */}
                  <div className="flex flex-col items-end space-y-3">
                    {lecturer.isOnline && (
                      <span className="bg-green-500 text-white px-5 py-2 rounded-full text-base font-semibold flex items-center shadow-lg">
                        <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                        Live Now
                      </span>
                    )}
                    <span className="bg-blue-100 text-blue-800 px-5 py-2 rounded-full text-base font-medium">
                      {lecturer.country}
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-5 py-2 rounded-full text-base font-medium">
                      {lecturer.timezone}
                    </span>
                  </div>
                </div>

                {/* Name and Location */}
                <div className="mb-6">
                  <h3 className="font-bold text-3xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {lecturer.name}
                  </h3>
                  <p className="text-gray-600 text-lg flex items-center">
                    <MapPin className="h-6 w-6 mr-3 text-blue-500" />
                    {lecturer.city}, {lecturer.country}
                  </p>
                </div>

                {/* Bio Preview */}
                <div className="mb-6">
                  <h4 className="text-base font-semibold text-gray-700 mb-2">About:</h4>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                    {lecturer.bio}
                  </p>
                </div>

                {/* Rating and Price Row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-6 w-6 fill-current" />
                      <span className="ml-2 font-bold text-xl">{lecturer.rating}</span>
                    </div>
                    <span className="text-gray-500 text-base">({lecturer.totalReviews} reviews)</span>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-blue-600">${lecturer.hourlyRate}</p>
                    <p className="text-base text-gray-500">per hour</p>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-6">
                  <h4 className="text-base font-semibold text-gray-700 mb-3">Languages:</h4>
                  <div className="flex flex-wrap gap-2">
                    {lecturer.languages.map((language, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-6">
                  <h4 className="text-base font-semibold text-gray-700 mb-3">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {lecturer.specialties.map((specialty, index) => (
                      <span key={index} className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education & Certifications */}
                <div className="mb-6">
                  <h4 className="text-base font-semibold text-gray-700 mb-3">Education & Certifications:</h4>
                  <div className="space-y-2">
                    {lecturer.education.map((edu, index) => (
                      <p key={index} className="text-gray-600 text-sm">• {edu}</p>
                    ))}
                    {lecturer.certifications.map((cert, index) => (
                      <p key={index} className="text-gray-600 text-sm">• {cert}</p>
                    ))}
                  </div>
                </div>

                {/* Teaching Style */}
                <div className="mb-6">
                  <h4 className="text-base font-semibold text-gray-700 mb-2">Teaching Style:</h4>
                  <p className="text-gray-600 text-sm">{lecturer.teachingStyle}</p>
                </div>

                {/* Response Time */}
                <div className="mb-6">
                  <h4 className="text-base font-semibold text-gray-700 mb-2">Response Time:</h4>
                  <p className="text-gray-600 text-sm">{lecturer.responseTime}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl text-center border border-blue-200">
                    <p className="text-2xl font-bold text-blue-900">{lecturer.totalStudents}</p>
                    <p className="text-sm text-blue-700">Students</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl text-center border border-purple-200">
                    <p className="text-2xl font-bold text-purple-900">{lecturer.experience}y</p>
                    <p className="text-sm text-purple-700">Experience</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl text-center border border-green-200">
                    <p className="text-2xl font-bold text-green-900">{lecturer.lessonsCompleted}</p>
                    <p className="text-sm text-green-700">Lessons</p>
                  </div>
                </div>

                {/* Available Classes Preview */}
                <div className="mb-8">
                  <h4 className="text-base font-semibold text-gray-700 mb-3">Available Classes:</h4>
                  <div className="space-y-2">
                    {lecturer.classes.slice(0, 3).map((classItem, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-sm text-gray-900">{classItem.title}</p>
                            <p className="text-xs text-gray-600">{classItem.level} • {classItem.duration}min</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-sm text-blue-600">
                              {typeof classItem.price === 'string' ? classItem.price : `$${classItem.price}`}
                            </p>
                            <p className="text-xs text-gray-500">{classItem.currentStudents}/{classItem.maxStudents} students</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-auto space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleLecturerClick(lecturer)}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleMessageClick(lecturer)}
                      className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-8 py-4 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 text-base font-semibold border border-gray-200 hover:border-gray-300"
                    >
                      Message
                    </button>
                  </div>
                  
                  {/* Quick Book Button */}
                  {lecturer.classes.length > 0 && (
                    <button
                      onClick={() => handleClassClick(lecturer, lecturer.classes[0])}
                      className="w-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-green-600 hover:via-blue-600 hover:to-purple-700 transition-all duration-300 text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Book {typeof lecturer.classes[0].price === 'string' ? lecturer.classes[0].price : `$${lecturer.classes[0].price}`} Class
                    </button>
                  )}
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-8 right-8 w-28 h-28 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-8 left-8 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
              </div>
            </div>
          ))}
        </div>

        {filteredLecturers.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No lecturers found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse all available lecturers.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Categories');
                  setSelectedLevel('All Countries');
                  setSelectedLanguage('All Languages');
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Download Apps Section */}
      <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 py-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-200 rounded-full opacity-20 blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Download className="w-4 h-4 mr-2" />
              Enhanced Learning Tools
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Download Our Apps for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Better Learning</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get the most out of your Japanese learning journey with our dedicated apps for video meetings and online classes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* KaishiMeets App */}
            <div className="group bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 rounded-3xl p-8 border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Video className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">KaishiMeets</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Our dedicated video conferencing app optimized for language learning with built-in translation, screen sharing, and interactive whiteboard features.
                </p>
                <div className="space-y-4">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
                    <Download className="w-5 h-5 mr-3" />
                    Download for Windows
                  </button>
                  <button className="w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-4 rounded-xl hover:from-gray-800 hover:to-gray-900 transition-all duration-300 font-semibold flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
                    <Download className="w-5 h-5 mr-3" />
                    Download for Mac
                  </button>
                </div>
                <div className="mt-6 text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-full inline-block">
                  Version 2.1.0 • 45.2 MB
                </div>
              </div>
            </div>

            {/* KaishiMeets Online App */}
            <div className="group bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 rounded-3xl p-8 border border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Monitor className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">KaishiMeets Online</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Web-based platform for online classes with integrated learning tools, progress tracking, and collaborative features.
                </p>
                <div className="space-y-4">
                  <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 font-semibold flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
                    <Globe className="w-5 h-5 mr-3" />
                    Launch Web App
                  </button>
                  <button className="w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-4 rounded-xl hover:from-gray-800 hover:to-gray-900 transition-all duration-300 font-semibold flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
                    <Download className="w-5 h-5 mr-3" />
                    Browser Extension
                  </button>
                </div>
                <div className="mt-6 text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-full inline-block">
                  Always up to date • No installation required
                </div>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="group text-center p-6 rounded-2xl hover:bg-white/50 transition-all duration-300 hover:shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">High-Quality Audio</h4>
              <p className="text-gray-600 leading-relaxed">Crystal clear sound for perfect pronunciation practice with noise cancellation technology</p>
            </div>
            <div className="group text-center p-6 rounded-2xl hover:bg-white/50 transition-all duration-300 hover:shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Shared Materials</h4>
              <p className="text-gray-600 leading-relaxed">Instant access to lesson materials, textbooks, and interactive resources</p>
            </div>
            <div className="group text-center p-6 rounded-2xl hover:bg-white/50 transition-all duration-300 hover:shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Progress Tracking</h4>
              <p className="text-gray-600 leading-relaxed">Monitor your learning progress in real-time with detailed analytics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && selectedLecturer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold">
                {selectedLecturer.name}'s Schedule & Classes
              </h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Lecturer Overview */}
              <div className="flex items-start space-x-6 mb-8">
                <img
                  src={selectedLecturer.avatar}
                  alt={selectedLecturer.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-2">{selectedLecturer.name}</h4>
                  <p className="text-gray-600 mb-2">{selectedLecturer.bio}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current mr-1" />
                      {selectedLecturer.rating} ({selectedLecturer.totalReviews} reviews)
                    </span>
                    <span className="text-gray-600">{selectedLecturer.experience} years experience</span>
                    <span className="text-blue-600 font-medium">${selectedLecturer.hourlyRate}/hr</span>
                  </div>
                </div>
              </div>

              {/* Available Classes */}
              <div className="mb-8">
                <h5 className="text-lg font-bold mb-4">Available Classes</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedLecturer.classes.map((classItem) => (
                    <div key={classItem.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <h6 className="font-bold text-gray-900">{classItem.title}</h6>
                        <span className="text-lg font-bold text-blue-600">
                          {typeof classItem.price === 'string' ? classItem.price : `$${classItem.price}`}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{classItem.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="font-medium">Level:</span> {classItem.level}
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span> {classItem.duration}min
                        </div>
                        <div>
                          <span className="font-medium">Students:</span> {classItem.currentStudents}/{classItem.maxStudents}
                        </div>
                        <div>
                          <span className="font-medium">Category:</span> {classItem.category}
                        </div>
                      </div>

                      <div className="mb-3">
                        <span className="font-medium text-sm">Schedule:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {classItem.schedule.map((time, index) => (
                            <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>

                      {classItem.nextSession && (
                        <div className="bg-green-50 border border-green-200 rounded p-2 mb-3">
                          <span className="text-green-700 text-sm font-medium">Next Session: {classItem.nextSession}</span>
                        </div>
                      )}

                      <button
                        onClick={() => {
                          setSelectedClass(classItem);
                          setShowScheduleModal(false);
                          setShowEnrollModal(true);
                        }}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Book This Class
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Schedule */}
              <div>
                <h5 className="text-lg font-bold mb-4">Weekly Availability ({selectedLecturer.availability.timezone})</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(selectedLecturer.availability.schedule).map(([day, times]) => (
                    <div key={day} className="border border-gray-200 rounded-lg p-3">
                      <h6 className="font-medium mb-2">{day}</h6>
                      {times[0] === 'Unavailable' ? (
                        <span className="text-gray-500 text-sm">Unavailable</span>
                      ) : (
                        <div className="space-y-1">
                          {times.map((time, index) => (
                            <div key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                              {time}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedLecturer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold">
                Message {selectedLecturer.name}
              </h3>
              <button
                onClick={() => setShowMessageModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={selectedLecturer.avatar}
                  alt={selectedLecturer.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold">{selectedLecturer.name}</h4>
                  <p className="text-gray-600 text-sm">Responds in {selectedLecturer.responseTime}</p>
                </div>
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              />

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    // Handle send message
                    alert(`Message sent to ${selectedLecturer.name}: ${message}`);
                    setMessage('');
                    setShowMessageModal(false);
                  }}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </button>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enrollment Modal */}
      {showEnrollModal && selectedClass && selectedLecturer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold">
                Book: {selectedClass.title}
              </h3>
              <button
                onClick={() => setShowEnrollModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Class & Lecturer Info */}
              <div className="flex items-start space-x-4 mb-6">
                <img
                  src={selectedLecturer.avatar}
                  alt={selectedLecturer.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-bold mb-1">{selectedClass.title}</h4>
                  <p className="text-gray-600 mb-2">with {selectedLecturer.name}</p>
                  <p className="text-gray-600 text-sm">{selectedClass.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">
                    {typeof selectedClass.price === 'string' ? selectedClass.price : `$${selectedClass.price}`}
                  </p>
                  <p className="text-gray-500 text-sm">per course</p>
                </div>
              </div>

              {/* Class Details */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h5 className="font-bold mb-3">Class Details</h5>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Level:</span> {selectedClass.level}</div>
                    <div><span className="font-medium">Duration:</span> {selectedClass.duration} minutes</div>
                    <div><span className="font-medium">Category:</span> {selectedClass.category}</div>
                    <div><span className="font-medium">Max Students:</span> {selectedClass.maxStudents}</div>
                    <div><span className="font-medium">Current Students:</span> {selectedClass.currentStudents}</div>
                  </div>
                </div>
                <div>
                  <h5 className="font-bold mb-3">Schedule</h5>
                  <div className="space-y-1">
                    {selectedClass.schedule.map((time, index) => (
                      <div key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">
                        {time}
                      </div>
                    ))}
                  </div>
                  {selectedClass.nextSession && (
                    <div className="mt-3 bg-green-50 border border-green-200 rounded p-2">
                      <span className="text-green-700 text-sm font-medium">Next Session: {selectedClass.nextSession}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Materials */}
              <div className="mb-6">
                <h5 className="font-bold mb-3">Included Materials</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedClass.materials.map((material, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {material}
                    </span>
                  ))}
                </div>
              </div>

              {/* Payment Options */}
              <div className="mb-6">
                <h5 className="font-bold mb-3">Payment Options</h5>
                <div className="grid grid-cols-2 gap-3">
                  <button className="border-2 border-blue-500 bg-blue-50 text-blue-700 px-4 py-3 rounded-lg font-medium flex items-center justify-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Credit Card
                  </button>
                  <button className="border-2 border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium flex items-center justify-center hover:bg-gray-50">
                    <DollarSign className="h-5 w-5 mr-2" />
                    PayPal
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    alert(`Successfully booked ${selectedClass.title} with ${selectedLecturer.name}!`);
                    setShowEnrollModal(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all font-medium flex items-center justify-center"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Book Class - {typeof selectedClass.price === 'string' ? selectedClass.price : `$${selectedClass.price}`}
                </button>
                <button
                  onClick={() => setShowEnrollModal(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineClass; 