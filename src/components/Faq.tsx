import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is SnapInsta Instagram Video Downloader free to use?',
      a: 'Yes, SnapInsta is completely free. You can download unlimited Instagram videos, reels, photos, and stories without paying any fees or creating an account.',
    },
    {
      q: 'Do I need to log in with my Instagram account?',
      a: 'No login or account permissions are required. Simply paste any public Instagram post URL into SnapInsta and download instantly.',
    },
    {
      q: 'Does this Instagram downloader work on mobile devices?',
      a: 'Yes! SnapInsta is specially optimized for mobile browsers (iPhone Safari, Android Chrome) as well as desktop browsers. Media saves directly to your device camera roll or files.',
    },
    {
      q: 'Can I download Instagram Reels and Stories?',
      a: 'Yes! You can download Reels, Video Posts, High-Res Photos, Carousel Albums, Stories, and IGTV videos as long as the post is public.',
    },
    {
      q: 'What file formats are supported?',
      a: 'Videos and Reels are saved in standard MP4 format in full HD quality. Photos are saved in high-resolution JPG format.',
    },
    {
      q: 'Where are downloaded files saved on my device?',
      a: 'On Android and PC, files save in your default "Downloads" folder. On iPhone/iOS, files save directly to Safari Downloads or Files app.',
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full max-w-3xl mx-auto px-4 my-12" id="faq">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-3 border border-indigo-100">
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          <span>Got Questions?</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:border-indigo-200 transition-all"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-extrabold text-slate-900 text-sm sm:text-base cursor-pointer hover:bg-slate-50 transition-colors"
                id={`faq-toggle-${idx}`}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-indigo-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
