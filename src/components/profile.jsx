import profileImg from '../assets/cj.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faLocationDot, faMoon } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
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
                
                <h3 className="text-xs md:text-sm mt-0.5 flex items-center gap-1"> <FontAwesomeIcon icon={faLocationDot} /> Valenzuela City</h3>
                <p className="text-[10px] md:text-base" >Pamantasan Ng Lungsod ng Valenzuela</p>
                <div className="flex items-center gap-4 mt-2">
                <a>
                    <button className="bg-black text-white dark:text-black dark:bg-white inline-flex h-7 md:h-8 items-center px-2.5 md:px-4 text-[8px] md:text-xs font-medium text-background hover:-translate-y-0.5 gap-1 md:gap-1.5 whitespace-nowrap min-h-0     ">
                    <FontAwesomeIcon icon={faEnvelope} /> Send Email 
                    <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </a>
                <a href='https://github.com/redd1514'>
                    <button className="dark:text-white md:inline-flex h7 md:h-8 items-center shadow-[0_1px_2px_rgba(0,0,0,0.03),0_1px_1px_rgba(0,0,0,0.04)] bg-background px-2.5 md:px-4 text-[8px] md:text-xs font-medium transition-all-duration-200 hover:bg-gray-950 hover:-translate-y-0.5 gap-1 md:gap-1.5 whitespace-nowrap min-h-0"> <FontAwesomeIcon icon={faGithub} /> Github</button>
                </a>
                <a href='https://www.linkedin.com/in/elmer-benitez-867a46381/'>
                    <button className="dark:text-white md:inline-flex h7 md:h-8 items-center shadow-[0_1px_2px_rgba(0,0,0,0.03),0_1px_1px_rgba(0,0,0,0.04)] bg-background px-2.5 md:px-4 text-[8px] md:text-xs font-medium transition-all-duration-200 hover:bg-gray-950 hover:-translate-y-0.5 gap-1 md:gap-1.5 whitespace-nowrap min-h-0"> <FontAwesomeIcon icon={faLinkedin} /> Linkdin</button>
                </a>
            </div>
            </div>
            
        </div>
    )


};

export default Profile;