import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Users,
  MessageCircle,
  Video,
  Calendar,
  DollarSign,
  Award,
  BookOpen,
  Play,
  Heart,
  Share2,
  CheckCircle,
  Trophy,
  X,
  Send,
  ChevronRight,
  ChevronLeft,
  Eye,
  Camera,
  Phone,
  Download,
  Bookmark,
  Zap,
  Target,
  Globe,
  ThumbsUp
} from 'lucide-react';

const LecturerProfile: React.FC = () => {
  const { lecturerId } = useParams<{ lecturerId: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showVideoPreview, setShowVideoPreview] = useState(false);
  const [message, setMessage] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Enhanced lecturer data
  const lecturerData = {
    'sahan-abeysinghe': {
      name: 'Sahan Abeysinghe',
      title: 'Master Japanese Language Instructor',
      avatar: '/api/placeholder/200/200',
      coverImage: '/api/placeholder/1200/400',
      country: 'Japan',
      city: 'Niigata',
      languages: ['Japanese', 'English', 'Sinhala'],
      specialties: ['JLPT Preparation', 'Business Japanese', 'Conversational Japanese', 'Cultural Studies'],
      rating: 5,
      totalStudents: 1250,
      experience: 8,
      hourlyRate: 1500,
      responseTime: '< 2 hours',
      lessonsCompleted: 3420,
      availability: 'Mon-Fri 9AM-8PM JST',
      bio: 'Passionate Japanese language educator with 8+ years of experience. Specialized in JLPT preparation and business Japanese. Lived in Japan for 5 years and holds N1 certification. I believe in making learning fun and practical, connecting language with real-world applications.',
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
      achievements: [
        {
          id: '1',
          title: 'Top Rated Instructor',
          description: 'Maintained 5.0 rating for 2+ years',
          icon: '🏆',
          color: 'from-yellow-400 to-orange-500',
          unlockedDate: '2023'
        },
        {
          id: '2',
          title: 'Student Favorite',
          description: '1000+ students taught successfully',
          icon: '❤️',
          color: 'from-pink-400 to-red-500',
          unlockedDate: '2023'
        },
        {
          id: '3',
          title: 'Master Educator',
          description: '5000+ hours of teaching experience',
          icon: '🎓',
          color: 'from-blue-400 to-indigo-500',
          unlockedDate: '2024'
        }
      ],
      gallery: [
        '/api/placeholder/400/300',
        '/api/placeholder/400/300',
        '/api/placeholder/400/300',
        '/api/placeholder/400/300'
      ],
      upcomingSessions: [
        {
          id: '1',
          title: 'JLPT N5 Grammar Intensive',
          date: '2024-01-15',
          time: '19:00',
          duration: 60,
          type: 'live' as const,
          students: 6,
          maxStudents: 8,
          price: 1500,
          level: 'Beginner'
        },
        {
          id: '2',
          title: 'Business Keigo Masterclass',
          date: '2024-01-16',
          time: '18:00',
          duration: 90,
          type: 'live' as const,
          students: 4,
          maxStudents: 6,
          price: 1500,
          level: 'Advanced'
        }
      ],
      reviews: [
        {
          id: '1',
          studentName: 'Emily Chen',
          studentAvatar: '/api/placeholder/50/50',
          rating: 5,
          comment: 'Sahan is an amazing teacher! His explanations are clear and he makes learning Japanese fun. I passed my JLPT N5 thanks to his classes.',
          date: '2024-01-10',
          classTitle: 'JLPT N5 Preparation'
        },
        {
          id: '2',
          studentName: 'Mark Johnson',
          studentAvatar: '/api/placeholder/50/50',
          rating: 5,
          comment: 'Excellent business Japanese lessons. Sahan helped me prepare for my job interview in Tokyo. Highly recommended!',
          date: '2024-01-08',
          classTitle: 'Business Japanese'
        },
        {
          id: '3',
          studentName: 'Sarah Williams',
          studentAvatar: '/api/placeholder/50/50',
          rating: 5,
          comment: 'Great teacher with lots of patience. He explains complex grammar in a way that\'s easy to understand.',
          date: '2024-01-05',
          classTitle: 'Conversational Japanese'
        }
      ]
    }
  };

  const lecturer = lecturerData[lecturerId as keyof typeof lecturerData];

  if (!lecturer) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Lecturer Not Found</h1>
          <Link to="/become-lecturer" className="text-blue-600 hover:text-blue-800">
            Back to Lecturers
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % lecturer.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + lecturer.gallery.length) % lecturer.gallery.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 overflow-hidden">
        <img
          src={lecturer.coverImage}
          alt="Cover"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Back Button */}
        <Link
          to="/become-lecturer"
          className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center space-x-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Lecturers</span>
        </Link>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex space-x-3">
          <button className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-lg hover:bg-white/30 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsFollowing(!isFollowing)}
            className={`p-3 rounded-lg transition-colors ${
              isFollowing 
                ? 'bg-red-500 text-white' 
                : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFollowing ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Profile Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-7xl mx-auto flex items-end space-x-6">
            <img
              src={lecturer.avatar}
              alt={lecturer.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="flex-grow text-white mb-4">
              <h1 className="text-4xl font-bold mb-2">{lecturer.name}</h1>
              <p className="text-xl mb-2">{lecturer.title}</p>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{lecturer.city}, {lecturer.country}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span>{lecturer.rating} ({lecturer.totalStudents} students)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Responds in {lecturer.responseTime}</span>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex space-x-3 mb-4">
              <button
                onClick={() => setShowMessageModal(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 font-medium"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Message</span>
              </button>
              <button
                onClick={() => setShowVideoPreview(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 font-medium"
              >
                <Video className="w-5 h-5" />
                <span>Preview</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: <Eye className="w-4 h-4" /> },
              { id: 'classes', label: 'Classes & Schedule', icon: <Calendar className="w-4 h-4" /> },
              { id: 'achievements', label: 'Achievements', icon: <Trophy className="w-4 h-4" /> },
              { id: 'reviews', label: 'Reviews', icon: <Star className="w-4 h-4" /> },
              { id: 'gallery', label: 'Gallery', icon: <Camera className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'overview' && (
              <>
                {/* About Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">About {lecturer.name}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{lecturer.bio}</p>
                  
                  {/* Specialties */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {lecturer.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {lecturer.languages.map((language, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Education & Certifications */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Education & Certifications</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                        <BookOpen className="w-5 h-5 text-blue-500" />
                        <span>Education</span>
                      </h3>
                      <div className="space-y-3">
                        {lecturer.education.map((edu, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                            <span className="text-sm text-gray-700">{edu}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                        <Award className="w-5 h-5 text-purple-500" />
                        <span>Certifications</span>
                      </h3>
                      <div className="space-y-3">
                        {lecturer.certifications.map((cert, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                            <span className="text-sm text-gray-700">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'classes' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Upcoming Classes</h2>
                {lecturer.upcomingSessions.map((session) => (
                  <div key={session.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className="flex-grow">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-800">{session.title}</h3>
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                            {session.level}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{session.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{session.time} ({session.duration}min)</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>{session.students}/{session.maxStudents} students</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4" />
                            <span>${session.price}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            {session.type === 'live' && (
                              <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                <span>Live</span>
                              </span>
                            )}
                            <span className="text-sm text-gray-600">
                              {session.maxStudents - session.students} spots left
                            </span>
                          </div>
                          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Achievements & Badges</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {lecturer.achievements.map((achievement) => (
                    <div key={achievement.id} className={`bg-gradient-to-r ${achievement.color} rounded-xl p-6 text-white`}>
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{achievement.icon}</div>
                        <div>
                          <h3 className="text-xl font-bold mb-1">{achievement.title}</h3>
                          <p className="text-white/90 text-sm mb-2">{achievement.description}</p>
                          <span className="text-white/80 text-xs">Unlocked in {achievement.unlockedDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">Student Reviews</h2>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-bold text-lg">{lecturer.rating}</span>
                    <span className="text-gray-600">({lecturer.reviews.length} reviews)</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {lecturer.reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex items-start space-x-4">
                        <img
                          src={review.studentAvatar}
                          alt={review.studentName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-800">{review.studentName}</h4>
                              <p className="text-sm text-gray-600">{review.classTitle}</p>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'text-yellow-500 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 mb-2">{review.comment}</p>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Teaching Gallery</h2>
                
                {/* Main Image Display */}
                <div className="relative bg-white rounded-xl p-4 shadow-sm">
                  <div className="relative h-96 rounded-lg overflow-hidden">
                    <img
                      src={lecturer.gallery[currentImageIndex]}
                      alt="Gallery"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Thumbnail Navigation */}
                  <div className="flex space-x-2 mt-4 justify-center">
                    {lecturer.gallery.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
                          currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                        }`}
                      >
                        <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Students</span>
                  <span className="font-bold text-blue-600">{lecturer.totalStudents}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Lessons Completed</span>
                  <span className="font-bold text-green-600">{lecturer.lessonsCompleted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-bold text-purple-600">{lecturer.experience} years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Hourly Rate</span>
                  <span className="font-bold text-orange-600">¥{lecturer.hourlyRate}</span>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Availability</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">{lecturer.availability}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">Responds in {lecturer.responseTime}</span>
                </div>
              </div>
            </div>

            {/* Contact Options */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Options</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowMessageModal(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                  <Video className="w-5 h-5" />
                  <span>Video Call</span>
                </button>
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Voice Call</span>
                </button>
              </div>
            </div>

            {/* Learning Tools */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Learning Features</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="font-medium text-gray-800">Interactive Whiteboard</p>
                    <p className="text-xs text-gray-600">Real-time collaboration</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Target className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="font-medium text-gray-800">Progress Tracking</p>
                    <p className="text-xs text-gray-600">Monitor your improvement</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Bookmark className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-800">Custom Materials</p>
                    <p className="text-xs text-gray-600">Tailored resources</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Offer */}
            <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-bold mb-2">First Class Special</h3>
                <p className="text-sm text-white/90 mb-3">
                  Get 30% off your first lesson with {lecturer.name}
                </p>
                <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Claim Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">Send Message to {lecturer.name}</h3>
              <button
                onClick={() => setShowMessageModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={4}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert(`Message sent to ${lecturer.name}: "${message}"`);
                    setMessage('');
                    setShowMessageModal(false);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Preview Modal */}
      {showVideoPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">Teaching Preview - {lecturer.name}</h3>
              <button
                onClick={() => setShowVideoPreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-white rounded-full p-6 inline-block mb-4 shadow-lg">
                    <Play className="w-16 h-16 text-blue-500" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Sample Teaching Video</h4>
                  <p className="text-gray-600 mb-4">
                    See {lecturer.name}'s teaching style and methodology
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    ▶ Play Preview
                  </button>
                </div>
              </div>
              
              {/* Video Features */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <ThumbsUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <p className="text-sm font-medium">Interactive Learning</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Globe className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-medium">Cultural Context</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Target className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                  <p className="text-sm font-medium">Goal-Oriented</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LecturerProfile; 