import React from 'react';
import { Plane, Home, CreditCard, Phone } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Plane,
      title: 'Airport Pickup',
      description: 'Safe and reliable transportation from airport to your destination',
      features: ['Professional drivers', 'Fixed pricing', 'Flight tracking'],
      color: 'bg-blue-500'
    },
    {
      icon: Home,
      title: 'Accommodation',
      description: 'Find the perfect place to stay in Japan',
      features: ['Share houses', 'Apartments', 'Student dormitories'],
      color: 'bg-green-500'
    },
    {
      icon: CreditCard,
      title: 'Ticketing Services',
      description: 'Flight bookings and travel arrangements',
      features: ['International flights', 'JR Pass', 'IC Cards'],
      color: 'bg-purple-500'
    },
    {
      icon: Phone,
      title: '24/7 Support',
      description: 'Round-the-clock assistance for emergencies',
      features: ['Emergency hotline', 'Translation help', 'Medical assistance'],
      color: 'bg-red-500'
    },
  ];

  return (
    <div className="page-container">
      <div className="section-container py-16">
        <div className="text-center mb-12">
          <Plane className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Support Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete support for your arrival and settlement in Japan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="card text-center">
                <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-gray-600">
                      • {feature}
                    </li>
                  ))}
                </ul>
                <button className="btn btn-outline">
                  Book Now
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Need Help with Something Else?
          </h2>
          <p className="text-gray-600 mb-6">
            Contact our support team for any additional assistance you might need
          </p>
          <button className="btn btn-primary">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services; 