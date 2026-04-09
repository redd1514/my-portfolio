import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import profileImg from '../assets/cj.jpg'
import React, {useState, useEffect} from 'react';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme == 'dark');
    }, [theme]);

    return (
        <div className="flex items-center justify-start py-5 w-full gap-6">
            <img src={profileImg} alt="Profile"  className="w-[159px] h-[159px] mb-4 object-cover"/>
            <div className="flex flex-col items-start gap-2 w-full max-w-2xl">
                <div className="flex items-center justify-between gap-2 w-full">
                    <a>
                        <button
                        className='py2'
                        onClick={toggleTheme}
                        >
                        {theme === 'light' ? <FontAwesomeIcon icon={faMoon}/> : <FontAwesomeIcon icon={faSun}/>}
                        </button>

                    </a>
                </div>
            </div>
        
        </div>
    )

}

export default Profile