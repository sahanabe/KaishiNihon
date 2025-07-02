import React from 'react';
import { MessageCircle, Users, Clock, Award } from 'lucide-react';

const Consultation: React.FC = () => {
  const consultationTypes = [
    {
      title: 'Free Initial Consultation',
      duration: '30 minutes',
      price: 'Free',
      features: ['Basic visa guidance', 'Document checklist', 'Timeline overview'],
      popular: false
    },
    {
      title: 'Standard Consultation',
      duration: '60 minutes',
      price: '¥15,000',
      features: ['Detailed visa analysis', 'Document preparation', 'Application strategy', 'Follow-up support'],
      popular: true
    },
    {
      title: 'Premium Consultation',
      duration: '90 minutes',
      price: '¥25,000',
      features: ['Comprehensive review', 'Multiple visa options', 'Interview preparation', 'Ongoing support', 'Priority scheduling'],
      popular: false
    }
  ];

  return (
    <div className="page-container">
      <div className="section-container py-16">
        <div className="text-center mb-12">
          <MessageCircle className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Expert Consultation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with licensed immigration lawyers and experienced consultants
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Expert Lawyers</h3>
            <p className="text-gray-600 text-sm">Licensed immigration specialists</p>
          </div>
          
          <div className="text-center">
            <Clock className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Flexible Timing</h3>
            <p className="text-gray-600 text-sm">Book at your convenience</p>
          </div>
          
          <div className="text-center">
            <Award className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">High Success Rate</h3>
            <p className="text-gray-600 text-sm">95% visa approval rate</p>
          </div>
          
          <div className="text-center">
            <MessageCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Multiple Languages</h3>
            <p className="text-gray-600 text-sm">English, Japanese, and more</p>
          </div>
        </div>

        {/* Consultation Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {consultationTypes.map((consultation, index) => (
            <div key={index} className={`card relative ${consultation.popular ? 'ring-2 ring-primary-500' : ''}`}>
              {consultation.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">{consultation.title}</h3>
                <div className="text-3xl font-bold text-primary-600 mb-1">{consultation.price}</div>
                <div className="text-gray-500 text-sm">{consultation.duration}</div>
              </div>

              <ul className="space-y-3 mb-8">
                {consultation.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full btn ${consultation.popular ? 'btn-primary' : 'btn-outline'}`}>
                Book Consultation
              </button>
            </div>
          ))}
        </div>

        {/* Lawyer Registration CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 mb-16 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Are You a Licensed Immigration Lawyer?</h2>
            <p className="text-blue-100 mb-6">
              Join our network of expert immigration lawyers and help people achieve their Japan immigration dreams. 
              Connect with clients who need your expertise and grow your practice.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg">
              Register as Japan Immigration Lawyer
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">How do I prepare for a consultation?</h4>
              <p className="text-gray-600 text-sm">Bring your passport, educational certificates, and any relevant documents.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Can I get a refund if my visa is rejected?</h4>
              <p className="text-gray-600 text-sm">We offer a satisfaction guarantee. Contact us for details.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Do you provide services in English?</h4>
              <p className="text-gray-600 text-sm">Yes, all our consultants are fluent in English and Japanese.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">How long does the visa process take?</h4>
              <p className="text-gray-600 text-sm">Typically 4-12 weeks depending on the visa type and your preparation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation; 