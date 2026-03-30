import { Profile } from './components/profile'
import { About } from './components/about'

function App() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <Profile />
            <About />
        </div>
    );
}

export default App
