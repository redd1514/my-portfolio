import { Link } from 'react-router-dom';

const TechStack = () => {
    return (
        <div className="flex flex-col w-full bg-white dark:bg-[#0b0d0e] mt-2 p-3 px-5 gap-3">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Tech Stack</h2>
                <Link to="/tech-stack" className="text-xs text-foreground/70 hover:text-foreground flex items-center gap-1 transition-colors">
                    View all
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
                    </svg>
                </Link> 
            </div>
                
            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-semibold mb-2"></h3>
                    <div className="flex flex-wrap gap-2 pt-2 ml-2">
                        <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 shadow-[0_1px_1px_rgba(0,0,0,0.03)]">JavaScript</span>
                        <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 shadow-[0_1px_1px_rgba(0,0,0,0.03)]">TypeScript</span>
                        <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 shadow-[0_1px_1px_rgba(0,0,0,0.03)]">React</span>
                        <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 shadow-[0_1px_1px_rgba(0,0,0,0.03)]">Next.js</span>
                        <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 shadow-[0_1px_1px_rgba(0,0,0,0.03)]">Tailwind CSS</span>
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-semibold mb-2">Backend</h3>
                    <div className="flex flex-wrap gap-2 pt-2 ml-2">
                        <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 shadow-[0_1px_1px_rgba(0,0,0,0.03)]">Python</span>
                        <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 shadow-[0_1px_1px_rgba(0,0,0,0.03)]">PostgreSQL</span>
                        <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 shadow-[0_1px_1px_rgba(0,0,0,0.03)]">PHP</span>
                        <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 shadow-[0_1px_1px_rgba(0,0,0,0.03)]">MySQL</span>
                        <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 shadow-[0_1px_1px_rgba(0,0,0,0.03)]">FastAPI</span>
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-semibold mb-2">DevOps & Tools</h3>
                    <div className="flex flex-wrap gap-2 pt-2 ml-2">
                        <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 shadow-[0_1px_1px_rgba(0,0,0,0.03)]">Docker</span>
                        <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 shadow-[0_1px_1px_rgba(0,0,0,0.03)]">Github Actions</span>
                        <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 shadow-[0_1px_1px_rgba(0,0,0,0.03)]">Git</span>
                        <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 shadow-[0_1px_1px_rgba(0,0,0,0.03)]">Github</span>
                    </div>
                </div>
                
            </div>
        </div>
    );

}

export default TechStack;