import About from './components/About'
import './index.css'
import TechStack from './components/techStack'
import Recent from './components/recentProject'
import Experience from './components/experience'
import Certificate from './components/recentCertification'
import Profile from './components/profile'
import InDevelopment from './components/inDevelopment'

function App() {
    return (
        <div className="flex flex-col items-center min-h-screen px-4 pt-6">

            <div className="w-full max-w-4xl flex flex-col ">
                <Profile/>
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-2">
                    <div className="col-span-4">        
                        <About />
                        <TechStack />
                        <Recent />
                    </div>
                   
                    <div className="col-span-1 md:col-span-3">
                        <Certificate />
                    </div>
                    <div className='col-span-1 md:col-span-3'>
                        <InDevelopment />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App