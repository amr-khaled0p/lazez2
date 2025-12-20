
import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { BRANCHES } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-brandLight">
      {/* Hero Header */}
      <div className="bg-brandDark text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6">Let's Connect</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Got questions? Craving a partnership? Or just want to say hello? We're always here for our Lazez community.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-24">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Phone, title: "Call Us", detail: "19xxx (Local)", color: "bg-primary" },
            { icon: Mail, title: "Email Us", detail: "info@lazez.com", color: "bg-accent" },
            { icon: MessageCircle, title: "WhatsApp", detail: "+20 100 000 0000", color: "bg-green-500" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[2.5rem] soft-shadow text-center flex flex-col items-center hover-scale border border-gray-50">
              <div className={`${item.color} p-4 rounded-2xl text-white mb-6 shadow-xl`}>
                <item.icon size={28} />
              </div>
              <h3 className="text-2xl font-black text-brandDark mb-2">{item.title}</h3>
              <p className="text-gray-500 font-bold">{item.detail}</p>
            </div>
          ))}
        </div>

        {/* Branches */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {BRANCHES.map((branch) => (
            <div key={branch.id} className="bg-white rounded-[3rem] overflow-hidden soft-shadow border border-gray-50 flex flex-col h-full">
              <div className="p-10 flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-black text-brandDark">{branch.name}</h2>
                  <div className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-xs font-black uppercase">
                    Open Now
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="text-primary flex-shrink-0" size={24} />
                    <p className="text-gray-600 font-medium text-lg leading-snug">{branch.address}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Clock className="text-primary flex-shrink-0" size={24} />
                    <p className="text-gray-600 font-medium text-lg">{branch.hours}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="text-primary flex-shrink-0" size={24} />
                    <p className="text-gray-600 font-black text-lg">{branch.phone}</p>
                  </div>
                </div>

                <button className="mt-10 w-full py-4 bg-brandDark text-white rounded-2xl font-black text-lg hover:bg-primary transition-colors flex items-center justify-center space-x-2">
                  <span>Get Directions</span>
                  <MapPin size={20} />
                </button>
              </div>
              
              <div className="h-[400px] w-full">
                <iframe 
                  src={branch.mapUrl}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Working Hours Summary Section */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-black text-brandDark mb-8">Standard Working Hours</h3>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className={`p-4 rounded-2xl ${['Fri', 'Sat'].includes(day) ? 'bg-primary text-white' : 'bg-gray-50 text-gray-500'} font-bold`}>
                <div className="text-xs uppercase opacity-70 mb-1">{day}</div>
                <div className="text-sm">10AM-2AM</div>
              </div>
            ))}
          </div>
          <p className="mt-10 text-gray-400 font-medium italic">
            * Note: Delivery services might have different availability based on location.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
