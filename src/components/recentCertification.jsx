const Certificate = () => {
    return (
    
    
    <div className="p-4 space-y-2 group bg-white dark:bg-[transparent] ">
        <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Recent Certifications</h2>
                
            </div>
        <div className="space-y-1.5">
            <a className="block p-2 dark:bg-black bg-gray-100 dark:hover:bg-gray-950 hover:bg-gray-300 transition-colors duration-200" href="https://drive.google.com/file/d/11dtsQIOADMuRVfgb1Mjl8LAfacZpDB4R/view?usp=sharing">
                <h3 className="text-xs font-semibold">Hackathon Finalist</h3>
                <p className="text-[11px]">AppBuildersPH Hackathon</p>
            </a>

            <a className="block p-2 dark:bg-black bg-gray-100 dark:hover:bg-gray-950 hover:bg-gray-300 transition-colors duration-200" href="https://drive.google.com/file/d/1s1YG399mEEYskXwcjVHEaAwnYjeC5PDD/view">
                <h3 className="text-xs font-semibold">Machine Learning</h3>
                <p className="text-[11px]">AI for Oceans</p>
            </a>
           
            <a className="block p-2 dark:bg-black bg-gray-100 dark:hover:bg-gray-950 hover:bg-gray-300 transition-colors duration-200" href="https://www.freecodecamp.org/certification/elmerbenitez/front-end-development-libraries">
                <h3 className="text-xs font-semibold">Front End Development Libraries</h3>
                <p className="text-[11px]">FreeCodeCamp</p>
            </a>
            <a className="block p-2 dark:bg-black bg-gray-100 dark:hover:bg-gray-950 hover:bg-gray-300 transition-colors duration-200" href="https://www.freecodecamp.org/certification/elmerbenitez/responsive-web-design">
                <h3 className="text-xs font-semibold">Responsive Web Design V8</h3>
                <p className="text-[11px]">FreeCodeCamp</p>
            </a>
        </div>

    </div>
    

    )
}

export default Certificate;