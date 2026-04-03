import profileImg from '../assets/cj.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMoon } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
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
        <div className="flex items-center justify-start py-10 mt-5 max-w-4xl gap-6 w-full">
            <img src={profileImg} alt="Profile" className="w-[150px] h-[150px] mb-4 object-cover" />
            
            <div className="flex flex-col items-start gap-2 w-full max-w-xl">
                <div className="flex items-center justify-between gap-2 w-full">
                    <h1 className="text-3xl font-bold">Elmer Benitez II</h1>
                    <a>
                    <button
                        className="dark:text-white py-2"
                        onClick={toggleTheme}
                        >
                        {theme === 'light' ?  <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
                    </button>
                    </a>
                </div>
                
                <h3 className="text-lg"> <FontAwesomeIcon icon={faLocationDot} /> Valenzuela City</h3>
                <p>Pamantasan Ng Lungsod ng Valenzuela</p>
                <div>
                <a>
                    <button className="dark:text-white py-2"> <FontAwesomeIcon icon={faEnvelope} /> Send Email</button>
                </a>
            </div>
            </div>
            
        </div>
    )


};

export default Profile;