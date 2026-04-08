import profileImg from '../assets/cj.jpg';

const Profile = () => {
    return (
        <div className="flex items-center justify-start py-5 w-full gap-6">
            <img src="{profileImg}" alt="profile" className="w-[150px] h-[150px] mb-4 object-cover" />
            <div className="flex flex-col items-start gap-2 w-full max-w-2xl">

            </div>
        </div>

    )

}

export default Profile