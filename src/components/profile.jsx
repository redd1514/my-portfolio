import profileImg from '../assets/cj.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    
    return (
        <div className="flex items-center justify-center py-10 mt-5 max-w-4xl mx-auto gap-6 ">
            <img src={profileImg} alt="Profile" className="w-37 h-37 mb-4 object-cover" />
            
            <div className="flex flex-col items-start gap-2 w-200">
                <div className="flex flexitems centerjustify-between gap-2">
                    <h1 className="text-3xl font-bold">Elmer Benitez II</h1>
                    {/* dark mode button */}
                </div>
                
                <h3 className="text-lg"> <FontAwesomeIcon icon={faLocationDot} /> Valenzuela City</h3>
                <p>Pamantasan Ng Lungsod ng Valenzuela</p>
                <div>
                <a>
                    <button className=" text-white  py-2 "> <FontAwesomeIcon icon={faEnvelope} /> Send Email</button>
                </a>
            </div>
            </div>
            
        </div>
    )


};

export default Profile;