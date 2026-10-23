import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import About from './components/About';
import './index.css';
import TechStack from './components/techStack';
import Recent from './components/recentProject';
import Experience from './components/experience';
import Certificate from './components/recentCertification';
import Profile from './components/profile';
import InDevelopment from './components/inDevelopment';
import Socials from './components/socials';
import Gallery from './components/gallery';
import DemoReel from './components/DemoReel';
import FullTechStackPage from './components/FullTechStackPage'; 
import AllProjectsPage from './components/AllProjectsPage';
import Chatbot from './components/Chatbot';
import SplashScreen from './components/SplashScreen';
import StarfieldBackground from './components/StarfieldBackground';
import { TiltCard } from './components/motion/Reveal';
import ScrollFade from './components/motion/ScrollFade';
import SiteNav from './components/motion/SiteNav';
import HoverSounds from './components/motion/HoverSounds';
import { PageTransitionProvider } from './components/motion/PageTransition';

const CARD = 'bg-foreground/5 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_1px_1px_rgba(0,0,0,0.04)] rounded-sm';

function Home() {
    return (
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">

                <div className="col-span-1 lg:col-span-4 flex flex-col gap-4">
                    <TiltCard id="about" className={CARD}>
                        <About />
                    </TiltCard>
                    <TiltCard className={CARD}>
                        <TechStack />
                    </TiltCard>
                    <TiltCard id="projects" className={CARD}>
                        <Recent />
                    </TiltCard>
                </div>

                <div className="col-span-1 lg:col-span-2 flex flex-col gap-8">
                    <TiltCard id="experience" className={CARD}>
                        <Experience />
                    </TiltCard>
                    <TiltCard className={CARD}>
                        <Certificate />
                    </TiltCard>
                    <TiltCard className={CARD}>
                        <InDevelopment />
                    </TiltCard>
                </div>

                <TiltCard className="col-span-1 lg:col-span-6">
                    <Socials />
                </TiltCard>
                <TiltCard className="col-span-1 lg:col-span-6">
                    <DemoReel />
                </TiltCard>
                <TiltCard id="gallery" className="col-span-1 lg:col-span-6">
                    <Gallery />
                </TiltCard>

            </div>
    );
}

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isRevealed, setIsRevealed] = useState(false);

    return (
        <>
            <div className="portfolio-background" aria-hidden="true">
                <StarfieldBackground />
            </div>
            {isLoading && (
                <SplashScreen onReveal={() => setIsRevealed(true)} finishLoading={() => setIsLoading(false)} />
            )}

            <div className={`relative z-10 transition-opacity duration-1000 ${isRevealed ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
                <Router>
                  <PageTransitionProvider enabled={isRevealed}>
                    <SiteNav />
                    <HoverSounds />
                    <main className="animate-fade-in">
                        <div className="max-w-4xl mx-auto px-4 py-4">
                            <div className="w-full max-w-4xl flex flex-col">
                                <ScrollFade id="profile-header">
                                    <Profile/>
                                </ScrollFade>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/tech-stack" element={<FullTechStackPage />} />
                                    <Route path="/projects" element={<AllProjectsPage />} />
                                </Routes>
                                
                            </div>
                        </div>
                        
                        <Chatbot />

                        <footer className="max-w-4xl mx-auto px-4 py-8 border-t-[0.5px] border-border mt-12">
                            <div className="flex justify-center items-center">
                                <p className="text-sm text-foreground text-center"> 
                                © 2026 Elmer Benitez II. All rights reserved.
                                </p>
                            </div>       
                        </footer>
                    </main>
                  </PageTransitionProvider>
                </Router>
            </div>
        </>
    )
}

export default App;
