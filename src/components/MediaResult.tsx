import React, { useState } from 'react';
import { Download, ExternalLink, Copy, Check, User, Video, Image, Sparkles, ShieldCheck, Loader2 } from 'lucide-react';
import { InstagramMediaData, MediaItem } from '../types';

interface MediaResultProps {
  data: InstagramMediaData;
}

export const MediaResult: React.FC<MediaResultProps> = ({ data }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  // Take only the primary media item (removes Media #2 and Media #3)
  const primaryMedia = data.media.slice(0, 1);

  const handleCopyLink = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getProxyDownloadUrl = (item: MediaItem, index: number) => {
    const ext = item.type === 'video' ? 'mp4' : 'jpg';
    const filename = `snapinsta_${data.username || 'video'}_${index + 1}.${ext}`;
    return `/api/proxy-download?url=${encodeURIComponent(item.url)}&filename=${encodeURIComponent(filename)}`;
  };

  const handleDownloadClick = async (e: React.MouseEvent, item: MediaItem, index: number) => {
    e.preventDefault();
    setIsDownloading(true);

    const ext = item.type === 'video' ? 'mp4' : 'jpg';
    const filename = `snapinsta_${data.username || 'video'}.${ext}`;
    const proxyUrl = getProxyDownloadUrl(item, index);

    try {
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error('Download response error');

      // Explicitly read response as binary ArrayBuffer to prevent text character corruption
      const buffer = await response.arrayBuffer();
      const mimeType = item.type === 'video' ? 'video/mp4' : 'image/jpeg';
      const videoBlob = new Blob([buffer], { type: mimeType });
      const blobUrl = URL.createObjectURL(videoBlob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(blobUrl), 15000);
    } catch (err) {
      console.warn('Binary fetch failed, falling back to direct location download:', err);
      const link = document.createElement('a');
      link.href = proxyUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setTimeout(() => setIsDownloading(false), 1200);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 my-8 animate-fadeIn" id="media-result-container">
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-2xl shadow-indigo-100/80">
        {/* User / Header Info */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            {data.userPic ? (
              <img
                src={data.userPic}
                alt={data.username}
                className="w-11 h-11 rounded-full object-cover border-2 border-indigo-100"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                <User className="w-5 h-5" />
              </div>
            )}
            <div>
              <h3 className="text-slate-900 font-extrabold text-base sm:text-lg flex items-center gap-2">
                <span>@{data.username || 'instagram_user'}</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Ready
                </span>
              </h3>
              <p className="text-xs text-slate-500 line-clamp-1 max-w-xs sm:max-w-md">
                {data.title || 'Instagram Content'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">
              HD Media Stream
            </span>
          </div>
        </div>

        {/* Primary Single Media Card */}
        <div className="space-y-6">
          {primaryMedia.map((item, idx) => {
            const proxyUrl = getProxyDownloadUrl(item, idx);

            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden flex flex-col md:flex-row gap-4 p-4 hover:border-indigo-300 transition-all shadow-sm"
              >
                {/* Visual Preview */}
                <div className="w-full md:w-56 h-64 md:h-48 bg-slate-900 rounded-xl overflow-hidden relative shrink-0 flex items-center justify-center border border-slate-200/80">
                  {item.type === 'video' ? (
                    <video
                      controls
                      playsInline
                      poster={item.thumbnail}
                      src={item.url}
                      className="w-full h-full object-contain bg-black"
                      preload="metadata"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const video = e.currentTarget;
                        if (video.src !== proxyUrl) {
                          video.src = proxyUrl;
                        }
                      }}
                    />
                  ) : (
                    <img
                      src={item.url}
                      alt={`Instagram content`}
                      className="w-full h-full object-contain bg-black"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-xs font-bold px-2.5 py-1 rounded-lg text-white flex items-center gap-1 border border-white/20">
                    {item.type === 'video' ? (
                      <>
                        <Video className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Video MP4</span>
                      </>
                    ) : (
                      <>
                        <Image className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Photo JPG</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Details & Download Options */}
                <div className="flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-extrabold text-indigo-600 tracking-wide uppercase flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                        {item.quality || (item.type === 'video' ? 'HD 1080p Video' : 'HD High Res')}
                      </span>
                      <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        High Speed
                      </span>
                    </div>

                    <p className="text-slate-800 font-medium text-xs sm:text-sm line-clamp-2 mt-1">
                      {data.title || `Instagram ${item.type} media`}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-2 pt-2">
                    {/* Direct MP4 Attachment Download Button */}
                    <a
                      href={proxyUrl}
                      onClick={(e) => handleDownloadClick(e, item, idx)}
                      download={`snapinsta_${data.username || 'video'}.${item.type === 'video' ? 'mp4' : 'jpg'}`}
                      id={`btn-download-item-${idx}`}
                      className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-200 transition-all cursor-pointer active:scale-98"
                    >
                      {isDownloading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Preparing MP4 Download...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Download {item.type === 'video' ? 'Video (HD MP4)' : 'Photo (HD)'}</span>
                        </>
                      )}
                    </a>

                    {/* Secondary Actions */}
                    <div className="flex items-center gap-2">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
                        title="Open direct file link in new tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                        <span>Direct Link</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleCopyLink(item.url, idx)}
                        className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200 cursor-pointer"
                        title="Copy direct download link"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600 font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-500" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
