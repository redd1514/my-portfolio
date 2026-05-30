import profileImg from '../assets/cj.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faMoon } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import React, { useState, useEffect } from 'react';
import { faSun } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <div className="flex items-center justify-start py-5 w-full gap-6">
            <img src={profileImg} alt="Profile" className="w-[160px] h-[160px] mb-4 object-cover" />
            
            <div className="flex flex-col items-start gap-2 w-full max-w-2xl">
                <div className="flex items-center justify-between gap-2 w-full">
                    <h1 className=" text-lg md:text-2xl font-bold truncate">Elmer Benitez II</h1>
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
                        <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                    </svg>
                    <span>Valenzuela City, Philippines</span>
                </p>
        
                <p className="text-[10px] md:text-base" >Pamantasan Ng Lungsod ng Valenzuela</p>
                <div className="flex items-center gap-4 mt-2">
                <a>
                    <button className="bg-black text-white dark:text-black dark:bg-white inline-flex h-7 md:h-8 items-center px-2.5 md:px-4 text-[8px] md:text-xs font-medium transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-200 hover:-translate-y-0.5 gap-1 md:gap-1.5 whitespace-nowrap min-h-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                            <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            ></path>
                        </svg>
                     Send Email 
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                            <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"
                            ></path>
                        </svg>
                    </button>
                </a>
                <a href='https://github.com/redd1514'>
                    <button className="dark:text-white md:inline-flex h7 md:h-8 items-center shadow-[0_1px_2px_rgba(0,0,0,0.03),0_1px_1px_rgba(0,0,0,0.04)] bg-background px-2.5 md:px-4 text-[8px] md:text-xs font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:-translate-y-0.5 gap-1 md:gap-1.5 whitespace-nowrap min-h-0"> <FontAwesomeIcon icon={faGithub} /> Github</button>
                </a>
                <a href='https://www.linkedin.com/in/elmer-benitez-867a46381/'>
                    <button className="dark:text-white md:inline-flex h7 md:h-8 items-center shadow-[0_1px_2px_rgba(0,0,0,0.03),0_1px_1px_rgba(0,0,0,0.04)] bg-background px-2.5 md:px-4 text-[8px] md:text-xs font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:-translate-y-0.5 gap-1 md:gap-1.5 whitespace-nowrap min-h-0"> <FontAwesomeIcon icon={faLinkedin} /> Linkdin</button>
                </a>
            </div>
            </div>
            
        </div>
    )


};

export default Profile;