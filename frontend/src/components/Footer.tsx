import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Globe, 
  Facebook, Twitter, Instagram, Linkedin, Youtube,
  ArrowRight, Heart, Shield, Award, Zap,
  Brain, Users
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Success Stories', href: '/success-stories' },
    { name: 'Blog', href: '/blog' },
    { name: 'Help Center', href: '/help' },
    { name: 'Contact', href: '/contact' }
  ];

  const services = [
    { name: 'Language Learning', href: '/language', icon: Brain },
    { name: 'Visa Services', href: '/visa', icon: Shield },
    { name: 'Japan Services', href: '/services', icon: Globe },
    { name: 'Expert Consultation', href: '/consultation', icon: Users }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Refund Policy', href: '/refund' }
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook, color: 'hover:text-blue-600' },
    { name: 'Twitter', href: '#', icon: Twitter, color: 'hover:text-blue-400' },
    { name: 'Instagram', href: '#', icon: Instagram, color: 'hover:text-pink-600' },
    { name: 'LinkedIn', href: '#', icon: Linkedin, color: 'hover:text-blue-700' },
    { name: 'YouTube', href: '#', icon: Youtube, color: 'hover:text-red-600' }
  ];



  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #8B5CF6 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #06B6D4 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>



      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">始</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Kaishi Nihon</h2>
                <p className="text-purple-300 text-sm">AI-Powered Immigration</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              The world's first AI-powered Japan immigration platform. We use cutting-edge artificial intelligence 
              to provide personalized guidance, predict visa outcomes, and ensure your successful journey to Japan.
            </p>

            {/* AI Features */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>99.2% AI Prediction Accuracy</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Government Certified Partners</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Award className="w-4 h-4 text-blue-400" />
                <span>Award-winning Immigration Platform</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Mail className="w-4 h-4 text-purple-400" />
                <span>support@kaishinihon.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Phone className="w-4 h-4 text-purple-400" />
                <span>+81-3-1234-5678</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span>Tokyo, Japan • San Francisco, USA</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <li key={index}>
                    <Link
                      to={service.href}
                      className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-sm flex items-center group"
                    >
                      <Icon className="w-4 h-4 mr-3 text-purple-400 group-hover:scale-110 transition-transform" />
                      {service.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Legal Links */}
            <h4 className="font-semibold text-md mt-8 mb-4 text-white">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-gray-300 transition-colors duration-200 text-xs"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="w-full">
            <h3 className="font-bold text-lg mb-6 text-white">Stay Connected</h3>
            
            {/* Newsletter Signup */}
            <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700 w-full">
              <h4 className="font-semibold mb-3 text-white">Get AI Immigration Updates</h4>
              <p className="text-gray-300 text-sm mb-4">Weekly tips, success stories, and AI insights delivered to your inbox.</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 bg-gray-700 text-white px-3 py-2 rounded-lg text-sm border border-gray-600 focus:border-purple-500 focus:outline-none focus:bg-gray-600 transition-colors"
                />
                <button className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-colors flex-shrink-0 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-200 hover:scale-110 hover:bg-gray-700`}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>© {currentYear} Kaishi Nihon. All rights reserved.</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span>for Japan dreamers</span>
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>AI System Online</span>
              </div>
              <span>•</span>
              <span>🇯🇵 Proudly serving Japan immigration since 2024</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 