import React from 'react';
import { FileText, Users, Briefcase, GraduationCap } from 'lucide-react';

const Visa: React.FC = () => {
  const visaTypes = [
    {
      icon: GraduationCap,
      title: 'Student Visa',
      description: 'For language schools and educational institutions',
      requirements: ['N5 or N4 Japanese level', 'School acceptance letter'],
      color: 'bg-blue-500'
    },
    {
      icon: Briefcase,
      title: 'Work Visa',
      description: 'For professional employment in Japan',
      requirements: ['N2 Japanese level', 'University degree', 'Job offer'],
      color: 'bg-green-500'
    },
    {
      icon: Users,
      title: 'SSW Visa',
      description: 'Specified Skilled Worker visa',
      requirements: ['N4 Japanese level or JFT', 'Skills test certificate'],
      color: 'bg-purple-500'
    },
  ];

  return (
    <div className="page-container">
      <div className="section-container py-16">
        <div className="text-center mb-12">
          <FileText className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Visa Application Guide</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete guidance for your Japanese visa application process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visaTypes.map((visa, index) => {
            const Icon = visa.icon;
            return (
              <div key={index} className="card">
                <div className={`w-12 h-12 ${visa.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{visa.title}</h3>
                <p className="text-gray-600 mb-4">{visa.description}</p>
                <ul className="space-y-2 mb-6">
                  {visa.requirements.map((req, reqIndex) => (
                    <li key={reqIndex} className="text-sm text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
                      {req}
                    </li>
                  ))}
                </ul>
                <button className="btn btn-outline w-full">
                  Learn More
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Apply?</h2>
            <p className="mb-6">Get personalized visa recommendations based on your profile</p>
            <button className="btn bg-white text-primary-600 hover:bg-gray-100">
              Start Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visa; 