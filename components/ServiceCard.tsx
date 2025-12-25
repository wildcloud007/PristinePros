import React from 'react';
import { ServicePackage } from '../types';
import { Sparkles, Home, ShieldCheck, Check } from 'lucide-react';

interface ServiceCardProps {
  pkg: ServicePackage;
  onSelect: (pkgId: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ pkg, onSelect }) => {
  const IconMap: Record<string, React.ElementType> = {
    "Sparkles": Sparkles,
    "Home": Home,
    "ShieldCheck": ShieldCheck
  };

  const Icon = IconMap[pkg.icon] || Sparkles;

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col h-full">
      <div className="p-6 flex-1">
        <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mb-4">
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
        <p className="text-slate-500 text-sm mb-4 min-h-[40px]">{pkg.description}</p>
        <div className="text-2xl font-bold text-brand-600 mb-6">
          ${pkg.pricePerSqFt.toFixed(2)} <span className="text-sm text-slate-400 font-normal">/ sq ft</span>
        </div>
        <ul className="space-y-3 mb-6">
          {pkg.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
              <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 bg-slate-50 border-t border-slate-100 mt-auto">
        <button 
          onClick={() => onSelect(pkg.id)}
          className="w-full py-3 px-4 bg-white border-2 border-brand-500 text-brand-600 font-semibold rounded-lg hover:bg-brand-50 transition-colors"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;