import React, { useState } from 'react';
import { Search, Clipboard, X, Loader2, Download, Sparkles, Link2 } from 'lucide-react';

interface UrlInputProps {
  onDownload: (url: string) => void;
  isLoading: boolean;
}

export const UrlInput: React.FC<UrlInputProps> = ({ onDownload, isLoading }) => {
  const [url, setUrl] = useState('');
  const [clipboardError, setClipboardError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onDownload(url.trim());
  };

  const handlePaste = async () => {
    setClipboardError(null);
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text);
        } else {
          setClipboardError('Clipboard is empty');
        }
      } else {
        setClipboardError('Clipboard access not supported');
      }
    } catch (err) {
      console.warn('Clipboard read failed:', err);
      setClipboardError('Please paste manually using Ctrl+V or long tap');
    }
  };

  const handleClear = () => {
    setUrl('');
    setClipboardError(null);
  };

  const sampleUrl = 'https://www.instagram.com/p/CgOB4lIIB0O/';

  const handleTrySample = () => {
    setUrl(sampleUrl);
    onDownload(sampleUrl);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-3 sm:px-4 mt-3 sm:mt-8 mb-6" id="downloader-input">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="shadow-lg shadow-indigo-100/80 rounded-2xl overflow-hidden bg-white p-1.5 sm:p-2 border border-slate-300 transition-all focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            {/* Input field */}
            <div className="relative flex-1 w-full flex items-center pl-3">
              <Link2 className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (clipboardError) setClipboardError(null);
                }}
                placeholder="Paste Instagram URL here (e.g. instagram.com/p/CgO...)"
                className="w-full py-3.5 px-3 bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none text-sm sm:text-base font-medium"
                id="input-instagram-url"
              />

              {/* Action buttons inside input */}
              <div className="flex items-center gap-1.5 pr-2">
                {url ? (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    title="Clear input"
                    id="btn-clear-url"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePaste}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-100 transition-colors cursor-pointer"
                    title="Paste from clipboard"
                    id="btn-paste-clipboard"
                  >
                    <Clipboard className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Paste</span>
                  </button>
                )}
              </div>
            </div>

            {/* Main Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              id="btn-submit-download"
              className="w-full sm:w-auto min-w-[150px] h-12 px-7 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-98"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>Fetching...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Now</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Helper notes / sample trigger */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-3 px-2">
        {clipboardError ? (
          <p className="text-xs text-amber-600 font-semibold">{clipboardError}</p>
        ) : (
          <p className="text-xs text-slate-500 font-medium">
            Supports Instagram Reels, Posts, IGTV, Photos & Carousel albums.
          </p>
        )}

        <button
          type="button"
          onClick={handleTrySample}
          disabled={isLoading}
          id="btn-try-sample"
          className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1.5 hover:underline cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Try sample Instagram link</span>
        </button>
      </div>
    </div>
  );
};
