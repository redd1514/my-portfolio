import React, { useState, useEffect } from 'react';

const SplashScreen = ({ finishLoading }) => {
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        // Begin fading the screen out after 2.5 seconds
        const fadeOutTimer = setTimeout(() => {
            setIsFadingOut(true);
        }, 2500);

        // Tell the main app loading is complete after the 1-second fade out finishes
        const completeTimer = setTimeout(() => {
            finishLoading();
        }, 3500);

        return () => {
            clearTimeout(fadeOutTimer);
            clearTimeout(completeTimer);
        };
    }, [finishLoading]);

    return (
        <div 
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-1000 ease-in-out pointer-events-none select-none ${
                isFadingOut ? 'opacity-0' : 'opacity-100'
            }`}
        >
            <h1 
                className="text-white text-xl sm:text-2xl md:text-3xl font-serif font-light tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-0"
                style={{
                    animation: 'luxuriousFade 2s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                }}
            >
                Simple is better
            </h1>
            
            <style>{`
                @keyframes luxuriousFade {
                    0% { 
                        opacity: 0; 
                        filter: blur(8px); 
                        transform: scale(0.95); 
                        letter-spacing: 0.1em;
                    }
                    100% { 
                        opacity: 1; 
                        filter: blur(0); 
                        transform: scale(1); 
                        /* Uses the inline tracking class dynamically */
                    }
                }
            `}</style>
        </div>
    );
};

export default SplashScreen;