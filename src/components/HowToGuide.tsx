import React from 'react';
import { Copy, ArrowRight, Download, CheckCircle2 } from 'lucide-react';

export const HowToGuide: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Copy Instagram Link',
      desc: 'Open Instagram app or web. Find any Reel, Post, or Story, tap "Share" or the three dots (...) and choose "Copy Link".',
      icon: Copy,
    },
    {
      num: '02',
      title: 'Paste into SnapInsta',
      desc: 'Paste the link into our search bar above and hit "Download Now". Our fast engine parses full HD media streams instantly.',
      icon: ArrowRight,
    },
    {
      num: '03',
      title: 'Save to Gallery',
      desc: 'Click the "Download HD" button to save high quality MP4 videos or JPG photos straight to your device gallery or files.',
      icon: Download,
    },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto px-4 my-12" id="how-to-guide">
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-widest font-extrabold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
          Simple 3-Step Process
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
          How to Download Instagram Reels & Photos
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl mx-auto">
          Fast, effortless, and free online tool to download Instagram media in full HD
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 relative group hover:border-indigo-300 transition-all flex flex-col justify-between shadow-lg shadow-indigo-100/40"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black text-slate-200 group-hover:text-indigo-100 transition-colors">
                    {s.num}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{s.desc}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-indigo-700 font-bold">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>Instant & No Login Needed</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Created by NEXA text placed directly below the 3-Step Process */}
      <div className="mt-8 text-center">
        <p className="text-base sm:text-lg font-black tracking-widest text-slate-700 uppercase">
          created by <span className="text-indigo-600 font-black underline decoration-indigo-300">NEXA</span>
        </p>
      </div>

      {/* Disclaimer section directly under created by NEXA */}
      <div className="mt-4 max-w-2xl mx-auto text-center px-2 sm:px-4">
        <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 sm:p-4 shadow-sm">
          <span className="font-bold text-slate-700 block mb-1">Disclaimer:</span>
          This website is only for personal and educational use. We do not host any copyrighted videos or media on our servers. All media belongs to their respective owners on Instagram.
        </p>
      </div>
    </section>
  );
};
