

const TechStack = () => {
    return (
        <div className="flex flex-col w-full bg-white dark:bg-[#0b0d0e] mt-2 p-3 px-5 gap-3">
            <h2><b>Tech Stack</b></h2>
            <div className="space-y-4">
                <div>
                    <h3><b>Frontend</b></h3>
                    <div className="flex flex-wrap gap-2 pt-2 ml-2">
                        <span className="px-2 py-0.5 text-sm">JavaScript</span>
                        <span className="px-2 py-0.5 text-sm">TypeScript</span>
                        <span className="px-2 py-0.5 text-sm">React</span>
                        <span className="px-2 py-0.5 text-sm">Tailwind CSS</span>
                        <span className="px-2 py-0.5 text-sm">Vite</span>
                    </div>
                </div>
                <div>
                    <h3><b>Backend</b></h3>
                    <div className="flex flex-wrap gap-2 pt-2 ml-2">
                        <span className="px-2 py-0.5 text-sm">Python</span>
                        <span className="px-2 py-0.5 text-sm">PostgreSQL</span>
                        <span className="px-2 py-0.5 text-sm">PHP</span>
                        <span className="px-2 py-0.5 text-sm">MySQL</span>
                        <span className="px-2 py-0.5 text-sm">FastAPI</span>
                    </div>
                </div>
                <div>
                    <h3><b>DevOps</b></h3>
                    <div className="flex flex-wrap gap-2 pt-2 ml-2">
                        <span className="px-2 py-0.5 text-sm">Docker</span>
                        <span className="px-2 py-0.5 text-sm">Github Actions</span>
                    </div>
                </div>
                <div>
                    <h3><b>Developer Tools</b></h3>
                    <div className="flex flex-wrap gap-1.5 pt-2 ml-2">
                        <span className="px-2 py-0.5 text-sm">Git</span>
                        <span className="px-2 py-0.5 text-sm">Github</span>
                        <span className="px-2 py-0.5 text-sm">VS Code</span>
                        <span className="px-2 py-0.5 text-sm">Pycharm</span>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default TechStack;