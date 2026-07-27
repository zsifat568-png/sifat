/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { UrlInput } from './components/UrlInput';
import { MediaResult } from './components/MediaResult';
import { HistoryList } from './components/HistoryList';
import { HowToGuide } from './components/HowToGuide';
import { Footer } from './components/Footer';
import { ContentCategory, HistoryItem, InstagramMediaData } from './types';
import { AlertCircle, Instagram, Sparkles, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<ContentCategory>('video');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mediaData, setMediaData] = useState<InstagramMediaData | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load download history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('snapinsta_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not load history from localStorage:', e);
    }
  }, []);

  // Save item to history
  const saveToHistory = (data: InstagramMediaData) => {
    try {
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        originalUrl: data.originalUrl,
        timestamp: Date.now(),
        data,
      };

      const updated = [newItem, ...history.filter((h) => h.originalUrl !== data.originalUrl)].slice(0, 3);
      setHistory(updated);
      localStorage.setItem('snapinsta_history', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save history to localStorage:', e);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('snapinsta_history');
  };

  const handleDownload = async (url: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/fetch-instagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        throw new Error(resData.error || 'Failed to fetch Instagram media. Please try again.');
      }

      setMediaData(resData.data);
      saveToHistory(resData.data);

      // Scroll to media result smoothly
      setTimeout(() => {
        const el = document.getElementById('media-result-container');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err: any) {
      console.error('Download error:', err);
      setErrorMessage(err.message || 'An error occurred while fetching the video. Please verify the link is public.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMediaData(null);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-600 selection:text-white relative overflow-x-hidden">
      {/* Decorative Geometric Ambient Circles */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-100/60 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-80 right-10 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Navbar Header */}
      <Header onReset={handleReset} />

      {/* Main Container */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-3 sm:pt-10 pb-2 sm:pb-6 px-3 sm:px-4 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs sm:text-sm font-bold mb-2 sm:mb-5 shadow-sm">
            <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
            <span>Geometric Fast Instagram Downloader</span>
          </div>

          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Download Instagram{' '}
            <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-4 sm:underline-offset-8">
              Videos & Reels
            </span>
          </h1>

          {/* URL Input Form */}
          <UrlInput onDownload={handleDownload} isLoading={isLoading} />
        </section>

        {/* Error Alert Message */}
        {errorMessage && (
          <div className="w-full max-w-3xl mx-auto px-4 my-4 animate-fadeIn">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-900 flex items-start gap-3 shadow-sm">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1 text-sm">
                <p className="font-extrabold text-amber-950 mb-1">Download Error</p>
                <p className="text-amber-800 font-medium">{errorMessage}</p>
                <p className="text-xs text-amber-700 mt-2 font-medium">
                  Tip: Ensure the Instagram post link is public (not from a private account) and formatted like{' '}
                  <span className="font-mono bg-amber-100 px-1.5 py-0.5 rounded text-amber-950 font-bold">
                    https://www.instagram.com/p/CgOB4lIIB0O/
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Media Download Result */}
        {mediaData && <MediaResult data={mediaData} />}

        {/* Recent History */}
        <HistoryList
          history={history}
          onSelectHistoryItem={(item) => setMediaData(item.data)}
          onClearHistory={handleClearHistory}
        />

        {/* How To Guide */}
        <HowToGuide />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
