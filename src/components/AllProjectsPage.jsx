import React from 'react';
import { Link } from 'react-router-dom';

const projectsData = [
{
    title: "PLV CEIT Official Website",
    description: "The official website at Pamantasan ng Lungsod ng Valenzuela, showcasing academic programs, faculty, and student resources.",
    linkText: "plvceit.org/",
    linkUrl: "https://plvceit.org/",
    featured: true 
  },
  {
    title: "JRC SPORTSYNC",
    description: "A multi-sport Integrative mapping management system with a Retrieval-Augmented Generation AI System.",
    linkText: "sportsync-tan.vercel.app/", 
    linkUrl: "https://sportsync-tan.vercel.app/" 
  },
  {
    title: "Valenzuela Survey System",
    description: "A web-based citizen feedback system designed to  residents a direct voice to the municipality.",
    linkText: "valenzuela-survey.vercel.app/",
    linkUrl: "https://valenzuela-survey.vercel.app/"
  },
  {
    title: "Heavenly Cafe",
    description: "A full-stack responsive web application for local cafe order management and digital presence.",
    linkText: "heavenly-cafe.vercel.app/",
    linkUrl: "https://heavenly-cafe.vercel.app/"
  },
  {
    title: "University Room Reservation",
    description: "A seamless academic space-booking system built using React, Tailwind CSS, and Firebase.",
    linkText: "room-reserve.vercel.app",
    linkUrl: "https://digital-classroom-reservation-for-plv.vercel.app/#tab=login"
  },
  {
    title: "The Great Debate",
    description: "A multiplayer console game built with Unity, featuring real-time combat and dynamic arenas.",
    linkText: "the-great-debate",
    linkUrl: "https://drive.google.com/file/d/18z3XGogqGOABZA20oTrj6tCK-Y-FJuv6/view?usp=sharing"
  },
  {
    title: "Cyndikato Expansion App",
    description: "A multiplayer mobile strategy game built with Unity, featuring real-time player status and notification updates.",
    linkText: "the-great-debate",
    linkUrl: "https://www.youtube.com/watch?v=ZZvU0mZ5RXE"
  }
];
  
            

function AllProjectsPage() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white max-w-4xl mx-auto px-4 py-8 transition-colors duration-200 animate-fade-in">
      
      <div className="flex items-center gap-4 mb-8">
        <Link to="/" className="text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors text-sm flex items-center gap-2">
          ← Back to Home
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">All Projects</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projectsData.map((project, idx) => (
          <div 
            key={idx} 
            className={`rounded-sm p-6 flex flex-col justify-between transition-colors duration-200
              bg-neutral-50 text-neutral-900
              dark:bg-[#0c0c0c] dark:text-white
              ${project.featured 
                ? 'border border-neutral-400 dark:border-neutral-600 md:col-span-2' 
                : 'border border-neutral-200 hover:border-neutral-400 dark:border-neutral-900 dark:hover:border-neutral-700'
              }`}
          >
            <div>
              <div className="flex justify-between items-start gap-4 mb-2">
                <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                  {project.title}
                </h2>
                {project.featured && (
                  <span className="text-[10px] font-mono tracking-widest text-neutral-500 border border-neutral-300 bg-neutral-100 dark:text-neutral-400 dark:border-neutral-800 dark:bg-[#121212] px-2 py-0.5 uppercase rounded-sm shrink-0">
                    Featured
                  </span>
                )}
              </div>
              
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                {project.description}
              </p>
            </div>
            
            <div className="flex">
              <a 
                href={project.linkUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-neutral-100 border border-neutral-300 text-neutral-700 hover:border-neutral-500 dark:bg-[#121212] dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-500 text-xs font-mono px-2.5 py-1 transition-colors rounded-sm"
              >
                {project.linkText}
              </a>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProjectsPage;