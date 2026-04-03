import Profile from './components/profile'
import About from './components/About'
import './index.css'

function App() {
    return (
        <div className="flex flex-col items-center h-screen">
            <Profile />
            <div className="lg:col-span-2 space-y-6">
                <About />
            </div>
        </div>
    );
}

export default App
