import ProfilePortrait from './ProfilePortrait';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faMoon } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import React, { useState, useEffect } from 'react';
import { faSun, faTrophy } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <div className="flex flex-row items-start justify-start py-5 w-full gap-4 md:gap-6">
            <ProfilePortrait theme={theme} />
            
            <div className="flex flex-col items-start gap-1 md:gap-2 flex-1 min-w-0 max-w-2xl text-left">
                <div className="flex items-start justify-between gap-2 w-full">
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate">Elmer Benitez II</h1>
                    <a>
                    <button
                        className="dark:text-white py-2"
                        onClick={toggleTheme}
                        >
                        {theme === 'light' ?  <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
                    </button>
                    </a>
                </div>
                
                <p className="text-xs md:text-sm text-foreground/70 mt-0.5 flex items-center gap-1">
                    <svg className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                    </svg>
                    <span>Valenzuela City, Philippines</span>
                </p>
        
                <p className="text-[10px] md:text-base font-medium" >Pamantasan Ng Lungsod ng Valenzuela</p>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-2 md:gap-4 mt-2 w-full">
                <a href="mailto:Benitez1504elmer@gmail.com" className="w-full md:w-auto">
                    <button className="bg-black text-white dark:text-black dark:bg-white flex md:inline-flex justify-center w-full md:w-auto h-7 md:h-8 items-center px-2.5 md:px-4 text-[10px] md:text-xs font-medium transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-200 hover:-translate-y-0.5 gap-1 md:gap-1.5 whitespace-nowrap min-h-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            ></path>
                        </svg>
                     Send Email 
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"
                            ></path>
                        </svg>
                    </button>
                </a>
                <div className="flex flex-row gap-2 md:gap-4 w-full md:w-auto">
                    <a href='https://github.com/redd1514' className="flex-1 md:flex-none">
                        <button className="dark:text-white flex w-full justify-center md:inline-flex h-7 md:h-8 items-center shadow-[0_1px_2px_rgba(0,0,0,0.03),0_1px_1px_rgba(0,0,0,0.04)] bg-background px-2.5 md:px-4 text-[10px] md:text-xs font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:-translate-y-0.5 gap-1 md:gap-1.5 whitespace-nowrap min-h-0"> <FontAwesomeIcon icon={faGithub} /> Github</button>
                    </a>
                    <a href='https://www.linkedin.com/in/elmer-benitez-867a46381/' className="flex-1 md:flex-none">
                        <button className="dark:text-white flex w-full justify-center md:inline-flex h-7 md:h-8 items-center shadow-[0_1px_2px_rgba(0,0,0,0.03),0_1px_1px_rgba(0,0,0,0.04)] bg-background px-2.5 md:px-4 text-[10px] md:text-xs font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:-translate-y-0.5 gap-1 md:gap-1.5 whitespace-nowrap min-h-0"> <FontAwesomeIcon icon={faLinkedin} /> LinkedIn</button>
                    </a>
                </div>
                <a
                    href="https://appbuildersph.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Appbuilders Hackathon Finalist"
                    className="group/award relative flex h-7 w-full min-w-0 items-center justify-center gap-1.5 overflow-hidden border border-neutral-300 bg-white/70 pl-1 pr-2 md:gap-2 md:pr-2.5 md:inline-flex md:h-8 md:w-auto md:justify-start text-[10px] md:text-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-500/70 hover:shadow-[0_6px_20px_-8px_rgba(245,158,11,0.45)] dark:border-neutral-700 dark:bg-white/[0.03] dark:hover:border-amber-400/60"
                >
                    <span className="inline-flex flex-shrink-0 items-center gap-1 bg-amber-500/10 px-1 py-0.5 font-mono text-[9px] uppercase tracking-wider md:px-1.5 md:tracking-widest text-amber-700 md:text-[10px] dark:bg-amber-400/10 dark:text-amber-300">
                        <FontAwesomeIcon icon={faTrophy} className="transition-transform duration-300 group-hover/award:-rotate-12 group-hover/award:scale-110" />
                        <span className="hidden sm:inline">Finalist</span>
                    </span>
                    <span className="truncate font-medium dark:text-white">
                        <span className="sm:hidden">Hackathon Finalist</span>
                        <span className="hidden sm:inline">Appbuilders Hackathon</span>
                    </span>
                    <svg className="hidden h-3 w-3 flex-shrink-0 text-foreground/50 sm:block transition-transform duration-300 group-hover/award:-translate-y-0.5 group-hover/award:translate-x-0.5 group-hover/award:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M9 7h8v8" />
                    </svg>
                    <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-amber-300/25 to-transparent opacity-0 group-hover/award:opacity-100 motion-safe:transition-[transform,opacity] motion-safe:duration-700 group-hover/award:translate-x-[400%]" />
                </a>
            </div>
            </div>
            
        </div>
    )


};

export default Profile;