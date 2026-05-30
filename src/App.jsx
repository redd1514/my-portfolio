import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About'
import './index.css'
import TechStack from './components/techStack'
import Recent from './components/recentProject'
import Experience from './components/experience'
import Certificate from './components/recentCertification'
import Profile from './components/profile'
import InDevelopment from './components/inDevelopment'
import Socials from './components/socials'
import Gallery from './components/gallery'
import FullTechStackPage from './components/FullTechStackPage'; 
import AllProjectsPage from './components/AllProjectsPage';
import Chatbot from './components/Chatbot';

function Home() {
    return (
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            
                <div className="col-span-1 lg:col-span-4 flex flex-col gap-4">
                    <div className="bg-foreground/5 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_1px_1px_rgba(0,0,0,0.04)] rounded-sm">        
                    <About />
                    </div>
                    <div className="bg-foreground/5 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_1px_1px_rgba(0,0,0,0.04)] rounded-sm"> 
                    <TechStack />
                    </div> 
                    <div className="bg-foreground/5 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_1px_1px_rgba(0,0,0,0.04)] rounded-sm">        
                    <Recent />
                    </div> 
                </div> 
            
                <div className="col-span-1 lg:col-span-2 flex flex-col gap-8">
                    <div className="bg-foreground/5 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_1px_1px_rgba(0,0,0,0.04)] rounded-sm">        
                        <Experience />
                    </div>
                    <div className="bg-foreground/5 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_1px_1px_rgba(0,0,0,0.04)] rounded-sm">        
                         <Certificate />
                    </div>
                    <div className="bg-foreground/5 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_1px_1px_rgba(0,0,0,0.04)] rounded-sm">        
                        <InDevelopment />
                    </div>
                   
                </div>

                <div className="col-span-1 lg:col-span-6">
                    <Socials />
                </div>
                <div className="col-span-1 lg:col-span-6">
                    <Gallery />
                </div>

            </div>
    );
}

function App() {
    return (
        <Router>
            <main className="animate-fade-in">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="w-full max-w-4xl flex flex-col">
                        <Profile/>
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
        </Router>
    )
}

export default App;