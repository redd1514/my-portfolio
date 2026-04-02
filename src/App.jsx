import Profile from './components/profile'
import About from './components/About'
import './index.css'

function App() {
    return (
        <div className="flex flex-col items-center  h-screen bg-neutral-900 text-white">
            <Profile />
            <About />
        </div>
    );
}

export default App
