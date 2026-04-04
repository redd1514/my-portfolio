import Profile from './components/profile'
import About from './components/About'
import './index.css'
import TechStack from './components/techStack'

function App() {
    return (
        <div className="flex flex-col items-center min-h-screen px-4 pt-6">

            <div className="w-full max-w-4xl flex flex-col ">
                <Profile />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
                    <div className="col-span-8">        
                        <About />
                        <TechStack />
                    </div>

                </div>


            </div>
        </div>
    );
}

export default App
