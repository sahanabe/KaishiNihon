import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Menu, X, LogOut,
  Brain, Sparkles, Search, ChevronDown,
  Settings, LayoutDashboard, UserCircle, Star, Crown, Globe
} from 'lucide-react';
// Import your logo image
import logoImage from '../assets/images/logo.png';
import AuthModal from './AuthModal';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  interface SearchResult {
    type: 'navigation' | 'content' | 'suggestion';
    title: string;
    href: string;
    description: string;
    category?: string;
  }
  
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [megaMenuTimeout, setMegaMenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isClickModeActive, setIsClickModeActive] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { state, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [hasCompletedProfile, setHasCompletedProfile] = useState(false);

  // Debug auth state
  useEffect(() => {
    console.log('🔍 Header: Auth state changed:', {
      user: state.user,
      userName: state.user?.name,
      userEmail: state.user?.email,
      token: state.token ? 'present' : 'missing',
      loading: state.loading,
      hasUser: !!state.user
    });
    
    if (state.user) {
      console.log('✅ Header: User is logged in, should show Hello message');
    } else {
      console.log('❌ Header: No user, showing Get Started button');
    }
  }, [state]);

  // Clear corrupted localStorage data on component mount
  useEffect(() => {
    try {
      const token = localStorage.getItem('authToken');
      const userStr = localStorage.getItem('user');
      
      // Check for corrupted data
      if (token && (token === 'null' || token === 'undefined' || token.length < 10)) {
        console.log('🧹 Clearing corrupted token:', token);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
      
      if (userStr && (userStr === 'null' || userStr === 'undefined')) {
        console.log('🧹 Clearing corrupted user data:', userStr);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.log('🧹 Error checking localStorage, clearing all auth data:', error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }, []);



  // Handle scroll for compact design
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (megaMenuTimeout) {
        clearTimeout(megaMenuTimeout);
      }
    };
  }, [megaMenuTimeout]);

  // Check if user has completed profile
  useEffect(() => {
    const completedProfile = localStorage.getItem('completedProfile');
    setHasCompletedProfile(!!completedProfile);
  }, [location.pathname]);

  // Mega menu handlers
  const handleMegaMenuEnter = (menuName: string) => {
    if (isClickModeActive) return; // Don't respond to hover if click mode is active
    if (megaMenuTimeout) {
      clearTimeout(megaMenuTimeout);
      setMegaMenuTimeout(null);
    }
    setActiveMegaMenu(menuName);
  };

  const handleMegaMenuLeave = () => {
    if (isClickModeActive) return; // Don't respond to hover if click mode is active
    const timeout = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 1000); // Increased delay from 500ms to 1000ms for better UX
    setMegaMenuTimeout(timeout);
  };

  const handleMegaMenuClick = (menuName: string) => {
    setIsClickModeActive(true);
    if (activeMegaMenu === menuName) {
      setActiveMegaMenu(null);
      setIsClickModeActive(false);
    } else {
      setActiveMegaMenu(menuName);
    }
    
    // Clear click mode after a delay to allow hover behavior again
    setTimeout(() => {
      setIsClickModeActive(false);
    }, 1500); // Increased from 300ms to 1500ms to prevent hover conflicts
  };

  const handleMegaMenuAreaEnter = () => {
    if (isClickModeActive) return; // Don't respond to hover if click mode is active
    if (megaMenuTimeout) {
      clearTimeout(megaMenuTimeout);
      setMegaMenuTimeout(null);
    }
  };

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeMegaMenu) {
        const megaMenuElement = document.querySelector('.mega-menu-container');
        const navElement = document.querySelector('nav');
        if (megaMenuElement && navElement && 
            !megaMenuElement.contains(event.target as Node) && 
            !navElement.contains(event.target as Node)) {
          setActiveMegaMenu(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMegaMenu]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('completedProfile');
    navigate('/');
  };

  const handleProfileClick = () => {
    if (hasCompletedProfile) {
      navigate('/profile-dashboard');
    } else {
      navigate('/profile');
    }
    setIsProfileDropdownOpen(false);
  };

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim().length === 0) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    // Search through available content
    const results: SearchResult[] = [];
    const searchTerm = query.toLowerCase();

    // Search in navigation items
    navigationItems.forEach(item => {
      if (item.name.toLowerCase().includes(searchTerm)) {
        results.push({
          type: 'navigation',
          title: item.name,
          href: item.href,
          description: `Navigate to ${item.name}`
        });
      }
    });

    // Search in mega menu content
    Object.entries(megaMenus).forEach(([menuName, menuData]) => {
      menuData.sections.forEach(section => {
        section.items.forEach(item => {
          if (item.name.toLowerCase().includes(searchTerm) || 
              item.desc.toLowerCase().includes(searchTerm)) {
            results.push({
              type: 'content',
              title: item.name,
              href: item.href,
              description: item.desc,
              category: section.title
            });
          }
        });
      });
    });

    // Add common search terms
    const commonSearches = [
      { term: 'jlpt', results: ['JLPT N5', 'JLPT N4', 'JLPT N3', 'JLPT N2', 'JLPT N1'] },
      { term: 'kanji', results: ['Kanji Mastery', 'JLPT Kanji'] },
      { term: 'grammar', results: ['Grammar Fundamentals', 'JLPT Grammar'] },
      { term: 'vocabulary', results: ['N5 Vocabulary', 'JLPT Vocabulary'] },
      { term: 'hiragana', results: ['Hiragana & Katakana'] },
      { term: 'online', results: ['Online Classes', 'Live Sessions'] },
      { term: 'visa', results: ['Visa Services', 'Immigration'] },
      { term: 'consultation', results: ['Consultation Services'] }
    ];

    commonSearches.forEach(search => {
      if (searchTerm.includes(search.term)) {
        search.results.forEach(result => {
          if (!results.find(r => r.title === result)) {
            results.push({
              type: 'suggestion',
              title: result,
              href: `/language/${result.toLowerCase().replace(/\s+/g, '-')}`,
              description: `Search for ${result}`
            });
          }
        });
      }
    });

    setSearchResults(results.slice(0, 8)); // Limit to 8 results
    setShowSearchResults(results.length > 0);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or first result
      if (searchResults.length > 0) {
        navigate(searchResults[0].href);
      } else {
        // Navigate to language page as fallback
        navigate('/language');
      }
      setShowSearchResults(false);
      setSearchQuery('');
    }
  };

  const handleSearchResultClick = (href: string) => {
    navigate(href);
    setShowSearchResults(false);
    setSearchQuery('');
  };

  // Handle mega menu item click to close menu
  const handleMegaMenuItemClick = () => {
    setActiveMegaMenu(null);
    setIsClickModeActive(false);
  };

  const navigationItems = [
    { name: 'Language Learning', href: '/language', hasMegaMenu: true },
    { name: 'Visa Services', href: '/visa', hasMegaMenu: true },
    { name: 'Japan Services', href: '/services', hasMegaMenu: true },
    { name: 'Consultation', href: '/consultation' },
  ];

  // Mega Menu Content
  const megaMenus = {
    'Language Learning': {
      sections: [
        {
          title: 'JLPT Preparation',
          items: [
            { name: 'AI JLPT N5 Course', desc: 'Beginner level preparation', badge: 'Popular', href: '/language/jlpt-n5' },
            { name: 'AI JLPT N4 Course', desc: 'Elementary level', href: '/language/jlpt-n4' },
            { name: 'AI JLPT N3 Course', desc: 'Intermediate level', href: '/language/jlpt-n3' },
            { name: 'AI JLPT N2 Course', desc: 'Upper intermediate', href: '/language/jlpt-n2' },
            { name: 'AI JLPT N1 Course', desc: 'Advanced level', href: '/language/jlpt-n1' }
          ]
        },
        {
          title: 'AI Language Tools',
          items: [
            { name: 'AI Conversation Partner', desc: '24/7 Japanese practice', badge: 'AI Powered', href: '/language/ai-chat' },
            { name: 'Join With Online Class', desc: 'Live interactive sessions', badge: 'Live', href: '/language/online-class' },
            { name: 'Pronunciation Trainer', desc: 'Perfect your accent', href: '/language/pronunciation' },
            { name: 'Kanji Recognition', desc: 'Camera-based learning', badge: 'New', href: '/language/kanji' },
            { name: 'Grammar Analyzer', desc: 'Real-time corrections', href: '/language/grammar' }
          ]
        },
        {
          title: 'Learning Paths',
          items: [
            { name: 'Business Japanese', desc: 'Professional communication', href: '/language/business' },
            { name: 'Travel Japanese', desc: 'Essential phrases', href: '/language/travel' },
            { name: 'Academic Japanese', desc: 'University preparation', href: '/language/academic' },
            { name: 'Cultural Context', desc: 'Deep cultural understanding', href: '/language/culture' }
          ]
        },
        {
          title: 'Teaching Opportunities',
          items: [
            { name: 'Become a Kaishi Lecturer', desc: 'Share your expertise with learners', badge: 'Join Us', href: '/become-lecturer', special: true }
          ]
        }
      ],
      featured: {
        title: 'AI Personal Tutor',
        description: 'Get your personalized Japanese learning plan with AI-powered progress tracking and adaptive lessons.',
        cta: 'Start Free Trial',
        href: '/language/ai-tutor',
        stats: '98% pass rate'
      }
    },
    'Visa Services': {
      sections: [
        {
          title: 'Work Visas',
          items: [
            { name: 'Engineer/Specialist', desc: 'IT & technical roles', success: '98%', href: '/visa/engineer' },
            { name: 'Skilled Worker', desc: 'SSW visa program', success: '95%', href: '/visa/skilled-worker' },
            { name: 'Business Manager', desc: 'Investment & management', success: '97%', href: '/visa/business' },
            { name: 'Researcher', desc: 'Academic & research', success: '99%', href: '/visa/researcher' }
          ]
        },
        {
          title: 'Education Visas',
          items: [
            { name: 'Student Visa', desc: 'University & language school', success: '96%', href: '/visa/student' },
            { name: 'Exchange Student', desc: 'Short-term programs', href: '/visa/exchange' },
            { name: 'Research Student', desc: 'Graduate research', href: '/visa/research-student' },
            { name: 'Cultural Activities', desc: 'Traditional arts study', href: '/visa/cultural' }
          ]
        },
        {
          title: 'Family & Other',
          items: [
            { name: 'Spouse/Child Visa', desc: 'Family reunification', href: '/visa/family' },
            { name: 'Permanent Residence', desc: 'Long-term settlement', badge: 'Premium', href: '/visa/permanent' },
            { name: 'Working Holiday', desc: 'Youth mobility', href: '/visa/working-holiday' },
            { name: 'Tourist Extension', desc: 'Extend your stay', href: '/visa/tourist' }
          ]
        }
      ],
      featured: {
        title: 'AI Visa Predictor',
        description: 'Get instant visa approval probability with 99.2% accuracy. Our AI analyzes your profile and predicts success.',
        cta: 'Check My Chances',
        href: '/visa/predictor',
        stats: '99.2% accuracy'
      }
    },
    'Japan Services': {
      sections: [
        {
          title: 'Housing & Living',
          items: [
            { name: 'Apartment Search', desc: 'AI-curated listings', badge: 'AI Powered', href: '/services/housing' },
            { name: 'City Matching', desc: 'Find your perfect location', href: '/services/city-match' },
            { name: 'Bank Account Setup', desc: 'Financial services guide', href: '/services/banking' },
            { name: 'Mobile & Internet', desc: 'Communication setup', href: '/services/mobile' }
          ]
        },
        {
          title: 'Career & Work',
          items: [
            { name: 'Job Market Intel', desc: 'Real-time opportunities', href: '/services/jobs' },
            { name: 'Resume Optimization', desc: 'Japanese-style CV', href: '/services/resume' },
            { name: 'Interview Preparation', desc: 'Cultural training', href: '/services/interview' },
            { name: 'Salary Negotiation', desc: 'Market insights', href: '/services/salary' }
          ]
        },
        {
          title: 'Integration Support',
          items: [
            { name: 'Healthcare Guide', desc: 'Medical system navigation', href: '/services/healthcare' },
            { name: 'Tax & Legal', desc: 'Compliance assistance', href: '/services/legal' },
            { name: 'Social Integration', desc: 'Community connections', href: '/services/social' },
            { name: 'Cultural Adaptation', desc: 'Lifestyle guidance', href: '/services/culture' }
          ]
        }
      ],
      featured: {
        title: 'Complete Integration Package',
        description: 'Everything you need for successful life in Japan. From housing to healthcare, we handle it all.',
        cta: 'Explore Services',
        href: '/services/package',
        stats: '360° support'
      }
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200' 
        : 'bg-white border-b border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Compact Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            {/* Kaishi Nihon Logo Image */}
            <div className="h-10 w-auto group-hover:scale-105 transition-transform">
              <img 
                src={logoImage} 
                alt="Kaishi Nihon Logo" 
                className="h-full w-auto object-contain"
              />
            </div>
            
            {/* Brand Name and Tagline */}
            <div className="hidden md:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Kaishi Nihon
              </h1>
              <p className="text-sm text-gray-600 font-medium">AI-Powered Immigration</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search anything about Japan..."
                  className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white transition-all duration-200 text-sm"
                />
              </form>
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchResultClick(result.href)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {result.type === 'navigation' && <Globe className="w-4 h-4 text-blue-500" />}
                          {result.type === 'content' && <Brain className="w-4 h-4 text-purple-500" />}
                          {result.type === 'suggestion' && <Sparkles className="w-4 h-4 text-green-500" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 text-sm">{result.title}</div>
                          <div className="text-gray-500 text-xs mt-1">{result.description}</div>
                          {result.category && (
                            <div className="text-purple-600 text-xs mt-1">{result.category}</div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Simple Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 relative">
            {navigationItems.map((item) => {
              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasMegaMenu && handleMegaMenuEnter(item.name)}
                  onMouseLeave={() => item.hasMegaMenu && handleMegaMenuLeave()}
                >
                  {item.hasMegaMenu ? (
                    <button
                      onClick={() => handleMegaMenuClick(item.name)}
                      className="flex items-center space-x-1.5 px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 rounded-lg hover:bg-gray-50 text-sm font-medium"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                        activeMegaMenu === item.name ? 'rotate-180' : ''
                      }`} />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className="flex items-center space-x-1.5 px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 rounded-lg hover:bg-gray-50 text-sm font-medium"
                    >
                      <span>{item.name}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="hidden lg:flex items-center space-x-3">
            {state.user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 text-sm flex items-center space-x-2 group"
                >
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {state.user?.name?.charAt(0).toUpperCase() || state.user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span>Hello {state.user?.name?.split(' ')[0] || 'User'}</span>
                  <ChevronDown className={`w-4 h-4 text-white/80 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                                         <div className="px-4 py-3 border-b border-gray-100">
                       <div className="flex items-center space-x-3">
                         <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                           {state.user?.name?.charAt(0).toUpperCase() || state.user?.email?.charAt(0).toUpperCase() || 'U'}
                         </div>
                         <div>
                           <div className="font-medium text-gray-900 flex items-center">
                             {state.user?.name || 'User'}
                             {hasCompletedProfile && (
                               <Crown className="w-4 h-4 ml-2 text-yellow-500" />
                             )}
                           </div>
                           <div className="text-sm text-gray-500">{state.user?.email}</div>
                           {hasCompletedProfile && (
                             <div className="text-xs text-green-600 font-medium flex items-center mt-1">
                               <Star className="w-3 h-3 mr-1" />
                               Profile Completed
                             </div>
                           )}
                         </div>
                       </div>
                     </div>

                    <div className="py-2">
                      <button
                        onClick={() => {
                          navigate('/dashboard');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <LayoutDashboard className="w-4 h-4 mr-3 text-gray-400" />
                        Dashboard
                      </button>

                      <button
                        onClick={handleProfileClick}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <UserCircle className="w-4 h-4 mr-3 text-gray-400" />
                        {hasCompletedProfile ? (
                          <span className="flex items-center">
                            Profile Dashboard
                            <Crown className="w-3 h-3 ml-2 text-yellow-500" />
                          </span>
                        ) : (
                          'Profile'
                        )}
                      </button>

                      <button
                        onClick={() => {
                          navigate('/settings');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <Settings className="w-4 h-4 mr-3 text-gray-400" />
                        Settings
                      </button>
                    </div>

                    <div className="border-t border-gray-100 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}

                {isProfileDropdownOpen && (
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  />
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-200 text-sm flex items-center space-x-1.5 group"
              >
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Get Started</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mega Menu */}
        {activeMegaMenu && megaMenus[activeMegaMenu as keyof typeof megaMenus] && (
          <>
            {/* Invisible buffer zone to prevent mega menu from closing when moving mouse */}
            <div 
              className="absolute top-full left-0 w-full h-2 z-40"
              onMouseEnter={handleMegaMenuAreaEnter}
              onMouseLeave={handleMegaMenuLeave}
            />
            <div 
              className="mega-menu-container absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-200 z-40"
              onMouseEnter={handleMegaMenuAreaEnter}
              onMouseLeave={handleMegaMenuLeave}
            >
              <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-4 gap-8">
                  {/* Menu sections - 3 columns taking 75% of space */}
                  <div className="col-span-3 grid grid-cols-3 gap-8">
                    {megaMenus[activeMegaMenu as keyof typeof megaMenus].sections.map((section, index) => (
                      <div key={index} className="space-y-4">
                        <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider border-b border-gray-200 pb-2">
                          {section.title}
                        </h3>
                        <ul className="space-y-3">
                          {section.items.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                to={subItem.href}
                                onClick={handleMegaMenuItemClick}
                                className={`group block p-3 rounded-lg transition-all duration-200 ${
                                  'special' in subItem && subItem.special 
                                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg' 
                                    : 'hover:bg-gray-50 hover:shadow-sm'
                                }`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className={`font-medium text-sm ${
                                        'special' in subItem && subItem.special 
                                          ? 'text-white' 
                                          : 'text-gray-900 group-hover:text-purple-600'
                                      }`}>
                                        {subItem.name}
                                      </span>
                                      {'badge' in subItem && subItem.badge && (
                                        <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                                          'special' in subItem && subItem.special 
                                            ? 'bg-white/20 text-white border border-white/30' :
                                          subItem.badge === 'Popular' ? 'bg-orange-100 text-orange-600' :
                                          subItem.badge === 'AI Powered' ? 'bg-purple-100 text-purple-600' :
                                          subItem.badge === 'New' ? 'bg-green-100 text-green-600' :
                                          subItem.badge === 'Premium' ? 'bg-blue-100 text-blue-600' :
                                          subItem.badge === 'Join Us' ? 'bg-yellow-100 text-yellow-600' :
                                          'bg-gray-100 text-gray-600'
                                        }`}>
                                          {subItem.badge}
                                        </span>
                                      )}
                                      {'success' in subItem && subItem.success && (
                                        <span className="text-green-600 text-xs font-semibold">
                                          {subItem.success} success
                                        </span>
                                      )}
                                    </div>
                                    <p className={`text-xs leading-relaxed ${
                                      'special' in subItem && subItem.special 
                                        ? 'text-white/80' 
                                        : 'text-gray-500'
                                    }`}>
                                      {subItem.desc}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Featured Section - 1 column taking 25% of space */}
                  <div className="col-span-1">
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100 h-full">
                      <div className="flex items-center space-x-2 mb-4">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        <h3 className="font-bold text-gray-900 text-sm">
                          {megaMenus[activeMegaMenu as keyof typeof megaMenus].featured.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                        {megaMenus[activeMegaMenu as keyof typeof megaMenus].featured.description}
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="text-purple-600 font-bold text-sm">
                            {megaMenus[activeMegaMenu as keyof typeof megaMenus].featured.stats}
                          </div>
                          <Link
                            to={megaMenus[activeMegaMenu as keyof typeof megaMenus].featured.href}
                            onClick={handleMegaMenuItemClick}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors shadow-sm hover:shadow-md"
                          >
                            {megaMenus[activeMegaMenu as keyof typeof megaMenus].featured.cta}
                          </Link>
                        </div>
                        {activeMegaMenu === 'Language Learning' && (
                          <div className="pt-3 border-t border-purple-200">
                            <Link
                              to="/language/meet-lecturers"
                              onClick={handleMegaMenuItemClick}
                              className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center justify-center space-x-1 group"
                            >
                              <span>Meet Your Lecturers</span>
                              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search..."
                  className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
              </form>
              
              {/* Mobile Search Results */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-64 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleSearchResultClick(result.href);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {result.type === 'navigation' && <Globe className="w-4 h-4 text-blue-500" />}
                          {result.type === 'content' && <Brain className="w-4 h-4 text-purple-500" />}
                          {result.type === 'suggestion' && <Sparkles className="w-4 h-4 text-green-500" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 text-sm">{result.title}</div>
                          <div className="text-gray-500 text-xs mt-1">{result.description}</div>
                          {result.category && (
                            <div className="text-purple-600 text-xs mt-1">{result.category}</div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <nav className="space-y-1">
              {navigationItems.map((item) => {
                return (
                  <div key={item.name}>
                    {item.hasMegaMenu ? (
                      <div className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => {
                            // Toggle mobile mega menu sections
                            const mobileMenuElement = document.getElementById(`mobile-${item.name}`);
                            if (mobileMenuElement) {
                              mobileMenuElement.classList.toggle('hidden');
                            }
                          }}
                          className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg transition-colors text-sm font-medium"
                        >
                          <span>{item.name}</span>
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <div id={`mobile-${item.name}`} className="hidden border-t border-gray-200 p-3 bg-gray-50 rounded-b-lg">
                          {megaMenus[item.name as keyof typeof megaMenus]?.sections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="mb-4 last:mb-0">
                              <h4 className="font-semibold text-gray-900 text-xs uppercase tracking-wider mb-2">
                                {section.title}
                              </h4>
                              <div className="space-y-1">
                                {section.items.map((subItem, subIndex) => (
                                  <Link
                                    key={subIndex}
                                    to={subItem.href}
                                    className="block px-2 py-1 text-gray-600 hover:text-purple-600 hover:bg-white rounded text-sm"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span>{item.name}</span>
                      </Link>
                    )}
                  </div>
                );
              })}
              
              {/* Mobile Auth */}
              <div className="pt-2 border-t border-gray-200 mt-2">
                {state.user ? (
                  <>
                    <div className="px-3 py-3 mb-2">
                      <div className="flex items-center space-x-3 bg-white border border-gray-200 rounded-lg p-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          {state.user?.name?.charAt(0).toUpperCase() || state.user?.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 flex items-center">
                            {state.user?.name || 'User'}
                            {hasCompletedProfile && (
                              <Crown className="w-4 h-4 ml-2 text-yellow-500" />
                            )}
                          </div>
                          <div className="text-xs text-gray-500">{state.user?.email}</div>
                          {hasCompletedProfile && (
                            <div className="text-xs text-green-600 font-medium flex items-center mt-1">
                              <Star className="w-3 h-3 mr-1" />
                              Profile Completed
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4 text-purple-500" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleProfileClick();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium w-full text-left"
                    >
                      <UserCircle className="w-4 h-4" />
                      <span className="flex items-center">
                        {hasCompletedProfile ? (
                          <>
                            Profile Dashboard
                            <Crown className="w-3 h-3 ml-2 text-yellow-500" />
                          </>
                        ) : (
                          'Profile'
                        )}
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left text-sm font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full px-3 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-colors font-medium text-center text-sm"
                  >
                    Get Started
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => {
          console.log('🔒 Header: Closing auth modal');
          setIsAuthModalOpen(false);
        }}
        initialTab="register"
      />
    </header>
  );
};

export default Header; 