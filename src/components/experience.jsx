const Experience = () => {
    return (
        <div className="bg-white dark:bg-[#0b0d0e] p-5 space-y-2 group flex-1">
            <h2 className="text-lg font-bold">Experience</h2>

            <div className="relative space-y-4 mt-4">
                <div className="absolute left-[5.5px] top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-800 z-0"></div>

                <div className="relative pl-6 mt-4 group/role">
                    <div className="absolute left-0 top-1.5 w-3 h-3 bg-black dark:bg-white z-10"></div>
                    <div className="space-y-1">
                        <h3 className="text-sm font-semibold">BS Information Technology</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-xs">Pamantasan ng Lungsod ng Valenzuela</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5">2022</span>
                        </div>
                    </div>
                </div>

                <div className="relative pl-6 mt-4 group/role">
                    <div className="absolute left-0 top-1.5 w-3 h-3 border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0b0d0e] transition-colors group-hover/role:border-gray-500 z-10"></div>
                    <div className="space-y-1">
                        <h3 className="text-sm font-semibold">Mobile App and Web </h3>
                        <div className="flex items-center justify-between">
                            <span className="text-xs">STI Meycauayan</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5">2020</span>
                        </div>
                    </div>
                </div>

                <div className="relative pl-6 mt-4 group/role">
                    <div className="absolute left-0 top-1.5 w-3 h-3 border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0b0d0e] transition-colors group-hover/role:border-gray-500 z-10"></div>
                    <div className="space-y-1">
                        <h3 className="text-sm font-semibold">Hello World!</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-xs">My first line of code</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5">2019</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )


}

export default Experience;