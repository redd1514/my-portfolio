const Experience = () => {
    return (
        <div className="bg-white dark:bg-[#0b0d0e] p-5 space-y-2 group flex-1">
            <h2 className="text-lg font-bold">Experience</h2>

            <div className="relative space-y-4 mt-4">
                <div className="absolute left-1.5 top-1.5 bottom-2 w-px bg-gray-900"></div>
                <div className="relative pl-6 mt-4 group/role">
                    <div className="absolute left-0 top-1.5 w-3 h-3  border-2 border-gray-300 bg-gray-300"></div>
                    <div className="space-y-1">
                    <h3 className="text-sm font-semibold">Software Engineer</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-xs">Cambridge</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5">2026</span>
                        </div>
                    </div>
                </div>


                <div className="relative pl-6 mt-4 group/role">
                    <div className="absolute left-0 top-1.5 w-3 h-3 border-2 border-gray-900 bg-black group-hover/role:bg-gray-300"></div>
                    <div className="space-y-1">
                        <h3 className="text-sm font-semibold">Fullstack Dev</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-xs">Tagalag</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5">2025</span>
                        </div>
                    </div>
                </div>

                <div className="relative pl-6 mt-4 group/role">
                    <div className="absolute left-0 top-1.5 w-3 h-3 border-2 border-gray-900 bg-black group-hover/role:bg-gray-300"></div>
                    <div className="space-y-1">
                        <h3 className="text-sm font-semibold">Game Developer</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-xs">Unity</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5">2024</span>
                        </div>
                    </div>
                </div>

                <div className="relative pl-6 mt-4 group/role">
                    <div className="absolute left-0 top-1.5 w-3 h-3 border-2 border-gray-900 bg-black group-hover/role:bg-gray-300"></div>
                    <div className="space-y-1">
                        <h3 className="text-sm font-semibold">BS Information Technology</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-xs">Pamantasan ng Lungsod ng Valenzuela</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5">2022</span>
                        </div>
                    </div>
                </div>

                <div className="relative pl-6 mt-4 group/role">
                    <div className="absolute left-0 top-1.5 w-3 h-3 border-2 border-gray-900 bg-black group-hover/role:bg-gray-300"></div>
                    <div className="space-y-1">
                        <h3 className="text-sm font-semibold">Hello World!</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-xs">My first line of code</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5">2020</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )


}

export default Experience;