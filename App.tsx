import React, { useState } from 'react';
import { SERVICE_PACKAGES } from './constants';
import ServiceCard from './components/ServiceCard';
import ChatInterface from './components/ChatInterface';
import { Phone, Mail, MapPin, Star, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToChat = () => {
    const chatElement = document.getElementById('chat-section');
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePackageSelect = (id: string) => {
    // In a real app, this might pre-fill the chat context
    scrollToChat();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <Star className="text-white fill-current" size={16} />
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">Pristine<span className="text-brand-600">Pros</span></span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Services</a>
              <a href="#about" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">About</a>
              <a href="#reviews" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Reviews</a>
              <button 
                onClick={scrollToChat}
                className="bg-brand-600 text-white px-5 py-2 rounded-full font-medium hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/30"
              >
                Book Now
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 py-4 px-4 space-y-4 shadow-lg absolute w-full">
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block text-slate-600 font-medium">Services</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-slate-600 font-medium">About</a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToChat();
              }}
              className="w-full bg-brand-600 text-white py-2 rounded-lg font-medium"
            >
              Book Now
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative bg-brand-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-100/50 rounded-bl-[100px] -z-10 translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                Experience the <span className="text-brand-600">Deep Clean</span> Difference.
              </h1>
              <p className="text-lg text-slate-600 max-w-lg">
                Professional deep cleaning, move-out restoration, and bio-sanitation. We don't just clean; we revitalize your home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={scrollToChat}
                  className="bg-brand-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2"
                >
                  Get a Free Quote <ArrowRight size={20} />
                </button>
                <a href="#services" className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors flex items-center justify-center">
                  View Packages
                </a>
              </div>
              <div className="flex items-center gap-6 pt-4 text-sm text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400 fill-current" size={16} /> 4.9/5 Rating
                </div>
                <div>2,000+ Homes Cleaned</div>
              </div>
            </div>
            
            {/* Hero Image / Illustration Placeholder */}
            <div className="relative">
              <img 
                src="https://picsum.photos/800/600?random=1" 
                alt="Clean Living Room" 
                className="rounded-3xl shadow-2xl object-cover h-[400px] w-full z-10 relative"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-xs">
                 <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-100 text-green-600 rounded-full">
                      <ShieldCheck size={20} />
                    </div>
                    <span className="font-bold text-slate-800">100% Satisfaction</span>
                 </div>
                 <p className="text-xs text-slate-500">If you aren't happy with our service, we will re-clean for free.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-2">Our Specialties</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Cleaning Packages tailored to your needs</h3>
            <p className="text-slate-600">Choose the level of service that fits your home's condition. Not sure? Ask our AI agent below.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICE_PACKAGES.map((pkg) => (
              <ServiceCard key={pkg.id} pkg={pkg} onSelect={handlePackageSelect} />
            ))}
          </div>
        </div>
      </section>

      {/* Chat & Booking Section */}
      <section id="chat-section" className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Chat with PristineBot</h3>
                <p className="text-slate-600 mb-6">
                  Our AI agent is trained to help you select the perfect package, estimate your costs based on square footage, and schedule your appointment instantly.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-brand-600">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Service Area</h4>
                    <p className="text-sm text-slate-500">Serving the greater Metro area and surrounding suburbs within 25 miles.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-brand-600">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Direct Line</h4>
                    <p className="text-sm text-slate-500">Prefer to call? +1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-brand-600">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Email Us</h4>
                    <p className="text-sm text-slate-500">hello@pristineclean.com</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-brand-900 rounded-2xl text-white">
                <h4 className="font-bold text-xl mb-2">Need a custom quote?</h4>
                <p className="text-brand-100 text-sm mb-4">For commercial properties or spaces over 5,000 sq ft, please contact us directly.</p>
                <button className="text-sm font-semibold underline hover:text-brand-200">Contact Commercial Team</button>
              </div>
            </div>

            {/* Right Content - Chat Interface */}
            <div className="lg:col-span-7">
               <ChatInterface />
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                   <Star className="text-white fill-current" size={16} />
                </div>
                <span className="font-bold text-xl text-white tracking-tight">Pristine<span className="text-brand-500">Pros</span></span>
              </div>
              <p className="text-sm text-slate-400 max-w-xs">
                Restoring the beauty of your home through specialized deep cleaning and sanitation services.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-brand-400 transition-colors">Deep Clean</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Move-Out / Move-In</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Bio-Sanitation</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Post-Construction</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-brand-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Pristine Deep Cleaners. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;