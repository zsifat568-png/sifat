import React from 'react';
import { Zap, Smartphone, ShieldCheck, Film, Image, Infinity } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'Ultra Fast Fetching',
      desc: 'Instant video link extraction powered by high-speed HD fetchers.',
    },
    {
      icon: Smartphone,
      title: 'Mobile & Tablet Ready',
      desc: 'Optimized touch UI for iOS, Android, Safari, Chrome, and desktop devices.',
    },
    {
      icon: ShieldCheck,
      title: 'Safe & Anonymous',
      desc: 'No login, password, or account needed. 100% private and secure downloads.',
    },
    {
      icon: Film,
      title: 'Instagram Reels & Videos',
      desc: 'Save full length reels, stories, IGTV, and video posts in high quality MP4.',
    },
    {
      icon: Image,
      title: 'Photos & Carousels',
      desc: 'Download high-resolution photos and multi-slide carousel albums easily.',
    },
    {
      icon: Infinity,
      title: 'Unlimited Downloads',
      desc: 'Download as many Instagram videos and reels as you want without daily limits.',
    },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto px-4 my-12" id="features">
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-10 shadow-xl shadow-indigo-100/50">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest font-extrabold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
            Why Choose Us
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
            Features of SnapInsta Downloader
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            The simplest and fastest tool for downloading Instagram content
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 hover:bg-white transition-all shadow-sm group"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-slate-900 font-extrabold text-base mb-1.5">{f.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
