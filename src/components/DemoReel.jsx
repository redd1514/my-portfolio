import { useState } from 'react';

const VIDEO_ID = 'zsGYaj5LNRQ';
const VIDEO_URL = `https://youtu.be/${VIDEO_ID}`;
const FALLBACK_THUMB = `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`;

// Shows the YouTube thumbnail first and only loads the player when someone presses play.
const DemoReel = () => {
    const [playing, setPlaying] = useState(false);
    const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`);
    const showFallbackThumb = () => setThumb(FALLBACK_THUMB);

    return (
        <div className="bento-card p-4 col-span-1 md:col-span-6 space-y-2 group animate-fade-in bg-white dark:bg-[#0b0d0e]">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Demo Reel</h2>
                <a href={VIDEO_URL} target="_blank" rel="noreferrer" className="text-xs text-foreground/70 hover:text-foreground flex items-center gap-1 transition-colors">
                    Watch on YouTube
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
                    </svg>
                </a>
            </div>

            <div className="relative w-full aspect-video overflow-hidden bg-black">
                {playing ? (
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                        title="Elmer Benitez II demo reel"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                ) : (
                    <button
                        type="button"
                        onClick={() => setPlaying(true)}
                        aria-label="Play demo reel"
                        className="group/play absolute inset-0 w-full h-full"
                    >
                        <img
                            src={thumb}
                            alt=""
                            loading="lazy"
                            onError={showFallbackThumb}
                            // YouTube serves a small 120px placeholder when there's no HD thumbnail.
                            onLoad={(e) => { if (e.currentTarget.naturalWidth <= 120 && thumb !== FALLBACK_THUMB) showFallbackThumb(); }}
                            className="w-full h-full object-cover transition-opacity duration-200 group-hover/play:opacity-80"
                        />
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-black/90 text-white transition-all duration-200 group-hover/play:bg-black">
                            <svg className="w-6 h-6 ml-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M8 5.14v13.72a1 1 0 001.5.86l11.04-6.86a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" />
                            </svg>
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default DemoReel;
