import React, { useEffect, useRef, useState } from 'react';
// Note: the file names are swapped relative to the theme they appear in.
// The night-office scene is shown in dark mode, the studio shot in light mode.
import darkStill from '../assets/light_mode_profile.png';
import darkHover from '../assets/light_mode_profile_transition.png';
import lightStill from '../assets/dark_mode_profile.jpg';
import lightHover from '../assets/dark_mode_profile_transition.png';

// Drop clips into src/assets/profile-clips/ named to-light / to-dark (.webm and/or .mp4).
// Missing clips are fine: the portrait falls back to a crossfade between the stills.
const clipFiles = import.meta.glob('../assets/profile-clips/*.{webm,mp4}', { eager: true, import: 'default' });
const getClip = (name) => ({
    webm: clipFiles[`../assets/profile-clips/${name}.webm`],
    mp4: clipFiles[`../assets/profile-clips/${name}.mp4`],
});
const clips = { toLight: getClip('to-light'), toDark: getClip('to-dark') };
const hasClip = (dir) => Boolean(clips[dir].webm || clips[dir].mp4);

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ProfilePortrait = ({ theme }) => {
    const videos = useRef({});
    const prevTheme = useRef(theme);
    // Which clip is visible; driven by the videos' own play/pause events.
    const [playing, setPlaying] = useState(null);

    useEffect(() => {
        if (prevTheme.current === theme) return;
        prevTheme.current = theme;

        const dir = theme === 'light' ? 'toLight' : 'toDark';
        const other = dir === 'toLight' ? 'toDark' : 'toLight';
        const video = videos.current[dir];
        const otherVideo = videos.current[other];

        // Toggled mid-clip: the reverse clip mirrors the forward one,
        // so start it from the matching point instead of jumping to frame 0.
        let start = 0;
        if (otherVideo && !otherVideo.paused && otherVideo.duration) {
            start = Math.max(0, otherVideo.duration - otherVideo.currentTime);
        }
        otherVideo?.pause();

        if (!video || prefersReducedMotion()) return;
        video.currentTime = start;
        video.play().catch(() => {});
    }, [theme]);

    const handleStop = (dir) => setPlaying((current) => (current === dir ? null : current));

    return (
        <div className="relative w-[140px] h-[153px] sm:w-[155px] sm:h-[155px] md:w-[160px] md:h-[160px] flex-shrink-0 group overflow-hidden">
            <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}>
                <img src={darkStill} alt="Profile" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0" />
                <img src={darkHover} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
            </div>
            <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}`}>
                <img src={lightStill} alt="Profile" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0" />
                <img src={lightHover} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
            </div>

            {['toLight', 'toDark'].filter(hasClip).map((dir) => (
                <video
                    key={dir}
                    ref={(el) => { videos.current[dir] = el; }}
                    muted
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                    onPlay={() => setPlaying(dir)}
                    onPause={() => handleStop(dir)}
                    onEnded={() => handleStop(dir)}
                    className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${playing === dir ? 'opacity-100' : 'opacity-0'}`}
                >
                    {clips[dir].webm && <source src={clips[dir].webm} type="video/webm" />}
                    {clips[dir].mp4 && <source src={clips[dir].mp4} type="video/mp4" />}
                </video>
            ))}
        </div>
    );
};

export default ProfilePortrait;
