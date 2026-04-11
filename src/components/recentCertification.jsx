const Certificate = () => {
    return (
    
    
    <div className="p-4 space-y-2 group bg-white dark:bg-[#0b0d0e] ">
        <div className="flex items-center justify-between" >
            <h2 className="text-lg font-bold">Recent Certification</h2>
            <a className="text-xs flex items-center gap-1 " href="">
                View all
            </a>
        </div>
        <div className="space-y-1.5">
            <a className="block p-2 dark:bg-black bg-gray-100 dark:hover:bg-gray-950 hover:bg-gray-300 transition-colors duration-200" href="https://drive.google.com/file/d/1s1YG399mEEYskXwcjVHEaAwnYjeC5PDD/view">
                <h3 className="text-xs font-semibold">Machine Learning</h3>
                <p className="text-[11px]">AI for Oceans</p>
            </a>
            <a className="block p-2 dark:bg-black bg-gray-100 dark:hover:bg-gray-950 hover:bg-gray-300 transition-colors duration-200" href="https://drive.google.com/file/d/1s1YG399mEEYskXwcjVHEaAwnYjeC5PDD/view">
                <h3 className="text-xs font-semibold">Frontend Development</h3>
                <p className="text-[11px]">FreeCodeCamp</p>
            </a>
            <a className="block p-2 dark:bg-black bg-gray-100 dark:hover:bg-gray-950 hover:bg-gray-300 transition-colors duration-200" href="https://drive.google.com/file/d/1s1YG399mEEYskXwcjVHEaAwnYjeC5PDD/view">
                <h3 className="text-xs font-semibold">Git & Github</h3>
                <p className="text-[11px]">Codedex</p>
            </a>
           
        </div>

    </div>
    

    )
}

export default Certificate;