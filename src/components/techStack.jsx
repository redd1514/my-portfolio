

const TechStack = () => {
    return (
        <div className="flex flex-col w-full bg-white dark:bg-[#0b0d0e] mt-2 p-3 px-5 gap-3">
            <h2><b>Tech Stack</b></h2>
            <div className="space-y-4">
                <div>
                    <h3><b>Frontend</b></h3>
                    <div className="flex flex-wrap gap-2 pt-2 ml-2">
                        <span>JavaScript</span>
                        <span>TypeScript</span>
                        <span>React</span>
                        <span>Tailwind CSS</span>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default TechStack;