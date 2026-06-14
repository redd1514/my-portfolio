import profileImg from '../assets/dark_mode_profile.jpg';
import profileTransitionImg from '../assets/dark_mode_profile_transition.png';
import lightProfileImg from '../assets/light_mode_profile.png';
import lightProfileTransitionImg from '../assets/light_mode_profile_transition.png';
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
        <div className="flex flex-row items-start justify-start py-5 w-full gap-4 md:gap-6">
            <div className="relative w-[140px] h-[153px] sm:w-[155px] sm:h-[155px] md:w-[160px] md:h-[160px] flex-shrink-0 group">
                <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}>
                    <img src={lightProfileImg} alt="Profile" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0" />
                    <img src={lightProfileTransitionImg} alt="Profile Transition" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                </div>
                <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}`}>
                    <img src={profileImg} alt="Profile" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0" />
                    <img src={profileTransitionImg} alt="Profile Transition" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                </div>
            </div>
            
            <div className="flex flex-col items-start gap-1 md:gap-2 w-full max-w-2xl text-left">
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
        
                <p className="text-[10px] md:text-base font-medium" > Ng Lungsod ng Valenzuela</p>
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
            </div>
            </div>
            
        </div>
    )


};

export default Profile;